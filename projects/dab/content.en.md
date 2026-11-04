## Overview

I took part in the **DAB (Data Analytics for Business) Competition**, run by the Center for Digital Transformation & Business (CDTB) at Korea University Business School. Teams analyze public or company data to come up with **new business model ideas**.

Our five-person team, **한롯기두키** (three business majors, two computer science majors), chose **a dynamic pricing model for the KBO, built for Korea**: predict demand for each game, then set a different ticket price per game to match. I owned **the AI modeling**, building the demand forecast and the pricing model.

We made the finals, which guarantees us **either the grand prize or an excellence award**.

> 👉 Try it yourself in the [“What if Jamsil’s 2025 weekdays had used our prices?” simulator](/projects/dab/result/) (Korean).

## Problem

- **Goal**: using only what is known 7 days before a game, forecast attendance and set the **price that maximizes ticket revenue** for each game
- **Data**: **4,275 home games** over seven seasons (2016–2019, 2023–2025) with attendance, weather, weekday, standings, streaks and more. No ticket prices.
- **Scope**: weekday games at Jamsil (LG and Doosan), assuming a list price of ₩17,000
- **The catch**: attendance has surged since 2024, and in 2025 **47% of games sold out**. For a sold-out game you only know that demand was *at least* capacity.

## Approach

### 1. Demand forecast: heteroscedastic Tobit

```
predicted occupancy = (recent level + effect of game conditions) × seasonal index for the month
```

- **Tobit regression** treats sold-out games as a lower bound ("at least capacity"). Pricing needs demand beyond capacity, so this matters.
- **Recent-level baseline**: start from the average occupancy of the last 5 home games finished 7 days earlier. This alone cut the 2025 error from 24.2 to 12.1 points.
- Adding a **seasonal index, a yearly trend and heteroscedasticity correction** gave the final v2.
- While exploring the data I found that standings and streaks already included the result of the game itself (look-ahead leakage), so I recomputed them from games finished 7 days earlier.

| Version | Model | Mean error, 2025 |
| --- | --- | --- |
| Team's first draft | 5-variable regression | 24.9 pts |
| Baseline | Last season's average | 14.4 pts |
| v1 | XGBoost AFT | 13.7 pts |
| v1 | Recent level + Tobit | 13.0 pts |
| **v2 (final)** | **Tobit + heteroscedasticity + seasonal index + trend** | **12.7 pts** (about 2,690 fans per game) |

### 2. Price response: PSM survey

The data had no prices, so attendance alone couldn't tell us how fans react to price. We ran a **Van Westendorp PSM** survey on weekday ticket prices and, from 48 valid responses, got a **price elasticity of 0.53** (raise prices 10%, lose 5.3% of fans).

### 3. Pricing rule: a common slope

Pick the price that maximizes revenue on a linear demand curve `Q(P) = Q0 − b(P − 17,000)`. With the team's original slope, the forecast cancels out of the formula and **every game gets the same ₩24,560**. So I switched to a **common slope**, where every game loses the same 591 fans per ₩1,000, and prices now follow the forecast from **₩19,210 to ₩29,940**.

## Results

A backtest on the 85 weekday games at Jamsil in 2025, using actual attendance:

| Metric | Result |
| --- | --- |
| Price per game | ₩19,210 – ₩29,940 (median ₩24,470) |
| Ticket revenue | **+11.4%** |
| Attendance | −22.6% |
| Games with higher revenue | 72 of 85 |

Competition result: finalist, with **the grand prize or an excellence award** guaranteed (to be updated after the finals on November 6).

## What I learned

> Most of the revenue gain came from lifting the overall price level into the mid ₩20,000s. **Varying the price game by game added little**, because the forecast couldn't tell which weekday games at Jamsil would draw more (rank correlation 0.19).

- Adding the opposing team would probably help most with telling games apart.
- Elasticity was measured only between ₩17,000 and ₩18,700 from 48 responses, so its range is wide. I'd like to confirm it with a real pricing pilot.
- Maximizing ticket revenue alone cuts attendance by 23%. Counting concessions, merchandise and the fan base would mean capping how far attendance can fall.

<!--
English version of content.md. It's shown when the site is switched to EN.
If this file is missing, the English page shows the Korean content.md instead.
-->
