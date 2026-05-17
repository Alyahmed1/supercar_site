"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryImages } from "@/lib/cars";

const layout = [
  { src: galleryImages[0], cls: "col-span-2 row-span-2", label: "Ferrari SF90" },
  { src: galleryImages[1], cls: "col-span-1 row-span-1", label: "McLaren 720S" },
  { src: galleryImages[2], cls: "col-span-1 row-span-1", label: "Lamborghini" },
  { src: galleryImages[3], cls: "col-span-1 row-span-1", label: "Bugatti Chiron" },
  { src: galleryImages[4], cls: "col-span-1 row-span-1", label: "Porsche GT3 RS" },
  { src: galleryImages[5], cls: "col-span-1 row-span-1", label: "Koenigsegg" },
  { src: galleryImages[6], cls: "col-span-2 row-span-1", label: "On The Track" },
  { src: galleryImages[7], cls: "col-span-1 row-span-1", label: "Pure Power" },
];

// ── 3-D tilt card ──────────────────────────────────────────────────────────────
function TiltPhoto({
  item,
  index,
  onClick,
}: {
  item: (typeof layout)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 120, damping: 18 });
  const yS = useSpring(y, { stiffness: 120, damping: 18 });
  const rotX = useTransform(yS, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotY = useTransform(xS, [-0.5, 0.5], ["-8deg", "8deg"]);
  const shine = useTransform(xS, [-0.5, 0.5], [0.0, 0.18]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      role="button"
      tabIndex={0}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`${item.cls} overflow-hidden rounded-xl bg-[#111111] group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/60`}
    >
      {/* Photo */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </motion.div>

      {/* Mouse-follow shine */}
      <motion.div
        style={{ opacity: shine, background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Top-left red bar — slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-[#E63946] w-0 group-hover:w-full transition-all duration-500"
      />

      {/* Bottom info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
        <p className="text-white font-black text-sm tracking-tight">{item.label}</p>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Click to expand</p>
      </div>

      {/* Zoom icon — center on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + layout.length) % layout.length)),
    []
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % layout.length)),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {lightboxIndex !== null && (
          <>
            <motion.div
              key="lb-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-2xl"
            />

            <motion.div
              key={`lb-img-${lightboxIndex}`}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-8 pointer-events-none"
            >
              <div className="relative max-w-5xl w-full">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
                  <Image
                    src={layout[lightboxIndex].src}
                    alt={layout[lightboxIndex].label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority
                  />
                </div>
                {/* Red top accent on lightbox image */}
                <div className="absolute top-0 left-0 right-0 h-0.5 z-10 rounded-t-xl"
                  style={{ background: "linear-gradient(90deg, transparent, #E63946 40%, #D4AF37 60%, transparent)" }}
                />
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-10 left-0"
                >
                  <p className="text-white/60 text-sm font-bold tracking-widest uppercase">
                    {layout[lightboxIndex].label}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Prev / Next */}
            <div className="fixed inset-0 z-[202] flex items-center justify-between px-4 pointer-events-none">
              {[
                { action: prev, Icon: ChevronLeft, dir: "-x-2" },
                { action: next, Icon: ChevronRight, dir: "x-2" },
              ].map(({ action, Icon }, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => { e.stopPropagation(); action(); }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(230,57,70,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white hover:border-[#E63946]/40 transition-colors backdrop-blur-sm"
                >
                  <Icon size={22} />
                </motion.button>
              ))}
            </div>

            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 right-0 z-[203] flex items-center justify-between px-6 py-4"
            >
              <span className="text-white/35 text-xs tracking-[0.35em] uppercase font-medium">
                {lightboxIndex + 1} <span className="text-white/15">/ {layout.length}</span>
              </span>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#E63946]/40 transition-colors"
              >
                <X size={15} />
              </motion.button>
            </motion.div>

            {/* Dot nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[203] flex gap-2 items-center"
            >
              {layout.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  animate={{
                    width: i === lightboxIndex ? 24 : 6,
                    backgroundColor: i === lightboxIndex ? "#E63946" : "rgba(255,255,255,0.2)",
                  }}
                  className="h-1.5 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Section */}
      <section id="gallery" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-[#E63946] text-[10px] font-bold tracking-[0.4em] uppercase mb-5"
            >
              Visual Showcase
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter"
            >
              Pure
              <br />
              <span className="text-white/15">Aesthetic.</span>
            </motion.h2>
          </div>

          {/* Masonry grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            style={{ gridTemplateRows: "repeat(3, 240px)", gridAutoRows: "160px" }}
          >
            {layout.map((item, i) => (
              <TiltPhoto
                key={i}
                item={item}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
