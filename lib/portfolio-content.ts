import {
  ABOUT,
  CLIENT_REVIEWS,
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
  title: "Henry Tran - Technical VFX Artist",
  description:
    "Technical VFX Artist tập trung vào real-time effects, shader development và technical art cho game AAA và live-service content.",
};

const VI_HERO = {
  tagline:
    "Real-time VFX thực chiến cho quy trình sản xuất game.",
  description:
    "Tôi xây dựng, tối ưu và tích hợp hiệu ứng production-ready trên custom engine và Unreal Engine.",
};

const VI_ABOUT = {
  title: "VFX thực chiến, shader và tích hợp engine.",
  bio: [
    "Tôi là Technical VFX Artist tại TP. Hồ Chí Minh, chuyên về real-time gameplay VFX, shader tùy biến và tối ưu hiệu năng trong engine cho game và cinematic.",
    "Kinh nghiệm sản xuất thực chiến của tôi bao gồm các dự án AAA như Marvel's Spider-Man 2 và Fortnite: Remix, làm việc trực tiếp với Niagara, custom engine và pipeline Perforce.",
    "Trọng tâm của tôi là toàn bộ quy trình technical art: từ tạo effect và viết HLSL/material graph, đến phát triển công cụ Python tự động hóa và profiling để giữ vững framerate mục tiêu.",
  ],
  location: "TP. Hồ Chí Minh, Việt Nam",
};

const VI_PROFILE = {
  headline: "Technical VFX Artist",
  paragraph:
    "Thực hiện VFX, tối ưu, tích hợp engine và các production tool gọn nhẹ. Làm việc tại TP.HCM và mở cho cơ hội remote phù hợp.",
  ctaText: "Liên hệ với tôi",
  stats: [
    { label: "Game đã ra mắt", value: "8+" },
    { label: "Dự án commercial", value: "20+" },
    { label: "Năm làm sản phẩm sáng tạo", value: "7+" },
    { label: "Công cụ", value: "Unreal Engine, Unity, Premiere Pro, After Effects, JangaFX" },
    { label: "Phần mềm 3D", value: "Blender, Houdini, Maya, 3Ds Max, Cinema 4D" },
  ] as const,
};

