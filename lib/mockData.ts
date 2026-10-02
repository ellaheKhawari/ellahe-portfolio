import * as React from "react";
import type { FooterLinkItem, ProjectBase, ProjectYear, YearPanel } from "@/types";
import { AtSign, Link2, Mail, Phone, Video } from "lucide-react";
import { SiGithub, SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";

const BaleIcon = ({ className }: { className?: string }) =>
  React.createElement("img", {
    src: "/baleIcon.png",
    alt: "Bale",
    className,
    style: { filter: "brightness(0) invert(1)" },
  });

const LinkedinIcon = ({ className }: { className?: string }) =>
  React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
    },
    React.createElement("path", {
      d: "M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.8h2.9v9.2H5.5V9.8Zm5.05 0h2.77v1.27h.04c.39-.73 1.34-1.5 2.76-1.5 2.96 0 3.51 1.94 3.51 4.48v6.95h-2.9v-6.52c0-1.55-.03-3.55-2.17-3.55-2.18 0-2.5 1.7-2.5 3.45v6.62H10.55V9.8Z",
    })
  );

export const MARQUEE_SKILLS = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Next.js',
  'Node.js',
  'Git',
  'REST API',
  'Figma',
  'Framer Motion',
  'PostgreSQL',
].join('   ');

export const projectSection: ProjectBase[] = [
  {
    id: "01",
    tech: ["React", "TypeScript", "Framer Motion"],
    image: "/pictures/project2.png",
  },
  {
    id: "02",
    tech: ["Next.js", "D3", "Tailwind"],
    image: "/pictures/project2.png",
  },
  {
    id: "03",
    tech: ["React", "Three.js", "Sanity"],
    image: "/pictures/project2.png",
  },
  {
    id: "04",
    tech: ["Next.js", "Stripe", "Tailwind"],
    image: "/pictures/project2.png",
  },
  {
    id: "05",
    tech: ["React", "GLSL", "Lenis"],
    image: "/pictures/project2.png",
  },
];

export function getYearPanels(locale: "en" | "fa" = "en"): YearPanel[] {
  return [
    { id: "step1", year: 1, label: locale === "fa" ? "قدم 1" : "step 1", delta: "30%", up: true },
    { id: "step2", year: 2, label: locale === "fa" ? "قدم 2" : "step 2", delta: "90%", up: true },
    { id: "step3", year: 3, label: locale === "fa" ? "قدم 3" : "step 3", delta: "120%", up: true },
    { id: "step4", year: 4, label: locale === "fa" ? "قدم 4" : "step 4", delta: "188%", up: true },
  ];
}

export const YEAR_PANELS = getYearPanels();

export const THUMB_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

export const STAGE_YEARS = [ 1 , 2, 3, 4] as const satisfies readonly ProjectYear[];

export const socialIcons = [Mail, AtSign, Video, Link2];

export const socialItems: FooterLinkItem[] = [
  { href: "https://www.instagram.com/ellahe_khawari/", icon: SiInstagram },
  { href: "https://github.com/ellaheKhawari", icon: SiGithub },
  { href: "https://www.linkedin.com/in/ellahe-khawari/", icon: LinkedinIcon },
];

export const contactItems: FooterLinkItem[] = [
  { href: "mailto:ellahe.khawari@gmail.com", icon: Mail },
  { href: "https://t.me/ellahe_khawari", icon: SiTelegram },
  { href: "https://wa.me/+989335678545", icon: SiWhatsapp },
  { href: "https://ble.ir/ellahe_khawari", icon: BaleIcon },
  { href: "tel:+989335678545", icon: Phone, dir: "ltr" },
];

// متن‌ها داخل stringها از این markup ساده پشتیبانی می‌کنن:
//   [متن لینک](https://...)   `کد`   **بولد**
export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  | { type: "code"; code: string }
  | { type: "links"; items: { label: string; href: string }[] };

export type Project = {
  id: string; // از این برای لینک مستقیم استفاده می‌شه: /projects#id
  number: string;
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  links: { label: string; href: string }[];
  images: { desktop: string; tablet: string; mobile: string }; // مسیر داخل /public
  blocks: Block[];
};

export const projectHref = (id: string) => `/projects#${id}`;

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation.";

export const projects: Project[] = [
  {
    id: "ellara-academy",
    number: "01",
    title: "Ellara Academy",
    subtitle: "A modern, multilingual language-learning platform",
    meta: [
      { label: "Role", value: "Design & Development" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "React / TypeScript / Vite" },
      { label: "Type", value: "Language Learning Platform" },
    ],
    links: [
      { label: "Live demo", href: "https://ellara-academy.ellahe-khawari.workers.dev/" },
      { label: "Source code", href: "https://github.com/" },
    ],
    images: {
      desktop: "/projects/ellara-desktop.png",
      tablet: "/projects/ellara-tablet.png",
      mobile: "/projects/ellara-mobile.png",
    },
    blocks: [
      { type: "heading", text: "About" },
      {
        type: "paragraph",
        text: "Ellara Academy is a front-end showcase for a language-course business offering **English, Chinese, Korean, Spanish, and Persian**. It has **no real backend**: everything is simulated on the client, so anyone can [clone the repo](https://github.com/) and run it in seconds.",
      },
      { type: "heading", text: "Features" },
      {
        type: "list",
        items: [
          "Landing page with scroll-revealed sections and a reviews carousel",
          "Mock authentication with login, register, forgot password and a fake JWT",
          "Student dashboard with charts and data tables",
          "Dark / light theme and English / Persian with automatic RTL",
        ],
      },
      { type: "heading", text: "Tech stack" },
      {
        type: "table",
        columns: ["Category", "Technology", "Used for"],
        rows: [
          ["Core", "React 19, TypeScript, Vite", "App foundation"],
          ["Styling", "`Tailwind CSS v4`", "Responsive layout and theming"],
          ["State / Data", "Zustand, TanStack Query", "Auth state and mock API caching"],
          ["Charts", "Recharts", "Dashboard visualizations"],
          ["Animation", "[Framer Motion](https://motion.dev)", "Scroll reveal and micro-interactions"],
        ],
      },
      { type: "heading", text: "Demo account" },
      { type: "code", code: "email: demo@lingova.com\npassword: demo1234" },
      {
        type: "links",
        items: [
          { label: "Open live demo", href: "https://ellara-academy.ellahe-khawari.workers.dev/" },
          { label: "View on GitHub", href: "https://github.com/" },
        ],
      },
    ],
  },
  {
    id: "portfolio-experiment",
    number: "02",
    title: "Portfolio Experiment",
    subtitle: "A self-directed study in editorial grid systems",
    meta: [
      { label: "Role", value: "Design & Development" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js / GSAP / Lenis" },
      { label: "Type", value: "Case study" },
    ],
    links: [{ label: "Live site", href: "https://example.com" }],
    images: {
      desktop: "/projects/portfolio-desktop.png",
      tablet: "/projects/portfolio-tablet.png",
      mobile: "/projects/portfolio-mobile.png",
    },
    blocks: [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: LOREM },
      { type: "paragraph", text: `${LOREM} Read more on [the reference article](https://example.com).` },
      { type: "heading", text: "Breakpoints" },
      {
        type: "table",
        columns: ["Breakpoint", "Columns", "Notes"],
        rows: [
          ["Mobile", "4", LOREM.slice(0, 60)],
          ["Tablet", "8", LOREM.slice(0, 60)],
          ["Desktop", "8", LOREM.slice(0, 60)],
        ],
      },
    ],
  },
];