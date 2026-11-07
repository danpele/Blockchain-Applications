// Lecture 6 interactive page: one block per chart slide, computed in the browser from l6_data.js.
(function () {
'use strict';
const D = window.L6_DATA;
const { C, sum, mean, nf, $, AX, layout, ttl, plot, out, vline, hline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L6_TEXT;

// ---------------------------------------------------------------- colours (same as the slides, Slides/code/l5_*.py)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', teal: '#17A2B8' };
const QCOL = [BA.green, BA.blue, BA.gold, BA.btc, BA.red], QLAB = ['low', 'general', 'elevated', 'high', 'severe'];
const COINS = D.coins, NAME = c => (c === 'SUSD' ? 'sUSD' : c);

// ---------------------------------------------------------------- helpers
const days = x => {
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const longMonth = s => `${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const LEG = { orientation: 'h', x: 0, xanchor: 'left', y: -0.2, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } };
const sortNum = a => [...a].sort((x, y) => x - y);
const quant = (s, q) => { const p = q * (s.length - 1), lo = Math.floor(p), hi = Math.ceil(p); return s[lo] + (s[hi] - s[lo]) * (p - lo); };   // numpy 'linear'
const median = a => quant(sortNum(a), 0.5);
function ols(x, y) {
  const mx = mean(x), my = mean(y);
  let sxy = 0, sxx = 0; for (let i = 0; i < x.length; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx; return { a, b, e: y.map((v, i) => v - a - b * x[i]) };
}
function nwSE(x, e, L) {            // Newey-West standard error of the slope (Bartlett kernel, L lags, no small-sample factor, as statsmodels)
  const n = x.length, X = x.map(v => [1, v]);
  const XtX = [[n, sum(x)], [sum(x), sum(x.map(v => v * v))]], det = XtX[0][0] * XtX[1][1] - XtX[0][1] ** 2;
  const inv = [[XtX[1][1] / det, -XtX[0][1] / det], [-XtX[1][0] / det, XtX[0][0] / det]];
  const u = X.map((r, i) => [r[0] * e[i], r[1] * e[i]]), S = [[0, 0], [0, 0]];
  for (let l = 0; l <= L; l++) {
    const w = l === 0 ? 1 : 1 - l / (L + 1);
    for (let t = l; t < n; t++) for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) {
      const v = u[t][a] * u[t - l][b]; S[a][b] += w * v; if (l > 0) S[b][a] += w * v;
    }
  }
  const M = (A, B) => A.map(r => B[0].map((_, j) => r[0] * B[0][j] + r[1] * B[1][j]));
  return Math.sqrt(M(M(inv, S), inv)[1][1]);
}
function erfc(x) {                  // Numerical Recipes erfcc, relative error < 1.2e-7
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const pNorm2 = t => erfc(Math.abs(t) / Math.SQRT2);        // two-sided p-value, Normal reference
function holm(p) {
  const m = p.length, o = p.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]), adj = new Array(m);
  let run = 0; o.forEach(([v, i], k) => { run = Math.max(run, Math.min(1, (m - k) * v)); adj[i] = run; });
  return adj;
}
function spearman(x, y) {
  const rk = a => { const o = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]), r = new Array(a.length); let i = 0;
    while (i < o.length) { let j = i; while (j + 1 < o.length && o[j + 1][0] === o[i][0]) j++; for (let k = i; k <= j; k++) r[o[k][1]] = (i + j) / 2 + 1; i = j + 1; } return r; };
  const a = rk(x), b = rk(y), ma = mean(a), mb = mean(b);
  let s = 0, sa = 0, sb = 0; for (let i = 0; i < a.length; i++) { s += (a[i] - ma) * (b[i] - mb); sa += (a[i] - ma) ** 2; sb += (b[i] - mb) ** 2; }
  return s / Math.sqrt(sa * sb);
}
const fmtP = p => (p < 0.001 ? '< 0.001' : nf(p, 3));

// ================================================================= 1.3 two tiers of peg quality
const DV = D.dev, DV_D = days(DV.dates);
const PQ_M = [...new Set(DV_D.map(d => d.slice(0, 7)))].filter(m => m >= '2021-01');
function pegStats(end) {
  const n = DV_D.findIndex(d => d > end), stop = n < 0 ? DV_D.length : n;
  return COINS.map(c => {
    const x = DV[c].slice(0, stop).filter(finite), a = sortNum(x.map(Math.abs)), s = sortNum(x), ab = sortNum(x.map(v => Math.max(Math.abs(v), 0.1)));
    return { c, n: x.length, med: quant(a, 0.5), q05: quant(s, 0.05), down: 100 * x.filter(v => v <= -100).length / x.length, p95: quant(a, 0.95),
      box: [quant(ab, 0.05), quant(ab, 0.25), quant(ab, 0.5), quant(ab, 0.75), quant(ab, 0.95)] };
  }).sort((p, q) => p.med - q.med);
}
function pegQuality() {
  const m = PQ_M[+$('pq-e').value], end = m === '2026-10' ? '2026-10-23' : new Date(Date.UTC(+m.slice(0, 4), +m.slice(5, 7), 0)).toISOString().slice(0, 10);
  $('pq-e-v').textContent = longDate(end);
  const S = pegStats(end);
  plot('pq-chart', [{ type: 'box', x: S.map(s => NAME(s.c)), lowerfence: S.map(s => s.box[0]), q1: S.map(s => s.box[1]), median: S.map(s => s.box[2]),
    q3: S.map(s => s.box[3]), upperfence: S.map(s => s.box[4]), name: 'interquartile range and median; whiskers: 5% and 95%',
    fillcolor: 'rgba(23,162,184,0.5)', line: { color: BA.blue, width: 1.2 }, hoverinfo: 'y', showlegend: true },
    { x: S.map(s => NAME(s.c)), y: S.map(s => s.box[2]), mode: 'markers', name: 'median', marker: { symbol: 'line-ew-open', size: 26, color: BA.red, line: { width: 2.5, color: BA.red } },
      customdata: S.map(s => [s.med, s.q05, s.down, s.n]), hovertemplate: '%{x}: median |d| %{customdata[0]:.1f} bp, 5% quantile of d %{customdata[1]:.1f} bp, d ≤ −100 bp on %{customdata[2]:.2f}% of %{customdata[3]} days<extra></extra>' }],
    layout({ title: ttl('|d|, 1 January 2020 – ' + longDate(end) + ', coins ordered by median'), xaxis: AX('', { type: 'category' }),
      yaxis: AX('|d| (bp, log scale)', { type: 'log', dtick: 1 }), legend: LEG }));
  const f = s => `${NAME(s.c)} ${nf(s.med, 1)}`;
  out('pq-out', [T.pq1(longDate(end), S.map(f).join(', ')), T.pq2(S.map(s => `${NAME(s.c)} ${nf(s.down, 2)}`).join(', ')),
    T.pq3(gnum(S.find(s => s.c === 'USDC').p95), gnum(S.find(s => s.c === 'SUSD').p95))]);
}

// ================================================================= 1.4 a persistent depeg: sUSD
const SU_I0 = DV_D.indexOf('2024-07-01'), SU_X = DV_D.slice(SU_I0), SU_P = DV.SUSD.slice(SU_I0).map(v => (finite(v) ? 1 + v / 1e4 : null));
function susd() {
  const c = +$('su-c').value;
  $('su-c-v').textContent = nf(c, 2) + ' USD';
  plot('su-chart', [{ x: SU_X, y: SU_P, mode: 'lines', name: 'sUSD price (USD), EODHD daily close', line: { color: BA.red, width: 1.4 }, hovertemplate: 'sUSD %{x|%d %b %Y}: %{y:.3f} USD<extra></extra>' },
    { x: [SU_X[0], SU_X[SU_X.length - 1]], y: [1, 1], mode: 'lines', name: 'peg: 1 USD', line: { color: BA.blue, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' },
    { x: [SU_X[0], SU_X[SU_X.length - 1]], y: [c, c], mode: 'lines', name: 'threshold ' + nf(c, 2) + ' USD', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('sUSD (Synthetix), daily close since July 2024'), xaxis: AX('', { type: 'date' }), yaxis: AX('USD', { range: [0, 1.1] }), legend: LEG }));
  const y25 = SU_X.map((d, i) => [d, SU_P[i]]).filter(([d, p]) => d >= '2025-01-01' && finite(p));
  const below = y25.filter(([, p]) => p < c).length;
  const after = SU_X.map((d, i) => [d, SU_P[i]]).filter(([d, p]) => d >= '2025-09-01' && finite(p));
  const first = after.find(([, p]) => p < c);
  let stay = null; for (let i = after.length - 1; i >= 0; i--) { if (after[i][1] >= c) break; stay = after[i][0]; }
  out('su-out', [T.su1(nf(c, 2), below, y25.length), T.su2(nf(c, 2), first ? longDate(first[0]) : '—', stay ? longDate(stay) : '—'),
    T.su3(longDate(SU_X[SU_X.length - 1]), nf(SU_P[SU_P.length - 1], 2))]);
}

// ================================================================= 2.1 the check loss
const Y20 = [-120, -35, -12, -6, -3, -1, 0, 1, 2, 2, 3, 4, 5, 6, 8, 9, 11, 14, 18, 25];
const rho = (e, t) => e * (t - (e < 0 ? 1 : 0));
const lossAt = (q, t) => sum(Y20.map(y => rho(y - q, t)));
function argminSet(t) {              // the loss is piecewise linear with kinks at the observations: minimisers form [lo, hi]
  const L = Y20.map(q => lossAt(q, t)), m = Math.min(...L), at = Y20.filter((_, i) => L[i] - m < 1e-9);
  return { lo: Math.min(...at), hi: Math.max(...at), min: m };
}
function checkLoss() {
  const t = +$('cl-t').value;
  $('cl-t-v').textContent = nf(t, 2);
  const e = range(-3, 3, 0.03), qg = range(-130, 30, 0.2);
  const lines = [[t, BA.red, 'τ = ' + nf(t, 2) + ' (chosen)'], [0.5, BA.blue, 'τ = 0.5'], [0.95, BA.green, 'τ = 0.95']];
  plot('cl-rho', lines.map(([tt, col, nm], j) => ({ x: e, y: e.map(v => rho(v, tt)), mode: 'lines', name: 'ρ<sub>τ</sub>(e), ' + nm, line: { color: col, width: j ? 1.4 : 2.2, dash: j ? 'solid' : 'solid' },
    hovertemplate: nm + ': e = %{x:.2f}, loss %{y:.3f}<extra></extra>' })),
    layout({ title: ttl('Check loss ρ<sub>τ</sub>(e)'), xaxis: AX('residual e'), yaxis: AX('loss'), legend: LEG }));
  const A = argminSet(t), M = argminSet(0.5);
  const tr = [[t, BA.red], [0.5, BA.blue]].map(([tt, col]) => ({ x: qg, y: qg.map(q => lossAt(q, tt)), mode: 'lines', name: 'total loss, τ = ' + nf(tt, 2), line: { color: col, width: 1.6 },
    hovertemplate: 'τ = ' + nf(tt, 2) + ': q = %{x:.1f} bp, total loss %{y:.2f}<extra></extra>' }));
  tr.push({ x: A.lo === A.hi ? [A.lo] : [A.lo, A.hi], y: A.lo === A.hi ? [A.min] : [A.min, A.min], mode: A.lo === A.hi ? 'markers' : 'lines+markers', name: 'minimisers, τ = ' + nf(t, 2),
    line: { color: BA.red, width: 5 }, marker: { color: BA.red, size: 9 }, hovertemplate: 'minimiser q = %{x} bp, loss %{y:.2f}<extra></extra>' });
  tr.push({ x: [M.lo], y: [M.min], mode: 'markers', name: 'minimiser, τ = 0.5', marker: { color: BA.blue, size: 9 }, hovertemplate: 'q = %{x} bp, loss %{y:.2f}<extra></extra>' });
  plot('cl-sum', tr, layout({ title: ttl('Total check loss of the 20 daily deviations'), xaxis: AX('candidate quantile q (bp)'), yaxis: AX('Σ ρ<sub>τ</sub>(y<sub>i</sub> − q)'), legend: LEG }));
  out('cl-out', [T.cl1(nf(t, 2), nf(20 * t, 2)), A.lo === A.hi ? T.cl2(nf(t, 2), gnum(A.lo), nf(A.min, 2)) : T.cl3(nf(t, 2), gnum(A.lo), gnum(A.hi), nf(A.min, 2)), T.cl4(gnum(M.lo), gnum(M.hi), nf(M.min, 2))]);
}

// ================================================================= 2.3 the 5% quantile counts ranks, not depth
const RQ_I = [DV_D.indexOf('2022-07-01'), DV_D.indexOf('2024-03-31')];
function rollLower(a, W, q) {          // q-quantile of the W values before each day, pandas interpolation 'lower'
  const k = Math.floor(q * (W - 1)), outv = new Array(a.length).fill(null);
  for (let i = W; i < a.length; i++) {
    const w = a.slice(i - W, i);
    if (w.every(finite)) outv[i] = sortNum(w)[k];
  }
  return outv;
}
function rollq() {
  const W = +$('rq-w').value, k = Math.floor(0.05 * (W - 1)) + 1;
  $('rq-w-v').textContent = W + ' days';
  const x = DV_D.slice(RQ_I[0], RQ_I[1] + 1), tr = [], Q = {};
  [['USDC', BA.blue], ['DAI', BA.gold]].forEach(([c, col]) => {
    Q[c] = rollLower(DV[c], W, 0.05);
    tr.push({ x, y: DV[c].slice(RQ_I[0], RQ_I[1] + 1), mode: 'lines', name: c + ': daily deviation d (bp)', line: { color: col, width: 0.6 }, opacity: 0.45,
      hovertemplate: c + ' %{x|%d %b %Y}: d = %{y:.1f} bp<extra></extra>' });
    tr.push({ x, y: Q[c].slice(RQ_I[0], RQ_I[1] + 1), mode: 'lines', name: c + ': 5% quantile of the previous ' + W + ' days', line: { color: col, width: 2, shape: 'hv' },
      hovertemplate: c + ' %{x|%d %b %Y}: 5% quantile = %{y:.2f} bp<extra></extra>' });
  });
  plot('rq-chart', tr, layout({ title: ttl('Daily deviations and the 5% quantile of the previous ' + W + ' days, July 2022 – March 2024'),
    xaxis: AX('', { type: 'date' }), yaxis: AX('bp', { range: [-100, 40] }), shapes: [vline('2023-03-11', BA.eth, 'dot')], legend: LEG }));
  const at = (c, d) => Q[c][DV_D.indexOf(d)], y23 = c => Math.min(...Q[c].filter((v, i) => finite(v) && DV_D[i].startsWith('2023')));
  out('rq-out', [T.rq1(W, k), T.rq2(nf(at('USDC', '2023-03-11'), 2), nf(at('USDC', '2023-03-12'), 2), nf(at('USDC', '2023-03-15'), 2), nf(y23('USDC'), 2)),
    T.rq3(nf(at('DAI', '2023-03-12'), 2), nf(y23('DAI'), 2))]);
}

// ================================================================= 2.4 worked example: one equation, USDC after SVB
const LP = D.path, LP_PAL = [BA.green, BA.gold, BA.teal, BA.eth, '#6C3483', BA.blue, BA.red, '#D4AC0D', '#16A085', C.navy, '#884EA0', '#2874A6', '#B03A2E'];
function lassoPath() {
  const k = +$('lp-k').value, lam = LP.grid[k];
  $('lp-k-v').textContent = nf(lam, lam < 1 ? 4 : 2) + ' (' + (k + 1) + ' of 25)';
  plot('lp-path', LP.names.map((nm, j) => ({ x: LP.grid, y: LP.path[j], mode: 'lines', name: NAME(nm), line: { color: LP_PAL[j % LP_PAL.length], width: 1.4, dash: COINS.includes(nm) ? 'solid' : 'dash' },
    hovertemplate: NAME(nm) + ': λ = %{x:.4g}, slope %{y:.3f}<extra></extra>' })),
    layout({ title: ttl('Coefficient path, USDC, window of the 90 days to 19 March 2023'), xaxis: AX('λ (log scale)', { type: 'log', dtick: 1 }), yaxis: AX('β̂<sub>k</sub>(λ)'),
      shapes: [vline(LP.grid[LP.kb], BA.red, 'dot'), vline(lam, C.navy, 'solid')], legend: LEG }));
  plot('lp-gacv', [{ x: LP.grid, y: LP.gacv, mode: 'lines+markers', name: 'GACV(λ)', line: { color: BA.blue, width: 1.6 }, marker: { size: 5 }, hovertemplate: 'λ = %{x:.4g}: GACV %{y:.4f}<extra></extra>' },
    { x: LP.grid, y: LP.df, mode: 'lines', yaxis: 'y2', name: 'active predictors (right scale)', line: { color: BA.btc, width: 1.4, shape: 'hvh' }, hovertemplate: 'λ = %{x:.4g}: %{y} active<extra></extra>' },
    { x: [LP.grid[LP.kb], LP.grid[LP.kb]], y: [Math.min(...LP.gacv), Math.max(...LP.gacv)], mode: 'lines', name: 'selected λ̂', line: { color: BA.red, width: 1.4, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Selection of λ by GACV'), xaxis: AX('λ (log scale)', { type: 'log', dtick: 1 }), yaxis: AX('GACV'),
      yaxis2: AX('active set', { overlaying: 'y', side: 'right', range: [0, 13.5], showgrid: false }), shapes: [vline(lam, C.navy, 'solid')], legend: LEG, margin: { l: 56, r: 48, t: 30, b: 40 } }));
  const act = LP.names.map((nm, j) => [nm, LP.path[j][k]]).filter(([, v]) => Math.abs(v) > 1e-8).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const off = LP.names.filter((nm, j) => Math.abs(LP.path[j][k]) <= 1e-8).map(NAME);
  out('lp-out', [T.lp1(nf(LP.lmax, 1), nf(LP.grid[LP.kb], 3), LP.df[LP.kb], LP.names.length, nf(LP.gacv[LP.kb], 4)),
    T.lp2(nf(lam, lam < 1 ? 4 : 2), act.length, nf(LP.gacv[k], 4), act.slice(0, 3).map(([nm, v]) => `${NAME(nm)} ${nf(v, 2)}`).join(', ') || '—', off.join(', ') || 'none')]);
}

// ================================================================= 3.2 the DPI
const DP = D.dpi, DP_D = days(DP.dates), DP_Q = (() => { const s = sortNum(DP.dpi); return [0.2, 0.4, 0.6, 0.8].map(q => quant(s, q)); })();
const DP_M = [...new Set(DP_D.map(d => d.slice(0, 7)))].filter(m => m >= '2022-06');
const EVN = D.events;
function trendTo(end) {
  const n = DP_D.filter(d => d <= end).length, t0 = Date.parse(DP_D[0]);
  const x = DP_D.slice(0, n).map(d => (Date.parse(d) - t0) / 864e5 / 365.25), y = DP.dpi.slice(0, n).map(Math.log), f = ols(x, y), se = nwSE(x, f.e, 90);
  return { n, x, f, se, p: pNorm2(f.b / se), lo: f.b - 1.959964 * se, hi: f.b + 1.959964 * se };
}
function dpi() {
  const m = DP_M[+$('dp-e').value], end = m === '2026-10' ? '2026-10-23' : new Date(Date.UTC(+m.slice(0, 4), +m.slice(5, 7), 0)).toISOString().slice(0, 10);
  $('dp-e-v').textContent = longDate(end);
  const cat = DP.dpi.map(v => DP_Q.filter(q => v >= q).length);
  const tr = [{ x: DP_D, y: DP.dpi, mode: 'lines', name: 'DPI', showlegend: false, line: { color: 'rgba(26,58,110,0.55)', width: 0.6 }, hoverinfo: 'skip' }];
  QLAB.forEach((l, k) => { const ix = cat.map((c, i) => (c === k ? i : -1)).filter(i => i >= 0);
    tr.push({ x: ix.map(i => DP_D[i]), y: ix.map(i => DP.dpi[i]), mode: 'markers', name: `${l} (quintile ${k + 1})`, marker: { color: QCOL[k], size: 3.5 }, hovertemplate: 'DPI %{x|%d %b %Y}: %{y:.3f}<extra></extra>' }); });
  const R = trendTo(end), t0 = Date.parse(DP_D[0]);
  tr.push({ x: [DP_D[0], DP_D[R.n - 1]], y: [Math.exp(R.f.a), Math.exp(R.f.a + R.f.b * R.x[R.n - 1])], mode: 'lines', name: 'log-linear trend, sample to ' + longDate(end), line: { color: C.navy, width: 2, dash: 'dash' }, hoverinfo: 'skip' });
  const sh = EVN.dates.map(d => vline(d, BA.eth, 'dot')).concat([Object.assign(vline('2026-05-31', BA.red, 'dash'), { line: { color: BA.red, width: 1.2, dash: 'dash' } })]);
  const ann = EVN.names.map((nm, k) => ({ x: EVN.dates[k], y: Math.log10(k % 2 ? 2.4 : 3.2), text: nm, showarrow: false, font: { size: 9, color: BA.eth } }));
  tr.push({ x: [null], y: [null], mode: 'lines', name: "end of the paper's sample (31 May 2026)", line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' });
  plot('dp-chart', tr, layout({ title: ttl('DPI = mean selected λ of the 10 coin equations, daily, April 2020 – October 2026'), xaxis: AX('', { type: 'date' }),
    yaxis: AX('DPI (log scale)', { type: 'log', tickvals: [0.1, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2, 3], range: [Math.log10(0.08), Math.log10(3.8)] }), shapes: sh, annotations: ann, legend: LEG }));
  const yrs = [...new Set(DP_D.map(d => d.slice(0, 4)))];
  out('dp-out', [T.dp1(yrs.map(y => `${y} ${nf(median(DP.dpi.filter((_, i) => DP_D[i].startsWith(y))), 2)}`).join(', ')),
    T.dp2(gnum(R.n), longDate(end), (R.f.b >= 0 ? '+' : '') + nf(R.f.b, 3), nf(R.se, 3), nf(R.p, 2), nf(R.lo, 3), nf(R.hi, 3)), R.p < 0.05 ? T.dp3r() : T.dp3n()]);
}

// ================================================================= 3.3 which coins carry the DPI
const LAMD = D.lam, YRS = [...new Set(DP_D.map(d => d.slice(0, 4)))];
const CCOL = { USDT: BA.green, USDC: BA.blue, DAI: BA.gold, TUSD: BA.teal, USDP: BA.eth, GUSD: BA.btc, BUSD: '#C2185B', SUSD: BA.red, PAXG: '#D4AC0D', EURS: '#16A085' };
function dpiWithout(c) {               // mean of the available selected penalties, coin c left out
  return DP_D.map((_, i) => { const v = COINS.filter(k => k !== c).map(k => LAMD[k][i]).filter(finite); return v.length ? sum(v) / v.length : null; });
}
const annMed = x => YRS.map(y => median(x.filter((v, i) => finite(v) && DP_D[i].startsWith(y))));
function coinShares() {                // yearly mean of the terms lambda_j / J (J = coins available that day), normalised to 100% (as l6_more.py)
  const n = DP_D.map((_, i) => COINS.filter(k => finite(LAMD[k][i])).length), m = {};
  COINS.forEach(k => { m[k] = YRS.map(y => mean(DP_D.map((d, i) => (d.startsWith(y) && finite(LAMD[k][i]) ? LAMD[k][i] / n[i] : null)).filter(v => v !== null))); });
  const out_ = {};
  COINS.forEach(k => { out_[k] = YRS.map((_, j) => 100 * m[k][j] / sum(COINS.map(c => m[c][j]))); });
  return out_;
}
const DC_SH = coinShares();
function dpiCoins() {
  const c = $('dc-c').value, nm = c ? NAME(c) : '';
  const tr = COINS.map(k => ({ type: 'bar', x: YRS, y: DC_SH[k], name: NAME(k), marker: { color: CCOL[k], line: { color: k === c ? '#000' : 'rgba(0,0,0,0)', width: k === c ? 2 : 0 } },
    hovertemplate: NAME(k) + ' %{x}: %{y:.1f}% of the DPI<extra></extra>' }));
  plot('dc-share', tr, layout({ title: ttl('Share of each coin in the yearly mean of the DPI'), barmode: 'stack', xaxis: AX('', { type: 'category' }), yaxis: AX('share of the DPI (%)', { range: [0, 100] }), legend: LEG }));
  const all = annMed(DP.dpi), tr2 = [{ x: YRS, y: all, mode: 'lines+markers', name: 'DPI, 10 coins: annual median', line: { color: BA.blue, width: 2 }, hovertemplate: '%{x}: %{y:.3f}<extra></extra>' }];
  let wo = null;
  if (c) { wo = dpiWithout(c); tr2.push({ x: YRS, y: annMed(wo), mode: 'lines+markers', name: `DPI without ${nm} (9 coins): annual median`, line: { color: BA.red, width: 2, dash: 'dash' }, marker: { symbol: 'square' }, hovertemplate: '%{x}: %{y:.3f}<extra></extra>' }); }
  plot('dc-ann', tr2, layout({ title: ttl(c ? `Annual median of the DPI, with and without ${nm}` : 'Annual median of the DPI'), xaxis: AX('', { type: 'category' }), yaxis: AX('DPI'), legend: LEG }));
  const q4 = x => median(x.filter((v, i) => finite(v) && DP_D[i] >= '2025-10-01' && DP_D[i] <= '2025-12-31'));
  const lines = [T.dc0(YRS.map((y, j) => `${y} ${nf(all[j], 2)}`).join(', '))];
  if (c) {
    const a = annMed(wo), lx = [], ly = [];
    DP.dpi.forEach((v, i) => { if (finite(v) && finite(wo[i])) { lx.push(Math.log(v)); ly.push(Math.log(wo[i])); } });
    const mx = mean(lx), my = mean(ly), cv = sum(lx.map((v, i) => (v - mx) * (ly[i] - my))), r = cv / Math.sqrt(sum(lx.map(v => (v - mx) ** 2)) * sum(ly.map(v => (v - my) ** 2)));
    lines.push(T.dc1(nm, YRS.map((y, j) => `${y} ${nf(DC_SH[c][j], 1)}`).join(', ')), T.dc2(nm, YRS.map((y, j) => `${y} ${nf(a[j], 2)}`).join(', ')),
      T.dc3(nf(q4(DP.dpi), 2), nf(q4(wo), 2), nm, nf(r, 2)));
  }
  out('dc-out', lines);
}

// ================================================================= 3.4 event responses
const DPN = EVN.narrow, DPN_D = DPN.dates;
function response(dates, vals, d0, h, hac) {
  const t0 = Date.parse(d0), dd = s => (Date.parse(s) - t0) / 864e5;
  const pre = [], post = [];
  dates.forEach((s, i) => { const k = dd(s); if (k >= -60 && k <= -8) pre.push(vals[i]); else if (k >= 0 && k <= h) post.push(vals[i]); });
  const ch = 100 * (mean(post) / mean(pre) - 1);
  if (!hac) return { ch };
  const y = pre.concat(post).map(Math.log), x = pre.map(() => 0).concat(post.map(() => 1)), f = ols(x, y), se = nwSE(x, f.e, 30);
  return { ch, t: f.b / se, p: pNorm2(f.b / se) };
}
function events() {
  const h = +$('ev-h').value;
  $('ev-h-v').textContent = 'day ' + h;
  const own = EVN.dates.map(d => response(DP_D, DP.dpi, d, h, true)), nar = EVN.dates.map(d => response(DPN_D, DPN.dpi, d, h, false));
  const ph = holm(own.map(o => o.p)), x = EVN.names.map(n => n.replace('Iran-Hormuz', 'Iran–Hormuz'));
  plot('ev-chart', [
    { type: 'bar', x, y: EVN.paper, name: 'paper (CoinGecko, 11 coins), days 0..30', marker: { color: BA.blue }, hovertemplate: '%{x}, paper: %{y:+.1f}%<extra></extra>' },
    { type: 'bar', x, y: own.map(o => o.ch), name: 'own, λ grid [10⁻⁴, 1] λ<sub>max</sub>', marker: { color: BA.btc }, customdata: ph, hovertemplate: '%{x}, own: %{y:+.1f}% (Holm p %{customdata:.3f})<extra></extra>' },
    { type: 'bar', x, y: nar.map(o => o.ch), name: 'own, λ grid [10⁻², 1] λ<sub>max</sub>', marker: { color: BA.eth }, hovertemplate: '%{x}, narrow grid: %{y:+.1f}%<extra></extra>' }],
    layout({ title: ttl('Change of the mean DPI, days 0..' + h + ' against days −60..−8 (%)'), barmode: 'group', xaxis: AX('', { type: 'category' }), yaxis: AX('DPI change (%)'),
      shapes: [hline(0, BA.blue, 'solid')], legend: LEG }));
  out('ev-out', [T.ev0(h)].concat(EVN.names.map((n, k) => T.ev(n.replace('Iran-Hormuz', 'Iran–Hormuz'), (own[k].ch >= 0 ? '+' : '') + nf(own[k].ch, 1), fmtP(ph[k]), (nar[k].ch >= 0 ? '+' : '') + nf(nar[k].ch, 1)))));
}

// ================================================================= 4.1 who is linked to whom
const LK = D.links, LK_Y = ['all', ...new Set(LK.months.map(m => m.slice(0, 4)))];
const RDBU = [[0, '#053061'], [0.15, '#2166AC'], [0.3, '#4393C3'], [0.42, '#92C5DE'], [0.5, '#F7F7F7'], [0.58, '#F4A582'], [0.7, '#D6604D'], [0.85, '#B2182B'], [1, '#67001F']];
function linkMatrix(y) {
  const ms = LK.months.map((m, i) => (y === 'all' || m.startsWith(y) ? i : -1)).filter(i => i >= 0), n = COINS.length;
  const z = [], cnt = { pos: 0, neg: 0, tot: 0 };
  for (let a = 0; a < n; a++) { z.push([]); for (let b = 0; b < n; b++) {
    if (a === b) { z[a].push(null); continue; }
    let A = 0, I = 0, N = 0; ms.forEach(i => { A += LK.A[i][a][b]; I += LK.I[i][a][b]; N += LK.N[i][a][b]; cnt.tot += LK.T[i][a][b]; });
    cnt.pos += A; cnt.neg += I; z[a].push(N ? 100 * (A - I) / N : null);
  } }
  const mac = sum(ms.map(i => LK.mac[i])) / sum(ms.map(i => LK.macn[i]));
  return { z, cnt, mac, months: ms.length };
}
function links() {
  const y = LK_Y[+$('lk-y').value], M = linkMatrix(y), lab = COINS.map(NAME);
  $('lk-y-v').textContent = y === 'all' ? 'all days, April 2020 – October 2026' : y;
  const ann = [];
  M.z.forEach((r, a) => r.forEach((v, b) => { if (v !== null) ann.push({ x: lab[b], y: lab[a], text: nf(v, 0), showarrow: false, font: { size: 10, color: Math.abs(v) > 22 ? '#FFFFFF' : C.navy } }); }));
  plot('lk-chart', [{ type: 'heatmap', x: lab, y: lab, z: M.z, zmin: -40, zmax: 40, colorscale: RDBU, xgap: 1, ygap: 1, hoverongaps: false,
    colorbar: { title: { text: 'pp', side: 'right' }, thickness: 12, len: 0.9 }, name: 'signed selection frequency (pp)',
    hovertemplate: 'target %{y} ← predictor %{x}: %{z:.1f} pp<extra></extra>' }],
    layout({ title: ttl('Signed selection frequency (pp): % of daily equations with a positive slope minus % with a negative slope'),
      xaxis: AX('predictor stablecoin', { type: 'category', tickangle: -45 }), yaxis: AX('target stablecoin', { type: 'category', autorange: 'reversed' }), annotations: ann,
      margin: { l: 64, r: 12, t: 30, b: 60 } }));
  const flat = []; M.z.forEach((r, a) => r.forEach((v, b) => { if (v !== null) flat.push([v, lab[a], lab[b]]); }));
  flat.sort((p, q) => q[0] - p[0]);
  const f = ([v, a, b]) => `${a} ← ${b} (${nf(v, 0)})`;
  out('lk-out', [T.lk1(y === 'all' ? 'All days' : y, nf(100 * M.cnt.pos / M.cnt.tot, 1), nf(100 * M.cnt.neg / M.cnt.tot, 1), nf(100 * M.mac, 1)),
    T.lk2(flat.slice(0, 3).map(f).join(', '), f(flat[flat.length - 1]))]);
}

// ================================================================= 4.2 sparser models under pressure
function groups(x, g) {               // pandas qcut: quantile edges (linear), bins (e_{k-1}, e_k], the first bin closed
  const s = sortNum(x), e = range(0, g, 1).map(k => quant(s, k / g));
  return x.map(v => { for (let k = 1; k <= g; k++) if (v <= e[k]) return k - 1; return g - 1; });
}
function active() {
  const g = +$('ac-g').value, lab = g === 5 ? QLAB : range(1, g, 1).map(k => 'group ' + k);
  $('ac-g-v').textContent = g + (g === 5 ? ' (quintiles)' : g === 10 ? ' (deciles)' : '');
  const grp = groups(DP.dpi, g), m = range(0, g - 1, 1).map(k => mean(DP.active.filter((_, i) => grp[i] === k)));
  const col = g === 5 ? QCOL : m.map((_, k) => QCOL[Math.min(4, Math.floor(5 * k / g))]);
  plot('ac-chart', [{ type: 'bar', x: lab, y: m, name: 'mean number of active predictors (of 13), by DPI group', marker: { color: col }, text: m.map(v => nf(v, 2)), textposition: 'outside',
    cliponaxis: false, hovertemplate: '%{x}: %{y:.2f} active predictors<extra></extra>' }],
    layout({ title: ttl('Daily equations grouped by the DPI of the day (' + g + ' groups of equal size)'), xaxis: AX('DPI group, low to high', { type: 'category' }),
      yaxis: AX('active predictors', { range: [Math.min(...m) - 1, Math.max(...m) + 0.6] }), showlegend: true, legend: LEG }));
  let mono = true; for (let k = 1; k < g; k++) if (m[k] > m[k - 1]) mono = false;
  out('ac-out', [T.ac1(g, nf(m[0], 2), nf(m[g - 1], 2)), mono ? T.ac2y() : T.ac2n(), T.ac3(nf(spearman(DP.dpi, DP.active), 2))]);
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  const pq0 = PQ_M.indexOf('2026-05');
  $('pq-e').max = PQ_M.length - 1; $('pq-e').value = pq0; on(['pq-e'], pegQuality); P('pq-play', 'pq-e', range(0, PQ_M.length - 1, 1), 250);
  on(['su-c'], susd); P('su-play', 'su-c', range(0.99, 0.1, -0.01), 120);
  on(['cl-t'], checkLoss); P('cl-play', 'cl-t', range(0.01, 0.5, 0.01), 200);
  on(['rq-w'], rollq); P('rq-play', 'rq-w', [90, 75, 60, 45, 35, 30, 25, 22, 21, 20], 900);
  $('lp-k').value = LP.kb; on(['lp-k'], lassoPath); P('lp-play', 'lp-k', range(24, 0, -1), 450);
  const dp0 = DP_M.indexOf('2026-05');
  $('dp-e').max = DP_M.length - 1; $('dp-e').value = dp0; on(['dp-e'], dpi); P('dp-play', 'dp-e', range(0, DP_M.length - 1, 1), 300); tall('dp-chart', 420);
  on(['dc-c'], dpiCoins); P('dc-play', 'dc-c', ['USDT', 'USDC', 'DAI', 'TUSD', 'USDP', 'GUSD', 'SUSD', 'PAXG', 'EURS', '', 'BUSD'], 1400);
  on(['ev-h'], events); P('ev-play', 'ev-h', range(1, 30, 1), 350);
  $('lk-y').max = LK_Y.length - 1; on(['lk-y'], links); P('lk-play', 'lk-y', range(1, LK_Y.length - 1, 1).concat([0]), 1100); tall('lk-chart', 480);
  on(['ac-g'], active); P('ac-play', 'ac-g', range(2, 10, 1), 800);
  const PFX = { 'peg-quality': 'pq', 'susd': 'su', 'check-loss': 'cl', 'rollq': 'rq', 'dpi-coins': 'dc', 'lasso-path': 'lp', 'dpi': 'dp', 'events': 'ev', 'links': 'lk', 'active': 'ac' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  pegQuality(); susd(); checkLoss(); rollq(); lassoPath(); dpi(); dpiCoins(); events(); links(); active();
}
window.L6 = { pegQuality, susd, checkLoss, rollq, rollLower, lassoPath, dpi, dpiCoins, dpiWithout, events, links, active, pegStats, argminSet, trendTo, response, holm, linkMatrix, groups, spearman, days, PQ_M, DP_M, LK_Y };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
