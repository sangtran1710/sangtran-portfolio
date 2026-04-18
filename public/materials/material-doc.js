const DOC_TREE = {
  ue5: {
    label: "UE5 Library",
    home: "/materials/ue5.html",
    groups: [
      {
        title: "Core Packs",
        items: [
          ["/materials/core-packs/uv-motion-pack.html", "UV Motion Pack"],
          ["/materials/core-packs/mask-shaping-pack.html", "Mask Shaping Pack"],
          ["/materials/core-packs/edge-response-pack.html", "Edge Response Pack"],
          ["/materials/core-packs/distortion-pack.html", "Distortion Pack"],
          ["/materials/core-packs/color-emission-pack.html", "Color + Emission Pack"],
          ["/materials/core-packs/runtime-control-pack.html", "Runtime Control Pack"],
        ],
      },
      {
        title: "Style Lanes",
        items: [
          ["/materials/style/style-roadmap.html", "Style Roadmap"],
          ["/materials/style/stylized.html", "Stylized Lane"],
          ["/materials/style/semi-realistic.html", "Semi-Realistic Lane"],
          ["/materials/style/realistic.html", "Realistic Lane"],
          ["/materials/style/anime-cel-shader.html", "Anime / Cel Shader Base"],
        ],
      },
      {
        title: "Anime Detail",
        items: [
          ["/materials/style/anime-skin-shader.html", "Anime Skin Shader"],
          ["/materials/style/anime-hair-shader.html", "Anime Hair Shader"],
          ["/materials/style/anime-eye-highlight.html", "Anime Eye Highlight"],
        ],
      },
      {
        title: "Stylized VFX",
        items: [
          ["/materials/recipes/magic-energy.html", "Magic Energy"],
          ["/materials/recipes/erosion-dissolve.html", "Erosion / Dissolve"],
          ["/materials/recipes/shield-force-field.html", "Shield / Force Field"],
          ["/materials/recipes/portal-vortex.html", "Portal / Vortex"],
          ["/materials/recipes/hologram-material.html", "Hologram Material"],
          ["/materials/recipes/ground-rune-magic-circle.html", "Ground Rune / Magic Circle"],
          ["/materials/recipes/energy-beam.html", "Energy Beam"],
        ],
      },
      {
        title: "Stylized Surfaces",
        items: [
          ["/materials/recipes/fire-heat-distortion.html", "Fire / Heat Distortion"],
          ["/materials/recipes/stylized-water-foam.html", "Stylized Water / Foam"],
          ["/materials/recipes/ice-frost-crystal.html", "Ice / Frost Crystal"],
          ["/materials/recipes/lava-magma.html", "Lava / Magma"],
          ["/materials/recipes/glass-crystal.html", "Glass / Crystal"],
        ],
      },
      {
        title: "Environment + Realistic",
        items: [
          ["/materials/recipes/wet-surface-rain.html", "Wet Surface / Rain"],
          ["/materials/recipes/terrain-layer-blend.html", "Terrain Layer Blend"],
          ["/materials/recipes/realistic-pbr-surface.html", "Realistic PBR Surface"],
        ],
      },
      {
        title: "Character Lookdev",
        items: [
          ["/materials/recipes/semi-realistic-skin.html", "Semi-Realistic Skin"],
        ],
      },
      {
        title: "Production Notes",
        items: [
          ["/materials/production-notes/anime-face-shadow-map.html", "Anime Face Shadow Map"],
          ["/materials/production-notes/anime-outline-rim-control.html", "Anime Outline / Rim Control"],
        ],
      },
    ],
  },
};

