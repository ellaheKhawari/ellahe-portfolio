import { Dictionary } from "@/types";
import { Rocket, Activity, ShieldCheck, GitPullRequest } from "lucide-react";

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
    title1: "Builder of modern",
    title2: "web experience",
    subtitle:
      "I care about clean interfaces, thoughtful interactions and the deatlis that make a digital experience memorable ",
    cta: "See my work",
    ctaSecondary: "Get in touch",
    scroll: "Scroll",
    skills: "React TypeScript  Next.js  Three.js",
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
    eyebrow: "My Skills",
    title1: "Frontend, Motion & 3D",
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
    eyebrow:"Selected works — 2026",
    title : "PROJECTS",
    span: "05 case studies, in build order",
    desc1: "I build interfaces",
    desc2:"the way this page is built —",
    desc3: "on a grid you can feel",
    desc4:"even when it stays out of sight. Structure first,",
    desc5:"then character.",
  },
  projectsCard: [
    {
      id: "deploy",
      label: "Deployments",
      hint: "Push to production",
      icon: Rocket,
      eyebrow: "Ship",
      title: "Deploy every push in seconds",
      body: "Every commit builds, previews, and promotes on its own. Instant rollbacks keep production one click from a known good release.",
      points: [
        "Immutable preview URL for every pull request",
        "Atomic promotions with zero downtime",
        "One-click rollback to any prior build",
      ],
      metric: { value: "12s", label: "median build to live" },
    },
    {
      id: "observe",
      label: "Observability",
      hint: "Traces, logs, metrics",
      icon: Activity,
      eyebrow: "Watch",
      title: "See every request as it happens",
      body: "Traces, logs, and metrics stream into one timeline. Filter by route, region, or release to catch the slow path before users feel it.",
      points: [
        "Distributed traces across all services",
        "Live tail with structured log search",
        "Alerts wired to Slack and PagerDuty",
      ],
      metric: { value: "1.4M", label: "spans indexed per minute" },
    },
    {
      id: "access",
      label: "Access Control",
      hint: "Roles and audit",
      icon: ShieldCheck,
      eyebrow: "Secure",
      title: "Least-privilege access by default",
      body: "Scoped tokens, SSO, and per-environment roles keep production locked down. Every action lands in an immutable audit log you can export.",
      points: [
        "SAML and SCIM for your identity provider",
        "Fine-grained roles per project and environment",
        "Signed audit trail retained for 90 days",
      ],
      metric: { value: "SOC 2", label: "Type II certified" },
    },
    {
      id: "collab",
      label: "Collaboration",
      hint: "Review in the flow",
      icon: GitPullRequest,
      eyebrow: "Together",
      title: "Review changes without leaving the PR",
      body: "Preview links, inline comments, and deploy status land on the pull request. Required approvals gate promotion so nothing ships unseen.",
      points: [
        "Deploy status checks on every pull request",
        "Comment threads pinned to a live preview",
        "Required approvals before promote",
      ],
      metric: { value: "3x", label: "faster review cycles" },
    },
  ],
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