---
title: "Shader Optimization Checklist"
description: "Use a practical checklist for deciding what to optimize first and how to explain the tradeoff."
summary: "Optimization is not just removing nodes. It is prioritizing the costs that actually move frame time."
order: 4
duration: "10 min"
level: "Intermediate"
pillar: "optimization"
tags:
  - Optimization
  - Profiling
  - Production
objectives:
  - "Separate visual complexity from real GPU cost."
  - "Describe optimization decisions using measurable tradeoffs."
  - "Build a habit of profiling before rewriting."
prerequisites:
  - "Basic familiarity with materials or shader graphs."
  - "Some sense of what the effect is trying to achieve visually."
---

Optimization work gets stronger when it follows a sequence instead of intuition alone.

## Start with the right question

Before changing the shader, ask:

1. Is the bottleneck actually in the material or somewhere else in the frame?
2. Is the issue ALU-heavy, texture-heavy, bandwidth-heavy, or overdraw-heavy?
3. Which platforms or scenes are failing?

This avoids spending hours "optimizing" code that was never the limiting factor.

## High-value optimization passes

### 1. Reduce expensive texture work

- remove redundant samples
- reuse packed channels
- prefer lower frequency detail where it holds up visually

### 2. Simplify math in hot paths

- avoid repeated normalization when the value can be reused
- precompute constants outside per-pixel work
- replace expensive branches with stable math only if the result remains readable

### 3. Watch overdraw and transparency

For VFX, overdraw often dominates. A smart answer in review is not just "I reduced instructions," but:

> I checked whether fill rate and layered translucency were causing the spike before touching the material graph.

### 4. Use material quality tiers

One senior habit is designing graceful fallback:

```hlsl
float detailMask = _UseCheapMode > 0.5 ? 1.0 : SampleExpensiveMask(uv);
float emissive = baseGlow * detailMask;
```

You do not always need a perfect universal shader. You often need a scalable one.

## A clean interview-style answer

When asked how you optimize a shader, a strong structure is:

1. profile first
2. identify the dominant cost
3. remove or simplify the most expensive stage
4. validate the visual loss against the saved cost

That sounds like production thinking, not random tweaking.
