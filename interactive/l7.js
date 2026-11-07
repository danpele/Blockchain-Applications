// Lecture 7 interactive page: one block per chart slide, computed in the browser from l7_data.js.
(function () {
'use strict';
const D = window.L7_DATA;
const { C, sum, mean, sdev, solve, nf, $, AX, layout, ttl, plot, out, vline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L7_TEXT;

// ---------------------------------------------------------------- colours (Slides/code/l7_networks.py, l7_event.py)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', teal: '#17A2B8' };

// ---------------------------------------------------------------- helpers (as in l1.js)
const days = x => {
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const sgn = (x, d) => (x >= 0 ? '+' : '') + nf(x, d);
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const legendBelow = (y, extra) => Object.assign({ orientation: 'h', x: 0, xanchor: 'left', y: y, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } }, extra || {});

// ---------------------------------------------------------------- statistics
function lgamma(x) {               // Lanczos approximation
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = 0.99999999999980993; const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function betacf(a, b, x) {
  let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-300) d = 1e-300; d = 1 / d; let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d;
    const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break;
  }
  return h;
}
function ibeta(x, a, b) {         // regularised incomplete beta I_x(a, b)
  if (x <= 0) return 0; if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
}
const tP2 = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);        // two-sided p-value of a Student t statistic
function binomP2(k, n) {           // two-sided exact binomial test, p = 0.5 (scipy binomtest)
  const pmf = i => Math.exp(lgamma(n + 1) - lgamma(i + 1) - lgamma(n - i + 1) - n * Math.log(2));
  const pk = pmf(k); let s = 0;
  for (let i = 0; i <= n; i++) if (pmf(i) <= pk * (1 + 1e-7)) s += pmf(i);
  return Math.min(1, s);
}

// ================================================================= returns of the 19 coins
const RT = D.ret, COINS = RT.coins, NC = COINS.length, RD = days(RT.dates), NR = RD.length;
const RET = COINS.map(c => RT.r[c]);
function corrOf(i0, i1) {          // Pearson correlation matrix of the coins over days i0..i1-1
  const n = i1 - i0, m = RET.map(a => { let s = 0; for (let t = i0; t < i1; t++) s += a[t]; return s / n; });
  const Z = RET.map((a, k) => { const z = new Float64Array(n); for (let t = 0; t < n; t++) z[t] = a[i0 + t] - m[k]; return z; });
  const S = Z.map(() => new Array(NC).fill(0));
  for (let a = 0; a < NC; a++) for (let b = a; b < NC; b++) { let s = 0; const x = Z[a], y = Z[b]; for (let t = 0; t < n; t++) s += x[t] * y[t]; S[a][b] = S[b][a] = s; }
  return S.map((r, a) => r.map((v, b) => v / Math.sqrt(S[a][a] * S[b][b])));
}
const meanOff = Cm => { let s = 0, k = 0; for (let a = 0; a < Cm.length; a++) for (let b = a + 1; b < Cm.length; b++) { s += Cm[a][b]; k++; } return s / k; };

// ================================================================= 1. correlation matrix and MST
function mstOf(Cm) {               // Prim on the Mantegna distance d = sqrt(2 (1 - rho))
  const n = Cm.length, d = Cm.map(r => r.map(v => Math.sqrt(Math.max(2 * (1 - v), 0)))), inT = new Array(n).fill(false), best = new Array(n).fill(Infinity), par = new Array(n).fill(-1), E = [];
  best[0] = 0;
  for (let it = 0; it < n; it++) {
    let u = -1; for (let v = 0; v < n; v++) if (!inT[v] && (u < 0 || best[v] < best[u])) u = v;
    inT[u] = true; if (par[u] >= 0) E.push([par[u], u, d[par[u]][u]]);
    for (let v = 0; v < n; v++) if (!inT[v] && d[u][v] < best[v]) { best[v] = d[u][v]; par[v] = u; }
  }
  return E;
}
function treeLayout(E, n) {        // stress layout on the tree's path distances (as Kamada-Kawai with weight d)
  const G = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) G[i][i] = 0;
  E.forEach(([a, b, w]) => { G[a][b] = G[b][a] = w; });
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (G[i][k] + G[k][j] < G[i][j]) G[i][j] = G[i][k] + G[k][j];
  const X = Array.from({ length: n }, (_, i) => [Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n)]);
  const pairs = []; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs.push([i, j]);
  const wmin = 1 / Math.max(...pairs.map(([i, j]) => G[i][j] ** 2)), wmax = 1 / Math.min(...pairs.map(([i, j]) => G[i][j] ** 2));
  const iters = 60, emax = 1 / wmin, emin = 0.01 / wmax, lam = Math.log(emax / emin) / (iters - 1);
  for (let t = 0; t < iters; t++) {
    const eta = emax * Math.exp(-lam * t);
    pairs.forEach(([i, j], k) => {
      const [a, b] = (k + t) % 2 ? [i, j] : [j, i], dij = G[a][b], w = 1 / (dij * dij), mu = Math.min(w * eta, 1);
      const dx = X[a][0] - X[b][0], dy = X[a][1] - X[b][1], m = Math.hypot(dx, dy) || 1e-9, r = mu * (m - dij) / 2 / m;
      X[a][0] -= r * dx; X[a][1] -= r * dy; X[b][0] += r * dx; X[b][1] += r * dy;
    });
  }
  return X;
}
const YEARS = ['2021', '2022', '2023', '2024', '2025', '2026'];
const periodOf = k => {
  if (k >= YEARS.length) return { i0: 0, i1: NR, lab: 'January 2021 – October 2026', short: 'Jan 2021 - Oct 2026' };
  const y = YEARS[k], i0 = RD.findIndex(d => d.startsWith(y)); let i1 = i0; while (i1 < NR && RD[i1].startsWith(y)) i1++;
  return { i0, i1, lab: y + (y === '2026' ? ' (to ' + longDate(RD[NR - 1]).replace(' 2026', '') + ')' : ''), short: y };
};
const HEAT = [[0, '#053061'], [0.2, '#2166AC'], [0.4, '#92C5DE'], [0.5, '#F7F7F7'], [0.6, '#F4A582'], [0.8, '#B2182B'], [1, '#67001F']];
function mst() {
  const k = +$('ms-p').value, p = periodOf(k), Cm = corrOf(p.i0, p.i1), E = mstOf(Cm);
  $('ms-p-v').textContent = p.lab;
  plot('ms-heat', [{ z: Cm, x: COINS, y: COINS, type: 'heatmap', zmin: -1, zmax: 1, colorscale: HEAT, colorbar: { thickness: 10, len: 0.9, tickfont: { size: 10 } },
    hovertemplate: '%{y}–%{x}: ρ = %{z:.3f}<extra></extra>' }],
    layout({ title: ttl('Correlation of daily log returns, ' + p.short), xaxis: AX('', { tickangle: -90, tickfont: { size: 9, color: C.navy } }),
      yaxis: AX('', { autorange: 'reversed', tickfont: { size: 9, color: C.navy } }), margin: { l: 50, r: 10, t: 30, b: 50 } }));
  const deg = new Array(NC).fill(0), nb = COINS.map(() => []);
  E.forEach(([a, b]) => { deg[a]++; deg[b]++; nb[a].push(COINS[b]); nb[b].push(COINS[a]); });
  const X = treeLayout(E, NC);
  const tr = E.map(([a, b]) => ({ x: [X[a][0], X[b][0]], y: [X[a][1], X[b][1]], mode: 'lines', showlegend: false, hoverinfo: 'skip',
    line: { color: BA.blue, width: Math.max(0.6, 1 + 4 * (Cm[a][b] - 0.5)) } }));
  const node = (idx, name, color) => ({ x: idx.map(i => X[i][0]), y: idx.map(i => X[i][1]), mode: 'markers+text', name, text: idx.map(i => COINS[i]),
    textposition: 'middle center', textfont: { size: 8, color: '#FFFFFF' }, marker: { color, size: idx.map(i => 24 + 4 * deg[i]), line: { width: 0 } },
    customdata: idx.map(i => [deg[i], nb[i].join(', ')]), hovertemplate: '%{text}: degree %{customdata[0]} (%{customdata[1]})<extra></extra>' });
  const all = COINS.map((_, i) => i);
  tr.push(node(all.filter(i => i < 2), 'BTC, ETH', BA.red), node(all.filter(i => i >= 2), 'other coins (size = MST degree)', BA.teal));
  plot('ms-tree', tr, layout({ title: ttl('Minimum spanning tree, ' + p.short), xaxis: { visible: false }, yaxis: { visible: false, scaleanchor: 'x' },
    margin: { l: 10, r: 10, t: 30, b: 10 }, legend: legendBelow(-0.02) }));
  let mn = [2, 0, 0]; for (let a = 0; a < NC; a++) for (let b = a + 1; b < NC; b++) if (Cm[a][b] < mn[0]) mn = [Cm[a][b], a, b];
  const cb = all.slice(1).map(i => [Cm[0][i], COINS[i]]).sort((u, v) => u[0] - v[0]);
  const md = Math.max(...deg), hubs = all.filter(i => deg[i] === md);
  out('ms-out', [T.ms1(p.lab, p.i1 - p.i0, nf(meanOff(Cm), 2), nf(mn[0], 2), COINS[mn[1]] + '–' + COINS[mn[2]]),
    T.ms2(nf(cb[0][0], 2), cb[0][1], nf(cb[cb.length - 1][0], 2), cb[cb.length - 1][1]),
    T.ms3(hubs.map(i => `${COINS[i]} (degree ${md}: ${nb[i].join(', ')})`).join('; '), nb[0].join(' and '))]);
  return { Cm, E, deg, nb };
}

