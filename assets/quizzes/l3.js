// ============================================================
// Practice quiz bank for Lecture 3: Volatility and Tail Risk (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l3'] = {
    draw: 15,
    questions: [
        {
            correct: 2,
            en: {
                title: "EWMA memory",
                text: "The exponentially weighted moving average (EWMA) of RiskMetrics uses $\\lambda = 0.94$. What is its effective memory $1/(1-\\lambda)$?",
                options: [
                    "1 day: only yesterday's squared return matters",
                    "6 days, since yesterday gets a weight of 6%",
                    "About 17 days",
                    "94 days, one day for each hundredth of $\\lambda$"
                ],
                correctExplanation: "$1/(1 - 0.94) = 1/0.06 \\approx 16.7$, about 17 days. Weights decay geometrically, so older days still count, but less and less.",
                incorrectExplanation: "The effective memory is $1/(1-\\lambda) = 1/0.06 \\approx 17$ days; the 6% weight on yesterday is $1-\\lambda$, not the memory."
            }
        },
        {
            correct: 0,
            en: {
                title: "EWMA weight on the last 30 days",
                text: "With $\\lambda = 0.94$, the EWMA weight on the squared return $j$ days ago is $(1-\\lambda)\\lambda^{j-1}$. What share of the total weight falls on the last 30 days?",
                options: [
                    "84%, since $1 - 0.94^{30} \\approx 0.84$",
                    "30%, one percent per day",
                    "50%, since the half-life of the weights is 30 days",
                    "100%, since days older than 30 get zero weight"
                ],
                correctExplanation: "The weights over the first 30 days sum to $1 - 0.94^{30} = 0.84$. The remaining 16% is spread over all older days.",
                incorrectExplanation: "The geometric weights over days 1 to 30 sum to $1 - \\lambda^{30} = 1 - 0.94^{30} \\approx 84\\%$; older days keep a small, positive weight."
            }
        },
        {
            correct: 3,
            en: {
                title: "EWMA versus a rolling window",
                text: "A crash happened 31 days ago. Compare a 30-day rolling standard deviation with EWMA ($\\lambda = 0.94$) today. Which statement is right?",
                options: [
                    "Both measures still give the crash its full original weight",
                    "EWMA has dropped the crash completely, the rolling window has not",
                    "Both measures drop the crash on the same day",
                    "The rolling estimate drops it at once; EWMA lets it fade"
                ],
                correctExplanation: "The equal-weight window has a cliff: on day 31 the crash leaves and the estimate can jump down. EWMA has no cliff: the crash keeps a small, shrinking weight.",
                incorrectExplanation: "A rolling window gives equal weight inside the window and zero outside, so the crash falls out abruptly; EWMA weights decay smoothly and never drop to zero."
            }
        },
        {
            correct: 1,
            en: {
                title: "GARCH(1,1) parameters",
                text: "In the generalised autoregressive conditional heteroskedasticity model GARCH(1,1), $\\sigma_t^2 = \\omega + \\alpha\\,\\varepsilon_{t-1}^2 + \\beta\\,\\sigma_{t-1}^2$. What does $\\beta$ measure?",
                options: [
                    "The reaction of today's variance to yesterday's squared shock",
                    "The memory of yesterday's conditional variance",
                    "The long-run (unconditional) variance",
                    "The thickness of the tails of the shocks"
                ],
                correctExplanation: "$\\beta$ multiplies yesterday's conditional variance: it carries yesterday's volatility level into today. $\\alpha$ is the reaction to news, $\\alpha + \\beta$ the persistence.",
                incorrectExplanation: "$\\alpha$ is the reaction to yesterday's shock, $\\beta$ the memory of yesterday's variance, and $\\omega/(1-\\alpha-\\beta)$ the long-run variance when $\\alpha + \\beta$ is below 1."
            }
        },
        {
            correct: 1,
            en: {
                title: "Half-life of a volatility shock",
                text: "For the S&P 500 (daily returns, 2018 to 18 September 2026) the GARCH(1,1)-t estimate gives $\\hat\\alpha + \\hat\\beta = 0.981$. What is the half-life of a volatility shock, $\\ln 0.5/\\ln(\\hat\\alpha + \\hat\\beta)$?",
                options: [
                    "About 19 trading days",
                    "About 36 trading days",
                    "About 52 trading days",
                    "About 98 trading days"
                ],
                correctExplanation: "$\\ln 0.5/\\ln 0.981 = -0.693/-0.0192 \\approx 36.1$ trading days: half of a volatility shock is gone after about seven weeks.",
                incorrectExplanation: "Divide $\\ln 0.5 = -0.693$ by $\\ln 0.981 = -0.0192$: the half-life is about 36 trading days."
            }
        },
        {
            correct: 3,
            en: {
                title: "Integrated GARCH",
                text: "For Bitcoin, the GARCH(1,1)-t estimate is at the bound $\\hat\\alpha + \\hat\\beta = 1$, with $\\hat\\omega = 0.144 > 0$. What does this imply for volatility forecasts?",
                options: [
                    "Forecasts revert quickly to a long-run variance equal to $\\hat\\omega$",
                    "Forecasts stay flat at today's level, exactly as with EWMA",
                    "The model is misspecified, so no forecast can be computed from it",
                    "No finite long-run variance; the forecast rises linearly in $h$"
                ],
                correctExplanation: "With $\\alpha + \\beta = 1$ (IGARCH) shocks never die out and $\\mathrm{E}_t[\\sigma_{t+h}^2] = \\sigma_{t+1}^2 + (h-1)\\,\\omega$: the forecast variance grows by $\\hat\\omega$ a day.",
                incorrectExplanation: "Under IGARCH with $\\omega > 0$ there is no mean to revert to and the variance forecast grows by $\\omega$ per day; it is flat only when $\\omega = 0$ (EWMA)."
            }
        },
        {
            correct: 0,
            en: {
                title: "EWMA as a special case",
                text: "EWMA with parameter $\\lambda$ is a special case of GARCH(1,1). Which parameter values give it?",
                options: [
                    "$\\omega = 0$, $\\alpha = 1 - \\lambda$, $\\beta = \\lambda$",
                    "$\\omega = \\lambda$, $\\alpha = 0$, $\\beta = 1 - \\lambda$",
                    "$\\omega = 1 - \\lambda$, $\\alpha = \\lambda$, $\\beta = 0$",
                    "$\\omega > 0$, $\\alpha = \\lambda$, $\\beta = 1 - \\lambda$"
                ],
                correctExplanation: "Setting $\\omega = 0$, $\\alpha = 1-\\lambda$, $\\beta = \\lambda$ gives $\\sigma_t^2 = \\lambda\\sigma_{t-1}^2 + (1-\\lambda)\\varepsilon_{t-1}^2$: an IGARCH without a constant, hence a flat forecast.",
                incorrectExplanation: "Match the EWMA recursion $\\sigma_t^2 = \\lambda\\sigma_{t-1}^2 + (1-\\lambda)\\varepsilon_{t-1}^2$ term by term: no constant, weight $1-\\lambda$ on the shock and $\\lambda$ on the past variance."
            }
        },
        {
            correct: 2,
            en: {
                title: "Student-t degrees of freedom",
                text: "In GARCH-t the standardised shocks $z_t$ follow a Student-t with $\\nu$ degrees of freedom, scaled to variance 1. For Bitcoin $\\hat\\nu = 3.13$. Which statement follows?",
                options: [
                    "The shocks are close to Normal, since $\\nu$ is above 2",
                    "The variance of $z_t$ is infinite, since $\\nu$ is below 4",
                    "$\\mathrm{E}[z_t^4]$ is infinite: moments exist only below order $\\nu$",
                    "All moments exist, but the distribution is strongly skewed to the left"
                ],
                correctExplanation: "Moments of order $k$ exist only for $k < \\nu$. With $\\nu = 3.13$ the variance exists (it is scaled to 1), but the fourth moment does not.",
                incorrectExplanation: "A Student-t has finite moments only of order below $\\nu$: with $\\nu \\approx 3.1$ the variance is finite, the fourth moment is not, and the Normal is the limit $\\nu \\to \\infty$."
            }
        },
        {
            correct: 3,
            en: {
                title: "Tails after filtering",
                text: "GARCH(1,1)-t estimates, 2018 to 18 September 2026: $\\hat\\nu = 3.13$ for Bitcoin, 3.19 for Ethereum, 5.85 for the S&P 500. What do these numbers show?",
                options: [
                    "GARCH filtering has removed the heavy tails of crypto returns",
                    "The S&P 500 has heavier-tailed shocks than Bitcoin and Ethereum",
                    "Crypto returns become Normal once volatility is modelled",
                    "Crypto shocks stay far more heavy-tailed than S&P 500 shocks"
                ],
                correctExplanation: "A lower $\\nu$ means heavier tails. $\\hat\\nu \\approx 3.1$ for crypto against 5.9 for the S&P 500: time-varying volatility explains part of the fat tails, not all of them.",
                incorrectExplanation: "Smaller $\\nu$ means heavier tails; values near 3 for crypto show that heavy tails remain in the standardised shocks after GARCH filtering."
            }
        },
        {
            correct: 1,
            en: {
                title: "Long-run volatility",
                text: "S&P 500, daily log returns in %, GARCH(1,1)-t: $\\hat\\omega = 0.035$, $\\hat\\alpha + \\hat\\beta = 0.981$. What is the annualised long-run volatility $\\sqrt{252\\,\\hat\\omega/(1-\\hat\\alpha-\\hat\\beta)}$?",
                options: [
                    "About 4.6%",
                    "About 21.6%",
                    "About 29.4%",
                    "About 1.4%"
                ],
                correctExplanation: "$0.035/0.019 \\approx 1.84$ is the daily long-run variance in %$^2$; times 252 gives about 464, whose square root is about 21.6% a year.",
                incorrectExplanation: "Long-run daily variance $\\omega/(1-\\alpha-\\beta) \\approx 1.84$; annualise with 252 trading days and take the square root: about 21.6%."
            }
        },
        {
            correct: 2,
            en: {
                title: "A large move is not high volatility",
                text: "From 19 September to 23 October 2026, gold fell 9.3%, while its realised annualised volatility was 19.3%, below the GARCH-t forecast of 23.2%. How do you read this?",
                options: [
                    "The GARCH forecast was too low, since gold fell sharply",
                    "Realised volatility must be wrong, since a 9.3% fall implies high volatility",
                    "A big move is not high volatility: the fall was steady",
                    "Gold's volatility model should be replaced by a model of its mean return"
                ],
                correctExplanation: "Volatility measures the size of daily moves, not the cumulative return. A string of moderate negative days gives a large fall with ordinary volatility.",
                incorrectExplanation: "Realised volatility is the root mean square of daily returns; a 9.3% cumulative fall built from moderate daily moves leaves it below the forecast."
            }
        },
        {
            correct: 0,
            en: {
                title: "Bitcoin forecasts by horizon",
                text: "On 18 September 2026, the GARCH-t model for Bitcoin gives annualised volatility forecasts of 52.7% at $h = 1$ and 126% at $h = 250$; EWMA is flat at 44.9%. Why does the GARCH-t forecast rise?",
                options: [
                    "With $\\hat\\alpha + \\hat\\beta = 1$ and $\\hat\\omega > 0$ the variance forecast grows by $\\hat\\omega$ each day",
                    "Volatility in September 2026 was below its long-run level, so the forecast reverts upward toward it",
                    "GARCH-t always scales today's volatility by $\\sqrt h$",
                    "The Student-t tails make long-horizon forecasts larger"
                ],
                correctExplanation: "In the IGARCH case there is no long-run level; with $\\omega > 0$ the forecast variance increases linearly in $h$. EWMA has $\\omega = 0$ and stays flat.",
                incorrectExplanation: "There is no long-run level to revert to when $\\alpha + \\beta = 1$; the rise comes from adding $\\hat\\omega = 0.144$ to the variance every day."
            }
        },
        {
            correct: 0,
            en: {
                title: "Ljung-Box for gold",
                text: "Gold, GARCH(1,1)-t standardised residuals: Ljung-Box $Q(10)$ of $\\hat z_t^2$ is 27.9 (5% critical value of $\\chi^2_{10}$: 18.31, p 0.002). What is the conclusion?",
                options: [
                    "Dependence remains in $\\hat z_t^2$; try a richer model",
                    "The model has removed all volatility clustering from gold returns",
                    "Gold returns are autocorrelated, so the mean equation is wrong",
                    "The test cannot be used for gold, which has no heavy tails"
                ],
                correctExplanation: "27.9 exceeds 18.31: we reject no autocorrelation of $\\hat z_t^2$ at lags 1 to 10. Some clustering is left after GARCH(1,1)-t; the permutation check (p 0.012) agrees.",
                incorrectExplanation: "A $Q(10)$ above the critical value rejects the null of no autocorrelation in $\\hat z_t^2$: volatility dependence remains after the model."
            }
        },
        {
            correct: 2,
            en: {
                title: "A large p-value",
                text: "Bitcoin: $Q(10)$ of $r_t^2$ is 97.6; after GARCH(1,1)-t, $Q(10)$ of $\\hat z_t^2$ is 5.5 ($\\chi^2_{10}$ p-value 0.855). What may we conclude?",
                options: [
                    "The test proves that the model is correct for Bitcoin at lags 1 to 10",
                    "The standardised residuals are shown to be i.i.d. Normal shocks",
                    "We do not detect autocorrelation in $\\hat z_t^2$ at lags 1 to 10",
                    "The model removed too much dependence and must be simplified"
                ],
                correctExplanation: "A large p-value means the test does not reject; it is not proof of independence, and other checks (for example on $|\\hat z_t|$) can still find dependence.",
                incorrectExplanation: "Not rejecting is not accepting: the test finds no evidence of autocorrelation in $\\hat z_t^2$, which is weaker than proving the model right."
            }
        },
        {
            correct: 1,
            en: {
                title: "Why the chi-square reference fails",
                text: "For Bitcoin's $\\hat z_t^2$, the $\\chi^2_{10}$ p-value of $Q(10)$ is 0.855, but a permutation p-value (999 reshuffles) is 0.232. Why can the two differ so much?",
                options: [
                    "The permutation test uses a different number of lags than Ljung-Box",
                    "The $\\chi^2$ reference needs $\\mathrm{E}[z_t^4] < \\infty$",
                    "The permutation test assumes Normal residuals, unlike Ljung-Box",
                    "999 reshuffles are too few to give any useful p-value"
                ],
                correctExplanation: "The asymptotic distribution of $Q$ for squared residuals needs a finite fourth moment. With $\\hat\\nu \\approx 3$ it is infinite, so the $\\chi^2$ p-value is unreliable; the permutation p-value does not need it.",
                incorrectExplanation: "Both use $Q(10)$; the difference is the reference distribution. The $\\chi^2$ approximation for $\\hat z_t^2$ needs finite fourth moments, which a Student-t with $\\nu \\approx 3$ lacks."
            }
        },
        {
            correct: 3,
            en: {
                title: "Absolute residuals",
                text: "Bitcoin: Ljung-Box $Q(10)$ of $|\\hat z_t|$ is 24.5 (p 0.006), while the permutation p-value for $\\hat z_t^2$ is 0.232. How should the model be judged?",
                options: [
                    "The model is adequate, since one of the two tests does not reject",
                    "The $|\\hat z_t|$ test is invalid with heavy tails, so it should be ignored",
                    "The returns themselves are predictable in direction",
                    "GARCH(1,1)-t leaves some clustering in the size of the shocks"
                ],
                correctExplanation: "The $|\\hat z_t|$ test needs only $\\nu > 2$ and is more powerful with heavy tails; it finds remaining dependence in the size of the shocks.",
                incorrectExplanation: "The check on $|\\hat z_t|$ needs only a finite variance, so it is valid here, and it rejects: some volatility clustering is left."
            }
        },
        {
            correct: 1,
            en: {
                title: "VaR definition",
                text: "With $F_t$ the conditional distribution of tomorrow's return and $p = 1\\%$, Value-at-Risk is $\\mathrm{VaR}_p = -F_t^{-1}(p)$. What does it state?",
                options: [
                    "The average loss on the worst 1% of days, as a positive number",
                    "The loss exceeded with probability 1%, as a positive number",
                    "The largest possible loss over one day, as a positive number",
                    "The loss exceeded with probability 99%, as a positive number"
                ],
                correctExplanation: "VaR 1% is minus the 1% quantile of the return: a threshold that the loss exceeds with probability 1%. The average beyond it is ES.",
                incorrectExplanation: "VaR is a quantile, a threshold, not an average and not a maximum; the average loss beyond the threshold is Expected Shortfall."
            }
        },
        {
            correct: 0,
            en: {
                title: "Subadditivity",
                text: "Artzner et al. (1999) call a risk measure coherent if, among other properties, it is subadditive: $\\rho(X+Y) \\le \\rho(X) + \\rho(Y)$. Which is right?",
                options: [
                    "ES is subadditive; VaR is not in general",
                    "VaR is subadditive; ES is not, since it averages the tail",
                    "Both are always subadditive, as both use quantiles",
                    "Neither is subadditive when tails are heavy"
                ],
                correctExplanation: "ES is coherent. VaR can violate subadditivity, so the VaR of a portfolio can exceed the sum of the VaRs of its parts.",
                incorrectExplanation: "Subadditivity holds for ES (a coherent measure) but can fail for VaR, which sees only a quantile of the tail."
            }
        },
        {
            correct: 3,
            en: {
                title: "VaR and ES in Basel",
                text: "For banks that use internal models for market-risk capital, what roles do VaR 1% and ES 2.5% play in the current Basel standard?",
                options: [
                    "VaR 1% sets capital; ES 2.5% is only reported",
                    "Both were replaced by supervisory stress tests in the 2019 standard",
                    "ES 2.5% sets capital and is also the statistic backtested by the traffic light",
                    "ES 2.5% sets capital; VaR 1% is still used in backtesting"
                ],
                correctExplanation: "The 2019 standard (MAR33) uses ES 2.5% for capital; backtesting (MAR32) still counts exceptions of VaR 1%, which can be checked hit by hit.",
                incorrectExplanation: "Capital moved to ES 2.5%, but the traffic-light backtest still counts VaR 1% exceptions, since ES cannot be backtested hit by hit."
            }
        },
        {
            correct: 2,
            en: {
                title: "VaR 1% and ES 2.5% under the Normal",
                text: "Under the Normal distribution, $\\mathrm{VaR}_{1\\%} = 2.326\\,\\sigma$ and $\\mathrm{ES}_{2.5\\%} = 2.338\\,\\sigma$. What changes under heavy tails?",
                options: [
                    "Nothing: the two remain almost equal for any distribution",
                    "VaR 1% becomes larger than ES 2.5%",
                    "ES 2.5% becomes larger, since it averages a heavier tail",
                    "Both become smaller, since $\\sigma$ absorbs the tails"
                ],
                correctExplanation: "The two coincide almost exactly only for the Normal. With heavy tails the losses beyond the 2.5% quantile are larger, so ES 2.5% exceeds VaR 1% (for Bitcoin GARCH-t: 7.97% against 7.23%).",
                incorrectExplanation: "The near-equality 2.326 against 2.338 is a property of the Normal; heavy tails raise the average beyond the quantile, so ES 2.5% exceeds VaR 1%."
            }
        },
        {
            correct: 2,
            en: {
                title: "Computing a GARCH-t VaR",
                text: "Bitcoin on 18 September 2026: $\\hat\\sigma_{t+1} = 2.761\\%$, $\\hat\\mu = 0.06\\%$, scale factor $s = \\sqrt{(\\nu-2)/\\nu} = 0.600$, Student-t quantile $t^{-1}_{3.126}(0.01) = -4.398$. What is the one-day VaR 1%, $-(\\hat\\mu + \\hat\\sigma_{t+1}\\,s\\,q)$?",
                options: [
                    "4.40%",
                    "6.45%",
                    "7.23%",
                    "12.1%"
                ],
                correctExplanation: "$-0.06 + 2.761 \\times 0.600 \\times 4.398 = 7.23\\%$. The factor $s$ rescales the Student-t to variance 1.",
                incorrectExplanation: "Multiply the volatility by the scale factor and the quantile, $2.761 \\times 0.600 \\times 4.398 \\approx 7.29$, then subtract the mean 0.06: 7.23%. Omitting $s$ gives about 12.1%."
            }
        },
        {
            correct: 3,
            en: {
                title: "Model risk",
                text: "Bitcoin one-day VaR 1% for 19 September 2026: Normal 7.75%, historical simulation (HS, 500 days) 5.43%, EWMA 5.47%, GARCH-t 7.23%. What does this spread show?",
                options: [
                    "The average of the four is the correct VaR",
                    "The lowest VaR is the best, since it ties up the least capital",
                    "The methods agree once rounding is taken into account",
                    "Model risk: the four figures differ by up to 43%"
                ],
                correctExplanation: "7.75/5.43 is about 1.43: the capital set aside depends heavily on the method. This is model risk; only a backtest can say which method is right.",
                incorrectExplanation: "The same position on the same day has VaR between 5.4% and 7.8% depending on the method: model risk, to be resolved by backtesting, not by averaging or picking the smallest."
            }
        },
        {
            correct: 0,
            en: {
                title: "ES relative to VaR by method",
                text: "Bitcoin, one-day horizon, 19 September 2026: Normal VaR 1% 7.75% and ES 2.5% 7.79%; EWMA 5.47% and 5.49%; GARCH-t 7.23% and 7.97%. What explains the pattern?",
                options: [
                    "Normal-based methods set ES almost equal to VaR",
                    "GARCH-t overstates ES because of an estimation error in $\\nu$",
                    "EWMA ignores the tail because its memory is only about 17 days",
                    "ES and VaR should be equal, so GARCH-t is miscalibrated"
                ],
                correctExplanation: "Under the Normal, ES 2.5% and VaR 1% are almost equal by construction. GARCH-t with $\\hat\\nu = 3.13$ puts more mass in the tail, so ES exceeds VaR by 10%.",
                incorrectExplanation: "The gap between ES 2.5% and VaR 1% reflects the tail shape assumed: almost none under the Normal (Normal and EWMA), about 10% under the Student-t with $\\hat\\nu \\approx 3.1$."
            }
        },
        {
            correct: 1,
            en: {
                title: "The independence test",
                text: "The hit sequence is $I_t = 1$ if the return falls below $-\\mathrm{VaR}_t$. What does the Christoffersen (1998) independence test $\\mathrm{LR}_{ind}$ check?",
                options: [
                    "Whether the share of hits equals the VaR level $p$",
                    "Whether a hit today changes the chance of a hit tomorrow",
                    "Whether the size of losses beyond VaR is correct",
                    "Whether the VaR forecasts are independent of the returns"
                ],
                correctExplanation: "$\\mathrm{LR}_{ind}$ compares the hit probability after a hit ($\\hat\\pi_{11}$) with that after no hit ($\\hat\\pi_{01}$). The hit rate is Kupiec's test; tail size is the ES check.",
                incorrectExplanation: "Kupiec tests the hit rate; Christoffersen's independence test asks whether hits follow each other more often than chance, using transitions between hit and no-hit days."
            }
        },
        {
            correct: 3,
            en: {
                title: "Kupiec test",
                text: "Normal VaR 1% on a 250-day window, Bitcoin, 2 453 days (2020 to 18 September 2026): 45 hits, $\\mathrm{LR}_{uc} = 13.84$. The 5% critical value of $\\chi^2_1$ is 3.84. What follows?",
                options: [
                    "We do not reject correct coverage, since 45 is close to 24.5",
                    "The model is too conservative, since it has too few hits",
                    "The test is inconclusive, since it needs exactly 250 days",
                    "We reject correct coverage: 45 hits against 24.5 expected"
                ],
                correctExplanation: "$13.84 > 3.84$: the hit rate 1.83% is significantly above 1%. The Normal VaR underestimates Bitcoin's tail risk.",
                incorrectExplanation: "Expected hits are $np = 0.01 \\times 2453 = 24.5$; 45 hits gives $\\mathrm{LR}_{uc} = 13.84$, above 3.84, so correct coverage is rejected."
            }
        },
        {
            correct: 0,
            en: {
                title: "Basel traffic light",
                text: "A VaR 1% model has 5 hits in the last 250 trading days. In which Basel zone is it?",
                options: [
                    "Amber (5 to 9 hits)",
                    "Green (0 to 4 hits)",
                    "Red (5 or more hits)",
                    "Green, since 5 hits in 250 days is a 2% rate, close to 1%"
                ],
                correctExplanation: "The Basel traffic light at VaR 1% over 250 days: green 0 to 4 hits, amber 5 to 9, red 10 or more.",
                incorrectExplanation: "The zones are green 0 to 4, amber 5 to 9 and red 10 or more exceptions in 250 days; 5 hits is the first amber count."
            }
        },
        {
            correct: 1,
            en: {
                title: "HS against GARCH-t",
                text: "Backtest 2020 to 18 September 2026, Bitcoin VaR 1%: HS (500 days) 25 hits, mean VaR 8.64%; GARCH-t 28 hits, mean VaR 8.12%. No test rejects either. Which reading is best?",
                options: [
                    "HS is better, since its 25 hits are closer to the 24.5 expected",
                    "Similar coverage, but GARCH-t needs less capital on average",
                    "GARCH-t is rejected, since 28 hits exceed the 24.5 expected",
                    "The two models are identical for practical purposes"
                ],
                correctExplanation: "Neither is rejected. GARCH-t raises VaR quickly after shocks and lowers it in calm periods, so it reaches similar coverage with less capital on average than the slow-moving HS.",
                incorrectExplanation: "25 and 28 hits are both consistent with 24.5 expected; the difference is the capital: 8.12% for GARCH-t against 8.64% for HS on average."
            }
        },
        {
            correct: 2,
            en: {
                title: "Too many hits, not clustered",
                text: "EWMA-Normal VaR 1%, Bitcoin backtest: 51 hits (2.08%), $\\mathrm{LR}_{uc} = 22.01$ (p below 0.001), $\\mathrm{LR}_{ind} = 0.00$ (p 0.952). What do the two tests say together?",
                options: [
                    "The model passes overall, since the independence test does not reject",
                    "The hits cluster, but their number is right",
                    "Hits are about twice as frequent as promised, but not clustered",
                    "Both tests reject, so the model fails in every respect"
                ],
                correctExplanation: "Kupiec rejects the 1% rate; Christoffersen does not detect clustering. EWMA reacts to news, so hits are spread out, but its Normal tails are too thin.",
                incorrectExplanation: "Unconditional coverage fails (too many hits); independence is not rejected. A model can react well to volatility and still have the wrong tail."
            }
        },
        {
            correct: 0,
            en: {
                title: "Checking ES",
                text: "On days beyond the 2.5% VaR, the ratio of realised loss to predicted ES is averaged: $\\bar R$. Normal VaR on 250 days, Bitcoin, 2020 to 2026: $\\bar R = 1.26$, 95% bootstrap interval 1.13 to 1.44. How do you read it?",
                options: [
                    "Realised tail losses were about 26% above the predicted ES",
                    "The Normal ES is about right, since 1.26 is close to 1",
                    "The Normal ES is too conservative: realised losses were smaller",
                    "The result shows that ES cannot be checked at all"
                ],
                correctExplanation: "A correct model has $\\bar R \\approx 1$. An interval wholly above 1 indicates that the Normal ES underestimates tail losses; HS (1.00) and GARCH-t (0.97) contain 1.",
                incorrectExplanation: "$\\bar R > 1$ means losses beyond VaR exceed the predicted ES; with the interval 1.13 to 1.44 excluding 1, the Normal underestimates the tail."
            }
        },
        {
            correct: 3,
            en: {
                title: "Five weeks without a hit",
                text: "From 19 September to 23 October 2026 (35 days), none of the four Bitcoin VaR 1% methods had a hit. A correct model gives zero hits with probability $0.99^{35} = 0.703$. What may we conclude?",
                options: [
                    "All four methods are now validated by five weeks without a hit",
                    "The Normal model is fine again, since it had no hits",
                    "The models are too conservative, so VaR should be lowered",
                    "Nothing: zero hits is likely even with a 2% true hit rate"
                ],
                correctExplanation: "35 days have almost no power: detecting 2% against 1% with probability 0.8 at the 5% level needs about 900 days. The long backtest, not this window, discriminates.",
                incorrectExplanation: "Zero hits is the most likely outcome for both a correct model (0.703) and a bad one (0.493); five weeks cannot separate them."
            }
        }
    ]
};
