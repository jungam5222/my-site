## Overview

I took part in the **Yonsei × Korea AI Hackathon**, co-hosted by the student councils of the Yonsei College of AI Convergence and the Korea University College of Informatics. Teams built bots for **"Flag Battle" (Campus Conquest)**, a two-player strategy game, and pitted them against each other.

We entered as a three-person team, **마른하늘에 날벼樂**. There was no split of roles: each of us built our own bot. We finished **28th of 104 teams** on the final leaderboard.

## The game

- Yonsei (Y) and Korea (K) fight over 17 buildings on a **15×15 grid campus**. The map is point-symmetric around the center.
- Both sides move **simultaneously** each turn, and after **160 turns** the side holding more building points wins.
- Three unit types: **flag bearers** (capture only, cost 5), **fighters** (fight only, cost 3) and **scouts** (move 2, give vision, cost 2).
- Combat is simple. On a shared cell the fighter counts cancel out, and whoever has fighters left wipes out the other side's flag bearers and scouts.
- Buildings have their own effects: the student hall adds +2 income per turn, the engineering hall discounts fighters, the hospital lets you spawn, stations allow teleporting, and the depot gives +15 resources the first time you take it.
- Bots read the state from stdin and print commands. Miss the **300 ms** limit (3 s on the first turn) and you forfeit on the spot. CPU only, and no data files such as trained weights.

## Approach

We first tried **reinforcement learning**, but it performed poorly so we dropped it. From then on we went with a **search-based bot in C++**: each turn it generates several strategy candidates, evaluates them within the 300 ms budget and plays the best one.

The versions went by the name nova, and our final submission was **nova9**, an improved nova8.

## From nova8 to nova9

### Finding the problems

- **Replay analysis**: in 12 games we lost to 12 different teams, 9 came down to **production** (losing the engineering hall or student hall, wasting flag bearers) and 3 to **time spent holding 3-point buildings** when production was even. Enemy flag bearers were exposed without escorts more than 100 times a game, yet we caught only 0 to 2, while we lost up to 16 of ours in a single game.
- **Junk moves**: a move logger showed 11.3% of fighter moves simply undid the previous step. The cause was that only 3 to 5 of 20 candidates got evaluated within the time budget, so the chosen strategy flipped about 50 times a game.

### What we changed

Each feature went on top of nova8 behind its own on/off switch.

1. **Opening plan**: on turn 1, exhaustively search flag bearer routes and production for turns 1 to 15, aiming at buildings we reach first and at student halls, engineering halls and depots.
2. **Flag bearer safety**: only advance when our fighters near the next cell outnumber theirs.
3. **Interception net**: for every cell a moving enemy flag bearer could reach next, send "escorts that could arrive + 1" fighters.
4. **Never abandon economy buildings**: keep defending student halls and engineering halls even when short on units.
5. **Junk-move suppression**: with no enemy nearby, turn a backtracking move into staying put, and re-evaluate last turn's strategy first.

Ideas such as holding flag bearers in place or waiting two turns before neutralizing were tested, lost games, and were left out.

### Validation

Three stages on a local simulator with the real time limits: 80 games per feature to screen, 160 games per bundle on fresh seeds, then 100 games against the original nova8 with sides alternated.

## Results

Final leaderboard: **28th of 104 teams**.

| nova9 vs nova8, 100 games | nova9 | nova8 |
| --- | --- | --- |
| Win rate | **76%** (±8.4) | 24% |
| Flag bearers lost per game | **4.9** | 14.3 |
| Fighter backtracking moves | **6.7%** | 11.1% |
| Economy buildings lost | **5.9** | 7.2 |

- Against other teams' bots and style-specific opponents it won 149 of 164 games (90.9%).
- First turn peaked at 1.1 s (limit 3 s) and normal turns took about 125 ms (limit 300 ms), with zero forfeits.

## What I learned

> We dropped reinforcement learning early because it looked bad, but in hindsight the problem wasn't RL. **Our evaluation model was too weak** for RL to mean much. I still wonder how it would have gone if we had stuck with RL.

- Our counter-strategies for the top teams were based only on replays; we never got to test against their actual bots.
- Most of our losses were on maps with a symmetric economy, decided by who held the central plaza (3 points). Next time I'd strengthen how the bot holds 3-point buildings when production is even.
