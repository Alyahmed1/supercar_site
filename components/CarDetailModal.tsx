"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Gauge, Wind, Navigation, DollarSign, ArrowUpRight } from "lucide-react";
import { Car } from "@/lib/cars";
import { useState, useRef, useEffect } from "react";
import ReserveModal from "./ReserveModal";

interface Props {
  car: Car | null;
  onClose: () => void;
}

const specItems = (car: Car) => [
  { label: "Horsepower", value: `${car.hp} HP`, icon: Zap },
  { label: "Torque", value: car.torque, icon: Wind },
  { label: "0 – 60 mph", value: car.zeroToSixty, icon: Gauge },
  { label: "Top Speed", value: car.topSpeed, icon: Navigation },
  { label: "Starting Price", value: car.price, icon: DollarSign },
  { label: "Model Year", value: String(car.year), icon: ArrowUpRight },
];

export default function CarDetailModal({ car, onClose }: Props) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!car || !modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [car, onClose]);

  return (
    <>
      <ReserveModal open={reserveOpen} onClose={() => setReserveOpen(false)} />

      <AnimatePresence>
        {car && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-lg"
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 md:inset-10 z-[91] overflow-y-auto rounded-2xl bg-[#0f0f0f] border border-white/8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />

                {/* Brand badge */}
                <div className="absolute top-5 left-6">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-sm"
                    style={{
                      background: `${car.accentColor}18`,
                      color: car.accentColor,
                      border: `1px solid ${car.accentColor}35`,
                    }}
                  >
                    {car.brand} · {car.year}
                  </motion.span>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-all"
                >
                  <X size={16} />
                </button>

                {/* Accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${car.accentColor}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Name + tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-2">
                    {car.name}
                  </h2>
                  <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-6">{car.tagline}</p>
                  <p className="text-white/55 text-sm leading-7 max-w-2xl mb-10">{car.description}</p>
                </motion.div>

                {/* Specs grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                  {specItems(car).map(({ label, value, icon: Icon }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="p-4 rounded-lg bg-white/3 border border-white/5 group hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} style={{ color: car.accentColor }} />
                        <span className="text-white/30 text-[10px] uppercase tracking-wider">{label}</span>
                      </div>
                      <p className="text-white font-black text-xl tracking-tight">{value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(230,57,70,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setReserveOpen(true)}
                    className="flex-1 py-4 bg-[#E63946] text-white text-xs font-bold tracking-[0.25em] uppercase rounded-sm"
                  >
                    Reserve This Car
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(car.brand + " " + car.name + " official film")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 border border-white/15 text-white text-xs font-bold tracking-[0.25em] uppercase rounded-sm hover:border-white/30 hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2"
                  >
                    Watch on YouTube
                    <ArrowUpRight size={13} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
