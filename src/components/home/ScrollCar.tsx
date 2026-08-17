"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import PhotoImage from "@/components/ui/PhotoImage";

export default function ScrollCar() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.4,
  });

  const carX = useTransform(smoothProgress, [0, 1], ["-8vw", "104vw"]);
  const lineScale = useTransform(smoothProgress, [0.05, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative flex h-32 items-center overflow-hidden sm:h-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 lg:px-10">
        <motion.div
          style={{ scaleX: lineScale, willChange: "transform" }}
          className="h-px w-full origin-left bg-graphite/20"
        />
      </div>

      <motion.div
        style={{ x: carX, willChange: "transform" }}
        className="pointer-events-none absolute top-1/2 w-40 -translate-y-full sm:w-52"
      >
        <div className="relative aspect-[1980/590]">
          <PhotoImage
            src="/images/sections/scroll-car.png"
            alt="Sportovní vůz z profilu"
            sizes="220px"
            unoptimized
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
