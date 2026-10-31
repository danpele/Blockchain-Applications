// Readouts of the Lecture 5 interactive page, written by Slides/interactive_src/build_interactive_l5.py.
window.L5_TEXT = {
 pq1: (e, s) => `Median |d| (bp), 1 January 2020 – ${e}: ${s}.`,
 pq2: s => `Share of days with d ≤ −100 bp (%): ${s}.`,
 pq3: (u, s) => `95% quantile of |d|: USDC ${u} bp, sUSD ${s} bp.`,
 su1: (c, n, N) => `Since 1 January 2025: close below ${c} USD on ${n} of ${N} days.`,
 su2: (c, f, s) => `From 1 September 2025: first close below ${c} USD on ${f}; below ${c} USD without interruption from ${s}.`,
 su3: (d, p) => `Close on ${d}: ${p} USD.`,
 cl1: (t, n) => `τ = ${t}; n τ = ${n} with n = 20 observations.`,
 cl2: (t, q, m) => `Unique minimiser for τ = ${t}: q = ${q} bp, total loss ${m}.`,
 cl3: (t, a, b, m) => `For τ = ${t} the total loss is flat from ${a} to ${b} bp: every q in this interval is a minimiser, total loss ${m}.`,
 cl4: (a, b, m) => `τ = 0.5: minimisers from ${a} to ${b} bp (median ${a} bp), total loss ${m}.`,
 lp1: (l, s, a, p, g) => `λ<sub>max</sub> = ${l}; GACV selects λ̂ = ${s} with ${a} of ${p} predictors active (GACV ${g}).`,
 lp2: (l, a, g, t, o) => `At λ = ${l}: ${a} active predictors, GACV ${g}; largest slopes ${t}; not selected: ${o}.`,
 dp1: s => `Annual medians of the DPI: ${s}.`,
 dp2: (n, e, b, se, p, lo, hi) => `Trend of ln DPI on ${n} days to ${e}: ${b} a year (HAC(90) standard error ${se}, p = ${p}, 95% interval [${lo}, ${hi}]).`,
 dp3r: () => `A zero slope is rejected at 5% in this sample.`,
 dp3n: () => `A zero slope is not rejected at 5% in this sample.`,
 ev0: h => `Change of the mean DPI over days 0..${h} against days −60..−8; Holm-adjusted p-values of HAC(30) t-tests on ln DPI, six events. The paper's values are for days 0..30.`,
 ev: (n, c, p, w) => `${n}: own ${c}% (Holm p ${p}); narrow λ grid ${w}%.`,
 lk1: (s, a, i, m) => `${s}: aligned ${a}%, inverse ${i}% of the coin coefficients; market variables ${m}% of the absolute slope weight.`,
 lk2: (t, i) => `Most often aligned (target ← predictor, pp): ${t}; most often inverse: ${i}.`,
 ac1: (g, a, b) => `${g} groups: ${a} active predictors on average in the lowest DPI group, ${b} in the highest.`,
 ac2y: () => `The mean falls from each group to the next.`,
 ac2n: () => `The mean does not fall at every step from one group to the next.`,
 ac3: r => `Spearman correlation of the daily DPI with the mean active set: ${r}.`
};
window.L5_TEXT.predict = {"peg-quality": {"key": 1, "opts": ["It barely moves: 145 added days cannot shift a quantile of 2,343.", "It roughly doubles, to about 3,900 bp, while the median moves little.", "It rises in proportion to the median, by about 10%."]}, "susd": {"key": 2, "opts": ["From 24 November 2025, when it first fell below 0.95 USD.", "Never for good: arbitrage brought it back above 0.50 USD each time.", "From 20 August 2026, about nine months after it fell below 0.95 USD."]}, "check-loss": {"key": 0, "opts": ["Every q from −35 to −12 bp: 20 × 0.10 = 2 is an integer.", "Only q = −35 bp, the second smallest observation.", "Every q from −120 to −35 bp, the same interval as for τ = 0.05."]}, "lasso-path": {"key": 1, "opts": ["Yes: a smaller penalty can only add predictors, never remove them.", "No: it falls from 2 to 1 and from 12 to 11 on the way down.", "No: it falls steadily, from 13 at the largest λ to 0 at the smallest λ."]}, "dpi": {"key": 0, "opts": ["Yes: +0.088 a year, p = 0.01; the low 2026 values remove it.", "No: the p-value of 0.21 holds for every end of the sample.", "No: with fewer days the HAC standard error must be larger."]}, "events": {"key": 2, "opts": ["The same three as for 30 days: KuCoin, China sell-off and Terra.", "FTX and SVB, the two events that the paper finds significant.", "KuCoin, Terra and the Iran–Hormuz shock, with a fall of 35%."]}, "links": {"key": 0, "opts": ["In 1 of the 7 years, 2023, the year of the SVB weekend.", "In all 7: the strongest link over all days leads in each year.", "In 4 of the 7: it leads in every year after the 2022 Terra collapse."]}, "active": {"key": 0, "opts": ["It widens: 11.06 against 9.51, falling at every step.", "It stays at 1.28: grouping the days does not change the data.", "It narrows: smaller groups are noisier and average out."]}};
window.L5_TEXT.veilCharts = ["peg-quality", "susd", "lasso-path", "dpi", "events", "links", "active"];