const DOC_META = {
  "uv-motion-pack.html": { engine: "ue5", type: "Core Pack" },
  "mask-shaping-pack.html": { engine: "ue5", type: "Core Pack" },
  "edge-response-pack.html": { engine: "ue5", type: "Core Pack" },
  "distortion-pack.html": { engine: "ue5", type: "Core Pack" },
  "color-emission-pack.html": { engine: "ue5", type: "Core Pack" },
  "runtime-control-pack.html": { engine: "ue5", type: "Core Pack" },
  "style-roadmap.html": { engine: "ue5", type: "Style Direction" },
  "stylized.html": { engine: "ue5", type: "Style Lane" },
  "semi-realistic.html": { engine: "ue5", type: "Style Lane" },
  "realistic.html": { engine: "ue5", type: "Style Lane" },
  "anime-cel-shader.html": { engine: "ue5", type: "Style Direction" },
  "anime-skin-shader.html": { engine: "ue5", type: "Style Direction" },
  "anime-hair-shader.html": { engine: "ue5", type: "Style Direction" },
  "anime-eye-highlight.html": { engine: "ue5", type: "Style Direction" },
  "magic-energy.html": { engine: "ue5", type: "Recipe" },
  "erosion-dissolve.html": { engine: "ue5", type: "Recipe" },
  "shield-force-field.html": { engine: "ue5", type: "Recipe" },
  "portal-vortex.html": { engine: "ue5", type: "Recipe" },
  "hologram-material.html": { engine: "ue5", type: "Recipe" },
  "fire-heat-distortion.html": { engine: "ue5", type: "Recipe" },
  "ground-rune-magic-circle.html": { engine: "ue5", type: "Recipe" },
  "energy-beam.html": { engine: "ue5", type: "Recipe" },
  "stylized-water-foam.html": { engine: "ue5", type: "Recipe" },
  "ice-frost-crystal.html": { engine: "ue5", type: "Recipe" },
  "lava-magma.html": { engine: "ue5", type: "Recipe" },
  "glass-crystal.html": { engine: "ue5", type: "Recipe" },
  "wet-surface-rain.html": { engine: "ue5", type: "Recipe" },
  "terrain-layer-blend.html": { engine: "ue5", type: "Recipe" },
  "semi-realistic-skin.html": { engine: "ue5", type: "Recipe" },
  "realistic-pbr-surface.html": { engine: "ue5", type: "Recipe" },
  "anime-face-shadow-map.html": { engine: "ue5", type: "Production Note" },
  "anime-outline-rim-control.html": { engine: "ue5", type: "Production Note" },
};

