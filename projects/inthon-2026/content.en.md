## Overview

I joined the **Inthon 2026 Datathon Track**, hosted by the Korea University College of Informatics, as part of the three-person team **Medoid Trio** (Julia Irsalina, 김재형, Yunmin Hong). It was my second Inthon, after last year's.

## Problem

**Multimodal Reasoning for Image Sequences**: given a sequence of images, find the caption out of five that describes it best.

- For example: is the man standing in front of the sofa **buttoning** his shirt, **unbuttoning** it, or buttoning it and then **sitting down**?
- You rank all five options. The correct one scores 1 at rank 1, 0.5 at rank 2, 0.25 at rank 3, 0.125 at rank 4, and 0 below that.
- **Train**: 4,170 episodes from a video benchmark (PerceptionTest), each with an image sequence and **only the correct caption**.
- **Test**: 1,910 episodes from a different benchmark (30% public / 70% private), each with one correct and four wrong captions.

### Rules

- Only DINOv2, all-mpnet-base-v2, SigLIP and SmolVLM-256M were allowed as pretrained models.
- Inference over the whole test set had to finish in 15 minutes and be reproducible on a single T4 GPU.
- Generating data with external AI services and distilling from a teacher model were both banned.

## Approach

### 1. Making wrong answers (text augmentation)

Train only had correct captions, so we had to make the wrong ones ourselves.

- **L1** change one word (opposite verb, color or attribute, a different object), **L2** change the sentence structure (swap the order, replace or add an action), **L3** rewrite with a local LLM, **L4** a caption from another episode
- Rule-based negatives came from spaCy and WordNet, and more varied ones from an open-source LLM that runs on a T4.
- One-word swaps were so unnatural that 83% could be caught from the text alone, so we added a step that filters awkward sentences with SmolVLM.

### 2. Image-sequence models

We tried SigLIP frame features with a temporal transformer, SeqAlign (splitting the caption and matching pieces to frames), and global + local SigLIP. None of them really learned order, and they stayed at 0.365–0.416 public.

### 3. Text centrality (medoid)

"If the images won't talk, read the text." Wrong options were probably made by editing the correct one, so the caption that **overlaps most with the others** is likely the answer.

- **Word medoid**: the caption sharing the most words with the others
- **Meaning medoid**: the caption at the center by sentence-embedding cosine similarity
- We combined the two and added 3–5-gram similarity to catch longer patterns.

### 4. Zero-shot VLM + ensemble + fine-tuning

We used SmolVLM-256M with no training to rank captions by how likely it is to produce each one from the images. That signal was almost independent of text centrality (rank correlation 0.065), so we combined the two with z-scores and finished with a light fine-tune on three losses.

- Listwise ranking loss: rank the correct caption higher
- Temporal order contrastive loss: prefer the original frame order over reversed or shuffled
- Action-direction consistency loss: on a reversed video, prefer the caption with the flipped action

## Result

| Method | Public |
| --- | --- |
| Image-sequence models | 0.365 – 0.416 |
| Zero-shot SmolVLM alone | 0.519 |
| Text centrality (medoid) alone | 0.564 |
| z-score ensemble of both | 0.590 |
| Ensemble + fine-tuning (final) | **0.599** |

## What I learned

> The strongest clue wasn't the images, it was **text centrality**. Medoid alone, with no training, reached 0.564.

- Options that differ only in verb direction, event order or left/right were still out of reach.
- We didn't check enough whether our hard negatives matched the test distribution.
- A learned or confidence-aware ensemble instead of fixed weights could push it further.
