## What I built

**Starvest (하늘의 별따기)** is a Korean word game where the answers nobody else thinks of fly the highest. I loved [krillion.io](https://krillion.io), but it only exists in English, so I made a Korean one. It's in beta right now.

## How to play

- **7 questions** a day, and you get **25 seconds** to type one answer per question.
- Answers everyone thinks of stop at the streetlight. Answers nobody thought of fly all the way to the **stars**.
- A star is worth 100 points, so a perfect score is **700**.
- If an answer isn't on the list or is wrong, the game tells you why and you can try again before time runs out.
- When you finish, you can copy your result and send it to friends.

## How scoring works

To score an answer, the game needs to know how common it is. In beta, I estimated that from the answers of **100 simulated players**, and I keep adjusting scores with the answers real players submit.

## How it was made

### 2026.10.08

- Put the first version on game.yunmin.dev and made the front page go straight to the game.

### 2026.10.09

- Moved it to `/starvest/`.
- Gave the flying words a different color at each height.

## Next

- Tune the score table with real players' answers
- Make Korean versions of other games like Quordle and chain.le
