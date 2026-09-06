export type ProjectCategory = "aaa" | "realtime" | "cinematic" | "igaming";

export interface Project {
  projectType?: "game" | "film";
  slug: string;
  thumbnail: string;
  title: string;
  role: string;
  year: string;
  description: string;
  categories: ProjectCategory[];
  contributions: string[];
  techStack: string[];
  videoUrl?: string;
  images?: string[];
  /** Breakdown: URL + VFX name + optional caption (Behance-style: video -> text -> video -> image) */
  breakdownClips?: { url: string; title: string; caption?: string }[];
  evidenceBreakdown?: { image: string; title: string; caption: string; tag?: string }[];
  steamUrl?: string;
  isFeatured?: boolean;
  /** Display period e.g. "12/2022 - 9/2023" */
  duration?: string;
  /** e.g. "Console, PC" */
  platform?: string;
  /** Client / studio name e.g. "Insomniac Games" */
  client?: string;
  /** Short summary of work done (one paragraph) */
  workSummary?: string;
  /** Visual style: "stylized" | "realistic" */
  style?: "stylized" | "realistic";
  /** Target engine (e.g. "Proprietary Engine", "Unreal Engine 5") */
  engine?: string;
  /** Production constraints (e.g. target framerate, memory, platform budget) */
  constraints?: string[];
  /** Technical highlights / how problems were solved */
  technicalHighlights?: string[];
  /** Optional custom URL if this doesn't use the standard /projects/[slug] route */
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export const SITE = {
  title: "Henry Tran - Technical VFX Artist",
  description:
    "Technical VFX Artist specializing in production-ready effects, shaders, and pipelines for AAA games, cinematics, and launch content.",
  email: "sangminhtran1710@gmail.com",
  logo: "/images/logo.png",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/sang-tran-94686b160/",
  github: "https://github.com/sangtran1710",
  behance: "https://www.behance.net/sangtranminh",
  artstation: "https://www.artstation.com/minhsang11",
  resume: "/Henry_Tran_Technical_VFX_Artist_CV.pdf",
};

export const HERO = {
  name: "Henry Tran",
  tagline: "Hands-on real-time VFX for game production.",
  /** A short line; the rest is conveyed by video & images. */
  description:
    "I build, optimize, and integrate production-ready effects across proprietary engines and Unreal Engine.",
  showreelUrl: "/video/reel_final.mp4",
  showreelYoutube: "https://www.youtube.com/watch?v=qK8jtTMHCRU",
};

export const ABOUT = {
  title: "Hands-on VFX, shaders, and engine integration.",
  bio: [
    "Henry Tran (Tran Minh Sang) is a Technical VFX Artist based in Ho Chi Minh City, specializing in real-time effects for games and cinematics. His real-time game production career began in 2022, following an earlier background in video production, motion graphics, and animation.",
    "That earlier motion and video background provides a strong instinct for timing, silhouette clarity, easing curves, and visual hierarchy — ensuring gameplay effects are punchy, readable, and never visual noise.",
    "In production, I have contributed to AAA releases including Marvel's Spider-Man 2 and Fortnite Remix Finale, working within strict performance budgets, Perforce asset pipelines, and both proprietary and Unreal Engine environments.",
    "I focus on the entire practical execution loop: effect creation, custom HLSL/material graphs, lightweight Python/Blender pipeline tools, and in-engine profiling to guarantee stability and performance on target hardware.",
  ],
  location: "Ho Chi Minh City, Vietnam",
};

/** For home Profile section. portraitImage = front, portraitImageSecondary = back (flips on hover). */
export const PROFILE = {
  headline: "Technical VFX Artist",
  title: "Henry Tran.",
  /** Single line; detailed info reserved for the About page. */
  paragraph:
    "Hands-on across effect creation, optimization, engine integration, and lightweight production tools. Based in HCMC and open to remote collaboration.",
  portraitImage: "/images/Portrait/avatar.png",
  /** Image flipped on hover (secondary avatar in the Portrait folder) */
  portraitImageSecondary: "/images/Portrait/avatar.png",
  ctaText: "Contact me",
  stats: [
    { label: "Shipped Games", value: "8+" },
    { label: "Commercial Projects", value: "20+" },
    { label: "Years in Creative Production", value: "7+" },
    { label: "Tools", value: "Unreal Engine, Unity, Premiere Pro, After Effects, JangaFX" },
    { label: "3D Software", value: "Blender, Houdini, Maya, 3Ds Max, Cinema 4D" },
  ] as const,
};

/** Image beside Technical Skills section (use project thumbnail or custom image). */
export const SKILLS_SECTION_IMAGE = "/images/optimized/new-world-aeternum.jpg";

/** Image beside Visual Effect and Animation / experience section. */
export const VFX_EXPERIENCE_IMAGE = "/images/optimized/fortnite-live-event.jpg";

export const EXPERIENCES: Experience[] = [
  {
    company: "Upwork",
    role: "Freelance Technical VFX Artist",
    duration: "2024 - Present",
    responsibilities: [
      "Deliver real-time VFX, shaders, and technical art directly for indie and mid-size studios with lean pipelines",
      "Build modular Niagara systems, custom master materials, and profiling passes for locked framerate targets",
      "Bridge DCC-to-engine handoff with lightweight Python scripts and optimized mesh preparation",
    ],
    technologies: "Unreal Engine 5, Niagara, HLSL, Houdini",
  },
  {
    company: "Sparx*",
    role: "Senior VFX Artist",
    duration: "Apr 2022 - Present",
    responsibilities: [
      "Developed and optimized real-time VFX for AAA projects including Marvel's Spider-Man 2, Fortnite Remix Finale, New World: Aeternum, and Until Dawn (PS5)",
      "Authored custom shaders and Niagara systems for production gameplay and cinematics",
      "Built Python tools and Houdini workflows to speed up asset production",
      "Worked with art directors, tech leads, and partner teams at Insomniac Games, Epic Games, and Amazon Games",
    ],
    technologies: "Unreal Engine 5, Houdini, Python, HLSL, Perforce, Blender",
  },
  {
    company: "BadClay Studio",
    role: "VFX Artist",
    duration: "Jan 2022 - Apr 2022",
    responsibilities: [
      "Created dynamic visual effects for game cinematics and promotional content",
      "Worked with art direction to hit the target look while staying within performance budgets",
    ],
    technologies: "Houdini, Maya, After Effects",
  },
  {
    company: "FPT Software",
    role: "Video Producer",
    duration: "Jul 2019 - Oct 2020",
    responsibilities: [
      "Produced and edited corporate videos and internal training materials",
      "Managed video production, editing, and final asset delivery",
    ],
    technologies: "Adobe Creative Suite, Cinema 4D",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "VFX & Simulation",
    skills: ["Niagara (UE5)", "Houdini VFX", "After Effects", "Particle Systems", "Physics Simulation"],
  },
  {
    name: "Shaders & Materials",
    skills: ["Unreal Material Graph", "Shader Optimization", "HLSL (Custom Nodes)", "PBR Workflows"],
  },
  {
    name: "3D Software",
    skills: ["Houdini", "Blender", "Maya", "Cinema 4D", "3ds Max", "Substance Designer"],
  },
  {
    name: "Game Engines",
    skills: ["Unreal Engine 5", "Unity", "Niagara", "Sequencer / MRQ"],
  },
  {
    name: "Programming & Pipeline",
    skills: ["Python", "VEX", "C++ (basics)", "Pipeline Automation", "Perforce", "Git"],
  },
  {
    name: "AI & Emerging Tools",
    skills: ["Sora", "Veo-2", "ChatGPT", "Midjourney", "Stable Diffusion", "Prompt Engineering"],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "spider-man-2",
    thumbnail: "/images/spiderman-2-ps5.jpg",
    title: "Marvel's Spider-Man 2",
    role: "FX Artist",
    year: "2023",
    duration: "12/2022 - 9/2023",
    platform: "Console, PC",
    style: "realistic",
    client: "Insomniac Games",
    workSummary:
      "Created cinematic, gameplay, and UI VFX for Insomniac Games' PS5 release.",
    description:
      "Developed particle systems and environmental VFX for combat, traversal, and open-world atmosphere.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Authored Houdini simulations for destruction and debris effects",
      "Built real-time particle systems for combat and traversal VFX",
      "Optimized effects to hit PS5 performance targets",
      "Integrated assets via Perforce pipelines with the Insomniac FX team",
    ],
    techStack: ["Houdini", "Blender", "Proprietary Engine", "Python", "HLSL", "Perforce"],
    engine: "Proprietary Engine",
    constraints: [
      "PS5 locked 60 FPS performance mode target",
      "Proprietary particle system memory budget",
      "Strict Perforce check-in conventions and asset hierarchy",
    ],
    technicalHighlights: [
      "Houdini destruction and debris simulation pipelines",
      "Real-time particle system integration for traversal and combat",
      "Particle count and overdraw profiling on PS5 hardware",
    ],
    videoUrl: "https://www.youtube.com/embed/bgqGdIoa52s?start=1",
    isFeatured: true,
  },
  {
    slug: "fortnite-remix",
    thumbnail: "/images/optimized/fortnite-live-event.jpg",
    title: "Fortnite - Remix The Finale",
    role: "FX Artist",
    year: "2024",
    duration: "6/2023 - 10/2023",
    platform: "PC, Console, Mobile",
    style: "stylized",
    client: "Epic Games",
    workSummary:
      "Created real-time VFX for the cinematic trailer supporting Fortnite's Remix Finale event.",
    description:
      "Built weapon and event VFX for Fortnite Remix Finale, with effects tuned for large-scale real-time playback.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Designed and implemented weapon-skin VFX using Unreal Engine Niagara",
      "Built live-event effects tuned for performance across PC, console, and mobile",
      "Worked directly with Epic's FX team on style, performance, and technical constraints",
    ],
    techStack: ["Unreal Engine", "Houdini", "Blender", "Python", "HLSL", "Perforce"],
    engine: "Unreal Engine",
    constraints: [
      "Multi-platform performance across PC, console, and mobile",
      "Strict visual readability amidst high-density multiplayer gameplay",
      "Epic Games Niagara pipeline standards and LOD rules",
    ],
    technicalHighlights: [
      "Modular Niagara emitters for weapon skins and live event moments",
      "Stylized noise-erosion shaders and unlit master materials",
      "Particle lifecycle and drawcall optimization",
    ],
    videoUrl: "https://www.youtube.com/embed/c-rtUmJPLQM?start=272",
    images: [
      "/images/Fornite/hq720.jpg",
      "/images/Fornite/hq720 (1).jpg",
      "/images/Fornite/Screenshot 2025-08-16 005424.png",
      "/images/Fornite/Screenshot 2025-08-16 005538.png",
      "/images/Fornite/Screenshot 2025-08-16 005614.png",
      "/images/Fornite/Screenshot 2025-08-16 005729.png",
    ],
    breakdownClips: [
      { url: "https://www.youtube.com/watch?v=4NifXy2W_Uk", title: "Weapon Skin VFX", caption: "Weapon skin effects for the event." },
      { url: "https://www.youtube.com/watch?v=u-e9ByS_e80", title: "Live Event Effects", caption: "Real-time effects for the live finale." },
      { url: "https://youtu.be/zwNhOnKD32Y", title: "Environment & Atmosphere", caption: "Environment and atmosphere VFX." },
      { url: "https://youtu.be/6X8aDzsubDs", title: "Impact & Hit FX", caption: "Impact and hit feedback effects." },
      { url: "https://youtu.be/JcexkztUoC8", title: "Ability / Magic VFX", caption: "Ability and magic spell effects." },
      { url: "https://youtu.be/rT3SvdKiz6o", title: "UI & Feedback FX", caption: "UI and player feedback effects." },
      { url: "https://youtu.be/WoRsXjZ4nfA", title: "Destruction & Debris", caption: "Destruction and debris systems." },
      { url: "https://www.youtube.com/watch?v=gavwRrNk_bw", title: "Trail & Projectile", caption: "Trail and projectile VFX." },
      { url: "https://youtu.be/g4cY2vwfroM", title: "Screen & Post FX", caption: "Screen space and post-process effects." },
      { url: "https://youtu.be/G0elrE1kde4", title: "Niagara Systems Breakdown", caption: "Niagara system breakdown and setup." },
      { url: "https://youtu.be/oHyDLyVmhF8", title: "Full Reel / Compilation", caption: "Full breakdown reel." },
      { url: "https://www.youtube.com/watch?v=L8tW8BJh3oU", title: "VFX Breakdown", caption: "Additional breakdown clip." },
    ],
    isFeatured: true,
  },
  {
    slug: "new-world",
    thumbnail: "/images/optimized/new-world-aeternum.jpg",
    title: "New World: Aeternum",
    role: "FX Artist",
    year: "2024",
    duration: "12/2023 - 5/2024",
    platform: "PS5, PC",
    style: "realistic",
    client: "Amazon Games",
    workSummary:
      "FX Artist on the cinematic trailer supporting the New World: Aeternum PS5 launch.",
    description:
      "Contributed cinematic and in-game VFX for Amazon Games' PS5 launch campaign, focused on environment, combat, and atmosphere.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Created environmental VFX including weather, magic, and destruction systems",
      "Created custom shader logic for animated foliage and water surface interactions",
      "Built Houdini procedural pipelines to accelerate asset production",
    ],
    techStack: ["Houdini", "Blender", "Unreal Engine", "Python", "HLSL"],
    engine: "Unreal Engine",
    constraints: [
      "Cinematic environment fidelity under tight marketing milestones",
      "Dynamic weather and lighting consistency",
    ],
    technicalHighlights: [
      "Custom shader logic for foliage motion and water interactions",
      "Procedural Houdini geometry workflows for environment dressing",
    ],
    videoUrl: "https://www.youtube.com/embed/qK8jtTMHCRU",
    isFeatured: true,
  },
  {
    slug: "until-dawn",
    thumbnail: "/images/until-dawn-ps5.jpg",
    title: "Until Dawn",
    role: "Lighting Artist",
    year: "2024",
    duration: "9/2023 - 12/2023",
    platform: "PS5",
    style: "realistic",
    client: "Ballistic Moon",
    workSummary:
      "Lighting Artist on cinematic content for the PS5 remake, supporting a tense horror-driven art direction.",
    description:
      "Contributed cinematic lighting for key sequences, helping establish the remake's horror atmosphere and presentation quality.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Lit cinematic sequences using Unreal Engine 5's Lumen global illumination",
      "Collaborated with directors to establish mood and horror lighting language",
      "Optimized light setups for real-time performance on PS5 hardware",
    ],
    techStack: ["Unreal Engine 5"],
    engine: "Unreal Engine 5",
    constraints: [
      "Real-time Lumen global illumination performance budget on PS5",
      "Atmospheric horror contrast preservation",
    ],
    technicalHighlights: [
      "UE5 Lumen lighting setups for cinematic sequences",
      "Volumetric fog optimization for 60 FPS console target",
    ],
    videoUrl: "https://www.youtube.com/embed/8nApBGPy0ao",
  },
  {
    slug: "malignant",
    thumbnail: "/projects/malignant/steam-capsule.jpg",
    title: "Malignant",
    role: "Technical VFX Artist (Freelance)",
    year: "2025 - 2026",
    duration: "10/2025 - 5/2026",
    platform: "PC (Steam)",
    style: "realistic",
    client: "Buzzkill Interactive",
    workSummary:
      "Authored 80% of visual effects for the 80s horde-shooter Malignant on Steam: weapon combat VFX, blood & gore simulations, environment fire, UMG HUD, and mutagen screen overlays.",
    description:
      "Contracted via Upwork to design, optimize, and integrate core gameplay VFX, UMG widget feedback, and gore simulation pipelines in Unreal Engine 5 for an indie commercial release.",
    categories: ["realtime"],
    contributions: [
      "Simulated fluid blood splatters and impacts using LiquiGen (JangaFX), exporting sprite sheets and flipbooks into Unreal Engine 5",
      "Engineered rate-limiting Blueprint logic (0.1s cooldown throttling) for Niagara blood hits to eliminate frame drops during automatic weapon fire",
      "Created weapon combat VFX including dual-channel SMG muzzle flash lights, recoil integration, and projectile impacts",
      "Designed and implemented UMG HUD widgets (WBP_ActiveSyringe, WBP_InactiveSyringes) featuring dynamic radial cooldowns and stylized ink-brush ammo meters",
      "Built full-screen post-process and material overlay effects for low health, mutagen vein growth, and mutation state transitions",
      "Dressed night town levels (L_Town1) with environment fires, burning vehicles, floating embers, and local light sources",
    ],
    techStack: [
      "Unreal Engine 5",
      "Niagara",
      "LiquiGen",
      "Blueprints",
      "UMG",
      "HLSL / Materials",
      "JangaFX",
    ],
    engine: "Unreal Engine 5",
    constraints: [
      "Maintain 40+ FPS during dense mutant horde encounters and high-fire-rate weapon bursts",
      "Rate-limit particle system spawning on bullet hits to prevent CPU/GPU hitches",
      "Keep stylized 80s horror atmosphere readable with dynamic fire and blood decals in dark environments",
    ],
    technicalHighlights: [
      "LiquiGen fluid simulation pipeline for blood splatter variations and flipbooks",
      "Niagara bullet impact rate-limiting throttling with timed boolean flags and 30s decal persistence",
      "UMG Widget Blueprint architecture for radial cooldowns and active syringe mutagen states",
      "In-engine STATGROUP_game performance profiling for draw call and tick budget verification",
    ],
    steamUrl: "https://store.steampowered.com/app/4314740/Malignant/",
    isFeatured: true,
    images: [
      "/projects/malignant/malignant-combat-profiling.png",
      "/projects/malignant/malignant-ue5-editor-fire.png",
      "/projects/malignant/malignant-liquigen-blood-sim.png",
      "/projects/malignant/malignant-umg-screen-overlay.png",
      "/projects/malignant/malignant-umg-syringe-cooldowns.png",
      "/projects/malignant/malignant-blueprint-weapon-vfx.png",
      "/projects/malignant/malignant-blueprint-blood-rate-limit.png",
    ],
    evidenceBreakdown: [
      {
        image: "/projects/malignant/malignant-combat-profiling.png",
        title: "In-Engine Profiling & Live Combat (UE5 PIE)",
        tag: "Unreal Engine 5 · Profiling",
        caption: "Live Play-In-Editor profiling against sewer mutant hordes (AIC_SewerMutant) using STATGROUP_game. Monitored draw calls (574), primitive counts (2852k), and tick times to guarantee smooth 40+ FPS performance under heavy combat stress.",
      },
      {
        image: "/projects/malignant/malignant-ue5-editor-fire.png",
        title: "Environment Fire & Level Dressing (L_Town1)",
        tag: "Niagara · Environment VFX",
        caption: "Authored environment fire emitters, floating paper debris, and ember particles in L_Town1 (Daybreak town) within Unreal Engine 5. Tuned dynamic point lights to illuminate dark streets without blowing out shadow contrast.",
      },
      {
        image: "/projects/malignant/malignant-liquigen-blood-sim.png",
        title: "Blood Splatter Fluid Simulation",
        tag: "LiquiGen (JangaFX) · Simulation",
        caption: "Simulated high-velocity blood splatter trajectories using LiquiGen (JangaFX). Generated multi-angle flipbook sprite sheets for in-engine Niagara burst emitters.",
      },
      {
        image: "/projects/malignant/malignant-umg-screen-overlay.png",
        title: "Mutagen Syringe UMG & Screen Overlay",
        tag: "UMG · Screen Post-Process",
        caption: "Engineered the core WBP_ActiveSyringe widget blueprint with a stylized ink-brush health bar and mutagen gauge. Added dynamic full-screen red vein overlay shaders that trigger when health drops or when mutant powers activate.",
      },
      {
        image: "/projects/malignant/malignant-umg-syringe-cooldowns.png",
        title: "Mutation Skill Cooldowns & Overlays",
        tag: "UMG · Radial Shaders",
        caption: "Designed WBP_InactiveSyringes for mutant ability states (Boneblades, Abomination, Tox). Implemented material-driven radial fill meters to communicate cooldown progress clearly during fast-paced encounters.",
      },
      {
        image: "/projects/malignant/malignant-blueprint-weapon-vfx.png",
        title: "Weapon VFX & Muzzle Flash Logic",
        tag: "Blueprint · Weapon VFX",
        caption: "Blueprint logic in BP_SMG controlling dual-side muzzle flash point lights with a 0.02s auto-cutoff timer, weapon recoil integration, and randomized impact VFX.",
      },
      {
        image: "/projects/malignant/malignant-blueprint-blood-rate-limit.png",
        title: "Niagara Blood Hit Rate-Limiting",
        tag: "Blueprint · Performance Optimization",
        caption: "Performance optimization gate for bullet impact blood VFX. Uses a 0.1s timed boolean flag to throttle particle system spawns during automatic weapon fire, preventing particle flooding while spawning 30-second persistent blood decals (MI_BloodDecal).",
      },
    ],
  },
  {
    slug: "black-knight",
    thumbnail: "/images/Black_Knight_Thumbnail.jpg",
    title: "Black Knight (Netflix)",
    role: "FX Houdini Artist",
    year: "2023",
    description:
      "Created dynamic and environmental VFX for the Netflix original series within a broadcast-focused cinematic pipeline.",
    categories: ["cinematic"],
    contributions: [
      "Simulated dust, smoke, and debris using Houdini solvers (FLIP, pyro, grain)",
      "Delivered render-ready geometry caches and Alembic exports for the compositing team",
      "Worked within strict production deadlines on a compressed broadcast schedule",
    ],
    techStack: ["Houdini", "Blender", "Maya", "Nuke", "Python"],
    videoUrl: "https://www.youtube.com/embed/Se26Op9sEC8?start=8",
  },
  {
    slug: "havoc",
    thumbnail: "/images/havoc-logo.png",
    title: "Havoc - Game",
    role: "VFX Artist (Freelance)",
    year: "2024",
    description:
      "Contributed freelance real-time VFX for gameplay systems and cinematics in Unreal Engine.",
    categories: ["realtime"],
    contributions: [
      "Designed Niagara particle systems for combat abilities and environmental effects",
      "Designed custom materials for stylized effects",
      "Collaborated remotely with the core team to iterate on visual targets",
    ],
    techStack: ["Unreal Engine", "Houdini", "Blender", "HLSL"],
    engine: "Unreal Engine",
    constraints: [
      "Indie production constraints: lightweight asset footprint, high iteration speed",
      "Clear visual hierarchy for gameplay abilities",
    ],
    technicalHighlights: [
      "Unreal Engine Niagara particle systems for combat abilities",
      "Stylized dissolve and Fresnel material shaders",
    ],
    images: ["/images/havoc-landing-page.png"],
  },
  /*
  {
    slug: "wolverine",
    thumbnail: "/images/Wolverine.png",
    title: "Marvel's Wolverine",
    role: "VFX Artist",
    year: "2025",
    duration: "10/2024 - Present",
    platform: "PS5",
    style: "realistic",
    client: "Insomniac Games",
    workSummary:
      "Contributed VFX work visible in publicly released trailer footage.",
    description:
      "Selected VFX contributions are visible in released trailer footage. Further project details remain under NDA.",
    categories: ["aaa", "realtime"],
    contributions: ["Public trailer VFX contribution; further details under NDA"],
    techStack: ["Unreal Engine", "Houdini", "Perforce"],
    videoUrl: "https://www.youtube.com/watch?v=s3pDMUWlA6I",
  },
  */
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured);

