// Lecture 7 interactive page: one block per chart slide, computed in the browser from l7_data.js
// (walk-forward probabilities, rule Sharpe ratios and VaR forecasts of the course; nothing is retrained here).
(function () {
'use strict';
const D = window.L7_DATA;
const { C, sum, mean, sdev, nf, $, AX, layout, ttl, plot, out, vline, hline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L7_TEXT;

// ---------------------------------------------------------------- colours (Slides/code/l7_ml.py, l7_var.py)
const BA = { btc: '#E8913A', blue: '#1A3A6E', red: '#CD0000', green: '#2E7D32', eth: '#9B59B6', gold: '#B8860B' };
const MCOL = { 'Logit': BA.blue, 'Random forest': BA.green, 'XGBoost': BA.eth, 'Buy and hold': BA.btc };
const VCOL = { 'HS': BA.blue, 'EWMA-N': BA.gold, 'GARCH-t': '#1F77B4', 'QReg': BA.green, 'QGBM': '#8C564B', 'Chronos-2': BA.eth };

// ---------------------------------------------------------------- helpers (as in l1.js)
const days = x => {
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const longMonth = s => `${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const sgn = (x, d) => (x >= 0 ? '+' : '−') + nf(Math.abs(x), d);
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const legendBelow = (y, extra) => Object.assign({ orientation: 'h', x: 0, xanchor: 'left', y: y, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } }, extra || {});
const pv = p => (p < 0.001 ? '< 0.001' : nf(p, p < 0.01 ? 3 : 2));

// ---------------------------------------------------------------- Normal distribution
function erfc(x) {                 // complementary error function (Numerical Recipes, relative error < 1.2e-7)
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const Phi = x => 0.5 * erfc(-x / Math.SQRT2);
function PhiInv(p) {               // Acklam's rational approximation and one Newton step
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  let x;
  if (p < 0.02425) { const q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else if (p > 1 - 0.02425) { const q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  else { const q = p - 0.5, r = q * q; x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
  const e = Phi(x) - p, u = e * Math.sqrt(2 * Math.PI) * Math.exp(x * x / 2);
  return x - u / (1 + x * u / 2);
}
const chi2sf1 = x => (x <= 0 ? 1 : erfc(Math.sqrt(x / 2)));        // chi-square(1) upper tail

// ================================================================= 1. overfitting: in-sample and out-of-sample accuracy
const ML = D.ml, MD = days(ML.dates), NT = MD.length, MS = ML.models, NO = ML.block.length;
const blockOf = k => ({ b0: ML.block[k], b1: k + 1 < NO ? ML.block[k + 1] : NT });
function accuracy(k) {             // k = origin index, or NO for all origins
  const { b0, b1 } = k < NO ? blockOf(k) : { b0: 0, b1: NT }, idx = []; for (let t = b0; t < b1; t++) idx.push(t);
  const base = mean(idx.map(t => ML.y[t]));
  const res = MS.map(m => ({ m, ins: k < NO ? ML.acc_in[m][k] : mean(ML.acc_in[m]), oos: mean(idx.map(t => +((ML.p[m][t] > 0.5) === (ML.y[t] === 1)))) }));
  return { b0, b1, base, res };
}
function overfit() {
  const k = +$('oa-k').value, A = accuracy(k);
  $('oa-k-v').textContent = k < NO ? `origin ${k + 1} of ${NO}: predict ${longDate(MD[A.b0])} – ${longDate(MD[A.b1 - 1])}` : `all ${NO} origins (as on the slide)`;
  const x = MS;
  plot('oa-acc', [
    { x, y: A.res.map(r => 100 * r.ins), type: 'bar', name: 'in-sample accuracy', marker: { color: BA.blue }, hovertemplate: '%{x}, in-sample: %{y:.1f}%<extra></extra>' },
    { x, y: A.res.map(r => 100 * r.oos), type: 'bar', name: 'out-of-sample accuracy', marker: { color: BA.btc }, hovertemplate: '%{x}, out-of-sample: %{y:.1f}%<extra></extra>' },
    { x: [-0.5, 2.5], y: [100 * A.base, 100 * A.base], xaxis: 'x2', mode: 'lines', name: 'always predict up', line: { color: BA.red, dash: 'dash', width: 1.5 }, hoverinfo: 'skip' }],
    layout({ title: ttl(k < NO ? `Origin ${k + 1}: fit to ${longDate(MD[A.b0 - 1] || '2019-12-31')}, next ${A.b1 - A.b0} days` : 'Walk-forward, 40 origins, test 2020 – October 2026'),
      barmode: 'group', xaxis: AX(''), xaxis2: { overlaying: 'x', range: [-0.5, 2.5], visible: false }, yaxis: AX('%', { range: [30, 90] }), legend: legendBelow(-0.14) }));
  out('oa-out', [T.oa0(k < NO ? `${longDate(MD[A.b0])} – ${longDate(MD[A.b1 - 1])} (${A.b1 - A.b0} days)` : `${longDate(MD[0])} – ${longDate(MD[NT - 1])} (${NT} days)`, nf(100 * A.base, 1)),
    ...A.res.map(r => T.oa(r.m, nf(100 * r.ins, 1), nf(100 * r.oos, 1), sgn(100 * (r.ins - r.oos), 1)))]);
  return A;
}
function shapChart() {
  const e = Object.entries(ML.shap);       // ascending, as in the slide
  plot('oa-shap', [{ y: e.map(([k]) => ML.lab[k]), x: e.map(([, v]) => v), type: 'bar', orientation: 'h', marker: { color: BA.eth }, showlegend: false,
    hovertemplate: '%{y}: mean |SHAP| %{x:.4f}<extra></extra>' }],
    layout({ title: ttl('What the model uses: XGBoost, last fit, last 400 test days'), xaxis: AX('mean |SHAP| (log-odds)'), yaxis: AX('', { tickfont: { size: 10, color: C.navy } }), margin: { l: 150, r: 12, t: 30, b: 40 } }));
}

// ================================================================= 2. trading the signals
function perf(pos, cost) {         // the notebook's perf(): net daily log returns after costs, SR, drawdown
  const g = pos.map((p, t) => p * ML.ret[t] - cost * Math.abs(p - (t ? pos[t - 1] : 0)));
  let eq = 0, pk = 0, dd = 0; const cum = g.map(v => { eq += v; pk = Math.max(pk, eq); dd = Math.max(dd, pk - eq); return eq; });
  let ch = 0; pos.forEach((p, t) => { ch += Math.abs(p - (t ? pos[t - 1] : 0)); });
  return { cum, sr: mean(g) / sdev(g) * Math.sqrt(365), dlog: dd, mdd: 100 * (1 - Math.exp(-dd / 100)), long: mean(pos), turn: ch / NT * 365 };
}
function trading() {
  const cost = +$('eq-c').value / 100, c = +$('eq-t').value;
  $('eq-c-v').textContent = nf(100 * cost, 0) + ' bp'; $('eq-t-v').textContent = nf(c, 2);
  const res = [['Buy and hold', perf(new Array(NT).fill(1), cost)]].concat(MS.map(m => [m, perf(ML.p[m].map(p => +(p > c)), cost)]));
  plot('eq-chart', res.map(([m, r]) => ({ x: MD, y: r.cum, mode: 'lines', name: m, line: { color: MCOL[m], width: 1.4 }, hovertemplate: m + ' %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' })),
    layout({ title: ttl(`Long when p > ${nf(c, 2)}, otherwise cash; ${nf(100 * cost, 0)} bp per change of position`), xaxis: AX('', { type: 'date' }),
      yaxis: AX('cumulative log return (%), after costs'), shapes: [hline(0, BA.blue)], legend: legendBelow(-0.12) }));
  out('eq-out', res.map(([m, r]) => T.eq(m, nf(r.sr, 2), nf(r.mdd, 1), nf(r.dlog, 0), nf(100 * r.long, 0), nf(r.turn, r.turn < 10 ? 1 : 0))));
  return res;
}

// ================================================================= 3. data snooping
const SN = D.snoop, NRULE = SN.sr_in.length, NS = [2, 5, 10, 25, 50, 100, 250, 500, 810];
const EM = 0.5772156649;
function dsr(N) {
  const sr0 = Math.sqrt(SN.v_sr) * ((1 - EM) * PhiInv(1 - 1 / N) + EM * PhiInv(1 - 1 / (N * Math.E)));
  const den = Math.sqrt(1 - SN.g3 * SN.sr + (SN.g4 - 1) / 4 * SN.sr ** 2);
  return { sr0, sr0a: sr0 * Math.sqrt(365), dsr: Phi((SN.sr - sr0) * Math.sqrt(SN.T - 1) / den), psr: Phi(SN.sr * Math.sqrt(SN.T - 1) / den) };
}
function ranks(a) {                // average ranks, ascending
  const o = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]), r = new Array(a.length);
  for (let i = 0; i < o.length;) { let j = i; while (j + 1 < o.length && o[j + 1][0] === o[i][0]) j++; for (let k = i; k <= j; k++) r[o[k][1]] = (i + j) / 2 + 1; i = j + 1; }
  return r;
}
const pearson = (x, y) => { const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; x.forEach((v, i) => { a += (v - mx) * (y[i] - my); b += (v - mx) ** 2; c += (y[i] - my) ** 2; }); return a / Math.sqrt(b * c); };
function snoop() {
  const N = NS[+$('sn-n').value], R = dsr(N), b = SN.best;
  $('sn-n-v').textContent = N + (N === NRULE ? ' (all rules, as on the slide)' : '');
  plot('sn-scatter', [
    { x: SN.sr_in, y: SN.sr_out, mode: 'markers', name: 'one rule', marker: { color: BA.blue, size: 4, opacity: 0.5 }, text: SN.rules, hovertemplate: '%{text}: SR %{x:.2f} (2018–2022), %{y:.2f} (2023–2026)<extra></extra>' },
    { x: [SN.sr_in[b]], y: [SN.sr_out[b]], mode: 'markers', name: 'best in-sample rule', marker: { color: BA.red, size: 11 }, text: [SN.rules[b]], hovertemplate: '%{text}: SR %{x:.2f} (2018–2022), %{y:.2f} (2023–2026)<extra></extra>' },
    { x: [Math.min(...SN.sr_in), Math.max(...SN.sr_in)], y: [SN.bh_out, SN.bh_out], mode: 'lines', name: 'buy and hold, 2023–2026', line: { color: BA.btc, dash: 'dash', width: 1.5 }, hoverinfo: 'skip' }],
    layout({ title: ttl('810 rules: selection and evaluation Sharpe ratios'), xaxis: AX('Sharpe ratio, 2018–2022 (selection)'), yaxis: AX('Sharpe ratio, 2023–2026 (evaluation)'), legend: legendBelow(-0.2) }));
  plot('sn-hist', [
    { x: SN.mx, type: 'histogram', nbinsx: 30, name: 'max Sharpe over all rules, permuted returns', marker: { color: BA.green }, hovertemplate: '%{x}: %{y} permutations<extra></extra>' }],
    layout({ title: ttl('Best of 810 rules when returns are permuted (200 permutations)'), xaxis: AX('maximum in-sample Sharpe ratio'), yaxis: AX('count'),
      shapes: [vline(SN.sr_in[b], BA.red), vline(R.sr0a, C.navy, 'dash')], legend: legendBelow(-0.2),
      annotations: [{ x: SN.sr_in[b], y: 1, yref: 'paper', text: 'best rule ' + nf(SN.sr_in[b], 2), showarrow: false, xanchor: 'left', font: { size: 10, color: BA.red } },
        { x: R.sr0a, y: 0.9, yref: 'paper', text: `SR₀ for N = ${N}: ${nf(R.sr0a, 2)}`, showarrow: false, xanchor: 'right', font: { size: 10, color: C.navy } }] }));
  const ro = ranks(SN.sr_out.map(v => -v)), sp = pearson(ranks(SN.sr_in), ranks(SN.sr_out)), beat = mean(SN.sr_out.map(v => +(v > SN.bh_out)));
  const pn = mean(SN.mx.map(v => +(v >= SN.sr_in[b])));
  out('sn-out', [T.sn1(SN.rules[b], nf(SN.sr_in[b], 2), nf(SN.bh_in, 2), nf(SN.sr_out[b], 2), nf(SN.bh_out, 2), Math.round(ro[b]), NRULE),
    T.sn2(nf(mean(SN.mx), 2), nf(SN.mx.slice().sort((x, y) => x - y)[Math.floor(0.95 * (SN.mx.length - 1))], 2), nf(pn, 3), nf(SN.rc_p, 2)),
    T.sn3(N, nf(R.sr0a, 2), nf(R.psr, 2), nf(R.dsr, 2)), T.sn4(nf(sp, 2), nf(100 * beat, 0))]);
  return { R, rank: ro[b], sp, beat, pn };
}

// ================================================================= 4-5. VaR forecasts of six models
const VR = D.var, VD = days(VR.dates), NV = VD.length, VM = VR.models;
const qsOf = (y, q, a) => (y - q) * (a - (y < q ? 1 : 0));
function kupiecP(h, a) {
  const n = h.length, x = sum(h), p = x / n;
  const ll0 = (n - x) * Math.log(1 - a) + x * Math.log(a), ll1 = (n - x) * Math.log(1 - p) + (x > 0 ? x * Math.log(p) : 0);
  return chi2sf1(2 * (ll1 - ll0));
}
function christP(h) {
  let n00 = 0, n01 = 0, n10 = 0, n11 = 0;
  for (let t = 1; t < h.length; t++) { if (!h[t - 1] && !h[t]) n00++; else if (!h[t - 1]) n01++; else if (!h[t]) n10++; else n11++; }
  const p01 = n01 / (n00 + n01), p11 = n10 + n11 ? n11 / (n10 + n11) : 0, p = (n01 + n11) / (n00 + n01 + n10 + n11);
  const L = (x, k) => (k ? k * Math.log(x) : 0);
  return chi2sf1(2 * (L(1 - p01, n00) + L(p01, n01) + L(1 - p11, n10) + L(p11, n11) - L(1 - p, n00 + n10) - L(p, n01 + n11)));
}
function dmP(dl) {                 // Diebold-Mariano, Newey-West long-run variance, two-sided
  const n = dl.length, lag = Math.floor(4 * (n / 100) ** (2 / 9)), m = mean(dl), u = dl.map(v => v - m);
  let lrv = sum(u.map(v => v * v)) / n;
  for (let k = 1; k <= lag; k++) { let s = 0; for (let t = k; t < n; t++) s += u[t] * u[t - k]; lrv += 2 * (1 - k / (lag + 1)) * s / n; }
  const t = m / Math.sqrt(lrv / n);
  return { t, p: erfc(Math.abs(t) / Math.SQRT2), lo: m - 1.96 * Math.sqrt(lrv / n), hi: m + 1.96 * Math.sqrt(lrv / n), m };
}
function scores(a, i1) {           // test days 0..i1-1
  const as = a === 0.01 ? '0.01' : '0.05', y = VR.r.slice(0, i1), base = y.map((v, t) => qsOf(v, VR.q['GARCH-t|' + as][t], a));
  return VM.map(m => {
    const q = VR.q[m + '|' + as].slice(0, i1), h = y.map((v, t) => +(v < q[t])), l = y.map((v, t) => qsOf(v, q[t], a));
    return { m, n: sum(h), br: 100 * mean(h), kp: kupiecP(h, a), cp: christP(h), qs: mean(l), dm: m === 'GARCH-t' ? null : dmP(l.map((v, t) => v - base[t])) };
  });
}
const MEND = VD.map((d, i) => (i === NV - 1 || VD[i + 1].slice(0, 7) !== d.slice(0, 7) ? i : -1)).filter(i => i >= 0);
function varModels() {
  const a = +$('vm-a').value, e = +$('vm-e').value, i1 = MEND[e] + 1, S = scores(a, i1);
  $('vm-e-v').textContent = longDate(VD[i1 - 1]) + (e === MEND.length - 1 ? ' (as on the slide)' : '');
  const qv = S.map(s => s.qs);
  plot('vm-br', [...S.map(s => ({ x: [s.m], y: [s.br], type: 'bar', name: s.m, marker: { color: VCOL[s.m] }, customdata: [s.n], hovertemplate: s.m + ': %{y:.2f}% (%{customdata} breaches)<extra></extra>' })),
    { x: [VM[0], VM[VM.length - 1]], y: [100 * a, 100 * a], mode: 'lines', name: `target ${nf(100 * a, 0)}%`, line: { color: BA.red, dash: 'dash', width: 1.5 }, hoverinfo: 'skip' }],
    layout({ title: ttl(`Breach rate, VaR ${nf(100 * a, 0)}%, ${i1} test days`), xaxis: AX('', { showticklabels: false }), yaxis: AX('breach rate (%)', { rangemode: 'tozero' }), showlegend: false }));
  plot('vm-qs', S.map(s => ({ x: [s.m], y: [s.qs], type: 'bar', name: s.m, marker: { color: VCOL[s.m] }, hovertemplate: s.m + ': mean QS %{y:.4f}<extra></extra>' })),
    layout({ title: ttl('Mean quantile score (lower is better)'), xaxis: AX('', { showticklabels: false }), yaxis: AX('mean quantile score', { range: [Math.min(...qv) * 0.9, Math.max(...qv) * 1.03] }), showlegend: false }));
  // shared legend: the colours of the six models, under both charts
  const lg = $('vm-leg'); if (lg) lg.innerHTML = VM.map(m => `<span style="display:inline-flex;align-items:center;margin-right:0.9rem"><span style="width:12px;height:12px;background:${VCOL[m]};display:inline-block;margin-right:0.3rem"></span>${m}</span>`).join('') + `<span style="display:inline-flex;align-items:center"><span style="width:16px;border-top:2px dashed ${BA.red};display:inline-block;margin-right:0.3rem"></span>target ${nf(100 * a, 0)}%</span>`;
  const near = S.slice().sort((u, v) => Math.abs(u.br - 100 * a) - Math.abs(v.br - 100 * a)), low = S.slice().sort((u, v) => u.qs - v.qs);
  out('vm-out', [T.vm0(longDate(VD[0]), longDate(VD[i1 - 1]), i1, nf(a * i1, 1), nf(100 * a, 0)),
    ...S.map(s => T.vm(s.m, nf(s.br, 2), s.n, pv(s.kp), pv(s.cp), nf(s.qs, 4), s.dm ? pv(s.dm.p) : null)),
    T.vm1(near.slice(0, 3).map(s => s.m).join(', '), low.slice(0, 3).map(s => s.m).join(', '))]);
  return S;
}
const BREL = VD.findIndex(d => d > VR.release);
function varPaths() {
  const i = +$('vp-t').value, ref = $('vp-ref').value, a = '0.01', y = VR.r;
  $('vp-t-v').textContent = longDate(VD[i]);
  const qr = VR.q[ref + '|' + a], hb = VD.map((_, t) => t).filter(t => y[t] < qr[t]);
  const shown = ['GARCH-t', 'QGBM', 'Chronos-2'].includes(ref) ? ['GARCH-t', 'QGBM', 'Chronos-2'] : ['GARCH-t', 'QGBM', 'Chronos-2', ref];
  const PC = { 'GARCH-t': BA.blue, 'QGBM': BA.green, 'Chronos-2': BA.eth, 'HS': '#1F77B4', 'EWMA-N': BA.gold, 'QReg': '#8C564B' };
  const lo = VR.q['QGBM|0.01'].reduce((k, v, t, A) => (v < A[k] ? t : k), 0);
  plot('vp-chart', [
    { x: VD, y, type: 'bar', name: 'BTC daily log return (%)', marker: { color: BA.btc }, hovertemplate: 'return %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' },
    ...shown.map(m => ({ x: VD, y: VR.q[m + '|' + a], mode: 'lines', name: `1% return quantile q (VaR 1% = −q): ${m}`, line: { color: PC[m], width: 1.2 }, hovertemplate: m + ' %{x|%d %b %Y}: q = %{y:.1f}%<extra></extra>' })),
    { x: hb.map(t => VD[t]), y: hb.map(t => y[t]), mode: 'markers', name: `breach: return below the ${ref} quantile`, marker: { color: BA.red, size: 7 }, hovertemplate: 'breach %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' }],
    layout({ title: ttl('Bitcoin, test period 1 January 2024 – 23 October 2026'), xaxis: AX('', { type: 'date' }), yaxis: AX('%', { range: [-20, 13] }), bargap: 0,
      shapes: [vline(VR.release, BA.gold, 'dot'), vline(VD[i], C.navy, 'dash')], legend: legendBelow(-0.12),
      annotations: [{ x: VD[lo], y: -19.5, ax: 60, ay: -10, text: `QGBM: q = ${nf(VR.q['QGBM|0.01'][lo], 1)}% (VaR ${nf(-VR.q['QGBM|0.01'][lo], 1)}%)`, font: { size: 10, color: BA.green }, arrowcolor: BA.green, showarrow: true, xanchor: 'left' },
        { x: VR.release, y: 12, text: 'Chronos-2 release (20 Oct 2025)', showarrow: false, xanchor: 'right', font: { size: 10, color: BA.gold } }] }));
  const v = m => nf(-VR.q[m + '|' + a][i], 1), pre = hb.filter(t => t < BREL).length, post = hb.length - pre;
  const inp = i >= 2 ? T.vp0(longDate(VD[i - 1]), longDate(VD[i - 2]), sgn(y[i - 2], 1), longDate(VD[i - 1]), sgn(y[i - 1], 1), sgn(VR.dvol[i - 1], 0)) : '';
  out('vp-out', [T.vp1(longDate(VD[i]), sgn(y[i], 1), inp),
    T.vp2(VM.map(m => `${m} ${v(m)}%`).join(', ')),
    T.vp3(ref, hb.length, nf(0.01 * NV, 1), pre, nf(0.01 * BREL, 1), post, nf(0.01 * (NV - BREL), 1))]);
  return { hb, lo };
}

// ================================================================= rolling quantile-score difference against GARCH-t
function qsRoll() {
  const W = +$('qr-w').value, a = 0.01, y = VR.r, base = y.map((v, t) => qsOf(v, VR.q['GARCH-t|0.01'][t], a));
  $('qr-w-v').textContent = W + ' days' + (W === 365 ? ' (as on the slide)' : '');
  const res = [], tr = [];
  VM.filter(m => m !== 'GARCH-t').forEach(m => {
    const d = y.map((v, t) => qsOf(v, VR.q[m + '|0.01'][t], a) - base[t]), cs = [0];
    d.forEach(v => cs.push(cs[cs.length - 1] + v));
    const x = [], z = [];
    for (let t = W; t <= NV; t++) { x.push(VD[t - 1]); z.push(1000 * (cs[t] - cs[t - W]) / W); }
    res.push({ m, last: z[z.length - 1], ahead: 100 * mean(z.map(v => +(v < 0))), n: z.length, x0: x[0] });
    tr.push({ x, y: z, mode: 'lines', name: `${m} minus GARCH-t`, line: { color: VCOL[m], width: m === 'Chronos-2' ? 2.2 : 1.4 }, hovertemplate: `${m}, window ending %{x|%d %b %Y}: %{y:.1f}<extra></extra>` });
  });
  plot('qr-chart', tr, layout({ title: ttl(`Mean 1% quantile score minus that of GARCH-t over the last ${W} days (× 10⁻³); below zero = better than GARCH-t`),
    xaxis: AX('', { type: 'date' }), yaxis: AX('QS difference (× 10⁻³)'), shapes: [hline(0, '#1F77B4'), vline(VR.release, BA.gold, 'dot')], legend: legendBelow(-0.12) }));
  out('qr-out', [T.qr0(W, res[0].n, longDate(res[0].x0)), ...res.map(r_ => T.qr(r_.m, sgn(r_.last, 1), nf(r_.ahead, 0)))]);
  return res;
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  tall('oa-shap', 380); tall('oa-acc', 380);
  $('oa-k').max = NO; $('oa-k').value = NO; on(['oa-k'], overfit); P('oa-play', 'oa-k', range(0, NO, 1), 450);
  tall('eq-chart', 400); on(['eq-c', 'eq-t'], trading); P('eq-play', 'eq-c', range(0, 50, 5), 700);
  on(['sn-n'], snoop); P('sn-play', 'sn-n', range(0, NS.length - 1, 1), 900);
  const vmEnd = MEND.length - 1; $('vm-e').max = vmEnd; $('vm-e').value = vmEnd;
  on(['vm-a', 'vm-e'], varModels); P('vm-play', 'vm-e', range(0, vmEnd, 1), 450);
  $('vp-t').max = NV - 1; $('vp-t').value = VD.indexOf('2024-01-14'); tall('vp-chart', 430);
  on(['vp-t', 'vp-ref'], varPaths);
  P('vp-play', 'vp-t', range(0, 30, 1).concat(range(35, NV - 1, 7)).concat([NV - 1]), 220);
  tall('qr-chart', 400); on(['qr-w'], qsRoll); P('qr-play', 'qr-w', [60, 90, 120, 180, 240, 300, 365, 420, 480, 540, 600, 660, 720], 800);
  const PFX = { 'overfitting': 'oa', 'trading': 'eq', 'snooping': 'sn', 'var-models': 'vm', 'var-paths': 'vp', 'qs-roll': 'qr' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  shapChart(); overfit(); trading(); snoop(); varModels(); varPaths(); qsRoll();
}
window.L7 = { accuracy, perf, dsr, scores, MEND, days, PhiInv, Phi, ranks, pearson, kupiecP, christP, dmP, overfit, trading, snoop, varModels, varPaths, qsRoll };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
