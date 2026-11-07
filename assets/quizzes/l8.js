// ============================================================
// Practice quiz bank for Lecture 8: Machine Learning, AI and Their Limits; Exam Review (EN)
// correct = index (0-3) of the right option in the original order.
// incorrectExplanation must not name a letter: the engine prepends
// "The correct answer is X) ..." after shuffling the options.
// ============================================================
window.MFM_DATA.quizzes['l8'] = {
    draw: 15,
    questions: [
        {
            correct: 1,
            en: {
                title: "Walk-forward evaluation",
                text: "Bitcoin direction is forecast walk-forward: at each origin the model is trained on all data up to that date, predicts the next 63 days, and is refitted 63 days later with the realised days added. Why is adding those realised test days to the training data not leakage?",
                options: [
                    "Because 63 days are too few to change the estimated coefficients",
                    "Because each forecast still uses only information known before its target day",
                    "Because the test days are removed again before the next forecast is made",
                    "Because classifiers do not depend on the sample they are trained on"
                ],
                correctExplanation: "Leakage means using information from the target period to make the forecast. At the next origin the added days are in the past, exactly as they would be in real time.",
                incorrectExplanation: "The test is whether a forecast uses anything not known at its forecast time; days that have already happened are legitimate inputs for later forecasts."
            }
        },
        {
            correct: 3,
            en: {
                title: "The base rate",
                text: "Bitcoin rose on 50.6% of days in the test period 1 January 2020 – 22 October 2026 ($T = 2\\,487$ days). The logit reaches 51.7% out-of-sample accuracy. How should 51.7% be judged?",
                options: [
                    "Against 50%: the logit is 1.7 percentage points better than chance",
                    "Against 100%: the logit misses almost half of the days, a poor model",
                    "Against in-sample 55.8%: the logit lost 4.1 points out of sample",
                    "Against the 50.6% of “always up”: a gain of 1.1 points"
                ],
                correctExplanation: "A rule that always predicts “up” already scores 50.6%; accuracy must beat this base rate, and the logit beats it by 1.1 points.",
                incorrectExplanation: "The relevant benchmark is the base rate: “always up” already reaches 50.6% in this test period."
            }
        },
        {
            correct: 0,
            en: {
                title: "Brier score",
                text: "The Brier score of probability forecasts $p_t$ of a binary outcome $y_t$ is $\\mathrm{BS} = T^{-1}\\sum_t (p_t - y_t)^2$. If 50% of test days were up days and the forecast is the constant $p_t = 0.5$, what is the Brier score?",
                options: [
                    "0.25, and lower values are better",
                    "0.50, and higher values are better",
                    "0, since the constant forecast is unbiased",
                    "1, the worst score a forecast can get"
                ],
                correctExplanation: "Every day contributes $(0.5 - y_t)^2 = 0.25$. In general the constant $\\bar y$ gives $\\bar y(1-\\bar y)$, which is 0.2500 for the Bitcoin test period; the Brier score is a loss, so lower is better.",
                incorrectExplanation: "Each term is $(0.5 - 0)^2$ or $(0.5 - 1)^2$, both 0.25. The Brier score is a loss: a useful forecast must score below the constant."
            }
        },
        {
            correct: 2,
            en: {
                title: "Brier scores above the constant",
                text: "Out of sample, the Brier scores are 0.2515 (logit), 0.2514 (random forest) and 0.2611 (XGBoost), against 0.2500 for the ex-post constant and 0.2510 for a constant estimated from past data only. What follows?",
                options: [
                    "All models beat a constant, since their accuracy exceeds 50%",
                    "XGBoost has the best probabilities, since its score is highest",
                    "None of the models' probabilities improves on a constant",
                    "Brier scores cannot be compared across different models"
                ],
                correctExplanation: "Every Brier score is worse (higher) than both constants. Accuracy above 50% does not imply useful probabilities.",
                incorrectExplanation: "The Brier score is a loss: values above 0.2510, the constant from past data, mean the raw probabilities are worse than a constant."
            }
        },
        {
            correct: 1,
            en: {
                title: "Area under the curve",
                text: "The logit has an area under the receiver operating characteristic curve (AUC) of 0.525 for Bitcoin's daily direction, 2020–2026. What does this mean?",
                options: [
                    "The logit predicts the direction correctly on 52.5% of test days",
                    "An up-day outranks a down-day with probability 0.525; 0.5 is no skill",
                    "52.5% of the logit's forecast probabilities are above one half",
                    "The logit's probabilities are well calibrated, within 2.5 points"
                ],
                correctExplanation: "The AUC measures ranking: the chance that an up-day is ranked above a down-day. At 0.525 the logit ranks days slightly better than chance.",
                incorrectExplanation: "AUC is a ranking measure, not accuracy or calibration; 0.5 means no skill, so 0.525 is a small ranking ability."
            }
        },
        {
            correct: 3,
            en: {
                title: "Pesaran–Timmermann test",
                text: "The Pesaran–Timmermann (PT) test compares the hit rate $\\hat P$ with the hit rate $P^*$ expected if forecasts and outcomes were independent. One-sided p-values: logit 0.03, random forest 0.07, XGBoost 0.13. Which reading is correct at the 5% level?",
                options: [
                    "All three models have significant directional skill at 5%",
                    "None has skill, since all three p-values exceed 0.01",
                    "XGBoost has the most skill, since its p-value is the largest",
                    "Only the logit rejects independence of forecasts and outcomes"
                ],
                correctExplanation: "Only the logit's p of 0.03 is below 0.05; for the random forest and XGBoost we do not reject independence.",
                incorrectExplanation: "Compare each p-value with 0.05: only the logit (0.03) is below it, so only the logit shows significant directional skill."
            }
        },
        {
            correct: 0,
            en: {
                title: "In-sample versus out-of-sample",
                text: "XGBoost classifies Bitcoin's daily direction with 78.3% accuracy in sample and 51.3% out of sample (base rate 50.6%). Which number should be reported as evidence of skill, and what does the gap show?",
                options: [
                    "51.3% against the 50.6% base rate; the gap shows overfitting",
                    "78.3%, because the in-sample period uses more of the data",
                    "64.8%, the average of in-sample and out-of-sample accuracy",
                    "78.3% against 50%, since the test period is too short to count"
                ],
                correctExplanation: "Only out-of-sample accuracy is evidence; a flexible model fits 78% of past days and 51% of new ones, which is overfitting.",
                incorrectExplanation: "In-sample accuracy measures fit, not forecasting skill. The out-of-sample 51.3% is the relevant number, compared with the base rate."
            }
        },
        {
            correct: 2,
            en: {
                title: "Flexibility and overfitting",
                text: "In-sample accuracy is 55.8% for the logit, 64.6% for the random forest and 78.3% for XGBoost; out of sample it is 51.7%, 51.6% and 51.3%. What pattern do these numbers show?",
                options: [
                    "More flexible models forecast new days better than the logit",
                    "All three models overfit by roughly the same number of points",
                    "More flexibility, larger gap between in- and out-of-sample",
                    "The logit underfits, so a more flexible model should be chosen"
                ],
                correctExplanation: "The gap grows from about 4 points (logit) to 13 (random forest) and 27 (XGBoost), while out-of-sample accuracy stays near 51%.",
                incorrectExplanation: "Flexibility raises in-sample fit, not out-of-sample accuracy: in a low-signal problem it adds variance, not signal."
            }
        },
        {
            correct: 1,
            en: {
                title: "Comparing Sharpe ratios",
                text: "The ML trading strategies (long when $p_t > 0.5$, 10 bp cost per change) have annualised Sharpe ratios of 0.63–0.81, against 0.59 for buy-and-hold, over about 6.8 years. The standard error of an annualised Sharpe ratio is about 0.4. What follows?",
                options: [
                    "The random forest (0.81) is significantly better than buy-and-hold",
                    "Gaps are below one standard error: none beats buy-and-hold",
                    "All ML strategies lose money once the 10 bp costs are deducted",
                    "A standard error of 0.4 means the Sharpe ratios are 40% too high"
                ],
                correctExplanation: "Differences of 0.04–0.22 against a standard error of about 0.4 are well within sampling noise.",
                incorrectExplanation: "Compare the differences in Sharpe ratio with their sampling error: about 0.2 at most against about 0.4 is not evidence of a better strategy."
            }
        },
        {
            correct: 3,
            en: {
                title: "Mostly buy-and-hold",
                text: "The logit strategy is long Bitcoin 85% of the time and has a maximum drawdown of 68.6%, against 76.6% for buy-and-hold (2020–2026). What is the best description?",
                options: [
                    "It is a market-neutral strategy with little exposure to Bitcoin",
                    "It avoids the market's crashes by moving to cash before them",
                    "Its lower drawdown proves that it has real directional skill",
                    "It is mostly buy-and-hold and inherits most market drawdowns"
                ],
                correctExplanation: "A strategy that is long 85% of the time largely tracks the market; its drawdown of 68.6% is close to buy-and-hold's 76.6%.",
                incorrectExplanation: "Look at the share of time long: at 85%, the strategy behaves mostly like buy-and-hold, and its drawdowns are of similar size."
            }
        },
        {
            correct: 0,
            en: {
                title: "Drawdown in log points",
                text: "The equity chart plots cumulative log returns. Buy-and-hold Bitcoin falls by 145 log points from a peak, and its maximum drawdown is reported as 76.6%. Why is it not 145%?",
                options: [
                    "Wealth falls by $1 - e^{-1.45} \\approx 76.6\\%$",
                    "Log returns overstate percentage losses by a factor of two",
                    "The 145 log points also include the transaction costs",
                    "The strategy rules cap the drawdown at 76.6% of wealth"
                ],
                correctExplanation: "Log points add over time but are not percentages of wealth; converting with $1 - e^{-1.45}$ gives 76.6%, which is less than 100% as any loss of wealth must be.",
                incorrectExplanation: "A loss in log points must be converted back to a share of wealth with the exponential; no investor can lose more than 100%."
            }
        },
        {
            correct: 2,
            en: {
                title: "Accuracy by year",
                text: "The out-of-sample accuracy of the Bitcoin direction models falls from 55% in 2020 to 46–51% in 2025–2026. Which limit of ML in crypto finance does this illustrate?",
                options: [
                    "Survivorship: coins that died are missing from the data set",
                    "Look-ahead: the model saw the test period during pretraining",
                    "Non-stationarity: what is learnt in one regime does not persist",
                    "Few tail observations: a 1% quantile rests on very few points"
                ],
                correctExplanation: "Regimes change (the 2020–2021 boom, the 2022 crash, the ETF era); a pattern learnt in one may not transfer to the next.",
                incorrectExplanation: "Accuracy that decays over time points to a changing relationship between features and returns, which is non-stationarity."
            }
        },
        {
            correct: 1,
            en: {
                title: "Shapley values",
                text: "Shapley additive explanations (SHAP) write a prediction as $f(x) = \\phi_0 + \\sum_j \\phi_j(x)$. What is $\\phi_j(x)$?",
                options: [
                    "The coefficient of feature $j$ in a linear regression of next-day returns",
                    "Feature $j$'s average marginal contribution over all orderings",
                    "The correlation between feature $j$ and Bitcoin's next-day return",
                    "The share of next-day return variance explained by feature $j$"
                ],
                correctExplanation: "A Shapley value distributes the model's prediction among the features by averaging each feature's marginal contribution over all orderings.",
                incorrectExplanation: "SHAP values are defined on the model's prediction, not on the market: they average the marginal contribution of a feature to $f(x)$."
            }
        },
        {
            correct: 3,
            en: {
                title: "What SHAP shows",
                text: "In the Bitcoin direction model, the largest SHAP contributions come from today's return and 5-day volatility, and the day of the week ranks fourth. The model has no reliable out-of-sample skill. What can be concluded about the day of the week?",
                options: [
                    "Bitcoin returns depend on the day of the week, as the SHAP rank shows",
                    "The day of the week should be a main input of any Bitcoin model",
                    "The day of the week drives 5-day volatility, which drives the forecast",
                    "Only that the model uses it, not that it predicts returns"
                ],
                correctExplanation: "SHAP explains the model, not the market. Evidence that a feature predicts returns needs out-of-sample skill, and a causal claim needs a design.",
                incorrectExplanation: "Feature contributions describe what a fitted model does. Without forecasting skill, they say nothing about how returns behave."
            }
        },
        {
            correct: 0,
            en: {
                title: "Data snooping",
                text: "We test $N$ trading rules, none of which has any skill (true Sharpe ratio zero). What happens to the best in-sample Sharpe ratio as $N$ grows?",
                options: [
                    "It grows: the maximum of more noisy estimates is larger by chance",
                    "It stays at zero on average, since none of the rules has any skill",
                    "It falls, because adding rules dilutes the signal of the best one",
                    "It converges to the Sharpe ratio of buy-and-hold over the sample"
                ],
                correctExplanation: "Each estimated Sharpe ratio has sampling noise; the maximum over more rules is larger by chance alone. This expected maximum, $\\mathrm{SR}_0$, is the benchmark of the deflated Sharpe ratio.",
                incorrectExplanation: "Selecting the best of many noisy estimates gives an upward-biased winner, and the bias grows with the number of trials."
            }
        },
        {
            correct: 2,
            en: {
                title: "Deflated Sharpe ratio",
                text: "The probabilistic Sharpe ratio $\\mathrm{PSR}(\\mathrm{SR}^*)$ is the probability that the true Sharpe ratio exceeds a benchmark $\\mathrm{SR}^*$. What benchmark does the deflated Sharpe ratio (DSR) use?",
                options: [
                    "Zero, the Sharpe ratio of a rule with no skill at all",
                    "The Sharpe ratio of buy-and-hold Bitcoin over the same period",
                    "$\\mathrm{SR}_0$, the best Sharpe ratio expected by chance",
                    "The average Sharpe ratio of all $N$ rules tried in the search"
                ],
                correctExplanation: "$\\mathrm{DSR} = \\mathrm{PSR}(\\mathrm{SR}_0)$: the winner must beat what the best of $N$ skill-less rules would reach by luck (Bailey and López de Prado, 2014).",
                incorrectExplanation: "The deflation comes from the benchmark: the expected maximum Sharpe ratio of $N$ rules with no skill, which accounts for the search."
            }
        },
        {
            correct: 1,
            en: {
                title: "The winner of 810 rules",
                text: "Among 810 moving-average and momentum rules, the best on 2018–2022 is MOM(2), with Sharpe ratio 0.84 against 0.04 for buy-and-hold. What happens on 2023 – 23 October 2026?",
                options: [
                    "It stays the best rule of the 810, with a Sharpe ratio near 0.84",
                    "Sharpe ratio 0.45 against 0.90 for buy-and-hold; rank 779 of 810",
                    "Its Sharpe ratio rises to 0.90 and it beats buy-and-hold again",
                    "It loses all its capital, with a Sharpe ratio far below zero"
                ],
                correctExplanation: "After selection the winner falls to rank 779 of 810 and to about half of buy-and-hold's Sharpe ratio.",
                incorrectExplanation: "The slide reports Sharpe ratio 0.45 against 0.90 for buy-and-hold, rank 779 of 810: the in-sample winner does not persist."
            }
        },
        {
            correct: 3,
            en: {
                title: "PSR against DSR",
                text: "For the winning rule MOM(2), the probabilistic Sharpe ratio against zero is 0.97 and the deflated Sharpe ratio with $N = 810$ is 0.72. How should a client be told?",
                options: [
                    "The rule is 97% certain to make money, so the client should use it",
                    "The rule has a 72% chance of a positive return in the next year",
                    "The two numbers contradict each other, so neither one is informative",
                    "Alone it looks significant; counting the 810 rules tried, it is not"
                ],
                correctExplanation: "PSR(0) ignores that the rule was picked from 810; DSR compares it with the best Sharpe ratio expected by chance and falls below the 0.95 needed for significance at 5%.",
                incorrectExplanation: "The difference between the two numbers is the cost of the search: against the best expected by chance, the winner is no longer significant."
            }
        },
        {
            correct: 0,
            en: {
                title: "Correlated rules",
                text: "The 810 rules are strongly correlated, so the effective number of independent trials is smaller than 810. With $N = 100$ the deflated Sharpe ratio (DSR) of the winner is 0.80; with $N = 10$ it is 0.89. What follows?",
                options: [
                    "The verdict holds: even with fewer trials the DSR stays below 0.95",
                    "With $N = 10$ the winning rule becomes significant at the 5% level",
                    "Correlation between the rules makes the DSR meaningless here",
                    "The DSR should use $N = 1$, since all the rules are correlated"
                ],
                correctExplanation: "Lowering $N$ raises the DSR, but even at $N = 10$ it stays below the 0.95 threshold; the winner is not significant under any of these assumptions.",
                incorrectExplanation: "The sensitivity check varies $N$ to allow for correlation; at every value shown the DSR remains below 0.95."
            }
        },
        {
            correct: 2,
            en: {
                title: "Reality check and permutations",
                text: "For the best of 810 rules, a permutation illustration gives $p = 0.095$, and White's (2000) reality check with a stationary bootstrap (1 000 samples, mean block 20 days) gives $p = 0.31$. Why is the permutation only an illustration?",
                options: [
                    "Because 200 permutations are too few to estimate a p-value",
                    "Because permutations keep the time order of the returns",
                    "Shuffling destroys volatility clustering; blocks keep it",
                    "Because permutation tests always reject the null hypothesis"
                ],
                correctExplanation: "Shuffling breaks the time dependence of returns; the stationary bootstrap resamples blocks and keeps volatility clustering, so its p of 0.31 is the more credible one.",
                incorrectExplanation: "The difference is time dependence: a permutation removes it, a block bootstrap keeps it. Both lead to the same verdict: we do not reject the null of no skill at 5%."
            }
        },
        {
            correct: 1,
            en: {
                title: "VaR sign convention",
                text: "$q_t$ is the 1% quantile of Bitcoin's daily return given information to $t-1$, here $q_t = -8\\%$. How is the one-day VaR 1% reported?",
                options: [
                    "VaR 99% $= -8\\%$, named by the confidence level",
                    "VaR 1% $= 8\\%$, a positive loss",
                    "VaR 1% $= -8\\%$, the return quantile itself",
                    "VaR 1% $= 1\\%$, the probability of a breach"
                ],
                correctExplanation: "The course convention is $\\mathrm{VaR}_\\alpha = -q_\\alpha$, a positive loss, labelled by the tail probability $\\alpha = 1\\%$.",
                incorrectExplanation: "VaR is reported as a positive loss, the negative of the return quantile, and named by its tail level: VaR 1%."
            }
        },
        {
            correct: 3,
            en: {
                title: "Strictly consistent score",
                text: "Why is the quantile score $\\mathrm{QS}_\\alpha(q, r) = (r - q)(\\alpha - \\mathbb{1}\\{r < q\\})$ preferred to the breach rate for ranking VaR forecasts?",
                options: [
                    "It is easier to compute than the breach rate for each model",
                    "It counts only the days on which a breach of the VaR occurs",
                    "It gives the lowest score to the breach rate closest to $\\alpha$",
                    "Only the true quantile minimises its expectation"
                ],
                correctExplanation: "The QS is strictly consistent for the quantile. A forecast of $-\\infty$ on 99% of days and $+\\infty$ on 1% has an exact 1% breach rate and is useless.",
                incorrectExplanation: "The breach rate only checks the average level; the quantile score rewards the right quantile on every day, which the breach rate cannot do."
            }
        },
        {
            correct: 0,
            en: {
                title: "Coverage tests",
                text: "Bitcoin VaR 1%, test 1 January 2024 – 23 October 2026 (1 027 days, 10.3 breaches expected). EWMA-N has a breach rate of 2.14% with Kupiec p $= 0.001$; the other five models have breach rates of 0.68–1.27% with Kupiec p between 0.28 and 0.82. Which reading is correct?",
                options: [
                    "EWMA-N fails with too many breaches; the others are not rejected",
                    "All six models fail the Kupiec test at the 5% level",
                    "EWMA-N has the best coverage, since its p-value is the smallest",
                    "The other five models are proven to have exactly 1% coverage"
                ],
                correctExplanation: "A Normal quantile on Bitcoin's heavy-tailed returns breaches about twice as often as it should; the other models are not rejected, which is not proof of exact coverage.",
                incorrectExplanation: "A small Kupiec p-value rejects correct coverage: only EWMA-N is rejected. Not rejecting the null for the others does not prove that their coverage is exact."
            }
        },
        {
            correct: 2,
            en: {
                title: "Lowest quantile score",
                text: "In the same Bitcoin VaR 1% test (2024 – October 2026), GARCH-t has a breach rate of 0.68% (7 breaches, 10.3 expected) and the lowest mean quantile score, 0.0803; QGBM has the breach rate closest to 1% (1.07%) and a mean QS of 0.0848. Which statement is correct?",
                options: [
                    "QGBM is the better model, since its breach rate is closest to 1%",
                    "GARCH-t fails coverage, since it has fewer breaches than expected",
                    "GARCH-t, slightly conservative, has the lowest QS; criteria differ",
                    "The two criteria must agree, so one of the reported numbers is wrong"
                ],
                correctExplanation: "The two criteria rank models differently: GARCH-t has too few breaches but the lowest average loss; QGBM is closest to target on average but with a higher QS.",
                incorrectExplanation: "Breach rate and quantile score answer different questions, so they can disagree; here GARCH-t wins on QS and QGBM on breach rate."
            }
        },
        {
            correct: 1,
            en: {
                title: "Not rejecting equal loss",
                text: "At VaR 1%, the mean QS of Chronos-2 minus that of GARCH-t is 0.0025, with 95% interval $[-0.0053, 0.0102]$ from a Diebold–Mariano (DM) test. What does this result say?",
                options: [
                    "Chronos-2 and GARCH-t are equally good at forecasting VaR 1%",
                    "No difference is detected, which is not proof of equal quality",
                    "Chronos-2 is significantly worse, since the difference is positive",
                    "GARCH-t is significantly better than Chronos-2 at the 5% level"
                ],
                correctExplanation: "The interval contains zero, so we do not reject equal expected loss; with about 10 expected breaches the test has little power, and absence of evidence is not evidence of equality.",
                incorrectExplanation: "An interval that contains zero means the difference is not detected, not that it is zero: we do not reject equality."
            }
        },
        {
            correct: 3,
            en: {
                title: "Why the two criteria disagree",
                text: "Two VaR models have the same 1% breach rate over a test period. Why can their mean quantile scores still differ a lot?",
                options: [
                    "Because the quantile score ignores breaches and counts only calm days",
                    "Because the breach rate is computed on a different sample of days",
                    "Because the quantile score depends only on the single largest loss",
                    "Right on average can hide VaRs too high when calm, too low when volatile"
                ],
                correctExplanation: "The breach rate checks the average level only; the quantile score measures, day by day, how far the forecast is from the realised return on both sides.",
                incorrectExplanation: "The same breach count can come from very different daily quantiles; the QS rewards a forecast that tracks the true quantile every day."
            }
        },
        {
            correct: 0,
            en: {
                title: "Trees can jump",
                text: "On 14 January 2024, the 1% VaR of gradient-boosted quantile trees (QGBM) for Bitcoin jumps from 7.3% to 35.4%, while GARCH-t moves from 9.9% to 9.4%. The input was a $-7.9\\%$ return the day after the spot ETF launch, then a 52% fall in volume. What lesson follows?",
                options: [
                    "Trees do not extrapolate smoothly; they need bounds or a fallback",
                    "QGBM correctly anticipated a crash that the GARCH-t model missed",
                    "GARCH-t is broken, since its VaR fell right after a large loss",
                    "A VaR of 35.4% is the correct reaction to a fall in trading volume"
                ],
                correctExplanation: "The trees met this combination of a large loss and a volume collapse only in crash periods and mapped it to a crash-level quantile, while GARCH-t barely moved.",
                incorrectExplanation: "The jump comes from how trees partition the feature space, not from new information about risk; ML risk forecasts need guardrails."
            }
        },
        {
            correct: 2,
            en: {
                title: "Few tail observations",
                text: "Historical simulation (HS) takes the 1% quantile of Bitcoin's last 500 daily returns as the VaR 1%. How many of those 500 returns lie beyond the quantile, and what follows?",
                options: [
                    "About 50, enough to estimate the tail quantile precisely",
                    "About 1, so historical simulation cannot give a 1% VaR at all",
                    "About 5, so the tail estimate is noisy by construction",
                    "About 500, since every return contributes equally to it"
                ],
                correctExplanation: "1% of 500 days is 5 observations: a 1% quantile rests on very few points, which makes every tail model noisy, whatever its method.",
                incorrectExplanation: "Count the tail: 1% of 500 is 5 returns. So few observations make any 1% quantile estimate imprecise."
            }
        },
        {
            correct: 1,
            en: {
                title: "Pinning the checkpoint",
                text: "Chronos-2 is used zero-shot (no parameter fitted to Bitcoin), from a fixed Hugging Face revision and a fixed package version. Why fix the revision instead of loading the model by name?",
                options: [
                    "A fixed revision forecasts more accurately than the latest weights",
                    "A bare name can load other weights later; results would not reproduce",
                    "Zero-shot models must be refitted to Bitcoin at each new revision",
                    "The model's name on Hugging Face changes from one day to the next"
                ],
                correctExplanation: "Pinning the revision fixes the exact weights, which makes the back-test reproducible.",
                incorrectExplanation: "The issue is reproducibility: the weights behind a model name can be updated, so only a fixed revision guarantees the same forecasts."
            }
        },
        {
            correct: 3,
            en: {
                title: "The exam format",
                text: "The exam is on Friday 27 November 2026. Which description matches its format as stated in the lecture?",
                options: [
                    "Oral, with one question on each of the eight lectures",
                    "Written, 120 minutes, open book; 40 multiple-choice questions",
                    "Written, 90 minutes, open book; Part A: 3 problems, Part B: 20 multiple-choice questions",
                    "Written, 90 minutes, closed book; Part A: 20 multiple-choice, Part B: 3 problems"
                ],
                correctExplanation: "The exam is written, 90 minutes, closed book with one A4 formula sheet; Part A has 20 multiple-choice questions, Part B three interpretation problems on real course output.",
                incorrectExplanation: "Part A is the 20 multiple-choice questions (40%) and Part B the three interpretation problems (60%), in a 90-minute written, closed-book exam."
            }
        }
    ]
};