const SHADERLEX_LANDING_COPY = {
  en: {
    title: "ShaderLex Material Library",
    eyebrow: "ShaderLex / Material Library",
    intro:
      "A practical study hub for stylized, anime, semi-realistic, and realistic materials. Pick a lane, inspect the recipe family, then open the supporting logic only when you need it.",
    "top.ue5": "UE5 Hub",
    "top.roadmap": "Style Roadmap",
    "top.recipe": "Magic Energy",
    "hero.kicker": "Image-led start",
    "hero.title": "Use the visual board first. Open the text only when you need the build steps.",
    "hero.body":
      "ShaderLex works best as a visual index: pick a style lane, jump into a recipe, then read the core logic behind it. The image slot is the anchor for style direction and future generated diagrams.",
    "hero.action.style": "Choose a style lane",
    "hero.action.recipe": "Open a recipe",
    "hero.action.core": "Read core logic",
    "study.kicker": "Study mode",
    "study.title": "Read the library the way technical artists actually learn",
    "study.mode.kicker": "Language workflow",
    "study.mode.title": "English is the source, Vietnamese is the support layer",
    "study.mode.body":
      "Use English when you want production-standard terminology. Switch to Vietnamese when you need a faster mental model without losing the original technical terms.",
    "study.rules.kicker": "Single source of truth",
    "study.rules.title": "Node names and HLSL stay in English",
    "study.rules.body":
      "Shader code, node names, and engine terms should remain stable. Only the explanation layer changes language, so the page teaches without splitting the technical source.",
    "terms.kicker": "Hybrid terminology",
    "terms.note": "Hover a term to see how ShaderLex bridges technical English and Vietnamese explanation.",
    "start.kicker": "Start by task",
    "start.title": "Open the right kind of page first",
    "start.recipe.title": "Build an effect now",
    "start.recipe.body":
      "Open a recipe when you already know the effect you want to build and need graph order, controls, and HLSL quickly.",
    "start.recipe.meta": "Magic Energy, Water, Shield, Portal",
    "start.core.title": "Reuse graph logic",
    "start.core.body":
      "Open a Core Pack when the problem is really UV motion, masking, edge response, distortion, or runtime control.",
    "start.core.meta": "UV Motion, Mask Shaping, Edge Response",
    "start.style.title": "Choose the visual lane",
    "start.style.body":
      "Open the style pages first when the look is still undecided and you need to compare stylized, anime, semi-realistic, and realistic directions.",
    "start.style.meta": "Stylized, Anime, Semi-Realistic, Realistic",
    "start.production.title": "Solve a production issue",
    "start.production.body":
      "Open Production Notes when the recipe is fine in theory but the shot breaks because of face lighting, rim control, or camera-specific artifacts.",
    "start.production.meta": "Face Shadow Map, Outline / Rim Control",
    "lanes.kicker": "Style lanes",
    "lanes.title": "Pick the visual lane first",
    "lanes.cta": "Open full style roadmap",
    "lane.stylized.kicker": "Style lane",
    "lane.stylized.title": "Stylized",
    "lane.stylized.body": "Readable shapes, authored masks, grouped values, and strong art direction.",
    "lane.stylized.meta": "Water, lava, runes, readable VFX surfaces",
    "lane.anime.kicker": "Current focus",
    "lane.anime.title": "Anime / Cel Shader",
    "lane.anime.body": "Controlled shadow bands, face-friendly lighting, outline support, and strict value grouping.",
    "lane.anime.meta": "Skin, hair, eyes, face planes, cel base",
    "lane.semi.kicker": "Bridge lane",
    "lane.semi.title": "Semi-Realistic",
    "lane.semi.body": "Keep stylized readability while moving toward believable material response.",
    "lane.semi.meta": "Skin, cloth, grounded characters, hybrid lookdev",
    "lane.realistic.kicker": "Grounded lane",
    "lane.realistic.title": "Realistic",
    "lane.realistic.body": "PBR discipline, correct scale, packed maps, and predictable lighting behavior.",
    "lane.realistic.meta": "PBR surfaces, terrain, wetness, production-safe baselines",
    "families.kicker": "Recipe families",
    "families.title": "Open a material family directly",
    "families.cta": "Open full recipe index",
    "family.vfx.title": "Stylized VFX",
    "family.vfx.body": "Spells, energy, shields, holograms, portals, and animated masks.",
    "family.vfx.count": "7 recipes",
    "family.vfx.link1": "Magic Energy",
    "family.vfx.link2": "Portal / Vortex",
    "family.vfx.link3": "Shield / Force Field",
    "family.surface.title": "Stylized Surfaces",
    "family.surface.body": "Water, fire, frost, lava, glass, and authored surface looks.",
    "family.surface.count": "5 recipes",
    "family.surface.link1": "Stylized Water",
    "family.surface.link2": "Ice / Frost",
    "family.surface.link3": "Lava / Magma",
    "family.real.title": "Environment + Realistic",
    "family.real.body": "Terrain blend, wetness, weather response, and realistic surface baselines.",
    "family.real.count": "3 recipes",
    "family.real.link1": "Wet Surface / Rain",
    "family.real.link2": "Terrain Layer Blend",
    "family.real.link3": "Realistic PBR Surface",
    "family.character.title": "Character Lookdev",
    "family.character.body": "Character materials where face readability and shading control matter most.",
    "family.character.count": "3 entries",
    "family.character.link1": "Anime / Cel Base",
    "family.character.link2": "Semi-Realistic Skin",
    "family.character.link3": "Semi-Realistic Lane",
    "utility.kicker": "Utility docs",
    "utility.title": "Open the supporting documents quickly",
    "utility.core.title": "Core Packs",
    "utility.core.body": "Reusable graph logic before it turns into a full recipe.",
    "utility.core.meta": "UV Motion, Mask Shaping, Edge Response, Runtime Control",
    "utility.production.title": "Production Notes",
    "utility.production.body": "Shot-level fixes and support cases that do not fit a clean recipe page.",
    "utility.production.meta": "Face Shadow Map, Outline / Rim Control",
    "utility.ue5.title": "UE5 Library Map",
    "utility.ue5.body": "The full branch structure if you need the entire taxonomy and reading order.",
    "utility.ue5.meta": "Architecture, full recipe index, build rules",
    "utility.roadmap.title": "Style Roadmap",
    "utility.roadmap.body": "The overview page when you need to compare stylized, anime, semi-realistic, and realistic lanes.",
    "utility.roadmap.meta": "Lane grouping, use cases, direction planning",
  },
  vi: {
    title: "ShaderLex / Thư viện Material",
    eyebrow: "ShaderLex / Thư viện Material",
    intro:
      "Một study hub thực dụng cho stylized, anime, semi-realistic và realistic materials. Hãy chọn đúng lane trước, xem đúng recipe family sau, rồi mới mở phần logic hỗ trợ khi thật sự cần.",
    "top.ue5": "UE5 Hub",
    "top.roadmap": "Lộ trình style",
    "top.recipe": "Magic Energy",
    "hero.kicker": "Bắt đầu bằng hình",
    "hero.title": "Xem visual board trước. Chỉ mở phần chữ khi bạn cần build step.",
    "hero.body":
      "ShaderLex nên hoạt động như một visual index: chọn style lane, mở recipe, rồi đọc core logic đứng sau nó. Slot hình này là anchor cho style direction và các diagram generate sau này.",
    "hero.action.style": "Chọn style lane",
    "hero.action.recipe": "Mở recipe",
    "hero.action.core": "Đọc core logic",
    "study.kicker": "Chế độ học",
    "study.title": "Đọc library theo đúng cách technical artist thực sự học",
    "study.mode.kicker": "Workflow ngôn ngữ",
    "study.mode.title": "English là nguồn chính, Vietnamese là lớp giải thích hỗ trợ",
    "study.mode.body":
      "Dùng English khi bạn cần thuật ngữ production-standard. Chuyển sang Vietnamese khi cần mental model nhanh hơn nhưng vẫn giữ nguyên technical terms quan trọng.",
    "study.rules.kicker": "Single source of truth",
    "study.rules.title": "Tên node và HLSL luôn giữ bằng English",
    "study.rules.body":
      "Shader code, node names và engine terms nên giữ ổn định. Chỉ lớp giải thích đổi ngôn ngữ, nhờ vậy trang vừa dạy được vừa không làm tách đôi technical source.",
    "terms.kicker": "Hybrid terminology",
    "terms.note": "Rê chuột vào một term để xem cách ShaderLex nối technical English với giải thích tiếng Việt.",
    "start.kicker": "Bắt đầu theo tác vụ",
    "start.title": "Mở đúng loại page ngay từ đầu",
    "start.recipe.title": "Build một effect ngay",
    "start.recipe.body":
      "Mở recipe khi bạn đã biết effect cần làm là gì và muốn vào nhanh graph order, controls và HLSL.",
    "start.recipe.meta": "Magic Energy, Water, Shield, Portal",
    "start.core.title": "Tái sử dụng graph logic",
    "start.core.body":
      "Mở Core Pack khi bài toán thật sự nằm ở UV motion, masking, edge response, distortion hoặc runtime control.",
    "start.core.meta": "UV Motion, Mask Shaping, Edge Response",
    "start.style.title": "Chọn visual lane",
    "start.style.body":
      "Mở style pages trước khi look vẫn chưa chốt và bạn cần so sánh stylized, anime, semi-realistic và realistic direction.",
    "start.style.meta": "Stylized, Anime, Semi-Realistic, Realistic",
    "start.production.title": "Gỡ một vấn đề production",
    "start.production.body":
      "Mở Production Notes khi recipe đúng về lý thuyết nhưng shot vẫn hỏng vì face lighting, rim control hoặc artifact theo góc camera.",
    "start.production.meta": "Face Shadow Map, Outline / Rim Control",
    "lanes.kicker": "Style lanes",
    "lanes.title": "Chọn visual lane trước",
    "lanes.cta": "Mở style roadmap đầy đủ",
    "lane.stylized.kicker": "Style lane",
    "lane.stylized.title": "Stylized",
    "lane.stylized.body": "Shape dễ đọc, authored mask rõ chủ đích, value grouping gọn và art direction mạnh.",
    "lane.stylized.meta": "Water, lava, runes, readable VFX surfaces",
    "lane.anime.kicker": "Trọng tâm hiện tại",
    "lane.anime.title": "Anime / Cel Shader",
    "lane.anime.body": "Shadow band được kiểm soát, lighting thân thiện cho face, có outline support và value grouping chặt.",
    "lane.anime.meta": "Skin, hair, eyes, face planes, cel base",
    "lane.semi.kicker": "Lane chuyển tiếp",
    "lane.semi.title": "Semi-Realistic",
    "lane.semi.body": "Giữ độ đọc kiểu stylized nhưng tiến gần hơn tới material response đáng tin hơn.",
    "lane.semi.meta": "Skin, cloth, grounded characters, hybrid lookdev",
    "lane.realistic.kicker": "Lane grounded",
    "lane.realistic.title": "Realistic",
    "lane.realistic.body": "Kỷ luật PBR, đúng scale, packed maps và lighting behavior dễ đoán hơn.",
    "lane.realistic.meta": "PBR surfaces, terrain, wetness, production-safe baselines",
    "families.kicker": "Recipe families",
    "families.title": "Mở thẳng đúng family material",
    "families.cta": "Mở recipe index đầy đủ",
    "family.vfx.title": "Stylized VFX",
    "family.vfx.body": "Spells, energy, shields, holograms, portals và các animated mask.",
    "family.vfx.count": "7 recipe",
    "family.vfx.link1": "Magic Energy",
    "family.vfx.link2": "Portal / Vortex",
    "family.vfx.link3": "Shield / Force Field",
    "family.surface.title": "Stylized Surfaces",
    "family.surface.body": "Water, fire, frost, lava, glass và các surface look có chủ đích.",
    "family.surface.count": "5 recipe",
    "family.surface.link1": "Stylized Water",
    "family.surface.link2": "Ice / Frost",
    "family.surface.link3": "Lava / Magma",
    "family.real.title": "Environment + Realistic",
    "family.real.body": "Terrain blend, wetness, weather response và realistic surface baselines.",
    "family.real.count": "3 recipe",
    "family.real.link1": "Wet Surface / Rain",
    "family.real.link2": "Terrain Layer Blend",
    "family.real.link3": "Realistic PBR Surface",
    "family.character.title": "Character Lookdev",
    "family.character.body": "Material cho character, nơi face readability và shading control là phần quan trọng nhất.",
    "family.character.count": "3 mục",
    "family.character.link1": "Anime / Cel Base",
    "family.character.link2": "Semi-Realistic Skin",
    "family.character.link3": "Semi-Realistic Lane",
    "utility.kicker": "Utility docs",
    "utility.title": "Mở nhanh các tài liệu hỗ trợ",
    "utility.core.title": "Core Packs",
    "utility.core.body": "Graph logic có thể tái sử dụng trước khi nó trở thành một recipe hoàn chỉnh.",
    "utility.core.meta": "UV Motion, Mask Shaping, Edge Response, Runtime Control",
    "utility.production.title": "Production Notes",
    "utility.production.body": "Các support case theo shot và vấn đề thực chiến không nằm gọn trong một recipe page.",
    "utility.production.meta": "Face Shadow Map, Outline / Rim Control",
    "utility.ue5.title": "UE5 Library Map",
    "utility.ue5.body": "Cấu trúc đầy đủ của branch nếu bạn cần toàn bộ taxonomy và reading order.",
    "utility.ue5.meta": "Architecture, full recipe index, build rules",
    "utility.roadmap.title": "Style Roadmap",
    "utility.roadmap.body": "Trang overview khi bạn cần so sánh stylized, anime, semi-realistic và realistic lanes.",
    "utility.roadmap.meta": "Lane grouping, use cases, direction planning",
  },
};

