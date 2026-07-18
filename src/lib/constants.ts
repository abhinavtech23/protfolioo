// =====================================================
// ABHINAV TIWARI — PORTFOLIO CONSTANTS
// All content data in one place. Strictly typed.
// =====================================================

// ----- MONTAGE IMAGES (for intro sequence) -----
// These reference the original assets directory.
// Next.js public directory structure.
export const MONTAGE_IMAGES: string[] = [
  "/images/montage/montage-01.jpg",
  "/images/montage/montage-02.jpg",
  "/images/montage/montage-03.jpg",
  "/images/montage/montage-04.jpg",
  "/images/montage/montage-05.jpg",
  "/images/montage/montage-06.jpg",
  "/images/montage/montage-07.jpg",
  "/images/montage/montage-08.jpg",
  "/images/montage/montage-09.jpg",
  "/images/montage/montage-10.jpg",
  "/images/montage/montage-11.jpg",
];

// ----- HERO -----
export const HERO = {
  headline:
    "EL'28 | Flutter Developer | Machine Learning | Cross-platform App Architecture | Hardware-Software Integration.",
  subheadline:
    "Architecting end-to-end systems spanning IoT hardware-software co-design, real-time concurrent pipelines, and cloud-connected backends.",
  resumePath: "/resume/Abhinav_Tiwari_Resume.pdf",
} as const;

// ----- TECH ARSENAL -----
export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
  span: "large" | "medium" | "small";
}

export const TECH_ARSENAL: SkillCategory[] = [
  {
    title: "Languages",
    icon: "⟨/⟩",
    items: ["Python", "C", "C++", "Dart", "JavaScript", "HTML/CSS"],
    span: "large",
  },
  {
    title: "Systems & Hardware",
    icon: "⚙",
    items: ["Concurrency", "Multi-threading", "ESP32", "NodeMCU"],
    span: "medium",
  },
  {
    title: "AI / Machine Learning",
    icon: "◈",
    items: ["Computer Vision (OpenCV)", "TensorFlow", "Keras"],
    span: "medium",
  },
  {
    title: "Web & Mobile",
    icon: "◻",
    items: ["Flutter", "Firebase", "Flask", "Node.js", "Riverpod"],
    span: "medium",
  },
];

// ----- PROJECTS -----
export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  teamCredits?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "dilprotek",
    name: "DILPROTEK",
    tagline: "AI-Integrated Health Monitoring Platform",
    description:
      "A comprehensive health monitoring platform featuring AI-driven cardiac risk prediction and OCR-based medical report analysis. The system integrates machine learning models with both frontend and backend to provide real-time health insights and predictive diagnostics.",
    techStack: ["Flutter", "Python", "TensorFlow", "OCR", "Firebase", "Flask"],
    highlights: [
      "AI-driven cardiac risk prediction engine with high-accuracy ML models",
      "OCR-based automated medical report analysis and data extraction",
      "Secure ML model integration spanning frontend and backend pipelines",
      "Real-time health data visualization and predictive alerts",
    ],
    teamCredits:
      "Led the integration of machine learning models securely with the frontend and backend, in collaboration with team lead Hardik.",
  },
  {
    id: "drishti",
    name: "DRISHTI",
    tagline: "AI-Powered Smart Glasses for the Visually Impaired",
    description:
      "A wearable distributed IoT system designed to assist visually impaired individuals through real-time scene understanding. The system combines ESP32 microcontrollers, IR sensors, and a Python AI inference pipeline to generate automated scene descriptions.",
    techStack: ["ESP32", "Python", "OpenCV", "IR Sensors", "IoT", "Flask"],
    highlights: [
      "Wearable distributed IoT architecture using ESP32 and IR sensors",
      "Python AI inference pipeline built on OpenCV for real-time scene generation",
      "Low-latency edge computing for instantaneous environmental feedback",
      "Haptic and audio feedback system for seamless user interaction",
    ],
  },
  {
    id: "shudhi",
    name: "SHUDHI",
    tagline: "AI-Powered Waste Management Platform",
    description:
      "An intelligent waste management platform developed for the Smart India Hackathon. The system leverages AI to classify, route, and optimize waste collection across urban environments, promoting sustainable waste management practices.",
    techStack: ["Flutter", "Python", "TensorFlow", "Firebase", "IoT"],
    highlights: [
      "AI-powered waste classification and intelligent routing system",
      "Smart India Hackathon finalist project with real-world impact potential",
      "Scalable cloud-connected backend for urban waste management",
      "Real-time monitoring dashboard for waste collection optimization",
    ],
    teamCredits:
      "Built alongside team members Vishal and Anushka for the Smart India Hackathon.",
  },
  {
    id: "og-arm",
    name: "OG-ARM",
    tagline: "6-DOF Robotic Arm Controller",
    description:
      "A sophisticated 6-degree-of-freedom robotic arm controller application demonstrating complex ESP-based robotics integration. The system provides precise motor control and real-time feedback through a Flutter-based interface.",
    techStack: ["Flutter", "ESP32", "C++", "Bluetooth", "Robotics"],
    highlights: [
      "6-DOF precision robotic arm control via mobile interface",
      "Complex ESP-based robotics integration with real-time feedback",
      "Bluetooth Low Energy communication for low-latency motor control",
      "Inverse kinematics algorithms for smooth articulated movement",
    ],
  },
];

