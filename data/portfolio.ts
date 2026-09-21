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
  videoPoster?: string;
  videoTitle?: string;
  images?: string[];
  /** Breakdown: URL + VFX name + optional caption (Behance-style: video -> text -> video -> image) */
  breakdownClips?: { url: string; title: string; caption?: string }[];
  evidenceBreakdown?: {
    image: string;
    title: string;
    caption: string;
    tag?: string;
    link?: string;
    timestamps?: { time: string; label: string; url: string }[];
  }[];
  steamUrl?: string;
  isFeatured?: boolean;
  /** Short punchy 1-line discipline highlight for visual card e.g. "Gameplay VFX · Houdini · Proprietary Engine" */
  cardHighlight?: string;
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
  /** Concise Technical Notes (max 3 bullets combining constraints & technical highlights) */
  technicalNotes?: string[];
  /** Exact production credit label e.g. 'Credited under Sparx* / Insomniac Games' or 'Freelance / Indie Studio' */
  productionCredit?: string;
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
  logo: "/images/logo.webp",
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
  tagline: "",
  description:
    "Real-time VFX and technical art for games — gameplay effects, custom shaders, and in-engine optimization.",
  showreelUrl: "/video/reel_final.mp4",
  showreelYoutube: "https://www.youtube.com/watch?v=qK8jtTMHCRU",
};

export const ABOUT = {
  title: "Hands-on VFX, shaders, and engine integration.",
  portraitImage: "/images/Portrait/avatar.webp",
  bio: [
    "Technical VFX Artist specializing in real-time gameplay effects, custom shaders, GPU optimization, and seamless engine integration.",
    "AAA production experience across Marvel's Wolverine, Marvel's Spider-Man 2, and Fortnite, working across Niagara, proprietary engines, and Perforce pipelines.",
  ],
  location: "Ho Chi Minh City, Vietnam",
};

