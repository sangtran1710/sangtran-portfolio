import {
  ABOUT,
  ACHIEVEMENT_CREDITS,
  CERTIFICATES,
  EDUCATION,
  EXPERIENCES,
  FEATURED_PROJECTS,
  HERO,
  PROFILE,
  PROJECTS,
  SITE,
  SKILL_GROUPS,
  type Project,
} from "@/data/portfolio";
import type { Locale } from "@/lib/i18n";

const VI_SITE = {
  title: "Sang Tran - Nghệ sĩ VFX",
  description:
    "Senior VFX Artist tập trung vào real-time effects, shader development và technical art cho game AAA và live-service content.",
};

const VI_HERO = {
  tagline:
    "Senior real-time VFX artist cho game AAA, cinematic và các dự án interactive.",
  description:
    "Tôi tạo ra các hiệu ứng dễ đọc, nhìn đủ đắt giá và vẫn trụ vững dưới áp lực production.",
};

const VI_ABOUT = {
  title: "Tạo ra hiệu ứng có cảm giác sống.",
  bio: [
    "Tôi là Sang Tran, một visual effects artist sống tại TP. Hồ Chí Minh, với hơn 7 năm kinh nghiệm trong game development, cinematic và launch content.",
    "Tôi bước vào ngành qua một quá trình chuyển nghề khá chậm nhưng chắc, học bằng cách làm thật và tích lũy sự tự tin qua từng cột mốc. Hành trình đó đưa tôi từ các đầu việc hỗ trợ đến việc tự chịu trách nhiệm cho những sequence hiệu ứng lớn, trong đó có phần việc xuất hiện trong giai đoạn marketing sớm của Marvel's Spider-Man 2.",
    "Điều giữ tôi ở lại với nghề rất đơn giản: tôi thích tạo ra những khoảnh khắc có cảm giác sống trên màn hình. Tôi hợp với phản hồi rõ ràng, vòng lặp làm việc nhanh, và kiểu cộng tác nơi tay nghề đi cùng với giải quyết vấn đề.",
    "Tôi đang mở cho các vị trí full-time remote, nơi tôi có thể nhận ownership rõ, làm việc sát với team mạnh và tiếp tục nâng chuẩn chất lượng lên.",
  ],
  location: "TP. Hồ Chí Minh, Việt Nam",
};

const VI_PROFILE = {
  headline: "Senior Real-time VFX Artist",
  paragraph:
    "**Sony** / **Epic** / **Amazon** / **Netflix**. Làm việc tại **TP.HCM** và đang mở cho cả full-time lẫn freelance.",
  ctaText: "Liên hệ với tôi",
  stats: [
    { label: "Game đã ra mắt", value: "8+" },
    { label: "Dự án commercial", value: "20+" },
    { label: "Năm kinh nghiệm", value: "7+" },
    { label: "Công cụ", value: "Unreal Engine, Unity, Premiere Pro, After Effects, JangaFX" },
    { label: "Phần mềm 3D", value: "Blender, Houdini, Maya, 3Ds Max, Cinema 4D" },
  ] as const,
};

const VI_EXPERIENCES = [
  {
    role: "Freelance Technical VFX Artist",
    responsibilities: [
      "Phụ trách real-time VFX và technical art cho các studio indie và mid-size qua Upwork",
      "Triển khai Niagara, shader và tối ưu cho các dự án Unreal Engine",
    ],
  },
  {
    role: "Senior VFX Artist",
    responsibilities: [
      "Phát triển và tối ưu real-time VFX cho các dự án AAA như Marvel's Spider-Man 2, Fortnite Remix Finale, New World: Aeternum và Until Dawn (PS5)",
      "Viết HLSL shader và Niagara system trong Unreal Engine 5 cho các hiệu ứng particle chất lượng cao",
      "Xây Python tool và pipeline Houdini để tăng tốc workflow cho team và quá trình sản xuất asset",
      "Làm việc cross-functional với art director và tech lead từ Insomniac Games, Epic Games và Amazon Games",
    ],
  },
  {
    role: "VFX Artist",
    responsibilities: [
      "Tạo hiệu ứng hình ảnh động cho game cinematic và nội dung quảng bá",
      "Phối hợp với art director để đạt chất lượng hình ảnh mong muốn nhưng vẫn giữ đúng ngân sách performance",
    ],
  },
  {
    role: "Video Producer",
    responsibilities: [
      "Sản xuất và dựng video doanh nghiệp cùng tài liệu đào tạo nội bộ",
      "Quản lý toàn bộ workflow sản xuất video và bàn giao asset đầu cuối",
    ],
  },
] as const;