// ----- EXPERIENCE -----
export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "ogdeck",
    role: "Full-Stack Software Developer",
    organization: "OGDECK",
    period: "February 2026 — April 2026",
    description:
      "Architected real-time concurrent communication bridges between Flutter applications and ESP32 microcontrollers, enabling seamless hardware-software co-design.",
    highlights: [
      "Designed and implemented real-time concurrent communication protocols",
      "Built Flutter ↔ ESP32 bidirectional data pipelines",
      "Engineered low-latency Bluetooth and Wi-Fi bridge architectures",
    ],
  },
  {
    id: "gdg",
    role: "Volunteer",
    organization: "GDG On Campus — Dr. AITD",
    period: "September 2025 — Present",
    description:
      "Active volunteer with Google Developer Groups on campus, contributing to developer community building and technical event organization.",
    highlights: [
      "Community engagement and developer advocacy",
      "Technical workshop facilitation",
    ],
  },
  {
    id: "codematrix",
    role: "Organizing Team",
    organization: "CodeMatrix Genesis Hackathon",
    period: "Community Leadership",
    description:
      "Led the organizing team for CodeMatrix Genesis, a competitive hackathon fostering innovation and collaborative problem-solving among developers.",
    highlights: [
      "End-to-end hackathon organization and execution",
      "Cross-functional team leadership and coordination",
    ],
  },
];

// ----- ACADEMICS -----
export const EDUCATION = {
  degree: "Bachelor of Technology (B.Tech)",
  field: "Electronics Engineering",
  university: "Dr. A.P.J. Abdul Kalam Technical University",
  expectedGraduation: "Expected August 2028",
} as const;

export interface Award {
  title: string;
  icon: string;
}

export const AWARDS: Award[] = [
  {
    title: "Top 10 Finalist — HackData 2K26, Shiv Nadar University",
    icon: "🏆",
  },
  {
    title: "9× National Level Hackathon Finalist",
    icon: "🏅",
  },
  {
    title: "1st Place — Intellectual Property Rights (IPR) Competition",
    icon: "🥇",
  },
];

// ----- CONTACT / SOCIAL -----
export const CONTACT = {
  email: "abhinavtiwari232003@gmail.com",
  linkedin: "https://linkedin.com/in/abhinav-tiwari-0a8a87381",
  linkedinDisplay: "linkedin.com/in/abhinav-tiwari-0a8a87381",
} as const;

// ----- NAV LINKS -----
export const NAV_LINKS = [
  { label: "Arsenal", href: "#arsenal" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Academics", href: "#academics" },
  { label: "Contact", href: "#contact" },
] as const;
