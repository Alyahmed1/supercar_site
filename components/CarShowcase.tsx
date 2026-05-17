"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cars, Car } from "@/lib/cars";
import CarCard from "./CarCard";
import CarDetailModal from "./CarDetailModal";

export default function CarShowcase() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <>
      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />

      <section id="collection" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="text-[#E63946] text-[10px] font-bold tracking-[0.4em] uppercase mb-5"
              >
                The Collection
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter"
              >
                Six Machines.
                <br />
                <span className="text-white/15">One Obsession.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/30 text-sm max-w-xs leading-relaxed md:text-right"
            >
              Click any car to explore specs, pricing, and more.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} onOpen={setSelectedCar} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
