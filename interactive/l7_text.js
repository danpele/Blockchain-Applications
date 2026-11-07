// Readouts of the Lecture 7 interactive page, written by Slides/interactive_src/build_interactive_l7.py.
window.L7_TEXT = {
 ms1: (p, n, m, mn, pr) => `${p}, ${n} days: mean pairwise correlation ${m}; lowest ${mn} (${pr}).`,
 ms2: (lo, cl, hi, ch) => `Correlation with BTC: lowest ${lo} (${cl}), highest ${hi} (${ch}).`,
 ms3: (h, b) => `Hub of the MST: ${h}. BTC links to ${b}.`,
 eg1: (p, l1, l2, n) => `${p}: largest eigenvalue λ₁ = ${l1}, second λ₂ = ${l2}; ${n} of the 19 eigenvalues exceed 1.`,
 eg2: (r, b1, b2) => `Mean pairwise correlation ρ̄ = ${r}; equicorrelation benchmark λ₁ = 1 + 18ρ̄ = ${b1}, the other eigenvalues 1 − ρ̄ = ${b2}.`,
 eg3: (a, f, d) => `Absorption ratio λ₁/19 = ${a}; formula (1 + 18ρ̄)/19 = ${f}; difference ${d}.`,
 cb1: (a, b, L, n, e) => `Window [${a}, ${b}], L = ${L} days: ${n} of 26 dates lie outside their 5% band; about ${e} expected by chance.`,
 cb2: s => `Outside the band: ${s}.`,
 cn1: (lo, dl, hi, dh, la, dla) => `Mean pairwise correlation: lowest ${lo} (window ending ${dl}), highest ${hi} (${dh}), ${la} in the last window (${dla}).`,
 cn2: (m, l, n) => `Absorption ratio: ${m} on average over the ${n} windows, ${l} in the last window.`,
 sp1: (w, h, lo, dl, hi, dh, la, dla) => `Rolling VAR(2), ${w}-day windows, H = ${h}: lowest ${lo}% (${dl}), highest ${hi}% (${dh}), ${la}% in the last window (${dla}).`,
 sp2: (p, h, s, c1, n1, c2, n2, c3, n3) => `Full sample, VAR(${p}), H = ${h}: total spillover S = ${s}%; largest net transmitters ${c1} (${n1}) and ${c2} (${n2}), largest net receiver ${c3} (${n3}).`,
 cl1: (a, b, l) => `PC1 explains ${a}% of the variance, PC2 ${b}%. PC1 loadings: ${l}.`,
 cl2: (t, c) => `The group with the S&P 500 holds ${t} of the 14 traditional assets and these coins: ${c}.`,
 cl3: g => `Other groups: ${g}.`,
 ev: (s, a, b, m, t, p, tb, pb, np, ps, big) => `${s}, CAR[${a}, ${b}]: mean ${m}%, t(CS) = ${t} (p ${p}), t(BMP) = ${tb} (p ${pb}); ${np} of 13 positive (sign test p ${ps}); ${big} with |t| > 1.96.`,
 ev2: (m, t, p) => `Implementation minus schedule, paired: mean ${m}%, t = ${t}, p = ${p}.`
};
window.L7_TEXT.predict = {"mst": {"key": 2, "opts": ["Bitcoin: the largest coin is the centre of the tree in every year.", "Ether: the hub of the full sample is also the hub of each year.", "Polkadot: it has the most MST edges in four of the six years."]}, "eigenvalues": {"key": 1, "opts": ["2021: the May 2021 crash made all coins fall together for weeks.", "2022: the Terra and FTX collapses moved the whole market as one.", "2026: spot ETFs made institutional flows drive every coin alike."]}, "car-bands": {"key": 0, "opts": ["Between 2 and 5 in every window: wider bands offset the larger CARs.", "It grows steadily: abnormal returns add up, so more CARs become significant.", "It falls to zero: in long windows the abnormal returns cancel out."]}, "connectedness": {"key": 0, "opts": ["It falls, from 0.90 to 0.75: long windows average crash days with calm days.", "It stays near 0.85: the co-movement of coins does not depend on the window.", "It rises above 0.90: long windows contain more crashes, so more co-movement."]}, "spillovers": {"key": 1, "opts": ["It rises steeply: shocks accumulate over the days, so more of them spill over.", "It hardly changes, from 72.7% to 72.9%: the spillovers are mostly same-day.", "It falls towards zero: at long horizons each coin is driven by its own shocks."]}, "asset-map": {"key": 0, "opts": ["It falls from 8 coins to 4: volatility separates the smaller coins from equities.", "It stays at 4 coins: volatility is one feature of six and cannot change the groups.", "It falls to 0 coins: with volatility in the data, every coin leaves the group."]}, "event-paths": {"key": 2, "opts": ["Yes: abnormal returns accumulate, so the mean CAR grows steadily with the window.", "Yes, downwards: after the upgrade the market sells the news, and the mean turns negative.", "No: the mean stays between −0.3% and +1.5%, with p-values of 0.61 or more."]}};
window.L7_TEXT.veilCharts = [];
