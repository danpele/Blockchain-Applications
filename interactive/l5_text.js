// Readouts of the Lecture 5 interactive page, written by Slides/interactive_src/build_interactive_l5.py.
window.L5_TEXT = {
 su1: (d, t) => `${d}: all USD stablecoins ${t} USD bn.`,
 su2: (f, c, a, o) => `By mechanism: fiat-backed ${f}%, crypto-backed ${c}%, algorithmic ${a}%, other or not in the snapshot ${o}%.`,
 su3: (t, c, b) => `Tether (USDT) ${t}%, USD Coin (USDC) ${c}%; the two issuers together ${b}% of all USD stablecoins.`,
 dd0: (n, a, b, k) => `${n} daily closes, ${a} – ${b}; threshold δ = ${k} bp.`,
 dd: (s, c, l) => `${s}: close beyond ±δ on ${c}% of days; intraday low at or below −δ on ${l}% of days.`,
 ex1: (k, a, b, c) => `Days with |d| ≥ ${k} bp in 2021: USDT ${a}%, USDC ${b}%, DAI ${c}%.`,
 ex2: (k, a, b, c) => `Days with |d| ≥ ${k} bp in 2026 (to 23 October): USDT ${a}%, USDC ${b}%, DAI ${c}%.`,
 ex3: (k, a, b, c) => `Intraday low at or below −${k} bp, 2021–2026: USDT ${a}%, USDC ${b}%, DAI ${c}% of days.`,
 rv1: (w, pos, a, b) => `Window W = ${w} days: the 1% quantile lies at position (W − 1) × 0.01 = ${pos}, between the ${a} and the ${b} lowest close.`,
 rv2: (s, l, m, md, lo, ld) => `${s}: VaR 1% ${l} bp on 23 October 2026; highest ${m} bp (${md}); lowest ${lo} bp (${ld}).`,
 sv1: (h, u, d, t, x) => `${h}: USDC ${u} bp, DAI ${d} bp, USDT ${t} bp against the dollar; USDC priced in USDT ${x} bp.`,
 sv2: (u, h, R, v, g, n) => `Lowest USDC close ${u} bp (${h}). Redemption value with R = ${R}: ${v} bp; the low is ${g} bp from it; USDC is below it in ${n} hours.`,
 sv3: (a, b, c) => `After the low, USDC is first above the redemption value at ${a}, above −100 bp at ${b}, above −15 bp at ${c}.`,
 am1: (A, a, b, c) => `StableSwap, A = ${A}: price of X ${a} when X is 80% of the pool, ${b} at 90%, ${c} at 95%.`,
 am2: (A, a, b, c, p, q) => `Average slippage with A = ${A}: ${a}% for a sale of 1m X, ${b}% for 5m, ${c}% for 9.5m; constant product: ${p}% and ${q}% for 1m and 5m.`,
 ep1: (k, n, a) => `Threshold δ = ${k} bp: ${n} episodes (a breach after 24 observed quiet hours); ambiguous onsets set aside: ${a}.`,
 ep2: (m, o, s, l) => `Duration: median ${m} hours; episodes of one hour: ${o}; of at most 6 hours: ${s}; of more than 24 hours: ${l}.`,
 ep3: (m, x, xd) => `Peak |d<sub>t</sub>|: median ${m} bp; largest ${x} bp (episode starting ${xd}).`,
 ut1: (v, m) => `Credit per event v = (${v}); mean credit ${m}.`,
 ut2: (m, f, u) => `Utility U = ${m} − 0.05 × ${f} = ${u}.`,
 ut3: f => `U falls to zero at ${f} false alerts a month.`,
 pt1: (a, l, s) => `α = ${a}, ${l}: ${s}.`,
 pt2: s => `Number of the six values of α at which each family has the highest U: ${s}.`,
 tf1: (k, d, n, r, lo, hi, l, f, u) => `Test period, rule |d<sub>t</sub>| ≥ ${k} bp: ${d} of ${n} events detected (recall ${r}, Clopper–Pearson 95% interval [${lo}, ${hi}]), median lead ${l}, ${f} false alerts a month, U = ${u}.`,
 tf2: (k, d, n, f, u) => `Validation year 2024, the same rule: ${d} of ${n} events detected, ${f} false alerts a month, U = ${u}.`,
 tf3: k => `Under the budget of 2 false alerts a month on 2024, the rule with the highest U on 2024 is k = ${k} bp.`,
 rc1: (a, s, o) => `USDT against the dollar, mean hourly deviation: ${a} bp in August, ${s} bp in September, ${o} bp in October 2026 (to 23 October).`,
 rc2: (m, x, h, k, n, N) => `USDC priced in USDT, October: mean ${m} bp, maximum ${x} bp (${h}); ${n} of ${N} hours at or above ${k} bp.`,
 rc3: (k, n) => `A rule |d<sub>t</sub>| ≥ ${k} bp with a 24-hour refractory period issues ${n} alert episodes from 1 August to 23 October.`
};
window.L5_TEXT.predict = {"supply": {"key": 1, "opts": ["Under 1%: algorithmic designs were always a small niche.", "About 11%: 21 of the 185 USD bn were algorithmic tokens.", "About 45%: TerraUSD was then the largest stablecoin."]}, "dev-daily": {"key": 0, "opts": ["DAI, beyond 50 bp on about 0.6% of days.", "USDT, the coin most often beyond 15 bp.", "USDC, the coin with the deepest close (−285 bp)."]}, "exceed": {"key": 2, "opts": ["All three: heavy tails mean that large deviations recur every year.", "Only USDT, the one coin that still breaches 15 bp regularly in 2026.", "None: in 2026 no close of the three is 25 bp or more from 1 USD."]}, "rollvar": {"key": 1, "opts": ["About 12 bp, as with 365 days: the window does not move a 1% quantile.", "About 102 bp: with 90 days the 1% quantile sits next to the lowest close.", "About 285 bp: the VaR 1% equals the worst close inside the window."]}, "svb": {"key": 0, "opts": ["8 hours, all on Saturday between 06:00 and 14:00 UTC.", "About 39 hours, until Sunday 22:00 UTC, before the backstop.", "Only 1 hour, the hour of the low at 07:00 UTC on Saturday."]}, "amm": {"key": 2, "opts": ["Near a share of 50%: any imbalance moves the price, as in x·y = k.", "Above 99%: StableSwap holds the price at 1 until the pool is empty.", "Between 90% and 95%: only when the pool is nearly one-sided."]}, "episodes": {"key": 0, "opts": ["5 episodes, median duration 7 hours: a higher δ keeps the longer events.", "5 episodes, median duration 1 hour: breaches are one-hour blips at any δ.", "30 episodes, as at 15 bp: every breach of 25 bp first crosses 15 bp."]}, "utility": {"key": 1, "opts": ["At about 5.5 a month: 0.273 / 0.05 = 5.46.", "At about 8 a month: 0.398 / 0.05 = 7.96.", "At 2 a month: the false-alert budget of the protocol."]}, "paper-t1": {"key": 0, "opts": ["5 of 6: at α = 0.5 the random forest has the higher U.", "6 of 6: the best result of the table is best at every α.", "3 of 6: the 95% intervals of CatBoost and the random forest overlap."]}, "tradeoff": {"key": 1, "opts": ["None of them, at k = 20 bp, the threshold chosen on 2024.", "3 of the 5 events, at k = 13 bp, two above the 11 bp rule.", "All 5 events, at k = 15 bp, the event threshold itself."]}, "recent": {"key": 2, "opts": ["206: one alert for each hour at or above 10 bp in October.", "None: no hour of the cross rate reached the 15 bp level.", "24: about two alert episodes a week since 1 August."]}};
window.L5_TEXT.veilCharts = ["supply", "rollvar", "svb", "amm", "episodes", "paper-t1", "tradeoff"];