/** AAA titles: Spider-Man 2, Fortnite, New World, Until Dawn, Wolverine */
export const AAA_PROJECT_SLUGS = [
  "spider-man-2",
  "fortnite-remix",
  "new-world",
  "until-dawn",
];

/** Sort key by end date (higher = more recent). "Present" = first. */
function projectEndSortKey(p: Project): number {
  const d = p.duration ?? p.year;
  if (/Present/i.test(d)) return 999912;
  const match = d.match(/\s*-\s*(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 100 + parseInt(match[1], 10);
  const y = parseInt(p.year, 10);
  return Number.isNaN(y) ? 0 : y * 100 + 12;
}

export const AAA_PROJECTS = PROJECTS.filter((p) =>
  AAA_PROJECT_SLUGS.includes(p.slug)
).sort((a, b) => projectEndSortKey(b) - projectEndSortKey(a));

/** Others: Black Knight, Havoc - most recent first */
export const OTHER_PROJECTS = PROJECTS.filter(
  (p) => !AAA_PROJECT_SLUGS.includes(p.slug)
).sort((a, b) => projectEndSortKey(b) - projectEndSortKey(a));

export interface RndProject {
  title: string;
  category: string;
  tools: string[];
  /** Thumbnail image or local video path for preview */
  image: string;
  /** Destination when clicking the card */
  link: string;
  /** Optional: embedded video URL for looping preview (e.g. Vimeo/YouTube) */
  embedUrl?: string;
  /** Optional: "View on ArtStation" etc. Default "View on Behance" */
  linkLabel?: string;
  slug?: string;
  year?: string;
  /** Optional: show in dedicated group for HR / recruiters */
  group?: "vfx" | "igaming";
}

/** iGaming / Live Casino / ARRISE-style artwork for dedicated /igaming page */
export interface IgamingArtwork {
  title: string;
  category: string;
  description?: string;
  image: string;
  videoUrl?: string;
  link?: string;
  linkLabel?: string;
  tools?: string[];
}

export const IGAMING_ARTWORKS: IgamingArtwork[] = [
  // Add items when ready - e.g. Mega Wheel overlay, broadcast samples
];

export const RND_PROJECTS: RndProject[] = [
  {
    title: "VFX Flow",
    category: "Pipeline Tool & Quality Gate",
    tools: ["PowerShell", "WPF", "Python", "Perforce CLI"],
    image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
    link: "/rnd/vfx-flow",
    linkLabel: "View pipeline breakdown",
    slug: "vfx-flow",
    year: "2026",
    group: "vfx",
  },
  {
    title: "Erlangmon VFX",
    category: "Stylized character VFX",
    tools: ["Unreal Engine", "Niagara", "Materials", "Blender"],
    image: "/projects/erlangmon-vfx/poster.jpg",
    link: "/rnd/erlangmon-vfx",
    linkLabel: "View breakdown",
    slug: "erlangmon-vfx",
    year: "2026",
    group: "vfx",
  },
  {
    title: "Destructible Separate Mesh Tool",
    category: "Blender Python Pipeline Tool",
    tools: ["Blender", "Python", "Technical Art", "Pipeline"],
    image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.png",
    link: "/blog/destructible-separate-mesh-tool",
    linkLabel: "View tool breakdown",
    slug: "destructible-separate-mesh-tool",
    year: "2026",
    group: "vfx",
  },
  {
    title: "HistoryBlends - AI Filmmaking",
    category: "AI Content Creation",
    tools: ["Sora", "Veo-2", "ChatGPT", "Midjourney", "Prompt Engineering"],
    image: "/images/Gemini_Generated_Image_ynlyiiynlyiiynly.png",
    link: "/rnd/historyblends",
    linkLabel: "View project details",
    slug: "historyblends",
    year: "2025",
  },
  {
    title: "Level Up - Crypto.com",
    category: "3D Environment",
    tools: ["Blender", "After Effects"],
    image: "/images/LevelUp.png",
    link: "/rnd/levelup",
    linkLabel: "View project details",
    slug: "levelup",
    year: "2025",
  },
  {
    title: "Stylized Combat & Magic VFX",
    category: "Real-time VFX Study",
    tools: ["Unreal Engine", "Niagara", "HLSL"],
    image: "https://img.youtube.com/vi/_g9fzTlKCVQ/sddefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/_g9fzTlKCVQ?muted=1&mute=1&start=235&autoplay=1&loop=1&playlist=_g9fzTlKCVQ",
    link: "https://www.youtube.com/watch?v=_g9fzTlKCVQ",
    linkLabel: "Watch on YouTube",
    year: "2026",
    group: "vfx",
  },
  {
    title: "Divecore - Diving Watch Strap",
    category: "3D Product",
    tools: ["Blender"],
    image: "/images/WatchHPBlender/Screenshot.png",
    link: "https://www.artstation.com/artwork/qJL4AN",
    linkLabel: "View on ArtStation",
    year: "2024",
  },
  {
    title: "Shatter Earth Impact VFX",
    category: "Real-time Visual Effects",
    tools: ["Unreal Engine", "Blender", "Substance Designer"],
    image: "https://img.youtube.com/vi/FcIUXgQ4c3s/maxresdefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/FcIUXgQ4c3s?muted=1&mute=1&autoplay=1&loop=1&playlist=FcIUXgQ4c3s",
    link: "/rnd/art-vfx",
    linkLabel: "View project details",
    slug: "art-vfx",
    year: "2024",
    group: "vfx",
  },
  {
    title: "Ethereum Bloom",
    category: "Flowers growing into Ethereum logo",
    tools: ["Unreal Engine", "Niagara"],
    image: "/images/ETH.png",
    embedUrl:
      "https://player.vimeo.com/video/1108882585?background=1&autopause=0&muted=1&loop=1&playsinline=1&badge=0&title=0&byline=0",
    link: "https://www.behance.net/gallery/232255967/ETHEREUM-MOTION-ART",
    year: "2025",
    group: "vfx",
  },
  {
    title: "Houdini / Redshift / Unreal Engine R&D",
    category: "Graduation Project",
    tools: ["Houdini", "Redshift", "Unreal Engine"],
    image: "/video/project-my.mp4",
    link: "/rnd/project-my",
    linkLabel: "View project details",
    slug: "project-my",
    year: "2022",
  },
  {
    title: "Circle and Vellum",
    category: "Reel / Houdini Karma",
    tools: ["Houdini", "Karma", "Vimeo", "Reel"],
    image: "/images/vimeo_708569913.jpg",
    embedUrl:
      "https://player.vimeo.com/video/708569913?background=1&autopause=0&muted=1&loop=1&playsinline=1&badge=0&title=0&byline=0&app_id=58479",
    link: "https://vimeo.com/708569913",
    linkLabel: "Watch on Vimeo",
    year: "2022",
  },
  {
    title: "iPhone 11 Pro Max TVC",
    category: "3D Product Commercial",
    tools: ["Cinema 4D", "Octane", "After Effects"],
    image: "/images/Iphone%2011.png",
    link: "https://www.behance.net/gallery/136697475/iPhone-11-Pro-Max-TVC",
    year: "2021",
  },
  {
    title: "Food Court Bitexco TVC",
    category: "Commercial Production",
    tools: ["Premiere Pro", "After Effects", "Filming"],
    image: "/images/FoodCourt.png",
    link: "/rnd/utop-bitexco",
    linkLabel: "View project details",
    slug: "utop-bitexco",
    year: "2020",
  },
  {
    title: "Smart Menu TVC",
    category: "App Promo",
    tools: ["Premiere Pro", "After Effects"],
    image: "/images/SmartMenu.png",
    link: "/rnd/smart-menu",
    linkLabel: "View project details",
    slug: "smart-menu",
    year: "2020",
  },
  {
    title: "Utop Event TVCs",
    category: "Commercial Production",
    tools: ["Filming", "Premiere Pro", "After Effects"],
    image: "/images/utop.png",
    link: "/rnd/utop-events",
    linkLabel: "View project details",
    slug: "utop-events",
    year: "2020",
  },
];

export const EDUCATION = [
  {
    school: "MAAC Vietnam",
    degree: "Advanced Diploma in Visual Effects",
    year: "2023",
    tools: "Houdini, Maya, Blender, Nuke, After Effects",
  },
  {
    school: "University of Banking, Vietnam",
    degree: "Bachelor of Banking and Finance",
    year: "2020",
    gpa: "3.2/4",
  },
];

/** Certificates (displayed on the About page) */
export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  /** Verification link (optional) */
  url?: string;
  /** Certificate image (optional), placed in public/images/certificates/ */
  image?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google (Coursera)",
    year: "2025",
    url: "https://coursera.org/verify/professional-cert/VKX385M7YJYL",
    image: "/images/certificates/Coursera%20VKX385M7YJYL.png",
  },
];

