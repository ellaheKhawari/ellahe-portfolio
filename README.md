<div align="center">

# ✨ Ellahe Khawari — Portfolio

**A modern, bilingual (EN / FA) developer portfolio with scroll-driven animations and WebGL effects**

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4 — a dark, interactive single-page site with a project showcase and a learning-journey timeline.

[**🔗 Live Demo**](https://ellahe-portfolio.pages.dev/)

</div>

---

## 🇬🇧 English

### About

This is my personal portfolio website, designed to present my frontend work, skills, and learning path. It is a fully static site (Next.js static export) with a custom-built visual identity: a particle hero, a cursor-trail shader, a scroll-driven WebGL spiral, and curved WebGL project images.

### ✨ Features

- 🎬 **Animated preloader** and smooth page-entry transitions
- 🌌 **Hero section** with an interactive canvas particle background
- 🖱 **Global cursor-trail effect** (shader-based) that can be disabled per section through a context provider
- 🏷 **Skills section** with animated horizontal marquees
- 🖼 **Projects section** with WebGL-rendered, scroll-reactive curved images (React Three Fiber + custom shaders)
- 🌀 **Scroll-pinned spiral background** rendered with regl
- 🧭 **Learning-journey timeline** driven by scroll progress
- 📄 **Project detail pages** with an animated device showcase
- 🌐 **Bilingual (EN / FA)** with an automatic **RTL** switch for Persian and a persisted language choice
- ♿ **Reduced-motion support** for animated parts of the UI
- 📱 **Fully responsive** layout

### 🛠 Tech Stack

| Category | Technology |
|---|---|
| Core | Next.js 16 (App Router, static export), React 19, TypeScript |
| Styling | Tailwind CSS v4, `tw-animate-css`, `class-variance-authority`, `tailwind-merge` |
| Animation | Framer Motion / Motion |
| 3D & WebGL | Three.js, React Three Fiber, `@react-three/drei`, regl, `shaders` |
| State | Zustand (language store, persisted in `localStorage`) |
| UI | MUI (RTL-aware theme), Lucide, React Icons, Sonner (toasts) |
| Deployment | Cloudflare Pages |

### 🌐 Language & Content

- **Language:** English is the default. The switch in the navbar toggles Persian, which also flips the page direction to RTL. The choice is saved in `localStorage`.
- **Translations:** all UI text lives in `lib/i18n/dictionaries/en.ts` and `fa.ts`. Add every new string to **both** files.
- **Projects & data:** project metadata, marquee skills, timeline settings, and social links are in `lib/mockData.ts`.

### 📁 Project Structure

```
app/                 # Routes, root layout, global CSS, /projects page
components/
  navbar/            # Navbar with language switch and CV download
  sections/          # Hero, About, Skills, Projects, LearningJourney, Contact, Footer
  ui/                # Buttons, marquees, cards, background effects
hooks/               # useLockBody, usePrefersReducedMotion, useSkillsTabs, ...
lib/
  i18n/              # Zustand language store + EN / FA dictionaries
  mockData.ts        # Projects, skills, timeline and link data
motion/              # Preloader, Timeline, DeviceShowcase, loaders
providers/           # LocaleProvider, ThemeRegistry, CursorTrailProvider
three/               # React Three Fiber scenes and project image mesh
webGL/               # Projects effect, regl spiral background, shaders
types/               # Shared TypeScript types
public/              # Static assets and CV files
```

### 📄 License

Copyright © 2026 Ellahe Khawari. **All rights reserved.**

This repository is public for viewing and evaluation only. Copying, modifying, or reusing the code, design, or content in another project or portfolio is not permitted without prior written permission.

---

## 🇮🇷 فارسی

### درباره پروژه

این وب‌سایت نمونه‌کار شخصی منه که برای نمایش پروژه‌ها، مهارت‌ها و مسیر یادگیری فرانت‌اندم ساخته شده. سایت به‌صورت کامل استاتیک (Static Export در Next.js) هست و هویت بصری اختصاصی داره: هیرو با ذرات تعاملی، افکت دنبال‌کننده‌ی موس با شیدر، پس‌زمینه‌ی مارپیچ مبتنی بر اسکرول و تصاویر پروژه‌ها با افکت خمیدگی WebGL اجرا میشه.


### ✨ ویژگی‌ها

- 🎬 **پری‌لودر انیمیشنی** و انتقال نرم هنگام ورود به صفحه
- 🌌 **بخش هیرو** با پس‌زمینه‌ی ذرات تعاملی (Canvas)
- 🖱 **افکت دنبال‌کننده‌ی موس** (مبتنی بر شیدر) که از طریق Context در هر بخش قابل غیرفعال‌شدنه
- 🏷 **بخش مهارت‌ها** با مارکی‌های افقی متحرک
- 🖼 **بخش پروژه‌ها** با تصاویر خمیده‌ی WebGL که به اسکرول واکنش نشون می‌دن (React Three Fiber + شیدر سفارشی)
- 🌀 **پس‌زمینه‌ی مارپیچ** که هنگام اسکرول پین می‌شه و با regl رندر می‌شه
- 🧭 **تایم‌لاین مسیر یادگیری** که با پیشرفت اسکرول حرکت می‌کنه
- 📄 **صفحه‌ی جزئیات پروژه** همراه با نمایش انیمیشنی روی دستگاه‌ها
- 🌐 **دوزبانه (انگلیسی / فارسی)** با تغییر خودکار جهت صفحه به **RTL** و ذخیره‌ی زبان انتخابی
- ♿ **پشتیبانی از Reduced Motion** برای بخش‌های متحرک
- 📱 **کاملاً واکنش‌گرا**

### 🛠 تکنولوژی‌های استفاده‌شده

| بخش | تکنولوژی |
|---|---|
| هسته اصلی | Next.js 16 (App Router، خروجی استاتیک)، React 19، TypeScript |
| استایل‌دهی | Tailwind CSS نسخه ۴، `tw-animate-css`، `class-variance-authority`، `tailwind-merge` |
| انیمیشن | Framer Motion / Motion |
| 3D و WebGL | Three.js، React Three Fiber، `@react-three/drei`، regl، `shaders` |
| مدیریت state | Zustand (استور زبان، ذخیره‌شده در `localStorage`) |
| رابط کاربری | MUI (تم سازگار با RTL)، Lucide، React Icons، Sonner (نوتیفیکیشن) |
| دیپلوی | Cloudflare Pages |

### 🌐 زبان و محتوا

- **زبان:** پیش‌فرض انگلیسیه. با سوییچ داخل navbar می‌تونید زبان رو تغییر بدید که جهت صفحه هم RTL می‌شه. انتخاب شما در `localStorage` ذخیره می‌مونه.
- **ترجمه‌ها:** تمام متن‌های رابط کاربری در `lib/i18n/dictionaries/en.ts` و `fa.ts` هستن. هر متن جدید رو باید در **هر دو** فایل اضافه کنید.
- **پروژه‌ها و داده‌ها:** اطلاعات پروژه‌ها، مهارت‌های مارکی، تنظیمات تایم‌لاین و لینک‌های شبکه‌های اجتماعی در `lib/mockData.ts` قرار دارن.

### 📁 ساختار پروژه

```
app/                 # مسیرها، لایه‌ی اصلی، CSS سراسری، صفحه‌ی /projects
components/
  navbar/            # نوبار با سوییچ زبان و دانلود رزومه
  sections/          # Hero، About، Skills، Projects، LearningJourney، Contact، Footer
  ui/                # دکمه‌ها، مارکی‌ها، کارت‌ها، افکت‌های پس‌زمینه
hooks/               # useLockBody، usePrefersReducedMotion، useSkillsTabs و ...
lib/
  i18n/              # استور زبان (Zustand) + دیکشنری‌های EN / FA
  mockData.ts        # داده‌ی پروژه‌ها، مهارت‌ها، تایم‌لاین و لینک‌ها
motion/              # پری‌لودر، تایم‌لاین، DeviceShowcase، لودرها
providers/           # LocaleProvider، ThemeRegistry، CursorTrailProvider
three/               # صحنه‌های React Three Fiber و مش تصاویر پروژه
webGL/               # افکت پروژه‌ها، پس‌زمینه‌ی مارپیچ با regl، شیدرها
types/               # تایپ‌های مشترک TypeScript
public/              # فایل‌های استاتیک و رزومه
```

### 📄 لایسنس

حق نشر © ۲۰۲۶ الهه خاوری. **تمامی حقوق محفوظ است.**

این مخزن فقط برای مشاهده و ارزیابی به‌صورت عمومی منتشر شده. کپی، تغییر یا استفاده‌ی مجدد از کد، طراحی یا محتوا در پروژه یا نمونه‌کار دیگر، بدون اجازه‌ی کتبی مجاز نیست.
