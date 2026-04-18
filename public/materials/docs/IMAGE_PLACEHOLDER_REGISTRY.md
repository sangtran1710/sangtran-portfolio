# Image Placeholder Registry

This registry is the shot list for future material-library images. Use it after content, design, and layout are stable, so image generation supports the page instead of driving the page.

## Global Standard

- Format: PNG or JPG hero image.
- Aspect ratio: 16:9 landscape.
- Target resolution: 1920x1080.
- Safe crop: subject readable inside the center 70 percent of the frame.
- Image type: UE5 material showcase, not UI mockup, not tutorial screenshot.
- Text: no text, no labels, no logo, no watermark, no fake editor UI.
- Lighting: clear material response, readable silhouette, controlled contrast.
- Composition: full-bleed widescreen hero, no square poster framing.
- Usage: card thumbnail, recipe hero, and visual route preview.

## Existing Pilot References

| Page | Current asset | Keep as |
| --- | --- | --- |
| Anime / Cel Shader Base | `/assets/materials/style/anime-cel-shader-pilot-02.png` | Style direction anchor |
| Magic Energy | `/assets/materials/recipes/magic-energy-pilot-01.png` | Recipe anchor |
| Portal / Vortex | `/assets/materials/recipes/portal-vortex-pilot-01.png` | Recipe anchor |
| Shield / Force Field | `/assets/materials/recipes/shield-force-field-pilot-01.png` | Recipe anchor |`n| Ground Rune / Magic Circle | `/assets/materials/recipes/ground-rune-magic-circle-pilot-01.png` | Recipe anchor |

## New Recipe Image Specs

### Erosion / Dissolve

- Target path: `/assets/materials/recipes/erosion-dissolve-hero.png`
- Scene: simple stylized prop or statue dissolving from one side into small fragments.
- Material read: strong alpha threshold, clean glowing edge band, visible breakup noise, readable remaining silhouette.
- Camera: 3/4 hero view with the dissolve edge crossing the center of the subject.
- Palette: dark neutral surface with orange, cyan, or violet edge glow.
- Avoid: dust explosion, full particle storm, unreadable fragments, text.

### Hologram Material

- Target path: `/assets/materials/recipes/hologram-material-hero.png`
- Scene: projected bust, prop, or simple device rendered as a hologram in a dark studio space.
- Material read: cyan rim glow, thin scanlines, controlled transparent body, light signal breakup.
- Camera: 3/4 view with silhouette clearly readable at thumbnail size.
- Palette: cyan, blue, soft white rim, dark blue-gray background.
- Avoid: noisy full-screen glitch, UI text, cyberpunk city clutter, opaque plastic look.

### Fire / Heat Distortion

- Target path: `/assets/materials/recipes/fire-heat-distortion-hero.png`
- Scene: stylized flame sheet or hot vent with visible heat shimmer above it.
- Material read: bright core, orange outer flame body, soft alpha edge, subtle distortion ripple.
- Camera: low 3/4 angle, flame filling the frame without becoming a full explosion.
- Palette: red, orange, yellow-white core, smoky dark background.
- Avoid: realistic wildfire, heavy smoke covering the material, square poster framing, text.

### Energy Beam

- Target path: `/assets/materials/recipes/energy-beam-hero.png`
- Scene: horizontal stylized beam crossing the frame with a small impact glow at one end.
- Material read: hot centerline, soft outer falloff, directional streak noise, controlled HDR glow.
- Camera: wide landscape composition with the beam readable as a long strip, not a round orb.
- Palette: blue-white, violet, or teal energy on a dark neutral background.
- Avoid: full character battle scene, over-bloomed white bar, unreadable endpoint, text.

### Stylized Water / Foam

- Target path: `/assets/materials/recipes/stylized-water-foam-hero.png`
- Scene: shallow stylized shoreline water over simple sand and rock shapes.
- Material read: turquoise depth gradient, painterly foam bands, soft ripple highlights, small sparkle accents.
- Camera: low 3/4 angle, water surface filling most of the frame, shore edge visible.
- Palette: teal, cyan, pale foam white, warm sand.
- Avoid: realistic ocean simulation, noisy foam, photoreal waves, text, characters.

### Ice / Frost Crystal

- Target path: `/assets/materials/recipes/ice-frost-crystal-hero.png`
- Scene: several translucent ice shards growing from a dark ground plane.
- Material read: cold blue internal scattering, frosted edges, cloudy breakup, thin crack lines.
- Camera: close hero shot, shards arranged diagonally with strong rim light.
- Palette: deep blue shadows, cyan glow, pale white frost.
- Avoid: Christmas snow scene, glossy plastic crystal, busy background, text.

### Lava / Magma

- Target path: `/assets/materials/recipes/lava-magma-hero.png`
- Scene: cracked volcanic rock surface with glowing molten channels.
- Material read: dark crust mask, orange-hot cracks, slow directional flow, subtle heat shimmer.
- Camera: slightly top-down 3/4 view, cracks leading toward the center.
- Palette: black basalt, ember orange, hot yellow core, smoke-gray falloff.
- Avoid: giant eruption scene, character silhouettes, excessive particles, text.

### Glass / Crystal

- Target path: `/assets/materials/recipes/glass-crystal-hero.png`
- Scene: stylized glass or crystal object on a neutral studio pedestal.
- Material read: clean silhouette fresnel, pale tint, roughness breakup, controlled refraction hints.
- Camera: studio 3/4 angle, object large enough to inspect edges.
- Palette: clear cyan, pale mint, soft gray shadows, small warm highlight.
- Avoid: mirror chrome, over-bloomed gem fantasy, unreadable transparency, text.

### Wet Surface / Rain

- Target path: `/assets/materials/recipes/wet-surface-rain-hero.png`
- Scene: rain-wet stone or asphalt surface with shallow puddles.
- Material read: darker wet albedo, shifted roughness, puddle masks, small ripple rings.
- Camera: low ground-level perspective with reflection streaks.
- Palette: cool gray, muted blue, small warm reflected light.
- Avoid: full city street scene, heavy rain obscuring material, photoreal clutter, text.

### Terrain Layer Blend

- Target path: `/assets/materials/recipes/terrain-layer-blend-hero.png`
- Scene: compact terrain slice showing grass, dirt, rock, and snow or sand transition.
- Material read: height-based blend, slope-aware rock, macro color variation, soft layer borders.
- Camera: elevated 3/4 diorama view, terrain layers clearly visible.
- Palette: natural greens, earthy browns, stone gray, optional pale snow.
- Avoid: huge open-world vista, tiny unreadable layers, realistic foliage density, text.

### Semi-Realistic Skin

- Target path: `/assets/materials/recipes/semi-realistic-skin-hero.png`
- Scene: neutral bust or face-plane study with skin material under soft studio light.
- Material read: subtle color zones, cheek warmth, restrained specular, pore normal detail.
- Camera: close portrait crop, cheek and forehead material response visible.
- Palette: natural skin tones, soft warm key light, neutral blue-gray background.
- Avoid: celebrity likeness, makeup focus, anime face, horror skin detail, text.

### Realistic PBR Surface

- Target path: `/assets/materials/recipes/realistic-pbr-surface-hero.png`
- Scene: material sample board with wood, metal, painted surface, and rubber or stone swatches.
- Material read: albedo discipline, roughness differences, normal detail, metalness separation.
- Camera: top-down or shallow 3/4 studio layout with four readable samples.
- Palette: neutral studio lighting, realistic color range, no heavy stylization.
- Avoid: product render branding, extreme bloom, fantasy colors, text.

## Batch Prompt Shell

Use this structure for each image:

```text
Create a 1920x1080 16:9 landscape UE5 material showcase image.
Subject: [recipe subject].
Material behavior to emphasize: [specific visual read].
Composition: full-bleed widescreen hero, subject centered inside the safe crop, readable at thumbnail size.
Style: production material-library visual, clean art direction, controlled lighting, no UI.
Do not include text, logos, watermarks, captions, tutorial overlays, or square poster framing.
```

