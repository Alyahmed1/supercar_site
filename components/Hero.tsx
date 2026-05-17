"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Parallax background video */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-110"
        >
          <source src="/hero_bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#080808]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60" />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E63946] to-transparent origin-center"
      />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto select-none"
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-[#E63946] text-[10px] font-bold uppercase mb-10 tracking-[0.4em]"
        >
          The World's Finest Supercars
        </motion.p>

        {/* BORN */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[15vw] lg:text-[13vw] font-black leading-none tracking-tighter text-white uppercase"
          >
            BORN
          </motion.h1>
        </div>

        {/* TO — with divider lines */}
        <div className="overflow-hidden flex items-center justify-center gap-4 md:gap-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="h-px bg-gradient-to-r from-transparent to-[#E63946] flex-1 max-w-[180px] origin-right"
          />
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[15vw] lg:text-[13vw] font-black leading-none tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#E63946] to-[#D4AF37]"
          >
            TO
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="h-px bg-gradient-to-l from-transparent to-[#D4AF37] flex-1 max-w-[180px] origin-left"
          />
        </div>

        {/* RULE */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[15vw] lg:text-[13vw] font-black leading-none tracking-tighter text-white uppercase"
          >
            RULE
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-8 text-white/40 text-xs md:text-sm font-medium tracking-[0.25em] uppercase"
        >
          Six legendary machines. Limitless power. Zero compromise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#collection"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(230,57,70,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#E63946] text-white text-xs font-bold tracking-[0.25em] uppercase rounded-sm"
          >
            Explore Collection
          </motion.a>
          <motion.a
            href="#videos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/20 text-white text-xs font-bold tracking-[0.25em] uppercase rounded-sm hover:border-white/50 hover:bg-white/5 transition-all"
          >
            Watch Them Run
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown size={18} className="text-white/25" />
        </motion.div>
        <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
