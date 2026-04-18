# ChatGPT Image Prompt Pack for ShaderLex

Use this file when you want to generate images manually in ChatGPT instead of spending OpenRouter image credits.

Workflow:

1. Copy one prompt below into ChatGPT image generation.
2. Ask for a 16:9 image when ChatGPT offers size/aspect options.
3. Download the image as PNG.
4. Save it into this folder:

```text
public/assets/materials/image/
```

5. Use the exact target filename listed above the prompt.
6. Tell Codex which images are ready, and Codex can wire them into the recipe pages.

Global rules for every image:

- 16:9 landscape, ideally 1920x1080.
- No text in the image.
- No labels, UI, logo, watermark, captions, fake editor panels, or tutorial overlay.
- Make the material behavior readable in two seconds.
- Keep the subject readable at thumbnail size.
- Use clean UE5 material showcase art direction, not a movie poster.
- Prefer simple studio, terrain slice, or controlled game-material preview scenes.

## Priority Batch 01

These replace the most important recipe placeholders.

### Erosion / Dissolve

Target filename:

```text
erosion-dissolve-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a simple stylized stone statue or clean game prop dissolving from right to left into small controlled fragments.

Material behavior to emphasize: strong alpha threshold, readable glowing cyan-orange edge band, visible breakup noise inside the transition, and a remaining silhouette that is still clear at thumbnail size.

Composition: full-bleed widescreen hero, 3/4 camera view, dissolve edge crossing the center of the subject, subject centered inside the safe crop.

Style: production technical-art material-library visual, clean art direction, controlled studio lighting, dark neutral background.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, characters, UI, or square poster framing.
```

### Hologram Material

Target filename:

```text
hologram-material-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a projected simple sci-fi prop rendered as a clean hologram in a dark neutral studio space.

Material behavior to emphasize: cyan rim glow, thin horizontal scanlines, controlled transparent body, light signal breakup, subtle depth fade, and a silhouette readable at thumbnail size.

Composition: full-bleed widescreen hero, 3/4 camera view, subject centered inside the safe crop with calm negative space.

Style: production technical-art material-library visual, refined lighting, clean art direction, no clutter.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, city background, UI, characters, or square poster framing.
```

### Stylized Water / Foam

Target filename:

```text
stylized-water-foam-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: shallow stylized shoreline water over simple sand and rounded rock shapes.

Material behavior to emphasize: turquoise shallow-to-deep color gradient, painterly foam bands around rocks and shore contact, soft ripple highlights, small sparkle accents, and clean readable surface motion implied.

Composition: full-bleed widescreen hero, low 3/4 camera angle, water surface fills most of the frame, shore edge visible, readable at thumbnail size.

Style: production technical-art material-library visual, polished stylized game material, controlled lighting.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, characters, UI, photoreal ocean waves, or square poster framing.
```

## Priority Batch 02

These should be generated next after Batch 01 looks consistent.

### Lava / Magma

Target filename:

```text
lava-magma-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a stylized cracked volcanic rock surface with glowing molten channels.

Material behavior to emphasize: dark crust mask, orange-hot cracks, slow directional molten flow, hot yellow core areas, and subtle heat shimmer.

Composition: full-bleed widescreen hero, slightly top-down 3/4 view, cracks leading toward the center, readable as a material sample rather than a giant eruption.

Style: production technical-art material-library visual, controlled dark studio or game-environment lighting.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, characters, UI, giant eruption scenes, or square poster framing.
```

### Ice / Frost Crystal

Target filename:

```text
ice-frost-crystal-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: several translucent ice shards growing from a dark ground plane.

Material behavior to emphasize: cold blue internal scattering, frosted white edges, cloudy internal breakup, thin crack lines, and a strong rim light that preserves silhouette.

Composition: full-bleed widescreen hero, close 3/4 shot, shards arranged diagonally with readable negative space.

Style: production technical-art material-library visual, clean fantasy-material showcase, controlled lighting.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, Christmas snow scenes, glossy plastic crystal, or square poster framing.
```

### Glass / Crystal

Target filename:

```text
glass-crystal-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a stylized glass or crystal object on a neutral studio pedestal.

Material behavior to emphasize: clean silhouette fresnel, pale cyan tint, roughness breakup, controlled refraction hints, and readable transparent edges.

Composition: full-bleed widescreen hero, studio 3/4 angle, object large enough to inspect the edges.

Style: production technical-art material-library visual, calm neutral lighting with one small warm highlight.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, mirror chrome, over-bloomed fantasy gem effects, or square poster framing.
```

## Priority Batch 03

These complete the remaining recipe visual anchors.

### Fire / Heat Distortion

Target filename:

```text
fire-heat-distortion-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a stylized flame sheet or hot vent with visible heat shimmer above it.

Material behavior to emphasize: bright core, orange outer flame body, soft alpha edge, and subtle distortion ripple in the air.

Composition: full-bleed widescreen hero, low 3/4 angle, flame fills the frame without becoming a full explosion.

Style: production technical-art material-library visual, controlled dark background, readable stylized fire material.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, realistic wildfire, heavy smoke covering the material, or square poster framing.
```

### Energy Beam

Target filename:

