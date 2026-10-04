import { GhostLoader } from "@/motion/GhostLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9998 flex items-center justify-center bg-background">
      <GhostLoader />
    </div>
  );
}