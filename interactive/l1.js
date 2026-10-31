// Lecture 1 interactive page: one block per chart slide, computed in the browser from l1_data.js.
(function () {
'use strict';
const D = window.L1_DATA;
const { C, sum, mean, sdev, nf, pct, $, AX, layout, ttl, plot, out, vline, Player, range, predict, exitTicket } = window.MFMI;
const T = window.L1_TEXT;

// ---------------------------------------------------------------- colours (same as the slides)
const COL = { BTC: '#E67E22', ETH: '#8E44AD', DOGE: '#B5853F', ADA: '#2E7D32', LTC: '#17A2B8' };        // MFM ch16 charts
const BA = { btc: '#E8913A', eth: '#9B59B6', blue: '#1A3A6E', red: '#CD0000', green: '#2E7D32', orange: '#E67E22', purple: '#8E44AD' };

// ---------------------------------------------------------------- helpers
const days = x => {                 // daily calendar {d0, n} or a list of dates
  if (Array.isArray(x)) return x;
  const t0 = Date.parse(x.d0 + 'T00:00:00Z');
  return Array.from({ length: x.n }, (_, i) => new Date(t0 + i * 864e5).toISOString().slice(0, 10));
};
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = s => `${+s.slice(8, 10)} ${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const longMonth = s => `${MON[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const shortMonth = s => `${MON[+s.slice(5, 7) - 1].slice(0, 3)} ${s.slice(0, 4)}`;
const gnum = (x, d = 0) => { const s = Math.abs(x).toFixed(d).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); };
const finite = v => v !== null && v !== undefined && isFinite(v);
const lastValid = a => { for (let i = a.length - 1; i >= 0; i--) if (finite(a[i])) return [a[i], i]; return [NaN, -1]; };
function rollMean(a, w, mp) {       // pandas rolling(w, min_periods=mp).mean()
  const res = new Array(a.length).fill(null); let s = 0, n = 0;
  for (let i = 0; i < a.length; i++) {
    if (finite(a[i])) { s += a[i]; n++; }
    const j = i - w; if (j >= 0 && finite(a[j])) { s -= a[j]; n--; }
    res[i] = n >= mp ? s / n : null;
  }
  return res;
}
function ols(x, y) {                // y = a + b x; returns a, b, residuals, R2
  const mx = mean(x), my = mean(y);
  let sxy = 0, sxx = 0; for (let i = 0; i < x.length; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx, e = y.map((v, i) => v - a - b * x[i]);
  const sst = sum(y.map(v => (v - my) ** 2)), r2 = 1 - sum(e.map(v => v * v)) / sst;
  return { a, b, e, r2 };
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
  const V = M(M(inv, S), inv);
  return Math.sqrt(V[1][1]);
}
const corr = (x, y) => { const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c); };
const LOG = { type: 'log', dtick: 1 };                 // log axis with one labelled tick per power of ten
const tall = (id, h) => { $(id).style.height = h + 'px'; };
const lastOfMonth = dates => dates.map((d, i) => (i === dates.length - 1 || dates[i + 1].slice(0, 7) !== d.slice(0, 7))).map((f, i) => (f ? i : -1)).filter(i => i >= 0);

// ================================================================= 2.1 market value of the five coins
const CO = D.coins, CO_D = days(CO.dates), NC = CO_D.length;
const coinTot = CO_D.map((_, i) => sum(CO.keys.map(k => CO.mv[k][i])));
function marketValue() {
  const i = +$('mv-t').value, d = CO_D[i];
  $('mv-t-v').textContent = longDate(d);
  const me = lastOfMonth(CO_D), xm = me.map(j => CO_D[j]);
  const share = CO_D.map((_, j) => 100 * CO.mv.BTC[j] / coinTot[j]);
  const tr = CO.keys.map((k, n) => ({ x: xm, y: me.map(j => CO.mv[k][j]), type: 'scatter', mode: 'lines', stackgroup: 'one', name: CO.names[n],
    line: { width: 0, color: COL[k] }, fillcolor: COL[k] + 'D9', hovertemplate: CO.names[n] + ' %{x|%b %Y}: %{y:,.0f} USD bn<extra></extra>' }));
  tr.push({ x: CO_D, y: share, xaxis: 'x', yaxis: 'y2', mode: 'lines', name: 'Bitcoin share of the 5 assets (%)', line: { color: COL.BTC, width: 1.2 },
    hovertemplate: 'Bitcoin share %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' });
  plot('mv-chart', tr, layout({ title: ttl('Five selected coins: market value, month end, and Bitcoin share, daily'),
    xaxis: AX('', { type: 'date', anchor: 'y2' }), yaxis: AX('Market value (USD bn)', { domain: [0.4, 1] }),
    yaxis2: AX('%', { domain: [0, 0.3], range: [40, 100], tickvals: [50, 75, 100] }), shapes: [vline(d, C.navy, 'dot')], margin: { l: 64, r: 12, t: 30, b: 40 },
    legend: { orientation: 'h', x: 0, y: -0.12, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } } }));
  const w = CO.keys.map(k => CO.mv[k][i] / coinTot[i]), hhi = sum(w.map(v => v * v));
  let pk = 0; coinTot.forEach((v, j) => { if (v > coinTot[pk]) pk = j; });
  out('mv-out', [T.mv1(longDate(d), gnum(coinTot[i]), gnum(CO.mv.BTC[i]), nf(100 * w[0], 1)),
    T.mv2(nf(hhi, 2), nf(1 / hhi, 2)), T.mv3(gnum(coinTot[pk]), longDate(CO_D[pk]))]);
}

// ================================================================= 2.3 CRIX-type index
function crixIndex(k, equal) {      // the notebook's crix_index(): monthly reweighting, quantities fixed within the month
  const keys = CO.keys, lvl = new Array(NC).fill(null);
  let val = 1000, first = true, j = 0;
  while (j < NC) {
    const m = CO_D[j].slice(0, 7); let e = j; while (e + 1 < NC && CO_D[e + 1].slice(0, 7) === m) e++;
    if (j > 0) {
      const p = j - 1, base = keys.map(c => CO.mv[c][p]);
      const order = keys.map((c, n) => n).sort((a, b) => base[b] - base[a]).slice(0, k || keys.length);
      const bs = sum(order.map(n => base[n]));
      const w = order.map(n => (equal ? 1 / order.length : base[n] / bs));
      if (first) { lvl[p] = val; first = false; }
      for (let t = j; t <= e; t++) lvl[t] = val * sum(order.map((n, q) => w[q] * CO.px[keys[n]][t] / CO.px[keys[n]][p]));
      val = lvl[e];
    }
    j = e + 1;
  }
  const i0 = lvl.findIndex(v => v !== null);
  return { x: CO_D.slice(i0), y: lvl.slice(i0) };
}
const logRet = y => y.slice(1).map((v, i) => Math.log(v / y[i]));
let crixCache = null;
function crixAll() {
  if (crixCache) return crixCache;
  const tot = crixIndex(), ix = { tot, ew: crixIndex(0, true) }, rt = logRet(tot.y);
  for (let k = 1; k <= 4; k++) {
    const s = crixIndex(k), d = logRet(s.y).map((v, i) => v - rt[i]);
    ix[k] = Object.assign(s, { te: 100 * sdev(d) * Math.sqrt(365), aic: rt.length * Math.log(mean(d.map(v => v * v))) + 2 * k });
  }
  return (crixCache = ix);
}
const growth = s => { const yrs = (Date.parse(s.x[s.x.length - 1]) - Date.parse(s.x[0])) / 864e5 / 365.25; return { yrs, g: (s.y[s.y.length - 1] / 1000) ** (1 / yrs) - 1, vol: sdev(logRet(s.y)) * Math.sqrt(365) }; };
function crix() {
  const k = +$('cx-k').value, ix = crixAll(), lab = k === 1 ? 'Top 1 (Bitcoin)' : 'Cap-weighted, top ' + k;
  $('cx-k-v').textContent = k;
  const ln = (s, name, color, w) => ({ x: s.x, y: s.y, mode: 'lines', name, line: { color, width: w }, hovertemplate: name + ' %{x|%d %b %Y}: %{y:,.0f}<extra></extra>' });
  const tr = [ln(ix.tot, 'Cap-weighted, all 5 selected coins', BA.orange, 1.6), ln(ix[k], lab, BA.purple, 1.1)];
  if (k !== 1) tr.push(ln(ix[1], 'Top 1 (Bitcoin)', BA.blue, 1));
  tr.push(ln(ix.ew, 'Equally weighted, 5 coins', BA.green, 1));
  plot('cx-chart', tr, layout({ title: ttl('Index of the five selected coins, monthly rebalancing, 1,000 on 31 January 2018'),
    xaxis: AX('', { type: 'date' }), yaxis: AX('Index level (log scale)', LOG) }));
  const gt = growth(ix.tot), gk = growth(ix[k]);
  let best = 1; for (let j = 2; j <= 4; j++) if (ix[j].aic < ix[best].aic) best = j;
  out('cx-out', [T.cx1(nf(gt.yrs, 1), pct(gt.g, 1), pct(gt.vol, 1)), T.cx2(lab, pct(gk.g, 1), pct(gk.vol, 1), nf(ix[k].te, 2)), T.cx3(best)]);
}

// ================================================================= 2.4 stablecoin supply
const ST = D.stable, ST_D = days(ST.dates);
function stableSupply() {
  const i = +$('ss-t').value, d = ST_D[i];
  $('ss-t-v').textContent = longDate(d);
  const ln = (y, name, color, w) => ({ x: ST_D, y, mode: 'lines', name, line: { color, width: w }, hovertemplate: name + ' %{x|%d %b %Y}: %{y:,.1f} USD bn<extra></extra>' });
  plot('ss-chart', [ln(ST.all, 'All USD stablecoins', BA.red, 1.6), ln(ST.usdt, 'Tether (USDT)', BA.green, 1.2),
    ln(ST.usdc, 'USD Coin (USDC)', BA.blue, 1.2), ln(ST.dai, 'Dai', BA.orange, 1.2)],
    layout({ title: ttl('Circulating supply of USD stablecoins (DefiLlama), daily'), xaxis: AX('', { type: 'date' }), yaxis: AX('Supply (USD bn)'),
      shapes: [vline(d, C.navy, 'dot')] }));
  const j20 = ST_D.indexOf('2020-01-01'), a = ST.all[i], t = ST.usdt[i] || 0, c = ST.usdc[i] || 0;
  out('ss-out', [T.ss1(longDate(d), gnum(a, a < 10 ? 1 : 0), nf(a / ST.all[j20], 0)), T.ss2(gnum(t, t < 10 ? 1 : 0), nf(100 * t / a, 0), gnum(c, c < 10 ? 1 : 0), nf(100 * c / a, 0), nf(100 * (t + c) / a, 0))]);
}

// ================================================================= 2.5 who issues the stablecoins
const CC = D.conc, CC_D = days(CC.dates);
function concentration() {
  const i = +$('sc-t').value, d = CC_D[i];
  $('sc-t-v').textContent = longDate(d);
  const p = a => a.map(v => (finite(v) ? 100 * v : null));
  const both = CC.usdt.map((v, j) => (finite(v) && finite(CC.usdc[j]) ? 100 * (v + CC.usdc[j]) : null));
  plot('sc-share', [
    { x: CC_D, y: p(CC.usdt), mode: 'lines', name: 'Tether (USDT) share (%)', line: { color: BA.green, width: 1.2 }, hovertemplate: 'USDT %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' },
    { x: CC_D, y: p(CC.usdc), mode: 'lines', name: 'USD Coin (USDC) share (%)', line: { color: BA.blue, width: 1.2 }, hovertemplate: 'USDC %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' },
    { x: CC_D, y: both, mode: 'lines', name: 'USDT + USDC (%)', line: { color: BA.red, width: 1.2, dash: 'dash' }, hovertemplate: 'USDT + USDC %{x|%d %b %Y}: %{y:.1f}%<extra></extra>' }],
    layout({ title: ttl('Shares of all USD stablecoins'), xaxis: AX('', { type: 'date' }), yaxis: AX('% of all USD stablecoins', { range: [0, 100] }), shapes: [vline(d, C.navy, 'dot')] }));
  plot('sc-hhi', [{ x: CC_D, y: CC.hhi, mode: 'lines', name: 'HHI of stablecoin issuers', line: { color: BA.eth, width: 1.2 }, hovertemplate: 'HHI %{x|%d %b %Y}: %{y:.3f}<extra></extra>' }],
    layout({ title: ttl('Herfindahl–Hirschman index of issuers'), xaxis: AX('', { type: 'date' }), yaxis: AX('HHI'), shapes: [vline(d, C.navy, 'dot')] }));
  const h = CC.hhi[i];
  out('sc-out', [T.sc(longDate(d), nf(100 * CC.usdt[i], 1), nf(100 * CC.usdc[i], 1), nf(h, 3), nf(1 / h, 2))]);
}

// ================================================================= 2.6 DeFi TVL
const DF = D.defi, DF_D = days(DF.dates);
function defi() {
  const b = +$('df-b').value, M = DF.mdates, last = M.length - 1;
  $('df-b-v').textContent = longMonth(M[b]);
  const ix = a => a.map(v => 100 * v / a[b]);
  plot('df-chart', [
    { x: M.map(m => m + '-15'), y: ix(DF.mtvl), mode: 'lines', name: 'DeFi total value locked', line: { color: BA.green, width: 1.5 }, customdata: DF.mtvl, hovertemplate: 'TVL %{x|%b %Y}: %{y:,.0f} (%{customdata:,.1f} USD bn)<extra></extra>' },
    { x: M.map(m => m + '-15'), y: ix(DF.meth), mode: 'lines', name: 'Ethereum price', line: { color: BA.purple, width: 1.3 }, customdata: DF.meth, hovertemplate: 'Ether %{x|%b %Y}: %{y:,.0f} (%{customdata:,.0f} USD)<extra></extra>' }],
    layout({ title: ttl('Month end, both 100 in ' + shortMonth(M[b])), xaxis: AX('', { type: 'date' }), yaxis: AX('Index (100 in ' + shortMonth(M[b]) + ', log scale)', LOG),
      shapes: [vline(M[b] + '-15', C.navy, 'dot')] }));
  let pk = 0; DF.tvl.forEach((v, j) => { if (v > DF.tvl[pk]) pk = j; });
  const lr = a => a.slice(1).map((v, j) => Math.log(v / a[j]));
  out('df-out', [T.df1(shortMonth(M[b]), shortMonth(M[last]), nf(DF.mtvl[last] / DF.mtvl[b], 2), gnum(DF.mtvl[b], 1), gnum(DF.mtvl[last], 1),
      nf(DF.meth[last] / DF.meth[b], 2), gnum(DF.meth[b]), gnum(DF.meth[last])),
    T.df2(nf(DF.tvl[0], 1), gnum(DF.tvl[pk]), longDate(DF_D[pk]), gnum(DF.tvl[DF.tvl.length - 1]), longDate(DF_D[DF_D.length - 1])),
    T.df3(nf(corr(lr(DF.mtvl), lr(DF.meth)), 2))]);
}

// ================================================================= 2.7 spot ETF
const EF = D.etf;
function etf() {
  const b = +$('et-b').value, n = EF.dates.length, x = EF.dates.slice(b);
  $('et-b-v').textContent = longDate(EF.dates[b]);
  const btc = EF.btc.slice(b).map(v => 100 * v / EF.btc[b]), ib = EF.ibit.slice(b).map(v => 100 * v / EF.ibit[b]);
  plot('et-chart', [
    { x, y: btc, mode: 'lines', name: 'Bitcoin (on ETF trading days)', line: { color: BA.orange, width: 1.5 }, hovertemplate: 'Bitcoin %{x|%d %b %Y}: %{y:.1f}<extra></extra>' },
    { x, y: ib, mode: 'lines', name: 'IBIT (spot Bitcoin ETF)', line: { color: BA.blue, width: 1.3, dash: 'dash' }, hovertemplate: 'IBIT %{x|%d %b %Y}: %{y:.1f}<extra></extra>' }],
    layout({ title: ttl('Both 100 on ' + longDate(EF.dates[b])), xaxis: AX('', { type: 'date', range: [EF.dates[0], EF.dates[n - 1]] }), yaxis: AX('Level (100 on ' + longDate(EF.dates[b]) + ')') }));
  const t = x.map(d => (Date.parse(d) - Date.parse(x[0])) / 864e5 / 365.25), lr = x.map((_, j) => Math.log(EF.ibit[b + j] / EF.btc[b + j]));
  const dr = ols(t, lr).b;
  out('et-out', [T.et(longDate(EF.dates[n - 1]), nf(btc[btc.length - 1], 1), nf(ib[ib.length - 1], 1), x.length, nf(100 * dr, 2))]);
}

// ================================================================= 3.1 four views of a blockchain
const OC = D.onchain, OC_D = days(OC.dates);
function onchain() {
  const w = +$('oc-w').value, clean = $('oc-mc').value === 'clean', mp = Math.max(1, Math.round(2 * w / 3));
  $('oc-w-v').textContent = w + (w === 1 ? ' day' : ' days');
  const sm = a => rollMean(a, w, mp), win = w === 1 ? 'daily' : w + '-day mean';
  const txb = sm(OC.tx_btc), txe = sm(OC.tx_eth), fb = sm(OC.fee_btc), fe = sm(OC.fee_eth);
  const mcb = OC.mc_btc.map((v, j) => (clean && OC_D[j] >= OC.bad[0] && OC_D[j] <= OC.bad[1] ? null : v));
  const L = (y, name, color, unit, show) => ({ x: OC_D, y, mode: 'lines', name, showlegend: !!show, legendgroup: name, line: { color, width: 1.1 }, hovertemplate: name + ' %{x|%d %b %Y}: %{y:,.4~r} ' + unit + '<extra></extra>' });
  const lay = (title, ylab, extra) => layout(Object.assign({ title: ttl(title), xaxis: AX('', { type: 'date' }), yaxis: AX(ylab, LOG) }, extra || {}));
  plot('oc-tx', [L(txb.map(v => (v === null ? null : v / 1e3)), 'Bitcoin', BA.btc, 'thousand', 1), L(txe.map(v => (v === null ? null : v / 1e3)), 'Ethereum', BA.eth, 'thousand', 1)],
    lay('Transactions per day (' + win + ')', 'thousand / day'));
  plot('oc-fee', [L(fb, 'Bitcoin', BA.btc, 'USD'), L(fe, 'Ethereum', BA.eth, 'USD')], lay('Average fee per transaction (' + win + ')', 'USD', { showlegend: false }));
  plot('oc-hr', [L(OC.hr_btc, 'Bitcoin', BA.btc, 'EH/s')], lay('Bitcoin hash rate (computing power securing the chain)', 'EH/s', { showlegend: false }));
  const ann = clean ? [] : [{ x: '2023-09-01', y: Math.log10(0.05), ax: -120, ay: -10, text: 'recording error<br>27 Aug - 6 Sep 2023', font: { color: BA.red, size: 10 }, arrowcolor: BA.red, showarrow: true }];
  plot('oc-val', [L(mcb, 'Bitcoin', BA.btc, 'USD bn'), L(OC.mc_eth, 'Ethereum', BA.eth, 'USD bn')],
    lay('Market capitalisation (' + (clean ? 'recording error removed' : 'raw series') + ')', 'USD bn', { showlegend: false, annotations: ann }));
  const pk = a => { let k = -1; a.forEach((v, j) => { if (v !== null && (k < 0 || v > a[k])) k = j; }); return k; };
  const kb = pk(fb), ke = pk(fe), [tb] = lastValid(txb), [te] = lastValid(txe), [lb] = lastValid(fb), [le] = lastValid(fe);
  out('oc-out', [T.oc1(win, gnum(tb), gnum(te), nf(te / tb, 1)),
    T.oc2(nf(fb[kb], 2), longDate(OC_D[kb]), nf(fe[ke], 2), longDate(OC_D[ke]), nf(lb, 2), nf(le, 2))]);
}

// ================================================================= 3.3 does value follow activity?
const VA = D.va;
function valueActivity() {
  const e = +$('va-e').value, n = e + 1;
  $('va-e-v').textContent = longMonth(VA.dates[e]);
  const x = VA.tx.slice(0, n).map(Math.log10), y = VA.mc.slice(0, n).map(Math.log10), f = ols(x, y), yr = VA.dates.map(d => +d.slice(0, 4));
  const xs = [Math.min(...x), Math.max(...x)];
  plot('va-chart', [
    { x: VA.tx.slice(0, n).map(v => v / 1e3), y: VA.mc.slice(0, n).map(v => v / 1e9), mode: 'markers', name: 'Months in the sample', customdata: VA.dates.slice(0, n),
      marker: { size: 7, color: yr.slice(0, n), cmin: 2014, cmax: 2025, colorscale: 'Viridis', colorbar: { title: { text: 'year', side: 'right' }, thickness: 12 } },
      hovertemplate: '%{customdata}: %{x:,.0f} thousand tx a day, %{y:,.0f} USD bn<extra></extra>' },
    { x: xs.map(v => 10 ** v / 1e3), y: xs.map(v => 10 ** (f.a + f.b * v) / 1e9), mode: 'lines', name: 'Least-squares line, slope ' + nf(f.b, 2), line: { color: BA.red, width: 2, dash: 'dash' }, hoverinfo: 'skip' }],
    layout({ title: ttl('Bitcoin, monthly means, ' + shortMonth(VA.dates[0]) + ' – ' + shortMonth(VA.dates[e])), xaxis: AX('Bitcoin transactions per day (thousand, monthly mean)', { type: 'log', tickvals: [80, 100, 200, 300, 500, 700] }),
      yaxis: AX('Market value (USD bn)', LOG) }));
  out('va-out', [T.va(n, nf(corr(x, y), 2), nf(f.b, 2))]);
}

// ================================================================= 5.3-5.4 log-linear trends
const TR = D.trend;
function trendFit(y, s, e) {        // ln y = a + g t on months s..e, t in years from month s; Newey-West SE, 12 lags
  const yy = y.slice(s, e + 1).map(Math.log), t = yy.map((_, j) => j / 12), f = ols(t, yy);
  return Object.assign(f, { t, se: nwSE(t, f.e, 12) });
}
function trend() {
  const s = +$('tr-s').value, e = TR.dates.length - 1, x = TR.dates.slice(s).map(d => d + '-15');
  $('tr-s-v').textContent = longMonth(TR.dates[s]);
  const ft = trendFit(TR.tx, s, e), fm = trendFit(TR.mc, s, e), an = f => 100 * (Math.exp(f.b) - 1);
  const tr = [];
  [[TR.tx, ft, BA.btc, 'transactions per day'], [TR.mc, fm, BA.eth, 'market value (USD million)']].forEach(([y, f, c, lab]) => {
    tr.push({ x, y: y.slice(s), mode: 'lines', name: 'Bitcoin ' + lab, line: { color: c, width: 1.5 }, hovertemplate: lab + ' %{x|%b %Y}: %{y:,.0f}<extra></extra>' });
    tr.push({ x, y: f.t.map(t => Math.exp(f.a + f.b * t)), mode: 'lines', name: 'trend: growth ' + nf(an(f), 1) + '% a year', line: { color: c, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' });
  });
  plot('tr-chart', tr, layout({ title: ttl('Bitcoin, monthly means, from ' + shortMonth(TR.dates[s])), xaxis: AX('', { type: 'date', range: [TR.dates[0] + '-01', '2025-11-15'] }),
    yaxis: AX('Level (log scale)', LOG) }));
  out('tr-out', [T.tr0(e - s + 1, shortMonth(TR.dates[s]), shortMonth(TR.dates[e])),
    T.tr('Transactions per day', nf(ft.b, 3), nf(ft.se, 3), nf(ft.r2, 2), nf(an(ft), 1)), T.tr('Market value', nf(fm.b, 3), nf(fm.se, 3), nf(fm.r2, 2), nf(an(fm), 1))]);
}

// ================================================================= 5.5 out of sample: the trend one year later
const OS = D.oos, OS_ALL = TR.mc.map(v => v / 1e3).concat(OS.real), OS_D = TR.dates.concat(OS.dates);      // USD bn: on-chain monthly means, then reconstructed
function oosAt(o) {                 // trend fitted on months 0..o, forecast for the next 12 months
  const f = trendFit(TR.mc, 0, o), n = o + 1, sres = Math.sqrt(sum(f.e.map(v => v * v)) / (n - 2));
  const rows = [];
  for (let h = 1; h <= 12 && o + h < OS_ALL.length; h++) {
    const p = Math.exp(f.a + f.b * (o + h) / 12) / 1e3;
    rows.push({ d: OS_D[o + h], p, lo: p * Math.exp(-1.96 * sres), hi: p * Math.exp(1.96 * sres), r: OS_ALL[o + h] });
  }
  return { f, sres, rows };
}
function oos() {
  const o = +$('os-o').value, R = oosAt(o), rows = R.rows, f = R.f;
  $('os-o-v').textContent = longMonth(OS_D[o]);
  const x0 = OS_D.slice(0, o + 1).map(d => d + '-15'), xf = rows.map(r => r.d + '-15');
  const realLab = o === TR.dates.length - 1 ? 'reconstructed (EODHD price x approx. supply); Oct 2026 = 1-23 Oct' : 'realised: monthly mean (on-chain series; reconstructed after Oct 2025)';
  plot('os-chart', [
    { x: x0, y: OS_ALL.slice(0, o + 1), mode: 'lines', name: 'Bitcoin market value, monthly mean (estimation sample, to ' + shortMonth(OS_D[o]) + ')', line: { color: BA.btc, width: 1.5 }, hovertemplate: '%{x|%b %Y}: %{y:,.0f} USD bn<extra></extra>' },
    { x: x0, y: f.t.map(t => Math.exp(f.a + f.b * t) / 1e3), mode: 'lines', name: 'fitted log-linear trend', line: { color: BA.blue, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' },
    { x: xf, y: rows.map(r => r.hi), mode: 'lines', line: { width: 0 }, showlegend: false, hoverinfo: 'skip' },
    { x: xf, y: rows.map(r => r.lo), mode: 'lines', line: { width: 0 }, fill: 'tonexty', fillcolor: 'rgba(26,58,110,0.15)', name: 'naive 95% band (iid residuals)', hoverinfo: 'skip' },
    { x: xf, y: rows.map(r => r.p), mode: 'lines', name: 'trend forecast, ' + shortMonth(rows[0].d) + ' - ' + shortMonth(rows[rows.length - 1].d), line: { color: BA.blue, width: 1.8 },
      customdata: rows.map(r => [r.lo, r.hi]), hovertemplate: 'forecast %{x|%b %Y}: %{y:,.0f} USD bn (band %{customdata[0]:,.0f} – %{customdata[1]:,.0f})<extra></extra>' },
    { x: xf, y: rows.map(r => r.r), mode: 'lines+markers', name: realLab, line: { color: BA.red, width: 1.4 }, marker: { size: 5 }, hovertemplate: 'realised %{x|%b %Y}: %{y:,.0f} USD bn<extra></extra>' }],
    layout({ title: ttl('Bitcoin market value: trend estimated to ' + shortMonth(OS_D[o]) + ', forecast for the next 12 months'),
      legend: { orientation: 'h', x: 0, xanchor: 'left', y: -0.2, yanchor: 'top', traceorder: 'normal', bgcolor: 'rgba(0,0,0,0)', font: { size: 11 } },
      xaxis: AX('', { type: 'date', range: [(o > 72 ? '2019-01-01' : OS_D[Math.max(0, o - 36)] + '-01'), OS_D[o + rows.length] + '-28'] }), yaxis: AX('USD bn (log scale)', LOG) }));
  const L = rows[rows.length - 1], below = rows.filter(r => r.r < r.lo).length, above = rows.filter(r => r.r > r.hi).length;
  out('os-out', [T.os1(nf(100 * (Math.exp(f.b) - 1), 1), nf(R.sres, 3)),
    T.os2(longMonth(L.d), gnum(L.p), gnum(L.r), nf(L.r / L.p, 2), gnum(L.lo), gnum(L.hi)), T.os3(below, above, rows.length)]);
}

// ================================================================= wiring
function init() {
  const on = (ids, f) => ids.forEach(id => $(id).addEventListener('input', f));
  const players = {}, P = (btn, id, vals, ms) => (players[btn] = new Player(btn, $(id), vals, ms));
  tall('mv-chart', 440);
  $('mv-t').max = NC - 1; $('mv-t').value = NC - 1; on(['mv-t'], marketValue); P('mv-play', 'mv-t', range(0, NC - 1, 30).concat([NC - 1]), 90);
  on(['cx-k'], crix); P('cx-play', 'cx-k', [1, 2, 3, 4], 1100);
  $('ss-t').max = ST_D.length - 1; $('ss-t').value = ST_D.length - 1; on(['ss-t'], stableSupply); P('ss-play', 'ss-t', range(0, ST_D.length - 1, 30).concat([ST_D.length - 1]), 90);
  $('sc-t').max = CC_D.length - 1; $('sc-t').value = CC_D.length - 1; on(['sc-t'], concentration); P('sc-play', 'sc-t', range(0, CC_D.length - 1, 30).concat([CC_D.length - 1]), 90);
  $('df-b').max = DF.mdates.length - 2; $('df-b').value = 0; on(['df-b'], defi); P('df-play', 'df-b', range(0, DF.mdates.length - 2, 1), 160);
  $('et-b').max = EF.dates.length - 41; $('et-b').value = 0; on(['et-b'], etf); P('et-play', 'et-b', range(0, EF.dates.length - 41, 10), 150);
  on(['oc-w', 'oc-mc'], onchain); P('oc-play', 'oc-w', [1, 2, 3, 5, 7, 10, 14, 21, 30, 45, 60, 75, 90], 700);
  tall('oc-tx', 300); tall('oc-fee', 300); tall('oc-hr', 300); tall('oc-val', 300);
  $('va-e').max = VA.dates.length - 1; $('va-e').value = VA.dates.length - 1; on(['va-e'], valueActivity); P('va-play', 'va-e', range(23, VA.dates.length - 1, 3), 220);
  $('tr-s').max = TR.dates.length - 37; $('tr-s').value = 0; on(['tr-s'], trend); P('tr-play', 'tr-s', range(0, TR.dates.length - 37, 3), 220);
  $('os-o').max = TR.dates.length - 1; $('os-o').value = TR.dates.length - 1; on(['os-o'], oos); P('os-play', 'os-o', range(35, TR.dates.length - 1, 3).concat([TR.dates.length - 1]), 260);
  const PFX = { 'market-value': 'mv', 'crix': 'cx', 'stablecoin-supply': 'ss', 'stablecoin-issuers': 'sc', 'defi-tvl': 'df', 'spot-etf': 'et',
    'four-views': 'oc', 'value-activity': 'va', 'trend': 'tr', 'out-of-sample': 'os' };
  const VEIL_CHART = new Set(T.veilCharts || []);
  if (T.predict && predict) Object.entries(T.predict).forEach(([b, sp]) => predict(b, Object.assign({ player: players[PFX[b] + '-play'], veil: { out: true, charts: VEIL_CHART.has(b) } }, sp)));
  if (T.ticket && exitTicket) exitTicket(T.ticket);
  marketValue(); crix(); stableSupply(); concentration(); defi(); etf(); onchain(); valueActivity(); trend(); oos();
}
window.L1 = { crixAll, growth, trendFit, nwSE, oosAt, rollMean, ols, corr, days };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
