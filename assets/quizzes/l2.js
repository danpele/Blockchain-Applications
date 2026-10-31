// ============================================================
// Practice quiz bank for Lecture 2: Stylized Facts, Efficiency and Bubbles (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l2'] = {
    draw: 15,
    questions: [
        {
            correct: 1,
            en: {
                title: "Annualising Bitcoin volatility",
                text: "The standard deviation of Bitcoin's daily log returns, 2018--2026, is $s = 3.355\\%$. Bitcoin trades every day of the year. What is its annual volatility $\\sigma_a = s\\sqrt{A}$?",
                options: [
                    "53.3% a year",
                    "64.1% a year",
                    "1 224.6% a year",
                    "40.3% a year"
                ],
                correctExplanation: "With $A = 365$ returns a year, $\\sqrt{365} = 19.10$ and $19.10 \\times 3.355 = 64.1\\%$.",
                incorrectExplanation: "Use the square root of the number of returns per year, $\\sqrt{365}$ for crypto; $\\sqrt{252}$ gives 53.3% and multiplying by 365 instead of its square root inflates the figure."
            }
        },
        {
            correct: 3,
            en: {
                title: "Which calendar for annualising",
                text: "A treasurer annualises the volatility of Bitcoin and of the S&P 500 (Standard & Poor's 500) with $\\sqrt{252}$ for both, so that the two are 'comparable'. What is the effect?",
                options: [
                    "None: the number of days cancels out when comparing two assets",
                    "Bitcoin's volatility is overstated, since weekends are quiet days",
                    "The S&P 500 volatility is understated by about 17%",
                    "Bitcoin's volatility is understated by about 17%, as it trades daily"
                ],
                correctExplanation: "Each asset must be annualised with its own calendar: 365 returns a year for crypto, about 252 for stocks. Using 252 for Bitcoin gives 53.3% instead of 64.1%.",
                incorrectExplanation: "A 7-day market has 365 returns a year; $\\sqrt{252}$ understates Bitcoin's annual volatility by about 17%, while 252 is right for the S&P 500."
            }
        },
        {
            correct: 0,
            en: {
                title: "From log return to loss",
                text: "On 12 March 2020 Bitcoin's daily log return was $-46.5\\%$. What fraction of the value held was lost that day?",
                options: [
                    "About 37.2%",
                    "Exactly 46.5%",
                    "About 59.2%",
                    "About 53.5%"
                ],
                correctExplanation: "The simple return is $e^{-0.465} - 1 = -37.2\\%$: for large moves the log return and the percentage change differ substantially.",
                incorrectExplanation: "Convert a log return $r$ to a simple return with $e^{r} - 1$; $e^{-0.465} - 1 = -37.2\\%$."
            }
        },
        {
            correct: 2,
            en: {
                title: "Negative skewness",
                text: "Bitcoin's daily returns, 2018--2026, have skewness $-0.95$. What does a negative skewness mean?",
                options: [
                    "The average daily return is negative",
                    "More than half of the days are losing days",
                    "The left tail (losses) is longer than the right",
                    "Volatility falls after large losses"
                ],
                correctExplanation: "Skewness is 0 for a symmetric distribution; a negative value means the distribution stretches further to the left, so extreme losses are larger than extreme gains.",
                incorrectExplanation: "Skewness describes the asymmetry of the tails, not the sign of the mean or the share of losing days; negative means a longer left tail."
            }
        },
        {
            correct: 1,
            en: {
                title: "Excess kurtosis",
                text: "The excess kurtosis $\\hat K$ of Bitcoin's daily returns, 2018--2026, is 14.8. What does a positive excess kurtosis indicate?",
                options: [
                    "Returns are about 14.8 times as volatile as those of the S&P 500",
                    "More extreme days than the Normal distribution predicts",
                    "The returns are skewed to the right",
                    "The mean return is 14.8 standard deviations above zero"
                ],
                correctExplanation: "Excess kurtosis is 0 for the Normal distribution. A positive value means heavy tails: too many quiet days and too many extreme days, too few in between.",
                incorrectExplanation: "Kurtosis measures tail heaviness, not volatility level or asymmetry; positive excess kurtosis means more extreme days than under the Normal distribution."
            }
        },
        {
            correct: 3,
            en: {
                title: "What drives the Jarque--Bera statistic",
                text: "Bitcoin, 2018--2026: $n = 3\\,183$, skewness $\\hat S = -0.945$, excess kurtosis $\\hat K = 14.825$. The Jarque--Bera statistic $\\mathrm{JB} = \\frac{n}{6}(\\hat S^2 + \\hat K^2/4) = 530.5 \\times (0.893 + 54.945) \\approx 29\\,620$. Which part of the departure from normality dominates?",
                options: [
                    "The skewness, because it is negative",
                    "The sample size, because $n/6 = 530.5$ is the largest number",
                    "Skewness and kurtosis equally, since both enter squared",
                    "The kurtosis: 54.9 of the 55.8 inside the bracket"
                ],
                correctExplanation: "Almost the whole bracket comes from $\\hat K^2/4 = 54.9$; the skewness term is 0.9. The problem is the tails, not the asymmetry.",
                incorrectExplanation: "Compare the two terms in the bracket: 0.893 from skewness against 54.945 from kurtosis; heavy tails drive the rejection."
            }
        },
        {
            correct: 0,
            en: {
                title: "Comparing Jarque--Bera values",
                text: "Jarque--Bera statistics, 2018--2026: Bitcoin 29 620 ($n = 3\\,183$), gold 10 041 ($n = 2\\,268$). Excess kurtosis: Bitcoin 14.8, gold 10.2. A colleague says Bitcoin is three times further from the Normal distribution than gold. What is the right response?",
                options: [
                    "JB grows with $n$; compare the skewness and kurtosis themselves",
                    "Correct: JB is a distance measure, so its ratio gives the relative distance from normality",
                    "Wrong: gold is further from normality, since its JB is above the critical value 5.99 by more in relative terms",
                    "Wrong: neither asset rejects normality, since both p-values are below 5%"
                ],
                correctExplanation: "JB is proportional to $n$, so samples of different size give different JB for the same shape. With $n$ in the thousands every asset rejects; the size of $\\hat K$ matters more than the statistic or its p-value.",
                incorrectExplanation: "JB scales with the sample size; for comparing shapes, look at the skewness and excess kurtosis, not the ratio of test statistics."
            }
        },
        {
            correct: 2,
            en: {
                title: "Days beyond 5%",
                text: "In daily log returns from 1 January 2018 to 18 September 2026, the share of days with $|r| > 5\\%$ is 10.7% for Bitcoin and 0.6% for the S&P 500. How do you read the Bitcoin figure?",
                options: [
                    "Bitcoin falls by more than 5% on about one day in nine",
                    "Bitcoin's annual return exceeds 5% in about 11% of the years",
                    "Bitcoin moves by more than 5%, up or down, on about one day in nine",
                    "Bitcoin's volatility is 10.7 times that of the S&P 500"
                ],
                correctExplanation: "$|r| > 5\\%$ counts moves in either direction; 10.7% of the days is about one day in nine. The S&P 500 does so on 0.6% of its trading days.",
                incorrectExplanation: "The absolute value counts gains and losses alike; 10.7% of the days is roughly one day in nine."
            }
        },
        {
            correct: 1,
            en: {
                title: "Heavy tails beyond crypto",
                text: "Excess kurtosis of daily log returns, 1 January 2018 -- 18 September 2026: Bitcoin 14.8, Ethereum 11.1, S&P 500 14.9, gold 10.2. Which statement does this table support?",
                options: [
                    "Heavy tails are a feature of crypto only; equities are close to Normal",
                    "The S&P 500's excess kurtosis (14.9) is as high as Bitcoin's (14.8)",
                    "The S&P 500 is riskier than Bitcoin, since its kurtosis is higher",
                    "Gold has the thinnest tails and therefore the lowest volatility"
                ],
                correctExplanation: "Kurtosis is scale-free: it describes the shape of the distribution, not its width. The S&P 500 is much less volatile (19.2% against 64.1% a year) but has tails as heavy relative to its own volatility.",
                incorrectExplanation: "Kurtosis measures tail shape relative to the standard deviation, not the level of risk; all four assets are heavy-tailed."
            }
        },
        {
            correct: 3,
            en: {
                title: "How rare is a 4-sigma day?",
                text: "Under the Normal distribution $P(|z| > 4) = 0.0063\\%$, so in 3 183 days we would expect about 0.2 days beyond 4 standard deviations. Bitcoin, 2018--2026, had 17 such days. What does this mean for a risk model?",
                options: [
                    "17 days is within sampling error of 0.2, so the Normal model is adequate",
                    "The excess comes from the COVID-19 crash alone and can be ignored",
                    "Bitcoin's standard deviation is underestimated by a factor of 85",
                    "A model built on the Normal distribution badly understates crash risk"
                ],
                correctExplanation: "Observing 17 days where the Normal predicts 0.2 means the Normal tails are far too thin. A Value at Risk computed with the Normal distribution will be exceeded much more often than it promises.",
                incorrectExplanation: "17 extreme days against 0.2 expected is a large failure of the Normal tails, not sampling error or a single event."
            }
        },
        {
            correct: 0,
            en: {
                title: "Reading a QQ plot",
                text: "In a quantile--quantile (QQ) plot of daily returns against Normal quantiles, the points follow the reference line in the middle but bend away from it at both ends. What does this show?",
                options: [
                    "Heavy tails: extremes are larger than under the Normal distribution",
                    "Thin tails: extreme returns are smaller than the Normal distribution predicts",
                    "A positive mean return, shifting all points upwards",
                    "Volatility clustering over time"
                ],
                correctExplanation: "Normal data lie on the line. Points beyond the line at both ends mean the empirical extreme quantiles are further out than the Normal ones: heavy tails.",
                incorrectExplanation: "Deviations at both ends of a QQ plot concern the tails; bending away from the line outward means heavier tails than the Normal distribution."
            }
        },
        {
            correct: 2,
            en: {
                title: "Rolling volatility",
                text: "Volatility on about one month (30 daily returns $\\times\\sqrt{365}$ for crypto, 21 returns $\\times\\sqrt{252}$ for the S&P 500): medians 54% for Bitcoin, 77% for Ethereum, 12% for the S&P 500. Bitcoin's volatility trends down, but it was below that of the S&P 500 on only 0.1% of the days. What follows?",
                options: [
                    "Bitcoin has become as volatile as equities in recent years",
                    "Bitcoin's volatility has been constant over the sample",
                    "Bitcoin stays far more volatile than equities on almost every day",
                    "Ethereum was less volatile than Bitcoin on most days since 2018"
                ],
                correctExplanation: "A falling trend does not close the gap: Bitcoin's monthly volatility exceeded the S&P 500's on 99.9% of the days, with a median of 54% against 12%.",
                incorrectExplanation: "Being below the S&P 500 on 0.1% of the days means Bitcoin was more volatile on almost every day, despite its downward trend."
            }
        },
        {
            correct: 1,
            en: {
                title: "Two autocorrelation functions",
                text: "Why does one look at the autocorrelation function (ACF) of squared returns $r_t^2$, in addition to that of returns $r_t$?",
                options: [
                    "Squaring removes the sign and the outliers, so the ACF becomes more precise",
                    "$r_t^2$ shows if the size of moves is predictable, $r_t$ the direction",
                    "The ACF of $r_t^2$ is a test of whether returns are Normal",
                    "The ACF of $r_t^2$ measures the long-run trend in prices"
                ],
                correctExplanation: "Squared returns measure the size of moves regardless of sign. Positive autocorrelation in $r_t^2$ means large moves follow large moves (volatility clustering), even when the direction is unpredictable.",
                incorrectExplanation: "$r_t$ carries the direction, $r_t^2$ the size of the move; their ACFs answer two different predictability questions."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading Ljung--Box results",
                text: "Bitcoin daily log returns, 18 September 2014 -- 18 September 2026 ($n = 4\\,384$), Ljung--Box test with $m = 10$ lags: $Q = 20.2$ (p-value 0.028) for $r_t$, $Q = 212.7$ for $r_t^2$; the 5% critical value of $\\chi^2_{10}$ is 18.3. What is the conclusion at 5%?",
                options: [
                    "Neither $r_t$ nor $r_t^2$ shows autocorrelation at 5%",
                    "$r_t$ is strongly predictable, while $r_t^2$ is not",
                    "Only $r_t^2$ rejects, since a p-value of 0.028 is not significant",
                    "Both reject: weak dependence in $r_t$, strong in $r_t^2$"
                ],
                correctExplanation: "20.2 is just above 18.3 (p 0.028): weak dependence in returns. 212.7 is far above it: strong dependence in squared returns, i.e. volatility clustering.",
                incorrectExplanation: "Both statistics exceed 18.3, but by very different margins: weak dependence in returns, strong dependence in squared returns."
            }
        },
        {
            correct: 0,
            en: {
                title: "Bitcoin and equities",
                text: "Rolling correlation of daily returns of Bitcoin and the S&P 500 (250 common days): 0.02 on average before 2020, 0.39 on average since, peak 0.57 in February 2023. How should a portfolio manager read this?",
                options: [
                    "Bitcoin now co-moves with equities, as a risk asset would",
                    "Bitcoin has become a safe haven, since its correlation with equities is below 1",
                    "Bitcoin now moves one-for-one with the S&P 500",
                    "The correlation is too low to matter for any portfolio"
                ],
                correctExplanation: "A correlation rising from 0.02 to about 0.4 means Bitcoin tends to fall when equities fall, as in 2022 when both dropped while interest rates rose. That is the behaviour of a risk asset, not of a hedge.",
                incorrectExplanation: "A positive correlation of about 0.4 since 2020 means Bitcoin often falls with equities; it is moderate, not one-for-one, and it reduces diversification."
            }
        },
        {
            correct: 2,
            en: {
                title: "Aligning calendars before a correlation",
                text: "Bitcoin trades seven days a week; the S&P 500 trades Monday to Friday. For the rolling correlation, prices are joined on common days first, and only then are returns computed. Why?",
                options: [
                    "To remove weekends, which are always calm days for Bitcoin",
                    "To increase the number of observations used in each window",
                    "So that each pair of returns covers the same period, e.g. Friday to Monday",
                    "Because returns cannot be computed for days when the S&P 500 is closed"
                ],
                correctExplanation: "If Bitcoin's Monday return covered only Sunday to Monday while the S&P 500's covered Friday to Monday, the two returns would refer to different periods and the correlation would be biased downwards.",
                incorrectExplanation: "Returns must span the same interval for both assets; joining prices on common days first makes each pair of returns cover the same period."
            }
        },
        {
            correct: 3,
            en: {
                title: "Weak-form efficiency",
                text: "According to Fama (1970), what characterises a weak-form efficient market?",
                options: [
                    "Prices equal the discounted value of future cash flows",
                    "Insiders cannot earn abnormal returns from private information",
                    "Returns follow the Normal distribution",
                    "Past prices do not help to predict future returns"
                ],
                correctExplanation: "Weak-form efficiency concerns the information in past prices: if they predicted returns, traders would exploit the pattern until it disappeared.",
                incorrectExplanation: "The weak form is about past prices only; it says nothing about fundamental value, private information or the shape of the return distribution."
            }
        },
        {
            correct: 1,
            en: {
                title: "Reading a variance ratio",
                text: "The variance ratio is $\\mathrm{VR}(q) = \\mathrm{Var}(r_t + \\dots + r_{t-q+1}) / (q\\,\\mathrm{Var}(r_t))$. What does a value below 1 suggest?",
                options: [
                    "Momentum: moves tend to continue in the same direction",
                    "Mean reversion: moves tend to be undone",
                    "A random walk with no predictability",
                    "Volatility that rises with the horizon"
                ],
                correctExplanation: "If returns are negatively autocorrelated, multi-day returns vary less than $q$ times the daily variance, so VR is below 1: reversals.",
                incorrectExplanation: "VR = 1 is a random walk; VR above 1 indicates momentum and VR below 1 indicates mean reversion."
            }
        },
        {
            correct: 0,
            en: {
                title: "Ethereum's variance ratios",
                text: "Ethereum daily log returns, 2016 -- 18 September 2026: $\\mathrm{VR}(2) = 0.988$, $\\mathrm{VR}(5) = 1.067$, $\\mathrm{VR}(10) = 1.137$; the robust statistic $Z^*(5) = 1.17$ (p-value 0.241). What is the conclusion at 5%?",
                options: [
                    "We do not reject $\\mathrm{VR}(5) = 1$ at 5%",
                    "We reject a random walk, since $\\mathrm{VR}(10)$ is above 1",
                    "Ethereum shows significant momentum at five days",
                    "Ethereum is proven to be weak-form efficient"
                ],
                correctExplanation: "$|Z^*(5)| = 1.17 < 1.96$ and the p-value 0.241 exceeds 0.05, so we do not reject. Point estimates above 1 are not evidence of momentum without a significant test.",
                incorrectExplanation: "The test decides, not the point estimate: $|Z^*| = 1.17$ is below 1.96, so we do not reject, which is not a proof of efficiency."
            }
        },
        {
            correct: 2,
            en: {
                title: "The S&P 500 variance ratios",
                text: "S&P 500 daily log returns since 2014: $\\mathrm{VR}(2) = 0.875$, $\\mathrm{VR}(5) = 0.849$, $\\mathrm{VR}(10) = 0.813$; robust $Z^*(5) = -1.28$ (p-value 0.201). How do you read these numbers?",
                options: [
                    "Significant mean reversion: a contrarian strategy is profitable",
                    "Significant momentum, since the ratios fall with the horizon",
                    "Estimates point to reversals, but $\\mathrm{VR}(5) = 1$ is not rejected",
                    "The ratios below 1 prove that the S&P 500 is more efficient than Bitcoin"
                ],
                correctExplanation: "Ratios below 1 point towards mean reversion, but $|Z^*(5)| = 1.28 < 1.96$: the deviation is not significant at 5%, and profitability after costs is a separate question.",
                incorrectExplanation: "Below-1 ratios suggest reversals, yet the robust test does not reject at 5%; neither significance nor profitability follows."
            }
        },
        {
            correct: 1,
            en: {
                title: "What not rejecting does not show",
                text: "Robust variance-ratio tests do not reject $\\mathrm{VR}(q) = 1$ for Bitcoin at 2 to 10 days, in any sub-period 2014--2017, 2018--2021, 2022--2026. Which statement goes too far?",
                options: [
                    "No linear predictability of returns from past returns is detected at these horizons",
                    "Bitcoin is efficient, so no trading rule based on any information can be profitable",
                    "Nonlinear patterns, or patterns conditional on volume or news, are not tested",
                    "Whether a strategy is profitable after trading costs and risk is a separate question"
                ],
                correctExplanation: "Failing to reject one implication of weak-form efficiency does not prove efficiency, and says nothing about rules that use other information or nonlinear patterns.",
                incorrectExplanation: "Not rejecting a linear test at some horizons is not a proof of efficiency and does not cover nonlinear patterns or other information."
            }
        },
        {
            correct: 3,
            en: {
                title: "Unpredictable but mispriced?",
                text: "Suppose Bitcoin's returns are fully unpredictable from past prices. What does this imply about Bitcoin's price level?",
                options: [
                    "The price equals Bitcoin's fundamental value",
                    "The price is a bubble, since there are no cash flows",
                    "The price must follow its log-linear trend",
                    "Nothing: it can still be far from any fundamental value"
                ],
                correctExplanation: "Weak-form efficiency concerns predictability, not correct pricing. Bitcoin has no dividends or profits to discount, so any fundamental value must come from use (payments, settlement, collateral, network size).",
                incorrectExplanation: "Unpredictability says nothing about whether the price is right; a price can be unpredictable and far from fundamental value, or close to it."
            }
        },
        {
            correct: 0,
            en: {
                title: "Recovering from a drawdown",
                text: "Bitcoin's maximum drawdown since 2016 is $-83.4\\%$. A loss of $d$ needs a gain of $d/(1-d)$ to recover. What gain is needed to return to the previous record?",
                options: [
                    "+502%",
                    "+83.4%",
                    "+166.8%",
                    "About +120%"
                ],
                correctExplanation: "$0.834/0.166 = 5.02$: the price must rise to about six times its trough, a gain of about 502%.",
                incorrectExplanation: "Divide the loss by what is left after it: $0.834/0.166 \\approx 5.02$, i.e. +502%; a loss is not undone by a gain of the same percentage."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading drawdown statistics",
                text: "Daily closes since 2016: maximum drawdowns are $-83.4\\%$ for Bitcoin, $-94.0\\%$ for Ethereum and $-33.9\\%$ for the S&P 500. Bitcoin spent 76% of the days more than 10% below its last record, the S&P 500 16%. What does the 76% measure?",
                options: [
                    "The probability that Bitcoin loses more than 10% in one day",
                    "The share of days on which Bitcoin fell",
                    "The average loss of Bitcoin from its record",
                    "The share of days more than 10% below the last record"
                ],
                correctExplanation: "The drawdown $D_t = P_t/\\max_{s \\le t} P_s - 1$ compares today's price with the highest previous price; on 76% of the days it was below $-10\\%$.",
                incorrectExplanation: "The 76% is a share of days with a drawdown deeper than 10% from the running maximum, not a daily loss or an average."
            }
        },
        {
            correct: 2,
            en: {
                title: "The critical time in LPPL",
                text: "In the log-periodic power law (LPPL) model, $\\ln P_t = A + B(t_c - t)^m + C(t_c - t)^m \\cos(\\omega \\ln(t_c - t) - \\phi) + \\varepsilon_t$. What is $t_c$?",
                options: [
                    "The date on which the price will certainly crash",
                    "The date of the highest price in the estimation window",
                    "The end of the fitted bubble regime, not a sure crash date",
                    "The first date of the estimation window"
                ],
                correctExplanation: "$t_c$ is the critical time at which the fitted super-exponential growth would end; the crash hazard rises as $t \\to t_c$, but the model does not promise a crash on that date.",
                incorrectExplanation: "$t_c$ is a model parameter marking the end of the fitted bubble regime; it is not an observed peak and not a certain crash date."
            }
        },
        {
            correct: 0,
            en: {
                title: "Why 'log-periodic'",
                text: "In the LPPL (log-periodic power law) model, the peaks of the cosine come at times $t_k$ with $(t_c - t_{k+1})/(t_c - t_k) = e^{-2\\pi/\\omega}$. What does this imply for the oscillations?",
                options: [
                    "Gaps between peaks shrink geometrically towards $t_c$",
                    "The peaks are equally spaced in calendar time, every $2\\pi/\\omega$ days",
                    "The oscillations fade out as $t$ approaches $t_c$",
                    "The oscillations repeat every $\\omega$ days"
                ],
                correctExplanation: "Each gap to $t_c$ is a constant fraction $e^{-2\\pi/\\omega}$ of the previous one, so the peaks get closer and closer: periodic in $\\ln(t_c - t)$, not in $t$.",
                incorrectExplanation: "The ratio of successive distances to $t_c$ is constant, so the spacing shrinks geometrically: the oscillations speed up near $t_c$."
            }
        },
        {
            correct: 1,
            en: {
                title: "A good LPPL fit",
                text: "An LPPL (log-periodic power law) fit on Bitcoin's daily log close, 1 January -- 1 December 2017, gives $R^2 = 0.98$ and $\\hat t_c$ = 25 December 2017; the actual peak came on 16 December 2017. What does the high $R^2$ not tell you?",
                options: [
                    "That the model describes the 2017 price path closely in sample",
                    "That the crash date was forecastable in real time",
                    "That prices in 2017 grew faster than exponentially",
                    "That the fitted $\\hat B$ is negative"
                ],
                correctExplanation: "A window chosen with hindsight and a flexible seven-parameter curve can fit almost any run-up. A high in-sample $R^2$ is a good retrospective fit, not evidence of a reliable dated forecast.",
                incorrectExplanation: "$R^2$ measures in-sample fit on a hindsight window; it does not show that the crash date was predictable in real time."
            }
        },
        {
            correct: 3,
            en: {
                title: "Fits at the bounds",
                text: "Eleven weekly LPPL window ends, 1 October -- 10 December 2017, all starting 1 January 2017: nine of eleven fits sit at the bounds $m = 0.9$ and $\\omega = 13$, with $\\hat t_c$ between 1 and 7 January 2018; only one window gives an interior fit. What does this suggest?",
                options: [
                    "The bubble was clearly identified, since $\\hat t_c$ is stable in early January",
                    "The bounds are too wide and should be removed to improve the fit",
                    "The crash was correctly forecast for early January 2018",
                    "The constraints drive the fits, so $\\hat t_c$ is not a reliable date"
                ],
                correctExplanation: "When the optimiser stops at the edge of the allowed range, the data do not pin the parameters down; the apparent stability of $\\hat t_c$ comes from the bounds, not from the data.",
                incorrectExplanation: "Fits stuck at $m = 0.9$ and $\\omega = 13$ are boundary solutions; the resulting $\\hat t_c$ reflects the constraints and is not a dependable forecast."
            }
        },
        {
            correct: 2,
            en: {
                title: "Metcalfe's law as a regression",
                text: "Metcalfe's law is tested with $\\ln M_t = a + b \\ln n_t + u_t$, where $M_t$ is market value and $n_t$ Bitcoin transactions per day. Which value of $b$ does Metcalfe's law predict, and why?",
                options: [
                    "$b = 1$, because value is proportional to the number of users",
                    "$b = 0.5$, because each user connects to half of the network",
                    "$b = 2$, as $n$ users form about $n^2/2$ connections",
                    "$b = 3.6$, the slope observed for Bitcoin"
                ],
                correctExplanation: "If value grows with the number of possible connections, about $n^2/2$, then $\\ln M$ rises by 2% for each 1% of users: an elasticity $b = 2$.",
                incorrectExplanation: "Metcalfe's law states that network value grows with the square of users, which gives an elasticity of 2 in the log regression."
            }
        },
        {
            correct: 1,
            en: {
                title: "Metcalfe estimates in levels and in changes",
                text: "Bitcoin, November 2014 -- October 2025 (Newey--West standard errors): in levels, $\\hat b = 3.59$ (SE 0.43, $R^2 = 0.58$); with a linear time trend, $\\hat b = 0.27$; in monthly changes, $\\hat b = 0.31$ (SE 0.15, $R^2 = 0.05$). The Engle--Granger test finds no cointegration (p-value 0.57). What is the best conclusion?",
                options: [
                    "Metcalfe's law holds, with network effects even stronger than predicted, since $3.59 > 2$",
                    "The levels fit may be spurious; the use--value link is weak",
                    "The monthly-change estimate is biased, so the levels estimate should be used for valuation",
                    "The time trend absorbs the effect of transactions, so $b = 2$ is confirmed"
                ],
                correctExplanation: "Without cointegration, a high $R^2$ in levels can come from common trends. Once the trend is removed or changes are used, $\\hat b$ falls to about 0.3, so valuations based on user growth rest on a fragile link.",
                incorrectExplanation: "No cointegration and a collapse of $\\hat b$ to about 0.3 with a trend or in changes point to a spurious levels regression, not to strong network effects."
            }
        }
    ]
};