const SHADERLEX_TERM_GLOSSARY = {
  "draw-calls": {
    title: "Draw Calls",
    en: "A render submission count. Fewer draw calls usually means lower CPU overhead and cleaner batching behavior.",
    vi: "Số lần engine phải gửi lệnh vẽ sang GPU. Ít Draw Calls hơn thường đồng nghĩa CPU overhead thấp hơn và batching sạch hơn.",
  },
  "vertex-normal": {
    title: "Vertex Normal",
    en: "A direction stored per vertex and interpolated across the surface. It shapes lighting, fresnel, rim behavior, and shading transitions.",
    vi: "Hướng pháp tuyến lưu ở từng vertex rồi được nội suy trên bề mặt. Nó ảnh hưởng trực tiếp đến lighting, fresnel, rim và chuyển sắc shading.",
  },
  "material-instance": {
    title: "Material Instance",
    en: "A lightweight child of a master material used to tweak exposed parameters without duplicating the full graph.",
    vi: "Bản con nhẹ hơn của master material, dùng để chỉnh exposed parameters mà không cần nhân đôi toàn bộ graph.",
  },
  "cheap-contrast": {
    title: "Cheap Contrast",
    en: "A low-cost remap trick that pushes values away from the middle so masks look clearer without a heavy function stack.",
    vi: "Một mẹo remap rẻ về chi phí giúp đẩy giá trị ra xa vùng giữa, để mask rõ hơn mà không cần function quá nặng.",
  },
  "world-aligned-texture": {
    title: "World Aligned Texture",
    en: "A world-space texture projection technique that reduces UV dependency, useful on terrain, rocks, cliffs, and fast prototyping.",
    vi: "Kỹ thuật chiếu texture theo world space để giảm phụ thuộc vào UV, rất hữu ích cho terrain, rocks, cliffs và giai đoạn prototype nhanh.",
  },
  "instruction-count": {
    title: "Instruction Count",
    en: "A rough measure of how much work the shader performs. It helps compare cheap versus expensive paths, especially across platforms.",
    vi: "Ước lượng tương đối lượng công việc shader phải xử lý. Nó giúp so sánh path rẻ và path đắt, đặc biệt khi cân giữa các platform.",
  },
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const setTranslatableNode = (node, lang, english, vietnamese) => {
  node.textContent = lang === "vi" ? vietnamese : english;
  node.setAttribute("title", lang === "vi" ? english : vietnamese);
};

const renderTermTooltip = (term, mode) => {
  if (mode === "vi") {
    return `
      <strong>${escapeHtml(term.title)}</strong>
      <span>${escapeHtml(term.vi)}</span>
      <span class="shaderlex-term-tooltip-helper">English reference: ${escapeHtml(term.en)}</span>
    `;
  }

  return `
      <strong>${escapeHtml(term.title)}</strong>
    <span>${escapeHtml(term.en)}</span>
    <span class="shaderlex-term-tooltip-helper">Vietnamese support: ${escapeHtml(term.vi)}</span>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  const layout = document.querySelector(".material-layout");
  const content = document.querySelector(".material-content");
  const sidebar = document.querySelector(".material-sidebar");

  const fileName = window.location.pathname.split("/").pop();
  const pageKey = document.body.dataset.page;

  if (pageKey === "shaderlex-landing" && fileName === "index.html") {
    const toggleButtons = [...document.querySelectorAll("[data-lang-toggle]")];
    const storedLang = window.localStorage.getItem("shaderlex-lang");
    const initialLang = ["en", "vi"].includes(storedLang) ? storedLang : "en";

    const applyLandingLanguage = (lang) => {
      const english = SHADERLEX_LANDING_COPY.en;
      const vietnamese = SHADERLEX_LANDING_COPY.vi;

      document.body.dataset.shaderlexLang = lang;
      document.documentElement.lang = lang === "vi" ? "vi" : "en";
      document.title = lang === "vi" ? vietnamese.title : english.title;

      document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.dataset.i18n;
        if (english[key] && vietnamese[key]) {
          setTranslatableNode(node, lang, english[key], vietnamese[key]);
        }
      });

      document.querySelectorAll("[data-i18n-compact]").forEach((node) => {
        const key = node.dataset.i18nCompact;
        if (english[key] && vietnamese[key]) {
          setTranslatableNode(node, lang, english[key], vietnamese[key]);
        }
      });

      document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
        const key = node.dataset.i18nAlt;
        if (english[key] && vietnamese[key]) {
          const value = lang === "vi" ? vietnamese[key] : english[key];
          node.setAttribute("alt", value);
        }
      });

      document.querySelectorAll(".shaderlex-term-chip").forEach((chip) => {
        const term = SHADERLEX_TERM_GLOSSARY[chip.dataset.termKey];
        const tooltip = chip.querySelector(".shaderlex-term-tooltip");
        if (!term || !tooltip) return;

        tooltip.innerHTML = renderTermTooltip(term, lang);
        chip.setAttribute("aria-label", `${term.title}: ${lang === "vi" ? term.vi : term.en}`);
      });

      toggleButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.langToggle === lang);
      });

      window.localStorage.setItem("shaderlex-lang", lang);
    };

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => applyLandingLanguage(button.dataset.langToggle));
    });

    applyLandingLanguage(initialLang);
  }

  if (!layout || !content) return;

  const meta = DOC_META[fileName];
  const isLanding =
    layout.classList.contains("material-layout-library") ||
    layout.classList.contains("material-layout-portal");
  const sections = [...content.querySelectorAll(".material-section[id]")]
    .map((section) => {
      const heading = section.querySelector("h2");
      return heading ? { section, heading } : null;
    })
    .filter(Boolean);

  if (fileName !== "index.html" && !document.querySelector(".back-to-portal")) {
    const backLink = document.createElement("a");
    backLink.href = "/materials/index.html";
    backLink.className = "back-to-portal";
    backLink.textContent = "Back to Portal";
    document.body.appendChild(backLink);
  }

  if (!isLanding && sidebar && meta) {
    const engineConfig = DOC_TREE[meta.engine];
    sidebar.innerHTML = "";

    const label = document.createElement("p");
    label.className = "mini-label";
    label.textContent = meta.type;
    sidebar.appendChild(label);

    const homeLink = document.createElement("a");
    homeLink.href = engineConfig.home;
    homeLink.className = "nav-tree-home";
    homeLink.textContent = engineConfig.label;
    sidebar.appendChild(homeLink);

    engineConfig.groups.forEach((group) => {
      const currentItem = group.items.some(([href]) => href.endsWith(`/${fileName}`));
      const wrapper = document.createElement("details");
      wrapper.className = "nav-tree-group";
      wrapper.open = currentItem || group.title === "Style Lanes";

      const title = document.createElement("summary");
      title.className = "nav-tree-title";
      title.textContent = group.title;
      wrapper.appendChild(title);

      group.items.forEach(([href, text]) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = text;
        link.className = "nav-tree-link";

        const isCurrent = href.endsWith(`/${fileName}`);
        if (isCurrent) {
          link.classList.add("is-current");
          link.setAttribute("aria-current", "page");
        }

        wrapper.appendChild(link);

        if (isCurrent && sections.length > 0) {
          const sectionList = document.createElement("div");
          sectionList.className = "nav-tree-sections";
          sections.forEach(({ section, heading }) => {
            const linkToSection = document.createElement("a");
            linkToSection.href = `#${section.id}`;
            linkToSection.textContent = heading.textContent.trim();
            linkToSection.className = "nav-tree-section-link";
            sectionList.appendChild(linkToSection);
          });
          wrapper.appendChild(sectionList);
        }
      });

      sidebar.appendChild(wrapper);
    });
  }

  if (isLanding || sections.length < 2) return;

  let toc = document.querySelector(".material-toc");
  if (!toc) {
    toc = document.createElement("aside");
    toc.className = "material-toc";
    toc.innerHTML = '<p class="mini-label">On this page</p><nav aria-label="Page table of contents"></nav>';
    layout.appendChild(toc);
  }

  const nav = toc.querySelector("nav");
  nav.innerHTML = "";
  layout.classList.add("has-page-toc");

  const links = sections.map(({ section, heading }) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.trim();
    nav.appendChild(link);
    return { section, link };
  });

  const setActive = (id) => {
    links.forEach(({ section, link }) => {
      link.classList.toggle("is-active", section.id === id);
    });
  };

  setActive(sections[0].section.id);

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visible.length) {
      setActive(visible[0].target.id);
    }
  }, { rootMargin: "-20% 0px -62% 0px", threshold: [0.1, 0.5, 1] });

  links.forEach(({ section }) => observer.observe(section));
});
