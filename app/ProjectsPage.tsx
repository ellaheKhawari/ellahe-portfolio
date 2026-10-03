import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { ProjectDetails } from "@/components/sections/ProjectDetails";

export const metadata: Metadata = { title: "Projects — Details" };

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <ProjectDetails />
    </main>
  );
}