const VI_SKILL_GROUPS = [
  { name: "VFX & Mô phỏng" },
  { name: "Shader & Vật liệu" },
  { name: "Phần mềm 3D" },
  { name: "Game Engine" },
  { name: "Lập trình & Pipeline" },
  { name: "AI & Công cụ mới" },
] as const;

const VI_PROJECTS: Record<string, Partial<Project>> = {
  "spider-man-2": {
    role: "FX Artist",
    workSummary:
      "Thực hiện cinematic VFX, gameplay VFX và cả UI effect trong game cho tựa blockbuster PS5 của Insomniac Games.",
    description:
      "Phát triển particle system và environmental VFX cho tựa game PS5 của Insomniac Games, đóng góp vào combat effects, web mechanics và không khí open-world.",
    contributions: [
      "Thực hiện Houdini simulation cho destruction và debris effects",
      "Xây Niagara particle systems cho combat và traversal VFX",
      "Tối ưu hiệu ứng để đạt mục tiêu performance trên PS5",
      "Tích hợp asset qua pipeline Perforce cùng FX team của Insomniac",
    ],
  },
  "fortnite-remix": {
    role: "FX Artist",
    workSummary:
      "Thực hiện cinematic trailer cho sự kiện tháng 10/2023 mang tên \"Remix The Finale\", dùng để quảng bá sự kiện mới trong game.",
    description:
      "Tạo weapon effects và event VFX cho Fortnite Remix Finale của Epic Games, hướng tới các hiệu ứng real-time có độ impact cao cho lượng người chơi đồng thời rất lớn.",
    contributions: [
      "Thiết kế và triển khai weapon-skin VFX bằng Unreal Engine Niagara",
      "Xây live-event effects đã cân chỉnh cho performance trên PC, console và mobile",
      "Làm việc trực tiếp với FX team của Epic về style guide và technical constraint",
    ],
  },
  "new-world": {
    role: "FX Artist",
    workSummary:
      "FX Artist cho cinematic trailer nhằm quảng bá bản phát hành New World trên PS5. Dự án từ Amazon Games.",
    description:
      "Đóng góp vào production trailer cinematic và in-game VFX cho đợt launch New World trên PS5 của Amazon Games, tập trung vào environmental effect và combat effect.",
    contributions: [
      "Tạo environmental VFX gồm weather, magic và destruction systems",
      "Phát triển HLSL shader cho foliage animation và tương tác bề mặt nước",
      "Xây pipeline procedural bằng Houdini để tăng tốc quá trình sản xuất asset",
    ],
  },
  "until-dawn": {
    role: "Lighting Artist",
    workSummary:
      "Lighting Artist cho nội dung cinematic của bản remake PS5. Dự án có số lượng cinematic lớn với art direction căng thẳng, thiên horror. Outsource từ Ballistic Moon.",
    description:
      "Thực hiện cinematic lighting cho các phân đoạn quan trọng trong bản remake PS5, hỗ trợ đạt được không khí horror và chất lượng cinematic mà Ballistic Moon hướng tới.",
    contributions: [
      "Lên sáng cho cinematic sequence bằng Lumen global illumination trong Unreal Engine 5",
      "Làm việc với director để chốt mood và ngôn ngữ ánh sáng theo hướng horror",
      "Tối ưu light setup để chạy real-time ổn định trên PS5",
    ],
  },
  "black-knight": {
    role: "FX Houdini Artist",
    description:
      "Tạo hiệu ứng động và environmental VFX cho series gốc của Netflix này, làm việc trong pipeline cinematic VFX hướng đến chất lượng phát sóng.",
    contributions: [
      "Mô phỏng dust, smoke và debris bằng các solver của Houdini như FLIP, pyro và grain",
      "Bàn giao geometry cache và Alembic đã sẵn sàng cho team compositing",
      "Làm việc trong deadline rất gắt của một lịch phát sóng rút ngắn",
    ],
  },
  havoc: {
    role: "VFX Artist (Freelance)",
    description:
      "Tham gia với vai trò freelance VFX artist, phát triển real-time visual effects cho gameplay system và cinematic bằng Unreal Engine.",
    contributions: [
      "Thiết kế Niagara particle system cho combat ability và environmental effect",
      "Viết HLSL shader cho material effect theo hướng stylized",
      "Làm việc từ xa với core team để iterate theo visual target",
    ],
  },
  wolverine: {
    role: "VFX Artist",
    workSummary:
      "Có đóng góp VFX xuất hiện trong trailer đã được công bố công khai.",
    description:
      "Một phần VFX contribution có xuất hiện trong trailer đã phát hành. Các chi tiết khác vẫn thuộc NDA.",
    contributions: ["VFX contribution trong trailer công khai; các chi tiết khác thuộc NDA"],
  },
  "dragon-fortune": {
    title: "Dragon Fortune - Prototype Slot cá nhân",
    role: "Personal Technical Art Test",
    description:
      "Một prototype HTML5 tự làm để test UI iGaming, particle FX, timing cho win-state và flow free-spin trên trình duyệt.",
    contributions: [
      "Prototype interaction slot 5 cuộn với 10 payline",
      "Test particle FX bằng WebGL/Canvas cho coin rain và win feedback",
      "Dựng GSAP timeline cho spin, reveal, win và free-spin states",
    ],
  },
};