/** For home Profile section. portraitImage = front, portraitImageSecondary = back (flips on hover). */
export const PROFILE = {
  headline: "Technical VFX Artist",
  title: "Henry Tran.",
  paragraph:
    "Technical VFX Artist with AAA production experience across Unreal Engine and proprietary pipelines. Open to remote roles and freelance collaboration.",
  portraitImage: "/images/Portrait/avatar.webp",
  /** Image flipped on hover (secondary avatar in the Portrait folder) */
  portraitImageSecondary: "/images/Portrait/avatar.webp",
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
      "Developed and optimized real-time VFX for AAA projects including Marvel's Wolverine (PS5), Marvel's Spider-Man 2 (PS5), Fortnite Remix Finale, New World: Aeternum, and Until Dawn (PS5)",
      "Authored custom shaders, particle systems, and Niagara setups across proprietary engines and Unreal Engine",
      "Built Python tools and Houdini workflows to speed up asset production",
      "Worked with art directors, tech leads, and partner teams at Insomniac Games, Epic Games, and Amazon Games",
    ],
    technologies: "Proprietary Engines, Unreal Engine 5, Houdini, Python, HLSL, Perforce",
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
    name: "Core VFX & Simulation",
    skills: ["Unreal Engine 5", "Niagara", "Houdini VFX", "Proprietary Engines", "Particle Systems", "GPU Optimization"],
  },
  {
    name: "Shaders & Materials",
    skills: ["Unreal Material Graph", "HLSL (Custom Nodes)", "Shader Optimization", "PBR Workflows"],
  },
  {
    name: "Technical & Pipeline",
    skills: ["Python", "VEX", "Perforce", "Pipeline Automation", "Git"],
  },
  {
    name: "3D & DCC Software",
    skills: ["Houdini", "Blender", "Maya", "Substance Designer"],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "wolverine",
    thumbnail: "/images/projects/wolverine/wolverine-hero.webp",
    title: "Marvel's Wolverine",
    role: "Senior VFX Artist",
    cardHighlight: "Gameplay & Cinematic VFX · Proprietary Engine",
    year: "2026",
    duration: "2026",
    platform: "PlayStation 5",
    style: "realistic",
    client: "Insomniac Games",
    workSummary:
      "Real-time VFX and simulation for Marvel's Wolverine on PS5.",
    description:
      "Senior VFX Artist at Sparx* - A Virtuos Studio, delivering gameplay and cinematic effects for Insomniac Games.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Real-time combat VFX, bullet impacts, and explosion dynamics in proprietary engine",
      "Houdini simulations and destruction shaders for cinematic sequences",
      "Gameplay trigger volumes and interactive combat FX integration",
    ],
    techStack: ["Proprietary Engine", "Houdini", "HLSL", "Perforce"],
    engine: "Proprietary Engine",
    constraints: [
      "PS5 60 FPS performance & memory budgets",
      "Proprietary engine pipeline compliance",
      "Multi-studio Perforce synchronization",
    ],
    technicalHighlights: [
      "Combat & impact particle systems",
      "Houdini simulation workflows & runtime shaders",
      "In-engine GPU profiling & overdraw reduction",
    ],
    technicalNotes: [
      "Targeted locked 60 FPS on PS5 with GPU profiling and overdraw reduction passes",
      "Proprietary engine pipeline compliance and multi-studio Perforce synchronization",
      "Houdini simulation pipelines for destruction and debris integrated into runtime shaders",
    ],
    productionCredit: "Credited under Sparx* / Insomniac Games",
    videoUrl: "https://www.youtube.com/embed/lbiMqaLTKlQ",
    videoPoster: "/images/projects/wolverine/wolverine-video-poster.webp",
    videoTitle: "Jean TK Explosion (In-Game Cinematic VFX)",
    evidenceBreakdown: [
      {
        image: "/images/projects/wolverine/wolverine-madripoor.webp",
        title: "In-Game Gameplay: Bullet Impacts & Trigger Volumes (02:29)",
        caption: "Real-time bullet projectiles, hit impacts, explosion dynamics, and environmental trigger volume interactions activated as character enters combat zones.",
        tag: "Gameplay VFX",
        link: "https://youtu.be/9JdiQpn4SvQ?t=149",
        timestamps: [
          { time: "02:29", label: "Demo Combat, Explosions & Trigger Volumes", url: "https://youtu.be/9JdiQpn4SvQ?t=149" },
        ],
      },
      {
        image: "/images/projects/wolverine/wolverine-hero.webp",
        title: "In-Game Gameplay: Aggressive & Stealth Combat",
        caption: "Real-time stealth takedowns, claw impact particle emitters, environmental blood decals, and aggressive in-engine combat gameplay on PS5.",
        tag: "Gameplay VFX",
        link: "https://www.youtube.com/watch?v=iQYeXYa2Tfo",
      },
      {
        image: "/images/projects/wolverine/wolverine-action.webp",
        title: "In-Game Cinematic Cutscenes",
        caption: "Real-time character combat, claw impacts, sparks, telekinesis simulations, and in-engine cinematic sequences in proprietary engine.",
        tag: "Cinematic VFX",
        link: "https://youtu.be/3boUBsYHY3I?t=1347",
        timestamps: [
          { time: "22:27", label: "Combat & Claw Sparks", url: "https://youtu.be/3boUBsYHY3I?t=1347" },
          { time: "48:46", label: "Jean TK & Warehouse", url: "https://youtu.be/3boUBsYHY3I?t=2926" },
          { time: "49:39", label: "Gunship Extraction", url: "https://youtu.be/3boUBsYHY3I?t=2979" },
          { time: "1:11:12", label: "Facility Infiltration", url: "https://youtu.be/3boUBsYHY3I?t=4272" },
          { time: "1:58:50", label: "Berserker Rage & Combat", url: "https://youtu.be/3boUBsYHY3I?t=7130" },
        ],
      },
      {
        image: "/images/projects/wolverine/wolverine-artblast-explosion.webp",
        title: "ArtBlast: Warehouse Explosion",
        caption: "Volumetric fire simulation, shockwave lighting, and anamorphic flares.",
        tag: "Production VFX",
        link: "https://youtu.be/3boUBsYHY3I?t=2926",
      },
      {
        image: "/images/projects/wolverine/wolverine-artblast-hangar.webp",
        title: "ArtBlast: Night Assault",
        caption: "Gunship thrusters, muzzle flashes, laser tracers, and impact blood.",
        tag: "Production VFX",
        link: "https://youtu.be/3boUBsYHY3I?t=2979",
      },
      {
        image: "/images/projects/wolverine/wolverine-credit-evidence.webp",
        title: "In-Game End Credits",
        caption: "Senior VFX Artist credit under Sparx* - A Virtuos Studio at 13:00.",
        tag: "In-Game Credit",
        link: "https://youtu.be/JfV_lwWiJDk?t=780",
      },
    ],
    isFeatured: true,
  },
  {
    slug: "spider-man-2",
    thumbnail: "/images/spiderman-2-ps5.jpg",
    title: "Marvel's Spider-Man 2",
    role: "FX Artist",
    cardHighlight: "Gameplay VFX · Houdini · Proprietary Engine",
    year: "2023",
    duration: "2023",
    platform: "PlayStation 5",
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
    technicalNotes: [
      "PS5 locked 60 FPS performance mode target with real-time particle overdraw profiling",
      "Houdini destruction and debris simulation pipelines integrated into proprietary engine",
      "Adhered to strict Perforce branch check-in conventions with the Insomniac FX team",
    ],
    productionCredit: "Credited under Sparx* / Insomniac Games",
    videoUrl: "https://www.youtube.com/embed/bgqGdIoa52s?start=1",
    evidenceBreakdown: [
      {
        image: "/images/achivements/SpiderMan2.webp",
        title: "Official In-Game End Credits",
        caption: "FX Artist credit under Sparx* - A Virtuos Studio in Marvel's Spider-Man 2 official credits roll.",
        tag: "Credit Verification",
      },
    ],
    isFeatured: true,
  },
  {
    slug: "fortnite-remix",
    thumbnail: "/images/optimized/fortnite-live-event.jpg",
    title: "Fortnite - Remix The Finale",
    role: "FX Artist",
    cardHighlight: "Weapon Skins & Live Event VFX · Niagara · Unreal Engine",
    year: "2024",
    duration: "2024",
    platform: "PC, Console, Mobile",
    style: "stylized",
    client: "Epic Games",
    workSummary:
      "Created real-time VFX for weapon skins and the Remix Finale live event trailer.",
    description:
      "Built weapon skin and live-event VFX in Unreal Engine Niagara, tuned for high-density multiplayer performance.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Weapon skin VFX and stylized energy effects authored in Unreal Engine Niagara",
      "Large-scale live-event finale particle systems tuned for cross-platform playback",
      "Optimized particle lifecycles, draw calls, and LOD cascades to match Epic Games guidelines",
    ],
    techStack: ["Unreal Engine", "Niagara", "Houdini", "HLSL", "Perforce"],
    engine: "Unreal Engine",
    constraints: [
      "Multi-platform performance across PC, console, and mobile tiers",
      "Strict visual readability amidst high-density multiplayer gameplay",
      "Epic Games Niagara pipeline standards and drawcall budgets",
    ],
    technicalHighlights: [
      "Modular Niagara emitters for weapon skins and live event moments",
      "Stylized noise-erosion shaders and unlit master materials",
      "Particle lifecycle and drawcall optimization",
    ],
    technicalNotes: [
      "Cross-platform performance optimization across PC, console, and mobile tiers",
      "Modular Niagara emitters for weapon skins and live-event finale sequences",
      "Complied with Epic Games Niagara pipeline standards, LOD rules, and drawcall budgets",
    ],
    videoUrl: "https://www.youtube.com/embed/c-rtUmJPLQM?start=272",
    productionCredit: "Credited under Sparx* / Epic Games",
    breakdownClips: [
      { url: "https://www.youtube.com/watch?v=4NifXy2W_Uk", title: "Weapon Skin VFX" },
      { url: "https://www.youtube.com/watch?v=u-e9ByS_e80", title: "Live Event Effects" },
      { url: "https://youtu.be/zwNhOnKD32Y", title: "Environment & Atmosphere" },
      { url: "https://youtu.be/6X8aDzsubDs", title: "Impact & Hit FX" },
      { url: "https://youtu.be/G0elrE1kde4", title: "Niagara Systems Breakdown" },
      { url: "https://youtu.be/oHyDLyVmhF8", title: "Full Reel / Compilation" },
    ],
    isFeatured: true,
  },
  {
    slug: "new-world",
    thumbnail: "/images/optimized/new-world-aeternum.jpg",
    title: "New World: Aeternum",
    role: "FX Artist",
    cardHighlight: "Cinematic & Environment VFX · Houdini · Unreal Engine",
    year: "2024",
    duration: "2024",
    platform: "PlayStation 5 / PC",
    style: "realistic",
    client: "Amazon Games",
    workSummary:
      "Environmental and weather VFX for Amazon Games' New World: Aeternum launch campaign.",
    description:
      "Environmental and weather VFX for Amazon Games' New World: Aeternum launch campaign.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Environmental, weather, magic, and destruction VFX systems",
      "Custom foliage animation and dynamic water surface interaction shaders",
      "Houdini procedural geometry workflows to accelerate environment dressing",
    ],
    techStack: ["Unreal Engine", "Houdini", "HLSL", "Blender"],
    engine: "Unreal Engine",
    constraints: [
      "Cinematic environment fidelity under tight marketing milestones",
      "Dynamic weather and lighting consistency across changing daylight states",
    ],
    technicalHighlights: [
      "Custom shader logic for animated foliage and water surface interactions",
      "Procedural Houdini geometry workflows for environment dressing",
    ],
    technicalNotes: [
      "Cinematic environment fidelity under tight marketing milestones",
      "Dynamic weather and lighting consistency across changing daylight states",
    ],
    videoUrl: "https://www.youtube.com/embed/qK8jtTMHCRU",
    productionCredit: "Credited under Sparx* / Amazon Games",
    isFeatured: true,
  },
  {
    slug: "until-dawn",
    thumbnail: "/images/until-dawn-ps5.jpg",
    title: "Until Dawn",
    role: "Lighting Artist",
    cardHighlight: "Cinematic Horror Lighting · Lumen · Unreal Engine 5",
    year: "2024",
    duration: "2024",
    platform: "PlayStation 5 / PC",
    style: "realistic",
    client: "Ballistic Moon",
    workSummary:
      "Cinematic lighting for key sequences in the PS5 remake.",
    description:
      "Cinematic lighting for key sequences in the PS5 remake.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Unreal Engine 5 cinematic lighting",
      "Mood and horror lighting setups",
      "Real-time performance optimization on PS5",
    ],
    techStack: ["Unreal Engine 5", "Lumen", "PS5"],
    engine: "Unreal Engine 5",
    constraints: [
      "Real-time Lumen global illumination performance budget on PS5",
      "Atmospheric horror contrast preservation",
    ],
    technicalHighlights: [
      "UE5 Lumen lighting setups for cinematic sequences",
      "Volumetric fog optimization for 60 FPS console target",
    ],
    technicalNotes: [
      "Unreal Engine 5 Lumen global illumination setups tuned for horror cinematic mood",
      "Volumetric fog and shadow optimization for 60 FPS console target on PS5",
    ],
    videoUrl: "https://www.youtube.com/embed/8nApBGPy0ao",
    productionCredit: "Credited under Sparx* / Ballistic Moon",
  },
  {
    slug: "malignant",
    thumbnail: "/projects/malignant/steam-capsule.jpg",
    title: "Malignant",
    role: "Technical VFX Artist (Freelance)",
    cardHighlight: "Gore Simulation & Combat VFX · Niagara · LiquiGen",
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
      "Combat & weapon VFX (SMG muzzle flashes, recoil integration, projectile hits)",
      "Blood simulation & Niagara optimization (LiquiGen flipbooks, 0.1s hit throttling)",
      "UMG & screen FX (mutagen syringe HUD, radial cooldowns, low-health overlays)",
      "Environment VFX & level dressing (dynamic fires, burning debris, localized lighting)",
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
    technicalNotes: [
      "LiquiGen fluid blood simulations exported as optimized sprite sheets and flipbooks into UE5",
      "Blueprint rate-limiting logic (0.1s cooldown throttling) to eliminate frame drops during automatic weapon fire",
      "Dynamic UMG HUD widgets and fullscreen low-health post-process overlays",
    ],
    productionCredit: "Buzzkill Interactive / Upwork",
    steamUrl: "https://store.steampowered.com/app/4314740/Malignant/",
    isFeatured: true,
    images: [
      "/projects/malignant/malignant-combat-profiling.webp",
      "/projects/malignant/malignant-ue5-editor-fire.webp",
      "/projects/malignant/malignant-liquigen-blood-sim.webp",
      "/projects/malignant/malignant-umg-screen-overlay.png",
      "/projects/malignant/malignant-umg-syringe-cooldowns.png",
      "/projects/malignant/malignant-blueprint-weapon-vfx.png",
      "/projects/malignant/malignant-blueprint-blood-rate-limit.png",
    ],
    evidenceBreakdown: [
      {
        image: "/projects/malignant/malignant-combat-profiling.webp",
        title: "In-Engine Profiling & Live Combat (UE5 PIE)",
        tag: "Unreal Engine 5 · Profiling",
        caption: "Live Play-In-Editor profiling against sewer mutant hordes (AIC_SewerMutant) using STATGROUP_game. Monitored draw calls (574), primitive counts (2852k), and tick times; maintained 40+ FPS in the captured heavy-combat test scenario.",
      },
      {
        image: "/projects/malignant/malignant-ue5-editor-fire.webp",
        title: "Environment Fire & Level Dressing (L_Town1)",
        tag: "Niagara · Environment VFX",
        caption: "Authored environment fire emitters, floating paper debris, and ember particles in L_Town1 (Daybreak town) within Unreal Engine 5. Tuned dynamic point lights to illuminate dark streets without blowing out shadow contrast.",
      },
      {
        image: "/projects/malignant/malignant-liquigen-blood-sim.webp",
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
    title: "Black Knight",
    role: "FX Houdini Artist",
    cardHighlight: "Destruction & Pyro Simulation · Houdini · Broadcast VFX",
    year: "2023",
    duration: "2023",
    platform: "Netflix (4K HDR)",
    client: "Netflix",
    workSummary:
      "Destruction, pyro, and atmospheric simulation for the Netflix original series.",
    description:
      "Destruction, pyro, and atmospheric simulation for the Netflix original series.",
    categories: ["cinematic"],
    contributions: [
      "Large-scale desert sandstorms and atmospheric haze simulation",
      "Vehicle explosion, pyro, and debris simulations using Houdini solvers",
      "Delivered high-fidelity geometry caches and Alembic passes for comp handoff",
    ],
    techStack: ["Houdini", "Pyro", "FLIP", "Alembic", "Nuke"],
    engine: "Houdini (Offline VFX)",
    technicalNotes: [
      "Procedural pyro and FLIP fluid solvers tuned for broadcast turnaround timelines",
      "Multi-pass volumetric rendering and comp passes for live-action integration",
    ],
    productionCredit: "Credited under BadClay Studio / Netflix",
    videoUrl: "https://www.youtube.com/embed/Se26Op9sEC8?start=8",
  },
  {
    slug: "havoc",
    thumbnail: "/images/havoc-logo.png",
    title: "Havoc",
    role: "VFX Artist (Freelance)",
    cardHighlight: "Combat Ability VFX · Niagara · Unreal Engine",
    year: "2024",
    duration: "2024",
    platform: "PC",
    client: "Indie Studio",
    workSummary:
      "Combat ability VFX and stylized shaders in Unreal Engine.",
    description:
      "Combat ability VFX and stylized shaders in Unreal Engine.",
    categories: ["realtime"],
    contributions: [
      "Designed Niagara particle systems for combat abilities and energy trails",
      "Created stylized dissolve and noise-erosion master materials",
      "Dynamic impact feedback and telegraphing for combat encounters",
    ],
    techStack: ["Unreal Engine", "Niagara", "HLSL", "Blender"],
    engine: "Unreal Engine",
    technicalNotes: [
      "GPU-driven Niagara emitters optimized for low overdraw during multi-character clashes",
      "Custom HLSL and material parameter collections for synchronized skill timing",
    ],
    productionCredit: "Freelance / Indie Studio",
    images: ["/images/havoc-landing-page.webp"],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured);

/** AAA titles: Wolverine, Spider-Man 2, Fortnite, New World, Until Dawn */
export const AAA_PROJECT_SLUGS = [
  "wolverine",
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
    title: "Celestial Legion — Xianxia Combat VFX",
    category: "Real-time VFX / Outsource Art Test",
    tools: ["Unreal Engine 5", "Niagara", "Materials", "Sequencer"],
    image: "/projects/celestial-legion-vfx/poster.jpg",
    link: "/rnd/celestial-legion-vfx",
    linkLabel: "View breakdown",
    slug: "celestial-legion-vfx",
    year: "2024",
    group: "vfx",
  },
  {
    title: "Destructible Separate Mesh Tool",
    category: "Blender Python Pipeline Tool",
    tools: ["Blender", "Python", "Technical Art", "Pipeline"],
    image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
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
    image: "/images/historyblends-cover.webp",
    link: "/rnd/historyblends",
    linkLabel: "View project details",
    slug: "historyblends",
    year: "2025",
  },
  {
    title: "Level Up - Crypto.com",
    category: "3D Environment",
    tools: ["Blender", "After Effects"],
    image: "/images/LevelUp.webp",
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
    image: "/images/WatchHPBlender/Screenshot.webp",
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
    image: "/images/ETH.webp",
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
    image: "/images/Iphone%2011.webp",
    link: "https://www.behance.net/gallery/136697475/iPhone-11-Pro-Max-TVC",
    year: "2021",
  },
  {
    title: "Food Court Bitexco TVC",
    category: "Commercial Production",
    tools: ["Premiere Pro", "After Effects", "Filming"],
    image: "/images/FoodCourt.webp",
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
    image: "/images/utop.webp",
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
    image: "/images/certificates/Coursera%20VKX385M7YJYL.webp",
  },
];

/** Images crediting your name (credits, achievements) - placed in public/images/achivements/ */
export interface AchievementCredit {
  image: string;
  title?: string;
  subtitle?: string;
}

export const ACHIEVEMENT_CREDITS: AchievementCredit[] = [
  { image: "/images/achivements/Wolverine.webp", title: "Marvel's Wolverine", subtitle: "Senior VFX Artist" },
  { image: "/images/achivements/SpiderMan2.webp", title: "Marvel's Spider-Man 2", subtitle: "FX Artist" },
  { image: "/images/achivements/BlackKnightNetflix.webp", title: "Black Knight (Netflix)", subtitle: "FX Artist" },
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
