export type ProjectCategory = "aaa" | "realtime" | "cinematic" | "igaming";

export interface Project {
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
  title: "Sang Tran - VFX Artist",
  description:
    "Senior VFX Artist specializing in real-time effects, shader development, and technical art for AAA games and live-service content.",
  email: "sangminhtran1710@gmail.com",
  logo: "/images/logo.png",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/sang-tran-94686b160/",
  github: "https://github.com/sangtran1710",
  behance: "https://www.behance.net/sangtranminh",
  resume:
    "https://drive.google.com/drive/folders/1MNF25uY-XX6N0hwEDwFb6Dpalw9648gX?hl=vi",
};

export const HERO = {
  name: "Sang Tran",
  tagline:
    "Senior real-time VFX artist for AAA games, cinematics, and premium interactive launches.",
  /** A short line; the rest is conveyed by video & images. */
  description:
    "I build effects that stay readable, feel expensive, and hold up under production pressure.",
  showreelUrl: "/video/reel_final.mp4",
  showreelYoutube: "https://www.youtube.com/watch?v=qK8jtTMHCRU",
};

export const ABOUT = {
  title: "Building effects that feel alive.",
  bio: [
    "I'm Sang Tran, a visual effects artist based in Ho Chi Minh City, Vietnam, with more than 7 years of experience across game development, cinematics, and launch content.",
    "I came into the industry through a gradual career shift, learning by doing and building confidence one milestone at a time. That path took me from support tasks to owning major effect sequences, including work featured in early marketing for Marvel's Spider-Man 2.",
    "What keeps me here is simple: I love building moments that feel alive on screen. I enjoy clear feedback, fast iteration, and the kind of collaboration where craft and problem-solving move together.",
    "I'm open to full-time remote roles and thoughtful collaborations where I can take ownership, work closely with ambitious teams, and keep raising the quality bar.",
  ],
  location: "Ho Chi Minh City, Vietnam",
};

/** For home Profile section. portraitImage = front, portraitImageSecondary = back (flips on hover). */
export const PROFILE = {
  headline: "Senior VFX Real-time Artist",
  title: "Tran Minh Sang.",
  /** Single line; detailed info reserved for the About page. */
  paragraph:
    "**Sony** / **Epic** / **Amazon** / **Netflix**. Based in **HCMC** - open to thoughtful teams and ambitious visual storytelling.",
  portraitImage: "/images/Portrait/avatar.png",
  /** Image flipped on hover (secondary avatar in the Portrait folder) */
  portraitImageSecondary: "/images/Portrait/z7554087716035_e6282b2e1378f725e4bcb1b51032c015.jpg",
  ctaText: "Contact me",
  stats: [
    { label: "Game Shipped", value: "8+" },
    { label: "Commercial Projects", value: "20+" },
    { label: "Years", value: "7+" },
    { label: "Tools", value: "Unreal Engine, Unity, Premiere Pro, After Effects, JangaFX" },
    { label: "3D Software", value: "Blender, Houdini, Maya, 3Ds Max, Cinema 4D" },
  ] as const,
};

/** Image beside Technical Skills section (use project thumbnail or custom image). */
export const SKILLS_SECTION_IMAGE = "/images/NWA.jpg";

/** Image beside Visual Effect and Animation / experience section. */
export const VFX_EXPERIENCE_IMAGE = "/images/Fortnite-Live-Event-Time.jpg";

