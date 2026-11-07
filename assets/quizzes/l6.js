// ============================================================
// Practice quiz bank for Lecture 6: Stablecoins II – Systemic Depegging
// Pressure and Portfolios (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l6'] = {
    draw: 15,
    questions: [
        {
            correct: 2,
            en: {
                title: "What the DPI is",
                text: "On 12 March 2023 the De-pegging Pressure Index (DPI), estimated on the 90 days to 11 March, was 0.52. Which reading is right?",
                options: [
                    "A 52% probability of a depeg within the next 24 hours",
                    "USDC was 52 basis points (bp) below the dollar",
                    "A unitless penalty measuring lower-tail co-movement",
                    "52% of the stablecoins were depegged on that day"
                ],
                correctExplanation: "The DPI averages selected Quantile Lasso penalties. It is neither an observed depeg in bp nor a probability; the value 0.52 lay in the fourth of five quintiles.",
                incorrectExplanation: "The observed depeg is a price fact in bp and an alarm gives a probability; the DPI is a third object, a unitless measure of lower-tail co-movement."
            }
        },
        {
            correct: 0,
            en: {
                title: "Reference-adjusted deviation",
                text: "EURS, a euro stablecoin, trades at 1.1194 USD while EUR/USD is 1.1202. What is its reference-adjusted deviation $d = 10^4\\,(P/B - 1)$?",
                options: [
                    "About $-7.1$ bp",
                    "About $+1\\,194$ bp",
                    "About $-0.07$ bp",
                    "About $-8.0$ bp"
                ],
                correctExplanation: "$1.1194/1.1202 = 0.99929$, so $d = 10^4 \\times (-0.00071) \\approx -7.1$ bp: EURS is slightly below the euro.",
                incorrectExplanation: "Divide the token price by the dollar value of its reference: $1.1194/1.1202 - 1 \\approx -0.00071$, i.e. $-7.1$ bp."
            }
        },
        {
            correct: 3,
            en: {
                title: "Why adjust for the reference",
                text: "Why must the dollar price of a euro or gold token be divided by the dollar value of its reference asset before measuring a depeg?",
                options: [
                    "Because euro and gold tokens are always more volatile than dollar ones",
                    "Because the dollar price is not available for them",
                    "Because the Quantile Lasso requires positive data",
                    "Otherwise a 1% euro move would look like a 100 bp depeg"
                ],
                correctExplanation: "EURS tracks the euro, PAXG one ounce of gold; their dollar prices move with the reference. The adjustment puts all tokens on one economic scale before any model sees them.",
                incorrectExplanation: "A token's deviation is measured against what it promises; without the adjustment, currency or gold moves are mistaken for depegs."
            }
        },
        {
            correct: 1,
            en: {
                title: "Two tiers of peg quality",
                text: "Median absolute deviation $|d|$, January 2020 to May 2026 (EOD Historical Data): USDC 1.3 bp, USDT 3.6 bp, GUSD 17.7 bp, EURS 50.9 bp, sUSD 56.3 bp. What pattern do these numbers show?",
                options: [
                    "All stablecoins hold their pegs about equally well, within a few bp",
                    "Two tiers: large dollar tokens tight, the others loose",
                    "Euro tokens are the most stable of all tokens",
                    "Only crypto-collateralised tokens deviate at all"
                ],
                correctExplanation: "The large dollar coins sit within a few bp; GUSD, PAXG, EURS and sUSD are tens of bp off and have deep lower tails (5% quantile of sUSD $-1\\,883$ bp).",
                incorrectExplanation: "The medians split into a tight group of large dollar tokens and a loose group of small, non-dollar or crypto-collateralised tokens."
            }
        },
        {
            correct: 1,
            en: {
                title: "Does the data source matter?",
                text: "Median $|d|$ of USDC is 1.3 bp from EOD Historical Data (EODHD) and 4.11 bp in the working paper of Fan et al. (2026) (CoinGecko); the share of days at least 100 bp below the peg is 0.09% for USDT in both. What follows?",
                options: [
                    "One of the two data sources must be wrong",
                    "Levels depend on the source; the ranking does not",
                    "The source changes the ranking of coins completely",
                    "The source matters only for non-dollar tokens"
                ],
                correctExplanation: "EODHD medians are lower than CoinGecko's, but the ordering of coins and the rates of large downside deviations agree closely (sUSD 26.0% against 25.0%).",
                incorrectExplanation: "Different aggregation gives different levels of small deviations; the ranking and the frequency of large depegs are robust to the source."
            }
        },
        {
            correct: 3,
            en: {
                title: "A persistent depeg",
                text: "sUSD (Synthetix, crypto-collateralised) was below 0.99 USD on 607 of 661 days since January 2025 and at 0.09 USD on 23 October 2026. Why did arbitrage not close the gap, as after the Silicon Valley Bank (SVB) failure?",
                options: [
                    "Arbitrageurs did not notice the low price in time",
                    "sUSD trades only on a few small venues at weekends",
                    "The gap was too small to make arbitrage profitable",
                    "There is no redemption at par, so no arbitrage"
                ],
                correctExplanation: "USDC recovered after two days because redemption at par returned. sUSD has no such channel, so the market price can drift down for months.",
                incorrectExplanation: "Peg arbitrage needs a way to redeem at par; when that channel is missing, a discount can persist and deepen."
            }
        },
        {
            correct: 0,
            en: {
                title: "The check loss at the 5% quantile",
                text: "The check loss is $\\rho_\\tau(e) = e\\,(\\tau - \\mathbb 1\\{e < 0\\})$. With $\\tau = 0.05$, how are residuals below and above the fitted line weighted?",
                options: [
                    "Below: $0.95|e|$; above: $0.05|e|$",
                    "Below: $0.05|e|$; above: $0.95|e|$",
                    "Both: $|e|$, as for the median",
                    "Both: $e^2$, as for least squares"
                ],
                correctExplanation: "For $e < 0$, $\\rho_{0.05}(e) = e(0.05 - 1) = 0.95|e|$; for $e > 0$ it is $0.05\\,e$. Points below the line are expensive, so only about 5% of them end up there.",
                incorrectExplanation: "Substitute into $\\rho_\\tau$: a negative residual is weighted by $1 - \\tau = 0.95$, a positive one by $\\tau = 0.05$."
            }
        },
        {
            correct: 2,
            en: {
                title: "A non-unique quantile",
                text: "Twenty daily deviations, $\\tau = 0.05$: the total check loss equals 116.55 for every $q$ between $-120$ bp and $-35$ bp, the smallest and second-smallest observations. What does this mean?",
                options: [
                    "The data contain a recording error",
                    "The 5% quantile is the midpoint of the two lowest values, $-77.5$ bp",
                    "Any value between the two lowest is a valid 5% quantile",
                    "No 5% quantile exists for 20 observations"
                ],
                correctExplanation: "When $n\\tau$ is an integer, the check loss is flat between two order statistics; every point in between minimises it.",
                incorrectExplanation: "The loss is flat over the interval, so the minimiser is a whole interval; choosing its midpoint is a convention, not a property of the estimator."
            }
        },
        {
            correct: 3,
            en: {
                title: "The 5% quantile in a 90-day window",
                text: "The DPI uses 90-day windows and $\\tau = 0.05$, so $n\\tau = 4.5$. What defines the estimated 5% quantile, and what follows?",
                options: [
                    "The window mean, so the estimate is very stable",
                    "The 45th observation, so many days matter",
                    "The lowest observation only, so one day matters",
                    "The 5th smallest value, so five days decide it"
                ],
                correctExplanation: "With $n\\tau = 4.5$ the minimiser is unique, the 5th smallest value. One day entering or leaving the window can move it, so rolling 5% quantile models are noisy by construction.",
                incorrectExplanation: "In 90 days, the 5% quantile is pinned down by the 5th lowest day; a handful of observations decide the lower tail."
            }
        },
        {
            correct: 1,
            en: {
                title: "Regimes rather than days",
                text: "Why is the DPI analysed in regimes and event windows rather than read day by day?",
                options: [
                    "Because the DPI is published only once a month",
                    "Because daily values rest on a few tail days",
                    "Because the Lasso cannot be estimated every day",
                    "Because regulators require regime-based reporting"
                ],
                correctExplanation: "Rolling 5% quantile models depend on about five days per window; averaging over regimes or event windows reduces that noise.",
                incorrectExplanation: "A daily DPI value is driven by a handful of tail days; only aggregates over longer periods are informative."
            }
        },
        {
            correct: 2,
            en: {
                title: "The largest penalty",
                text: "In the Quantile Lasso, all slopes are zero for $\\lambda \\ge \\lambda_{max}$, where $\\lambda_{max} = \\max_k |\\sum_s x_{k,s}\\,\\psi_\\tau(d_{j,s} - \\hat q_\\tau)|$. What does $\\lambda_{max}$ measure?",
                options: [
                    "The number of candidate predictors in the model",
                    "The variance of the target deviation in the 90-day window",
                    "The strongest scaled covariance with the tail indicator",
                    "The check loss of the intercept-only model"
                ],
                correctExplanation: "$\\psi_\\tau$ marks whether an observation is below the quantile; $\\lambda_{max}$ is the largest scaled covariance of a predictor with that indicator, the penalty at which the first predictor enters.",
                incorrectExplanation: "$\\lambda_{max}$ is the penalty at which the first predictor would enter: the largest scaled covariance between a predictor and the lower-tail indicator."
            }
        },
        {
            correct: 0,
            en: {
                title: "GACV",
                text: "The penalty is chosen by generalised approximate cross-validation: $\\mathrm{GACV}(\\lambda) = \\sum_s \\rho_\\tau(\\text{residual}_s)/(n - \\mathrm{df}(\\lambda))$ with $\\mathrm{df} = \\#\\{\\hat\\beta_k \\neq 0\\} + 1$. What role does the denominator play?",
                options: [
                    "It penalises complexity: more active predictors raise it",
                    "It converts the check loss into a probability",
                    "It removes the intercept from the check loss",
                    "It rescales predictors by their median absolute deviation"
                ],
                correctExplanation: "A smaller $\\lambda$ lowers the check loss but activates more predictors; dividing by $n - \\mathrm{df}$ trades fit against the number of active coefficients.",
                incorrectExplanation: "The degrees of freedom count the nonzero slopes plus the intercept; dividing by $n - \\mathrm{df}$ charges each extra predictor."
            }
        },
        {
            correct: 0,
            en: {
                title: "The penalty as a risk proxy",
                text: "The Financial Risk Meter (FRM) idea uses the selected penalty $\\hat\\lambda$ as a risk proxy. Which caveat does the lecture attach to it?",
                options: [
                    "Its level also reflects scaling, the grid and the criterion",
                    "It is valid only for dollar-pegged stablecoins",
                    "It measures the issuer's probability of default",
                    "It can be read directly in basis points of deviation from the peg"
                ],
                correctExplanation: "$\\hat\\lambda$ reflects tail co-movement but also specification choices; it is a specification-dependent proxy, not a structural quantity.",
                incorrectExplanation: "The selected penalty is shaped by the data scaling, the grid and GACV as well as by tail dependence; treat it as a proxy to be validated."
            }
        },
        {
            correct: 2,
            en: {
                title: "One equation: USDC after SVB",
                text: "Target USDC, 90 days to 19 March 2023 (after the Silicon Valley Bank failure), 13 candidates: $\\lambda_{max} = 164.1$, GACV selects $\\hat\\lambda = 0.241$ with 12 active predictors; DAI keeps the largest slope along the path (3.70). How do you read this?",
                options: [
                    "DAI caused the failure of Silicon Valley Bank",
                    "The equation is overfitted, so DAI should be dropped",
                    "USDC's lower tail moved most closely with DAI's",
                    "USDC was not linked to any other coin in the window"
                ],
                correctExplanation: "The predictor that survives the largest penalty is the one most strongly linked to the target's lower tail. DAI held much USDC as collateral, so the two tails moved together.",
                incorrectExplanation: "Order of entry along the Lasso path ranks tail links: DAI, first in and last out, was USDC's strongest lower-tail companion; this is association, not causation."
            }
        },
        {
            correct: 1,
            en: {
                title: "Robust scaling",
                text: "In the DPI, every variable is centred by its window median and divided by $1.4826 \\times$ MAD (median absolute deviation). Why this scaling?",
                options: [
                    "To make all variables Normally distributed before the Lasso",
                    "A common scale that a few extreme days cannot dominate",
                    "To remove the lower tail before estimation",
                    "To convert the deviations into probabilities"
                ],
                correctExplanation: "The Lasso penalty treats all slopes alike, so predictors need a common scale; median and MAD are robust to the outliers that stablecoin data contain.",
                incorrectExplanation: "A Lasso needs comparable scales; median and MAD give them robustly, and the factor 1.4826 makes MAD comparable to a standard deviation."
            }
        },
        {
            correct: 3,
            en: {
                title: "Building the index",
                text: "For each coin $j$ and day $t$, a 5% Quantile Lasso on the preceding 90 days selects $\\hat\\lambda_{j,t}$ by GACV. How is the DPI formed?",
                options: [
                    "As the largest $\\hat\\lambda_{j,t}$ across coins",
                    "As the number of active predictors summed across coins",
                    "As the share of coins that are depegged",
                    "As the average of $\\hat\\lambda_{j,t}$ over the coins"
                ],
                correctExplanation: "$\\mathrm{DPI}_t = J^{-1}\\sum_j \\hat\\lambda_{j,t}$: one number per day summarising lower-tail pressure across the system (replication in this course on EODHD data: 10 coins, 23 970 equations).",
                incorrectExplanation: "The index is the cross-sectional mean of the selected penalties of all coin equations on that day."
            }
        },
        {
            correct: 1,
            en: {
                title: "DPI over time",
                text: "Replication in this course (EODHD data), annual medians of the DPI: 0.27 (2020), 0.39 to 0.40 (2021 to 2023), 0.44 (2024), 0.52 (2025), 0.32 (2026). When was pressure highest, and which coin carried it?",
                options: [
                    "2020, during the pandemic market crash",
                    "2025, carried mostly by BUSD, a thinly traded coin",
                    "2025, carried by the depeg of sUSD in November",
                    "2026, because of the Iran-Hormuz shock"
                ],
                correctExplanation: "The highest annual median is 0.52 in 2025. BUSD carries 63% of the index in October–December 2025; without BUSD the 2025 median falls to 0.34, while leaving out sUSD raises it to 0.55.",
                incorrectExplanation: "The maximum, 0.52, is in 2025, but the leave-one-coin-out check points to BUSD, not to the sUSD depeg that began in the same months."
            }
        },
        {
            correct: 0,
            en: {
                title: "A trend that is not rejected",
                text: "Log-linear trend of the DPI to May 2026: $+0.046$ per year, heteroskedasticity and autocorrelation consistent (HAC, 90 lags) standard error 0.036, p 0.21, 95% CI $[-0.025, 0.117]$. What is the correct conclusion?",
                options: [
                    "Zero slope not rejected; no trend is not shown either",
                    "There is no trend in the DPI over this period",
                    "The DPI rises significantly, by about 4.6% a year since 2020",
                    "The DPI falls significantly over time"
                ],
                correctExplanation: "The interval contains zero, so a zero slope is not rejected; it also contains slopes up to 0.117, so a sizeable trend is not ruled out.",
                incorrectExplanation: "Not rejecting zero is not accepting zero; with a 95% interval from $-0.025$ to $0.117$ both no trend and a sizeable trend remain possible."
            }
        },
        {
            correct: 3,
            en: {
                title: "Working paper and replication",
                text: "The working paper estimates a DPI trend of $-0.004$ per year (p 0.78); the replication in this course $+0.046$ (p 0.21). In what sense do they agree?",
                options: [
                    "Both find a significant upward trend",
                    "Both find a significant downward trend",
                    "They agree on the sign and the size of the trend",
                    "Only in not rejecting zero; the signs differ"
                ],
                correctExplanation: "Neither rejects zero, which is the only common conclusion. Different data sources, coins and periods give different point estimates.",
                incorrectExplanation: "One estimate is negative, the other positive; the shared result is only that a zero slope is not rejected in either."
            }
        },
        {
            correct: 2,
            en: {
                title: "Sensitivity of event responses",
                text: "The DPI response to the Silicon Valley Bank (SVB) failure (mean over days 0 to 30 relative to days $-60$ to $-8$) is $+21.0\\%$ with the wide $\\lambda$ grid and $+158.6\\%$ with a narrow grid; the two indices correlate 0.84 in logs. What is the lesson?",
                options: [
                    "The narrow grid is right, since its effect is stronger",
                    "SVB had no effect on stablecoin pressure at all",
                    "Report the specification; trust what survives several",
                    "Correlated indices must give the same event responses"
                ],
                correctExplanation: "Highly correlated indices can still differ in a 31-day mean around one event. A result that changes several-fold with the grid is fragile.",
                incorrectExplanation: "A correlation of 0.84 over the whole sample does not guarantee similar responses to a single event; the size of an event effect depends on the specification."
            }
        },
        {
            correct: 2,
            en: {
                title: "Boundary solutions",
                text: "With a narrow grid $[10^{-2}, 1]\\lambda_{max}$, 19.6% of equations select the smallest $\\lambda$ on the grid; with a wide grid $[10^{-4}, 1]\\lambda_{max}$, 4.0%. Why does this matter?",
                options: [
                    "It shows that the wide grid overfits the data",
                    "It has no effect on the DPI, since only the median is used",
                    "Many penalties sit at the grid's edge, set by the grid",
                    "It proves that the DPI is a depeg probability"
                ],
                correctExplanation: "When GACV would choose a smaller $\\lambda$ than the grid allows, the selected value is set by the grid's lower bound; the DPI then inherits that choice.",
                incorrectExplanation: "A boundary solution means the optimum lies outside the grid; the selected $\\lambda$, and so the DPI, is then determined by the grid."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading the link matrix",
                text: "In the tail-link matrix, each cell is the share of daily equations with a positive slope minus the share with a negative slope, in percentage points (pp). What does a cell value tell you?",
                options: [
                    "The size of the effect in basis points",
                    "The correlation between the two coins",
                    "The probability that both coins depeg on the same day",
                    "How often, and with which sign, a link is selected"
                ],
                correctExplanation: "It is a signed selection frequency: how consistently a link appears across days and in which direction, not how large the effect is.",
                incorrectExplanation: "The cell counts selections over equations; it is a frequency in pp, not a size in bp, a correlation or a probability."
            }
        },
        {
            correct: 0,
            en: {
                title: "USDC and DAI",
                text: "Replication in this course (EODHD data): the cell USDC $\\leftarrow$ DAI is 75 pp, and DAI $\\leftarrow$ USDC is 60 pp. How do you read the first number?",
                options: [
                    "Net share of USDC equations with a positive DAI slope",
                    "A 1 bp fall of DAI lowers USDC's 5% quantile by 75 bp",
                    "USDC and DAI are depegged together on 75% of days",
                    "DAI's depegs cause 75% of the depegs of USDC"
                ],
                correctExplanation: "A positive slope means aligned: a lower DAI deviation goes with a lower USDC quantile. 75 pp is the net share of equations with that sign.",
                incorrectExplanation: "The matrix reports a signed selection frequency in percentage points; it measures consistency of the link, not its size or a causal share."
            }
        },
        {
            correct: 1,
            en: {
                title: "Aligned or inverse",
                text: "Replication in this course (EODHD data): 47.4% of coin coefficients are aligned (positive) and 33.1% inverse (negative); the working paper finds 39.6% and 23.9%. What do the two data sets agree on?",
                options: [
                    "Inverse links dominate in both data sets",
                    "Aligned links are more common than inverse ones",
                    "All coins are linked about equally often",
                    "Macro variables carry most of the slope weight"
                ],
                correctExplanation: "In both data sets aligned links outnumber inverse ones. Macro variables carry only about 18 to 21% of the absolute slope weight.",
                incorrectExplanation: "Compare the two shares in each data set: aligned exceeds inverse in both, so co-movement of lower tails is the common pattern."
            }
        },
        {
            correct: 3,
            en: {
                title: "Sparser under pressure",
                text: "Replication in this course (EODHD data): average active predictors fall from 10.96 (of 13) in the lowest DPI quintile to 9.68 in the highest; working paper: 10.11 to 9.00 (of 15). Which interpretation is supported?",
                options: [
                    "A few strong links dominate, as the chart proves",
                    "The result holds in one data source only, not in the paper",
                    "Pressure makes the coins move independently",
                    "Partly mechanical: a larger penalty removes predictors"
                ],
                correctExplanation: "The DPI is the penalty itself, so higher DPI implies fewer active predictors almost automatically. The direction replicates, but its economic interpretation is not shown.",
                incorrectExplanation: "Higher penalties set more slopes to zero; the pattern replicates across data sets, but separating the mechanical effect from economics needs more evidence."
            }
        },
        {
            correct: 0,
            en: {
                title: "Is the DPI a proxy for simple stress?",
                text: "Spearman correlation of the DPI (90-day means) with the median $|d|$ across coins is $-0.10$, and with the VIX (CBOE volatility index) $-0.16$. What does this show?",
                options: [
                    "The DPI proxies neither; it measures something else",
                    "The DPI is a good substitute for the VIX",
                    "The DPI is wrong, since all stress measures must agree closely",
                    "The DPI is the median deviation with opposite sign"
                ],
                correctExplanation: "Correlations near zero mean the DPI does not just repackage deviation levels or the VIX; it captures tail co-movement, a different object.",
                incorrectExplanation: "Weak correlations with simple stress measures show the DPI carries different information; they neither validate nor refute it as a pressure measure."
            }
        },
        {
            correct: 1,
            en: {
                title: "Fit is not forecast",
                text: "Fan et al. (2026), working paper, skill relative to an intercept-only model: the joint model (coins and macro) has in-window GACV skill 37.0% but a fully lagged out-of-sample forecast skill of $-38.6\\%$. What does this show?",
                options: [
                    "The joint model is the best forecaster of the three",
                    "The best in-window fit is the worst lagged forecast",
                    "The intercept-only model overfits the window",
                    "Skill cannot be negative, so there is an error"
                ],
                correctExplanation: "In-window fit uses same-day information and the estimation sample; held out and with lagged predictors, the richer model loses more to the simple benchmark.",
                incorrectExplanation: "Negative skill means a larger loss than the intercept-only benchmark; the model that describes the window best forecasts worst."
            }
        },
        {
            correct: 2,
            en: {
                title: "Selected but not useful",
                text: "Fan et al. (2026), working paper: on-chain variables (Curve, Uniswap) enter 91% of the Quantile Lasso equations, yet do not reduce held-out loss significantly. What is the lesson?",
                options: [
                    "On-chain data should be removed from all models",
                    "The Lasso is selecting at random",
                    "Frequent selection in sample is not forecast value",
                    "Held-out loss is the wrong criterion for forecasting"
                ],
                correctExplanation: "Selection reflects in-sample association; forecast value must be shown on data outside the estimation window.",
                incorrectExplanation: "A variable can be selected in almost every window and still not improve forecasts; only held-out loss tests forecast value."
            }
        },
        {
            correct: 0,
            en: {
                title: "Concentration and the DPI",
                text: "Fan et al. (2026), working paper, regression of $\\ln \\mathrm{DPI}_t$ on lagged concentration with year effects: $+1$ standard deviation of the Herfindahl-Hirschman index (HHI) goes with $-1.52\\%$ DPI, 95% interval $[-4.24\\%, 1.27\\%]$, Holm p 0.38. What follows?",
                options: [
                    "No evidence of an effect; use it for scenarios and limits",
                    "Higher concentration lowers depegging pressure",
                    "Concentration is irrelevant for stablecoin risk",
                    "Concentration predicts when pressure builds up in the system"
                ],
                correctExplanation: "The interval contains zero and the corrected p-value is 0.38. Concentration says how much of the system depends on two issuers, not when pressure arrives.",
                incorrectExplanation: "The coefficient is not distinguishable from zero; concentration measures exposure, which is useful for scenarios and limits, not timing."
            }
        },
        {
            correct: 3,
            en: {
                title: "Year effects",
                text: "Without year effects, higher concentration goes with a higher DPI; with year effects the link disappears. What is the most likely explanation?",
                options: [
                    "Year effects remove all information from the regression",
                    "Concentration causes the DPI only in some years",
                    "Year effects correct a measurement error in the DPI",
                    "Both trend with the market regime over time"
                ],
                correctExplanation: "Concentration and the DPI both move with broad market phases; once each year's level is absorbed, no within-year link remains.",
                incorrectExplanation: "A link that vanishes when year effects are added was driven by shared trends over time, not by concentration itself."
            }
        }
    ]
};
