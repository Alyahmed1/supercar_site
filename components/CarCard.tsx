"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Gauge, ArrowUpRight } from "lucide-react";
import { Car } from "@/lib/cars";

interface Props {
  car: Car;
  index: number;
  onOpen: (car: Car) => void;
}

export default function CarCard({ car, index, onOpen }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glowOpacity = useTransform(xSpring, [-0.5, 0, 0.5], [0.4, 0.05, 0.4]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(car)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(car); }}
      role="button"
      tabIndex={0}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative bg-[#111111] rounded-xl overflow-hidden border border-white/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/60"
    >
      {/* Mouse-follow glow */}
      <motion.div
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle at 50% 50%, ${car.accentColor}25 0%, transparent 70%)`,
        }}
        className="absolute inset-0 z-10 pointer-events-none rounded-xl"
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={false}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

        {/* Brand badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
            style={{
              background: `${car.accentColor}18`,
              color: car.accentColor,
              border: `1px solid ${car.accentColor}35`,
            }}
          >
            {car.brand}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] text-white/30 font-medium">{car.year}</span>
        </div>

        {/* "Click to explore" hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase bg-black/60 px-4 py-2 rounded-sm backdrop-blur-sm">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-lg font-black text-white mb-0.5 tracking-tight">{car.name}</h3>
        <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-5">{car.tagline}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center py-3 rounded-sm bg-white/3 border border-white/3 group-hover:border-white/6 transition-colors">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap size={11} style={{ color: car.accentColor }} />
              <span className="text-white font-black text-sm">{car.hp}</span>
            </div>
            <span className="text-white/25 text-[9px] uppercase tracking-wider">HP</span>
          </div>
          <div className="text-center py-3 rounded-sm bg-white/3 border border-white/3 group-hover:border-white/6 transition-colors">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gauge size={11} style={{ color: car.accentColor }} />
              <span className="text-white font-black text-sm">{car.zeroToSixty}</span>
            </div>
            <span className="text-white/25 text-[9px] uppercase tracking-wider">0–60</span>
          </div>
          <div className="text-center py-3 rounded-sm bg-white/3 border border-white/3 group-hover:border-white/6 transition-colors">
            <div className="flex items-center justify-center mb-1">
              <span className="text-white font-black text-sm">{car.topSpeed}</span>
            </div>
            <span className="text-white/25 text-[9px] uppercase tracking-wider">Top Speed</span>
          </div>
        </div>

        {/* Price + Explore */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-wider mb-0.5">Starting at</p>
            <p className="text-white font-black text-base tracking-tight">{car.price}</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.08, boxShadow: `0 0 20px ${car.accentColor}40` }}
            onClick={(e) => { e.stopPropagation(); onOpen(car); }}
            className="flex items-center gap-1.5 px-5 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm cursor-pointer transition-all"
            style={{
              background: `${car.accentColor}15`,
              color: car.accentColor,
              border: `1px solid ${car.accentColor}30`,
            }}
          >
            Explore
            <ArrowUpRight size={12} />
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${car.accentColor}, transparent)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
