// ============================================================
// Practice quiz bank for Lecture 3: Crypto Indices: CRIX, VCRIX and Investible Index Funds (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l3'] = {
    draw: 15,
    questions: [
        {
            correct: 0,
            en: {
                title: "What an index must do",
                text: "A fund manager wants a crypto benchmark that a fund can actually replicate at low cost. Which property does the requirement 'investible' refer to?",
                options: [
                    "Few, liquid constituents that a fund can buy and hold",
                    "As many coins as possible, to cover the whole market",
                    "Constituents changed every day to follow the market",
                    "Equal weights for all coins in the universe"
                ],
                correctExplanation: "An investible index has a small number of liquid constituents; representativeness and stability are the other two requirements.",
                incorrectExplanation: "Investibility is about being able to buy and hold the constituents at low cost: few and liquid coins, not many, equal or daily changing ones."
            }
        },
        {
            correct: 1,
            en: {
                title: "Effective number of coins",
                text: "On 30 October 2026 Bitcoin holds 82.2% and Ethereum 14.5% of the value of ten coins; $\\mathrm{HHI} = 0.696$. What is the effective number of coins $1/\\mathrm{HHI}$?",
                options: [
                    "10, since there are ten coins",
                    "About 1.4: the ten coins behave like 1.4 equal coins",
                    "About 7, the number of coins passing the liquidity rule",
                    "About 0.7, the value of the HHI"
                ],
                correctExplanation: "$1/0.696 = 1.44$: concentration makes ten coins behave like 1.4 equal coins.",
                incorrectExplanation: "The effective number is the inverse of the HHI, $1/0.696 = 1.44$, far below the number of coins because of Bitcoin's dominance."
            }
        },
        {
            correct: 2,
            en: {
                title: "Survivorship bias",
                text: "Five coins that are the largest on 30 October 2026, bought on 1 January 2018 with equal weights, earned 17.6% a year; the five largest of 1 January 2018 earned 7.1% a year. What does the gap measure?",
                options: [
                    "The skill of the index provider",
                    "The effect of the 50% weight cap",
                    "Look-ahead and survivorship bias of choosing today's winners",
                    "The tracking error of the index fund"
                ],
                correctExplanation: "The ex-post basket uses information unavailable in 2018; the gap is the bias a backtest gains by selecting today's winners.",
                incorrectExplanation: "Only the ex-ante basket could have been bought in 2018; the difference comes from selecting with hindsight, not from skill, caps or tracking."
            }
        },
        {
            correct: 3,
            en: {
                title: "Laspeyres index",
                text: "In the Laspeyres index $\\mathrm{CRIX}_t = 1000\\,\\sum_i P_{it}Q_{i0}/\\sum_i P_{i0}Q_{i0}$, what is held fixed between two rebalancing days?",
                options: [
                    "The prices $P_{it}$",
                    "The weights of the coins",
                    "The index level",
                    "The quantities $Q_i$ of each coin"
                ],
                correctExplanation: "The basket (quantities) is fixed; prices move, and with them the weights.",
                incorrectExplanation: "In a Laspeyres index the quantities of the base period are fixed; prices change, so weights drift with prices until the next rebalancing."
            }
        },
        {
            correct: 0,
            en: {
                title: "Why the divisor changes",
                text: "On a rebalancing day a coin enters the index. Why is the divisor recomputed?",
                options: [
                    "So that the index level does not jump because of the change of basket",
                    "To reset the index to 1000",
                    "To remove the effect of price changes on that day",
                    "To keep the weights of the coins equal"
                ],
                correctExplanation: "$\\mathrm{Divisor}_{new} = \\sum_i \\mathrm{MV}^{new}_{i\\tau}/\\mathrm{CRIX}_\\tau$: only prices, not changes of the basket, may move the index.",
                incorrectExplanation: "The divisor is reset so that the index value is the same with the old and the new basket; prices still move the index afterwards."
            }
        },
        {
            correct: 1,
            en: {
                title: "Computing a new divisor",
                text: "On 30 September 2026 the new basket of the replica is worth 2 045.41 billion USD and the index stands at 9 521.15. What is the new divisor?",
                options: [
                    "9 521.15",
                    "About 214.83 million",
                    "About 2.15 billion",
                    "About 0.0047"
                ],
                correctExplanation: "$2\\,045.41 \\times 10^9 / 9\\,521.15 = 214.83$ million.",
                incorrectExplanation: "Divide the basket value by the index level: $2\\,045.41 \\times 10^9 / 9\\,521.15 \\approx 214.83 \\times 10^6$."
            }
        },
        {
            correct: 2,
            en: {
                title: "Liquidity rule",
                text: "The CRIX liquidity rule requires $\\mathrm{ADTV}_i \\ge \\mathrm{ADTV}_{0.25}$. What does it do?",
                options: [
                    "Keeps only the 25% most traded coins",
                    "Caps the weight of any coin at 25%",
                    "Excludes the least traded quarter of the coins by average daily traded volume",
                    "Excludes coins whose price fell by more than 25%"
                ],
                correctExplanation: "$\\mathrm{ADTV}_{0.25}$ is the 25th percentile of the ADTVs: coins below it, the least traded quarter, are not eligible.",
                incorrectExplanation: "The rule compares each coin's average daily traded volume with the 25th percentile of all coins; it is a liquidity filter, not a cap or a price filter."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading an AIC curve",
                text: "For the replica on the 90 days to 30 September 2026: $\\mathrm{AIC}(k) = -946.2, -953.3, -953.6, -952.3$ for $k = 2, 3, 4, 5$. Which $k$ does the first-rise (ECRIX) rule choose?",
                options: [
                    "$k = 2$",
                    "$k = 3$",
                    "$k = 5$",
                    "$k = 4$"
                ],
                correctExplanation: "The AIC falls up to $k = 4$ and rises at $k = 5$: stop at $k = 4$.",
                incorrectExplanation: "The first-rise rule stops at the last $k$ before the AIC goes up; the AIC rises first from $k = 4$ to $k = 5$."
            }
        },
        {
            correct: 0,
            en: {
                title: "A flat AIC curve",
                text: "The AIC falls by 284 points from $k = 1$ to $k = 2$ but only by 0.3 points from $k = 3$ to $k = 4$. What follows?",
                options: [
                    "The second coin matters a lot; the choice between 3 and 4 coins is fragile",
                    "The index should hold all available coins",
                    "Four coins track the market 1 000 times better than three",
                    "The AIC rule cannot be used for crypto"
                ],
                correctExplanation: "A large drop then a flat curve: Ethereum adds most, the next coins little, and small data changes can flip the choice; hence the CTDC smoothing.",
                incorrectExplanation: "Differences of a fraction of an AIC point are within noise, so the choice between 3 and 4 is unstable, while the first added coin clearly improves tracking."
            }
        },
        {
            correct: 1,
            en: {
                title: "Penalty in the AIC",
                text: "In $\\mathrm{AIC}(k) = -2\\sum_t \\ln\\hat f(\\hat\\varepsilon_t(k,\\hat\\beta)) + 2(k-1)$, what is the role of $2(k-1)$?",
                options: [
                    "It converts the AIC into a probability",
                    "It penalises each additional constituent, trading tracking against size",
                    "It corrects for the leave-one-out estimation",
                    "It annualises the tracking error"
                ],
                correctExplanation: "Each added coin improves the fit but costs 2 points; the rule stops when the fit gain is smaller than the penalty.",
                incorrectExplanation: "The term grows with the number of constituents; it is the price of a larger index, not a probability, a correction or an annualisation."
            }
        },
        {
            correct: 2,
            en: {
                title: "Leave-one-out",
                text: "Why does the rule estimate the density of the residuals with leave-one-out?",
                options: [
                    "To remove outliers from the sample",
                    "To make the bandwidth larger",
                    "Evaluating a kernel density at its own data points overstates the likelihood",
                    "To speed up the computation"
                ],
                correctExplanation: "Each point sits on its own kernel bump; dropping it gives an honest likelihood.",
                incorrectExplanation: "Without leave-one-out each observation contributes its own kernel to its density value, which inflates the likelihood; it is not an outlier filter or a speed-up."
            }
        },
        {
            correct: 3,
            en: {
                title: "The CTDC",
                text: "What does the CRIX Technology Decision Criterion (CTDC) of the patent add to the daily AIC rule?",
                options: [
                    "A fixed number of 30 constituents",
                    "A daily change of constituents",
                    "Equal weights for the constituents",
                    "A polynomial fitted to six months of AIC values, whose minimum gives a stable number of constituents"
                ],
                correctExplanation: "Smoothing the noisy daily AIC curves with a polynomial gives a stable, identifiable minimum.",
                incorrectExplanation: "The CTDC smooths AIC curves over six months with a polynomial whose degree is chosen by AIC; it does not fix the number or the weights."
            }
        },
        {
            correct: 0,
            en: {
                title: "Stability of the rule",
                text: "In our replica the first-rise rule chose $k = 2$ in 9, $k = 3$ in 13 and $k = 4$ in 11 of 35 quarters; the CTDC-type rule chose $k = 3$ in 30 of 35. What does this show?",
                options: [
                    "The polynomial smoothing makes the number of constituents much more stable",
                    "The CTDC always chooses fewer coins than the AIC",
                    "The AIC rule is wrong in most quarters",
                    "The number of eligible coins fell over time"
                ],
                correctExplanation: "The CTDC-type choice changes rarely, which keeps trading costs of the index low.",
                incorrectExplanation: "The two rules agree on small indices; the smoothed rule simply changes its choice far less often from quarter to quarter."
            }
        },
        {
            correct: 1,
            en: {
                title: "Weight cap",
                text: "Claim 1 of US Patent 12,784,107 B2 includes a capped weight $\\mathrm{CW}_{it}$. What does it prevent?",
                options: [
                    "Illiquid coins entering the index",
                    "A constituent having an influence of 50% or more in the index",
                    "Stablecoins entering the index",
                    "Jumps of the index at rebalancing"
                ],
                correctExplanation: "The cap keeps every constituent below 50%; the excess weight goes to the others.",
                incorrectExplanation: "Liquidity and stablecoins are handled by the eligibility filters and jumps by the divisor; the cap limits the weight of a single coin."
            }
        },
        {
            correct: 2,
            en: {
                title: "Capping in practice",
                text: "At the rebalancing of 30 September 2026 the replica's market-value weights are BTC 82.1%, ETH 16.0%, ZEC 1.2%, DOGE 0.7%. After capping below 50%, Ethereum has about",
                options: [
                    "16.0%",
                    "50.0%",
                    "44.7%",
                    "25.0%"
                ],
                correctExplanation: "Bitcoin is cut to 49.99%; the excess of 32.1 points is shared in proportion to the other weights, mostly to Ethereum: 44.7%.",
                incorrectExplanation: "The excess above the cap is redistributed in proportion to the remaining weights, so Ethereum, the largest of them, receives most of it."
            }
        },
        {
            correct: 3,
            en: {
                title: "The patent",
                text: "Which statement about US Patent 12,784,107 B2 is right?",
                options: [
                    "It is still a pending application",
                    "It covers only the VCRIX volatility index",
                    "It was granted in 2021, the priority year",
                    "It was granted on 3 November 2026 to Royalton Partners AG, inventor Wolfgang Karl Härdle"
                ],
                correctExplanation: "Priority 3 May 2021, publication US 2024/0233028 A1 in July 2024, grant on 3 November 2026.",
                incorrectExplanation: "The provisional application dates from 2021 and the publication from 2024; the patent was granted on 3 November 2026 and covers managing an investible index fund."
            }
        },
        {
            correct: 0,
            en: {
                title: "What the patent claims",
                text: "In plain words, what does claim 1 of the patent cover?",
                options: [
                    "A computer method that selects, weights and rebalances a small index tracking the total market, and sends it to a fund",
                    "A new cryptocurrency",
                    "A trading strategy that beats Bitcoin",
                    "An option pricing model for CRIX"
                ],
                correctExplanation: "Filter, rank, build candidate indices, choose the number of constituents by AIC and a polynomial, rebalance and send constituents and weights to the investment vehicle.",
                incorrectExplanation: "The claim describes the operating steps of an investible index fund, not a coin, a trading strategy or an option model."
            }
        },
        {
            correct: 1,
            en: {
                title: "Replica against CRIX",
                text: "Our ten-coin replica tracks the published CRIX with correlation 0.990 and tracking error 9.3% a year; the replica tracks its own TMI with 0.9995 and 2.2%. Where does most of the gap to CRIX come from?",
                options: [
                    "From the divisor",
                    "From the universe: the coins we do not have, not from the rule",
                    "From the choice of the number of constituents",
                    "From the monthly rebalancing"
                ],
                correctExplanation: "The rule reproduces its own total market almost perfectly; the difference to CRIX comes from a different coin universe.",
                incorrectExplanation: "The tiny gap between the replica and its own TMI shows the rule is not the problem; the published index uses a much larger universe."
            }
        },
        {
            correct: 2,
            en: {
                title: "Capped or not",
                text: "Against the published CRIX the uncapped replica has correlation 0.990 (TE 9.3%), the capped one 0.979 (TE 14.5%). What can you conclude?",
                options: [
                    "The published CRIX caps Bitcoin at 50%",
                    "Caps always increase tracking error",
                    "On these data the uncapped replica is closer to the published index",
                    "The capped index is more representative"
                ],
                correctExplanation: "The comparison only says which replica is closer on these data; it does not prove the official rule.",
                incorrectExplanation: "A replication on ten coins cannot prove the official rule or a general law; it only shows which of the two replicas is closer here."
            }
        },
        {
            correct: 3,
            en: {
                title: "Tracking error",
                text: "The tracking error of the replica against CRIX is 9.3% a year. What is the typical daily deviation?",
                options: [
                    "9.3 percentage points",
                    "About 0.025 percentage points",
                    "About 3.4 percentage points",
                    "About 0.49 percentage points"
                ],
                correctExplanation: "$9.3/\\sqrt{365} = 0.49$ points a day.",
                incorrectExplanation: "Divide the annual tracking error by the square root of the number of returns a year, $\\sqrt{365} = 19.1$."
            }
        },
        {
            correct: 0,
            en: {
                title: "CRIX against Bitcoin",
                text: "16 March 2018 – 31 October 2026: CRIX CAGR 24.0%, volatility 65.0%; Bitcoin 29.4% and 61.7%. What does this say?",
                options: [
                    "The broad index was more volatile and grew less than Bitcoin in this period",
                    "The broad index diversified away Bitcoin's risk",
                    "CRIX beat Bitcoin in most years",
                    "Altcoins reduced the drawdowns of CRIX"
                ],
                correctExplanation: "The other coins added volatility, not diversification, and Bitcoin's share of the market rose.",
                incorrectExplanation: "CRIX's volatility is higher and its growth lower; it beat Bitcoin only in 2021 and fell more in falling years."
            }
        },
        {
            correct: 1,
            en: {
                title: "CAGR",
                text: "CRIX was 1 960.12 on 16 March 2018 and 12 512.61 on 31 October 2026, $T = 8.63$ years. What is its compound annual growth rate?",
                options: [
                    "About 74% a year",
                    "About 24.0% a year",
                    "About 538% a year",
                    "About 6.4% a year"
                ],
                correctExplanation: "$(12\\,512.61/1\\,960.12)^{1/8.63} - 1 = 24.0\\%$.",
                incorrectExplanation: "CAGR is $(I_T/I_0)^{1/T} - 1$: the total growth factor 6.38 to the power $1/8.63$, not the total return divided by the years."
            }
        },
        {
            correct: 2,
            en: {
                title: "Drawdown",
                text: "CRIX reached 21 523.34 on 6 October 2025 and 9 439.22 on 30 June 2026. What gain is needed to recover the record?",
                options: [
                    "About 56%",
                    "About 44%",
                    "About 128%",
                    "About 100%"
                ],
                correctExplanation: "Drawdown $9\\,439.22/21\\,523.34 - 1 = -56.1\\%$; gain needed $21\\,523.34/9\\,439.22 - 1 = 128\\%$.",
                incorrectExplanation: "The gain needed is the record divided by the trough minus one; a loss of 56% needs more than twice that percentage to recover."
            }
        },
        {
            correct: 3,
            en: {
                title: "Crypto-specific shocks",
                text: "Terra/Luna (5–12 May 2022): CRIX $-31.0$, Bitcoin $-23.0$ (log returns, %). FTX (5–21 November 2022): $-33.8$ and $-29.9$. What do these numbers show?",
                options: [
                    "Bitcoin is riskier than the market",
                    "The index hedged the shocks",
                    "The shocks did not affect the index",
                    "In crypto-specific shocks the broad index lost more than Bitcoin"
                ],
                correctExplanation: "Smaller coins fell harder, so the broad index lost more.",
                incorrectExplanation: "In both shocks the index fell more than Bitcoin: the smaller constituents fall harder in crypto-specific crises."
            }
        },
        {
            correct: 0,
            en: {
                title: "VCRIX",
                text: "What does VCRIX measure?",
                options: [
                    "A forecast of CRIX volatility used as a proxy for implied volatility, normalised to 1000 at the start",
                    "The trading volume of CRIX",
                    "The implied volatility of Bitcoin options",
                    "The number of constituents of CRIX"
                ],
                correctExplanation: "VCRIX is a HAR forecast of the realised volatility of CRIX, the crypto analogue of the VIX.",
                incorrectExplanation: "No liquid index options existed, so VCRIX forecasts realised CRIX volatility instead of reading it from option prices."
            }
        },
        {
            correct: 1,
            en: {
                title: "The 30-day window",
                text: "VCRIX jumped from 405.66 to 1 215.57 on 13 March 2020 and fell from 1 159.78 to 542.82 on 12 April 2020. Why the fall on 12 April?",
                options: [
                    "A strong rally on 12 April",
                    "The crash day of 12 March left the 30-day window",
                    "A change of the index divisor",
                    "A new constituent entered CRIX"
                ],
                correctExplanation: "With a rolling window a single day enters and leaves abruptly: a 'ghost' effect, not a market event.",
                incorrectExplanation: "Nothing happened in the market that day; the extreme return of 12 March simply dropped out of the 30-day window."
            }
        },
        {
            correct: 2,
            en: {
                title: "VCRIX after falls and rises",
                text: "Change of ln VCRIX on day $t$ against the CRIX return on day $t-1$: slope $-1.61$ (SE 0.14) after falls and $+1.38$ (SE 0.12) after rises; equal size not rejected (p 0.10). What is the right reading?",
                options: [
                    "Only falls raise VCRIX",
                    "VCRIX predicts the next day's return",
                    "Large moves in either direction raise VCRIX; the asymmetry is not significant at 5%",
                    "Rises lower VCRIX"
                ],
                correctExplanation: "Both slopes push VCRIX up for large moves: a V shape; the difference in size has p = 0.10.",
                incorrectExplanation: "The negative slope for falls and positive slope for rises both mean higher VCRIX after big moves; the test does not reject equal size."
            }
        },
        {
            correct: 3,
            en: {
                title: "GARCH persistence",
                text: "For CRIX, GARCH(1,1)-t gives $\\alpha = 0.084$, $\\beta = 0.914$. What does $\\alpha + \\beta = 0.998$ imply?",
                options: [
                    "Volatility is constant",
                    "Returns are predictable",
                    "Shocks disappear within a week",
                    "Volatility shocks die out very slowly: the half-life is about 370 days"
                ],
                correctExplanation: "Half-life $\\ln 0.5/\\ln 0.998 \\approx 370$ days: high persistence.",
                incorrectExplanation: "Persistence close to one means a shock to variance decays very slowly; it says nothing about predictable returns."
            }
        },
        {
            correct: 0,
            en: {
                title: "Tracking difference and error",
                text: "IBIT against Bitcoin (2024–2026): tracking difference $-0.28\\%$ a year, tracking error 3.5% a year. Which statement is right?",
                options: [
                    "It lags Bitcoin by about 0.28% a year on average and deviates around that by about 3.5% a year",
                    "It lags Bitcoin by 3.5% every year",
                    "It beats Bitcoin by 0.28% a year",
                    "Its returns are uncorrelated with Bitcoin"
                ],
                correctExplanation: "TD is the average lag (close to the 0.25% fee); TE is the size of the fluctuations around it.",
                incorrectExplanation: "The tracking difference measures the average lag and the tracking error the noise around it; the correlation with Bitcoin is 0.998."
            }
        },
        {
            correct: 1,
            en: {
                title: "Why the clock matters",
                text: "IBIT's tracking error is 3.5% a year against Bitcoin at 16:00 New York and 20.6% against Bitcoin's midnight UTC close. Which number should you report?",
                options: [
                    "20.6%, the larger and more prudent number",
                    "3.5%: the fund must be compared with Bitcoin at the time the fund is priced",
                    "The average of the two",
                    "Neither: tracking error is meaningless for ETFs"
                ],
                correctExplanation: "The fund did not change; the larger figure is caused by comparing prices taken eight hours apart.",
                incorrectExplanation: "Asynchronous prices add noise that has nothing to do with the fund; compare at the fund's pricing time."
            }
        }
    ]
};
