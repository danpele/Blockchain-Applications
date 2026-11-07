// Readouts of the Lecture 3 interactive page, written by Slides/interactive_src/build_interactive_l3.py.
window.L3_TEXT = {
 sv1: (n, d, l, e, c) => `Ex ante, the top ${n} of ${d}: ${l}; 100 USD became ${e} USD, CAGR ${c}%.`,
 sv2: (n, d, l, e, c) => `Ex post, the top ${n} of ${d}: ${l}; 100 USD became ${e} USD, CAGR ${c}%.`,
 sv3: (g, k, n) => `Gap: ${g} percentage points a year; ${k} of the ${n} coins are in both baskets.`,
 ar1: (d, n, l, x, t) => `Reselection of ${d}: ${n} coins pass the liquidity rule (${l}); excluded: ${x}; ADTV threshold ${t} million USD a day.`,
 ar2: (e, f, c, m) => `Chosen k: first rise of the AIC ${e} (${m}), global minimum ${f}, CTDC-type rule ${c}.`,
 ar3: (a, b) => `Fall of the AIC from k = 1 to 2: ${a} points; from the last but one to the last k: ${b}.`,
 rp1: (n, c, te) => `Daily log returns against CRIX, ${n} common days: correlation ${c}, tracking error ${te}% a year.`,
 rp2: (m, lo, hi, c, r) => `Constituents: on average ${m} (from ${lo} to ${hi}); on 30 October 2026 CRIX ${c}, replica ${r} (both 1000 on 31 March 2018).`,
 rp3: (d, w, b) => `Weights at the last rebalancing (${d}): ${w}; Bitcoin ${b}%.`,
 cp1: (a, d0, d1, g, v, m, p, t) => `${a}, ${d0} – ${d1}: CAGR ${g}%, volatility ${v}% a year, maximum drawdown ${m}% (${p} to ${t}).`,
 cp2: () => `Before 16 March 2018 CRIX comes from a different data source and is shifted by one day against Bitcoin.`,
 cp3: n => `CRIX: ${n} daily log returns between consecutive days (returns over missing days are not used).`,
 dd1: (t, c, b) => `Days more than ${t}% below the record: CRIX ${c}% (6 Sep 2017 – 6 Nov 2026), Bitcoin ${b}% (to 31 Oct 2026).`,
 dd2: (t, n, l) => `CRIX falls deeper than ${t}%: ${n}. ${l}.`,
 vr1: (w, l, n, c) => `VCRIX against the ${w}-day realised volatility of day t − ${l}, ${n} days to 13 May 2026: correlation ${c}.`,
 vr2: (a, b, w, x) => `Least squares: VCRIX ≈ ${a} + ${b} × RV(${w}); a realised volatility of 50% corresponds to a VCRIX of about ${x}.`,
 vr3: () => `Shaded: the CRIX gap of 14 May – 7 June 2026 and the 30 days after it, excluded from the statistics.`,
 vl1: (n, c) => `${n} days, 16 March 2018 – 13 May 2026: correlation of the change of ln VCRIX with the previous day's CRIX return ${c}.`,
 vl2: (t, a, ma, b, mb, c, mc) => `After a fall of more than ${t}%: ${a} days, mean change ${ma}%; after a rise of more than ${t}%: ${b} days, ${mb}%; other days: ${c}, ${mc}%.`,
 gv1: (k, g, r) => `Shift k = ${k}: correlation of VCRIX with the GARCH volatility ${g}, with the 30-day realised volatility ${r}.`,
 gv2: (a, b, p, h) => `GARCH(1,1)-t of the slides: α = ${a}, β = ${b}; persistence α + β = ${p}, half-life of a variance shock about ${h} days.`,
 et1: (c, d0, d1, n, s, te) => `IBIT against Bitcoin at ${c}, ${d0} – ${d1}, ${n} trading days: sd of the daily difference ${s} points, tracking error ${te}% a year.`,
 et2: (td, ch) => `Tracking difference: trend ${td}% a year; IBIT per Bitcoin changed by ${ch}% over the period.`
};
window.L3_TEXT.predict = {"survivorship": {"key": 2, "opts": ["Small, about 1 point a year: over a short period selection matters little.", "Negative: the ex-ante basket wins, because recent winners tend to fall back.", "Huge, over 100 points a year: the ex-post list is made of the recent winners."]}, "aic-rule": {"key": 1, "opts": ["Never: the AIC always asks for at least five coins.", "In about a quarter of the quarters (9 of 35).", "In almost every quarter: Bitcoin and Ethereum are enough."]}, "replica": {"key": 0, "opts": ["3 to 7 coins are all close (about 9% a year); Bitcoin alone is much worse.", "Only the AIC rule works; any fixed number of coins tracks much worse.", "Bitcoin alone: it holds most of the market, so it tracks best."]}, "crix-path": {"key": 1, "opts": ["Yes: a broad index diversifies and so grows faster with less risk.", "No: lower CAGR than Bitcoin, with about the same volatility.", "Yes in return, but with much higher volatility."]}, "drawdowns": {"key": 0, "opts": ["About 17% for CRIX and 10% for Bitcoin.", "About 40% for both: the curves almost coincide.", "None: neither fell more than 70%."]}, "vcrix": {"key": 1, "opts": ["The shortest window: VCRIX reacts to every day.", "About 30 days: the window of the VCRIX construction.", "The longest window: VCRIX is a smooth long-run measure."]}, "vcrix-returns": {"key": 2, "opts": ["It rises after falls and falls after rises.", "Nothing systematic: VCRIX does not react to daily returns.", "It rises after both, by about 20%, a little more after falls."]}, "garch-vcrix": {"key": 0, "opts": ["At k = −1: VCRIX matches the realised volatility of the previous day.", "At k = +5: VCRIX anticipates the volatility of the next week.", "The shift does not matter: the correlation is the same at every k."]}, "etf-tracking": {"key": 1, "opts": ["Both rise: in 2025–2026 the fund tracked Bitcoin worse.", "With synchronous prices the TE falls to about 2%; the TD stays near the fee.", "The TE is about 16% with both clocks: the clock does not matter."]}};
window.L3_TEXT.veilCharts = [];