// ================================================================= 2. rolling connectedness
function lambda1(Cm) {             // largest eigenvalue by power iteration (positive correlation matrix)
  let v = new Array(Cm.length).fill(1 / Math.sqrt(Cm.length)), lam = 0;
  for (let it = 0; it < 500; it++) {
    const w = Cm.map(r => r.reduce((s, x, j) => s + x * v[j], 0)), nw = Math.sqrt(sum(w.map(x => x * x)));
    v = w.map(x => x / nw); if (Math.abs(nw - lam) < 1e-13) { lam = nw; break; } lam = nw;
  }
  return lam;
}
const rollCache = {};
function rolling(W) {
  if (rollCache[W]) return rollCache[W];
  const x = [], mc = [], ar = [];
  for (let k = W; k <= NR; k += 5) { const Cm = corrOf(k - W, k); x.push(RD[k - 1]); mc.push(meanOff(Cm)); ar.push(lambda1(Cm) / NC); }
  return (rollCache[W] = { x, mc, ar });
}
function connect() {
  const W = +$('cn-w').value, R = rolling(W), n = R.x.length;
  $('cn-w-v').textContent = W + ' days';
  plot('cn-chart', [
    { x: R.x, y: R.mc, mode: 'lines', name: `mean pairwise correlation, ${W}-day window (19 coins)`, line: { color: BA.blue, width: 1.4 }, hovertemplate: 'window ending %{x|%d %b %Y}: mean correlation %{y:.3f}<extra></extra>' },
    { x: R.x, y: R.ar, mode: 'lines', name: 'absorption ratio λ₁ / Σλₖ (first principal component)', line: { color: BA.btc, width: 1.4 }, hovertemplate: 'window ending %{x|%d %b %Y}: absorption ratio %{y:.3f}<extra></extra>' }],
    layout({ title: ttl(`${W}-day windows of daily log returns, one every 5 days`), xaxis: AX('', { type: 'date' }), yaxis: AX('', { range: [0, 1] }), legend: legendBelow(-0.12) }));
  let lo = 0, hi = 0; R.mc.forEach((v, j) => { if (v < R.mc[lo]) lo = j; if (v > R.mc[hi]) hi = j; });
  out('cn-out', [T.cn1(nf(R.mc[lo], 2), longDate(R.x[lo]), nf(R.mc[hi], 2), longDate(R.x[hi]), nf(R.mc[n - 1], 2), longDate(R.x[n - 1])),
    T.cn2(nf(mean(R.ar), 2), nf(R.ar[n - 1], 2), n)]);
  return R;
}

