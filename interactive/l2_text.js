// Readouts of the Lecture 2 interactive page, written by Slides/interactive_src/build_interactive_l2.py.
window.L2_TEXT = {
 cm0: L => `Days of 2018–2026 sorted into quintiles by the absolute return ${L} day${L > 1 ? 's' : ''} earlier; bars: mean absolute return today.`,
 cm1: (a, v, r, m) => `${a}: ${v} % a day from the calmest to the most turbulent quintile; most turbulent / calmest = ${r}; all days ${m}%.`,
 vp0: (q, k, n, c, m) => `q = ${q}: ${k} of 9 bars beyond ±1.96. Horizons 2 to ${q}: ${c} of ${n} tests reject at 5% (about ${m} expected by chance).`,
 vp1: (a, v, z) => `${a}: VR = ${v}; Z* = ${z} (2014–2017, 2018–2021, 2022–2026).`,
 nf1: (a, n, s, k, jb) => `${a}, 1 January 2018 – 18 September 2026: ${n} daily log returns; skewness ${s}, excess kurtosis ${k}; Jarque–Bera ${jb} (5% critical value 5.99).`,
 nf2: (k, p) => `Normal distribution: P(|z| > ${k}) = ${p}.`,
 nf3: (a, o, e) => `${a}: ${o} day${o === 1 ? '' : 's'} beyond the threshold, against ${e} expected under the Normal distribution.`,
 rv1: (a, m, x, d, l) => `${a}: median ${m}%, maximum ${x}% (${d}), last ${l}% a year.`,
 rv2: (s, n) => `Bitcoin volatility below that of the S&P 500 on ${s}% of ${n} common days.`,
 vc0: (n, b) => `Bitcoin daily log returns, 18 September 2014 – 18 September 2026: n = ${n}; 95% band of pure noise ±${b}.`,
 vc1: (m, q1, p1, q2, p2, c) => `Ljung–Box Q(${m}): ${q1} (p-value ${p1}) for returns, ${q2} (p-value ${p2}) for squared returns; 5% critical value of χ²(${m}) ${c}.`,
 vc2: (a, b) => `Of lags 1–30: ${a} autocorrelations of returns outside the band, ${b} of squared returns above it.`,
 bc0: (n, a, b) => `Bitcoin and S&P 500, ${n} common days: correlation ${a} before 2020, ${b} from 2020.`,
 bc1: (l, x, d, z, m) => `${l}: highest rolling correlation ${x} (${d}), last ${z}, lowest ${m}.`,
 ef0: (q, v, z) => `Bitcoin, whole sample 2014–2026: VR(${q}) = ${v}, Z*(${q}) = ${z}.`,
 ef1: (a, n, r, s, lo, hi) => `${a}: ${n} windows; ${r} reject VR = 1 at 5% (${s}%); Z* from ${lo} to ${hi}.`,
 dd0: (d, g) => `A loss of ${d}% needs a gain of ${g}% to recover.`,
 dd1: (a, x, d, s) => `${a}: maximum drawdown ${x}% (${d}); ${s}% of the days more than the threshold below the record.`,
 lp0: (e, n, m, om, tc, r2) => `Estimate on 1 January – ${e} (n = ${n}): m = ${m}, ω = ${om}, t<sub>c</sub> = ${tc}, R² = ${r2}.`,
 lp1: (tc, d, r2) => `With t<sub>c</sub> = ${tc} (${d} days after the window end) and the same m and ω: R² = ${r2}.`,
 lp2: (b, cb, ok) => `Checks: B = ${b}, |C|/|B| = ${cb}; B < 0 and |C|/|B| < 1: ${ok}.`,
 tw1: (e, tc, d, m, om, k, r2) => `Window 1 January – ${e}: estimated t<sub>c</sub> = ${tc} (${d} days after the window end), m = ${m}, ω = ${om}; ${k}; R² = ${r2}.`,
 tw2: (n, b, i, lo, hi) => `${n} windows so far: ${b} at the bounds m = 0.9 and ω = 13, ${i} interior; estimated t<sub>c</sub> from ${lo} to ${hi}.`,
 mf1: (b, x, dx, m, dm, l) => `b = ${b}: ratio of market value to network value at most ${x} (${dx}), at least ${m} (${dm}), last ${l}.`,
 mf2: (a, b, s) => `Ratio above 2 in ${a}% of the months, below 0.5 in ${b}%; standard deviation of the log ratio ${s}.`,
 mf3: (n, b, se) => `Least-squares slope of ln market value on ln transactions, ${n} months: b = ${b} (Newey–West SE ${se}).`
};
window.L2_TEXT.predict = {"calm-follows-calm": {"key": 1, "opts": ["About the same: after a few days the memory of turbulence is gone.", "Still higher, about 1.15 times: turbulence is remembered for weeks.", "Lower: a turbulent month is followed by a calm one, so it reverses."]}, "vr-sub-periods": {"key": 1, "opts": ["Never: a random walk at q = 5 means a random walk at every horizon.", "10 times, about 4%: close to what 5% tests give by chance.", "Often for crypto at long q: crypto prices trend over weeks."]}, "normal-fit": {"key": 1, "opts": ["Bitcoin: it is the more volatile asset, so it has more extreme days.", "The S&P 500: 9 days against 5, in units of its own standard deviation.", "Neither: beyond 5 standard deviations both assets have no days at all."]}, "volatility-time": {"key": 0, "opts": ["It rises, to about 66%: short windows mostly miss the rare large days.", "It stays near 54%: the window changes the smoothness, not the level.", "It falls: a long window averages away the peaks, so the level drops."]}, "volatility-clusters": {"key": 1, "opts": ["For every m from 10 on: once lag 10 enters, Q(m) only grows.", "Only for some m: 10, 11 and 21 to 29; the critical value grows too.", "For every m: squared returns are dependent, so returns are as well."]}, "btc-equities": {"key": 2, "opts": ["About 0.57: the correlation of two assets does not depend on the window.", "Lower, about 0.3: with fewer days the link between the assets is weaker.", "Higher, about 0.8: short windows are noisier, so their extremes are larger."]}, "efficiency-time": {"key": 1, "opts": ["Bitcoin: the most volatile asset has the most predictable returns.", "The S&P 500: about one window in five, all with Z* below −1.96.", "None of them: the daily returns of all three are a random walk."]}, "drawdowns": {"key": 0, "opts": ["About a third of the days: the deep drawdowns lasted for years.", "About 15% of the days: the share falls in proportion to the threshold.", "Almost none: a fall of 50% happens only on a few crash days."]}, "lppl-2017": {"key": 1, "opts": ["It falls sharply away from 25 December: R² of 0.98 fixes the date.", "It barely moves: it stays between 0.96 and 0.98 over the four months.", "It is highest at the actual top, 16 December: the fit locates the peak."]}, "tc-windows": {"key": 2, "opts": ["Yes: each new week of data brings it closer to 16 December.", "It moves earlier by about one week with each window added.", "No: it sits at 1–7 January at the search bounds, then jumps."]}, "metcalfe": {"key": 1, "opts": ["At b = 2: Metcalfe's law gives the network value with the best fit.", "Near b = 3.6, the least-squares slope of ln value on ln transactions.", "At b = 4.5: a steeper network value tracks the fast growth best."]}};
window.L2_TEXT.veilCharts = ["drawdowns", "tc-windows"];
