import { Dictionary } from "@/types";
import { Rocket, Activity, ShieldCheck, GitPullRequest } from "lucide-react";

const en: Dictionary = {
  meta: {
    title: "Ellahe Khawari — Frontend Developer",
    description:
      "The portfolio of Ellahe Khawari, a Frontend Developer focused on modern interfaces, thoughtful user experiences, motion, and the details that make a website feel complete.",
  },
  nav: {
    close: "Close",
    links: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      learningJourney: "Learning Journey",
      contact: "Contact with me",
      waysToConnect: "Ways To Connect",
    },
  },
  hero: {
    eyebrow: "Available for new projects",
    title1: "Building web experiences",
    title2: "that feel as good as they look.",
    subtitle:
      "I’m a Frontend Developer who has been seriously pursuing web development for the past two years. To me, a website is more than its code and pages — its visual language, interactions, details, and overall feel all shape the experience.",
    cta: "View my works",
    ctaSecondary: "Get in touch",
    scroll: "Scroll",
    skills: "React TypeScript  Next.js  Three.js . webGL",
  },
  about: {
    eyebrow: "About me",
    title: "A little about me",
    body: "I'm Ellahe Khawari and I’ve been seriously pursuing web development for the past three years. I started with structured courses and training, then continued learning on my own through tutorials, experiments and—most importantly—building things. I enjoy creating something people can actually see, use, and connect with. Visual design matters a lot to me, but I don’t see it as separate from usability or performance. A good interface should feel thoughtful, responsive, accessible, and natural to use.",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
  },
  skills: {
    eyebrow: "My skills",
    title1: "Frontend",
    groups: [
      {
        name: "",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MUI"],
      },
      {
        name: "",
        items: ["Motion (Framer)", "GSAP", "Three.js", "WebGL"],
      },
      {
        name: "",
        items: ["Zustand", "Sonner", "Vite", "Git", "Figma"],
      },
    ],
    title2: "State & Tooling",
  },
  projects: {
    eyebrow: "Selected projects",
    title: "PROJECTS",
    span: "Ideas turned into hands-on experience.",
    span2: "Project",
    desc1: "These are parts of my",
    desc2: "frontend journey",
    desc3: " — projects built",
    desc4: " to learn, experiment",
    desc5: "and find better ways to create .",
    items: {
      "01": {
        title: ["ELLARA", "ACADEMY"],
        category: "Language Learning Platform",
        description:
          "A multilingual language-learning platform built with a modern interface and a structure inspired by real-world products. The project includes simulated authentication, a student dashboard, Persian and English support, automatic RTL/LTR direction changes, and light and dark themes.",
        imageAlt: "ELLARA ACADEMY",
      },
      "02": {
        title: ["NOVA", "ADMIN"],
        category: "Admin Dashboard",
        description:
          "An admin dashboard designed around a realistic product structure, with a focus on practical interface patterns and data management. It includes simulated authentication and a product management area with search, filtering, sorting, and full create, edit, and delete operations.",
        imageAlt: "NOVA panel",
      },
      "03": {
        title: ["ESTATEIN", ""],
        category: "Real Estate Platform",
        description:
          "A real-estate platform focused on presenting and managing property listings through clear search and filtering experiences. The project includes simulated authentication and a responsive interface designed for both desktop and mobile, with a structure that can be extended as the product grows.",
        imageAlt: "",
      },
      "04": {
        title: ["ELLARA", "SHOP"],
        category: "E-COMMERCE",
        description:
          "The commerce counterpart to Ellara Academy — same visual language, tuned for browsing, comparison, and a fast, quiet checkout.",
        imageAlt: "Abstract minimal composition of geometric objects",
      },
      "05": {
        title: ["PORTFOLIO", "EXPERIMENT"],
        category: "CASE STUDY",
        description:
          "A self-directed study in editorial grid systems on the web — this section is, in fact, one of its results.",
        imageAlt: "Minimal modern workspace object on a neutral background",
      },
    },
  },
  learningJourney: {
    heading: {
      line1: "My learning journey ",
      line2: "so far",
    },
    timelineLabel: "My learning and growth",
    stages: {
      1: {
        title: "Professional Frontend Web Development Course",
        description:
          "A structured foundation in frontend development, helping me understand core concepts and apply them through practical projects.",
      },
      2: {
        title: "Advanced React.js Course",
        description:
          "A deeper focus on React and modern frontend techniques for building more complex and maintainable user interfaces.",
      },
      3: {
        title: "Independent Learning & Building",
        description:
          "I continued learning beyond courses, exploring Next.js, Three.js, and WebGL through personal projects, online resources, and hands-on problem-solving.",
      },
      4: {
        title: "Continuing to Learn & Explore",
        description:
          "I keep building personal projects, refining my skills, and exploring new technologies. Each project brings new questions, ideas, and opportunities to learn.",
      },
    },
    card: {
      title: "Learning & Growth",
      badge: "My journey",
      yearsLabel: "Learning stage",
      chartLabel: "How my learning has developed over time",

      panels: {
        1: {
          value: "Mar 2025 — Sep 2025",
          caption: "Barnamenevis Academy · Instructor: Ahmad Badpi",
        },

        2: {
          value: "Nov 2025 — Jun 2026",
          caption:
            "Barnamenevis Academy · Instructor: Morteza Ghorbanalizadeh",
        },

        3: {
          value: "Beyond the courses",
          caption: "Independent practice and exploration",
        },

        4: {
          value: "Ongoing",
          caption: "Continuous learning and improvement",
        },
      },
    },
  },
  contact: {
    eyebrow: "Contact with me",
    title1: "Let's talk about",
    title2: "your idea",
    body: "You can get in touch with me to start a collaboration",
    available: "If you have an idea or would like to collaborate, I’d love to hear from you",
    book: "Book a conversation",
    duration: "Short intro call",
    email: "ellahe.khawari@gmail.com",
  },
  footer: {
    tagline: "Building with care, learning with curiosity, and always leaving room to grow.",
    sections: {
      explore: {
        label: "Explore",
        links: ["About me", "Skills", "Projects", "Learning Journey"],
      },
      quickLinks: {
        label: "Quick Links",
        links: ["Home", "About This Site", "Project Guide", "FAQs"],
      },
      social: {
        label: "Find Me Online",
        links: ["Instagram", "GitHub", "LinkedIn"],
      },
      contact: {
        label: "Ways to Connect",
        links: ["Email", "Telegram", "WhatsApp", "Bale", "+98 933 567 8545"],
      },
    },
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist.",
    home: "Back home",
    browse: "Browse projects",
  },
};

export default en;