const VI_EXPERIENCES = [
  {
    role: "Freelance Technical VFX Artist",
    responsibilities: [
      "Thực hiện real-time VFX, shader và technical art trực tiếp cho các studio indie và mid-size với pipeline tinh gọn",
      "Xây dựng hệ thống Niagara dạng module, master material và profiling để đạt framerate mục tiêu",
      "Hỗ trợ quy trình chuyển asset từ DCC sang engine bằng script Python gọn nhẹ và chuẩn bị mesh tối ưu",
    ],
  },
  {
    role: "Senior VFX Artist",
    responsibilities: [
      "Phát triển và tối ưu real-time VFX cho các dự án AAA như Marvel's Spider-Man 2, Fortnite Remix Finale, New World: Aeternum và Until Dawn (PS5)",
      "Tạo shader tùy biến và hệ thống Niagara trong Unreal Engine 5 cho gameplay và cinematic",
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
      "Xây real-time particle systems cho combat và traversal VFX",
      "Tối ưu hiệu ứng để đạt mục tiêu performance trên PS5",
      "Tích hợp asset qua pipeline Perforce cùng FX team của Insomniac",
    ],
    constraints: [
      "Mục tiêu 60 FPS ổn định trên PS5 (Performance Mode)",
      "Ngân sách bộ nhớ khắt khe của hệ thống particle trên proprietary engine",
      "Quy chuẩn nghiêm ngặt về phân cấp asset và changelist trên Perforce",
    ],
    technicalHighlights: [
      "Pipeline mô phỏng destruction và debris bằng Houdini",
      "Tích hợp hệ thống particle real-time cho combat và di chuyển",
      "Profiling số lượng particle và overdraw trực tiếp trên phần cứng PS5",
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
    constraints: [
      "Hiệu năng đa nền tảng từ PC, console đến mobile",
      "Độ dễ đọc thị giác cao trong bối cảnh multiplayer mật độ người chơi lớn",
      "Tiêu chuẩn pipeline Niagara và quy tắc LOD của Epic Games",
    ],
    technicalHighlights: [
      "Emitter Niagara dạng module cho weapon skin và sự kiện trực tiếp",
      "Shader stylized với noise-erosion và unlit master material",
      "Tối ưu vòng đời particle và drawcall",
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
      "Tạo custom shader logic cho foliage animation và tương tác bề mặt nước",
      "Xây pipeline procedural bằng Houdini để tăng tốc quá trình sản xuất asset",
    ],
    constraints: [
      "Chất lượng cinematic môi trường quy mô lớn dưới mốc thời gian gấp",
      "Tính đồng nhất giữa thời tiết động và hệ thống ánh sáng",
    ],
    technicalHighlights: [
      "Shader logic tùy biến cho chuyển động cây cỏ và tương tác mặt nước",
      "Quy trình procedural bằng Houdini để dựng asset môi trường",
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
    constraints: [
      "Ngân sách hiệu năng Lumen global illumination real-time trên PS5",
      "Bảo toàn độ tương phản và không khí horror đặc thù",
    ],
    technicalHighlights: [
      "Thiết lập ánh sáng Lumen trong UE5 cho các phân cảnh cinematic",
      "Tối ưu sương mù thể tích (volumetric fog) cho mục tiêu console 60 FPS",
    ],
  },
  "malignant": {
    role: "Technical VFX Artist (Freelance)",
    workSummary:
      "Thực hiện 80% hệ thống visual effects cho tựa game horde-shooter Malignant trên Steam: combat VFX vũ khí, mô phỏng máu bằng LiquiGen, lửa môi trường, HUD UMG và hiệu ứng màn hình biến dị.",
    description:
      "Hợp đồng qua Upwork: thiết kế, tối ưu và tích hợp VFX gameplay, widget UMG và pipeline mô phỏng gore trong Unreal Engine 5 cho bản phát hành thương mại trên Steam của Buzzkill Interactive.",
    contributions: [
      "Mô phỏng tia máu bắn (blood splats) trên LiquiGen (JangaFX), xuất flipbook/sprite sheet tích hợp vào Niagara trong Unreal Engine 5",
      "Xây dựng logic Blueprint throttling (cooldown 0.1s) cho Niagara blood hit để chống tụt FPS khi bắn súng liên thanh",
      "Thực hiện combat VFX cho vũ khí: ánh sáng chớp nòng súng SMG, đồng bộ độ giật (recoil) và hiệu ứng đạn va chạm",
      "Thiết kế và triển khai widget UMG (WBP_ActiveSyringe, WBP_InactiveSyringes) với vòng tròn cooldown động và bộ đếm đạn vệt mực stylized",
      "Tạo hiệu ứng màn hình post-process và shader viền gân máu cho trạng thái biến dị gen và khi người chơi cạn máu",
      "Set up VFX môi trường cho map thị trấn đêm (L_Town1): xe cảnh sát bốc cháy, tàn tro trôi dạt và nguồn sáng lửa",
    ],
    constraints: [
      "Đảm bảo framerate ổn định trên 40 FPS khi đối đầu với bầy quái vật đột biến đông đúc và hỏa lực bắn liên thanh",
      "Giới hạn tốc độ spawn hạt của Niagara khi trúng đạn để tránh giật lag CPU/GPU",
      "Giữ độ dễ đọc cho gameplay trong bối cảnh môi trường đêm tối kết hợp với hiệu ứng lửa và decal máu",
    ],
    technicalHighlights: [
      "Quy trình mô phỏng fluid trên LiquiGen cho các biến thể máu và xuất flipbook",
      "Logic throttling cho Niagara bullet impact với biến boolean timed và decal máu lưu 30 giây",
      "Cấu trúc UMG Blueprint cho vòng tròn cooldown và hiển thị trạng thái ống tiêm biến dị",
      "Profiling trực tiếp trong engine với STATGROUP_game để kiểm soát draw call và chu kỳ tick",
    ],
    evidenceBreakdown: [
      {
        image: "/projects/malignant/malignant-combat-profiling.webp",
        title: "Profiling hiệu năng & Thực chiến In-Game (UE5 PIE)",
        tag: "Unreal Engine 5 · Profiling",
        caption: "Profiling trực tiếp trong chế độ Play-In-Editor khi đối đầu bầy quái vật cống (AIC_SewerMutant) bằng lệnh STATGROUP_game. Kiểm soát draw call (574), primitive count (2852k) và chu kỳ tick để giữ vững framerate 40+ FPS dưới mật độ quái dày.",
      },
      {
        image: "/projects/malignant/malignant-ue5-editor-fire.webp",
        title: "Lửa môi trường & Trang trí màn chơi (L_Town1)",
        tag: "Niagara · Environment VFX",
        caption: "Tạo hệ thống emitter lửa môi trường, mảnh giấy bay rải rác và tàn tro phát sáng trong map L_Town1 (thị trấn Daybreak). Cân chỉnh ánh sáng điểm động (point light) chiếu rọi đường phố đêm tối mà không làm cháy tương phản bóng đổ.",
      },
      {
        image: "/projects/malignant/malignant-liquigen-blood-sim.webp",
        title: "Mô phỏng Fluid tia máu bắn (LiquiGen)",
        tag: "LiquiGen (JangaFX) · Simulation",
        caption: "Mô phỏng quỹ đạo tia máu tốc độ cao bằng phần mềm LiquiGen (JangaFX). Xuất texture dạng flipbook/sprite sheet đa góc độ để đưa vào emitter Niagara trong Unreal Engine 5.",
      },
      {
        image: "/projects/malignant/malignant-umg-screen-overlay.png",
        title: "HUD Ống tiêm biến dị & Hiệu ứng viền màn hình (UMG)",
        tag: "UMG · Screen Post-Process",
        caption: "Xây dựng widget blueprint WBP_ActiveSyringe với thanh máu dạng cọ vẽ mực stylized và đồng hồ đo huyết thanh đột biến. Tích hợp shader viền gân máu đỏ toàn màn hình kích hoạt khi cạn máu hoặc khi bật năng lực biến dị.",
      },
      {
        image: "/projects/malignant/malignant-umg-syringe-cooldowns.png",
        title: "Vòng tròn Cooldown & Kỹ năng đột biến (UMG)",
        tag: "UMG · Radial Shaders",
        caption: "Thiết kế widget WBP_InactiveSyringes cho các dạng biến dị (Boneblades, Abomination, Tox). Sử dụng shader làm đầy vòng tròn (radial fill) điều khiển bởi material để phản hồi thời gian hồi chiêu trực quan trong giao tranh nhanh.",
      },
      {
        image: "/projects/malignant/malignant-blueprint-weapon-vfx.png",
        title: "VFX Vũ khí & Logic Chớp nòng súng (BP_SMG)",
        tag: "Blueprint · Weapon VFX",
        caption: "Logic Blueprint trong BP_SMG điều khiển ánh sáng chớp nòng hai bên (muzzle flash lights) kèm timer tự tắt cực nhanh 0.02 giây, kết hợp độ giật vũ khí (recoil) và hiệu ứng đạn ngẫu nhiên.",
      },
      {
        image: "/projects/malignant/malignant-blueprint-blood-rate-limit.png",
        title: "Tối ưu giới hạn tần suất Spawn hạt Niagara (Blood FX)",
        tag: "Blueprint · Tối ưu hiệu năng",
        caption: "Cơ chế kiểm soát hiệu năng cho hiệu ứng máu khi trúng đạn: sử dụng cờ boolean kèm timer 0.1s để giới hạn tần suất spawn hệ thống Niagara khi bắn liên thanh, vừa chống tràn hạt vừa dán decal máu tồn tại 30 giây (MI_BloodDecal).",
      },
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
      "Thiết kế custom materials cho các hiệu ứng stylized",
      "Làm việc từ xa với core team để iterate theo visual target",
    ],
    constraints: [
      "Ràng buộc dự án indie: dung lượng asset nhẹ, tốc độ lặp nhanh",
      "Phân cấp thị giác rõ ràng cho các chiêu thức gameplay",
    ],
    technicalHighlights: [
      "Hệ thống particle Niagara trong Unreal Engine cho kỹ năng chiến đấu",
      "Material shader dạng stylized với dissolve và Fresnel",
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

export function getLocalizedClientReviews(_locale: Locale) {
  return CLIENT_REVIEWS;
}