// ================================================================= 1b. eigenvalue spectrum and the equicorrelation benchmark
function eigen() {
  const k = +$('eg-p').value, p = periodOf(k), Cm = corrOf(p.i0, p.i1), ev = eigVec(Cm).val, rb = meanOff(Cm);
  $('eg-p-v').textContent = p.lab;
  const kk = ev.map((_, i) => i + 1), eq = kk.map(i => (i === 1 ? 1 + (NC - 1) * rb : 1 - rb));
  plot('eg-chart', [
    { x: kk, y: ev, type: 'bar', name: `eigenvalue λₖ of the 19-coin correlation matrix, ${p.short}`, marker: { color: BA.blue }, hovertemplate: 'λ%{x} = %{y:.2f}<extra></extra>' },
    { x: kk, y: eq, mode: 'markers', name: `equicorrelation benchmark, ρ = ${nf(rb, 2)}`, marker: { color: BA.btc, size: 8 }, hovertemplate: 'benchmark λ%{x} = %{y:.2f}<extra></extra>' }],
    layout({ title: ttl('Eigenvalues of the correlation matrix of daily log returns, ' + p.short), xaxis: AX('component k', { dtick: 1 }), yaxis: AX('eigenvalue λₖ', { range: [0, 15] }), legend: legendBelow(-0.16) }));
  const ar = ev[0] / NC, fo = (1 + (NC - 1) * rb) / NC;
  out('eg-out', [T.eg1(p.lab, nf(ev[0], 2), nf(ev[1], 2), ev.filter(v => v > 1).length), T.eg2(nf(rb, 3), nf(1 + (NC - 1) * rb, 2), nf(1 - rb, 2)), T.eg3(nf(ar, 3), nf(fo, 3), nf(Math.abs(ar - fo), 3))]);
  return { ev, rb, ar, fo };
}

