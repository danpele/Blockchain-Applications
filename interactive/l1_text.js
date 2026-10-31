// Readouts of the Lecture 1 interactive page, written by Slides/interactive_src/build_interactive_l1.py.
window.L1_TEXT = {
 mr1: (k, b, y) => k === 0 ? `Subsidy as in the data: 3.125 BTC per block since 20 April 2024.` : `${k} further halving${k > 1 ? 's' : ''}: every subsidy divided by ${2 ** k}; 3.125 BTC becomes ${b} BTC per block (the halving of about ${y}).`,
 mr2: (d, s, f, sh) => `Last 30 days to ${d}: subsidy ${s} and fees ${f} USD million a day; fees ${sh}% of miner revenue.`,
 mr3: (x, d) => `Highest fee share in the sample: ${x}% (30 days to ${d}).`,
 mv1: (d, t, b, s) => `${d}: the five coins are worth ${t} USD bn; Bitcoin ${b} USD bn, ${s}% of the basket.`,
 mv2: (h, n) => `HHI of the basket ${h}; effective number of coins 1/HHI = ${n}.`,
 mv3: (p, d) => `Peak of the five coins: ${p} USD bn on ${d}.`,
 cx1: (y, g, v) => `Cap-weighted, all 5 selected coins, over ${y} years: compound annual growth rate ${g}, volatility of daily log returns ${v} a year.`,
 cx2: (l, g, v, te) => `${l}: compound annual growth rate ${g}, volatility ${v} a year; tracking error against the five-coin index ${te}% a year.`,
 cx3: k => `The Akaike information criterion, over k = 1 to 4, chooses k = ${k}.`,
 ss1: (d, a, x) => `${d}: all USD stablecoins ${a} USD bn, ${x} times the value of 1 January 2020.`,
 ss2: (t, ts, c, cs, b) => `Tether (USDT) ${t} USD bn (${ts}%), USD Coin (USDC) ${c} USD bn (${cs}%); together ${b}% of the total.`,
 sc: (d, t, c, h, n) => `${d}: Tether ${t}%, USD Coin ${c}% of all USD stablecoins; HHI of issuers ${h}, effective number of issuers ${n}.`,
 df1: (b, l, xt, t0, t1, xe, e0, e1) => `From ${b} to ${l}: TVL ${xt} times its base value (${t0} to ${t1} USD bn, month end); Ether price ${xe} times (${e0} to ${e1} USD).`,
 df2: (s, p, pd, l, ld) => `Daily TVL: ${s} USD bn on 1 January 2020, peak ${p} USD bn on ${pd}, ${l} USD bn on ${ld}.`,
 df3: c => `Correlation of the monthly log changes of TVL and the Ether price, 2020–2026: ${c}.`,
 et: (d, b, i, n, dr) => `On ${d}: Bitcoin ${b}, IBIT ${i}. Drift of ln(IBIT/Bitcoin) over these ${n} trading days: ${dr}% a year.`,
 oc1: (w, b, e, r) => `Last value (${w}, 8 October 2025): Bitcoin ${b} transactions a day, Ethereum ${e}, ${r} times Bitcoin.`,
 oc2: (pb, db, pe, de, lb, le) => `Highest average fee: Bitcoin ${pb} USD (${db}), Ethereum ${pe} USD (${de}); last values ${lb} and ${le} USD.`,
 va: (n, c, b) => `${n} months: correlation of the logs ${c}; slope of the log-log line ${b} (1% more transactions goes with about ${b}% more market value).`,
 tr0: (n, a, b) => `Trend regressions on ${n} months, ${a} – ${b}; standard errors Newey–West, 12 lags.`,
 tr: (l, g, se, r2, a) => `${l}: ĝ = ${g} (SE ${se}), R² = ${r2}, annual growth ${a}%.`,
 os1: (g, s) => `Trend growth ${g}% a year; residual standard deviation ${s} (logs).`,
 os2: (d, p, r, q, lo, hi) => `${d}: forecast ${p} USD bn, realised ${r} USD bn (ratio ${q}); naive 95% band ${lo} – ${hi} USD bn.`,
 os3: (b, a, n) => `Months outside the band: ${b} below and ${a} above, of ${n}.`
};
window.L1_TEXT.predict = {"miner-revenue": {"key": 1, "opts": ["About 0.9%: each halving adds the same 0.23 points to the fee share.", "About 3.6%: the subsidy is 16 times smaller and fees stay small.", "About 50%: after four halvings fees take over from the subsidy."]}, "market-value": {"key": 0, "opts": ["1.42 = 1/0.71: the squared shares of all five coins add up.", "5 = 1/0.2: the basket holds five coins, each counted once.", "1.21 = 1/0.825: only the Bitcoin share of the basket counts."]}, "crix": {"key": 1, "opts": ["It stays near zero for every k: Bitcoin dominates the basket.", "It falls, from about 11% a year (Bitcoin) to under 1% (four coins).", "It rises with k: every coin added is more volatile than Bitcoin."]}, "stablecoin-supply": {"key": 2, "opts": ["It fell by about a third, in line with the total supply.", "It fell the most, since Tether is the largest issuer.", "It stayed about the same, near 82 USD bn on both dates."]}, "stablecoin-issuers": {"key": 0, "opts": ["It rose, from 0.28 to 0.50: the largest share enters squared.", "It fell: the second issuer lost share, so concentration fell.", "It cannot be told without the shares of all other issuers."]}, "defi-tvl": {"key": 1, "opts": ["That about half of the deposits left: TVL counts the tokens.", "Not that deposits halved: TVL is tokens times their prices.", "That deposits rose: TVL fell less than the Ether price did."]}, "spot-etf": {"key": 1, "opts": ["At the same level as Bitcoin: the fund holds the coins.", "Slightly below Bitcoin, about 1% lower: the cost of the fund.", "Above Bitcoin: the fund skips weekend losses by not trading."]}, "four-views": {"key": 0, "opts": ["It falls: a longer mean averages the peak days with calmer days.", "It stays at 19.81 USD: averaging smooths noise but keeps the peak.", "It rises: a longer window takes in more days of high fees."]}, "value-activity": {"key": 2, "opts": ["Yes: the elasticity of a network is stable, near 3.6 in any sample.", "It stays near 2, as Metcalfe's law predicts, except in the full sample.", "No: it rises from about 1 to 3.6 as the sample is extended to 2025."]}, "trend": {"key": 1, "opts": ["It stays near 79.7%: a regression on every month ignores the start.", "It falls, to about 30% a year: the fast years 2015–2017 drop out.", "It rises: the later years have the largest market values."]}, "out-of-sample": {"key": 2, "opts": ["For about 5% of the origins, as a valid 95% band promises.", "For none: the band runs from a quarter to four times the forecast.", "For about half of them: deviations from the trend last for years."]}};
window.L1_TEXT.veilCharts = ["stablecoin-supply", "stablecoin-issuers", "defi-tvl", "spot-etf"];
