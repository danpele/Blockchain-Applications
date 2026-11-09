// ============================================================
// Practice quiz bank for Lecture 1: Blockchains and Crypto Markets as Data (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l1'] = {
    draw: 15,
    questions: [
        {
            correct: 2,
            en: {
                title: "Why old records are tamper-evident",
                text: "On a public blockchain, why is it easy to detect that someone has changed an old transaction?",
                options: [
                    "Every transaction is encrypted, so a changed record can no longer be decrypted",
                    "A central operator signs each block and would refuse to sign a changed one",
                    "Each block stores the previous block's hash, so a change breaks every later link",
                    "Nodes delete confirmed blocks, so no old record is left that could be changed"
                ],
                correctExplanation: "The hash (fingerprint) of each block depends on its content, and the next block stores that hash. Changing an old record changes its hash and breaks the chain of hashes after it, which every node can see.",
                incorrectExplanation: "Public blockchain records are readable by anyone and are kept, not deleted; tamper-evidence comes from the chain of hashes, each block storing the fingerprint of the previous one."
            }
        },
        {
            correct: 0,
            en: {
                title: "What a block time measures",
                text: "An analyst uses the block timestamp of a Bitcoin transfer as the date of a sale. What does the block time actually record?",
                options: [
                    "When the transfer was recorded on chain, not when the exchange took place",
                    "The moment the buyer and the seller agreed on the price, as stated in the contract",
                    "The time at which the exchange matched the buy and sell orders of the two parties",
                    "The Coordinated Universal Time (UTC) close used by price aggregators"
                ],
                correctExplanation: "A block groups transactions and receives a timestamp when it is added. The sale may have been agreed earlier, and trades inside an exchange never reach the chain at all.",
                incorrectExplanation: "The block time is the time of recording on chain; the economic exchange (agreement, order matching) can happen earlier or entirely off-chain."
            }
        },
        {
            correct: 3,
            en: {
                title: "Hash rate from the difficulty",
                text: "On 8 October 2025 the Bitcoin difficulty was $D = 1.508 \\times 10^{14}$. One block arrives every 600 seconds on average and $\\hat H = D \\cdot 2^{32}/600$ hashes per second, with $2^{32} \\approx 4.295 \\times 10^{9}$. What is the estimated network hash rate, in exahashes ($10^{18}$ hashes) per second (EH/s)?",
                options: [
                    "About 1.08 EH/s",
                    "About 648 000 EH/s",
                    "About 251 EH/s",
                    "About 1 080 EH/s"
                ],
                correctExplanation: "$1.508 \\times 10^{14} \\times 4.295 \\times 10^{9} = 6.48 \\times 10^{23}$ expected hashes per block; divided by 600 seconds this gives $1.08 \\times 10^{21}$ hashes per second, i.e. 1 080 EH/s.",
                incorrectExplanation: "Multiply the difficulty by $2^{32}$ to get the expected number of tries per block, divide by 600 seconds, then by $10^{18}$: $1.08 \\times 10^{21}/10^{18} = 1\\,080$ EH/s."
            }
        },
        {
            correct: 1,
            en: {
                title: "Annual supply growth of Bitcoin",
                text: "After the April 2024 halving the block subsidy is 3.125 BTC (bitcoin), with 144 blocks a day. On 18 September 2026, 20.09 million BTC were in circulation. What is the annual supply growth rate?",
                options: [
                    "About 1.64% a year",
                    "About 0.82% a year",
                    "About 2.0% a year",
                    "About 0.0022% a year"
                ],
                correctExplanation: "New coins per year: $3.125 \\times 144 \\times 365 = 164\\,250$ BTC; divided by 20.09 million this is 0.82% a year.",
                incorrectExplanation: "The subsidy after April 2024 is 3.125 BTC (6.25 would double the result): $164\\,250 / 20.09$ million $= 0.82\\%$ a year."
            }
        },
        {
            correct: 1,
            en: {
                title: "Bitcoin supply growth and inflation",
                text: "Bitcoin's coin stock grows 0.82% a year after the 2024 halving. A manager concludes that Bitcoin has lower inflation than the euro area, whose central bank targets 2%. What is wrong with this comparison?",
                options: [
                    "Nothing: 0.82% is below 2%, so Bitcoin preserves purchasing power better",
                    "0.82% is growth in the number of coins, not in consumer prices",
                    "The comparison should use the 2024 subsidy of 6.25 BTC instead of 3.125 BTC",
                    "The 2% target refers to money supply growth, which is always higher than coin growth"
                ],
                correctExplanation: "Supply growth measures how fast the number of coins rises. Consumer-price inflation measures how fast prices of goods rise. A coin with slow supply growth can still lose most of its purchasing power when its price falls.",
                incorrectExplanation: "The 0.82% is the growth of the coin stock; the 2% target concerns consumer-price inflation, a different quantity."
            }
        },
        {
            correct: 0,
            en: {
                title: "On-chain or off-chain?",
                text: "Which of the following can an analyst read directly from a public blockchain such as Bitcoin or Ethereum?",
                options: [
                    "The fee paid in each on-chain transfer",
                    "The name of the owner behind an address",
                    "The reserves backing a stablecoin",
                    "The trades matched inside a centralised exchange"
                ],
                correctExplanation: "Fees, amounts, addresses, block size and block time are recorded on chain. Owners, reserves and trades inside an exchange's internal ledger are off-chain.",
                incorrectExplanation: "Only the fee is on-chain. Names, stablecoin reserves and trades inside an exchange are not part of the public record."
            }
        },
        {
            correct: 2,
            en: {
                title: "Pseudonymous addresses",
                text: "Addresses on a public blockchain are pseudonymous. What does this imply for counting the users of a network?",
                options: [
                    "Each address is one person, so the number of active addresses is the number of users",
                    "Addresses are hidden, so no usage statistic can be computed from on-chain data",
                    "An address is neither an entity nor an owner, so address counts are not user counts",
                    "Addresses are linked to names after a waiting period, so user counts are exact for old data"
                ],
                correctExplanation: "One exchange may control thousands of addresses on behalf of many clients, and one person may use many addresses. Analytics firms cluster addresses into entities, with errors.",
                incorrectExplanation: "Addresses are visible but do not carry names; address $\\neq$ entity $\\neq$ economic owner, so address counts are only a rough proxy for users."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading the 82.5% share",
                text: "On 18 September 2026 Bitcoin's market value was 1.63 trillion USD, 82.5% of the basket of five selected coins (BTC, ETH, DOGE, ADA, LTC), worth 1 970 billion USD in total. What does the 82.5% measure?",
                options: [
                    "Bitcoin's share of the whole crypto market on that date",
                    "Bitcoin's share of the five largest coins by market value",
                    "Bitcoin's share of daily trading volume in the five coins",
                    "Bitcoin's share of a basket of five selected coins, not the market"
                ],
                correctExplanation: "The basket contains five coins chosen because their circulating supply is public, not the five largest. The share is relative to this basket only.",
                incorrectExplanation: "The 82.5% is a share of the market value of five selected coins; it says nothing about the whole market or the five largest coins."
            }
        },
        {
            correct: 0,
            en: {
                title: "Effective number of coins",
                text: "Three coins have value shares of 82.5%, 15% and 2.5%. The Herfindahl--Hirschman index (HHI) is $\\sum w_i^2 = 0.70$. What is the effective number of coins?",
                options: [
                    "About 1.4 coins",
                    "Exactly 3, one per coin",
                    "About 0.7 coins",
                    "About 2.1 coins"
                ],
                correctExplanation: "The effective number is $1/\\mathrm{HHI} = 1/0.70 = 1.4$: these three unequal shares are as concentrated as 1.4 equal coins.",
                incorrectExplanation: "The effective number is the inverse of the HHI, $1/0.70 \\approx 1.4$, not the count of coins or the HHI itself."
            }
        },
        {
            correct: 1,
            en: {
                title: "Range of the HHI",
                text: "For a basket of $N = 5$ coins, between which values can the Herfindahl--Hirschman index (HHI) of value shares lie?",
                options: [
                    "Between 0 and 1, reaching 0 when all five coins have equal shares",
                    "Between 0.2 (equal shares) and 1 (one coin holds everything)",
                    "Between 1 and 5, measured in effective coins",
                    "Between 0.2 and 5, depending on how many coins are traded"
                ],
                correctExplanation: "With equal shares $w_i = 1/N$, $\\mathrm{HHI} = N \\cdot (1/N)^2 = 1/N = 0.2$; when one coin holds everything, $\\mathrm{HHI} = 1$.",
                incorrectExplanation: "The HHI goes from $1/N$ (equal shares) to 1 (full concentration); its inverse, the effective number, goes from 1 to $N$."
            }
        },
        {
            correct: 2,
            en: {
                title: "What the basket HHI does not tell",
                text: "The five selected coins (BTC, ETH, DOGE, ADA, LTC) have $\\mathrm{HHI} = 0.71$ on 18 September 2026; an eleven-coin basket in September 2025 gave 0.58. What can you conclude about the concentration of the whole crypto market?",
                options: [
                    "It is 0.71, since Bitcoin dominates any basket in the same way",
                    "It must lie between 0.58 and 0.71, the two baskets measured",
                    "Not exactly: the HHI depends on the coins included in the basket",
                    "It is close to zero, since thousands of coins are traded today"
                ],
                correctExplanation: "Adding coins changes the shares and lowers the HHI. Each figure describes its own basket; the whole market requires the value of every coin, including stablecoins and small tokens.",
                incorrectExplanation: "An HHI describes the basket it is computed on; adding coins lowers it, so the basket figures do not give the concentration of the whole market."
            }
        },
        {
            correct: 0,
            en: {
                title: "What CRIX is",
                text: "How is CRIX (CRypto IndeX, Trimborn and Härdle, 2018) built?",
                options: [
                    "Value-weighted, largest coins, number of coins set by a statistical rule",
                    "Equal-weighted, all coins listed on at least one major exchange",
                    "Volume-weighted, with the number of coins fixed by the index committee each year",
                    "The average Bitcoin price across exchanges, adjusted for fees"
                ],
                correctExplanation: "CRIX weights coins by market value and selects how many to include with a statistical criterion, so the index adapts as the market changes.",
                incorrectExplanation: "CRIX is value-weighted, covers the largest coins, and lets a statistical rule decide how many coins enter."
            }
        },
        {
            correct: 3,
            en: {
                title: "Survivorship bias in a coin index",
                text: "An index built today from the coins that are still traded is computed back to 2018. Why does it overstate what an investor could have earned?",
                options: [
                    "Because value weighting always gives higher returns than equal weighting",
                    "Because monthly rebalancing adds transaction costs that the index ignores",
                    "Because crypto prices are quoted in USD, which lost value over the period",
                    "Because coins that died after 2018 are dropped, so their losses never count"
                ],
                correctExplanation: "This is survivorship bias: selecting coins by their survival removes the failures from the past record, so past returns look better than the returns of the coins actually available in 2018.",
                incorrectExplanation: "The issue is survivorship bias: only coins that survived are included, so the losses of the coins that died are missing."
            }
        },
        {
            correct: 2,
            en: {
                title: "Reading a CAGR",
                text: "The five-coin index (1 000 on 31 January 2018, monthly rebalancing) has a compound annual growth rate (CAGR) of 21.4% over $T = 8.6$ years and an annualised volatility of daily returns of 65.7%. What does the 21.4% mean?",
                options: [
                    "The arithmetic average of the eight calendar-year returns",
                    "The average daily return of the index multiplied by 365",
                    "The constant annual rate linking the first and last values",
                    "The return an investor earns in a typical year, within one volatility of 65.7%"
                ],
                correctExplanation: "The CAGR is $(I_T/I_0)^{1/T} - 1$: it uses only the first and last values and spreads the total growth evenly over the years.",
                incorrectExplanation: "The CAGR $(I_T/I_0)^{1/T} - 1$ depends only on the two end values; it is not an average of yearly or daily returns."
            }
        },
        {
            correct: 1,
            en: {
                title: "Two stablecoin issuers",
                text: "On 18 September 2026 the total stablecoin supply was 303 billion USD (DefiLlama): Tether (USDT) 183 billion and USD Coin (USDC) 74 billion. What share do these two issuers hold together?",
                options: [
                    "About 61%",
                    "About 85%",
                    "About 73%",
                    "About 24.4%"
                ],
                correctExplanation: "$(183 + 74)/303 = 257/303 = 85\\%$: Tether holds 61% and USD Coin 24%.",
                incorrectExplanation: "Add the two supplies and divide by the total: $257/303 \\approx 85\\%$; 61% and 24% are the individual shares."
            }
        },
        {
            correct: 0,
            en: {
                title: "Stablecoin concentration over time",
                text: "Herfindahl--Hirschman index (HHI) of USD stablecoin issuers (DefiLlama): 0.607 in January 2020, 0.282 in April 2022, 0.500 in August 2023, 0.427 in September 2026. Which reading fits these numbers?",
                options: [
                    "It fell in the 2021--2022 boom and rose again after the USDC depeg",
                    "Concentration rose steadily from 2020 to 2026 as Tether gained market share",
                    "Concentration was lowest in 2020, before USD Coin was launched",
                    "Concentration did not change, since Tether held the largest share on every date"
                ],
                correctExplanation: "The HHI dropped from 0.607 to 0.282 by April 2022 (Tether's share fell to 44.0%) and climbed back to 0.500 by August 2023 after USD Coin lost its peg.",
                incorrectExplanation: "The HHI is lowest in April 2022 (0.282) and higher again in August 2023 (0.500): concentration fell in the boom and rose after the USDC depeg."
            }
        },
        {
            correct: 3,
            en: {
                title: "Reading total value locked",
                text: "DeFi (decentralised finance) total value locked (TVL) was 177 billion USD at its peak on 9 November 2021 and is 88 billion USD today. Does this show that users withdrew half of their deposits?",
                options: [
                    "Yes: TVL counts tokens deposited, so a halving of TVL is a halving of deposits",
                    "Yes: TVL is reported in tokens, so price changes do not affect it",
                    "No: TVL counts only stablecoins, so other deposits are missing",
                    "No: TVL is deposits times token prices, so falling prices lower it too"
                ],
                correctExplanation: "TVL is the USD value of deposited tokens. If token prices halve with the same tokens deposited, TVL also halves; separating quantity from price needs token-level data.",
                incorrectExplanation: "TVL is quantity times price; a lower TVL can reflect lower token prices rather than withdrawals."
            }
        },
        {
            correct: 2,
            en: {
                title: "What a spot ETF holds",
                text: "On 10 January 2024 the US Securities and Exchange Commission approved 11 spot Bitcoin exchange-traded funds (ETFs). What makes an ETF a spot ETF?",
                options: [
                    "It holds Bitcoin futures contracts that are rolled every month",
                    "It holds shares of companies that mine Bitcoin",
                    "It holds the coins themselves and issues exchange-traded shares",
                    "It holds a stablecoin that is pegged to the price of Bitcoin"
                ],
                correctExplanation: "A spot ETF owns the underlying coins; its shares let pension funds and other regulated investors hold Bitcoin through a regulated security.",
                incorrectExplanation: "A spot ETF holds the asset itself, here Bitcoin, not futures, mining shares or a token."
            }
        },
        {
            correct: 0,
            en: {
                title: "Transaction counts compared",
                text: "In September--October 2025 (30-day mean), Bitcoin recorded 488 729 transactions a day and Ethereum 1.63 million, 3.3 times as many. Which statement do these numbers support?",
                options: [
                    "Ethereum records 3.3 times as many transactions, whatever their size",
                    "Ethereum transfers about 3.3 times as much value in USD as Bitcoin does",
                    "Ethereum has about 3.3 times as many active users as Bitcoin",
                    "Ethereum's market value should be about 3.3 times that of Bitcoin"
                ],
                correctExplanation: "A transaction count measures activity, not value or users. Smart-contract use can generate many small transactions, which is one possible reason for the gap.",
                incorrectExplanation: "Counts are not values or users: one user can send many transactions, and many transactions can be small."
            }
        },
        {
            correct: 3,
            en: {
                title: "Falling Ethereum fees",
                text: "The average Ethereum fee per transaction (30-day mean) peaked at 24.79 USD in November 2021 and was 0.17 USD in October 2025. Activity has also moved to layer-2 networks. What does the fee chart establish?",
                options: [
                    "That layer-2 networks caused the fall in fees",
                    "That Ethereum is no longer congested at any time",
                    "That the price of Ether fell by the same proportion as the fees",
                    "That fees fell; the chart alone does not identify the cause"
                ],
                correctExplanation: "A time series shows when fees fell, not why. Layer-2 adoption, protocol changes and lower demand could all contribute; identifying the cause needs more than one chart.",
                incorrectExplanation: "The chart shows the fall in fees but not its cause; layer 2 is one candidate explanation among several."
            }
        },
        {
            correct: 2,
            en: {
                title: "Hash rate and attack cost",
                text: "The Bitcoin hash rate rose from 0.30 to 1 079 EH/s (exahashes per second) between 2014 and October 2025, about 3 600 times. What does this imply for the cost of attacking the network?",
                options: [
                    "It rose exactly 3 600 times, since it is proportional to the hash rate",
                    "It did not change, since the difficulty keeps one block every 600 seconds",
                    "It rose, but not in proportion, since better hardware lowered the cost per hash",
                    "It fell, since more miners make it easier to find partners for an attack"
                ],
                correctExplanation: "An attacker must match a large share of the hash rate, so the cost rose. But the cost per hash fell with better hardware and changing energy prices, so the cost did not rise 3 600 times.",
                incorrectExplanation: "More hash rate means a costlier attack, but the cost per hash is not constant: efficiency gains and energy prices break the proportionality."
            }
        },
        {
            correct: 1,
            en: {
                title: "Slope of value on activity",
                text: "Monthly means over 132 months, both on log scales: the correlation of log market value and log transactions is 0.76, and the slope of the log-log line is 3.6. How do you read the slope?",
                options: [
                    "Each additional transaction adds 3.6 USD of market value",
                    "1% more transactions goes with about 3.6% more market value",
                    "Market value is 3.6 times the number of daily transactions",
                    "76% of the market value is explained by transactions"
                ],
                correctExplanation: "In a log-log regression the slope is an elasticity: a 1% change in transactions goes with a 3.6% change in market value in this sample.",
                incorrectExplanation: "On log-log scales the slope is an elasticity (percent per percent), not a USD amount or a ratio of levels."
            }
        },
        {
            correct: 0,
            en: {
                title: "Choosing a data source",
                text: "A compliance officer wants to check one specific Ethereum transaction and the wallet that sent it. Which source fits this task?",
                options: [
                    "A block explorer for the Ethereum chain, such as Etherscan",
                    "A price aggregator such as CoinGecko",
                    "DefiLlama, which reports DeFi total value locked",
                    "The Cambridge Bitcoin Electricity Consumption Index (CBECI)"
                ],
                correctExplanation: "Block explorers (Etherscan, mempool.space) show single transactions, addresses and contracts. Aggregators and dashboards report totals across many transactions or exchanges.",
                incorrectExplanation: "Single transactions and wallets are looked up in a block explorer; aggregators and dashboards give market-wide series."
            }
        },
        {
            correct: 3,
            en: {
                title: "Finding a hidden error",
                text: "In the on-chain files, Bitcoin market value was more than 1 000 times too small from 27 August to 6 September 2023 (11 days). How was the error found, and what was the fix?",
                options: [
                    "A program crashed on the bad rows; the rows were deleted from the file",
                    "The share of missing values exceeded 30%; the coin was dropped",
                    "Two files were compared cell by cell; the file was downloaded again",
                    "A spike on a log-scale chart; the 11 values were set to missing"
                ],
                correctExplanation: "On a log scale a fall by a factor of 1 000 for 11 days is an obvious spike. The values were set to missing; no program would have stopped on them.",
                incorrectExplanation: "The error was visible only on a log-scale chart and the bad days were set to missing; such errors never stop a program from running."
            }
        },
        {
            correct: 1,
            en: {
                title: "Reading a log scale",
                text: "A series is plotted on a log scale. The move from 1 to 10 and the move from 100 to 1 000 have the same height. What does a straight upward line on such a chart mean?",
                options: [
                    "The series rises by the same absolute amount each year",
                    "The series grows at a constant rate",
                    "The series is about to reach a maximum",
                    "The series has no volatility"
                ],
                correctExplanation: "On a log scale equal distances are equal ratios, so a straight line means the same percentage growth every period.",
                incorrectExplanation: "Log scales turn constant ratios into constant distances: a straight line is a constant growth rate, not a constant absolute increase."
            }
        },
        {
            correct: 0,
            en: {
                title: "CAGR of Bitcoin usage",
                text: "Bitcoin transactions per day (monthly means) were 93 112 in January 2015 and 506 379 in September 2025, $T = 10.67$ years apart. The ratio is 5.44 and $\\ln 5.44 = 1.694$. What is the compound annual growth rate (CAGR)?",
                options: [
                    "17.2% a year",
                    "15.9% a year",
                    "41.6% a year",
                    "444% over the period"
                ],
                correctExplanation: "$1.694/10.67 = 0.159$ is the continuous rate; the CAGR is $e^{0.159} - 1 = 17.2\\%$ a year.",
                incorrectExplanation: "Compute $g = (X_{\\text{end}}/X_{\\text{start}})^{1/T} - 1 = e^{1.694/10.67} - 1$; 0.159 is the log rate before converting, and dividing the simple growth by $T$ ignores compounding."
            }
        },
        {
            correct: 3,
            en: {
                title: "From a trend slope to annual growth",
                text: "A log-linear trend $\\ln X_t = a + g\\,t + u_t$ ($t$ in years) fitted to Bitcoin's monthly market value, 2014--2025, gives $\\hat g = 0.586$ (standard error 0.055, $R^2 = 0.88$). What is the implied annual growth rate?",
                options: [
                    "58.6% a year",
                    "88% a year",
                    "83.8% a year",
                    "79.7% a year"
                ],
                correctExplanation: "$\\hat g$ is a continuous rate; the annual growth is $e^{0.586} - 1 = 79.7\\%$.",
                incorrectExplanation: "Convert the continuous rate with $e^{\\hat g} - 1 = 79.7\\%$; 0.88 is the $R^2$ and 83.8% is the two-date CAGR of the same series."
            }
        },
        {
            correct: 2,
            en: {
                title: "Why the trend and the CAGR differ",
                text: "For Bitcoin transactions per day the two-date CAGR (compound annual growth rate) is 17.2% a year, while the log-linear trend over all months gives 10.9% a year. Why do they differ?",
                options: [
                    "The CAGR is in USD and the trend is in transactions",
                    "The trend is biased downwards because it uses logarithms",
                    "The CAGR uses two months; the trend uses every month",
                    "One of the two calculations contains an arithmetic error"
                ],
                correctExplanation: "A CAGR is sensitive to the two dates chosen; the trend regression fits all 132 months. Both still depend on the sample period.",
                incorrectExplanation: "The two methods use different information: two end points against every month in between, so they need not agree."
            }
        },
        {
            correct: 1,
            en: {
                title: "Value grows faster than usage?",
                text: "Bitcoin, monthly, 2014--2025: regressing $\\ln(M_t/n_t)$ on time ($M_t$: market value, $n_t$: transactions per day) gives a growth gap of 0.482 (standard error 0.052, $z = 9.3$). The residual first-order autoregressive (AR(1)) coefficient is 0.96. What is the best reading?",
                options: [
                    "The test proves that Bitcoin's market value is a bubble",
                    "Value outgrew usage here, but persistent residuals weaken the test",
                    "The gap is not significant, since a $z$ of 9.3 is below the 5% critical value",
                    "With an AR(1) coefficient of 0.96 the residuals are independent, so the standard error is exact"
                ],
                correctExplanation: "A $z$ of 9.3 is large, but residuals with AR(1) coefficient 0.96 deviate from the trend for years, so the trend model and its uncertainty are fragile. Faster growth of value than usage is not by itself proof of a bubble.",
                incorrectExplanation: "The gap is large in this sample, but highly persistent residuals weaken the inference, and a growth gap alone does not establish a bubble."
            }
        },
        {
            correct: 3,
            en: {
                title: "The trend one year later",
                text: "The 79.7% trend forecast 6 706 billion USD for Bitcoin's market value in October 2026; the reconstructed value (1--23 October 2026) was 1 670 billion, a ratio of 0.25. The residual AR(1) (first-order autoregressive) coefficient is 0.97. What is the main lesson?",
                options: [
                    "The trend was fine, but the reconstruction of supply is wrong by a factor of four",
                    "The trend should be re-estimated on daily data to forecast better",
                    "A forecast error of this size is normal and falls well inside the naive 95% band",
                    "Residuals behave almost like a random walk, so the naive band is too narrow"
                ],
                correctExplanation: "With residuals that persist almost like a random walk, deviations from the trend accumulate over months. A band built as if residuals were independent and identically distributed (iid) understates the uncertainty, and the outcome ended just below it.",
                incorrectExplanation: "Persistent residuals (AR(1) 0.97) make an iid forecast band far too narrow; a fitted trend describes the past and does not forecast prices."
            }
        }
    ]
};
