import { Dictionary } from "@/types";
import { Rocket, Activity, ShieldCheck, GitPullRequest } from "lucide-react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation.";

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
  button: {
    seeMore: "See more",
  },

  projectsDetails: {
    ui: {
      project: "Project",
      back: "Back to projects",
    },
    items: [
      {
        number: "01",
        title: "Ellara Academy",
        subtitle: "A multilingual platform for learning languages",
        meta: [
          { label: "Role", value: "Frontend Design & Development" },
          { label: "Year", value: "2026" },
          { label: "Stack", value: "React 19 / TypeScript / Vite" },
          { label: "Type", value: "Language Learning Platform" },
        ],
        links: [
          {
            label: "Live demo",
            href: "https://ellara-academy.ellahe-khawari.workers.dev/",
          },
        ],
        images: {
          desktop: "/projects/EllaraAcademy1.png",
          tablet: "/projects/EllaraAcademy3.png",
          mobile: "/projects/EllaraAcademy5.png",
        },
        blocks: [
          { type: "heading", text: "About the project" },
          {
            type: "paragraph",
            text: "Ellara Academy is a frontend project for a language-learning platform offering English, Chinese, Korean, Spanish, and Persian courses. I built a responsive landing page, a simulated authentication flow, and a student dashboard with charts and data tables. The project gave me an opportunity to bring several parts of a platform together while paying attention to layout, interaction, and usability. Authentication and data are simulated on the client side; there is no real backend.",
          },
          { type: "heading", text: "Key features" },
          {
            type: "list",
            items: [
              "Responsive landing page with animated sections and a reviews carousel",
              "Simulated login, registration, password recovery, and session persistence",
              "Student dashboard with charts and data tables",
              "English and Persian language support with automatic RTL/LTR switching",
              "Dark and light themes",
              "Responsive layouts for mobile, tablet, and desktop",
            ],
          },
          { type: "heading", text: "Tech stack" },
          {
            type: "table",
            columns: ["Category", "Technology", "Purpose"],
            rows: [
              ["Core", "React 19, TypeScript, Vite", "Application structure and development"],
              ["Styling", "Tailwind CSS v4", "Responsive layouts and styling"],
              ["Routing", "React Router", "Page navigation and protected routes"],
              ["State / Data", "Zustand, TanStack React Query", "Authentication state and mock data handling"],
              ["Forms", "TanStack Form", "Form state and validation"],
              ["UI", "MUI, MUI X Data Grid", "Dashboard components and data tables"],
              ["Charts", "Recharts", "Dashboard visualizations"],
              ["Animation", "Framer Motion", "Scroll animations and interactions"],
              ["Other", "next-themes, Embla Carousel, Sonner, Lucide React", "Themes, carousel, notifications, and icons"],
            ],
          },
          { type: "heading", text: "Demo account" },
          {
            type: "paragraph",
            text: "You can use the demo account below or register a new account. Authentication is simulated, and account data is stored in the browser.",
          },
          {
            type: "code",
            code: "email: demo@lingova.com\npassword: demo1234",
          },
          {
            type: "links",
            items: [
              {
                label: "Open live demo",
                href: "https://ellara-academy.ellahe-khawari.workers.dev/",
              },
            ],
          },
        ],
      },
      {
        number: "02",
        title: "Nova Admin",
        subtitle: "An interactive dashboard for product management",
        meta: [
          { label: "Role", value: "Frontend Design & Development" },
          { label: "Year", value: "2026" },
          { label: "Stack", value: "React 18 / TypeScript / Vite" },
          { label: "Type", value: "Admin Dashboard" },
        ],
        links: [
          {
            label: "Live demo",
            href: "https://admin-panel.ellahe-khawari.workers.dev",
          },
        ],
        images: {
          desktop: "/projects/NovaAdmin1.png",
          tablet: "/projects/NovaAdmin2.png",
          mobile: "/projects/NovaAdmin3.png",
        },
        blocks: [
          { type: "heading", text: "About the project" },
          {
            type: "paragraph",
            text: "Nova Admin is a dashboard project focused on product management and everyday administrative tasks. It includes an interactive products page, multiple ways to view and organize data, and feedback messages for important actions. I also worked with route-based code splitting and animated loading states to make navigation feel more considered. Authentication and dashboard data are mocked, so the project can be explored without a real account or backend.",
          },
          { type: "heading", text: "Key features" },
          {
            type: "list",
            items: [
              "Simulated login using any email and password",
              "Product management with search, filtering, sorting, editing, and deletion",
              "Grid and table views for browsing products",
              "Product editing drawer and delete confirmation modal",
              "Dashboard statistics and charts",
              "Toast notifications for important actions",
              "Route-based code splitting with lazy loading and animated loading screens",
              "TanStack React Query configured for future API integration",
            ],
          },
          { type: "heading", text: "Tech stack" },
          {
            type: "table",
            columns: ["Category", "Technology", "Purpose"],
            rows: [
              ["Core", "React 18, TypeScript, Vite", "Application structure and development"],
              ["Styling", "Tailwind CSS v3", "Layout and styling"],
              ["Routing", "React Router v6", "Navigation between dashboard pages"],
              ["Animation", "Framer Motion", "Loading animation and UI interactions"],
              ["Charts", "Recharts", "Dashboard visualizations"],
              ["Data", "TanStack React Query", "Query client setup for future API integration"],
              ["Notifications", "Sonner", "Action feedback and status messages"],
              ["Icons / Utilities", "Lucide React, clsx", "Icons and conditional class names"],
            ],
          },
          { type: "heading", text: "Authentication" },
          {
            type: "paragraph",
            text: "There is no real backend behind the login form. Any email and password combination allows access to the dashboard, making it easy to explore the interface without creating a real account.",
          },
          {
            type: "code",
            code: "email: demo@admin.com\npassword: demo1234",
          },
          {
            type: "links",
            items: [
              {
                label: "Open live demo",
                href: "https://admin-panel.ellahe-khawari.workers.dev",
              },
            ],
          },
        ],
      },
      {
        number: "03",
        title: "Estatein",
        subtitle: "A real estate platform for exploring property listings",
        meta: [
          { label: "Role", value: "Frontend Design & Development" },
          { label: "Year", value: "2026" },
          { label: "Stack", value: "React 19 / TypeScript / Vite" },
          { label: "Type", value: "Real Estate Platform" },
        ],
        links: [
          {
            label: "Live demo",
            href: "https://estatein-project.ellahe-khawari.workers.dev",
          },
        ],
        images: {
          desktop: "/projects/estatein-desktop.png",
          tablet: "/projects/estatein-tablet.png",
          mobile: "/projects/estatein-mobile.png",
        },
        blocks: [
          { type: "heading", text: "About the project" },
          {
            type: "paragraph",
            text: "Estatein is a frontend project for a real estate platform, bringing property listings and business information into one responsive interface. Visitors can browse properties, narrow results using search and filters, explore individual property details, and navigate dedicated pages for services, company information, and contact. The project also includes simulated login and registration flows, along with loading and not-found states. All data and authentication are mocked on the client side; no real backend is connected.",
          },
          { type: "heading", text: "Key features" },
          {
            type: "list",
            items: [
              "Home page introducing the real estate platform",
              "Property listings with search and multiple filters",
              "Individual property detail views",
              "Dedicated services, about, and contact pages",
              "Simulated login and registration",
              "Contact form for inquiries",
              "Loading states and a custom 404 page",
              "Responsive layouts for mobile and desktop",
            ],
          },
          { type: "heading", text: "Tech stack" },
          {
            type: "table",
            columns: ["Category", "Technology", "Purpose"],
            rows: [
              ["Core", "React 19, TypeScript, Vite", "Application structure and development"],
              ["Styling", "Tailwind CSS v4", "Responsive layouts and styling"],
              ["Routing", "React Router v7", "Page navigation"],
              ["State", "Zustand", "Client-side state management"],
              ["Data", "TanStack React Query", "Data handling and caching setup"],
              ["Forms", "TanStack Form", "Form state and validation"],
              ["UI", "MUI, Radix UI, MUI X Data Grid", "Interface components and data tables"],
              ["Theming", "next-themes", "Theme management"],
              ["Notifications", "Sonner, React Toastify", "User feedback"],
              ["Other", "Embla Carousel, Lucide React", "Carousel interactions and icons"],
            ],
          },
          { type: "heading", text: "Authentication & data" },
          {
            type: "paragraph",
            text: "Estatein does not use a real backend. Login, registration, property information, and other data are simulated on the client side, allowing visitors to explore the main interface without a real account or server connection.",
          },
          {
            type: "links",
            items: [
              {
                label: "Open live demo",
                href: "https://estatein-project.ellahe-khawari.workers.dev",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default en;