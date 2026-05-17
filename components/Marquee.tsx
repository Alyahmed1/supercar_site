"use client";

import { motion } from "framer-motion";

const items = [
  "Ferrari", "✦", "Lamborghini", "✦", "McLaren", "✦",
  "Bugatti", "✦", "Porsche", "✦", "Koenigsegg", "✦",
  "Power", "✦", "Speed", "✦", "Precision", "✦", "Excellence", "✦",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="py-5 overflow-hidden border-y border-white/5 bg-[#0c0c0c]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === "✦"
                ? "text-[#E63946] text-xs"
                : "text-[10px] font-bold tracking-[0.35em] uppercase text-white/15"
            }
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
