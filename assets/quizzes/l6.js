// ============================================================
// Practice quiz bank for Lecture 6: Networks, Sentiment and Asset Classes (EN)
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
                title: "Correlation distance",
                text: "Mantegna (1999) turns the Pearson correlation $\\rho_{ij}$ of two coins into the distance $d_{ij} = \\sqrt{2(1-\\rho_{ij})}$. What distance do two coins with uncorrelated returns ($\\rho_{ij} = 0$) have?",
                options: [
                    "$d = 0$, the same distance as for two identical coins",
                    "$d = 1$, half of the largest possible distance",
                    "$d = \\sqrt{2} \\approx 1.41$",
                    "$d = 2$, the largest distance the formula allows"
                ],
                correctExplanation: "With $\\rho = 0$ the formula gives $\\sqrt{2 \\cdot 1} = \\sqrt 2$. The distance is 0 for $\\rho = 1$ and reaches its maximum of 2 only for $\\rho = -1$.",
                incorrectExplanation: "Substitute $\\rho = 0$: $d = \\sqrt{2(1 - 0)} = \\sqrt 2$. Distance 0 needs $\\rho = 1$ and distance 2 needs $\\rho = -1$."
            }
        },
        {
            correct: 1,
            en: {
                title: "Distance of BTC and ETH",
                text: "Daily log returns of Bitcoin (BTC) and Ether (ETH), January 2021 to October 2026, have correlation $\\rho = 0.823$. What is their correlation distance $d = \\sqrt{2(1-\\rho)}$?",
                options: [
                    "0.177, the gap $1 - \\rho$ between the correlation and one",
                    "0.595",
                    "0.354, which is $2(1-\\rho)$ before the square root",
                    "1.141, the distance of a weakly correlated pair"
                ],
                correctExplanation: "$d = \\sqrt{2 \\cdot 0.177} = \\sqrt{0.354} = 0.595$: a short distance, as expected for the most correlated pair with BTC.",
                incorrectExplanation: "The distance is the square root of $2(1-\\rho) = 0.354$, which is 0.595. The value 1.141 belongs to the weakest pair, DOGE–TRX ($\\rho = 0.349$)."
            }
        },
        {
            correct: 0,
            en: {
                title: "Hubs of the minimum spanning tree",
                text: "The minimum spanning tree (MST) of 19 coins, built from correlation distances of daily log returns (January 2021 to October 2026), is described on the slides. Which statement matches it?",
                options: [
                    "ETH and DOT, six edges each; BTC links only to ETH and XMR",
                    "BTC is the single hub, linked directly to all 18 other coins of the tree",
                    "Every coin has exactly two edges, so the tree is a chain with no hubs",
                    "DOGE is the hub, since its low correlations put it at the centre of the tree"
                ],
                correctExplanation: "ETH (degree 6: BTC, BNB, SOL, LTC, LINK, ETC) and DOT (degree 6: ADA, ATOM, FIL, ALGO, TRX, LINK) are the hubs; BTC has degree 2.",
                incorrectExplanation: "A hub is a coin with many MST edges. In this tree the hubs are ETH and DOT with six edges each, while BTC connects only to ETH and XMR."
            }
        },
        {
            correct: 3,
            en: {
                title: "Few MST links, large influence",
                text: "In the minimum spanning tree (MST) of 19 coins, BTC has only two edges while ETH has six. In the Diebold–Yilmaz spillover table of 8 coins (2021–2026), BTC has NET $= +11.0$, the second largest. How should the two facts be reconciled?",
                options: [
                    "They contradict each other, so one of the two estimates must be wrong and re-run",
                    "A coin with only two MST edges must have a NET spillover close to zero",
                    "The MST shows BTC matters little, so the spillover table should be ignored",
                    "The MST keeps only the $N-1$ strongest links; low degree is not low transmission"
                ],
                correctExplanation: "The MST discards all but $N - 1$ links, so BTC's many strong correlations with other coins are routed through ETH. The spillover table measures shock transmission directly and shows BTC as a large net transmitter.",
                incorrectExplanation: "MST degree and spillovers measure different things: the tree keeps only the strongest links, so a coin with few edges can still transmit much forecast-error variance."
            }
        },
        {
            correct: 1,
            en: {
                title: "Absorption ratio",
                text: "For a correlation matrix of $N$ coins with eigenvalues $\\lambda_1 \\geq \\dots \\geq \\lambda_N$, what does the absorption ratio (AR) measure?",
                options: [
                    "The average pairwise correlation of the $N$ coins in the window",
                    "The first principal component's share of total variance, $\\lambda_1/N$",
                    "The number of principal components needed to explain 80% of the variance",
                    "The share of each coin's forecast-error variance that comes from the other coins"
                ],
                correctExplanation: "$\\mathrm{AR} = \\lambda_1 / \\sum_k \\lambda_k = \\lambda_1/N$, since the eigenvalues of a correlation matrix sum to $N$. It is $1/N$ with no common factor and 1 when one factor explains everything.",
                incorrectExplanation: "The absorption ratio is the variance share of the first principal component, $\\lambda_1/N$. The forecast-error variance share is the Diebold–Yilmaz spillover, a different measure."
            }
        },
        {
            correct: 0,
            en: {
                title: "Absorption ratio: worked example",
                text: "Take $N = 19$ coins with every pairwise correlation equal to $\\rho = 0.60$. Then $\\lambda_1 = 1 + (N-1)\\rho$. What is the absorption ratio $\\mathrm{AR} = \\lambda_1/N$?",
                options: [
                    "0.62, from $\\lambda_1 = 11.8$",
                    "0.60, the common correlation itself",
                    "0.86, from $\\lambda_1 = 16.3$",
                    "0.05, the value $1/N$ of no common factor"
                ],
                correctExplanation: "$\\lambda_1 = 1 + 18 \\cdot 0.60 = 11.8$ and $\\mathrm{AR} = 11.8/19 = 0.62$.",
                incorrectExplanation: "Compute $\\lambda_1 = 1 + 18 \\cdot 0.60 = 11.8$, then divide by 19. The value 0.86 corresponds to $\\rho = 0.85$ and 0.05 to $\\rho = 0$."
            }
        },
        {
            correct: 2,
            en: {
                title: "A rising absorption ratio",
                text: "The absorption ratio (AR) of a group of coins rises from 0.45 to 0.85. What happens to the benefit of holding ten coins instead of one?",
                options: [
                    "It grows, because the portfolio now explains a larger share of the total variance",
                    "It is unchanged, because the absorption ratio does not depend on the coins' correlations",
                    "It shrinks: one common factor drives most variance, so ten coins remove little risk",
                    "It cannot be judged without knowing the price and market value of each coin"
                ],
                correctExplanation: "A high AR means one common factor absorbs most of the variance. Coins then move together, and diversification across coins buys little.",
                incorrectExplanation: "The AR is the variance share of the first common factor. When it rises towards 1, the coins behave like one asset and diversification across them weakens."
            }
        },
        {
            correct: 3,
            en: {
                title: "Connectedness through time",
                text: "On 90-day rolling windows of daily log returns of 19 coins (last window ending 22 October 2026), the mean pairwise correlation ranges from 0.36 (April 2021) to 0.85 (mid-August 2021), and the absorption ratio (AR) averages 0.68 over all windows. Which reading is correct?",
                options: [
                    "Correlation rose steadily since 2021 and reached its maximum in the latest window",
                    "An AR of 0.68 means that 68% of the 19 coins moved in the same direction on a day",
                    "The peak came just before the May 2021 crash, so high correlation predicts crashes",
                    "Last window: AR 0.59, below its 0.68 average; mean correlation 0.54"
                ],
                correctExplanation: "The slides report a last-window mean correlation of 0.54 and AR of 0.59, both below the peak reached in mid-August 2021, after the May crash.",
                incorrectExplanation: "The peak (0.85) came after the May 2021 crash, not before it; the last window shows a mean correlation of 0.54 and an AR of 0.59, below the 0.68 average."
            }
        },
        {
            correct: 0,
            en: {
                title: "Diebold–Yilmaz share",
                text: "In the Diebold–Yilmaz framework, what is $\\tilde\\theta_{ij}$, computed from the generalised forecast-error variance decomposition of a vector autoregression (VAR) at horizon $H$?",
                options: [
                    "The share of coin $i$'s $H$-step forecast-error variance due to shocks in coin $j$",
                    "The correlation between the returns of coins $i$ and $j$, cumulated over $H$ days",
                    "The probability that coin $j$ falls by more than 5% on a day when coin $i$ falls",
                    "The slope of a regression of coin $j$'s return on coin $i$'s return lagged $H$ days"
                ],
                correctExplanation: "$\\tilde\\theta_{ij}$ is a normalised variance share: the part of $i$'s forecast-error variance attributed to shocks in $j$, with direction $j \\rightarrow i$. With the Pesaran–Shin decomposition it does not depend on the ordering of the variables.",
                incorrectExplanation: "A spillover share is a forecast-error variance share with a direction ($j \\rightarrow i$), not a symmetric correlation and not a tail probability."
            }
        },
        {
            correct: 1,
            en: {
                title: "Reading one cell",
                text: "In the spillover table of 8 coins (VAR(5), horizon $H = 10$ days, 2021–2026), rows are receivers of shocks and columns are sources. The cell in row BTC, column ETH equals 16.0. What does it say?",
                options: [
                    "16% of ETH's 10-day forecast-error variance is due to BTC shocks",
                    "16% of BTC's 10-day forecast-error variance is due to ETH shocks",
                    "BTC and ETH have a daily return correlation of 0.16 over 2021–2026",
                    "ETH shocks cause 16% of BTC's daily price changes, in a causal sense"
                ],
                correctExplanation: "Row = receiver, column = source: the cell is the share of BTC's 10-day forecast-error variance attributed to ETH shocks (ETH $\\rightarrow$ BTC).",
                incorrectExplanation: "Read the row as the receiver and the column as the source. The entry is a variance share, not a correlation, and it does not establish causation."
            }
        },
        {
            correct: 3,
            en: {
                title: "NET spillover of ETH",
                text: "In the 8-coin spillover table (2021–2026), ETH has TO $= 93.2$ (what it sends to the other coins) and FROM $= 77.5$ (what it receives from them). What is its NET spillover, and what does the sign say?",
                options: [
                    "$-15.7$: ETH receives more than it sends, a net receiver",
                    "$+170.7$: TO plus FROM, all the shocks that involve ETH",
                    "$+16.0$: the cell in row BTC, column ETH of the table",
                    "$+15.7$: ETH is a net transmitter of shocks"
                ],
                correctExplanation: "$\\mathrm{NET} = \\mathrm{TO} - \\mathrm{FROM} = 93.2 - 77.5 = +15.7$. A positive NET means the coin sends more than it receives: ETH is the largest net transmitter in the table.",
                incorrectExplanation: "NET is TO minus FROM, here $93.2 - 77.5 = +15.7$; a positive value marks a net transmitter."
            }
        },
        {
            correct: 0,
            en: {
                title: "Total spillover index",
                text: "The total spillover index of the 8-coin system (2021–2026, VAR(5), $H = 10$ days) is $S = 72.9\\%$. What does this number mean?",
                options: [
                    "On average, 72.9% of a coin's 10-day forecast-error variance comes from the others",
                    "On 72.9% of days all eight coins moved in the same direction as Bitcoin did",
                    "The mean pairwise correlation of the eight coins' daily returns is 0.729",
                    "The VAR(5) explains 72.9% of the variance of daily returns, like an $R^2$"
                ],
                correctExplanation: "$S$ is the mean of the FROM column: the average share of a coin's forecast-error variance due to the other coins. At 72.9% the system is highly connected.",
                incorrectExplanation: "The total index averages the off-diagonal variance shares (the FROM column); it is neither a correlation nor an $R^2$."
            }
        },
        {
            correct: 2,
            en: {
                title: "DOGE as net receiver",
                text: "In the 8-coin spillover table, DOGE receives the least from the others (FROM $= 63.6$), yet it has the most negative NET ($-18.6$). Why?",
                options: [
                    "The table must be wrong: the coin that receives least must be a net transmitter",
                    "DOGE has the largest own share (36.4), which is subtracted a second time in NET",
                    "DOGE sends even less (TO $= 45.0$), so TO minus FROM is the most negative",
                    "NET is computed from return correlations, not from forecast-error variance shares"
                ],
                correctExplanation: "$\\mathrm{NET} = 45.0 - 63.6 = -18.6$. DOGE receives relatively little, but what it transmits is much smaller still.",
                incorrectExplanation: "NET compares what a coin sends with what it receives. DOGE's TO of 45.0 is far below its FROM of 63.6, which makes it the largest net receiver."
            }
        },
        {
            correct: 1,
            en: {
                title: "What NET does not show",
                text: "In the 8-coin spillover table, $\\mathrm{NET}_{DOGE} = -18.6$. Which claim does this number NOT support?",
                options: [
                    "DOGE transmits less forecast-error variance to the others than it receives",
                    "Price moves of the other coins cause DOGE's price changes",
                    "Among the eight coins in the table, DOGE is the largest net receiver",
                    "Shocks to the other coins help explain DOGE's forecast-error variance"
                ],
                correctExplanation: "Spillovers are forecast-error variance shares from a VAR; they describe predictive links, not causal effects. None of the link measures in the lecture shows that one coin causes another to move.",
                incorrectExplanation: "NET is a statement about variance shares in a forecasting model. A causal claim would need a design that identifies the cause, which a VAR decomposition does not provide."
            }
        },
        {
            correct: 3,
            en: {
                title: "Rolling spillover index",
                text: "The total spillover index is re-estimated with a VAR(2) on 200-day rolling windows. What range and latest value do the slides report?",
                options: [
                    "From 36% (April 2021) to 85% (August 2021); 54% in the last window",
                    "A constant level of about 72.9% in every 200-day window since 2021",
                    "From 45.0% to 93.2%; 76.7% in the last window, ending October 2026",
                    "From 65.2% (July 2021) to 83.5% (May 2026); 80.4% in the last window"
                ],
                correctExplanation: "The rolling index ranges from 65.2% to 83.5% and stands at 80.4% in the window ending 22 October 2026. It rose into Terra and FTX, fell in 2023 and climbed after the spot ETFs.",
                incorrectExplanation: "The rolling Diebold–Yilmaz index moves between 65.2% (July 2021) and 83.5% (May 2026). The 36%–85% range belongs to the rolling mean correlation."
            }
        },
        {
            correct: 0,
            en: {
                title: "Spillovers after the ETFs",
                text: "The rolling spillover index climbs after the launch of the spot Bitcoin exchange-traded funds (ETFs). What can be concluded from the chart alone?",
                options: [
                    "Consistent with more common (institutional) flows; the cause is not identified",
                    "The ETF launches caused the rise in spillovers, as the timing of the increase shows",
                    "The rise proves that crypto markets became less efficient after the ETF launches",
                    "The rise shows that each individual coin now carries less risk than before 2024"
                ],
                correctExplanation: "A time series of an index can be consistent with an explanation without identifying it; other events in the same period could produce the same pattern.",
                incorrectExplanation: "A rolling index moving after an event shows co-occurrence. Establishing that the ETFs caused the rise would need a design that rules out other explanations."
            }
        },
        {
            correct: 2,
            en: {
                title: "Clusters of the asset map",
                text: "Six return features of 33 assets (19 coins and 14 traditional assets, 2021–2026) are standardised across assets and grouped by $k$-means with $k = 3$. Which grouping results?",
                options: [
                    "All 19 coins in one cluster, all 14 traditional assets in another; DOGE not apart",
                    "BTC alone in one cluster; all other coins and traditional assets in two clusters",
                    "14 traditional assets with BTC, ETH, LTC, LINK; 14 other coins; DOGE alone",
                    "Each of the three clusters mixes coins and traditional assets in equal numbers"
                ],
                correctExplanation: "BTC, ETH, LTC and LINK join the traditional assets, 14 other coins form their own cluster, and DOGE (skewness 5.9) is an outlier of its own.",
                incorrectExplanation: "On standardised features the large coins group with traditional assets, most altcoins stay apart, and DOGE forms its own cluster."
            }
        },
        {
            correct: 3,
            en: {
                title: "Why BTC sits near the S&P 500",
                text: "On the asset map, Bitcoin (annualised volatility 57%, Hill tail index 3.56) sits next to the S&P 500 (volatility 16%, tail index 3.44). How can that be?",
                options: [
                    "The return series were rescaled to equal volatility before computing the features",
                    "Bitcoin and the S&P 500 have a daily return correlation close to 1 in 2021–2026",
                    "The map is built from price levels, not returns, and both prices trended upwards",
                    "Volatility is one feature of six; on the other five BTC resembles equities"
                ],
                correctExplanation: "Each feature is standardised across assets, but the returns themselves are not rescaled; volatility stays one of six features, and on skewness, kurtosis, tail index, ACF of $|r_t|$ and the 1% quantile BTC is close to equities.",
                incorrectExplanation: "The map places assets by six standardised features, not by correlation. BTC's high volatility is outweighed by its equity-like values on the other five features."
            }
        },
        {
            correct: 1,
            en: {
                title: "What separates cryptos",
                text: "Pele et al. (2023) study 906 assets (234 cryptos), January 2014 to November 2020, with factor analysis of 24 indicators: a tail factor (76% of variance), a memory factor (6%) and a moment factor (6%). Which factor separates cryptos from other assets?",
                options: [
                    "The memory factor, since cryptos have the largest Hurst exponents of all classes",
                    "The tail factor: alone it gives a logit Nagelkerke $\\tilde R^2$ of 0.992",
                    "The moment factor: its logit on skewness and kurtosis gives $\\tilde R^2 = 0.992$",
                    "None: a classifier on the factors is right on only about half of the assets"
                ],
                correctExplanation: "The tail factor alone gives $\\hat\\beta_1 = 15.45$ (SE 4.44) and $\\tilde R^2 = 0.992$; the moment factor reaches only 0.12. A support vector machine on two factors reaches 99.56% accuracy.",
                incorrectExplanation: "The conclusion of the paper is a separate asset class “mainly due to the tail factor”: the tail factor classifies almost perfectly, the moment factor weakly, the memory factor not at all."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading the class averages",
                text: "In Pele et al. (2023), daily returns 2014–2020 in decimals, the average 1% quantile of cryptos is $Q_{1\\%} = -0.366$ and that of stocks $-0.054$. What does the crypto value mean?",
                options: [
                    "On average, cryptos lose 0.366% of their value on the worst 1% of days",
                    "36.6% of the trading days of a typical crypto end with a loss",
                    "Cryptos have 0.366 times the tail risk of stocks over 2014–2020",
                    "Averaged over 234 cryptos, the 1% daily quantile is a fall of 36.6%"
                ],
                correctExplanation: "Returns are in decimals, so $-0.366$ is $-36.6\\%$: on 1% of days the average crypto loses at least about 36.6% in a day, against 5.4% for stocks.",
                incorrectExplanation: "The quantile is a return in decimals: $-0.366$ means a daily fall of 36.6%, the 1% quantile averaged over 234 cryptos."
            }
        },
        {
            correct: 2,
            en: {
                title: "BTC at the border",
                text: "Pele et al. (2023) classify cryptos with 99.56% accuracy, and only BTC and USDT are misclassified. The own update for 2021–2026 groups BTC and ETH with traditional assets. Which conclusion fits both results?",
                options: [
                    "Cryptos are no longer a separate asset class, so the 2023 result was wrong",
                    "BTC behaves like a stock and should therefore be regulated as an equity",
                    "Most cryptos form a class through their tails; BTC (now ETH) is at the border",
                    "The two studies use different samples, so no joint conclusion is possible"
                ],
                correctExplanation: "The paper already places BTC at the border; the update on standardised and on shape-only features is consistent with it, while most altcoins stay apart.",
                incorrectExplanation: "The two studies agree: cryptos as a group are separated by their tails, and BTC sits at the boundary, now joined by ETH."
            }
        },
        {
            correct: 0,
            en: {
                title: "Estimation window of an event study",
                text: "In the market-model event study, $\\alpha$ and $\\beta$ of $R_t = \\alpha + \\beta R_{m,t} + u_t$ are estimated on days $[-250, -31]$ before the event. Why does the window end 31 days before the event?",
                options: [
                    "To keep the event and its run-up out of the normal-return model",
                    "Because prices are not available in the month before an upgrade",
                    "To make the abnormal returns average exactly zero in the event window",
                    "Because a market model needs exactly 220 daily observations to be fitted"
                ],
                correctExplanation: "The normal-return model should describe returns without the event; a gap before the event window prevents anticipation effects from contaminating $\\hat\\alpha$ and $\\hat\\beta$.",
                incorrectExplanation: "The gap separates the estimation window from the event window, so that the benchmark of normal returns is not itself affected by the event."
            }
        },
        {
            correct: 2,
            en: {
                title: "Cross-section of 13 upgrades",
                text: "For 13 Ethereum upgrades (implementation dates), the event study reports: mean $\\mathrm{CAR}[-1,1] = -0.18\\%$, $t_{CS} = -0.10$ (p 0.92), 7 of 13 CARs positive (sign test p $= 1.00$). CAR is the cumulative abnormal return. Which reading is correct?",
                options: [
                    "Upgrades lower the price of Ether by 0.18% on average, a significant effect",
                    "Upgrades raise the price of Ether, since a majority of the CARs are positive",
                    "We do not reject a mean CAR of zero: no common reaction is detected",
                    "A p-value of 0.92 means a 92% probability that upgrades have an effect"
                ],
                correctExplanation: "A $t$ of $-0.10$ and p of 0.92 are far from any usual significance level, and 7 of 13 positive is what a coin toss would give.",
                incorrectExplanation: "With p 0.92 for the mean and p 1.00 for the sign test, the data are consistent with a mean CAR of zero: we do not reject the null."
            }
        },
        {
            correct: 1,
            en: {
                title: "Merge and Pectra",
                text: "The Merge (September 2022) has $\\mathrm{CAR}[-1,1] = -11.1\\%$ ($t = -3.09$) and Pectra (May 2025) $+11.3\\%$ ($t = 2.92$), while the mean over 13 upgrades is $-0.18\\%$ (p 0.92). What can be concluded?",
                options: [
                    "Upgrades are already priced in by the market, which the zero mean proves",
                    "Single upgrades can move Ether either way; no common revaluation is detected",
                    "The Merge and Pectra effects cancel out, so neither CAR was significant",
                    "Pectra shows that the market now rewards upgrades, unlike in 2022"
                ],
                correctExplanation: "Two individual CARs are large and of opposite sign; the cross-section shows no common effect. A non-significant mean does not prove “priced in”, which remains a hypothesis.",
                incorrectExplanation: "Individual tests and the cross-sectional test answer different questions. Large single CARs of both signs fit a mean that is not distinguishable from zero, without proving that upgrades are priced in."
            }
        },
        {
            correct: 3,
            en: {
                title: "Independence of events",
                text: "The cross-sectional, BMP and sign tests in the Ethereum event study assume independent events. Two schedule dates are 2 days apart, and 17 of 26 estimation windows contain another event day. What is the consequence?",
                options: [
                    "None: the cross-sectional and sign tests do not assume independent events",
                    "The abnormal returns of the overlapping events become exactly zero",
                    "The market model can no longer be estimated for the affected events",
                    "The p-values may be too optimistic: CARs are dependent, benchmarks contaminated"
                ],
                correctExplanation: "Dependent events mean fewer effective observations than 13, and estimation windows with event days distort the normal-return benchmark; the test statistics assume neither happens.",
                incorrectExplanation: "Overlapping windows violate an assumption of the cross-sectional tests; the abnormal returns can still be computed, but their standard errors are less reliable."
            }
        },
        {
            correct: 0,
            en: {
                title: "Attention, activity, volatility",
                text: "Lin et al. (2026) report, on implementation days of Ethereum upgrades: Google attention $+0.350$ log points (Benjamini–Hochberg adjusted p 0.004), active addresses $-0.145$ (BH p 0.020), median hourly log realised volatility $+0.316$ (BH p 0.007). Which reading is correct?",
                options: [
                    "About +42% attention, −13.5% active addresses, +37% volatility",
                    "Implementation raises the price of Ether by about 35% within the day",
                    "Users pause their activity during upgrades, which the address result proves",
                    "None of the effects survives the Benjamini–Hochberg adjustment at 5%"
                ],
                correctExplanation: "Log-point effects convert to $e^{0.350} - 1 \\approx 42\\%$, $e^{-0.145} - 1 \\approx -13.5\\%$ and $e^{0.316} - 1 \\approx 37\\%$, all significant after adjustment.",
                incorrectExplanation: "These are effects on attention, activity and volatility, not price, all significant after adjustment. That “users pause” is a hypothesis consistent with fewer addresses, not a proven fact."
            }
        },
        {
            correct: 2,
            en: {
                title: "Engagement-weighted sentiment",
                text: "BitMood scores 120 000 Facebook posts on Bitcoin (2015–2023) with FinBERT and builds a daily engagement-weighted compound score $\\mathrm{WC}_d$. How are the posts of a day weighted?",
                options: [
                    "Equally, so that every post of the day counts the same",
                    "By the number of words, so that longer posts count more",
                    "By total interactions, so widely seen posts count more",
                    "By Bitcoin's price change on the day of the post"
                ],
                correctExplanation: "Each post's sentiment probabilities are weighted by its total interactions $T_i$; $\\mathrm{WC}_d = (P^+_d - P^-_d)/(P^+_d + P^-_d + P^0_d)$ then lies in $[-1, 1]$.",
                incorrectExplanation: "The weights are the total interactions $T_i$ of each post, which is why the score is called engagement-weighted; weighting by price would mix the target into the signal."
            }
        },
        {
            correct: 1,
            en: {
                title: "Contrarian back-test",
                text: "The best BitMood trading configuration (3-day window, compound sentiment, cost $10^{-5}$) reports a Sharpe ratio of 0.210 over 1 January – 15 October 2023. Why is this number weak evidence of skill?",
                options: [
                    "A Sharpe ratio of 0.210 is negative once costs are subtracted from returns",
                    "It was the best of many settings, chosen on the same 2023 period that scores it",
                    "Contrarian rules cannot earn a positive return by construction in any market",
                    "Sentiment cannot be measured reliably from Facebook posts about Bitcoin"
                ],
                correctExplanation: "Selecting the best of many combinations on the test period inflates the result; the selection should use a separate validation period. In addition, a cost of $10^{-5}$ (0.1 bp per trade) is far below typical exchange fees.",
                incorrectExplanation: "The problem is selection: the best configuration was picked on the same period that scores it, so its performance is optimistic."
            }
        },
        {
            correct: 0,
            en: {
                title: "Choosing a volume model",
                text: "BitMood forecasts daily Bitcoin volume (2022–2023). Root mean squared error (RMSE) of scaled volume: linear regression 0.1423 (validation) and 0.1935 (test); Bi-LSTM 0.1701 and 0.1930. Following “select on validation, report on test”, which model and which number are reported?",
                options: [
                    "The linear regression, with test RMSE 0.1935",
                    "The Bi-LSTM, with test RMSE 0.1930, the lowest on the test set",
                    "The linear regression, with validation RMSE 0.1423",
                    "The Bi-LSTM, with validation RMSE 0.1701"
                ],
                correctExplanation: "The linear regression has the lowest validation RMSE, so it is chosen; its test RMSE of 0.1935 is reported, only 0.0005 above the best test value.",
                incorrectExplanation: "The choice is made on validation (linear regression, 0.1423) and the reported number is the chosen model's test score (0.1935). Choosing on test would repeat the selection error."
            }
        },
        {
            correct: 3,
            en: {
                title: "Does sentiment add value?",
                text: "In the BitMood volume forecasts every model uses sentiment features, and Shapley additive explanations (SHAP) show that lagged volume and negative sentiment dominate. What is missing before claiming that sentiment improves volume forecasts?",
                options: [
                    "Nothing: the large SHAP values of negative sentiment are the required evidence",
                    "A larger neural network that uses more sentiment features than the current one",
                    "A higher test RMSE for the linear model than for all the neural networks",
                    "The same model without sentiment, on the same test days, with a test of the gap"
                ],
                correctExplanation: "The minimum standard needs a benchmark without the new information; the RMSE difference should come with a confidence interval, for example from a Diebold–Mariano test.",
                incorrectExplanation: "SHAP describes how the model uses its inputs; whether sentiment helps needs a comparison with a model that lacks it, on the same test period."
            }
        }
    ]
};
