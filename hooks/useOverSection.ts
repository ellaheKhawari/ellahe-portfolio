import { useEffect, useState } from "react";

function useOverSection(selector: string) {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOver(entry.isIntersecting),
      { rootMargin: "0px 0px -95% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selector]);

  return isOver;
}