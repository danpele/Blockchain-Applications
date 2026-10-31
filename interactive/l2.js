// Lecture 2 interactive page: one block per chart slide, computed in the browser from l2_data.js.
(function () {
'use strict';
const D = window.L2_DATA;
const { C, sum, mean, sdev, nf, pct, $, AX, layout, ttl, plot, out, vline, hline, Player, range, predict, exitTicket, solve } = window.MFMI;
const T = window.L2_TEXT;

// ---------------------------------------------------------------- colours (same as the slides)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', orange: '#E67E22', purple: '#8E44AD', teal: '#17A2B8' };
const COL = { btc: BA.btc, eth: BA.eth, sp500: BA.blue, gold: BA.gold };
const NAME = D.names;

// ---------------------------------------------------------------- helpers
const days = x => {                 // daily calendar {d0, n} or a list of dates
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const longMonth = s => `${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const LOG = { type: 'log', dtick: 1 };
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const median = a => { const b = a.filter(finite).sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const argmax = a => { let k = -1; a.forEach((v, j) => { if (finite(v) && (k < 0 || v > a[k])) k = j; }); return k; };
const argmin = a => { let k = -1; a.forEach((v, j) => { if (finite(v) && (k < 0 || v < a[k])) k = j; }); return k; };
function rollStd(a, w) {            // pandas rolling(w).std(), ddof = 1
  const res = new Array(a.length).fill(null);
  for (let i = w - 1; i < a.length; i++) res[i] = sdev(a.slice(i - w + 1, i + 1));
  return res;
}
function rollCorr(x, y, w) {        // pandas rolling(w).corr()
  const res = new Array(x.length).fill(null);
  for (let i = w - 1; i < x.length; i++) res[i] = corr(x.slice(i - w + 1, i + 1), y.slice(i - w + 1, i + 1));
  return res;
}
const corr = (x, y) => { const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c); };
const moments = a => {              // scipy skew and kurtosis (biased), as in the notebook
  const m = mean(a), n = a.length; let m2 = 0, m3 = 0, m4 = 0;
  a.forEach(v => { const d = v - m; m2 += d * d; m3 += d ** 3; m4 += d ** 4; });
  m2 /= n; m3 /= n; m4 /= n;
  return { skew: m3 / m2 ** 1.5, kurt: m4 / (m2 * m2) - 3 };
};

// ---------------------------------------------------------------- distributions
function erfc(x) {                  // Numerical Recipes erfcc, fractional error < 1.2e-7
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const normSf = x => 0.5 * erfc(x / Math.SQRT2);
const normCdf = x => 1 - normSf(x);
const normPdf = x => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
function normPpf(p) {               // Acklam's rational approximation, one Newton step
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  let x;
  if (p < 0.02425) { const q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else if (p > 1 - 0.02425) { const q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else { const q = p - 0.5, r = q * q; x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
  const e = normCdf(x) - p, u = e * Math.sqrt(2 * Math.PI) * Math.exp(x * x / 2);
  return x - u / (1 + x * u / 2);
}
function lgamma(x) {                // Lanczos
  const g = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x, tmp = x + 5.5; tmp -= (x + 0.5) * Math.log(tmp); let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += g[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}
function gammq(a, x) {              // regularised upper incomplete gamma Q(a, x)
  if (x <= 0) return 1;
  if (x < a + 1) { let ap = a, s = 1 / a, del = s; for (let n = 0; n < 500; n++) { ap++; del *= x / ap; s += del; if (Math.abs(del) < Math.abs(s) * 1e-15) break; } return 1 - s * Math.exp(-x + a * Math.log(x) - lgamma(a)); }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break; }
  return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
const chi2Sf = (x, k) => gammq(k / 2, x / 2);
function chi2Ppf(p, k) { let lo = 0, hi = 1000; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (1 - chi2Sf(m, k) < p) lo = m; else hi = m; } return (lo + hi) / 2; }
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sci = x => {                  // small positive numbers: 0.0063, then 5.7 × 10⁻⁷
  if (x >= 1e-4) return x.toPrecision(2);
  const [m, e] = x.toExponential(1).split('e');
  return m + ' × 10' + String(+e).split('').map(c => SUP[c]).join('');
};
const pfmt = p => (p < 0.001 ? '< 0.001' : nf(p, 3));

// ---------------------------------------------------------------- price series (the notebook's close(k)) and returns
const PX = {};
['btc', 'eth', 'sp500', 'gold'].forEach(k => { PX[k] = { d: days(D.px[k].dates), p: D.px[k].p }; });
function rets(k, start, from) {     // 100 ln(P_t / P_{t-1}) on the asset's own calendar; prices from `start`, returns kept from `from`
  const { d, p } = PX[k], x = [], y = [];
  let i0 = d.findIndex(v => v >= (start || '0000'));
  for (let i = i0 + 1; i < d.length; i++) if (!from || d[i] >= from) { x.push(d[i]); y.push(100 * Math.log(p[i] / p[i - 1])); }
  return { d: x, r: y };
}
const R18 = {};                     // 2018-2026, from the close of 31 December 2017
['btc', 'eth', 'sp500', 'gold'].forEach(k => { R18[k] = rets(k, D.start18, '2018-01-01'); });

// ================================================================= 2.3 the Normal distribution does not fit
const ASSETS = ['btc', 'eth', 'sp500', 'gold'];
const zsc = a => { const m = mean(a), s = sdev(a); return a.map(v => (v - m) / s); };
function qqTrace(k, thr) {
  const z = zsc(R18[k].r).sort((a, b) => a - b), n = z.length, q = z.map((_, i) => normPpf((i + 0.5) / n));
  const isOut = z.map(v => Math.abs(v) > thr);
  return { z, q, out: isOut };
}
function normalFit() {
  const thr = +$('nf-k').value, a = $('nf-a').value;
  $('nf-k-v').textContent = nf(thr, 1);
  const x = R18[a].r, m = mean(x), s = sdev(x);
  const xg = range(-15, 15, 0.1);
  plot('nf-hist', [
    { x: x.map(v => Math.max(-20, Math.min(20, v))), type: 'histogram', histnorm: 'probability density', xbins: { start: -20, end: 20, size: 40 / 120 }, name: NAME[a] + ', daily', marker: { color: COL[a] + 'BF' }, hovertemplate: '%{x}: density %{y:.3f}<extra></extra>' },
    { x: xg, y: xg.map(v => normPdf((v - m) / s) / s), mode: 'lines', name: 'Normal, same mean and sd', line: { color: BA.blue, width: 1.5 }, hoverinfo: 'skip' },
    ...[-1, 1].map(sg => ({ x: [m + sg * thr * s, m + sg * thr * s], y: [0, 0.3], mode: 'lines', line: { color: C.navy, width: 1, dash: 'dot' }, showlegend: false, hoverinfo: 'skip' }))],
    layout({ title: ttl(NAME[a] + ': histogram vs Normal'), xaxis: AX('daily log return (%)', { range: [-15, 15] }), yaxis: AX('density', { rangemode: 'tozero' }), bargap: 0 }));
  const qq = (id, k, col) => {
    const Q = qqTrace(k, thr), lim = Math.max(4.5, Math.ceil(Math.max(...Q.q.map(Math.abs))));
    plot(id, [
      { x: Q.q.filter((_, i) => !Q.out[i]), y: Q.z.filter((_, i) => !Q.out[i]), mode: 'markers', name: NAME[k] + ', standardised returns', marker: { size: 4, color: col }, hovertemplate: 'Normal quantile %{x:.2f}: %{y:.2f} sd<extra></extra>' },
      { x: Q.q.filter((_, i) => Q.out[i]), y: Q.z.filter((_, i) => Q.out[i]), mode: 'markers', name: 'beyond ' + nf(thr, 1) + ' sd', marker: { size: 6, color: BA.red, symbol: 'circle-open' }, hovertemplate: 'Normal quantile %{x:.2f}: %{y:.2f} sd<extra></extra>' },
      { x: [-lim, lim], y: [-lim, lim], mode: 'lines', name: 'Normal reference line', line: { color: BA.red, width: 1 }, hoverinfo: 'skip' }],
      layout({ title: ttl('QQ plot: ' + NAME[k]), xaxis: AX('Normal quantile'), yaxis: AX('standardised return') }));
  };
  qq('nf-qq1', a, COL[a]); qq('nf-qq2', 'sp500', BA.blue);
  const pN = 2 * normSf(thr), line = k => { const z = zsc(R18[k].r), o = z.filter(v => Math.abs(v) > thr).length, e = z.length * pN; return [o, e, z.length]; };
  const mo = moments(x), jb = x.length / 6 * (mo.skew ** 2 + mo.kurt ** 2 / 4);
  const [oa, ea, na] = line(a), [os, es] = line('sp500');
  const efmt = e => (e >= 10 ? gnum(e) : e >= 0.1 ? nf(e, 1) : sci(e));
  out('nf-out', [T.nf1(NAME[a], gnum(na), nf(mo.skew, 2), nf(mo.kurt, 1), gnum(jb)),
    T.nf2(nf(thr, 1), (100 * pN >= 0.1 ? nf(100 * pN, 2) : sci(100 * pN)) + '%'),
    T.nf3(NAME[a], oa, efmt(ea)), T.nf3('S&P 500', os, efmt(es))]);
}

// ================================================================= 3.1 volatility through time
const R16 = {}; ['btc', 'eth', 'sp500'].forEach(k => { R16[k] = rets(k, '2016-01-01'); });
const PPY = { btc: 365, eth: 365, sp500: 252 };
function rollingVol() {
  const w = +$('rv-w').value, ws = { btc: w, eth: w, sp500: Math.round(w * 252 / 365) };
  $('rv-w-v').textContent = w + ' crypto days, ' + ws.sp500 + ' S&P 500 days';
  const V = {};
  ['btc', 'eth', 'sp500'].forEach(k => { V[k] = rollStd(R16[k].r, ws[k]).map(v => (v === null ? null : v * Math.sqrt(PPY[k]))); });
  plot('rv-chart', ['btc', 'eth', 'sp500'].map(k => ({ x: R16[k].d, y: V[k], mode: 'lines', name: `${NAME[k]} (${ws[k]} returns x sqrt(${PPY[k]}))`, line: { color: COL[k], width: 1 }, hovertemplate: NAME[k] + ' %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' })),
    layout({ title: ttl('Rolling volatility, annualised'), xaxis: AX('', { type: 'date' }), yaxis: AX('Annualised volatility (%)', { rangemode: 'tozero' }) }));
  const rows = ['btc', 'eth', 'sp500'].map(k => { const v = V[k], j = argmax(v); return T.rv1(NAME[k], nf(median(v), 0), nf(v[j], 0), longDate(R16[k].d[j]), nf(v[v.length - 1], 0)); });
  const sp = new Map(R16.sp500.d.map((d, i) => [d, V.sp500[i]]));
  let n = 0, b = 0; R16.btc.d.forEach((d, i) => { const s = sp.get(d); if (finite(s) && finite(V.btc[i])) { n++; if (V.btc[i] < s) b++; } });
  out('rv-out', rows.concat([T.rv2(nf(100 * b / n, 1), gnum(n))]));
}

// ================================================================= 3.2 volatility clusters
const RB = rets('btc').r, NB = RB.length;
function acf(x, L) { const m = mean(x), e = x.map(v => v - m), den = sum(e.map(v => v * v)), res = []; for (let k = 1; k <= L; k++) { let s = 0; for (let t = k; t < e.length; t++) s += e[t] * e[t - k]; res.push(s / den); } return res; }
const ACF_R = acf(RB, 30), ACF_R2 = acf(RB.map(v => v * v), 30);
const ljung = (rho, m, n) => n * (n + 2) * sum(rho.slice(0, m).map((r, k) => r * r / (n - k - 1)));
function clusters() {
  const m = +$('vc-m').value, band = 1.96 / Math.sqrt(NB), lags = range(1, 30, 1);
  $('vc-m-v').textContent = m;
  const bars = (id, a, col, lab) => plot(id, [
    { x: lags, y: a, type: 'bar', name: lab, marker: { color: lags.map(l => (l <= m ? col : col + '55')) }, hovertemplate: 'lag %{x}: %{y:.3f}<extra></extra>' },
    { x: [0.5, 30.5], y: [band, band], mode: 'lines', name: '±1.96/√n', line: { color: C.navy, width: 1, dash: 'dash' }, hoverinfo: 'skip' },
    { x: [0.5, 30.5], y: [-band, -band], mode: 'lines', showlegend: false, line: { color: C.navy, width: 1, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl(lab + '; lags 1–' + m + ' enter Q(' + m + ')'), xaxis: AX('Lag (days)'), yaxis: AX('autocorrelation', { range: [-0.05, 0.15] }), bargap: 0.3,
      shapes: [vline(m + 0.5, C.navy, 'dot')] }));
  bars('vc-r', ACF_R, BA.blue, 'ACF of returns'); bars('vc-r2', ACF_R2, BA.red, 'ACF of squared returns');
  const q1 = ljung(ACF_R, m, NB), q2 = ljung(ACF_R2, m, NB), cv = chi2Ppf(0.95, m);
  out('vc-out', [T.vc0(gnum(NB), nf(band, 3)), T.vc1(m, nf(q1, 1), pfmt(chi2Sf(q1, m)), nf(q2, 1), pfmt(chi2Sf(q2, m)), nf(cv, 1)),
    T.vc2(ACF_R.filter(v => Math.abs(v) > band).length, ACF_R2.filter(v => v > band).length)]);
}

// ================================================================= 3.3 does Bitcoin move with equities?
function joint(a, b) {              // prices joined on common days first, then log returns
  const mb = new Map(PX[b].d.map((d, i) => [d, PX[b].p[i]])), d = [], pa = [], pb = [];
  PX[a].d.forEach((x, i) => { if (mb.has(x)) { d.push(x); pa.push(PX[a].p[i]); pb.push(mb.get(x)); } });
  return { d: d.slice(1), a: pa.slice(1).map((v, i) => 100 * Math.log(v / pa[i])), b: pb.slice(1).map((v, i) => 100 * Math.log(v / pb[i])) };
}
const PAIRS = [['btc', 'sp500', BA.blue], ['btc', 'gold', BA.gold], ['eth', 'sp500', BA.purple]].map(([a, b, c]) => Object.assign(joint(a, b), { k: a + '-' + b, lab: NAME[a] + ' and ' + NAME[b], c }));
const EVENTS = [['COVID-19', '2020-03-12', BA.red], ['Terra/Luna', '2022-05-09', BA.teal], ['FTX', '2022-11-08', BA.orange], ['spot ETFs', '2024-01-11', BA.green]];
function btcEquities() {
  const w = +$('bc-w').value;
  $('bc-w-v').textContent = w + ' common days';
  const RC = PAIRS.map(P => rollCorr(P.a, P.b, w));
  const tr = PAIRS.map((P, j) => ({ x: P.d, y: RC[j], mode: 'lines', name: P.lab, line: { color: P.c, width: 1.3 }, hovertemplate: P.lab + ' %{x|%d %b %Y}: %{y:.2f}<extra></extra>' }));
  EVENTS.forEach(([lab, d, c]) => tr.push({ x: [d, d], y: [-0.6, 1], mode: 'lines', name: lab, line: { color: c, width: 1, dash: 'dash' }, hoverinfo: 'skip' }));
  plot('bc-chart', tr, layout({ title: ttl('Rolling correlation of daily log returns, ' + w + ' common days'), xaxis: AX('', { type: 'date' }),
    yaxis: AX('Correlation (' + w + ' common days)', { range: [-0.6, 1] }), shapes: [hline(0, C.navy)] }));
  const P = PAIRS[0], c0 = P.d.findIndex(d => d >= '2020-01-01');
  const pre = corr(P.a.slice(0, c0), P.b.slice(0, c0)), post = corr(P.a.slice(c0), P.b.slice(c0));
  const rows = [T.bc0(gnum(P.d.length), nf(pre, 2), nf(post, 2))];
  PAIRS.forEach((Q, j) => { const v = RC[j], i = argmax(v); rows.push(T.bc1(Q.lab, nf(v[i], 2), longMonth(Q.d[i]), nf(v[v.length - 1], 2), nf(Math.min(...v.filter(finite)), 2))); });
  out('bc-out', rows);
}

// ================================================================= 4.2 efficiency through time
function varianceRatio(x, q) {      // the notebook's variance_ratio(): VR(q) and the robust Z*(q)
  const n = x.length, mu = mean(x), e = x.map(v => v - mu), see = sum(e.map(v => v * v)), varA = see / (n - 1);
  let sa = 0, run = 0;
  for (let i = 0; i < n; i++) { run += x[i]; if (i >= q) run -= x[i - q]; if (i >= q - 1) sa += (run - q * mu) ** 2; }
  const m = q * (n - q + 1) * (1 - q / n), vr = (sa / m) / varA, den = see * see;
  let theta = 0;
  for (let j = 1; j < q; j++) { let s = 0; for (let t = j; t < n; t++) s += e[t] * e[t] * e[t - j] * e[t - j]; theta += (2 * (q - j) / q) ** 2 * n * s / den; }
  return { vr, z: (vr - 1) / Math.sqrt(theta / n) };
}
const RFULL = { btc: rets('btc'), eth: rets('eth'), sp500: rets('sp500') };
function efficiency() {
  const w = +$('ef-w').value, q = +$('ef-q').value;
  $('ef-w-v').textContent = w + ' returns';
  const tr = [], rows = [];
  ['btc', 'eth', 'sp500'].forEach(k => {
    const x = RFULL[k].r, dd = [], zz = [];
    for (let e = w; e <= x.length; e += 21) { dd.push(RFULL[k].d[e - 1]); zz.push(varianceRatio(x.slice(e - w, e), q).z); }
    tr.push({ x: dd, y: zz, mode: 'lines', name: NAME[k], line: { color: COL[k], width: 1.2 }, hovertemplate: NAME[k] + ', window to %{x|%d %b %Y}: Z* = %{y:.2f}<extra></extra>' });
    const rej = zz.filter(v => Math.abs(v) > 1.96).length;
    rows.push(T.ef1(NAME[k], zz.length, rej, nf(100 * rej / zz.length, 1), nf(Math.min(...zz), 2), nf(Math.max(...zz), 2)));
  });
  tr.push({ x: ['2015-06-01', '2026-12-31'], y: [1.96, 1.96], mode: 'lines', name: '±1.96', line: { color: C.navy, width: 1, dash: 'dash' }, hoverinfo: 'skip' });
  tr.push({ x: ['2015-06-01', '2026-12-31'], y: [-1.96, -1.96], mode: 'lines', showlegend: false, line: { color: C.navy, width: 1, dash: 'dash' }, hoverinfo: 'skip' });
  plot('ef-chart', tr, layout({ title: ttl('Robust Z*(' + q + ') on windows of ' + w + ' returns, one window every 21 returns'), xaxis: AX('', { type: 'date', range: ['2015-06-01', '2026-12-31'] }),
    yaxis: AX('Robust Z*(' + q + ')') }));
  const full = varianceRatio(RFULL.btc.r, q);
  out('ef-out', [T.ef0(q, nf(full.vr, 3), nf(full.z, 2))].concat(rows));
}

// ================================================================= 5.1 drawdowns
const P16 = {}; ['btc', 'eth', 'sp500'].forEach(k => { const i0 = PX[k].d.findIndex(d => d >= '2016-01-01'); P16[k] = { d: PX[k].d.slice(i0), p: PX[k].p.slice(i0) }; });
const DD = {}; Object.entries(P16).forEach(([k, s]) => { let mx = -Infinity; DD[k] = s.p.map(v => { mx = Math.max(mx, v); return 100 * (v / mx - 1); }); });
function drawdowns() {
  const d = +$('dd-d').value;
  $('dd-d-v').textContent = d + '%';
  plot('dd-chart', ['btc', 'eth', 'sp500'].map(k => ({ x: P16[k].d, y: DD[k], mode: 'lines', name: NAME[k], line: { color: COL[k], width: 1.1 }, hovertemplate: NAME[k] + ' %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' })),
    layout({ title: ttl('Drawdown from the last record close, daily closes since 2016'), xaxis: AX('', { type: 'date' }), yaxis: AX('Drawdown (%)', { range: [-100, 3] }), shapes: [hline(-d, C.navy, 'dot')] }));
  const rows = ['btc', 'eth', 'sp500'].map(k => { const v = DD[k], j = argmin(v); return T.dd1(NAME[k], nf(v[j], 1), longDate(P16[k].d[j]), nf(100 * v.filter(x => x < -d).length / v.length, 0)); });
  out('dd-out', [T.dd0(d, gnum(100 * d / (100 - d)))].concat(rows));
}

// ================================================================= 5.3 LPPL fit, 2017
const LP = D.lppl, LP_D = days(LP.dates), T0 = Date.parse(LP.t0 + 'T00:00:00Z');
const tYears = d => (Date.parse(d + 'T00:00:00Z') - T0) / 864e5 / 365.25;
const yearsToDate = t => new Date(T0 + t * 365.25 * 864e5).toISOString().slice(0, 10);
const LP_T = LP_D.map(tYears);
function design(t, tc, m, om) { const dt = tc - t, f = dt ** m; return [1, f, f * Math.cos(om * Math.log(dt)), f * Math.sin(om * Math.log(dt))]; }
function lpplLinear(end, tc, m, om) {   // the linear step of the two-step estimation: A, B, C1, C2 by least squares given (t_c, m, omega)
  const idx = LP_D.map((d, i) => i).filter(i => LP_D[i] <= end), t = idx.map(i => LP_T[i]), y = idx.map(i => Math.log(LP.p[i]));
  const X = t.map(v => design(v, tc, m, om)), XtX = [0, 1, 2, 3].map(a => [0, 1, 2, 3].map(b => sum(X.map(r => r[a] * r[b])))), Xty = [0, 1, 2, 3].map(a => sum(X.map((r, i) => r[a] * y[i])));
  const coef = solve(XtX, Xty), fit = X.map(r => r[0] * coef[0] + r[1] * coef[1] + r[2] * coef[2] + r[3] * coef[3]);
  const my = mean(y), sse = sum(y.map((v, i) => (v - fit[i]) ** 2)), sst = sum(y.map(v => (v - my) ** 2));
  return { coef, r2: 1 - sse / sst, n: y.length, tEnd: t[t.length - 1], B: coef[1], CB: Math.hypot(coef[2], coef[3]) / Math.abs(coef[1]) };
}
function lpplCurve(t0, tc, m, om, coef) {
  const tt = range(0, 799, 1).map(i => t0 + (tc - 1e-4 - t0) * i / 799);
  return { x: tt.map(yearsToDate), y: tt.map(v => Math.exp(sum(design(v, tc, m, om).map((c, j) => c * coef[j])))) };
}
const lpPrice = () => ({ x: LP_D, y: LP.p, mode: 'lines', name: 'Bitcoin close (USD)', line: { color: BA.btc, width: 1.2 }, hovertemplate: 'Bitcoin %{x|%d %b %Y}: %{y:,.0f} USD<extra></extra>' });
function lppl2017() {
  const tc = +$('lp-tc').value / 365.25, F = LP.fit, end = F.end, L = lpplLinear(end, tc, F.m, F.om), cv = lpplCurve(LP_T[0], tc, F.m, F.om, L.coef), tcd = yearsToDate(tc);
  $('lp-tc-v').textContent = longDate(tcd);
  plot('lp-chart', [lpPrice(), { x: cv.x, y: cv.y, mode: 'lines', name: 'LPPL fit on 1 Jan - ' + shortDate(end), line: { color: BA.blue, width: 1.5 }, hovertemplate: 'LPPL %{x|%d %b %Y}: %{y:,.0f} USD<extra></extra>' },
    { x: [end, end], y: [700, 25000], mode: 'lines', name: 'end of estimation window', line: { color: BA.green, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' },
    { x: [tcd, tcd], y: [700, 25000], mode: 'lines', name: 'critical time t<sub>c</sub> = ' + shortDate(tcd), line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Bitcoin 2017: LPPL with m = ' + nf(F.m, 2) + ' and ω = ' + nf(F.om, 2) + ' fixed, t<sub>c</sub> chosen above'), xaxis: AX('', { type: 'date', range: ['2016-12-20', '2018-03-31'] }),
      yaxis: AX('USD (log scale)', LOG) }));
  out('lp-out', [T.lp0(longDate(end), L.n, nf(F.m, 3), nf(F.om, 2), longDate(yearsToDate(F.tc)), nf(F.r2, 3)),
    T.lp1(longDate(tcd), Math.round((tc - L.tEnd) * 365.25), nf(L.r2, 4)), T.lp2(nf(L.B, 3), nf(L.CB, 2), L.B < 0 && L.CB < 1 ? 'both hold' : (L.B < 0 ? 'B < 0 holds, |C|/|B| < 1 fails' : 'B < 0 fails'))]);
}

// ================================================================= 5.4 t_c window by window
const LW = LP.wins;
function tcWindows() {
  const j = +$('tw-e').value, W = LW[j], shown = LW.slice(0, j + 1);
  $('tw-e-v').textContent = longDate(W.end);
  const tcs = shown.map(w => yearsToDate(w.tc)), bnd = shown.filter(w => w.bound);
  plot('tw-tc', [
    { x: shown.map(w => w.end), y: tcs, mode: 'lines+markers', name: 'estimated critical time t<sub>c</sub>', line: { color: BA.blue, width: 1.3 }, marker: { size: 7 }, hovertemplate: 'window to %{x|%d %b}: estimated t<sub>c</sub> %{y|%d %b %Y}<extra></extra>' },
    { x: bnd.map(w => w.end), y: bnd.map(w => yearsToDate(w.tc)), mode: 'markers', name: 'fit at a parameter bound or at the window end', marker: { size: 13, color: 'rgba(0,0,0,0)', line: { color: BA.red, width: 1.6 } }, hoverinfo: 'skip' },
    { x: [LW[0].end, LW[LW.length - 1].end], y: [LP.peak, LP.peak], mode: 'lines', name: 'actual peak, ' + shortDate(LP.peak), line: { color: BA.btc, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' },
    { x: [LW[0].end, LW[LW.length - 1].end], y: [LW[0].end, LW[LW.length - 1].end], mode: 'lines', name: 'window end (t<sub>c</sub> cannot be earlier)', line: { color: BA.green, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Estimated t<sub>c</sub> by end of the estimation window (2017)'), legend: { orientation: 'h', x: 0, xanchor: 'left', y: -0.32, yanchor: 'top', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } }, xaxis: AX('end of the estimation window', { type: 'date', range: ['2017-09-27', '2017-12-14'] }),
      yaxis: AX('estimated t<sub>c</sub>', { type: 'date', range: ['2017-09-25', '2018-01-15'] }) }));
  const L = lpplLinear(W.end, W.tc, W.m, W.om), cv = lpplCurve(LP_T[0], W.tc, W.m, W.om, L.coef), tcd = yearsToDate(W.tc);
  plot('tw-fit', [lpPrice(), { x: cv.x, y: cv.y, mode: 'lines', name: 'LPPL fit to ' + shortDate(W.end), line: { color: BA.blue, width: 1.5 }, hovertemplate: 'LPPL %{x|%d %b %Y}: %{y:,.0f} USD<extra></extra>' },
    { x: [W.end, W.end], y: [700, 25000], mode: 'lines', name: 'end of estimation window', line: { color: BA.green, width: 1.2, dash: 'dot' }, hoverinfo: 'skip' },
    { x: [tcd, tcd], y: [700, 25000], mode: 'lines', name: 'estimated t<sub>c</sub>', line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Fit of the window ending ' + shortDate(W.end)), xaxis: AX('', { type: 'date', range: ['2017-06-01', '2018-02-28'] }), yaxis: AX('USD (log scale)', LOG) }));
  const kind = W.m9 ? 'at the bounds m = 0.9 and ω = 13' : W.atend ? 't<sub>c</sub> at the window end' : W.bound ? 'at a parameter bound' : 'interior';
  out('tw-out', [T.tw1(longDate(W.end), longDate(tcd), Math.round((W.tc - L.tEnd) * 365.25), nf(W.m, 2), nf(W.om, 2), kind, nf(L.r2, 3)),
    T.tw2(shown.length, shown.filter(w => w.m9).length, shown.filter(w => !w.bound).length, shortDate(yearsToDate(Math.min(...shown.map(w => w.tc)))), shortDate(yearsToDate(Math.max(...shown.map(w => w.tc)))))]);
}

// ================================================================= 5.6 Metcalfe value
const MF = D.metcalfe, MF_X = MF.tx.map(Math.log), MF_Y = MF.mc.map(Math.log), MF_D = MF.dates.map(d => d + '-15');
function metcalfe() {
  const b = +$('mf-b').value, c = mean(MF_Y.map((y, i) => y - b * MF_X[i])), lr = MF_Y.map((y, i) => y - c - b * MF_X[i]), ratio = lr.map(Math.exp);
  $('mf-b-v').textContent = nf(b, 2);
  plot('mf-lv', [
    { x: MF_D, y: MF.mc.map(v => v / 1e9), mode: 'lines', name: 'Bitcoin market value', line: { color: BA.btc, width: 1.3 }, hovertemplate: 'market value %{x|%b %Y}: %{y:,.0f} USD bn<extra></extra>' },
    { x: MF_D, y: MF_X.map(x => Math.exp(c + b * x) / 1e9), mode: 'lines', name: 'network value ∝ n<sup>' + nf(b, 2) + '</sup>', line: { color: BA.blue, width: 1.3, dash: 'dash' }, hovertemplate: 'network value %{x|%b %Y}: %{y:,.0f} USD bn<extra></extra>' }],
    layout({ title: ttl('Market value and network value (monthly)'), xaxis: AX('', { type: 'date' }), yaxis: AX('USD bn', LOG) }));
  plot('mf-ratio', [
    { x: MF_D, y: ratio, mode: 'lines', name: 'ratio: market value / network value', line: { color: BA.eth, width: 1.3 }, hovertemplate: 'ratio %{x|%b %Y}: %{y:.2f}<extra></extra>' },
    { x: [MF_D[0], MF_D[MF_D.length - 1]], y: [1, 1], mode: 'lines', name: 'ratio = 1', line: { color: C.navy, width: 1 }, hoverinfo: 'skip' },
    { x: [MF_D[0], MF_D[MF_D.length - 1]], y: [2, 2], mode: 'lines', name: 'ratio = 2', line: { color: BA.red, width: 1, dash: 'dot' }, hoverinfo: 'skip' },
    { x: [MF_D[0], MF_D[MF_D.length - 1]], y: [0.5, 0.5], mode: 'lines', name: 'ratio = 0.5', line: { color: BA.green, width: 1, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Ratio: market value / network value, b = ' + nf(b, 2)), xaxis: AX('', { type: 'date' }),
      yaxis: AX('ratio (log scale)', { type: 'log', tickvals: [0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8, 16], ticktext: ['0.05', '0.1', '0.25', '0.5', '1', '2', '4', '8', '16'] }) }));
  const im = argmax(ratio), in_ = argmin(ratio), sdl = Math.sqrt(sum(lr.map(v => v * v)) / lr.length);
  out('mf-out', [T.mf1(nf(b, 2), nf(ratio[im], 1), longMonth(MF.dates[im]), nf(ratio[in_], 2), longMonth(MF.dates[in_]), nf(ratio[ratio.length - 1], 2)),
    T.mf2(nf(100 * ratio.filter(v => v > 2).length / ratio.length, 0), nf(100 * ratio.filter(v => v < 0.5).length / ratio.length, 0), nf(sdl, 2)),
    T.mf3(MF.dates.length, nf(MF.b, 2), nf(MF.se, 2))]);
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  on(['nf-k', 'nf-a'], normalFit); P('nf-play', 'nf-k', range(2, 8, 0.5), 700);
  on(['rv-w'], rollingVol); P('rv-play', 'rv-w', [7, 14, 21, 30, 45, 60, 90, 120, 180, 250, 365], 600);
  on(['vc-m'], clusters); P('vc-play', 'vc-m', range(1, 30, 1), 350);
  on(['bc-w'], btcEquities); P('bc-play', 'bc-w', [30, 60, 90, 120, 180, 250, 320, 400, 500], 700);
  on(['ef-w', 'ef-q'], efficiency); P('ef-play', 'ef-w', range(250, 1500, 50), 450);
  on(['dd-d'], drawdowns); P('dd-play', 'dd-d', range(5, 90, 5), 450);
  const F = LP.fit, tEnd = tYears(F.end) * 365.25;
  $('lp-tc').min = (tEnd + 0.5).toFixed(2); $('lp-tc').max = (tEnd + 120).toFixed(2); $('lp-tc').value = (F.tc * 365.25).toFixed(2);
  on(['lp-tc'], lppl2017); P('lp-play', 'lp-tc', range(Math.ceil(tEnd + 1), Math.floor(tEnd + 120), 4), 350);
  $('tw-e').max = LW.length - 1; $('tw-e').value = LW.length - 1; on(['tw-e'], tcWindows); P('tw-play', 'tw-e', range(0, LW.length - 1, 1), 900);
  on(['mf-b'], metcalfe); P('mf-play', 'mf-b', range(1, 4.5, 0.1), 300);
  tall('lp-chart', 400);
  const PFX = { 'normal-fit': 'nf', 'volatility-time': 'rv', 'volatility-clusters': 'vc', 'btc-equities': 'bc', 'efficiency-time': 'ef', 'drawdowns': 'dd',
    'lppl-2017': 'lp', 'tc-windows': 'tw', 'metcalfe': 'mf' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  normalFit(); rollingVol(); clusters(); btcEquities(); efficiency(); drawdowns(); lppl2017(); tcWindows(); metcalfe();
}
window.L2 = { R18, rets, moments, varianceRatio, acf, ljung, chi2Sf, chi2Ppf, normSf, normPpf, lpplLinear, joint, rollStd, rollCorr, corr, days, DD, P16, PAIRS, RFULL, LW, tYears, yearsToDate };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
