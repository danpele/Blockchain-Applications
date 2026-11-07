// Readouts of the Lecture 4 interactive page, written by Slides/interactive_src/build_interactive_l4.py.
window.L4_TEXT = {
 cl0: (n, b) => `Bitcoin daily log returns, 1 January 2018 – 18 September 2026: n = ${n}; 5% band under independence ±${b}.`,
 cl1: (a, b, lo, hi, c, mx) => `Lags 1–30 outside the band: returns ${a}; absolute returns ${b} (autocorrelations ${lo} to ${hi}); squared returns ${c} (largest ${mx}).`,
 cl2: m => `Largest daily loss: ${m}% (12 March 2020).`,
 cl3: (k, c) => `${k} return${k === 1 ? '' : 's'} beyond ±${c}% set to ±${c}%, among them the −46.5% of 12 March 2020.`,
 ew1: (l, y, d30, s, m) => `λ = ${l}: weight ${y}% on yesterday, ${d30}% on day 30; the last 30 days carry ${s}% of the weight; effective memory 1/(1 − λ) = ${m} days.`,
 ew2: (d, r0, r1, e0, e1) => `On ${d} the crash of 12 March 2020 leaves the 30-day window: the equal-weight volatility goes from ${r0}% to ${r1}% a year, the EWMA from ${e0}% to ${e1}%.`,
 tl1: (n, nu) => `Bitcoin standardised residuals of GARCH(1,1)-t, 2018 – 18 September 2026: n = ${n}; Student-t with ν = ${nu}, both densities with variance 1.`,
 tl2: (c, o, en, et) => `|ẑ<sub>t</sub>| > ${c}: ${o} day${o === 1 ? '' : 's'} observed; expected ${en} under the Normal, ${et} under the Student-t.`,
 tl3: (z, d) => `Lowest ẑ<sub>t</sub>: ${z} (${d}).`,
 cv1: (a, al, be, x, d, l, m) => `${a} (α = ${al}, β = ${be}): peak ${x}% (${d}); 18 September 2026 ${l}%; median ${m}% a year.`,
 ts1: (a, p, hl, h, v, v250) => `${a}: persistence ${p}, half-life ${hl} days; forecast variance / long run ${v} at h = ${h}, ${v250} at h = 250.`,
 ts2: (om, v1, h, vh, v250, ew) => `Bitcoin GARCH-t (ω = ${om}): ${v1}% a year at h = 1, ${vh}% at h = ${h}, ${v250}% at h = 250; EWMA flat at ${ew}%.`,
 dv1: (nu, vt, vn, et, en) => `ν = ${nu}: VaR 1% ${vt}% under the Student-t against ${vn}% under the Normal with the same σ; ES 2.5% ${et}% against ${en}%.`,
 dv2: p => `Under the Student-t, a loss beyond the Normal VaR 1% has probability ${p}%, not 1%.`,
 dv3: p => `The two VaR curves cross at p = ${p}%: for smaller p the Student-t VaR is the larger one.`,
 dv4: 'The two VaR curves do not cross between p = 0.001% and 49%.',
 vm1: (m, p, v, q, e, r, u) => `${m}: VaR ${p}% ${v}%, ES ${q}% ${e}% (ES / VaR ${r}); VaR per 1 million USD ${u} USD.`,
 vm2: (p, r) => `Largest / smallest VaR ${p}% across the four methods: ${r}.`,
 btn: (n, e) => `${n} out-of-sample days, 1 January 2020 – 18 September 2026; expected hits at 1%: ${e}.`,
 bt0: (a, b, s) => `Hits in the 250 days ${a} – ${b} (Basel zone): ${s}.`,
 bt1: (m, x, r, lu, pu, li, pi, am) => `${m}, whole period: ${x} hits (${r}%); LR<sub>uc</sub> ${lu} (p ${pu}), LR<sub>ind</sub> ${li} (p ${pi}); amber or red zone on ${am}% of the 250-day windows.`,
 ov0: (d, e) => `First ${d} days of the window; expected hits of a correct VaR 1%: ${e}.`,
 ov1: (m, v, c, h) => `${m}: mean VaR ${v}%, mean capital ${c} USD per 1 million USD, ${h} hit${h === 1 ? '' : 's'}.`,
 ov2: (d, p1, p2, lr, p) => `Probability of no hit in ${d} days: ${p1} for a correct 1% VaR, ${p2} for a true hit rate of 2%; LR<sub>uc</sub> for no hit ${lr} (p ${p}).`,
 ov3: (d, r, f) => `Worst day so far: ${d}, ${r}%, ${f} of that day's GARCH-t VaR.`
};
window.L4_TEXT.predict = {"clustering": {"key": 2, "opts": ["8, as before: capping one day out of 3,183 changes almost nothing.", "Fewer than 8: without the crash day the evidence of clustering goes.", "Many more, 26: the crash day inflates the denominator of every lag."]}, "ewma-weights": {"key": 0, "opts": ["It falls, to 26% at λ = 0.99: the weight spreads over a longer past.", "It rises: a higher λ puts more of the weight on the most recent days.", "It stays at 84%: λ changes the shape of the weights, not this share."]}, "tails": {"key": 0, "opts": ["About 5.7, almost twice the 3 observed: beyond 6 the fitted t is too heavy.", "About 3, as observed: the fitted Student-t matches the tail at every c.", "Well below 1, like the Normal: beyond 6 both expect almost nothing."]}, "conditional-volatility": {"key": 1, "opts": ["It stays near 253%: the persistence α + β, and so the path, is unchanged.", "It rises, to about 390%: a larger α reacts more to the crash day.", "It falls: a smaller β forgets the past faster, so the peak is lower."]}, "term-structure": {"key": 0, "opts": ["It stays at 36.1 days: the gap shrinks by 0.981 a day at any size.", "It grows: a larger shock needs more days before it dies out.", "It shrinks: the variance falls faster when far above the long run."]}, "density-var": {"key": 1, "opts": ["It keeps rising: heavier tails always mean a larger VaR 1%.", "It falls, and drops below the Normal's 6.37% once ν < 2.44.", "It stays near 7.2%: with σ fixed, ν changes only the far tail."]}, "var-methods": {"key": 1, "opts": ["The Normal, still: its σ comes from the whole 2018–2026 sample.", "GARCH-t, by far: about 15.9% against 10.3%, from the heavy t tail.", "About equal: deep in the tail all methods reach the worst day."]}, "violations": {"key": 1, "opts": ["Yes: a model that passes all three full-period tests stays green.", "No: it is amber in about a quarter of the windows, never red.", "No: it reaches the red zone (10 hits or more) during 2022."]}, "oos-var": {"key": 0, "opts": ["About 0.49: almost as likely as for a correct 1% VaR (0.70).", "About 0.30, that is 1 − 0.70, the complement of the correct case.", "Close to 0: a VaR twice too low would have shown several hits."]}};
window.L4_TEXT.veilCharts = [];
