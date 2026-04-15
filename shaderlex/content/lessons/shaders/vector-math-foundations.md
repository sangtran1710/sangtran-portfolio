---
title: "Vector Math Foundations for Real-Time Shaders"
description: "Build intuition for dot products, normals, and why vector math shows up everywhere in lighting code."
summary: "A compact refresher on the math ideas that repeatedly appear in lighting, masking, and direction-based effects."
order: 1
duration: "12 min"
level: "Foundation"
pillar: "foundations"
tags:
  - HLSL
  - Math
  - Lighting
objectives:
  - "Explain what a dot product tells you in shader-friendly language."
  - "Recognize when a vector must be normalized before being used."
  - "Translate the math into practical lighting or mask logic."
prerequisites:
  - "Comfort with basic algebra is enough."
  - "No shader-code background required."
---

Vector math becomes useful in shaders the moment you need to ask a directional question:

- Is a surface facing the light?
- How aligned are two directions?
- What part of a mesh should receive a mask?

The dot product is usually the first answer:

$$
\mathbf{a} \cdot \mathbf{b} = |a||b|\cos(\theta)
$$

If both vectors are normalized, the equation simplifies into a pure alignment test:

- `1` means they point in the same direction
- `0` means they are perpendicular
- `-1` means they point in opposite directions

## A practical lighting read

In Lambert lighting, the intensity is driven by how much the surface normal aligns with the incoming light direction:

```hlsl
float3 N = normalize(input.normalWS);
float3 L = normalize(_MainLightDirection);
float NdotL = saturate(dot(N, L));
float3 diffuse = albedo * NdotL;
```

This works because `dot(N, L)` is answering a physically intuitive question: how directly does the surface face the light?

## Why normalization matters

If the vectors are not normalized, the dot product also contains length information. That means the result stops being a clean alignment read and starts being polluted by magnitude.

You usually want normalization when:

- comparing directions
- building masks from facing direction
- computing lighting terms

You may skip normalization only when:

- the input is already guaranteed normalized
- you intentionally want magnitude to influence the result
- you are optimizing a very hot path and have measured the impact

## Common shader pattern: view-facing mask

You can build a quick fresnel-style mask by comparing the view direction and normal:

```hlsl
float3 N = normalize(input.normalWS);
float3 V = normalize(_CameraPositionWS - input.positionWS);
float facing = dot(N, V);
float rim = pow(1.0 - saturate(facing), 4.0);
```

This is not just math trivia. It is the basis for:

- rim lights
- hologram edges
- dissolve emphasis
- stylized outlines

## A good senior explanation

If someone asks why the dot product matters, a strong answer is:

> It gives me a cheap directional relationship. In shaders, that lets me build lighting, masks, or blending logic from how aligned two vectors are.

That framing is better than saying "it is a math formula I memorized," because it connects directly to production use.