/** Images crediting your name (credits, achievements) - placed in public/images/achivements/ */
export interface AchievementCredit {
  image: string;
  title?: string;
  subtitle?: string;
}

export const ACHIEVEMENT_CREDITS: AchievementCredit[] = [
  { image: "/images/achivements/SpiderMan2.png", title: "Marvel's Spider-Man 2", subtitle: "VFX Artist" },
  { image: "/images/achivements/BlackKnightNetflix.png", title: "Black Knight (Netflix)", subtitle: "VFX Artist" },
];

export interface ClientReview {
  projectSlug?: string;
  projectLabel?: string;
  title: string;
  period: string;
  rating: number;
  review: string;
  tags: string[];
  image: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    title: "Unreal Engine Gameplay and Content Creation Specialist",
    period: "Oct 30, 2025 - May 9, 2026",
    rating: 5.0,
    review:
      "Sang is a multi-talented and hard-working creative. His communication is clear, he works well to deadlines, and if a problem arises he is quick to come up with solutions. I would highly recommend working with this freelancer.",
    tags: [
      "Reliable",
      "Committed to Quality",
      "Solution Oriented",
      "Clear Communicator",
      "Detail Oriented",
    ],
    image: "/images/reviews/upwork-review-gameplay-content.png",
    projectSlug: "malignant",
    projectLabel: "Malignant (Steam)",
  },
  {
    title: "Creative & Technical Production",
    period: "Feb 21, 2025 - Dec 4, 2025",
    rating: 5.0,
    review:
      "Sang is an amazing individual. He is very professional and committed to deadlines. I would be happy to work with him again in the future. Thank you for your time. I hope you get great projects ahead, and I wish you the very best in your future endeavours.",
    tags: [
      "Reliable",
      "Committed to Quality",
      "Solution Oriented",
      "Accountable for Outcomes",
      "Professional",
    ],
    image: "/images/reviews/upwork-review-professional-deadlines.png",
  },
  {
    title: "Unreal Blow Smoke VFX",
    period: "Jun 29, 2024 - Jun 30, 2024",
    rating: 5.0,
    review:
      "Sang was very professional in his communication and delivered on time. He did an amazing job and incorporated feedback effectively. I definitely recommend him for your Realtime VFX needs!",
    tags: [
      "Professional",
      "Reliable",
      "Committed to Quality",
      "Collaborative",
    ],
    image: "/images/reviews/upwork-review-smoke-vfx.png",
  },
];
