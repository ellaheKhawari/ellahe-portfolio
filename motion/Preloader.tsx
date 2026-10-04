"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GhostLoader } from "./GhostLoader";
import { useLockBody } from "@/hooks/useLockBody";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PreloaderPhase, PreloaderProps } from "@/types";

const MIN_GHOST_TIME = 1800;

export function Preloader({
    onComplete,
}: PreloaderProps) {
    const [phase, setPhase] =
        useState<PreloaderPhase>("loading");

    const reducedMotion = usePrefersReducedMotion();

    useLockBody(phase !== "done");

    useEffect(() => {
        if (reducedMotion) {
            setPhase("done");
            onComplete?.();
            return;
        }

        const startTime = performance.now();

        const checkReady = async () => {
            await waitForEssentialResources();

            const elapsed = performance.now() - startTime;

            const remainingTime = Math.max(
                0,
                MIN_GHOST_TIME - elapsed
            );

            window.setTimeout(() => {
                setPhase("ghost-exit");

                window.setTimeout(() => {
                    setPhase("reveal");

                    window.setTimeout(() => {
                        setPhase("done");
                        onComplete?.();
                    }, 900);
                }, 500);
            }, remainingTime);
        };

        checkReady();
    }, [reducedMotion, onComplete]);

    if (phase === "done") {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                key="preloader"
                className="fixed inset-0 z-9999"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <AnimatePresence>
                    {phase === "loading" && (
                        <motion.div
                            key="ghost"
                            className="fixed inset-0 z-10002 flex items-center justify-center"
                            initial={{
                                opacity: 0,
                                scale: 0.85,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.75,
                                y: -15,
                                filter: "blur(10px)",
                            }}
                            transition={{
                                opacity: {
                                    duration: 0.35,
                                },
                                scale: {
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                                y: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                },
                                filter: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                },
                            }}
                        >
                            <GhostLoader />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="fixed inset-x-0 top-0 z-10001 h-1/2 bg-background"
                    initial={{ y: 0 }}
                    animate={{
                        y: phase === "reveal" ? "-100%" : 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                />

                <motion.div
                    className="fixed inset-x-0 bottom-0 z-10001 h-1/2 bg-background"
                    initial={{ y: 0 }}
                    animate={{
                        y: phase === "reveal" ? "100%" : 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
async function waitForEssentialResources() {
  await Promise.race([
    Promise.all([
      waitForFonts(),
      waitForImages(),
    ]),

    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 10000);
    }),
  ]);
}

function waitForFonts(): Promise<void> {
    if (!document.fonts) {
        return Promise.resolve();
    }

    return document.fonts.ready.then(() => undefined);
}

function waitForImages(): Promise<void> {
  const images = Array.from(document.images);
  const importantImages = images.filter(
    (image) => image.loading !== "lazy"
  );

  if (importantImages.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    importantImages.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          image.addEventListener(
            "load",
            () => resolve(),
            { once: true }
          );

          image.addEventListener(
            "error",
            () => resolve(),
            { once: true }
          );
        })
    )
  ).then(() => undefined);
}
