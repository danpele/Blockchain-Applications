// Lecture 4 interactive page: one block per chart slide, computed in the browser from l4_data.js.
(function () {
'use strict';
const D = window.L4_DATA;
const { C, sum, mean, sdev, nf, pct, $, AX, layout, ttl, plot, out, vline, hline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L4_TEXT;

// ---------------------------------------------------------------- colours (same as the slides)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', orange: '#E67E22', purple: '#8E44AD', teal: '#17A2B8' };
const COL = { btc: BA.btc, eth: BA.eth, sp500: BA.blue, gold: BA.gold };
const NAME = { btc: 'Bitcoin', eth: 'Ethereum', sp500: 'S&P 500', gold: 'Gold' };

// ---------------------------------------------------------------- helpers
const days = x => {                 // daily calendar {d0, n} or a list of dates
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const median = a => { const b = a.filter(finite).sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const argmax = a => { let k = -1; a.forEach((v, j) => { if (finite(v) && (k < 0 || v > a[k])) k = j; }); return k; };
function acf(x, L) { const m = mean(x), e = x.map(v => v - m), den = sum(e.map(v => v * v)), res = []; for (let k = 1; k <= L; k++) { let s = 0; for (let t = k; t < e.length; t++) s += e[t] * e[t - k]; res.push(s / den); } return res; }
function quantile(a, p) {           // pandas Series.quantile (linear interpolation)
  const b = [...a].sort((x, y) => x - y), h = (b.length - 1) * p, lo = Math.floor(h);
  return b[lo] + (h - lo) * ((b[lo + 1] === undefined ? b[lo] : b[lo + 1]) - b[lo]);
}
const pc = x => String(+x.toFixed(2));            // 1 -> '1', 2.5 -> '2.5', 0.25 -> '0.25'
const pfmt = p => (p < 0.001 ? '< 0.001' : nf(p, 3));

// ---------------------------------------------------------------- distributions
function erfc(x) {                  // Numerical Recipes erfcc, fractional error < 1.2e-7
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const normCdf = x => 1 - 0.5 * erfc(x / Math.SQRT2);
const normPdf = x => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
function bisect(f, lo, hi, it = 200) { for (let i = 0; i < it; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; } return (lo + hi) / 2; }
const normPpf = p => bisect(x => normCdf(x) - p, -40, 40);
function lgamma(x) {                // Lanczos
  const g = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x, tmp = x + 5.5; tmp -= (x + 0.5) * Math.log(tmp); let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += g[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}
function betacf(a, b, x) {          // continued fraction of the incomplete beta function (Numerical Recipes)
  const FP = 1e-300; let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < FP) d = FP; d = 1 / d; let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FP) d = FP; c = 1 + aa / c; if (Math.abs(c) < FP) c = FP; d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FP) d = FP; c = 1 + aa / c; if (Math.abs(c) < FP) c = FP; d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return h;
}
function betai(a, b, x) {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
}
const tCdf = (x, nu) => { const p = 0.5 * betai(nu / 2, 0.5, nu / (nu + x * x)); return x > 0 ? 1 - p : p; };
const tPdf = (x, nu) => Math.exp(lgamma((nu + 1) / 2) - lgamma(nu / 2)) / Math.sqrt(nu * Math.PI) * (1 + x * x / nu) ** (-(nu + 1) / 2);
const tPpf = (p, nu) => bisect(x => tCdf(x, nu) - p, -1e3, 1e3);
const esFactor = (q, p, nu) => tPdf(q, nu) / p * (nu + q * q) / (nu - 1);   // ES multiplier of the standard Student-t
function gammq(a, x) {              // regularised upper incomplete gamma Q(a, x)
  if (x <= 0) return 1;
  if (x < a + 1) { let ap = a, s = 1 / a, del = s; for (let n = 0; n < 500; n++) { ap++; del *= x / ap; s += del; if (Math.abs(del) < Math.abs(s) * 1e-15) break; } return 1 - s * Math.exp(-x + a * Math.log(x) - lgamma(a)); }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break; }
  return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
const chi2Sf = (x, k) => gammq(k / 2, x / 2);

// ---------------------------------------------------------------- data
const RET = {}; Object.entries(D.ret).forEach(([k, v]) => { RET[k] = { d: days(v.dates), r: v.r }; });
const G = D.garch, A = D.A, LAM = D.check.lam;
function garchFilter(r, p, alpha, beta) {   // arch's GARCH(1,1) recursion, backcast = 0.94-weighted mean of the first 75 squared residuals
  const e = r.map(v => v - p.mu), tau = Math.min(75, e.length);
  let w = 0, bc = 0; for (let i = 0; i < tau; i++) { const wi = 0.94 ** i; w += wi; bc += wi * e[i] * e[i]; } bc /= w;
  const s2 = new Array(e.length); s2[0] = p.omega + alpha * bc + beta * bc;
  for (let t = 1; t < e.length; t++) s2[t] = p.omega + alpha * e[t - 1] ** 2 + beta * s2[t - 1];
  return { s2, next: p.omega + alpha * e[e.length - 1] ** 2 + beta * s2[e.length - 1] };
}
const FILT = {}; Object.keys(G).forEach(k => { FILT[k] = garchFilter(RET[k].r, G[k], G[k].alpha, G[k].beta); });
function ewmaNext(r, lam) { let v = sdev(r.slice(0, 250)) ** 2; r.forEach(x => { v = lam * v + (1 - lam) * x * x; }); return v; }   // the notebook's EWMA forecast for 19 September 2026

// ================================================================= 1.1 volatility clustering, again
const RB = RET.btc.r, RB_D = RET.btc.d, NB = RB.length, ABS_SORT = RB.map(Math.abs).sort((a, b) => b - a);
function clustering() {
  const k = +$('cl-k').value, cap = ABS_SORT[k], x = RB.map(v => Math.max(-cap, Math.min(cap, v))), band = 1.96 / Math.sqrt(NB), lags = range(1, 30, 1);
  $('cl-k-v').textContent = k === 0 ? 'none' : k + (k === 1 ? ' day' : ' days') + ' (|r| capped at ' + nf(cap, 1) + '%)';
  const a1 = acf(x, 30), a2 = acf(x.map(Math.abs), 30), a3 = acf(x.map(v => v * v), 30);
  plot('cl-ret', [{ x: RB_D, y: x, mode: 'lines', name: 'Bitcoin daily log return (%)' + (k ? ', capped' : ''), line: { color: BA.btc, width: 0.6 }, hovertemplate: '%{x|%d %b %Y}: %{y:.2f}%<extra></extra>' }],
    layout({ title: ttl('Bitcoin daily log returns, 2018 – 18 Sep 2026'), xaxis: AX('', { type: 'date' }), yaxis: AX('daily log return (%)', { range: [-50, 25] }) }));
  const bar = (y, c, name, dx) => ({ x: lags.map(l => l + dx), y, type: 'bar', width: 0.27, name, marker: { color: c }, hovertemplate: name + ', lag %{x:.0f}: %{y:.3f}<extra></extra>' });
  plot('cl-acf', [bar(a1, BA.blue, 'autocorrelation of r<sub>t</sub>', -0.27), bar(a2, BA.eth, 'autocorrelation of |r<sub>t</sub>|', 0), bar(a3, BA.red, 'autocorrelation of r<sub>t</sub><sup>2</sup>', 0.27),
    { x: [0.5, 30.5], y: [band, band], mode: 'lines', name: '±1.96/√n', line: { color: BA.green, width: 1, dash: 'dash' }, hoverinfo: 'skip' },
    { x: [0.5, 30.5], y: [-band, -band], mode: 'lines', showlegend: false, line: { color: BA.green, width: 1, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Autocorrelations, lags 1–30'), xaxis: AX('lag (days)'), yaxis: AX('autocorrelation', { range: [-0.06, 0.2] }), barmode: 'overlay' }));
  const o1 = a1.filter(v => Math.abs(v) > band).length, o2 = a2.filter(v => v > band).length, o3 = a3.filter(v => v > band).length;
  out('cl-out', [T.cl0(gnum(NB), nf(band, 3)), T.cl1(o1, o2, nf(Math.min(...a2), 2), nf(Math.max(...a2), 2), o3, nf(Math.max(...a3), 2)),
    k === 0 ? T.cl2(nf(Math.min(...RB), 1)) : T.cl3(RB.filter(v => Math.abs(v) > cap).length, nf(cap, 1))]);
}

// ================================================================= 1.3 how EWMA weights the past
const W2020 = RB_D.map((d, i) => i).filter(i => RB_D[i] >= '2020-02-01' && RB_D[i] <= '2020-05-31');
function ewmaWeights() {
  const lam = +$('ew-l').value, j = range(1, 60, 1);
  $('ew-l-v').textContent = nf(lam, 2);
  plot('ew-w', [
    { x: j.map(v => v - 0.2), y: j.map(v => (1 - lam) * lam ** (v - 1)), type: 'bar', width: 0.4, name: 'EWMA weight, lambda = ' + nf(lam, 2), marker: { color: BA.btc }, hovertemplate: 'lag %{x:.0f}: %{y:.4f}<extra></extra>' },
    { x: j.map(v => v + 0.2), y: j.map(v => 0.03 * 0.97 ** (v - 1)), type: 'bar', width: 0.4, name: 'EWMA weight, lambda = 0.97', marker: { color: BA.blue }, hovertemplate: 'lag %{x:.0f}: %{y:.4f}<extra></extra>' },
    { x: j, y: j.map(v => (v <= 30 ? 1 / 30 : 0)), mode: 'lines', name: 'equal weights, 30-day window', line: { color: BA.red, width: 1.2, dash: 'dash', shape: 'hv' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Weight on the squared return j days ago'), xaxis: AX('lag j (days)'), yaxis: AX('weight on squared return', { rangemode: 'tozero' }), barmode: 'overlay' }));
  // Bitcoin around 12 March 2020: EWMA estimate at the end of each day and the 30-day equal-weight standard deviation, annualised
  let v = sdev(RB.slice(0, 250)) ** 2; const ew = RB.map(x => (v = lam * v + (1 - lam) * x * x));
  const roll = RB.map((_, i) => (i >= 29 ? sdev(RB.slice(i - 29, i + 1)) : null));
  const xd = W2020.map(i => RB_D[i]), an = s => Math.sqrt(365) * s;
  const crash = RB_D.indexOf('2020-03-12'), drop = crash + 30;
  plot('ew-btc', [
    { x: xd, y: W2020.map(i => an(Math.sqrt(ew[i]))), mode: 'lines', name: 'EWMA, lambda = ' + nf(lam, 2), line: { color: BA.btc, width: 1.6 }, hovertemplate: 'EWMA %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' },
    { x: xd, y: W2020.map(i => an(roll[i])), mode: 'lines', name: '30-day equal-weight standard deviation', line: { color: BA.red, width: 1.4, dash: 'dash' }, hovertemplate: '30-day %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' }],
    layout({ title: ttl('Bitcoin volatility around 12 March 2020, % a year'), xaxis: AX('', { type: 'date' }), yaxis: AX('volatility (% a year)', { rangemode: 'tozero' }),
      shapes: [vline('2020-03-12', C.navy, 'dot'), vline(RB_D[drop], BA.red, 'dot')] }));
  out('ew-out', [T.ew1(nf(lam, 2), nf(100 * (1 - lam), 1), nf(100 * (1 - lam) * lam ** 29, 2), nf(100 * (1 - lam ** 30), 0), nf(1 / (1 - lam), 1)),
    T.ew2(longDate(RB_D[drop]), nf(an(roll[drop - 1]), 0), nf(an(roll[drop]), 0), nf(an(Math.sqrt(ew[drop - 1])), 0), nf(an(Math.sqrt(ew[drop])), 0))]);
}

// ================================================================= 2.2 heavy tails after filtering (Bitcoin standardised residuals)
const ZB = RB.map((r, i) => (r - G.btc.mu) / Math.sqrt(FILT.btc.s2[i])), NZ = ZB.length, NU_B = G.btc.nu, SC_B = Math.sqrt((NU_B - 2) / NU_B);
const ZABS = ZB.map(Math.abs).sort((a, b) => b - a);
const above = c => { let k = 0; while (k < ZABS.length && ZABS[k] > c) k++; return k; };
const sci = x => { if (x >= 0.01) return nf(x, x < 1 ? 2 : 1); const e = Math.floor(Math.log10(x)), m = x / 10 ** e; return nf(m, 1) + ' × 10<sup>' + e + '</sup>'; };
const ZBIN = (() => { const w = 0.25, lo = -14, nb = 92, cnt = new Array(nb).fill(0); ZB.forEach(z => { const k = Math.floor((z - lo) / w); if (k >= 0 && k < nb) cnt[k]++; });
  return { x: cnt.map((_, k) => lo + (k + 0.5) * w), y: cnt.map(v => (v ? v / (NZ * w) : null)), w }; })();
function tails() {
  const c = +$('tl-c').value;
  $('tl-c-v').textContent = nf(c, 2);
  const xx = range(-14, 9, 0.05), CG = range(2, 8, 0.05);
  plot('tl-hist', [
    { x: ZBIN.x, y: ZBIN.y, type: 'bar', width: ZBIN.w, name: 'Bitcoin standardised residuals ẑ<sub>t</sub>', marker: { color: BA.btc + 'BF' }, hovertemplate: 'ẑ ≈ %{x:.2f}: density %{y:.2e}<extra></extra>' },
    { x: xx, y: xx.map(normPdf), mode: 'lines', name: 'Normal, variance 1', line: { color: BA.blue, width: 1.4 }, hoverinfo: 'skip' },
    { x: xx, y: xx.map(v => tPdf(v / SC_B, NU_B) / SC_B), mode: 'lines', name: 'Student-t, ν = ' + nf(NU_B, 2) + ', variance 1', line: { color: BA.red, width: 1.4 }, hoverinfo: 'skip' }],
    layout({ title: ttl('Density of ẑ<sub>t</sub> (horizontal), log scale; dotted: ±c'), xaxis: AX('', { range: [-14, 9] }), yaxis: AX('density (log scale)', { type: 'log', range: [-5, 0], exponentformat: 'power' }), bargap: 0,
      shapes: [vline(-c, C.navy, 'dot'), vline(c, C.navy, 'dot')] }));
  plot('tl-count', [
    { x: CG, y: CG.map(above), mode: 'lines', name: 'observed days', line: { color: BA.btc, width: 2, shape: 'hv' }, hovertemplate: 'c = %{x:.2f}: %{y} days<extra></extra>' },
    { x: CG, y: CG.map(v => NZ * 2 * (1 - normCdf(v))), mode: 'lines', name: 'expected, Normal', line: { color: BA.blue, width: 1.4 }, hovertemplate: 'Normal, c = %{x:.2f}: %{y:.2e}<extra></extra>' },
    { x: CG, y: CG.map(v => NZ * 2 * (1 - tCdf(v / SC_B, NU_B))), mode: 'lines', name: 'expected, Student-t', line: { color: BA.red, width: 1.4 }, hovertemplate: 'Student-t, c = %{x:.2f}: %{y:.1f}<extra></extra>' }],
    layout({ title: ttl('Days with |ẑ<sub>t</sub>| > c, log scale; horizontal: c'), xaxis: AX(''), yaxis: AX('days (log scale)', { type: 'log', range: [-2, 2.7], exponentformat: 'power' }), shapes: [vline(c, C.navy, 'dot')] }));
  const jmin = ZB.reduce((b, z, i) => (z < ZB[b] ? i : b), 0);
  out('tl-out', [T.tl1(gnum(NZ), nf(NU_B, 2)), T.tl2(nf(c, 2), above(c), sci(NZ * 2 * (1 - normCdf(c))), sci(NZ * 2 * (1 - tCdf(c / SC_B, NU_B)))),
    T.tl3(nf(ZB[jmin], 1), longDate(RB_D[jmin]))]);
}

// ================================================================= 2.2 conditional volatility
function condVol() {
  const f = +$('cv-a').value;
  $('cv-a-v').textContent = '× ' + nf(f, 2);
  const tr = [], rows = [];
  ['btc', 'eth', 'sp500'].forEach(k => {
    const p = G[k], pers = p.alpha + p.beta, al = Math.min(f * p.alpha, pers), be = pers - al;
    const s = (f === 1 ? FILT[k] : garchFilter(RET[k].r, p, al, be)).s2.map(v => Math.sqrt(A[k] * v)), j = argmax(s);
    tr.push({ x: RET[k].d, y: s, mode: 'lines', name: NAME[k] + ', GARCH(1,1)-t, annualised', line: { color: COL[k], width: 0.9 }, hovertemplate: NAME[k] + ' %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' });
    rows.push(T.cv1(NAME[k], nf(al, 3), nf(be, 3), nf(s[j], 1), longDate(RET[k].d[j]), nf(s[s.length - 1], 1), nf(median(s), 1)));
  });
  plot('cv-chart', tr, layout({ title: ttl('Conditional volatility σ<sub>t</sub>√A, α × ' + nf(f, 2) + ', α + β at the estimate'), xaxis: AX('', { type: 'date' }), yaxis: AX('volatility (% a year)', { rangemode: 'tozero' }) }));
  out('cv-out', rows);
}

// ================================================================= 2.3 after a shock: forecasts by horizon
function termStructure() {
  const s = +$('ts-s').value, h = +$('ts-h').value, hz = range(1, 250, 1);
  $('ts-s-v').textContent = '× ' + nf(s, 2); $('ts-h-v').textContent = h + (h === 1 ? ' day' : ' days');
  const left = [], rows = [];
  ['sp500', 'gold'].forEach(k => {
    const p = G[k], pers = p.alpha + p.beta, path = hz.map(x => 1 + pers ** (x - 1) * (s - 1)), hl = Math.log(0.5) / Math.log(pers);
    left.push({ x: hz, y: path, mode: 'lines', name: NAME[k] + ': persistence ' + nf(pers, 3), line: { color: COL[k], width: 1.5 }, hovertemplate: NAME[k] + ', h = %{x}: %{y:.3f}<extra></extra>' });
    rows.push(T.ts1(NAME[k], nf(pers, 3), nf(hl, 1), h, nf(path[h - 1], 3), nf(path[249], 3)));
  });
  left.push({ x: [1, 250], y: [1, 1], mode: 'lines', name: 'long-run variance', line: { color: BA.red, width: 1, dash: 'dash' }, hoverinfo: 'skip' });
  plot('ts-left', left, layout({ title: ttl('Stationary GARCH: shock = ' + nf(s, 2) + ' × long-run variance'), xaxis: AX('horizon h (days)'),
    yaxis: AX('forecast variance / long-run'), shapes: [vline(h, C.navy, 'dot')] }));
  const p = G.btc, pers = p.alpha + p.beta, s1 = FILT.btc.next, fb = [s1];
  for (let i = 1; i < 250; i++) fb.push(p.omega + pers * fb[i - 1]);
  const ew = ewmaNext(RB, LAM), an = v => Math.sqrt(365 * v);
  plot('ts-right', [
    { x: hz, y: fb.map(an), mode: 'lines', name: 'Bitcoin GARCH-t: alpha + beta = 1, omega > 0', line: { color: BA.btc, width: 1.6 }, hovertemplate: 'GARCH-t, h = %{x}: %{y:.1f}%<extra></extra>' },
    { x: hz, y: hz.map(() => an(ew)), mode: 'lines', name: 'Bitcoin EWMA (omega = 0): flat', line: { color: BA.eth, width: 1.4, dash: 'dash' }, hovertemplate: 'EWMA: %{y:.1f}%<extra></extra>' }],
    layout({ title: ttl('Bitcoin, forecasts made on 18 Sep 2026'), xaxis: AX('horizon h (days)'), yaxis: AX('forecast volatility (% a year)', { rangemode: 'tozero' }), shapes: [vline(h, C.navy, 'dot')] }));
  rows.push(T.ts2(nf(p.omega, 3), nf(an(fb[0]), 1), h, nf(an(fb[h - 1]), 1), nf(an(fb[249]), 1), nf(an(ew), 1)));
  out('ts-out', rows);
}

// ================================================================= 3.2 VaR and ES on the forecast density
const NU_LIST = [30, 20, 15, 10, 8, 6, 5, 4, 3.5, G.btc.nu, 3, 2.75, 2.5, 2.4, 2.3, 2.2, 2.1, 2.05], NU_EST = 9;
function densityVar() {
  const nu = NU_LIST[+$('dv-n').value], g = G.btc, mu = g.mu, sf = Math.sqrt(FILT.btc.next), sc = Math.sqrt((nu - 2) / nu);
  $('dv-n-v').textContent = nf(nu, 2) + (+$('dv-n').value === NU_EST ? ' (estimate)' : '');
  const vt = -(mu + sf * sc * tPpf(0.01, nu)), q25 = tPpf(0.025, nu), et = -mu + sf * sc * esFactor(q25, 0.025, nu);
  const vn = -(mu + sf * normPpf(0.01)), en = -mu + sf * normPdf(normPpf(0.025)) / 0.025;
  const xx = range(-16, 12, 0.05), ft = xx.map(x => tPdf((x - mu) / (sf * sc), nu) / (sf * sc)), fn = xx.map(x => normPdf((x - mu) / sf) / sf);
  const tl = { x: xx, y: ft, mode: 'lines', name: 'GARCH(1,1)-t forecast density, ν = ' + nf(nu, 2), line: { color: BA.btc, width: 1.8 }, hovertemplate: '%{x:.2f}%: %{y:.4f}<extra></extra>' };
  const nl = { x: xx, y: fn, mode: 'lines', name: 'Normal with the same mean and σ', line: { color: BA.blue, width: 1.4, dash: 'dash' }, hovertemplate: '%{x:.2f}%: %{y:.4f}<extra></extra>' };
  plot('dv-dens', [tl, nl], layout({ title: ttl('Return on 19 Sep 2026 (%), σ = ' + nf(sf, 2) + '% a day'), xaxis: AX('', { range: [-12, 12] }), yaxis: AX('density', { rangemode: 'tozero' }) }));
  const cut = xx.map((x, i) => (x <= -vt ? ft[i] : null));
  plot('dv-tail', [Object.assign({}, tl, { showlegend: false }), Object.assign({}, nl, { showlegend: false }),
    { x: xx, y: cut, mode: 'lines', fill: 'tozeroy', name: 'Student-t: the 1% left tail', line: { color: BA.btc, width: 0 }, fillcolor: BA.btc + '59', hoverinfo: 'skip' },
    { x: [-vt, -vt], y: [0, 0.03], mode: 'lines', name: 'Student-t: −VaR 1% (solid), −ES 2.5% (dotted)', line: { color: BA.btc, width: 2 }, hoverinfo: 'skip' },
    { x: [-et, -et], y: [0, 0.03], mode: 'lines', showlegend: false, line: { color: BA.btc, width: 2, dash: 'dot' }, hoverinfo: 'skip' },
    { x: [-vn, -vn], y: [0, 0.03], mode: 'lines', name: 'Normal: −VaR 1% (solid), −ES 2.5% (dotted)', line: { color: BA.blue, width: 2 }, hoverinfo: 'skip' },
    { x: [-en, -en], y: [0, 0.03], mode: 'lines', showlegend: false, line: { color: BA.blue, width: 2, dash: 'dot' }, hoverinfo: 'skip' }],
    layout({ title: ttl('The left tail, return (%)'), xaxis: AX('', { range: [-16, -3] }), yaxis: AX('density', { range: [0, 0.03] }) }));
  const gp = p => sc * tPpf(p, nu) - normPpf(p), ps = range(-5, Math.log10(0.49), 0.05).map(e => 10 ** e);
  let cross = null; for (let i = 1; i < ps.length && cross === null; i++) if (Math.sign(gp(ps[i - 1])) !== Math.sign(gp(ps[i]))) { const sg = gp(ps[i - 1]) < 0 ? 1 : -1; cross = bisect(p => sg * gp(p), ps[i - 1], ps[i], 60); }
  out('dv-out', [T.dv1(nf(nu, 2), nf(vt, 2), nf(vn, 2), nf(et, 2), nf(en, 2)), T.dv2(nf(100 * tCdf((-vn - mu) / (sf * sc), nu), 2)),
    cross === null ? T.dv4 : T.dv3(nf(100 * cross, 2))]);
}

// ================================================================= 3.4 VaR and ES by method
const METH = ['Normal, 2018-2026', 'Historical simulation, 500 days', 'EWMA, lambda 0.94, Normal', 'GARCH(1,1)-t'];
function varAll(p1) {               // VaR at p1 and ES at 2.5 p1, Bitcoin, forecasts for 19 September 2026 (the notebook's formulas)
  const p2 = 2.5 * p1, r = RB, mu = mean(r), s = sdev(r), z1 = normPpf(p1), z2 = normPpf(p2), h = r.slice(-500);
  const q1h = quantile(h, p1), q2h = quantile(h, p2), tail = h.filter(v => v <= q2h);
  const sew = Math.sqrt(ewmaNext(r, LAM)), g = G.btc, sf = Math.sqrt(FILT.btc.next), sc = Math.sqrt((g.nu - 2) / g.nu), tq1 = tPpf(p1, g.nu), tq2 = tPpf(p2, g.nu);
  return [[-(mu + s * z1), -mu + s * normPdf(z2) / p2], [-q1h, -mean(tail)], [-sew * z1, sew * normPdf(z2) / p2],
    [-(g.mu + sf * sc * tq1), -g.mu + sf * sc * esFactor(tq2, p2, g.nu)]];
}
function varMethods() {
  const p = +$('vm-p').value / 100, V = varAll(p), lab = ['Normal<br>2018-2026', 'Historical<br>500 days', 'EWMA<br>Normal', 'GARCH(1,1)-t'];
  $('vm-p-v').textContent = 'VaR ' + pc(100 * p) + '%, ES ' + pc(250 * p) + '%';
  plot('vm-chart', [
    { x: lab, y: V.map(v => v[0]), type: 'bar', name: 'VaR ' + pc(100 * p) + '% (%)', marker: { color: BA.blue }, hovertemplate: '%{x}: VaR %{y:.2f}%<extra></extra>' },
    { x: lab, y: V.map(v => v[1]), type: 'bar', name: 'ES ' + pc(250 * p) + '% (%)', marker: { color: BA.btc }, hovertemplate: '%{x}: ES %{y:.2f}%<extra></extra>' }],
    layout({ title: ttl('Bitcoin, one-day horizon, forecasts for 19 September 2026'), xaxis: AX(''), yaxis: AX('1-day loss (%)', { rangemode: 'tozero' }), barmode: 'group' }));
  const usd = v => gnum(1e6 * (1 - Math.exp(-v / 100)));
  const vs = V.map(v => v[0]);
  out('vm-out', METH.map((m, i) => T.vm1(m, pc(100 * p), nf(V[i][0], 2), pc(250 * p), nf(V[i][1], 2), nf(V[i][1] / V[i][0], 2), usd(V[i][0])))
    .concat([T.vm2(pc(100 * p), nf(Math.max(...vs) / Math.min(...vs), 2))]));
}

// ================================================================= 4.4 violations through time
const BT = D.bt, BT_D = days(BT.dates), BT_M = Object.keys(BT.var), NT = BT_D.length;
const HIT = {}; BT_M.forEach(m => { HIT[m] = BT.r.map((x, i) => (x < -BT.var[m][i] ? 1 : 0)); });
function kupiec(I, p) { const n = I.length, x = sum(I), ph = x / n, l0 = (n - x) * Math.log(1 - p) + x * Math.log(p), l1 = (n - x) * Math.log(1 - ph) + (x > 0 ? x * Math.log(ph) : 0), LR = -2 * (l0 - l1); return { x, ph, LR, p: chi2Sf(LR, 1) }; }
function christoffersen(I) {
  let n00 = 0, n01 = 0, n10 = 0, n11 = 0;
  for (let t = 1; t < I.length; t++) { const a = I[t - 1], b = I[t]; if (!a && !b) n00++; else if (!a && b) n01++; else if (a && !b) n10++; else n11++; }
  const p01 = n00 + n01 ? n01 / (n00 + n01) : 0, p11 = n10 + n11 ? n11 / (n10 + n11) : 0, pp = (n01 + n11) / (n00 + n01 + n10 + n11);
  const ll = (p, k0, k1) => (k0 ? k0 * Math.log(1 - p) : 0) + (k1 && p > 0 ? k1 * Math.log(p) : 0);
  const LR = -2 * (ll(pp, n00 + n10, n01 + n11) - ll(p01, n00, n01) - ll(p11, n10, n11));
  return { LR, p: chi2Sf(LR, 1) };
}
const zone = h => (h <= 4 ? 'green' : h <= 9 ? 'amber' : 'red');
const ROLL = {}; BT_M.forEach(m => { const c = [0]; HIT[m].forEach(v => c.push(c[c.length - 1] + v)); ROLL[m] = BT_D.map((_, e) => (e >= 249 ? c[e + 1] - c[e - 249] : null)); });
const MLAB = { 'Normal 250': 'Normal, 250 days', 'HS 500': 'historical simulation (500 days)', 'EWMA': 'EWMA, Normal', 'GARCH-t': 'GARCH(1,1)-t' };
const MCOL = { 'Normal 250': BA.red, 'HS 500': BA.blue, 'EWMA': BA.green, 'GARCH-t': BA.btc };
function backtest() {
  const e = +$('bt-e').value, m = $('bt-m').value, s = e - 249;
  $('bt-e-v').textContent = longDate(BT_D[e]);
  const lines = ['HS 500', 'GARCH-t'].concat(['HS 500', 'GARCH-t'].includes(m) ? [] : [m]);
  const viol = BT_D.map((_, i) => i).filter(i => HIT[m][i]);
  plot('bt-chart', [{ x: BT_D, y: BT.r, type: 'bar', name: 'Bitcoin daily log return (%)', marker: { color: BA.eth + '80' }, hovertemplate: '%{x|%d %b %Y}: %{y:.2f}%<extra></extra>' }]
    .concat(lines.map(k => ({ x: BT_D, y: BT.var[k].map(v => -v), mode: 'lines', name: '−VaR 1%, ' + MLAB[k], line: { color: MCOL[k], width: 0.9 }, hovertemplate: '−VaR ' + k + ' %{x|%d %b %Y}: %{y:.2f}%<extra></extra>' })))
    .concat([{ x: viol.map(i => BT_D[i]), y: viol.map(i => BT.r[i]), mode: 'markers', name: 'violation of ' + MLAB[m] + ' VaR', marker: { color: BA.red, size: 6 }, hovertemplate: 'violation %{x|%d %b %Y}: %{y:.2f}%<extra></extra>' }]),
    layout({ title: ttl('Bitcoin, 1-day VaR 1%, 2020 – 18 Sep 2026; shaded: the 250 days to ' + shortDate(BT_D[e])), xaxis: AX('', { type: 'date' }), yaxis: AX('%', { range: [-50, 20] }), bargap: 0,
      shapes: [{ type: 'rect', xref: 'x', yref: 'paper', x0: BT_D[s], x1: BT_D[e], y0: 0, y1: 1, fillcolor: 'rgba(26,58,110,0.08)', line: { width: 0 } }] }));
  const rows = [T.bt0(shortDate(BT_D[s]), shortDate(BT_D[e]), BT_M.map(k => `${k} ${ROLL[k][e]} (${zone(ROLL[k][e])})`).join(', '))];
  BT_M.forEach(k => { const K = kupiec(HIT[k], 0.01), Ci = christoffersen(HIT[k]), z = ROLL[k].filter(finite), am = z.filter(v => v >= 5).length;
    rows.push(T.bt1(k, K.x, nf(100 * K.ph, 2), nf(K.LR, 2), pfmt(K.p), nf(Ci.LR, 2), pfmt(Ci.p), nf(100 * am / z.length, 0))); });
  out('bt-out', [T.btn(gnum(NT), nf(0.01 * NT, 1))].concat(rows));
}

// ================================================================= 5.4 Bitcoin VaR, rolled forward
const OV = D.oos, OV_D = days(OV.dates), OV_M = Object.keys(OV.var), NO = OV_D.length;
const OCOL = { 'Normal (2018-)': BA.red, 'HS 500': BA.blue, 'EWMA': BA.green, 'GARCH-t': BA.eth };
function oosVar() {
  const d = +$('ov-d').value;
  $('ov-d-v').textContent = d + (d === 1 ? ' day' : ' days') + ', to ' + shortDate(OV_D[d - 1]);
  plot('ov-chart', [{ x: OV_D, y: OV.r, type: 'bar', name: 'Bitcoin daily log return (%)', marker: { color: OV_D.map((_, i) => (i < d ? BA.btc + 'A6' : BA.btc + '33')) }, hovertemplate: '%{x|%d %b}: %{y:+.2f}%<extra></extra>' }]
    .concat(OV_M.map(k => ({ x: OV_D, y: OV.var[k].map(v => -v), mode: 'lines', name: '−VaR 1%, ' + k, line: { color: OCOL[k], width: 1.4, dash: k === 'EWMA' ? 'dash' : 'solid' }, hovertemplate: '−VaR ' + k + ' %{x|%d %b}: %{y:.2f}%<extra></extra>' }))),
    layout({ title: ttl('Bitcoin, 19 September – 23 October 2026: returns and −VaR 1% rolled forward'), xaxis: AX('', { type: 'date' }), yaxis: AX('%'),
      shapes: [vline(OV_D[d - 1], C.navy, 'dot')] }));
  const rows = OV_M.map(k => { const v = OV.var[k].slice(0, d), h = OV.r.slice(0, d).filter((x, i) => x < -v[i]).length;
    return T.ov1(k, nf(mean(v), 2), gnum(mean(v.map(x => 1e6 * (1 - Math.exp(-x / 100))))), h); });
  const lr = -2 * d * Math.log(0.99), wi = OV.r.slice(0, d).reduce((b, x, i) => (x < OV.r[b] ? i : b), 0);
  out('ov-out', [T.ov0(d, nf(0.01 * d, 2))].concat(rows).concat([T.ov2(d, nf(0.99 ** d, 3), nf(0.98 ** d, 3), nf(lr, 2), nf(chi2Sf(lr, 1), 2)),
    T.ov3(shortDate(OV_D[wi]), nf(OV.r[wi], 2), nf(-OV.r[wi] / OV.var['GARCH-t'][wi], 2))]));
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  on(['cl-k'], clustering); P('cl-play', 'cl-k', [0, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30], 700);
  on(['ew-l'], ewmaWeights); P('ew-play', 'ew-l', range(0.8, 0.99, 0.01), 400);
  on(['tl-c'], tails); P('tl-play', 'tl-c', range(2, 8, 0.25), 350);
  $('dv-n').value = NU_EST; on(['dv-n'], densityVar); P('dv-play', 'dv-n', range(0, NU_LIST.length - 1, 1), 600);
  on(['cv-a'], condVol); P('cv-play', 'cv-a', range(0.25, 2.5, 0.25), 700);
  on(['ts-s', 'ts-h'], termStructure); P('ts-play', 'ts-s', range(0.25, 4, 0.25), 500);
  on(['vm-p'], varMethods); P('vm-play', 'vm-p', [0.1, 0.2, 0.3, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5], 700);
  $('bt-e').max = NT - 1; $('bt-e').value = NT - 1; on(['bt-e', 'bt-m'], backtest); P('bt-play', 'bt-e', range(249, NT - 1, 21).concat([NT - 1]), 160);
  $('ov-d').max = NO; $('ov-d').value = NO; on(['ov-d'], oosVar); P('ov-play', 'ov-d', range(1, NO, 1), 300);
  tall('bt-chart', 400);
  const PFX = { 'clustering': 'cl', 'ewma-weights': 'ew', 'tails': 'tl', 'conditional-volatility': 'cv', 'term-structure': 'ts', 'density-var': 'dv', 'var-methods': 'vm', 'violations': 'bt', 'oos-var': 'ov' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  clustering(); ewmaWeights(); tails(); condVol(); termStructure(); densityVar(); varMethods(); backtest(); oosVar();
}
window.L4 = { RET, G, FILT, garchFilter, ewmaNext, varAll, tPpf, tCdf, normPpf, kupiec, christoffersen, HIT, ROLL, BT_D, acf, days };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
