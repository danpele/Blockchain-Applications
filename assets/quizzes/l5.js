// ============================================================
// Practice quiz bank for Lecture 5: Stablecoins I – Measuring Depeg Risk
// and On-Chain Early Warning (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l5'] = {
    draw: 15,
    questions: [
        {
            correct: 2,
            en: {
                title: "What a daily VaR misses",
                text: "A depeg can be described by its magnitude, its duration and the probability that an episode starts. What does a daily VaR 1% of stablecoin returns tell us about these three?",
                options: [
                    "All three, since it is a complete risk measure",
                    "The magnitude and the duration, not the probability",
                    "None: it is one quantile of daily closes",
                    "Only the duration, since VaR is measured per day"
                ],
                correctExplanation: "VaR 1% is a single threshold of daily closes. It says nothing about how deep a depeg goes beyond it, how long it lasts, or when the next one starts.",
                incorrectExplanation: "A daily quantile gives a one-day loss threshold only; depth beyond it, duration in hours and the start of episodes need separate measures."
            }
        },
        {
            correct: 0,
            en: {
                title: "Hourly against daily",
                text: "During the Silicon Valley Bank (SVB) weekend of March 2023, the lowest hourly close of USDC was $-1\\,036$ basis points (bp) and the lowest daily close $-285$ bp. What does the gap show?",
                options: [
                    "Daily closes can hide most of the intraday depth of a depeg",
                    "The hourly data contain an error, since daily and hourly lows must agree",
                    "The depeg was mostly a daily phenomenon",
                    "USDC recovered fully within the same hour"
                ],
                correctExplanation: "The deepest point (07:00 Coordinated Universal Time, 11 March) lasted hours, not a full day; a daily close samples one moment and can miss most of the trough.",
                incorrectExplanation: "A daily close is one observation per day; an hourly series reveals that the trough reached $-1\\,036$ bp, more than three times deeper than the worst daily close."
            }
        },
        {
            correct: 3,
            en: {
                title: "Arbitrage below par",
                text: "A fiat-backed stablecoin trades at $P_t = 0.995$ USD. Which arbitrage pushes the price back toward 1 USD?",
                options: [
                    "Mint new tokens at 1 USD and sell them on the market",
                    "Sell the token on the market and wait",
                    "Borrow the token and lend it in decentralised finance (DeFi)",
                    "Buy on the market and redeem at 1 USD with the issuer"
                ],
                correctExplanation: "Below par, buying at 0.995 and redeeming at 1 earns 50 bp and removes tokens from the market. Above par, the trade is reversed: mint at 1 and sell.",
                incorrectExplanation: "When $P_t < 1$, the arbitrageur buys cheap tokens and redeems them at par; minting and selling is the trade for $P_t > 1$."
            }
        },
        {
            correct: 1,
            en: {
                title: "When arbitrage stops",
                text: "Peg arbitrage needs access to redemption, time and trust in the reserves. Why could arbitrage not close the USDC discount on Saturday 11 March 2023?",
                options: [
                    "USDC had no reserves at all behind the token",
                    "Banks were closed, so redemption had to wait for Monday",
                    "Arbitrage on stablecoins is not legally permitted",
                    "The market price stayed above 1 USD over the whole weekend"
                ],
                correctExplanation: "Redemption requires bank transfers; with banks closed, arbitrageurs could buy below par but could not redeem until markets reopened, and the reserve loss was uncertain.",
                incorrectExplanation: "Arbitrage needs the redemption channel to work; over a weekend the banking leg was closed, so the price could stay far below the redemption value."
            }
        },
        {
            correct: 1,
            en: {
                title: "Issuer concentration",
                text: "On 21 October 2026 the supply of USD stablecoins was 303.4 bn USD (DefiLlama), with USDT at 60.2% and USDC at 23.8%. What follows for risk?",
                options: [
                    "Risk is well diversified across many issuers",
                    "Two issuers hold 84%: a USDC/USDT dislocation is systemic",
                    "Concentration does not matter for fiat-backed coins",
                    "Crypto-backed coins now dominate the supply of on-chain dollars"
                ],
                correctExplanation: "$60.2\\% + 23.8\\% = 84\\%$: a problem at either issuer, or between the two, affects most on-chain dollars. Crypto-backed coins are only 8.1%.",
                incorrectExplanation: "Two issuers with 84% of supply means a high concentration: stress in the USDC/USDT pair moves most of the on-chain dollar system."
            }
        },
        {
            correct: 3,
            en: {
                title: "Market-defined peg",
                text: "On 10 October 2025, USDe traded at 0.65 USD on one exchange while other venues stayed near 1 USD. Which distinction does this illustrate?",
                options: [
                    "Exogenous against endogenous causes of a depeg",
                    "Fiat-backed against crypto-backed stablecoin design",
                    "Transient against persistent depegs over time",
                    "Redemption value against the price on one venue"
                ],
                correctExplanation: "A token has no single price: the market-defined peg is venue-specific, and one venue can dislocate while the redemption value is unchanged.",
                incorrectExplanation: "Different prices on different venues at the same time show that the market-defined peg depends on the venue, unlike the fundamental redemption value."
            }
        },
        {
            correct: 0,
            en: {
                title: "Which risk can be monitored",
                text: "Why does the lecture focus on endogenous rather than exogenous depeg risk?",
                options: [
                    "Liquidity and order flow show on chain before the price moves",
                    "Exogenous risk never causes a stablecoin to depeg",
                    "Endogenous depegs are always larger in size",
                    "Exogenous events such as sanctions can be read from the pool composition"
                ],
                correctExplanation: "Reserve losses, regulation or sanctions arrive as news and are hard to predict; liquidity stress builds up inside the market and can be seen in on-chain data first.",
                incorrectExplanation: "Exogenous shocks arrive as news; endogenous stress from liquidity and order flow leaves traces on chain before the price reacts, which makes monitoring feasible."
            }
        },
        {
            correct: 2,
            en: {
                title: "Transient depegs",
                text: "A depeg lasts a few hours and is closed by arbitrage. Why is it still a risk?",
                options: [
                    "Because the issuer must then pay a regulatory fine",
                    "Because transient depegs always become persistent",
                    "Because liquidations at a bad price are irreversible",
                    "Because the token supply then falls permanently"
                ],
                correctExplanation: "Stablecoins serve as collateral in decentralised finance (DeFi). A few hours at a low price can trigger liquidations that are not undone when the peg returns.",
                incorrectExplanation: "The price recovers, but positions liquidated during the dislocation stay liquidated: a short depeg can have permanent consequences."
            }
        },
        {
            correct: 3,
            en: {
                title: "Deviation in basis points",
                text: "A dollar stablecoin closes at 0.9985 USD. What is its deviation $d_t = 10^4(P_t - 1)$?",
                options: [
                    "$-1.5$ bp",
                    "$-0.15$ bp",
                    "$-150$ bp",
                    "$-15$ bp"
                ],
                correctExplanation: "$10^4 \\times (0.9985 - 1) = 10^4 \\times (-0.0015) = -15$ bp, exactly at the 15 bp threshold used in the lecture.",
                incorrectExplanation: "One basis point is 0.01%, i.e. 0.0001 USD at par: $-0.0015 \\times 10^4 = -15$ bp."
            }
        },
        {
            correct: 1,
            en: {
                title: "Episodes and breach hours",
                text: "An episode starts at a breach hour ($|d_t| \\ge 15$ bp) preceded by 24 observed hours without a breach. Why count episodes rather than breach hours?",
                options: [
                    "Because hourly prices have more error than daily ones",
                    "Because hours in one episode are not independent",
                    "Because episodes always last exactly 24 hours",
                    "Because missing hours are counted as breach hours"
                ],
                correctExplanation: "The 1 044 breach hours at 15 bp (USDC/USDT, 2022 to 2026) come from only 30 episodes; treating them as independent would overstate the evidence.",
                incorrectExplanation: "A single depeg spans many consecutive breach hours; the independent unit is the episode, so frequencies and tests should count episodes."
            }
        },
        {
            correct: 2,
            en: {
                title: "Quantile and kurtosis together",
                text: "USDC daily closes 2021 to 2026: 1% quantile $-7.6$ bp (closest to zero of USDT, USDC, DAI), excess kurtosis 1 045 (0 for the Normal). What do the two numbers say together?",
                options: [
                    "USDC is the safest of the three coins in every respect",
                    "The kurtosis must be a data error, since the 1% quantile is so small",
                    "Tight on ordinary days; its risk sits in one rare, deep event",
                    "USDC deviates often, but always by small amounts"
                ],
                correctExplanation: "One weekend (SVB, $-285$ bp at the daily close) drives the kurtosis; the 1% quantile reflects ordinary days. A tight quantile and a huge kurtosis together mean rare, deep events.",
                incorrectExplanation: "A quantile describes typical tail days; an extreme kurtosis shows a few observations far beyond it. For USDC the risk is concentrated in one rare episode."
            }
        },
        {
            correct: 0,
            en: {
                title: "Persistence of deviations",
                text: "Daily deviations 2021 to 2026: lag-1 autocorrelation $\\hat\\rho_1 = 0.73$ for USDT, 0.29 for USDC, 0.34 for DAI. What does USDT's value mean?",
                options: [
                    "USDT deviations persist: once off the peg, it stays off",
                    "USDT has the largest single depeg of the three coins",
                    "USDT deviations tend to reverse sign from one day to the next",
                    "USDT is the most volatile of the three coins by far"
                ],
                correctExplanation: "High $\\hat\\rho_1$ means today's deviation predicts tomorrow's; USDT has the smallest extreme ($-41$ bp) but is the most persistent and most often beyond 15 bp after 2022.",
                incorrectExplanation: "Autocorrelation measures persistence, not size; 0.73 means USDT deviations last, although its worst close is the mildest of the three."
            }
        },
        {
            correct: 0,
            en: {
                title: "Where the risk lies",
                text: "Mean daily deviations 2021 to 2026 are 0.5 bp (USDT), $-0.2$ bp (USDC) and 0.4 bp (DAI). What is the right conclusion?",
                options: [
                    "The peg holds on average; the risk is in the tails",
                    "Stablecoins carry no depeg risk on these numbers",
                    "USDT is overvalued by 0.5 bp and should be sold",
                    "The means show that the daily deviations are Normally distributed"
                ],
                correctExplanation: "Means within $\\pm 0.5$ bp say the peg holds on average; minima of $-285$ bp (USDC) and $-261$ bp (DAI) show where the risk is.",
                incorrectExplanation: "Averages near zero hide rare deep deviations; depeg risk is a tail and episode question, not a mean question."
            }
        },
        {
            correct: 2,
            en: {
                title: "Value under zero recovery",
                text: "Circle held 3.3 bn USD of about 40 bn USD reserves at Silicon Valley Bank (SVB). With zero recovery on that deposit, the redemption value per token is $V(0) = 1 - 3.3/40$. What deviation does this imply?",
                options: [
                    "$-330$ bp",
                    "$-1\\,036$ bp",
                    "$-825$ bp",
                    "$-82.5$ bp"
                ],
                correctExplanation: "$3.3/40 = 8.25\\%$, so $V(0) = 0.9175$ and $d = -825$ bp. The market reached $-1\\,036$ bp, 211 bp lower.",
                incorrectExplanation: "The share at risk is $3.3/40 = 0.0825$; times $10^4$ gives $-825$ bp, the deviation if the SVB deposit were lost entirely."
            }
        },
        {
            correct: 1,
            en: {
                title: "The unexplained discount",
                text: "During the Silicon Valley Bank (SVB) weekend, USDC fell to $-1\\,036$ bp, 211 bp below its value under zero recovery on the SVB deposit ($-825$ bp). How should the 211 bp be read?",
                options: [
                    "A precise estimate of the liquidity premium of USDC",
                    "A residual not explained by the reserve-loss scenario",
                    "Proof that Circle's other reserves were also lost",
                    "A data error, since prices cannot fall below $V(0)$"
                ],
                correctExplanation: "The calculation separates the reserve loss from the rest, but does not split the rest: closed banks, uncertainty about other holdings and arbitrage frictions all contribute.",
                incorrectExplanation: "The 211 bp is a residual; it is not identified as a liquidity premium, since weekend timing, uncertainty and frictions are not separated."
            }
        },
        {
            correct: 3,
            en: {
                title: "Why DAI followed USDC",
                text: "On 11 March 2023, DAI reached $-955$ bp in the same hour as USDC ($-1\\,036$ bp), while USDT rose above 1 USD. Why did DAI fall?",
                options: [
                    "DAI is issued by Circle, like USDC",
                    "DAI holders panicked independently of USDC",
                    "DAI is algorithmic, like TerraUSD",
                    "Much of DAI's collateral was USDC"
                ],
                correctExplanation: "A crypto-backed stablecoin is only as good as its collateral; with much of it in USDC, DAI inherited USDC's depeg. USDT gained as the other dollar.",
                incorrectExplanation: "DAI is crypto-backed, and its collateral held a lot of USDC, so the USDC loss passed through to DAI's balance sheet."
            }
        },
        {
            correct: 1,
            en: {
                title: "Constant-product slippage",
                text: "A constant-product pool ($x\\,y = k$) holds 10 m of token X and 10 m of token Y, both worth 1 USD. A trader sells 1 m X. How much Y does she receive?",
                options: [
                    "1.000 m Y, since the price is 1",
                    "0.909 m Y, a slippage of 9.1%",
                    "0.990 m Y, a slippage of 1%",
                    "0.500 m Y, a slippage of 50%"
                ],
                correctExplanation: "$\\Delta y = y\\,\\Delta x/(x + \\Delta x) = 10 \\times 1/11 = 0.909$ m. A 10% trade costs 9.1%: the constant product spreads liquidity over all prices.",
                incorrectExplanation: "Keep $x\\,y = 100$: after the sale $x = 11$, so $y = 100/11 = 9.091$ and the trader receives $10 - 9.091 = 0.909$ m Y."
            }
        },
        {
            correct: 0,
            en: {
                title: "StableSwap amplification",
                text: "In the StableSwap (Curve) invariant, the amplification parameter $A$ moves the curve between two extremes. Which?",
                options: [
                    "$A \\to 0$: constant product; $A \\to \\infty$: constant sum, price exactly 1",
                    "$A \\to 0$: constant sum; $A \\to \\infty$: constant product",
                    "$A$ only sets the trading fee",
                    "$A \\to \\infty$: the pool stops trading, since the price is fixed"
                ],
                correctExplanation: "A large $A$ flattens the curve near balance, approaching $x + y = D$; a small $A$ approaches the constant product $x\\,y = k$.",
                incorrectExplanation: "Low amplification behaves like Uniswap's constant product; high amplification behaves like a constant sum with price 1 near balance."
            }
        },
        {
            correct: 3,
            en: {
                title: "Slippage as the pool empties",
                text: "Pool of 10 m + 10 m, StableSwap with $A = 100$: average slippage 0.05% for a sale of 1 m X, 0.33% for 5 m, 2.94% for 9.5 m (constant product: 9.09%, 33.3%, 48.7%). What does the table show?",
                options: [
                    "StableSwap and constant product cost the same for large trades",
                    "StableSwap slippage grows linearly with the trade size",
                    "StableSwap is always more expensive than constant product",
                    "Cheap near balance, but steep when one coin runs out"
                ],
                correctExplanation: "From 1 m to 9.5 m the trade size grows 9.5 times, but the slippage grows about 60 times (0.05% to 2.94%): flat near parity, steep near depletion.",
                incorrectExplanation: "Compare growth rates: a 9.5-fold larger trade costs about 60 times more under StableSwap; the curve is flat only while the pool is balanced."
            }
        },
        {
            correct: 2,
            en: {
                title: "Price hides the stress",
                text: "In a StableSwap pool with $A = 100$, the price of X is 0.986 when X is 80% of the pool and 0.943 when it is 90%. What should a risk monitor watch?",
                options: [
                    "Only the price, since it already reflects the stress",
                    "Only the trading volume, since volume rises under stress",
                    "The pool composition, which moves first",
                    "The fee level, since fees rise when the pool is stressed"
                ],
                correctExplanation: "The pool absorbs one-sided flow with little price change; by the time the price falls sharply the pool is almost empty of the other coin. The composition reveals the stress earlier.",
                incorrectExplanation: "AMM prices are inelastic until a pool is nearly one-sided; the share of each coin in the pool signals stress before the price does."
            }
        },
        {
            correct: 2,
            en: {
                title: "Entropy of the 3pool",
                text: "The Curve 3pool holds DAI, USDC and USDT. Its balance is summarised by the entropy of the three shares, equal to $\\ln 3 = 1.0986$ when balanced. What does a falling entropy indicate?",
                options: [
                    "More liquidity has been added to the pool",
                    "A higher price of all three coins together",
                    "A growing imbalance: one coin accumulates",
                    "A lower trading fee charged by the pool"
                ],
                correctExplanation: "Entropy is maximal at equal shares; it falls as the pool becomes dominated by one coin, often the one that holders are trying to sell.",
                incorrectExplanation: "Entropy is highest when the three shares are equal ($\\ln 3$); a lower value means the shares are diverging, a sign of one-sided flow."
            }
        },
        {
            correct: 3,
            en: {
                title: "AUPRC baseline",
                text: "In the working paper of Chaffard et al. (2026), 5.9% of hours are followed by a breach within 24 hours. What area under the precision-recall curve (AUPRC) does a random score get?",
                options: [
                    "0.5, as for the area under the receiver operating characteristic (ROC) curve",
                    "0, since a random score detects nothing",
                    "1, since precision and recall are averaged",
                    "About 0.059, the base rate"
                ],
                correctExplanation: "A random score has precision equal to the base rate at every recall level, so its AUPRC is 0.059; a perfect score gets 1.",
                incorrectExplanation: "Unlike the AUC (random 0.5), the AUPRC of a random score equals the share of positive hours, here 5.9%."
            }
        },
        {
            correct: 0,
            en: {
                title: "Labels against events",
                text: "In the working paper of Chaffard et al. (2026) (Uniswap V3 USDC/USDT pool, hourly, January 2022 to May 2026), 2 227 hours are positive (5.9%), but there are only 107 events. Why does this matter for evaluation?",
                options: [
                    "Hours cluster in few events: about 107 cases, not 2 227",
                    "It shows that most of the 2 227 labels are wrong",
                    "It means that each event lasts exactly 21 hours",
                    "It does not matter, since the classifiers learn from hours, not events"
                ],
                correctExplanation: "An alarm succeeds or fails per event; 2 227 positive hours from 107 events are highly dependent, so evidence about warnings rests on about 107 cases.",
                incorrectExplanation: "Hours within one event are not independent; the number that limits how well an alarm can be tested is the number of events."
            }
        },
        {
            correct: 1,
            en: {
                title: "Choosing the threshold",
                text: "USDC priced in USDT, hourly, 2022 to 23 October 2026: 98 episodes at $\\delta = 10$ bp, 30 at 15 bp, 5 at 25 bp, 2 at 50 bp. What does this imply for the choice of $\\delta$?",
                options: [
                    "A higher threshold is always better, since its events are more serious",
                    "A policy choice: low gives harmless events, high too few to test",
                    "The threshold has no effect on the number of episodes",
                    "10 bp is optimal, since it gives the most events to learn from"
                ],
                correctExplanation: "From 10 to 15 bp the episodes fall by about 70%; at 25 bp and above only 5 remain. The threshold trades relevance against sample size.",
                incorrectExplanation: "Raising $\\delta$ makes events more serious but rarer; with 5 events or fewer, neither training nor testing an alarm is reliable."
            }
        },
        {
            correct: 3,
            en: {
                title: "Row-level AUC of a depeg model",
                text: "Why can the row-level area under the receiver operating characteristic curve (AUC) be high for a depeg model that gives no useful warning?",
                options: [
                    "Because AUC ignores the positive class entirely",
                    "Because AUC is computed only on the training data, never on test data",
                    "Because AUC penalises false alerts too heavily",
                    "Because it rewards labels inside an episode, after the breach"
                ],
                correctExplanation: "Hours inside an episode are easy to label from the current deviation. An event-level protocol counts only alerts in the 24 hours before the breach.",
                incorrectExplanation: "Most positive hours lie inside or right at an episode, where the deviation is already visible; scoring them well inflates AUC without any lead time."
            }
        },
        {
            correct: 0,
            en: {
                title: "Value of a lead time",
                text: "The value of detecting an event with lead $\\ell$ hours is $v(\\ell) = 0.10 + 0.90\\,(\\ell - 1)/23$ for $1 \\le \\ell \\le 24$. What is $v(14)$?",
                options: [
                    "0.609",
                    "0.583",
                    "0.548",
                    "0.900"
                ],
                correctExplanation: "$0.10 + 0.90 \\times 13/23 = 0.10 + 0.509 = 0.609$. A 1-hour lead is worth 0.10, a 24-hour lead 1.",
                incorrectExplanation: "Substitute $\\ell = 14$: $(\\ell - 1)/23 = 13/23 = 0.565$; times 0.90 plus 0.10 gives 0.609."
            }
        },
        {
            correct: 1,
            en: {
                title: "AUC against recall",
                text: "Chaffard et al. (2026), working paper, test fold: CatBoost has AUC 0.862, recall 0.723, 2.50 false alerts a month, utility 0.303; random forest has AUC 0.901, recall 0.410, 0.97 false alerts a month, utility 0.180. What does the comparison show?",
                options: [
                    "The random forest is better, since its AUC is higher",
                    "AUC misleads: the lower-AUC model detects far more events",
                    "Both models are equivalent once false alerts are counted",
                    "CatBoost wins only because it was tuned on the test fold"
                ],
                correctExplanation: "CatBoost detects 72% of events about 14 hours ahead and has the higher utility; the random forest's better AUC does not translate into timely warnings.",
                incorrectExplanation: "The ranking by AUC and by event-level recall and utility disagree; for an alarm the event-level measures are the relevant ones."
            }
        },
        {
            correct: 2,
            en: {
                title: "High AUC, no warning",
                text: "Price-only alarms on the EOD Historical Data (EODHD) USDC/USDT cross rate, test 2025 to 23 October 2026 (5 events): AUC 0.88 to 0.93, but 0 events detected in time. How is that possible?",
                options: [
                    "The test period contained no depeg events that could be detected",
                    "The AUC was computed incorrectly on the test set",
                    "AUC rewards hours inside episodes, not warnings before them",
                    "Price features carry no information at any horizon"
                ],
                correctExplanation: "With a base rate of 1.5%, hours inside episodes are easy to rank. In 2024, every rule that detected events produced at least 2.6 false alerts a month, so the 2-per-month budget forced the threshold above 15 bp.",
                incorrectExplanation: "AUC rewards ranking hours within episodes; the event-level protocol, with its false-alert budget, needs a warning before the breach, which these thresholds never gave."
            }
        },
        {
            correct: 0,
            en: {
                title: "A rule chosen with hindsight",
                text: "On the test set, the rule $|d_t| \\ge 11$ bp would have detected 4 of 5 events (utility 0.42), with 3.2 false alerts a month. Why does this not show it matches the paper's model?",
                options: [
                    "Its threshold was picked on the test data; 5 events are too few",
                    "A simple rule can never beat a machine-learning model",
                    "The paper's model reaches a recall above 0.8 on exactly the same data",
                    "A recall of 4 of 5 events is only 0.4"
                ],
                correctExplanation: "Choosing $k$ on the test set is hindsight, and the Clopper-Pearson 95% interval for 4 of 5 is [0.28, 0.99]; the data and venue also differ from the paper's.",
                incorrectExplanation: "A threshold picked after seeing the test outcomes is not an out-of-sample result, and five events are too few to rank alarms reliably."
            }
        },
        {
            correct: 3,
            en: {
                title: "A 10 bp rule in October 2026",
                text: "USDC priced in USDT in October 2026: mean 7.5 bp, maximum 14.7 bp; 206 of 552 hours above 10 bp, none above 15 bp. What would a simple rule at 10 bp have done?",
                options: [
                    "Stayed silent, since no breach occurred",
                    "Detected a real depeg that the 15 bp threshold missed entirely",
                    "Fired only once, at the maximum",
                    "Fired repeatedly, with no breach of 15 bp following"
                ],
                correctExplanation: "37% of hours were above 10 bp, yet none reached 15 bp: a price-level rule would have produced many false alerts. The paper's alarm looks at pool composition and liquidity as well.",
                incorrectExplanation: "With 206 hours above 10 bp and no breach of 15 bp, a 10 bp rule raises many alerts that are not followed by an event."
            }
        }
    ]
};