export const EXPERIENCES: Experience[] = [
  {
    company: "Upwork",
    role: "Technical VFX Artist",
    duration: "2024 - Present",
    responsibilities: [
      "Deliver real-time VFX and technical art for indie and mid-size game studios via Upwork",
      "Niagara, shaders, and optimization for Unreal Engine projects",
    ],
    technologies: "Unreal Engine 5, Niagara, HLSL, Houdini",
  },
  {
    company: "Sparx*",
    role: "Senior VFX Artist",
    duration: "Apr 2022 - Present",
    responsibilities: [
      "Developed and optimized real-time VFX for AAA projects including Marvel's Spider-Man 2, Fortnite Remix Finale, New World: Aeternum, and Until Dawn (PS5)",
      "Authored HLSL shaders and Unreal Engine 5 Niagara systems for high-fidelity particle effects",
      "Built Python automation tools and Houdini pipelines to streamline team workflows and asset production",
      "Collaborated cross-functionally with art directors and tech leads at Insomniac Games, Epic Games, and Amazon Games",
    ],
    technologies: "Unreal Engine 5, Houdini, Python, HLSL, Perforce, Blender",
  },
  {
    company: "BadClay Studio",
    role: "VFX Artist",
    duration: "Jan 2022 - Apr 2022",
    responsibilities: [
      "Created dynamic visual effects for game cinematics and promotional content",
      "Collaborated with art directors to achieve desired visual aesthetics and hit performance budgets",
    ],
    technologies: "Houdini, Maya, After Effects",
  },
  {
    company: "FPT Software",
    role: "Video Producer",
    duration: "Jul 2019 - Oct 2020",
    responsibilities: [
      "Produced and edited corporate videos and internal training materials",
      "Managed end-to-end video production workflows and asset delivery",
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
    skills: ["HLSL", "GLSL", "Unreal Material Graph", "Shader Optimization", "PBR Workflows"],
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
      "Created cinematic VFX, gameplay VFX, and in-game UI effects for Insomniac Games' PS5 blockbuster.",
    description:
      "Developed particle systems and environmental VFX for Insomniac Games' PS5 blockbuster, contributing to combat effects, web mechanics, and open-world atmosphere.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Authored Houdini simulations for destruction and debris effects",
      "Built Niagara particle systems for combat and traversal VFX",
      "Optimized effects to hit PS5 performance targets",
      "Integrated assets via Perforce pipelines with the Insomniac FX team",
    ],
    techStack: ["Houdini", "Blender", "Unreal Engine", "Python", "HLSL", "Perforce"],
    videoUrl: "https://www.youtube.com/embed/bgqGdIoa52s?start=1",
    isFeatured: true,
  },
  {
    slug: "fortnite-remix",
    thumbnail: "/images/Fortnite-Live-Event-Time.jpg",
    title: "Fortnite - Remix The Finale",
    role: "FX Artist",
    year: "2024",
    duration: "6/2023 - 10/2023",
    platform: "PC, Console, Mobile",
    style: "stylized",
    client: "Epic Games",
    workSummary:
      "Created the cinematic trailer for the October 2023 event \"Remix The Finale\", to promote and advertise the new in-game event.",
    description:
      "Created weapon effects and event VFX for Epic Games' Fortnite Remix Finale live event, delivering high-impact real-time effects for millions of concurrent players.",
    categories: ["aaa", "realtime"],
    contributions: [
      "Designed and implemented weapon-skin VFX using Unreal Engine Niagara",
      "Built live-event effects tuned for performance across PC, console, and mobile",
      "Collaborated directly with Epic's FX team on style guides and technical constraints",
    ],
    techStack: ["Unreal Engine", "Houdini", "Blender", "Python", "HLSL", "Perforce"],
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
    thumbnail: "/images/NWA.jpg",
    title: "New World: Aeternum",
    role: "FX Artist",
    year: "2024",
    duration: "12/2023 - 5/2024",
    platform: "PS5, PC",
    style: "realistic",
    client: "Amazon Games",
    workSummary:
      "FX Artist on the cinematic trailer for the game, to promote the New World PS5 launch. Project from Amazon Games.",
    description:
      "Contributed to cinematic trailer production and in-game VFX for Amazon Games' New World PS5 launch, focusing on environmental and combat effects.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Created environmental VFX including weather, magic, and destruction systems",
      "Developed HLSL shaders for animated foliage and water surface interactions",
      "Built Houdini procedural pipelines to accelerate asset production",
    ],
    techStack: ["Houdini", "Blender", "Unreal Engine", "Python", "HLSL"],
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
      "Lighting Artist for cinematic content on the PS5 remake. The project had a large volume of cinematics with a tense, horror-inspired art direction. Outsourced from Ballistic Moon.",
    description:
      "Contributed cinematic lighting for key sequences in the PS5 remake, helping achieve the horror atmosphere and cinematic quality Ballistic Moon aimed for.",
    categories: ["aaa", "cinematic"],
    contributions: [
      "Lit cinematic sequences using Unreal Engine 5's Lumen global illumination",
      "Collaborated with directors to establish mood and horror lighting language",
      "Optimized light setups for real-time performance on PS5 hardware",
    ],
    techStack: ["Unreal Engine 5"],
    videoUrl: "https://www.youtube.com/embed/8nApBGPy0ao",
  },
  {
    slug: "black-knight",
    thumbnail: "/images/Black_Knight_Thumbnail.jpg",
    title: "Black Knight (Netflix)",
    role: "FX Houdini Artist",
    year: "2023",
    description:
      "Created dynamic effects and environmental VFX for this Netflix original series, working within a cinematic VFX pipeline targeting broadcast-quality output.",
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
      "Contributed as a freelance VFX artist, developing real-time visual effects for gameplay systems and cinematics using Unreal Engine.",
    categories: ["realtime"],
    contributions: [
      "Designed Niagara particle systems for combat abilities and environmental effects",
      "Authored HLSL shaders for stylized material effects",
      "Collaborated remotely with the core team to iterate on visual targets",
    ],
    techStack: ["Unreal Engine", "Houdini", "Blender", "HLSL"],
    images: ["/images/havoc-landing-page.png"],
  },
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
      "VFX Artist on cinematics, gameplay VFX, and UI for Insomniac Games' next title after Spider-Man 2. Project coming soon (late 2026).",
    description:
      "Contributing VFX work to Insomniac Games' upcoming Wolverine title for PS5. Details under NDA.",
    categories: ["aaa", "realtime"],
    contributions: ["Details under NDA"],
    techStack: ["Unreal Engine", "Houdini", "Perforce"],
    videoUrl: "https://www.youtube.com/watch?v=s3pDMUWlA6I",
  },
  {
    slug: "dragon-fortune",
    thumbnail: "/slotgame/bg_main.png",
    title: "Dragon Fortune - HTML5 Slot Demo",
    role: "Technical Artist / Web Developer",
    year: "2026",
    duration: "2025 - Present",
    description:
      "A playable HTML5 slot game demo showcasing iGaming VFX: particle coin rain, win animations, and free spins built with React and Canvas.",
    categories: ["igaming"],
    contributions: [
      "Built a 5-reel slot game engine with 10 paylines",
      "Developed high-performance particle systems in WebGL/Canvas",
      "Implemented seamless GSAP 3 timeline animations for game states",
    ],
    techStack: ["PixiJS", "GSAP", "Web Audio API", "WebGL", "Blender", "React"],
    link: "/rnd/dragon-fortune",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured);

