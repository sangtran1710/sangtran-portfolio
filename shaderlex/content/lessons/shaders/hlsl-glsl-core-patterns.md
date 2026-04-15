---
title: "HLSL / GLSL Core Patterns"
description: "Learn the handful of code patterns that show up repeatedly in shader work, even when the visuals change."
summary: "You do not need every syntax feature at once. Start with the reusable code shapes that map to common shader tasks."
order: 3
duration: "13 min"
level: "Foundation"
pillar: "languages"
tags:
  - HLSL
  - GLSL
  - Code
objectives:
  - "Recognize the common shapes of shader code."
  - "Translate graph logic into readable HLSL or GLSL snippets."
  - "Understand where vectors, UVs, and sampled values enter the flow."
prerequisites:
  - "Basic comfort reading code blocks."
  - "Helpful after vector math foundations."
---

When people say they want to "learn HLSL" or "learn GLSL", they often mean:

- read what a shader is doing
- change a few lines without guessing
- write small custom logic when nodes become clumsy

That starts with patterns more than language trivia.

## Pattern 1: read, transform, output

A lot of shader code follows this shape:

```hlsl
float2 uv = input.uv;
float mask = saturate(uv.y);
float3 color = lerp(_BottomColor.rgb, _TopColor.rgb, mask);
return float4(color, 1.0);
```

The structure is:

1. read data
2. transform it
3. output a result

That mental model scales better than memorizing every keyword.

## Pattern 2: sample then shape

Texture work usually looks like:

```hlsl
float noise = NoiseTex.Sample(NoiseSampler, uv * _Tiling).r;
float dissolve = smoothstep(_Cutoff - _Width, _Cutoff + _Width, noise);
```

The sample gives raw material. The shaping function turns it into something useful.

## Pattern 3: compare directions

Directional code often becomes:

```hlsl
float3 N = normalize(input.normalWS);
float3 V = normalize(_CameraPositionWS - input.positionWS);
float rim = 1.0 - saturate(dot(N, V));
```

This is the language-level version of the math lesson. The code stays simple when the logic is clear.

## Pattern 4: keep naming readable

Bad names slow you down:

```hlsl
float a = dot(b, c);
```

Readable names keep the shader understandable:

```hlsl
float facing = dot(normalWS, viewDirWS);
```

That is not cosmetic. It is production speed.

## HLSL vs GLSL at the beginner level

The exact syntax changes, but the thinking is mostly the same:

- sample textures
- work with vectors
- build masks
- remap values
- return color or material data

Learn the patterns once. Then adapt the syntax to the engine.
