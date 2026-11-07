// Lecture 5 interactive page: one block per chart slide, computed in the browser from l5_data.js.
(function () {
'use strict';
const D = window.L5_DATA;
const { C, sum, mean, nf, $, AX, layout, ttl, plot, out, vline, hline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L5_TEXT;

// ---------------------------------------------------------------- colours (same as the slides, Slides/code/l4_*.py)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', teal: '#17A2B8' };
const COL = { USDT: BA.green, USDC: BA.blue, DAI: BA.gold };
const COINS = ['USDT', 'USDC', 'DAI'];

// ---------------------------------------------------------------- helpers
const days = x => {                 // daily calendar {d0, n} or a list of dates
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const H = 36e5;
const hms = s => Date.parse(s + ':00Z');                         // 'YYYY-MM-DDTHH:00' -> ms (UTC)
const hours = x => { const t0 = hms(x.h0); return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * H).toISOString().slice(0, 16)); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const longHour = s => `${WD[new Date(hms(s)).getUTCDay()]} ${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}, ${s.slice(11, 16)} UTC`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const bp = p => (finite(p) ? 1e4 * (p - 1) : null);
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const LEG = { orientation: 'h', x: 0, xanchor: 'left', y: -0.2, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } };
const share = (a, x, ge) => { let k = 0, n = 0; a.forEach(v => { if (finite(v)) { n++; if (ge(v, x)) k++; } }); return n ? k / n : NaN; };

// ================================================================= 1.2 supply by mechanism and issuer
const SU = D.supply, SU_D = days(SU.dates);
const MCOL = { 'fiat-backed': BA.blue, 'crypto-backed': BA.eth, 'algorithmic': BA.red, 'other / not in snapshot': BA.teal };
function supply() {
  const i = +$('su-t').value, d = SU_D[i];
  $('su-t-v').textContent = longDate(d);
  const tr = SU.order.map(m => ({ x: SU_D, y: SU.mech[m], mode: 'lines', stackgroup: 'one', name: m, line: { width: 0, color: MCOL[m] },
    fillcolor: MCOL[m] + 'D9', hovertemplate: m + ' %{x|%d %b %Y}: %{y:,.1f} USD bn<extra></extra>' }));
  plot('su-stack', tr, layout({ title: ttl('USD stablecoins by mechanism (DefiLlama), daily'), xaxis: AX('', { type: 'date' }), yaxis: AX('USD bn'),
    shapes: [vline(d, C.navy, 'dot')], legend: LEG }));
  const tot = SU.tot[i];
  const iss = Object.keys(SU.iss).map(k => [k, SU.iss[k][i]]).filter(([, v]) => finite(v) && v > 0).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const sh = iss.map(([k, v]) => [k, 100 * v / tot]).reverse();
  plot('su-bar', [{ type: 'bar', orientation: 'h', y: sh.map(s => s[0]), x: sh.map(s => s[1]), name: 'issuer share of all USD stablecoins (%), ' + shortDate(d),
    marker: { color: sh.map(s => COL[s[0]] || BA.eth) }, text: sh.map(s => nf(s[1], 1)), textposition: 'outside', cliponaxis: false,
    hovertemplate: '%{y}: %{x:.1f}% of all USD stablecoins<extra></extra>' }],
    layout({ title: ttl('Eight largest issuers on ' + longDate(d)), xaxis: AX('%', { range: [0, Math.max(...sh.map(s => s[1])) * 1.18] }), yaxis: AX('', { automargin: true }),
      showlegend: true, legend: LEG, margin: { l: 64, r: 16, t: 30, b: 40 } }));
  const m = k => 100 * SU.mech[k][i] / tot, s = k => (finite(SU.iss[k][i]) ? 100 * SU.iss[k][i] / tot : 0);
  out('su-out', [T.su1(longDate(d), nf(tot, 1)), T.su2(nf(m('fiat-backed'), 1), nf(m('crypto-backed'), 1), nf(m('algorithmic'), 1), nf(m('other / not in snapshot'), 1)),
    T.su3(nf(s('USDT'), 1), nf(s('USDC'), 1), nf(s('USDT') + s('USDC'), 1))]);
}

// ================================================================= 2.3 the three dollars, day by day
const DL = D.daily, DL_D = days(DL.dates);
function daily() {
  const k = +$('dd-k').value;
  $('dd-k-v').textContent = k + ' bp';
  const tr = [], dom = [[0.69, 1], [0.355, 0.645], [0.02, 0.31]], shapes = [];
  COINS.forEach((s, j) => {
    const ya = j ? 'y' + (j + 1) : 'y';
    tr.push({ x: DL_D, y: DL.low[s].map(v => (finite(v) ? Math.max(v, -150) : null)), yaxis: ya, mode: 'lines', name: 'intraday low (bp), clipped at −150', legendgroup: 'low', showlegend: j === 0,
      line: { color: BA.red, width: 0.7 }, customdata: DL.low[s], hovertemplate: s + ' low %{x|%d %b %Y}: %{customdata:.1f} bp<extra></extra>' });
    tr.push({ x: DL_D, y: DL.close[s], yaxis: ya, mode: 'lines', name: s + ' close (bp)', line: { color: COL[s], width: 1 }, hovertemplate: s + ' close %{x|%d %b %Y}: %{y:.1f} bp<extra></extra>' });
    [k, -k].forEach(h => shapes.push({ type: 'line', xref: 'paper', yref: ya, x0: 0, x1: 1, y0: h, y1: h, line: { color: BA.eth, width: 1.2, dash: 'dot' } }));
  });
  tr.push({ x: [null], y: [null], mode: 'lines', name: '±' + k + ' bp', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  const ax = j => AX('bp', { domain: dom[j], range: [-150, 120], anchor: 'x' });
  plot('dd-chart', tr, layout({ title: ttl('Daily deviation of the close and of the intraday low, USDT (top), USDC, DAI (bottom)'),
    xaxis: AX('', { type: 'date', anchor: 'y3' }), yaxis: ax(0), yaxis2: ax(1), yaxis3: ax(2), shapes, legend: Object.assign({}, LEG, { y: -0.08 }),
    margin: { l: 56, r: 12, t: 30, b: 30 } }));
  out('dd-out', [T.dd0(gnum(DL_D.length), shortDate(DL_D[0]), shortDate(DL_D[DL_D.length - 1]), k)].concat(COINS.map(s =>
    T.dd(s, nf(100 * share(DL.close[s], k, (v, x) => Math.abs(v) >= x), 2), nf(100 * share(DL.low[s], k, (v, x) => v <= -x), 2)))));
}

// ================================================================= 2.4 tails and their frequency
function exceed() {
  const k = +$('ex-k').value;
  $('ex-k-v').textContent = k + ' bp';
  const xs = range(0, 3.2, 3.2 / 59).map(v => 10 ** v), tr = [];
  COINS.forEach(s => {
    tr.push({ x: xs, y: xs.map(x => share(DL.close[s], x, (v, z) => Math.abs(v) >= z)), mode: 'lines', name: s + ': close', line: { color: COL[s], width: 1.6 },
      hovertemplate: s + ' close: P(|d| ≥ %{x:.1f} bp) = %{y:.4f}<extra></extra>' });
    tr.push({ x: xs, y: xs.map(x => share(DL.low[s], x, (v, z) => v <= -z)), mode: 'lines', name: s + ': intraday low', line: { color: COL[s], width: 1.6, dash: 'dash' },
      hovertemplate: s + ' low: P(low ≤ −%{x:.1f} bp) = %{y:.4f}<extra></extra>' });
  });
  tr.push({ x: [k, k], y: [1e-4, 1], mode: 'lines', name: k + ' bp', line: { color: BA.red, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  plot('ex-curve', tr, layout({ title: ttl('Exceedance curves, 2021 – 23 Oct 2026'), xaxis: AX('x (bp)', { type: 'log', dtick: 1 }),
    yaxis: AX('P̂(|d| ≥ x)', { type: 'log', dtick: 1, range: [-3.5, 0.05] }), legend: LEG }));
  const yrs = [...new Set(DL_D.map(d => d.slice(0, 4)))], byY = {};
  COINS.forEach(s => { byY[s] = yrs.map(y => 100 * share(DL.close[s].filter((_, i) => DL_D[i].startsWith(y)), k, (v, x) => Math.abs(v) >= x)); });
  plot('ex-years', COINS.map(s => ({ type: 'bar', x: yrs, y: byY[s], name: s, marker: { color: COL[s] }, hovertemplate: s + ' %{x}: %{y:.1f}% of days<extra></extra>' })),
    layout({ title: ttl('Share of days with |d| ≥ ' + k + ' bp, by year'), barmode: 'group', xaxis: AX('', { type: 'category' }), yaxis: AX('% of days'), legend: LEG }));
  const last = yrs.length - 1;
  out('ex-out', [T.ex1(k, ...COINS.map(s => nf(byY[s][0], 1))), T.ex2(k, ...COINS.map(s => nf(byY[s][last], 1))),
    T.ex3(k, ...COINS.map(s => nf(100 * share(DL.low[s], k, (v, x) => v <= -x), 2)))]);
}

// ================================================================= 2.5 tail risk moves: rolling VaR 1%
function rollQuant(a, W, q) {        // rolling q-quantile of the last W values (current day included), linear interpolation as pandas
  const out = new Array(a.length).fill(null), win = [];
  const ins = v => { let lo = 0, hi = win.length; while (lo < hi) { const m = (lo + hi) >> 1; if (win[m] < v) lo = m + 1; else hi = m; } win.splice(lo, 0, v); };
  const del = v => { let lo = 0, hi = win.length; while (lo < hi) { const m = (lo + hi) >> 1; if (win[m] < v) lo = m + 1; else hi = m; } win.splice(lo, 1); };
  let bad = 0;
  for (let i = 0; i < a.length; i++) {
    if (finite(a[i])) ins(a[i]); else bad++;
    if (i >= W) { if (finite(a[i - W])) del(a[i - W]); else bad--; }
    if (i >= W - 1 && bad === 0) { const h = (W - 1) * q, f = Math.floor(h); out[i] = win[f] + (h - f) * ((win[Math.min(f + 1, W - 1)]) - win[f]); }
  }
  return out;
}
const RV_I0 = DL_D.indexOf('2022-01-01');
function rollvar() {
  const W = +$('rv-w').value;
  $('rv-w-v').textContent = W + ' days';
  const x = DL_D.slice(RV_I0), tr = [], rd = [];
  COINS.forEach(s => {
    const v = rollQuant(DL.close[s], W, 0.01).slice(RV_I0).map(q => (finite(q) ? -q : null));
    tr.push({ x, y: v, mode: 'lines', name: s + ': VaR 1% of the daily close deviation, past ' + W + ' days', line: { color: COL[s], width: 1.5, shape: 'hv' },
      hovertemplate: s + ' %{x|%d %b %Y}: VaR 1% = %{y:.1f} bp<extra></extra>' });
    let mx = -1e9, mi = 1e9, mxd = '', mid = '';
    v.forEach((q, j) => { if (finite(q)) { if (q > mx) { mx = q; mxd = x[j]; } if (q < mi) { mi = q; mid = x[j]; } } });
    rd.push(T.rv2(s, nf(v[v.length - 1], 1), nf(mx, 1), longDate(mxd), nf(mi, 1), longDate(mid)));
  });
  tr.push({ x: [x[0], x[x.length - 1]], y: [15, 15], mode: 'lines', name: '15 bp', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  plot('rv-chart', tr, layout({ title: ttl('VaR 1% of the daily close deviation over the previous ' + W + ' days, from January 2022'),
    xaxis: AX('', { type: 'date' }), yaxis: AX('VaR 1% (bp, a loss), log scale', { type: 'log', range: [Math.log10(1.5), Math.log10(400)] }), legend: LEG }));
  const pos = (W - 1) * 0.01, ord = k => k + (k === 1 ? 'st' : k === 2 ? 'nd' : k === 3 ? 'rd' : 'th');
  out('rv-out', [T.rv1(W, nf(pos, 2), ord(Math.floor(pos) + 1), ord(Math.floor(pos) + 2))].concat(rd));
}

// ================================================================= 2.5 the SVB weekend, hour by hour
const SV = D.svb, SV_H = hours(SV.hours), SV_X = SV_H.map(h => h.replace('T', ' '));
const SVB_S = 3.3 / 40;
function svb() {
  const i = +$('sv-t').value, R = +$('sv-r').value, h = SV_H[i];
  $('sv-t-v').textContent = longHour(h);
  const dv = s => SV[s].map(bp), cross = SV.USDC.map((v, j) => (finite(v) && finite(SV.USDT[j]) ? 1e4 * (v / SV.USDT[j] - 1) : null));
  const vR = -1e4 * SVB_S * (1 - R);
  const tr = ['USDC', 'DAI', 'USDT'].map(s => ({ x: SV_X, y: dv(s), mode: 'lines', name: s + ' vs USD (bp)', line: { color: COL[s], width: 1.4 },
    hovertemplate: s + ' %{x|%a %d %b %H:%M} UTC: %{y:.0f} bp<extra></extra>' }));
  tr.push({ x: SV_X, y: cross, mode: 'lines', name: 'USDC priced in USDT (bp)', line: { color: BA.red, width: 1.1, dash: 'dash' }, hovertemplate: 'USDC/USDT %{x|%a %d %b %H:%M} UTC: %{y:.0f} bp<extra></extra>' });
  tr.push({ x: [SV_X[0], SV_X[SV_X.length - 1]], y: [vR, vR], mode: 'lines', name: 'USDC redemption value with recovery rate R = ' + nf(R, 1) + ' (' + gnum(vR) + ' bp)',
    line: { color: C.navy, width: 1.4, dash: 'dot' }, hoverinfo: 'skip' });
  const ev = [['2023-03-11 03:00', 'Circle: 3.3bn USD of reserves at SVB', -1150], ['2023-03-12 22:15', 'Fed/FDIC/Treasury backstop', -700]];
  plot('sv-chart', tr, layout({ title: ttl('Hourly closes, 8 – 17 March 2023'), xaxis: AX('', { type: 'date', tickformat: '%d %b' }), yaxis: AX('bp', { range: [-1300, 300] }),
    shapes: ev.map(e => vline(e[0], BA.eth, 'dot')).concat([vline(SV_X[i], C.navy, 'solid')]),
    annotations: ev.map(e => ({ x: e[0], y: e[2], text: ' ' + e[1], showarrow: false, xanchor: 'left', font: { size: 10, color: BA.eth } })), legend: LEG }));
  const u = dv('USDC'), dd = dv('DAI'), t = dv('USDT');
  let lo = 0; u.forEach((v, j) => { if (finite(v) && v < u[lo]) lo = j; });
  const after = th => { for (let j = lo; j < u.length; j++) if (finite(u[j]) && u[j] > th) return j; return -1; };
  const kV = after(vR), k100 = after(-100), k15 = after(-15);
  out('sv-out', [T.sv1(longHour(h), gnum(u[i]), gnum(dd[i]), nf(t[i], 1), gnum(cross[i])),
    T.sv2(gnum(u[lo]), longHour(SV_H[lo]), nf(R, 1), gnum(vR), gnum(Math.abs(vR - u[lo])), u.filter(v => finite(v) && v < vR).length),
    T.sv3(kV >= 0 ? longHour(SV_H[kV]) : '—', longHour(SV_H[k100]), longHour(SV_H[k15]))]);
}

// ================================================================= 3.3 constant product against StableSwap
const D0 = 20;
function bisect(f, a, b, it = 200) { let fa = f(a); for (let k = 0; k < it; k++) { const m = 0.5 * (a + b), fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return 0.5 * (a + b); }
function ssY(x, A) { return bisect(y => 4 * A * (x + y) + D0 - 4 * A * D0 - D0 ** 3 / (4 * x * y), 1e-12, 10 * D0); }
function ssPrice(x, A) { const y = ssY(x, A), Fx = 4 * A + D0 ** 3 / (4 * x * x * y), Fy = 4 * A + D0 ** 3 / (4 * x * y * y); return { p: Fx / Fy, y }; }
const ssAtShare = (s, A) => { const x = bisect(z => z / (z + ssY(z, A)) - s, 10, 19.99, 80); return ssPrice(x, A).p; };
const ssSlip = (q, A) => 100 * (1 - (10 - ssY(10 + q, A)) / q);
const cpSlip = q => 100 * (1 - (10 - 100 / (10 + q)) / q);
const AV = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
const ammCurve = A => { const xs = range(0.2, 19.8, 19.6 / 199), pts = xs.map(x => { const r = ssPrice(x, A); return [x / (x + r.y), r.p]; }); return { x: pts.map(p => p[0]), y: pts.map(p => p[1]) }; };
const ammCache = {};
const curveOf = A => ammCache[A] || (ammCache[A] = ammCurve(A));
function amm() {
  const A = AV[+$('am-k').value];
  $('am-k-v').textContent = gnum(A);
  const sh = range(0.02, 0.98, 0.96 / 199), qs = range(0.1, 9.9, 9.8 / 99);
  const ref = [[10, BA.btc], [100, BA.eth], [2000, BA.blue]];
  const tp = [{ x: sh, y: sh.map(s => (1 - s) / s), mode: 'lines', name: 'constant product xy = k', line: { color: BA.red, width: 1.6 }, hovertemplate: 'constant product: share %{x:.2f}, price %{y:.3f}<extra></extra>' }];
  ref.forEach(([a, c]) => { const cv = curveOf(a); tp.push({ x: cv.x, y: cv.y, mode: 'lines', name: 'StableSwap, A = ' + gnum(a), line: { color: c, width: 1.4 }, hovertemplate: 'A = ' + a + ': share %{x:.3f}, price %{y:.4f}<extra></extra>' }); });
  const cv = curveOf(A);
  tp.push({ x: cv.x, y: cv.y, mode: 'lines', name: 'StableSwap, chosen A = ' + gnum(A), line: { color: BA.green, width: 2.4, dash: 'dash' }, hovertemplate: 'chosen A = ' + A + ': share %{x:.3f}, price %{y:.4f}<extra></extra>' });
  plot('am-price', tp, layout({ title: ttl('Marginal price of X against its share of a 2-coin pool'), xaxis: AX('share of token X in the pool', { range: [0, 1] }),
    yaxis: AX('marginal price of X (in Y)', { range: [0, 2.5] }), legend: Object.assign({}, LEG, { y: -0.3 }) }));
  const ts = [{ x: qs, y: qs.map(cpSlip), mode: 'lines', name: 'constant product', showlegend: false, line: { color: BA.red, width: 1.6 }, hovertemplate: 'constant product: sale %{x:.1f}m, slippage %{y:.3g}%<extra></extra>' }];
  ref.concat([[A, BA.green]]).forEach(([a, c], j) => ts.push({ x: qs, y: qs.map(q => ssSlip(q, a)), mode: 'lines', showlegend: false, name: 'A = ' + a,
    line: { color: c, width: j === 3 ? 2.4 : 1.4, dash: j === 3 ? 'dash' : 'solid' }, hovertemplate: 'A = ' + a + ': sale %{x:.1f}m, slippage %{y:.3g}%<extra></extra>' }));
  plot('am-slip', ts, layout({ title: ttl('Average slippage of a sale of X (pool: 10m X + 10m Y)'), xaxis: AX('sale of X, million'), yaxis: AX('average slippage (%, log scale)', { type: 'log', dtick: 1 }), showlegend: false }));
  out('am-out', [T.am1(gnum(A), nf(ssAtShare(0.8, A), 3), nf(ssAtShare(0.9, A), 3), nf(ssAtShare(0.95, A), 3)),
    T.am2(gnum(A), nf(ssSlip(1, A), 3), nf(ssSlip(5, A), 3), nf(ssSlip(9.5, A), 3), nf(cpSlip(1), 2), nf(cpSlip(5), 1))]);
}

// ================================================================= 4.2 episodes: duration and depth
const EPD = D.dh, EP_H = hours(EPD.hours), EP_A = EPD.d.map(v => (finite(v) ? Math.abs(v) : null));
function epList(k) {                 // episode starts (breach after 24 observed quiet hours), ambiguous onsets, duration and peak
  const n = EP_A.length, b = EP_A.map(v => finite(v) && v >= k), ev = [];
  let amb = 0;
  for (let t = 24; t < n; t++) {
    if (!b[t]) continue;
    let obsQuiet = 0, anyB = false;
    for (let j = t - 24; j < t; j++) { if (b[j]) anyB = true; else if (finite(EP_A[j])) obsQuiet++; }
    if (anyB) continue;
    if (obsQuiet < 24) { amb++; continue; }
    let run = 0, last = t, peak = EP_A[t], u = t;          // end: last breach before 24 consecutive hours without a breach
    for (u = t + 1; u < n; u++) {
      if (b[u]) { run = 0; last = u; } else run++;
      if (run === 24) break;
    }
    for (let j = t; j <= last; j++) if (finite(EP_A[j]) && EP_A[j] > peak) peak = EP_A[j];
    ev.push({ t: EP_H[t], dur: last - t + 1, peak });
  }
  return { ev, amb };
}
const YCOL = { 2022: BA.red, 2023: BA.eth, 2024: BA.blue, 2025: BA.gold, 2026: BA.green };
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : 0.5 * (s[m - 1] + s[m])) : NaN; };
function episodes() {
  const k = +$('ep-k').value;
  $('ep-k-v').textContent = k + ' bp';
  const { ev, amb } = epList(k), tr = [];
  Object.keys(YCOL).forEach(y => {
    const e = ev.filter(z => z.t.startsWith(y));
    tr.push({ x: e.map(z => z.dur), y: e.map(z => z.peak), customdata: e.map(z => z.t.replace('T', ' ')), mode: 'markers', type: 'scatter',
      name: `episodes starting in ${y} (${e.length})`, marker: { color: YCOL[y], size: 8 },
      hovertemplate: 'start %{customdata} UTC: %{x} h, peak %{y:.1f} bp<extra></extra>' });
  });
  tr.push({ x: [0.7, 500], y: [k, k], mode: 'lines', name: 'δ = ' + k + ' bp', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  plot('ep-scatter', tr, layout({ title: ttl('Duration and peak of each episode, USDC priced in USDT'), xaxis: AX('duration (hours, first to last breach hour)', { type: 'log', range: [-0.15, 2.7] }),
    yaxis: AX('peak |d| in the episode (bp)', { type: 'log', range: [Math.log10(8), Math.log10(1500)] }), legend: LEG }));
  const bins = [1, 2, 4, 7, 13, 25, 49, 97, 1e9], lab = ['1', '2-3', '4-6', '7-12', '13-24', '25-48', '49-96', '>96'];
  const cnt = lab.map((_, i) => ev.filter(z => z.dur >= bins[i] && z.dur < bins[i + 1]).length);
  plot('ep-hist', [{ type: 'bar', x: lab, y: cnt, name: 'number of episodes by duration', marker: { color: BA.blue }, text: cnt.map(String), textposition: 'outside',
    cliponaxis: false, hovertemplate: '%{x} h: %{y} episodes<extra></extra>' }],
    layout({ title: ttl('Episodes by duration, δ = ' + k + ' bp'), xaxis: AX('duration (hours)', { type: 'category' }), yaxis: AX('episodes'), showlegend: true, legend: LEG }));
  const d = ev.map(z => z.dur), pk = ev.map(z => z.peak);
  let mx = null; ev.forEach(z => { if (!mx || z.peak > mx.peak) mx = z; });
  out('ep-out', [T.ep1(k, ev.length, amb),
    T.ep2(nf(median(d), 1), d.filter(v => v === 1).length, d.filter(v => v <= 6).length, d.filter(v => v > 24).length),
    mx ? T.ep3(nf(median(pk), 1), gnum(mx.peak, 1), longHour(mx.t)) : '']);
}

// ================================================================= 4.5 worked example: the utility
const vl = l => (l >= 1 && l <= 24 ? 0.10 + 0.90 * (l - 1) / 23 : 0);
function utility() {
  const fm = +$('ut-f').value, l3 = +$('ut-l').value;
  $('ut-f-v').textContent = nf(fm, 1) + ' a month'; $('ut-l-v').textContent = l3 === 0 ? 'none (missed)' : l3 + ' h';
  const L = [14, 2, l3, 20], v = L.map(vl), vb = mean(v), U = vb - 0.05 * fm;
  const ll = range(0, 30, 0.05);
  plot('ut-chart', [
    { x: ll, y: ll.map(vl), mode: 'lines', name: 'v(ℓ): credit for the first valid alert, lead ℓ hours', line: { color: BA.blue, width: 1.8 }, hovertemplate: 'lead %{x:.1f} h: v = %{y:.3f}<extra></extra>' },
    { x: L, y: v, mode: 'markers+text', name: 'the four events of the example', marker: { color: BA.red, size: 10 }, text: ['event 1', 'event 2', 'event 3', 'event 4'], textposition: ['top center', 'top center', 'top right', 'top center'],
      textfont: { size: 10, color: BA.red }, hovertemplate: 'lead %{x} h: v = %{y:.3f}<extra></extra>' }],
    layout({ title: ttl('Credit per event and the four events of the example'), xaxis: AX('lead time (hours before the first breach)', { range: [-0.5, 30] }),
      yaxis: AX('v(ℓ)', { range: [-0.05, 1.12] }), legend: LEG,
      shapes: [{ type: 'rect', xref: 'x', yref: 'paper', x0: 1, x1: 24, y0: 0, y1: 1, fillcolor: 'rgba(46,125,50,0.08)', line: { width: 0 } }],
      annotations: [{ x: 12.5, y: 1.08, text: 'valid warning window [1 h, 24 h]', showarrow: false, font: { size: 10, color: BA.green } }] }));
  out('ut-out', [T.ut1(v.map(x => nf(x, 3)).join(', '), nf(vb, 3)), T.ut2(nf(vb, 3), nf(fm, 1), nf(U, 3)), T.ut3(nf(vb / 0.05, 2))]);
}

// ================================================================= 4.6 results of the paper, Table 1
const T1 = D.t1, MODELS = Object.keys(T1), MC = { 'CatBoost': BA.red, 'Random forest': BA.green, 'XGBoost': BA.blue, 'LightGBM': BA.btc };
const MET = { U: [1, 'event utility U (95% CI)'], recall: [4, 'timely event recall'], fa: [5, 'false alerts per month'] };
function paperT1() {
  const a = +$('pt-a').value, m = $('pt-m').value, [j, lab] = MET[m], off = [-0.27, -0.09, 0.09, 0.27];
  $('pt-a-v').textContent = 'α = ' + T1.CatBoost[a][0];
  const tr = MODELS.map((k, n) => {
    const rows = T1[k], y = rows.map(r => r[j]);
    const t = { x: rows.map((_, q) => q + off[n]), y, mode: 'markers', name: k, marker: { color: MC[k], size: 8 },
      hovertemplate: k + ', α = %{customdata}: %{y:.3f}<extra></extra>', customdata: rows.map(r => r[0]) };
    if (m === 'U') t.error_y = { type: 'data', symmetric: false, array: rows.map(r => r[3] - r[1]), arrayminus: rows.map(r => r[1] - r[2]), color: MC[k], thickness: 1.2, width: 3 };
    return t;
  });
  const sh = [{ type: 'rect', xref: 'x', yref: 'paper', x0: a - 0.45, x1: a + 0.45, y0: 0, y1: 1, fillcolor: 'rgba(26,58,110,0.08)', line: { width: 0 } }];
  if (m === 'U') sh.push(hline(0, BA.blue, 'solid'));
  if (m === 'fa') sh.push(hline(2, BA.eth, 'dot'));
  plot('pt-chart', tr, layout({ title: ttl('Chaffard et al. (2026), Table 1: test fold, alert threshold chosen on validation'),
    xaxis: AX('', { tickvals: [0, 1, 2, 3, 4, 5], ticktext: T1.CatBoost.map(r => 'α = ' + r[0]), range: [-0.6, 5.6] }), yaxis: AX(lab), shapes: sh, legend: LEG }));
  const rk = MODELS.map(k => [k, T1[k][a][j]]).sort((p, q) => (m === 'fa' ? p[1] - q[1] : q[1] - p[1]));
  const win = MODELS.map(k => 0), best = [];
  for (let q = 0; q < 6; q++) { let b = 0; MODELS.forEach((k, n) => { if (T1[k][q][1] > T1[MODELS[b]][q][1]) b = n; }); win[b]++; best.push(MODELS[b]); }
  out('pt-out', [T.pt1(T1.CatBoost[a][0], lab, rk.map(([k, v]) => `${k} ${nf(v, m === 'fa' ? 2 : 3)}`).join(', ')),
    T.pt2(MODELS.map((k, n) => `${k} ${win[n]}`).join(', '))]);
}

// ================================================================= 4.8 recall against false alerts
const EW = D.ew, EW_T0 = hms(EW.hours.h0), EW_V0 = hms(EW.vhours.h0);
const EV = EW.ev.map(hms), AMB = EW.amb.map(hms);
function evaluate(score, t0, thr, first, last) {
  // alert episodes (24 h refractory), event credit in [tau - 24 h, tau - 1 h], false alerts per month, utility U (the notebook's evaluate())
  const alerts = []; let lastA = null;
  for (let i = 0; i < score.length; i++) {
    const v = score[i]; if (!finite(v) || v < thr) continue;
    const t = t0 + i * H; if (lastA === null || t - lastA >= 24 * H) { alerts.push(t); lastA = t; }
  }
  const evs = EV.filter(t => t >= first + 24 * H && t <= last), used = new Set(), leads = [];
  AMB.forEach(tau => alerts.forEach(a => { if (a >= tau - 24 * H && a <= tau - H) used.add(a); }));
  evs.forEach(tau => {
    const win = alerts.filter(a => a >= tau - 24 * H && a <= tau - H);
    if (win.length) { leads.push((tau - win[0]) / H); win.forEach(a => used.add(a)); } else leads.push(0);
  });
  const months = (last - first) / (30.44 * 864e5), fa = alerts.filter(a => !used.has(a)).length / months;
  const det = leads.filter(l => l > 0).sort((a, b) => a - b), med = det.length ? (det[(det.length - 1) >> 1] + det[det.length >> 1]) / 2 : NaN;
  return { events: evs.length, detected: det.length, recall: evs.length ? det.length / evs.length : NaN, lead: med, fa, U: (leads.length ? mean(leads.map(vl)) : 0) - 0.05 * fa, alerts: alerts.length };
}
const quantile = (sorted, q) => { const p = q * (sorted.length - 1), lo = Math.floor(p), hi = Math.ceil(p); return sorted[lo] + (sorted[hi] - sorted[lo]) * (p - lo); };
function binCdf(k, n, p) { let s = 0, c = 1; for (let i = 0; i <= k; i++) { s += c * p ** i * (1 - p) ** (n - i); c = c * (n - i) / (i + 1); } return s; }
function clopper(k, n) {             // Clopper-Pearson 95% interval
  const lo = k === 0 ? 0 : bisect(p => (1 - binCdf(k - 1, n, p)) - 0.025, 0, 1, 100);
  const hi = k === n ? 1 : bisect(p => binCdf(k, n, p) - 0.025, 0, 1, 100);
  return [lo, hi];
}
const EW_FIRST = hms(EW.first), EW_LAST = hms(EW.last), EW_VF = hms(EW.vfirst), EW_VL = hms(EW.vlast);
const ruleTest = k => evaluate(EW.absd, EW_T0, k, EW_FIRST, EW_LAST), ruleVal = k => evaluate(EW.vabsd, EW_V0, k, EW_VF, EW_VL);
let curves = null;
function ewCurves() {
  if (curves) return curves;
  curves = { rule: range(4, 14, 1).map(ruleTest) };
  [['logit', EW.logit], ['gb', EW.gb]].forEach(([nm, s]) => {
    const sorted = s.filter(finite).sort((a, b) => a - b), qs = [...new Set(range(0, 39, 1).map(j => quantile(sorted, 0.90 + j * (0.999 - 0.90) / 39)))].sort((a, b) => a - b);
    curves[nm] = qs.map(q => evaluate(s, EW_T0, q, EW_FIRST, EW_LAST));
  });
  return curves;
}
function tradeoff() {
  const k = +$('tf-k').value, cv = ewCurves(), r = ruleTest(k), rv = ruleVal(k);
  $('tf-k-v').textContent = k + ' bp';
  const ln = (c, name, color, sym) => ({ x: c.map(p => p.fa), y: c.map(p => p.recall), mode: 'lines+markers', name, line: { color, width: 1.2 }, marker: { symbol: sym, size: 6, color },
    customdata: c.map(p => [p.detected, p.U]), hovertemplate: '%{x:.2f} false alerts a month, recall %{y:.1f} (%{customdata[0]} of 5), U = %{customdata[1]:.3f}<extra></extra>' });
  plot('tf-chart', [ln(cv.rule, 'rule |d<sub>t</sub>| ≥ k, k = 4..14 bp', BA.green, 'circle'), ln(cv.logit, 'logistic, price-only features', BA.blue, 'square'),
    ln(cv.gb, 'gradient boosting, price-only features', BA.btc, 'triangle-up'),
    { x: [2.5], y: [0.723], mode: 'markers', name: 'paper: CatBoost, on-chain features (other sample)', marker: { symbol: 'star', size: 14, color: BA.red }, hovertemplate: 'paper: 2.50 false alerts a month, recall 0.723<extra></extra>' },
    { x: [r.fa], y: [r.recall], mode: 'markers', name: 'chosen rule, k = ' + k + ' bp', marker: { size: 15, color: 'rgba(0,0,0,0)', line: { color: C.navy, width: 2.2 } }, hovertemplate: 'k = ' + k + ' bp: %{x:.2f} false alerts a month, recall %{y:.1f}<extra></extra>' },
    { x: [2, 2], y: [-0.03, 1.03], mode: 'lines', name: 'false-alert budget: 2 per month', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Test period 2 Jan 2025 – 23 Oct 2026, 5 events'), xaxis: AX('false-alert episodes per month (test period)', { range: [0, 15] }),
      yaxis: AX('timely event recall', { range: [-0.03, 1.03] }), legend: LEG }));
  const ci = clopper(r.detected, r.events);
  out('tf-out', [T.tf1(k, r.detected, r.events, nf(r.recall, 1), nf(ci[0], 2), nf(ci[1], 2), finite(r.lead) ? nf(r.lead, 1) + ' h' : '—', nf(r.fa, 2), nf(r.U, 3)),
    T.tf2(k, rv.detected, rv.events, nf(rv.fa, 2), nf(rv.U, 3)), T.tf3(EW.kbest)]);
}

// ================================================================= 5 the last twelve weeks
const RC = D.recent, RC_H = hours(RC.hours), RC_X = RC_H.map(h => h.replace('T', ' '));
const RC_CROSS = RC.USDC.map((v, j) => (finite(v) && finite(RC.USDT[j]) ? 1e4 * (v / RC.USDT[j] - 1) : null));
function recent() {
  const k = +$('rc-k').value;
  $('rc-k-v').textContent = nf(k, 1) + ' bp';
  const tr = ['USDT', 'USDC', 'DAI'].map(s => ({ x: RC_X, y: RC[s].map(bp), mode: 'lines', name: s + ' vs USD (bp), hourly', line: { color: COL[s], width: 0.9 },
    hovertemplate: s + ' %{x|%d %b %H:%M} UTC: %{y:.1f} bp<extra></extra>' }));
  tr.push({ x: RC_X, y: RC_CROSS, mode: 'lines', name: 'USDC priced in USDT (bp)', line: { color: BA.red, width: 1.1, dash: 'dash' }, hovertemplate: 'USDC/USDT %{x|%d %b %H:%M} UTC: %{y:.1f} bp<extra></extra>' });
  tr.push({ x: [RC_X[0], RC_X[RC_X.length - 1]], y: [k, k], mode: 'lines', name: 'alert level ±' + nf(k, 1) + ' bp', line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  tr.push({ x: [RC_X[0], RC_X[RC_X.length - 1]], y: [-k, -k], mode: 'lines', showlegend: false, line: { color: BA.eth, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' });
  plot('rc-chart', tr, layout({ title: ttl('Hourly closes, 1 August – 23 October 2026'), xaxis: AX('', { type: 'date', tickformat: '%d %b' }), yaxis: AX('bp'), legend: LEG }));
  const oct = RC_H.map((h, j) => (h >= '2026-10-01' ? j : -1)).filter(j => j >= 0), ov = oct.map(j => RC_CROSS[j]).filter(finite);
  const above = ov.filter(v => v >= k).length;
  let mx = -1e9, mxh = ''; oct.forEach(j => { if (finite(RC_CROSS[j]) && RC_CROSS[j] > mx) { mx = RC_CROSS[j]; mxh = RC_H[j]; } });
  const ep = evaluate(RC_CROSS.map(v => (finite(v) ? Math.abs(v) : null)), hms(RC.hours.h0), k, hms(RC.hours.h0), hms(RC_H[RC_H.length - 1]));
  const tt = RC.USDT.map(bp), mm = (a, b) => mean(tt.filter((v, j) => finite(v) && RC_H[j] >= a && RC_H[j] < b));
  out('rc-out', [T.rc1(nf(mm('2026-08', '2026-09'), 1), nf(mm('2026-09', '2026-10'), 1), nf(mm('2026-10', '2026-11'), 1)),
    T.rc2(nf(mean(ov), 1), nf(mx, 1), longHour(mxh), nf(k, 1), above, oct.length),
    T.rc3(nf(k, 1), ep.alerts)]);
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  const n = SU_D.length - 1, j20 = SU_D.indexOf('2020-01-01');
  $('su-t').max = n; $('su-t').value = n; on(['su-t'], supply); P('su-play', 'su-t', range(j20, n, 30).concat([n]), 110);
  on(['dd-k'], daily); P('dd-play', 'dd-k', range(5, 100, 5), 450); tall('dd-chart', 560);
  on(['ex-k'], exceed); P('ex-play', 'ex-k', range(5, 100, 5), 450);
  on(['rv-w'], rollvar); P('rv-play', 'rv-w', [60, 90, 120, 180, 270, 365, 540, 730], 900);
  let lo = 0; SV.USDC.forEach((v, j) => { if (finite(v) && v < SV.USDC[lo]) lo = j; });
  $('sv-t').max = SV_H.length - 1; $('sv-t').value = lo; on(['sv-t', 'sv-r'], svb); P('sv-play', 'sv-t', range(lo, Math.min(SV_H.length - 1, lo + 72), 1), 160);
  on(['am-k'], amm); P('am-play', 'am-k', range(0, AV.length - 1, 1), 900);
  on(['ep-k'], episodes); P('ep-play', 'ep-k', range(10, 50, 1), 450);
  on(['ut-f', 'ut-l'], utility); P('ut-play', 'ut-f', range(0, 10, 0.5), 300);
  on(['pt-a', 'pt-m'], paperT1); P('pt-play', 'pt-a', [0, 1, 2, 3, 4, 5], 1000);
  on(['tf-k'], tradeoff); P('tf-play', 'tf-k', range(4, 25, 1), 600);
  on(['rc-k'], recent); P('rc-play', 'rc-k', range(5, 20, 0.5), 350);
  const PFX = { 'supply': 'su', 'dev-daily': 'dd', 'exceed': 'ex', 'rollvar': 'rv', 'svb': 'sv', 'episodes': 'ep', 'amm': 'am', 'utility': 'ut', 'paper-t1': 'pt', 'tradeoff': 'tf', 'recent': 'rc' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  supply(); daily(); exceed(); rollvar(); svb(); amm(); episodes(); utility(); paperT1(); tradeoff(); recent();
}
window.L5 = { supply, daily, exceed, rollvar, rollQuant, svb, amm, episodes, epList, utility, paperT1, tradeoff, recent, evaluate, ruleTest, ruleVal, ewCurves, clopper, ssAtShare, ssSlip, ssPrice, vl, days, hours, share };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