// ================================================================= 3. Diebold-Yilmaz spillovers
const SUB = D.sub, SI = SUB.map(c => COINS.indexOf(c)), K = SUB.length;
function varFit(i0, i1, p) {       // VAR(p) with constant by OLS on days i0..i1-1: lag matrices and residual covariance
  const Y = SI.map(k => RET[k].slice(i0, i1)), n = i1 - i0, m = 1 + K * p, N = n - p;
  const XtX = Array.from({ length: m }, () => new Array(m).fill(0)), XtY = Array.from({ length: m }, () => new Array(K).fill(0)), rows = [];
  for (let t = p; t < n; t++) {
    const x = [1]; for (let l = 1; l <= p; l++) for (let j = 0; j < K; j++) x.push(Y[j][t - l]);
    rows.push(x);
    for (let a = 0; a < m; a++) { for (let b = a; b < m; b++) XtX[a][b] += x[a] * x[b]; for (let j = 0; j < K; j++) XtY[a][j] += x[a] * Y[j][t]; }
  }
  for (let a = 0; a < m; a++) for (let b = 0; b < a; b++) XtX[a][b] = XtX[b][a];
  const B = SUB.map((_, j) => solve(XtX, XtY.map(r => r[j])));            // B[j] = coefficients of equation j
  const E = rows.map((x, s) => B.map((b, j) => Y[j][s + p] - x.reduce((u, v, q) => u + v * b[q], 0)));
  const S = SUB.map((_, a) => SUB.map((_, b) => sum(E.map(e => e[a] * e[b])) / (N - m)));
  const Phi = Array.from({ length: p }, (_, l) => SUB.map((_, i) => SUB.map((_, j) => B[i][1 + l * K + j])));
  return { Phi, S };
}
const mm = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
function gfevd(f, H) {             // generalised FEVD (Pesaran-Shin), rows normalised to 1
  const p = f.Phi.length, A = [SUB.map((_, i) => SUB.map((_, j) => (i === j ? 1 : 0)))];
  for (let h = 1; h < H; h++) {
    let M = SUB.map(() => new Array(K).fill(0));
    for (let l = 1; l <= Math.min(h, p); l++) { const P = mm(f.Phi[l - 1], A[h - l]); M = M.map((r, i) => r.map((v, j) => v + P[i][j])); }
    A.push(M);
  }
  const S = f.S, th = SUB.map(() => new Array(K).fill(0));
  for (let i = 0; i < K; i++) {
    let den = 0; const num = new Array(K).fill(0);
    for (let h = 0; h < H; h++) {
      const a = A[h][i], aS = S[0].map((_, j) => a.reduce((s, v, k) => s + v * S[k][j], 0));
      den += aS.reduce((s, v, k) => s + v * a[k], 0);
      for (let j = 0; j < K; j++) num[j] += aS[j] * aS[j];
    }
    for (let j = 0; j < K; j++) th[i][j] = num[j] / S[j][j] / den;
    const rs = sum(th[i]); for (let j = 0; j < K; j++) th[i][j] /= rs;
  }
  return th;
}
const totalOf = th => 100 * (sum(th.map(r => sum(r))) - sum(th.map((r, i) => r[i]))) / K;
const spillCache = {};
function spillRoll(W, H) {
  const key = W + '|' + H; if (spillCache[key]) return spillCache[key];
  const x = [], y = [];
  for (let k = W; k <= NR; k += 10) { x.push(RD[k - 1]); y.push(totalOf(gfevd(varFit(k - W, k, 2), H))); }
  return (spillCache[key] = { x, y });
}
let fullVar = null;
function spill() {
  const H = +$('sp-h').value, W = +$('sp-w').value, R = spillRoll(W, H), n = R.x.length;
  $('sp-h-v').textContent = H + (H === 1 ? ' day' : ' days'); $('sp-w-v').textContent = W + ' days';
  fullVar = fullVar || varFit(0, NR, D.check.var_lag);
  const th = gfevd(fullVar, H), to = SUB.map((_, j) => 100 * (sum(th.map(r => r[j])) - th[j][j])), fr = SUB.map((_, i) => 100 * (sum(th[i]) - th[i][i]));
  const net = to.map((v, i) => v - fr[i]), S = totalOf(th);
  const ev = [['2022-05-09', 'Terra'], ['2022-11-08', 'FTX'], ['2024-01-11', 'spot ETFs']];
  plot('sp-roll', [{ x: R.x, y: R.y, mode: 'lines', name: `total spillover index (%), VAR(2), ${W}-day windows, H = ${H}`, line: { color: BA.blue, width: 1.5 },
    hovertemplate: 'window ending %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' }],
    layout({ title: ttl('Total spillover index S, rolling windows, one every 10 days'), xaxis: AX('', { type: 'date' }), yaxis: AX('%'),
      shapes: ev.map(([d]) => vline(d, BA.eth, 'dot')), legend: legendBelow(-0.12),
      annotations: ev.map(([d, l], j) => ({ x: d, y: 1, yref: 'paper', text: l, showarrow: false, font: { size: 10, color: BA.eth }, yanchor: 'bottom', xanchor: j === 0 ? 'right' : 'left' })) }));
  plot('sp-net', [
    { y: SUB, x: net, type: 'bar', orientation: 'h', marker: { color: net.map(v => (v > 0 ? BA.green : BA.red)) }, showlegend: false, customdata: SUB.map((_, i) => [to[i], fr[i]]),
      hovertemplate: '%{y}: NET %{x:+.1f} (TO %{customdata[0]:.1f}, FROM %{customdata[1]:.1f})<extra></extra>' },
    { y: [SUB[0]], x: [0], type: 'bar', orientation: 'h', marker: { color: BA.green }, name: 'net transmitter', hoverinfo: 'skip' },
    { y: [SUB[0]], x: [0], type: 'bar', orientation: 'h', marker: { color: BA.red }, name: 'net receiver', hoverinfo: 'skip' }],
    layout({ title: ttl(`Full sample, VAR(${D.check.var_lag}), H = ${H}`), xaxis: AX('net spillover TO − FROM (pp)', { zeroline: true, zerolinecolor: BA.blue }),
      yaxis: AX('', { autorange: 'reversed' }), barmode: 'overlay', legend: legendBelow(-0.2) }));
  let lo = 0, hi = 0; R.y.forEach((v, j) => { if (v < R.y[lo]) lo = j; if (v > R.y[hi]) hi = j; });
  const ord = SUB.map((c, i) => [net[i], c]).sort((a, b) => b[0] - a[0]);
  out('sp-out', [T.sp1(W, H, nf(R.y[lo], 1), longDate(R.x[lo]), nf(R.y[hi], 1), longDate(R.x[hi]), nf(R.y[n - 1], 1), longDate(R.x[n - 1])),
    T.sp2(D.check.var_lag, H, nf(S, 1), ord[0][1], sgn(ord[0][0], 1), ord[1][1], sgn(ord[1][0], 1), ord[K - 1][1], sgn(ord[K - 1][0], 1))]);
  return { R, S, net };
}

