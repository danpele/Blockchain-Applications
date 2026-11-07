// Lecture 3 interactive page: one block per chart slide, computed in the browser from l3_data.js (Slides/interactive_src/export_l3.py).
(function () {
'use strict';
const D = window.L3_DATA;
const { C, sum, mean, sdev, nf, $, AX, layout, ttl, plot, out, Player, range, predict } = window.MFMI;
const T = window.L3_TEXT;

// ---------------------------------------------------------------- colours (same as the slides)
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', gold: '#B5853F', red: '#CD0000', green: '#2E7D32', orange: '#E67E22', purple: '#8E44AD', teal: '#17A2B8' };

// ---------------------------------------------------------------- helpers
const days = (d0, n) => { const t0 = Date.parse(d0 + 'T00:00:00Z'); return Array.from({ length: n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10)); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const corr = (x, y) => { const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c); };
const ols = (x, y) => { const mx = mean(x), my = mean(y); let a = 0, b = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; } const s = a / b; return { slope: s, icpt: my - s * mx }; };
const LOGY = t => AX(t, { type: 'log', dtick: 1 });
const lr = (p, i) => (finite(p[i]) && finite(p[i - 1]) ? 100 * Math.log(p[i] / p[i - 1]) : null);

// ---------------------------------------------------------------- coins: prices on a daily calendar, supply on month-ends and first days
const PXD = days(D.px.d0, D.px.n), PXI = Object.fromEntries(PXD.map((d, i) => [d, i]));
const SUPI = Object.fromEntries(D.sup.dates.map((d, i) => [d, i]));
const price = (c, d) => D.px.p[c][PXI[d]];
const supply = (c, d) => D.sup.s[c][SUPI[d]];
const mval = (c, d) => { const p = price(c, d), s = supply(c, d); return finite(p) && finite(s) ? p * s : null; };
const ENDR = D.endr;

// ---------------------------------------------------------------- CRIX, VCRIX, Bitcoin on the CRIX calendar
const CD = days(D.crix.d0, D.crix.n), CI = Object.fromEntries(CD.map((d, i) => [d, i]));
const CRIX = D.crix.c, VCRIX = D.crix.v, BTCP = D.crix.b, OFF = D.official;
const RC = CRIX.map((_, i) => (i ? lr(CRIX, i) : null));                       // CRIX log returns (%), consecutive days only
const ART = d => d >= '2026-05-14' && d <= '2026-07-08';                     // CRIX gap and the 30 days after it
const VOK = VCRIX.map((v, i) => (ART(CD[i]) ? null : v));

// ================================================================= 1. survivorship
function survPaths(t0, N, how) {
  const t1 = ENDR, avail = D.coins.filter(c => finite(mval(c, t0)));
  const top = d => [...avail].sort((a, b) => mval(b, d) - mval(a, d)).slice(0, N);
  const ante = top(t0), post = top(t1);
  const path = mem => {
    const tot = sum(mem.map(c => mval(c, t0))), w = mem.map(c => (how === 'cap' ? mval(c, t0) / tot : 1 / mem.length));
    const u = mem.map((c, j) => 100 * w[j] / price(c, t0)), i0 = PXI[t0], i1 = PXI[t1], x = [], y = [];
    for (let i = i0; i <= i1; i++) { x.push(PXD[i]); y.push(sum(mem.map((c, j) => u[j] * D.px.p[c][i]))); }
    return { x, y };
  };
  const yrs = (Date.parse(t1) - Date.parse(t0)) / 864e5 / 365.25;
  const a = path(ante), b = path(post), ea = a.y[a.y.length - 1], eb = b.y[b.y.length - 1];
  return { ante, post, a, b, ea, eb, ca: 100 * ((ea / 100) ** (1 / yrs) - 1), cb: 100 * ((eb / 100) ** (1 / yrs) - 1), rank0: avail.length };
}
function survivorship() {
  const t0 = $('sv-t').value, N = +$('sv-n').value, how = $('sv-w').value;
  $('sv-n-v').textContent = N;
  const S = survPaths(t0, N, how), wl = how === 'cap' ? 'market-value weights' : 'equal weights';
  plot('sv-chart', [
    { x: S.a.x, y: S.a.y, mode: 'lines', name: `top ${N} of ${shortDate(t0)} (ex ante): ${S.ante.join(', ')}`, line: { color: BA.blue, width: 1.4 }, hovertemplate: '%{x|%d %b %Y}: %{y:,.0f} USD<extra></extra>' },
    { x: S.b.x, y: S.b.y, mode: 'lines', name: `top ${N} of ${shortDate(ENDR)} (ex post): ${S.post.join(', ')}`, line: { color: BA.red, width: 1.4 }, hovertemplate: '%{x|%d %b %Y}: %{y:,.0f} USD<extra></extra>' }],
    layout({ title: ttl(`Value of 100 USD bought on ${shortDate(t0)}, ${wl}`), xaxis: AX('', { type: 'date' }), yaxis: LOGY('USD (log scale)') }));
  out('sv-out', [T.sv1(N, longDate(t0), S.ante.join(', '), gnum(S.ea), nf(S.ca, 1)), T.sv2(N, longDate(ENDR), S.post.join(', '), gnum(S.eb), nf(S.cb, 1)),
    T.sv3(nf(S.cb - S.ca, 1), S.ante.filter(c => S.post.includes(c)).length, N)]);
}

// ================================================================= 2. AIC rule
function aicRule() {
  const j = +$('ar-q').value, s = D.sel[j], ks = s.aic.map((_, i) => i + 1);
  $('ar-q-v').textContent = longDate(s.q);
  const mk = (k, col, nm, sym) => ({ x: [k], y: [s.aic[k - 1]], mode: 'markers', name: nm, marker: { size: 13, color: 'rgba(0,0,0,0)', line: { color: col, width: 2.5 }, symbol: sym }, hoverinfo: 'skip' });
  plot('ar-chart', [
    { x: ks, y: s.aic, mode: 'lines+markers', name: `AIC(k), 90 days to ${shortDate(s.q)}`, line: { color: BA.blue, width: 1.6 }, marker: { size: 7, color: BA.blue }, hovertemplate: 'k = %{x}: AIC %{y:.1f}<extra></extra>' },
    mk(s.ke, BA.red, `first rise of the AIC: k = ${s.ke}`, 'circle'), mk(s.kf, BA.orange, `global minimum: k = ${s.kf}`, 'square'),
    { x: [s.kc, s.kc], y: [Math.min(...s.aic), Math.max(...s.aic)], mode: 'lines', name: `CTDC-type rule: k = ${s.kc}`, line: { color: BA.purple, width: 1.5, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Decision curve of the quarterly reselection'), xaxis: AX('number of constituents k', { dtick: 1 }), yaxis: AX('AIC') }));
  const gain = ks.slice(1).map(k => s.aic[k - 2] - s.aic[k - 1]);
  out('ar-out', [T.ar1(longDate(s.q), s.order.length, s.order.join(', '), s.excl.length ? s.excl.join(', ') : 'none', nf(s.thr, 1)),
    T.ar2(s.ke, s.kf, s.kc, s.order.slice(0, s.ke).join(', ')),
    T.ar3(nf(gain[0], 1), gain.length > 1 ? nf(gain[gain.length - 1], 1) : '–')]);
}

// ================================================================= 3. replica against CRIX
const isMonthEnd = d => new Date(Date.parse(d + 'T00:00:00Z') + 864e5).toISOString().slice(8, 10) === '01';
function schedule(rule) {             // [tau, members] at every month-end; members chosen at each quarter end
  const sch = [];
  D.sel.forEach((s, j) => {
    const nxt = j + 1 < D.sel.length ? D.sel[j + 1].q : ENDR;
    const k = rule === 'e' ? s.ke : rule === 'f' ? s.kf : rule === 'c' ? s.kc : rule === 'tmi' ? s.order.length : Math.min(+rule, s.order.length);
    const mem = s.order.slice(0, k);
    for (let i = PXI[s.q]; i < PXI[nxt]; i++) if (PXD[i] === s.q || isMonthEnd(PXD[i])) sch.push([PXD[i], mem]);
  });
  return sch;
}
function laspeyres(sch, cap) {
  const lev = new Array(PXD.length).fill(null), wts = [];
  let I = 1000; lev[PXI[sch[0][0]]] = 1000;
  sch.forEach(([tau, mem], j) => {
    const end = j + 1 < sch.length ? sch[j + 1][0] : ENDR, mvs = mem.map(c => mval(c, tau)), tot = sum(mvs);
    let w = mvs.map(v => v / tot);
    if (cap && w.length > 1) for (let it = 0; it < 50; it++) {
      const over = w.map(v => v > cap); if (!over.some(Boolean)) break;
      const ex = sum(w.filter((v, i) => over[i]).map(v => v - cap)), rest = sum(w.filter((v, i) => !over[i]));
      w = w.map((v, i) => (over[i] ? cap : v + ex * v / rest));
    }
    const q = mem.map((c, i) => w[i] * tot / price(c, tau)), D0 = sum(mem.map((c, i) => price(c, tau) * q[i])) / I;
    for (let i = PXI[tau] + 1; i <= PXI[end]; i++) lev[i] = sum(mem.map((c, k) => D.px.p[c][i] * q[k])) / D0;
    I = lev[PXI[end]]; wts.push({ tau, mem, w, D: D0 });
  });
  return { lev, wts };
}
function trackStats(lev, start) {      // daily log returns against CRIX on common consecutive days, start -> ENDR
  const x = [], y = [], dd = [];
  for (let i = PXI[start] + 1; i <= PXI[ENDR]; i++) {
    const d = PXD[i], ci = CI[d], rc = ci !== undefined ? RC[ci] : null, rr = finite(lev[i]) && finite(lev[i - 1]) ? 100 * Math.log(lev[i] / lev[i - 1]) : null;
    if (finite(rc) && finite(rr)) { x.push(rc); y.push(rr); dd.push(d); }
  }
  const diff = x.map((v, i) => v - y[i]);
  return { n: x.length, corr: corr(x, y), te: sdev(diff) * Math.sqrt(365), x, y, d: dd };
}
const RULE_NAME = { e: 'first rise of the AIC (ECRIX)', f: 'global minimum of the AIC (EFCRIX)', c: 'CTDC-type polynomial rule', tmi: 'all eligible coins (TMI)' };
function replica() {
  const rule = $('rp-r').value, cap = $('rp-c').value === 'cap' ? 0.4999 : null;
  const sch = schedule(rule), L = laspeyres(sch, cap), start = sch[0][0], S = trackStats(L.lev, start);
  const i0 = PXI[start], i1 = PXI[ENDR], x = PXD.slice(i0, i1 + 1), c0 = CRIX[CI[start]];
  const crixN = x.map(d => (CI[d] !== undefined && finite(CRIX[CI[d]]) ? 1000 * CRIX[CI[d]] / c0 : null));
  const nm = RULE_NAME[rule] || `top ${rule} coins`;
  plot('rp-chart', [
    { x, y: crixN, mode: 'lines', name: 'Royalton CRIX (thecrix.de)', line: { color: BA.red, width: 1.4 }, connectgaps: false, hovertemplate: 'CRIX %{x|%d %b %Y}: %{y:,.0f}<extra></extra>' },
    { x, y: L.lev.slice(i0, i1 + 1), mode: 'lines', name: `replica: ${nm}${cap ? ', capped below 50%' : ''}`, line: { color: BA.blue, width: 1.2 }, hovertemplate: 'replica %{x|%d %b %Y}: %{y:,.0f}<extra></extra>' }],
    layout({ title: ttl(`1000 on ${shortDate(start)} (log scale)`), xaxis: AX('', { type: 'date' }), yaxis: LOGY('index level') }));
  const ks = sch.filter((_, j) => j === 0 || sch[j][1] !== sch[j - 1][1]).map(s => s[1].length);
  const last = L.wts[L.wts.length - 1], wb = last.mem.indexOf('BTC');
  out('rp-out', [T.rp1(gnum(S.n), nf(S.corr, 3), nf(S.te, 1)), T.rp2(nf(mean(ks), 1), Math.min(...ks), Math.max(...ks), gnum(crixN[crixN.length - 1] || crixN.filter(finite).slice(-1)[0]), gnum(L.lev[i1])),
    T.rp3(shortDate(last.tau), last.mem.map((c, i) => `${c} ${nf(100 * last.w[i], 1)}%`).join(', '), wb >= 0 ? nf(100 * last.w[wb], 1) : '0')]);
}

// ================================================================= 4. CRIX path and statistics
function annStats(p, d, a, b) {        // CAGR, annualised volatility of consecutive-day log returns, maximum drawdown
  const idx = []; for (let i = 0; i < p.length; i++) if (d[i] >= a && d[i] <= b && finite(p[i])) idx.push(i);
  const i0 = idx[0], i1 = idx[idx.length - 1], yrs = (Date.parse(d[i1]) - Date.parse(d[i0])) / 864e5 / 365.25;
  const r = []; for (const i of idx) if (i > i0) { const v = lr(p, i); if (finite(v)) r.push(v); }
  let pk = -Infinity, mdd = 0, pkd = '', trd = '', cur = '';
  for (const i of idx) { if (p[i] > pk) { pk = p[i]; cur = d[i]; } const dd = p[i] / pk - 1; if (dd < mdd) { mdd = dd; trd = d[i]; pkd = cur; } }
  return { cagr: 100 * ((p[i1] / p[i0]) ** (1 / yrs) - 1), vol: sdev(r) * Math.sqrt(365), mdd: 100 * mdd, pkd, trd, n: r.length, d0: d[i0], d1: d[i1] };
}
function crixPath() {
  const a = $('cp-a').value, b = $('cp-b').value;
  const sc = annStats(CRIX, CD, a, b), sb = annStats(BTCP, CD, a, b);
  const i0 = CI[sc.d0], i1 = CI[b] !== undefined ? CI[b] : CD.length - 1, x = CD.slice(i0, i1 + 1);
  const b0 = BTCP[CI[sb.d0]], c0 = CRIX[i0];
  plot('cp-chart', [
    { x, y: CRIX.slice(i0, i1 + 1).map(v => (finite(v) ? 100 * v / c0 : null)), mode: 'lines', name: 'Royalton CRIX', line: { color: BA.red, width: 1.4 }, hovertemplate: 'CRIX %{x|%d %b %Y}: %{y:,.1f}<extra></extra>' },
    { x, y: BTCP.slice(i0, i1 + 1).map(v => (finite(v) ? 100 * v / b0 : null)), mode: 'lines', name: 'Bitcoin (EODHD close)', line: { color: BA.btc, width: 1.1 }, hovertemplate: 'Bitcoin %{x|%d %b %Y}: %{y:,.1f}<extra></extra>' }],
    layout({ title: ttl(`100 on ${shortDate(sc.d0)} (log scale)`), xaxis: AX('', { type: 'date' }), yaxis: LOGY('level') }));
  out('cp-out', [T.cp1('CRIX', shortDate(sc.d0), shortDate(sc.d1), nf(sc.cagr, 1), nf(sc.vol, 1), nf(sc.mdd, 1), shortDate(sc.pkd), shortDate(sc.trd)),
    T.cp1('Bitcoin', shortDate(sb.d0), shortDate(sb.d1), nf(sb.cagr, 1), nf(sb.vol, 1), nf(sb.mdd, 1), shortDate(sb.pkd), shortDate(sb.trd)),
    sc.d0 < OFF ? T.cp2() : T.cp3(gnum(sc.n))]);
}

// ================================================================= 5. drawdowns
function ddSeries(p, d, last) {
  const x = [], y = []; let pk = -Infinity;
  for (let i = 0; i < p.length; i++) if (finite(p[i]) && d[i] <= last) { pk = Math.max(pk, p[i]); x.push(d[i]); y.push(100 * (p[i] / pk - 1)); }
  return { x, y };
}
function episodes(p, d, depth) {       // falls deeper than depth (%): peak, trough, recovery
  const outE = []; let pv = null, pd = null, tv = null, td = null, inDD = false;
  for (let i = 0; i < p.length; i++) {
    if (!finite(p[i])) continue;
    const v = p[i];
    if (pv === null || v >= pv) {
      if (inDD && tv / pv - 1 <= -depth / 100) outE.push({ pk: pd, tr: td, depth: 100 * (tv / pv - 1), rec: d[i] });
      pv = v; pd = d[i]; inDD = false; tv = null;
    } else { inDD = true; if (tv === null || v < tv) { tv = v; td = d[i]; } }
  }
  if (inDD && tv / pv - 1 <= -depth / 100) outE.push({ pk: pd, tr: td, depth: 100 * (tv / pv - 1), rec: null });
  return outE;
}
const DDC = ddSeries(CRIX, CD, '9999'), DDB = ddSeries(BTCP, CD, '2026-10-31');
function drawdowns() {
  const thr = +$('dd-d').value; $('dd-d-v').textContent = thr + '%';
  plot('dd-chart', [
    { x: DDC.x, y: DDC.y, mode: 'lines', fill: 'tozeroy', name: 'CRIX drawdown', line: { color: BA.red, width: 0.8 }, fillcolor: 'rgba(205,0,0,0.25)', hovertemplate: 'CRIX %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' },
    { x: DDB.x, y: DDB.y, mode: 'lines', name: 'Bitcoin drawdown', line: { color: BA.btc, width: 1 }, hovertemplate: 'Bitcoin %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' },
    { x: [DDC.x[0], DDC.x[DDC.x.length - 1]], y: [-thr, -thr], mode: 'lines', name: `${thr}% below the record`, line: { color: BA.blue, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('% below the last record'), xaxis: AX('', { type: 'date' }), yaxis: AX('%', { range: [-100, 0] }) }));
  const sh = s => 100 * s.y.filter(v => v < -thr).length / s.y.length;
  const E = episodes(CRIX, CD, thr);
  out('dd-out', [T.dd1(thr, nf(sh(DDC), 1), nf(sh(DDB), 1)), T.dd2(thr, E.length, E.map(e => `${shortDate(e.pk)} → ${shortDate(e.tr)} (${nf(e.depth, 1)}%${e.rec ? ', record again ' + shortDate(e.rec) : ', not yet recovered'})`).join('; ') || '–')]);
}

// ================================================================= 6. VCRIX against realised volatility
function rv(w) {                       // sqrt(365 * mean of r^2 over the last w consecutive-day returns), % a year
  const res = new Array(RC.length).fill(null);
  let s = 0, cnt = 0;
  for (let i = 0; i < RC.length; i++) {
    if (finite(RC[i])) { s += RC[i] ** 2; cnt++; } else { s = 0; cnt = 0; continue; }
    if (cnt > w) { s -= RC[i - w] ** 2; cnt = w; }
    if (cnt === w) res[i] = Math.sqrt(365 * s / w);
  }
  return res;
}
function vcrixRV() {
  const w = +$('vr-w').value, lag = +$('vr-l').value; $('vr-w-v').textContent = w + ' days';
  const R = rv(w), x = [], y = [], dd = [];
  for (let i = lag; i < CD.length; i++) if (CD[i] <= '2026-05-13' && finite(VOK[i]) && finite(R[i - lag])) { x.push(R[i - lag]); y.push(VOK[i]); dd.push(CD[i]); }
  const c = corr(x, y), f = ols(x, y);
  plot('vr-chart', [
    { x: CD, y: VCRIX, mode: 'lines', name: 'VCRIX (left axis)', line: { color: BA.purple, width: 1.1 }, hovertemplate: 'VCRIX %{x|%d %b %Y}: %{y:,.0f}<extra></extra>' },
    { x: CD, y: R, mode: 'lines', name: `CRIX realised volatility, ${w} days (% a year, right axis)`, yaxis: 'y2', line: { color: BA.teal, width: 1 }, hovertemplate: 'RV %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' }],
    layout({ title: ttl('VCRIX and the realised volatility of CRIX'), xaxis: AX('', { type: 'date' }), yaxis: AX('VCRIX'),
      yaxis2: AX('% a year', { overlaying: 'y', side: 'right', showgrid: false }), margin: { l: 56, r: 56, t: 30, b: 40 },
      shapes: [{ type: 'rect', xref: 'x', yref: 'paper', x0: '2026-05-14', x1: '2026-07-08', y0: 0, y1: 1, fillcolor: 'rgba(244,199,195,0.6)', line: { width: 0 } }] }));
  out('vr-out', [T.vr1(w, lag, gnum(x.length), nf(c, 3)), T.vr2(nf(f.icpt, 1), nf(f.slope, 2), w, gnum(f.icpt + 50 * f.slope)), T.vr3()]);
}

// ================================================================= 7. VCRIX after falls and rises
function vcrixReturns() {
  const thr = +$('vl-t').value; $('vl-t-v').textContent = nf(thr, 1) + '%';
  const xs = [], ys = [];
  for (let i = 2; i < CD.length; i++) {
    if (CD[i] < OFF || CD[i] > '2026-05-13') continue;
    const dv = finite(VOK[i]) && finite(VOK[i - 1]) ? 100 * Math.log(VOK[i] / VOK[i - 1]) : null, r1 = RC[i - 1], r0 = RC[i];
    if (finite(dv) && finite(r1) && finite(r0)) { xs.push(r1); ys.push(dv); }
  }
  const dn = ys.filter((_, i) => xs[i] < -thr), up = ys.filter((_, i) => xs[i] > thr), mid = ys.filter((_, i) => Math.abs(xs[i]) <= thr);
  plot('vl-chart', [
    { x: xs, y: ys, mode: 'markers', name: 'days, 16 Mar 2018 – 13 May 2026', marker: { size: 4, color: 'rgba(142,68,173,0.35)' }, hovertemplate: 'return %{x:.1f}%: ΔlnVCRIX %{y:.1f}%<extra></extra>' },
    { x: [-thr, -thr], y: [-60, 120], mode: 'lines', name: `return of ±${nf(thr, 1)}%`, line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' },
    { x: [thr, thr], y: [-60, 120], mode: 'lines', showlegend: false, line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Change of ln VCRIX on day t against the CRIX return on day t−1'), xaxis: AX('CRIX log return on day t−1 (%)'), yaxis: AX('change of ln VCRIX (%)', { range: [-60, 120] }) }));
  const m = a => (a.length ? nf(mean(a), 1) : '–');
  out('vl-out', [T.vl1(gnum(xs.length), nf(corr(xs, ys), 3)), T.vl2(nf(thr, 1), dn.length, m(dn), up.length, m(up), mid.length, m(mid))]);
}

// ================================================================= 8. VCRIX, GARCH and realised volatility: who leads?
const GF = D.garch.f1, RV30 = rv(30);
function garchVcrix() {
  const k = +$('gv-k').value; $('gv-k-v').textContent = (k > 0 ? '+' : '') + k + ' days';
  const pair = (S) => { const x = [], y = []; for (let i = 0; i < CD.length; i++) { const j = i + k; if (CD[i] < OFF || CD[i] > '2026-05-13' || j < 0 || j >= CD.length || CD[j] > '2026-05-13') continue; if (finite(VOK[i]) && finite(S[j]) && finite(GF[i]) && finite(RV30[i])) { x.push(VOK[i]); y.push(S[j]); } } return x.length > 30 ? corr(x, y) : NaN; };
  const cg = pair(GF), cr = pair(RV30);
  const sel = CD.map((d, i) => d >= OFF && d <= '2026-05-13' ? i : -1).filter(i => i >= 0);
  plot('gv-chart', [
    { x: sel.map(i => CD[i]), y: sel.map(i => GF[i]), mode: 'lines', name: 'GARCH(1,1)-t volatility of CRIX (% a year, left axis)', line: { color: BA.blue, width: 0.9 }, hovertemplate: 'GARCH %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' },
    { x: sel.map(i => CD[i]), y: sel.map(i => RV30[i]), mode: 'lines', name: 'realised volatility, 30 days (% a year, left axis)', line: { color: BA.teal, width: 0.9 }, hovertemplate: 'RV %{x|%d %b %Y}: %{y:.0f}%<extra></extra>' },
    { x: sel.map(i => CD[i]), y: sel.map(i => VOK[i]), mode: 'lines', name: 'VCRIX (right axis)', yaxis: 'y2', line: { color: BA.purple, width: 1 }, hovertemplate: 'VCRIX %{x|%d %b %Y}: %{y:,.0f}<extra></extra>' }],
    layout({ title: ttl('VCRIX, GARCH and realised volatility'), xaxis: AX('', { type: 'date' }), yaxis: AX('% a year'),
      yaxis2: AX('VCRIX', { overlaying: 'y', side: 'right', showgrid: false }), margin: { l: 56, r: 56, t: 30, b: 40 } }));
  const G = D.garch, pers = G.alpha + G.beta;
  out('gv-out', [T.gv1(k, nf(cg, 3), nf(cr, 3)), T.gv2(nf(G.alpha, 3), nf(G.beta, 3), nf(pers, 4), gnum(Math.log(0.5) / Math.log(pers)))]);
}

// ================================================================= 9. a spot Bitcoin ETF against Bitcoin
const ETF = D.etf;
function etf() {
  const clk = $('et-c').value, j0 = +$('et-s').value, B = clk === '16' ? ETF.b16 : ETF.b00;
  $('et-s-v').textContent = shortDate(ETF.dates[j0]);
  const d = ETF.dates.slice(j0), ib = ETF.ib.slice(j0), b = B.slice(j0);
  const diff = []; for (let i = 1; i < d.length; i++) diff.push(100 * Math.log(ib[i] / ib[i - 1]) - 100 * Math.log(b[i] / b[i - 1]));
  const ratio = ib.map((v, i) => v / b[i]), t = d.map(s => (Date.parse(s) - Date.parse(d[0])) / 864e5 / 365.25), f = ols(t, ratio.map(Math.log));
  plot('et-ratio', [
    { x: d, y: ratio.map(v => 100 * (v / ratio[0] - 1)), mode: 'lines', name: 'IBIT / Bitcoin, change since start (%)', line: { color: BA.blue, width: 1 }, hovertemplate: '%{x|%d %b %Y}: %{y:.2f}%<extra></extra>' },
    { x: d, y: t.map(v => 100 * (Math.exp(f.slope * v) - 1)), mode: 'lines', name: `trend: ${nf(100 * f.slope, 2)}% a year`, line: { color: BA.red, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Tracking difference'), xaxis: AX('', { type: 'date' }), yaxis: AX('%') }));
  plot('et-hist', [{ x: diff.map(v => Math.max(-6, Math.min(6, v))), type: 'histogram', xbins: { start: -6, end: 6, size: 0.1 }, name: 'IBIT return minus Bitcoin return (percentage points)', marker: { color: clk === '16' ? BA.blue : BA.orange }, hovertemplate: '%{x}: %{y} days<extra></extra>' }],
    layout({ title: ttl('Daily return differences'), xaxis: AX('percentage points', { range: [-6, 6] }), yaxis: AX('days'), bargap: 0 }));
  out('et-out', [T.et1(clk === '16' ? '16:00 New York' : '24:00 UTC', shortDate(d[0]), shortDate(d[d.length - 1]), diff.length, nf(sdev(diff), 3), nf(sdev(diff) * Math.sqrt(252), 1)),
    T.et2(nf(100 * f.slope, 2), nf(100 * (ratio[ratio.length - 1] / ratio[0] - 1), 2))]);
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  on(['sv-t', 'sv-n', 'sv-w'], survivorship); P('sv-play', 'sv-n', range(2, 8, 1), 800);
  $('ar-q').max = D.sel.length - 1; $('ar-q').value = D.sel.length - 1; on(['ar-q'], aicRule); P('ar-play', 'ar-q', range(0, D.sel.length - 1, 1), 450);
  on(['rp-r', 'rp-c'], replica);
  on(['cp-a', 'cp-b'], crixPath);
  on(['dd-d'], drawdowns); P('dd-play', 'dd-d', range(10, 90, 5), 450);
  on(['vr-w', 'vr-l'], vcrixRV); P('vr-play', 'vr-w', [7, 10, 14, 21, 30, 45, 60, 90], 700);
  on(['vl-t'], vcrixReturns); P('vl-play', 'vl-t', range(1, 12, 1), 500);
  on(['gv-k'], garchVcrix); P('gv-play', 'gv-k', range(-10, 10, 1), 450);
  $('et-s').max = ETF.dates.length - 60; on(['et-c', 'et-s'], etf);
  const PFX = { survivorship: 'sv', 'aic-rule': 'ar', replica: 'rp', 'crix-path': 'cp', drawdowns: 'dd', vcrix: 'vr', 'vcrix-returns': 'vl', 'garch-vcrix': 'gv', 'etf-tracking': 'et' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  survivorship(); aicRule(); replica(); crixPath(); drawdowns(); vcrixRV(); vcrixReturns(); garchVcrix(); etf();
}
window.L3 = { survPaths, schedule, laspeyres, trackStats, annStats, episodes, ddSeries, rv, corr, ols, CD, CRIX, BTCP, VOK, RC, OFF, ETF, GF, RV30, PXD, PXI };
if (typeof document !== 'undefined' && document.getElementById && document.getElementById('sv-chart')) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
})();
