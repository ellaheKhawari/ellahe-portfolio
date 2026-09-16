"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type SpotlightProps = HTMLMotionProps<"div">;

const Spotlight = ({ className, ...props }: SpotlightProps) => {
  return (
    <motion.div
      className={`spotlight${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};

type SpotlightBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
};

const ContactBackground = ({ children, className }: SpotlightBackgroundProps) => {
  return (
    <div className={`spotlight-container${className ? ` ${className}` : ""}`}>
      <div className="spotlight-overlay">
        <Spotlight
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={{
            x: ["-50%", "-30%", "-70%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-50%"],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="spotlight-left"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "10%", "0%"],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
          className="spotlight-mid"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
          className="spotlight-right"
        />
      </div>

      <div className="spotlight-content">
        {children}
      </div>
    </div>
  );
};

export default ContactBackground;
