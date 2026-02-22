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
  isFeatured?: boolean;
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
  title: "Sang Tran — VFX Artist",
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
    "https://drive.google.com/file/d/1ltRqgSClzycOc3jO52RzycEnv4WIIA82/view?usp=sharing",
};

export const HERO = {
  name: "Sang Tran",
  tagline: "Senior VFX Artist",
  description:
    "7+ years creating real-time visual effects for AAA titles, cinematic trailers, and live-service content. Specializing in Unreal Engine, Houdini, and shader development.",
  showreelUrl: "/video/showreel.mp4",
  showreelYoutube: "https://www.youtube.com/watch?v=qK8jtTMHCRU",
};

export const ABOUT = {
  title: "Building effects that feel alive.",
  bio: [
    "I'm Sang Tran, a Senior VFX Artist based in Ho Chi Minh City, Vietnam, with 7+ years of experience delivering real-time visual effects for AAA game studios and cinematic productions.",
    "My work spans Unreal Engine particle systems and Niagara, Houdini simulations, HLSL shader authoring, and Python pipeline automation. I've contributed to shipped titles including Marvel's Spider-Man 2, Fortnite Remix Finale, New World: Aeternum, and Until Dawn (PS5 remake).",
    "I thrive at the intersection of art and engineering — building both visually compelling effects and the technical pipelines that make them production-ready at scale.",
  ],
  location: "Ho Chi Minh City, Vietnam",
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Sparx*",
    role: "VFX Artist",
    duration: "Apr 2022 – Present",
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
    duration: "Jan 2022 – Apr 2022",
    responsibilities: [
      "Created dynamic visual effects for game cinematics and promotional content",
      "Collaborated with art directors to achieve desired visual aesthetics and hit performance budgets",
    ],
    technologies: "Houdini, Maya, After Effects",
  },
  {
    company: "FPT Software",
    role: "Video Producer",
    duration: "Jul 2019 – Oct 2020",
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
    skills: ["Midjourney", "Stable Diffusion", "AI Texture Generation"],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "spider-man-2",
    thumbnail: "/images/spiderman-2-ps5.jpg",
    title: "Marvel's Spider-Man 2",
    role: "FX Artist",
    year: "2023",
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
    title: "Fortnite – Remix Finale",
    role: "VFX Artist",
    year: "2024",
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
    isFeatured: true,
  },
  {
    slug: "new-world",
    thumbnail: "/images/NWA.jpg",
    title: "New World: Aeternum",
    role: "Technical VFX Artist",
    year: "2024",
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
    title: "Until Dawn – PS5",
    role: "Lighting Artist",
    year: "2024",
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
    title: "Havoc – Game",
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
    thumbnail: "/images/unkown-images.png",
    title: "Wolverine – PS5",
    role: "VFX Artist",
    year: "2025",
    description:
      "Contributing VFX work to Insomniac Games' upcoming Wolverine title for PS5. Details under NDA.",
    categories: ["aaa", "realtime"],
    contributions: ["Details under NDA"],
    techStack: ["Unreal Engine", "Houdini", "Perforce"],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured);

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