/** AAA titles: Spider-Man 2, Fortnite, New World, Until Dawn, Wolverine */
export const AAA_PROJECT_SLUGS = [
  "spider-man-2",
  "fortnite-remix",
  "new-world",
  "until-dawn",
  "wolverine",
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
    title: "TradingPower Tool v9.2",
    category: "Motion Graphics / AE Plugin Workflow",
    tools: ["After Effects", "ExtendScript", "TradingPower Tool", "Motion Design"],
    image: "/images/Thumbnail.png",
    embedUrl:
      "https://www.youtube.com/embed/5AH8Ys5XTQI?muted=1&mute=1&autoplay=1&loop=1&playlist=5AH8Ys5XTQI",
    link: "/rnd/tradingpower-tool",
    linkLabel: "View Case Study",
    year: "2026",
  },
  {
    title: "HistoryBlends - AI Filmmaking",
    category: "AI Content Creation",
    tools: ["Sora", "Veo-2", "ChatGPT", "Midjourney", "Prompt Engineering"],
    image: "/images/Gemini_Generated_Image_ynlyiiynlyiiynly.png",
    link: "/rnd/historyblends",
    linkLabel: "View Project details",
    slug: "historyblends",
    year: "2025",
  },
  {
    title: "Level Up - Crypto.com",
    category: "3D Environment",
    tools: ["Blender", "After Effects"],
    image: "/images/LevelUp.png",
    link: "/rnd/levelup",
    linkLabel: "View Project details",
    slug: "levelup",
    year: "2025",
  },
  {
    title: "Stylized",
    category: "VFX",
    tools: ["VFX", "Reel"],
    image: "https://img.youtube.com/vi/9IapY_HYr6Q/sddefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/9IapY_HYr6Q?muted=1&mute=1&start=30&autoplay=1&loop=1&playlist=9IapY_HYr6Q",
    link: "https://youtu.be/9IapY_HYr6Q",
    linkLabel: "Watch on YouTube",
    year: "2025",
    group: "vfx",
  },
  {
    title: "Semi-Realistic",
    category: "VFX",
    tools: ["VFX", "Reel"],
    image: "https://img.youtube.com/vi/_g9fzTlKCVQ/sddefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/_g9fzTlKCVQ?muted=1&mute=1&start=235&autoplay=1&loop=1&playlist=_g9fzTlKCVQ",
    link: "https://www.youtube.com/watch?v=_g9fzTlKCVQ",
    linkLabel: "Watch on YouTube",
    year: "2026",
    group: "vfx",
  },
  {
    title: "HLSL Material R&D",
    category: "Unreal Engine / Custom Shaders",
    tools: ["Unreal Engine", "HLSL", "Material"],
    image: "https://img.youtube.com/vi/VTB2IAmcQO8/sddefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/VTB2IAmcQO8?muted=1&mute=1&autoplay=1&loop=1&playlist=VTB2IAmcQO8",
    link: "/rnd/hlsl-material",
    linkLabel: "View Project details",
    slug: "hlsl-material",
    year: "2025",
    group: "vfx",
  },
  {
    title: "Fortnite Full Reel",
    category: "Fortnite / VFX",
    tools: ["Unreal Engine", "Niagara", "VFX"],
    image: "https://img.youtube.com/vi/oHyDLyVmhF8/sddefault.jpg",
    embedUrl:
      "https://www.youtube.com/embed/oHyDLyVmhF8?muted=1&mute=1&autoplay=1&loop=1&playlist=oHyDLyVmhF8",
    link: "/projects/fortnite-remix",
    linkLabel: "View Fortnite Work",
    year: "2025",
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
    linkLabel: "View Project details",
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
    title: "RND Houdini (Redshift) & Unreal Engine",
    category: "Graduation Project",
    tools: ["Houdini", "Redshift", "Unreal Engine"],
    image: "/video/project-my.mp4",
    link: "/rnd/project-my",
    linkLabel: "View Project details",
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
    linkLabel: "View Project details",
    slug: "utop-bitexco",
    year: "2020",
  },
  {
    title: "Smart Menu TVC",
    category: "App Promo",
    tools: ["Premiere Pro", "After Effects"],
    image: "/images/SmartMenu.png",
    link: "/rnd/smart-menu",
    linkLabel: "View Project details",
    slug: "smart-menu",
    year: "2020",
  },
  {
    title: "Utop Event TVCs",
    category: "Commercial Production",
    tools: ["Filming", "Premiere Pro", "After Effects"],
    image: "/images/utop.png",
    link: "/rnd/utop-events",
    linkLabel: "View Project details",
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
