"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1500, suffix: "", prefix: "", label: "Peak Horsepower", sublabel: "Bugatti Chiron W16" },
  { value: 277, suffix: " mph", prefix: "", label: "Top Speed Record", sublabel: "Koenigsegg Agera RS" },
  { value: 6, suffix: "", prefix: "", label: "Legendary Brands", sublabel: "Hand-selected worldwide" },
  { value: 3, suffix: "M+", prefix: "$", label: "Starting Price", sublabel: "For the Chiron" },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) { setCount(0); return; }
    const duration = 1800;
    const startTime = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section id="heritage" className="py-24 border-y border-white/5 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-6"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tabular-nums">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-white/25 text-[10px] tracking-wider">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