```text
energy-beam-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a horizontal stylized energy beam crossing the frame with a small impact glow at one end.

Material behavior to emphasize: hot centerline, soft outer falloff, directional streak noise, controlled HDR glow, and readable endpoint.

Composition: full-bleed widescreen hero, wide landscape composition, beam reads as a long strip rather than a round orb.

Style: production technical-art material-library visual, clean dark neutral background.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, character battle scene, over-bloomed white bar, or square poster framing.
```

### Wet Surface / Rain

Target filename:

```text
wet-surface-rain-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a rain-wet stone or asphalt surface with shallow puddles.

Material behavior to emphasize: darker wet albedo, shifted roughness, puddle masks, small ripple rings, and reflection streaks.

Composition: full-bleed widescreen hero, low ground-level perspective, simple surface patch with readable wetness variation.

Style: production technical-art material-library visual, semi-realistic material preview, cool gray and muted blue palette with a small warm reflected light.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, full city street scene, heavy rain obscuring the material, or square poster framing.
```

### Terrain Layer Blend

Target filename:

```text
terrain-layer-blend-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a compact terrain slice showing grass, dirt, rock, and snow or sand transitions.

Material behavior to emphasize: height-based blend, slope-aware rock, macro color variation, soft layer borders, and clear biome/material hierarchy.

Composition: full-bleed widescreen hero, elevated 3/4 diorama view, terrain layers clearly visible at thumbnail size.

Style: production technical-art material-library visual, controlled game-environment lighting.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, huge open-world vista, tiny unreadable layers, dense foliage clutter, or square poster framing.
```

### Semi-Realistic Skin

Target filename:

```text
semi-realistic-skin-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a neutral stylized character bust or face-plane study with skin material under soft studio light.

Material behavior to emphasize: subtle color zones, cheek warmth, restrained specular, pore normal detail, and soft subsurface response.

Composition: full-bleed widescreen hero, close portrait-material crop, cheek and forehead material response visible, no recognizable real person.

Style: production technical-art material-library visual, semi-realistic character lookdev, neutral blue-gray background.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, celebrity likeness, makeup focus, horror skin detail, or square poster framing.
```

### Realistic PBR Surface

Target filename:

```text
realistic-pbr-surface-hero.png
```

Prompt:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.

Subject: a material sample board with wood, metal, painted surface, and rubber or stone swatches.

Material behavior to emphasize: albedo discipline, roughness differences, normal detail, metalness separation, and believable response under neutral studio lighting.

Composition: full-bleed widescreen hero, top-down or shallow 3/4 studio layout with four readable material samples.

Style: production technical-art material-library visual, realistic PBR baseline, neutral color range.

Do not include text, labels, logos, watermarks, captions, tutorial overlays, UI, product branding, fantasy colors, extreme bloom, or square poster framing.
```

## Style Lane Thumbnails

Use these later for landing page cards, not individual recipe heroes.

### Stylized Lane Thumbnail

Target filename:

```text
style-lane-stylized.png
```

Prompt:

```text
Create a 1920x1080 16:9 UE5 material showcase image for a stylized material lane thumbnail.

Subject: a small collection of readable stylized VFX surfaces: turquoise water edge, glowing magic rune, lava crack, and soft energy shield fragment arranged as simple material samples.

Composition: clean widescreen layout, readable at card thumbnail size, no text.

Style: colorful but controlled stylized game-material preview, strong shape language, clean lighting.

Do not include labels, UI, logos, watermarks, captions, characters, or square poster framing.
```

### Anime / Cel Shader Lane Thumbnail

Target filename:

```text
style-lane-anime-cel.png
```

Prompt:

```text
Create a 1920x1080 16:9 UE5 material showcase image for an anime/cel shader material lane thumbnail.

Subject: a neutral stylized head bust or simple character material study showing clean face shadow bands, controlled outline, hair highlight, and eye highlight hierarchy.

Composition: 3/4 view, simple background, readable at card thumbnail size, no text.

Style: anime/cel shader lookdev, clean value bands, production-safe lighting.

Do not include labels, UI, logos, watermarks, captions, celebrity likeness, complex scene background, or square poster framing.
```

### Semi-Realistic Lane Thumbnail

Target filename:

```text
style-lane-semi-realistic.png
```

Prompt:

```text
Create a 1920x1080 16:9 UE5 material showcase image for a semi-realistic material lane thumbnail.

Subject: a grounded stylized character bust and simple cloth/skin material samples under soft studio light.

Composition: clean 3/4 material showcase, readable at card thumbnail size, no text.

Style: semi-realistic game lookdev, believable material response while preserving stylized readability.

Do not include labels, UI, logos, watermarks, captions, celebrity likeness, clutter, or square poster framing.
```

### Realistic Lane Thumbnail

Target filename:

```text
style-lane-realistic.png
```

Prompt:

```text
Create a 1920x1080 16:9 UE5 material showcase image for a realistic material lane thumbnail.

Subject: realistic PBR surface swatches for stone, wood, metal, and painted plastic under neutral calibrated lighting.

Composition: clean studio material sample board, readable at card thumbnail size, no text.

Style: realistic production material preview with disciplined albedo, roughness, metalness, and normal detail.

Do not include labels, UI, logos, watermarks, captions, product branding, fantasy lighting, or square poster framing.
```
