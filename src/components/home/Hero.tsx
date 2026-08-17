"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import RevealText from "@/components/ui/RevealText";
import PhotoImage from "@/components/ui/PhotoImage";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative h-[92svh] min-h-[600px] w-full overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: parallaxY, scale }}
        className="absolute inset-0"
      >
        <PhotoImage
          src="/images/sections/hero-ferrari.jpg"
          alt="Sportovní vůz na lesní silnici"
          priority
          sizes="100vw"
          className="h-full w-full [object-position:center_0%] lg:[object-position:center_78%]"
        />
      </motion.div>

      {/* Scrim so the header stays legible over the photo before scroll */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-paper/95 via-paper/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite/30 to-transparent" />

      {/* Angled dark band carrying the headline for guaranteed contrast */}
      <div className="absolute inset-x-0 bottom-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-graphite pb-10 pt-8 sm:pb-11 sm:pt-9 lg:pb-12 lg:pt-10"
          style={{ clipPath: "polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)" }}
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-accent-soft">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Prémiové a sportovní automobily
              </motion.span>
            </p>

            <h1 className="mt-2 max-w-4xl font-display text-[8vw] font-normal leading-[0.98] text-white sm:text-[4.8vw] lg:text-[3.6rem]">
              <RevealText text="Auta, která" delay={0.7} />
              <br />
              <span className="italic text-accent-soft">
                <RevealText text="stojí za pozornost." delay={1.05} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-[17px] leading-relaxed text-white/70">
                Sportovní a prémiové automobily pro klienty, kteří hledají víc
                než jen způsob dopravy.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/vozy"
                  className="inline-flex items-center justify-center bg-white px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-graphite transition-colors duration-300 hover:bg-accent hover:text-white"
                >
                  Prohlédnout vozy
                </Link>
                <Link
                  href="/prodej-vozu"
                  className="inline-flex items-center justify-center border border-white/35 px-7 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:border-white"
                >
                  Nabídnout svůj vůz
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
