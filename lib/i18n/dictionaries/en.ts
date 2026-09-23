import { Dictionary } from "@/types";

const en: Dictionary = {
  meta: {
    title: "Portfolio — Designer & Developer",
    description:
      "A modern, bilingual portfolio built with Next.js, React, TypeScript and Tailwind CSS.",
  },
  nav: {
    close: "Close",
    links: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      waysToConnect: "Ways To Connect",
    },
  },
  hero: {
    eyebrow: "Available for new projects",
    title1: "I build interfaces",
    title2: "that feel alive.",
    subtitle:
      "Front-end engineer crafting fast, precise, and quietly ambitious products — from motion-driven interfaces to full-stack platforms.",
    cta: "See my work",
    ctaSecondary: "Get in touch",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "A little about how I work.",
    body: "I care about the details most people skip: the timing of a transition, the weight of a headline, the way a page breathes on a small screen. My process starts with the content and the constraints, not a template — every project gets its own visual language.",
    body2:
      "Outside of client work, I spend time exploring motion design, WebGL, and design systems that hold up at scale.",
    stats: [
      { value: "6+", label: "Years building products" },
      { value: "40+", label: "Projects shipped" },
      { value: "12", label: "Industries served" },
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "Tools I reach for.",
    groups: [
      {
        name: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MUI"],
      },
      {
        name: "Motion & 3D",
        items: ["Motion (Framer)", "GSAP", "Three.js", "WebGL"],
      },
      {
        name: "State & Tooling",
        items: ["Zustand", "Sonner", "Vite", "Git", "Figma"],
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work.",
    viewProject: "View project",
    items: [
      {
        title: "Aurora Dashboard",
        category: "SaaS · Data visualization",
        description:
          "A real-time analytics dashboard with a custom charting engine and buttery-smooth transitions.",
      },
      {
        title: "Lumen Commerce",
        category: "E-commerce · Storefront",
        description:
          "A headless storefront focused on speed, with an average Lighthouse score of 98.",
      },
      {
        title: "Nova Studio",
        category: "Agency · Marketing site",
        description:
          "An award-nominated agency site featuring a WebGL hero and scroll-driven storytelling.",
      },
      {
        title: "Pulse Health",
        category: "Health-tech · Product",
        description:
          "A patient-facing portal balancing accessibility with a warm, reassuring visual system.",
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've been.",
    items: [
      {
        year: "2024 — Present",
        role: "Senior Front-End Engineer",
        org: "Nova Studio",
        description:
          "Leading front-end architecture for client engagements, mentoring two engineers.",
      },
      {
        year: "2022 — 2024",
        role: "Front-End Engineer",
        org: "Lumen Labs",
        description:
          "Built the design system and storefront that powers 30+ e-commerce brands.",
      },
      {
        year: "2020 — 2022",
        role: "Web Developer",
        org: "Freelance",
        description:
          "Designed and built marketing sites and small products for startups.",
      },
      {
        year: "2019",
        role: "B.Sc. Computer Science",
        org: "University",
        description: "Graduated with a focus on human-computer interaction.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title1: "Let's work",
    title2: "together.",
    body: "Have a project in mind? I'd love to hear about it. Let's create something exceptional together.",
    available: "Available for projects",
    book: "Book a call",
    duration: "15 min intro call",
    email: "ellahe.khawari@gmail.com",
  },
  footer: {
    tagline: "Designing and building thoughtful digital products.",
    sections: {
      product: {
        label: "Product",
        links: ["Features", "Pricing", "Testimonials", "Integrations"],
      },
      company: {
        label: "Company",
        links: ["FAQs", "About", "Privacy Policy", "Terms of Service"],
      },
      resources: {
        label: "Resources",
        links: ["Blog", "Changelog", "Brand", "Help"],
      },
      social: {
        label: "Social",
        links: ["Facebook", "Instagram", "YouTube", "LinkedIn"],
      },
    },
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    home: "Go home",
    browse: "Browse pages",
  },
};

export default en;
