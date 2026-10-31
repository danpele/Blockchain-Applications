// Readouts of the Lecture 7 interactive page, written by Slides/interactive_src/build_interactive_l7.py.
window.L7_TEXT = {
 oa0: (p, b) => `Test days ${p}: Bitcoin rose on ${b}% of them (accuracy of "always up").`,
 oa: (m, i, o, g) => `${m}: in-sample accuracy ${i}%, out-of-sample ${o}% (gap ${g} percentage points).`,
 eq: (m, sr, dd, dl, l, t) => `${m}: Sharpe ratio ${sr}; maximum drawdown ${dd}% (${dl} log points); long ${l}% of the days; ${t} changes of position a year.`,
 sn1: (r, si, bi, so, bo, k, n) => `Best rule in 2018–2022: ${r}, Sharpe ratio ${si} (buy-and-hold ${bi}). In 2023–2026: ${so} (buy-and-hold ${bo}), rank ${k} of ${n}.`,
 sn2: (m, q, p, rc) => `Permuted returns: best of 810 rules ${m} on average, ${q} at the 95th percentile, p = ${p} for the winner; reality check (stationary bootstrap) p = ${rc}.`,
 sn3: (n, s0, psr, d) => `N = ${n}: expected best Sharpe ratio by chance SR₀ = ${s0} (annualised); PSR against zero ${psr}; deflated Sharpe ratio DSR = PSR(SR₀) = ${d}.`,
 sn4: (s, b) => `Rank correlation of the Sharpe ratios in 2018–2022 and 2023–2026: ${s}; ${b}% of the rules beat buy-and-hold in 2023–2026.`,
 vm0: (a, b, n, e, l) => `${a} – ${b}: ${n} days, ${e} breaches expected at VaR ${l}%.`,
 vm: (m, b, n, kp, cp, q, dm) => `${m}: breach rate ${b}% (${n} breaches), Kupiec p ${kp}, Christoffersen p ${cp}; mean QS ${q}` + (dm ? `, DM p against GARCH-t ${dm}.` : ' (benchmark of the DM tests).'),
 vm1: (near, low) => `Closest to the target: ${near}. Lowest mean QS: ${low}.`,
 vp0: (d1, d2, r2, d1b, r1, v) => ` Inputs to the close of ${d1}: return ${r2}% on ${d2}, ${r1}% on ${d1b}; volume change ${v}% on ${d1b}.`,
 vp1: (d, r, inp) => `${d}: Bitcoin return ${r}%.${inp}`,
 vp2: v => `VaR 1% for this day: ${v}.`,
 vp3: (m, n, e, pre, ep, post, epo) => `Breaches of the ${m} 1% quantile: ${n} in the test period (${e} expected); ${pre} before the Chronos-2 release (${ep} expected), ${post} after it (${epo} expected).`
};
window.L7_TEXT.predict = {"overfitting": {"key": 1, "opts": ["At about half of them: in-sample and out-of-sample accuracy differ only by noise.", "At none of them: in-sample it fits 74–85% of days, out of sample at most 67%.", "At most of them: each refit adds data, so the model does better on the new days."]}, "trading": {"key": 2, "opts": ["Buy-and-hold: it is invested every day, so the costs hit it on every day.", "The random forest: it has the highest Sharpe ratio before costs, so it has the most to lose.", "XGBoost: it changes position most often, about 125 times a year, against 70–81."]}, "snooping": {"key": 0, "opts": ["Only for N = 2: at N = 5 the benchmark SR₀ is 0.22 and the DSR is 0.92.", "Up to about N = 100: the PSR against zero is 0.97, and a few trials hardly matter.", "For no N at all: out of sample the winner has a lower Sharpe ratio than buy-and-hold."]}, "var-models": {"key": 1, "opts": ["The breach-rate ranking: a count of breaches is simple and settles within a few months.", "The QS ranking: GARCH-t has the lowest mean QS at every month end from May 2024.", "Neither: both rankings are computed on the same days, so they are equally stable."]}, "var-paths": {"key": 0, "opts": ["About 8%: the jump lasts one day, since a tree forecast has no memory.", "Still near 35%: risk forecasts decay slowly after a shock, as in GARCH.", "About 20%: the forecast decays smoothly, halving within a few days."]}};
window.L7_TEXT.veilCharts = ["var-paths"];
