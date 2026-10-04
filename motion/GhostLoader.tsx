"use client";

import { motion } from "motion/react";

const gridTemplateAreas = `
  "a1 a2 a3 a4 a5 top0 top0 top0 top0 a10 a11 a12 a13 a14"
  "b1 b2 b3 top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14"
  "c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14"
  "d1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14"
  "e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14"
  "f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
  "st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5"
  "an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18"
`;

const flickerA = [1, 6, 7, 8, 11, 12, 13, 18];
const flickerB = [2, 3, 4, 5, 9, 10, 15, 16, 17];

const anAreas = Array.from({ length: 18 }, (_, index) => index + 1);

export function GhostLoader() {
  return (
    <motion.div
      initial={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative h-35 w-35"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(14, 1fr)",
          gridTemplateRows: "repeat(14, 1fr)",
          gridTemplateAreas,
        }}
      >
        
        <div
          className="bg-mist"
          style={{ gridArea: "top0" }}
        />

        <div
          className="bg-mist"
          style={{ gridArea: "top1" }}
        />

        <div
          className="bg-mist"
          style={{ gridArea: "top2" }}
        />

        <div
          className="bg-mist"
          style={{ gridArea: "top3" }}
        />

        <div
          className="bg-mist"
          style={{ gridArea: "top4" }}
        />

        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={`st-${index}`}
            className="bg-mist"
            style={{ gridArea: `st${index}` }}
          />
        ))}

        {anAreas.map((number) => {
          const isFirstGroup = flickerA.includes(number);

          return (
            <motion.div
              key={`an-${number}`}
              style={{ gridArea: `an${number}` }}
              animate={{
                opacity: isFirstGroup ? [1, 0, 1] : [0, 1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-mist"
            />
          );
        })}

        <div className="absolute left-5 top-7.5 h-12.5 w-10">
          <div className="absolute left-2.5 top-0 h-12.5 w-5 bg-mist" />
          <div className="absolute left-0 top-2.5 h-7.5 w-10 bg-mist" />
        </div>

        <div className="absolute right-5 top-7.5 h-12.5 w-10">
          <div className="absolute right-2.5 top-0 h-12.5 w-5 bg-mist" />
          <div className="absolute right-0 top-2.5 h-7.5 w-10 bg-mist" />
        </div>

        <div className="absolute left-7.5 top-12.5 z-10 h-7 w-7 bg-ink" />
        <div className="absolute right-7.5 top-12.5 z-10 h-7 w-7 bg-ink" />
        <div className="absolute left-15 top-22.5 z-10 h-2 w-5 bg-ink" />
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.5, 0.2, 0.5],
          scaleX: [1, 0.8, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 top-28 h-35 w-35 rounded-full bg-ink blur-[20px]"
        style={{
          transform: "rotateX(80deg)",
        }}
      />
    </motion.div>
  );
}