// ================================================================= 4. map of assets: PCA and k-means of six features
const AS = D.assets, NA = AS.names.length, FE = AS.feats;
function eigVec(A) {               // Jacobi rotations: eigenvalues (decreasing) and eigenvectors (columns)
  const n = A.length, M = A.map(r => [...r]), V = A.map((_, i) => A.map((_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += M[i][j] * M[i][j];
    if (off < 1e-24) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(M[p][q]) < 1e-18) continue;
      const th = (M[q][q] - M[p][p]) / (2 * M[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const a = M[k][p], b = M[k][q]; M[k][p] = c * a - s * b; M[k][q] = s * a + c * b; }
      for (let k = 0; k < n; k++) { const a = M[p][k], b = M[q][k]; M[p][k] = c * a - s * b; M[q][k] = s * a + c * b; }
      for (let k = 0; k < n; k++) { const a = V[k][p], b = V[k][q]; V[k][p] = c * a - s * b; V[k][q] = s * a + c * b; }
    }
  }
  const idx = M.map((_, i) => i).sort((a, b) => M[b][b] - M[a][a]);
  return { val: idx.map(i => M[i][i]), vec: idx.map(i => V.map(r => r[i])) };
}
function seeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const d2 = (a, b) => a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0);
function kmeans(Z, k, ninit) {     // Lloyd with k-means++ starts; best of ninit by inertia
  const u = seeded(12345); let best = null;
  for (let r = 0; r < ninit; r++) {
    const cen = [Z[Math.floor(u() * Z.length)]];
    while (cen.length < k) {
      const dd = Z.map(z => Math.min(...cen.map(c => d2(z, c)))), tot = sum(dd); let x = u() * tot, j = 0;
      while (j < Z.length - 1 && (x -= dd[j]) > 0) j++;
      cen.push(Z[j]);
    }
    let lab = new Array(Z.length).fill(-1), C0 = cen.map(c => [...c]);
    for (let it = 0; it < 300; it++) {
      const nl = Z.map(z => { let b = 0; C0.forEach((c, j) => { if (d2(z, c) < d2(z, C0[b])) b = j; }); return b; });
      const same = nl.every((v, i) => v === lab[i]); lab = nl; if (same) break;
      C0 = C0.map((c, j) => { const m = Z.filter((_, i) => lab[i] === j); return m.length ? c.map((_, q) => mean(m.map(z => z[q]))) : c; });
    }
    const inertia = sum(Z.map((z, i) => d2(z, C0[lab[i]])));
    if (!best || inertia < best.inertia - 1e-12) best = { lab, inertia };
  }
  return best.lab;
}
function assetMap(w, k) {
  const cols = FE.map(f => AS.F[f]);
  const Z0 = cols.map(c => { const m = mean(c), s = Math.sqrt(sum(c.map(v => (v - m) ** 2)) / c.length); return c.map(v => (v - m) / s); });
  const Z = AS.names.map((_, i) => Z0.map((c, j) => c[i] * (FE[j] === 'vol' ? w : 1)));
  const Cv = FE.map((_, a) => FE.map((_, b) => sum(Z.map(z => z[a] * z[b])) / (NA - 1)));
  const E = eigVec(Cv), tot = sum(E.val);
  const vec = E.vec.map(v => { let m = 0; v.forEach((x, i) => { if (Math.abs(x) > Math.abs(v[m])) m = i; }); return v[m] < 0 ? v.map(x => -x) : v; });   // sklearn sign rule
  const S = Z.map(z => [0, 1].map(c => z.reduce((s, v, q) => s + v * vec[c][q], 0)));
  return { evr: E.val.map(v => v / tot), vec, S, lab: kmeans(Z, k, 50) };
}
const CLC = { crypto: BA.btc, equity: BA.blue, bond: BA.green, commodity: BA.gold, FX: BA.eth };
const SYM = ['circle', 'square', 'diamond', 'triangle-up', 'x'];
function classes() {
  const w = +$('cl-w').value, k = +$('cl-k').value, M = assetMap(w, k);
  $('cl-w-v').textContent = nf(w, 2) + (w === 1 ? ' (all six features, as on the slide)' : w === 0 ? ' (shape only)' : '');
  const tr = Object.entries(CLC).map(([cl, col]) => {
    const idx = AS.names.map((_, i) => i).filter(i => AS.cls[i] === cl);
    return { x: idx.map(i => M.S[i][0]), y: idx.map(i => M.S[i][1]), mode: 'markers+text', name: cl, text: idx.map(i => AS.names[i]), textposition: 'top right',
      textfont: { size: 9, color: C.navy }, marker: { color: col, size: 9, symbol: idx.map(i => SYM[M.lab[i]]) }, customdata: idx.map(i => M.lab[i] + 1),
      hovertemplate: '%{text}: PC1 %{x:.2f}, PC2 %{y:.2f}, k-means group %{customdata}<extra></extra>' };
  });
  plot('cl-chart', tr, layout({ title: ttl('33 assets, daily log returns 2021–2026; marker shape = k-means group'),
    xaxis: AX(`PC1 (${nf(100 * M.evr[0], 0)}% of variance)`), yaxis: AX(`PC2 (${nf(100 * M.evr[1], 0)}%)`), legend: legendBelow(-0.16) }));
  const sp = AS.names.indexOf('S&P 500'), g0 = M.lab[sp];
  const joined = AS.names.filter((n, i) => AS.cls[i] === 'crypto' && M.lab[i] === g0);
  const trad = AS.names.filter((n, i) => AS.cls[i] !== 'crypto' && M.lab[i] === g0).length;
  const others = [...new Set(M.lab)].filter(g => g !== g0).map(g => AS.names.filter((_, i) => M.lab[i] === g));
  const LAB = { vol: 'vol', skew: 'skew', log_kurt: 'kurtosis', tail_index: 'tail index', acf_abs: 'ACF|r|', q01_sd: '1% quantile' };
  out('cl-out', [T.cl1(nf(100 * M.evr[0], 1), nf(100 * M.evr[1], 1), FE.map((f, j) => LAB[f] + ' ' + nf(M.vec[0][j], 2)).join(', ')),
    T.cl2(trad, joined.length ? joined.join(', ') : 'none'),
    T.cl3(others.map(g => (g.length > 6 ? `${g.length} assets` : g.join(', ')) + (g.length > 6 ? ` (${g.slice(0, 3).join(', ')} …)` : '')).join('; '))]);
  return M;
}