const VI_EDUCATION = [
  { degree: "Advanced Diploma về Visual Effects" },
  { degree: "Cử nhân Tài chính Ngân hàng" },
] as const;

const VI_CERTIFICATES = [{}, {}] as const;

const VI_CREDITS = [
  { subtitle: "VFX Artist" },
  { subtitle: "VFX Artist" },
] as const;

export function getLocalizedSite(locale: Locale) {
  return locale === "vi" ? { ...SITE, ...VI_SITE } : SITE;
}

export function getLocalizedHero(locale: Locale) {
  return locale === "vi" ? { ...HERO, ...VI_HERO } : HERO;
}

export function getLocalizedAbout(locale: Locale) {
  return locale === "vi" ? { ...ABOUT, ...VI_ABOUT } : ABOUT;
}

export function getLocalizedProfile(locale: Locale) {
  return locale === "vi" ? { ...PROFILE, ...VI_PROFILE } : PROFILE;
}

export function getLocalizedExperiences(locale: Locale) {
  if (locale === "en") return EXPERIENCES;
  return EXPERIENCES.map((experience, index) => ({
    ...experience,
    ...VI_EXPERIENCES[index],
  }));
}

export function getLocalizedSkillGroups(locale: Locale) {
  if (locale === "en") return SKILL_GROUPS;
  return SKILL_GROUPS.map((group, index) => ({
    ...group,
    ...VI_SKILL_GROUPS[index],
  }));
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  return {
    ...project,
    ...VI_PROJECTS[project.slug],
  };
}

export function getLocalizedProjects(locale: Locale) {
  return PROJECTS.map((project) => getLocalizedProject(project, locale));
}

export function getLocalizedFeaturedProjects(locale: Locale) {
  return FEATURED_PROJECTS.map((project) => getLocalizedProject(project, locale));
}

export function getLocalizedEducation(locale: Locale) {
  if (locale === "en") return EDUCATION;
  return EDUCATION.map((item, index) => ({
    ...item,
    ...VI_EDUCATION[index],
  }));
}

export function getLocalizedCertificates(locale: Locale) {
  if (locale === "en") return CERTIFICATES;
  return CERTIFICATES.map((item, index) => ({
    ...item,
    ...VI_CERTIFICATES[index],
  }));
}

export function getLocalizedAchievementCredits(locale: Locale) {
  if (locale === "en") return ACHIEVEMENT_CREDITS;
  return ACHIEVEMENT_CREDITS.map((item, index) => ({
    ...item,
    ...VI_CREDITS[index],
  }));
}
