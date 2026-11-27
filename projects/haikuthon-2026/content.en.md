## Overview

I took part in **HAIKUTHON 2026**, a joint datathon hosted by the AI societies **AIKU** (Korea University) and **HAI** (Hanyang University), as part of a four-person team. It ran overnight at Korea University's Aegineung Hall, from the afternoon of November 21 to the morning of November 22, 2026.

I owned the **stage-2 reranker**: a BLIP model that reorders the 20 candidates from stage 1, trained as a "pick the winner within the family" problem. This pipeline scored **0.4091** on the public leaderboard.

## Problem

**Multimodal RAG**: given an English description (query), find the matching image among the candidates and submit the top 5 in order. Each query has exactly one correct image.

> "Resting on one bench, purple in color, is one backpack that is open and blue."

- **Data**: AI-generated images made by the organizers. Train has 4,000 text–image pairs; Test has 8,000 queries and 16,000 images.
- **Score**: per query, (Recall@1 + NDCG@5) / 2. Rank 1 earns 1, rank 2 0.315, rank 3 0.25, rank 4 0.215, rank 5 0.193, and outside the top 5 earns 0.
- **Constraints**: you submit a model, not predictions. Inference must finish **within 15 minutes** on one NVIDIA L4 (24GB), the ZIP must be 5GB or less, and each team gets 25 submissions.
- Final ranking is 70% leaderboard and 30% final presentation.

## What the data told us: "families"

A teammate's analysis showed that the 4,000 captions come in **families of 4 or 8 images of the same scene, with only color, left/right or counts changed** (97.7% belong to a family). **91.5% of the baseline's top-1 mistakes were images from the same family.** The models found the right family, but couldn't order the images inside it.

So the team went with two stages: **retrieve broadly in stage 1, then tell apart the fine details inside a family in stage 2**.

## What I did

### 1. Reranking with VQAScore (dropped)

I asked a VLM (Qwen3-VL-2B) "Does this figure show this caption?" and used the probability of "Yes" as the score.

| Metric | Value |
| --- | ---: |
| Correct pairs answered "Yes" | 97.5% |
| Own image ranked 1st among 8 in its family | 17.6% (random 12.5%) |

It said "Yes" to almost every correct pair, but just as readily to siblings that differ only in color or left/right, so it was no use as a reranker.

### 2. A BLIP reranker trained family-listwise (main)

- **Stage 1** picks 20 candidates per query, and **BLIP ITM** reorders those 20.
- I trained BLIP to **pick the winner within a family**.
  - Text → image: one caption vs [correct image + up to 7 sibling images + hard negatives]
  - Image → text: one image vs [correct caption + sibling captions + fake captions made by swapping colors, left↔right and above↔below]
  - Listwise softmax cross-entropy. The BLIP ViT stays frozen and image features are cached, so it trains on a Colab T4.
- Validation is split **by family**, because siblings leaking across train and validation inflate the score.
- The final score is `z(BLIP ITM) + 0.25 · z(stage-1 cosine)`, with z standardized per query over its 20 candidates.
- Validation went from 0.545 before training to **0.754** after one epoch of family-listwise training.

### 3. FG-CLIP2 for stage 1

I switched stage 1 to **FG-CLIP2 Large**, which a teammate had found, and bundled its model code inside the ZIP so it runs on the server with no internet. It used **11 min 47 s** of the 15 minutes and scored 0.4091 public.

### 4. Retraining on harder negatives (no gain)

I regrouped families with FG-CLIP2 embeddings and retrained BLIP with new fake captions such as **count swaps** ("two cacti + one tape measure" ↔ "one cactus + two tape measures") and swapped object roles, plus **horizontally flipped images**. A flipped image counts as correct only when the caption's left↔right is swapped too; flipping the image alone makes it a negative. Validation rose to 0.7638, but public dropped slightly to 0.4037.

### 5. Finding the bottleneck: comparing stage 1

On validation (4,000 candidates) the answer almost always lands in the top 10, but Test has 16,000 candidates and public R@5 stopped at 0.70. I tried SigLIP so400m for stage 1, but FG-CLIP2 won on both accuracy (0.4957 vs 0.4436) and speed (about 222 s vs 326 s), so we kept it.

## Result

| Submission | Public | L4 inference |
| --- | ---: | ---: |
| Starter SigLIP alone | 0.2319 | 8 min 59 s |
| FG-CLIP2 alone | 0.3149 | 3 min 42 s |
| **FG-CLIP2 top-20 + family BLIP rerank** | **0.4091** | 11 min 47 s |
| Same, BLIP retrained with new negatives and flips | 0.4037 | |

That's **+0.094** over FG-CLIP2 alone. The 0.4091 submission scored R@1 0.3053, R@5 0.7037 and NDCG@5 0.5129.

## What I learned

> Validation said 0.76 while public said 0.41. Validation had 4,000 candidates and Test had 16,000, so **unless validation matches the test's size**, you find the real bottleneck too late.

- No amount of stage-2 polish helps if the answer never makes it into the stage-1 candidates. In the end, stage-1 recall was the bottleneck.
- Under the 15-minute limit, a larger K (number of candidates) trades off directly against a heavier reranker. K=50 was slightly better on validation, but we kept K=20 for time.
- Yes/no questions like VQAScore can't separate fine differences. Training the model to **pick the best out of the candidates side by side** fit the task much better.