// ================================================================= 5. event study: CARs around 13 upgrades
const EV = D.event, STAGES = ['schedule', 'implementation'];
function carStats(stage, a, b) {   // window [a, b] in event days; arrays hold days -10..+10
  const ev = EV.filter(e => e.stage === stage), L = b - a + 1, n = ev.length;
  const car = ev.map(e => sum(e.ar.slice(a + 10, b + 11))), sc = car.map((c, i) => c / ev[i].sd / Math.sqrt(L));
  const tcs = mean(car) / (sdev(car) / Math.sqrt(n)), tb = mean(sc) / (sdev(sc) / Math.sqrt(n)), np = car.filter(c => c > 0).length;
  return { car, mean: mean(car), tcs, pcs: tP2(tcs, n - 1), tb, pb: tP2(tb, n - 1), np, psign: binomP2(np, n), big: sc.filter(s => Math.abs(s) > 1.96).length, names: ev.map(e => e.name) };
}
function carBands() {
  let a = +$('cb-a').value, b = +$('cb-b').value;
  if (a > b) { if (document.activeElement === $('cb-a')) b = a; else a = b; $('cb-a').value = a; $('cb-b').value = b; }
  $('cb-a-v').textContent = String(a).replace('-', '−'); $('cb-b-v').textContent = (b > 0 ? '+' : '') + b;
  const L = b - a + 1, fam = EV.filter(e => e.stage === 'schedule').map(e => e.name), outs = [];
  const tr = STAGES.map((st, k) => {
    const ev = EV.filter(e => e.stage === st), car = ev.map(e => sum(e.ar.slice(a + 10, b + 11))), band = ev.map(e => 1.96 * e.sd * Math.sqrt(L));
    car.forEach((c, i) => { if (Math.abs(c) > band[i]) outs.push(`${ev[i].name} ${st} (${sgn(c, 1)}%)`); });
    return { x: fam, y: car, type: 'bar', name: `CAR[${String(a).replace('-', '−')}, ${(b > 0 ? '+' : '') + b}] of ETH, ${st} date`, marker: { color: k ? BA.eth : BA.blue }, offsetgroup: st,
      error_y: { type: 'data', symmetric: true, array: band, color: BA.red, thickness: 1.2, width: 3 },
      customdata: band, hovertemplate: `%{x}, ${st}: CAR %{y:.1f}%, 5% band ±%{customdata:.1f}%<extra></extra>` };
  });
  plot('cb-chart', tr, layout({ title: ttl('CAR of ETH; whiskers: CAR ± 1.96 σ̂ᵤ √L. A whisker that does not cross zero marks a CAR outside its 5% band'), barmode: 'group',
    xaxis: AX('', { tickfont: { size: 10, color: C.navy } }), yaxis: AX('cumulative abnormal return (%)'), legend: legendBelow(-0.2) }));
  out('cb-out', [T.cb1(String(a).replace('-', '−'), (b > 0 ? '+' : '') + b, L, outs.length, nf(0.05 * 2 * fam.length, 1)), T.cb2(outs.length ? outs.join('; ') : 'none')]);
  return { outs };
}
function event() {
  let a = +$('ev-a').value, b = +$('ev-b').value;
  if (a > b) { if (document.activeElement === $('ev-a')) b = a; else a = b; $('ev-a').value = a; $('ev-b').value = b; }
  $('ev-a-v').textContent = a; $('ev-b-v').textContent = sgn(b, 0).replace('+0', '0');
  const dd = Array.from({ length: 21 }, (_, i) => i - 10);
  STAGES.forEach((st, k) => {
    const ev = EV.filter(e => e.stage === st), paths = ev.map(e => { let s = 0; return e.ar.map(v => (s += v)); });
    const tr = paths.map((p, i) => ({ x: dd, y: p, mode: 'lines', name: 'one upgrade family', legendgroup: 'one', showlegend: i === 0 && k === 0, line: { color: BA.eth, width: 0.9 }, opacity: 0.55,
      hovertemplate: ev[i].name + ', day %{x}: %{y:.1f}%<extra></extra>' }));
    tr.push({ x: dd, y: dd.map((_, j) => mean(paths.map(p => p[j]))), mode: 'lines', name: 'mean CAR across 13 families', showlegend: k === 0, line: { color: BA.red, width: 2.5 },
      hovertemplate: 'mean, day %{x}: %{y:.2f}%<extra></extra>' });
    plot('ev-' + st.slice(0, 3), tr, layout({ title: ttl(st + ' date'), xaxis: AX('event day', { dtick: 2, range: [-10.5, 10.5] }), yaxis: AX(k === 0 ? 'cumulative abnormal return of ETH (%)' : '', { range: [-35, 35] }),
      shapes: [vline(0, BA.blue, 'dot'), { type: 'rect', xref: 'x', yref: 'paper', x0: a - 0.5, x1: b + 0.5, y0: 0, y1: 1, fillcolor: 'rgba(26,58,110,0.10)', line: { width: 0 } }],
      showlegend: k === 0, legend: legendBelow(-0.2), margin: { l: 66, r: 8, t: 30, b: 100, autoexpand: false } }));
  });
  const S = carStats('schedule', a, b), I = carStats('implementation', a, b), dl = I.car.map((c, i) => c - S.car[i]);
  const tp = mean(dl) / (sdev(dl) / Math.sqrt(dl.length));
  const L = (s, x) => T.ev(s, String(a).replace('-', '−'), (b > 0 ? '+' : '') + b, sgn(x.mean, 2), nf(x.tcs, 2), nf(x.pcs, 2), nf(x.tb, 2), nf(x.pb, 2), x.np, nf(x.psign, 2), x.big);
  out('ev-out', [L('Implementation dates', I), L('Schedule dates', S), T.ev2(sgn(mean(dl), 2), nf(tp, 2), nf(tP2(tp, dl.length - 1), 2))]);
  return { S, I };
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  tall('ms-heat', 430); tall('ms-tree', 430);
  on(['ms-p'], mst); P('ms-play', 'ms-p', [0, 1, 2, 3, 4, 5, 6], 1300);
  tall('cn-chart', 380); on(['cn-w'], connect); P('cn-play', 'cn-w', range(30, 360, 30), 600);
  on(['sp-h', 'sp-w'], spill); P('sp-play', 'sp-h', [1, 2, 3, 5, 7, 10, 15, 20], 900);
  tall('cl-chart', 440); on(['cl-w', 'cl-k'], classes); P('cl-play', 'cl-w', range(0, 1, 0.05), 350);
  tall('eg-chart', 380); on(['eg-p'], eigen); P('eg-play', 'eg-p', [0, 1, 2, 3, 4, 5, 6], 1300);
  tall('cb-chart', 420); on(['cb-a', 'cb-b'], carBands); P('cb-play', 'cb-b', range(0, 10, 1), 700);
  tall('ev-sch', 420); tall('ev-imp', 420); on(['ev-a', 'ev-b'], event); P('ev-play', 'ev-b', range(0, 10, 1), 600);
  const PFX = { 'mst': 'ms', 'eigenvalues': 'eg', 'car-bands': 'cb', 'connectedness': 'cn', 'spillovers': 'sp', 'asset-map': 'cl', 'event-paths': 'ev' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  mst(); eigen(); connect(); spill(); classes(); carBands(); event();
}
window.L7 = { eigen, carBands, corrOf, mstOf, periodOf, rolling, varFit, gfevd, totalOf, spillRoll, assetMap, carStats, tP2, binomP2, days, mst, connect, spill, classes, event };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
