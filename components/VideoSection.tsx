"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink, X } from "lucide-react";
import { cars } from "@/lib/cars";

function VideoCard({
  car,
  index,
  playing,
  onPlay,
  onStop,
}: {
  car: typeof cars[0];
  index: number;
  playing: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    car.brand + " " + car.name + " official film"
  )}`;

  const embedSrc = `https://www.youtube-nocookie.com/embed/${car.videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111111] group">
        {playing ? (
          <>
            <iframe
              src={embedSrc}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title={`${car.brand} ${car.name}`}
            />
            <button
              onClick={onStop}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <NextImage
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-400" />

            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${car.accentColor}, transparent)` }}
            />

            <button
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${car.brand} ${car.name} video`}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(230,57,70,0.93)",
                  boxShadow: "0 0 50px rgba(230,57,70,0.55), 0 0 100px rgba(230,57,70,0.2)",
                }}
              >
                <Play size={22} className="text-white ml-1" fill="white" />
              </motion.div>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
              <p
                style={{ color: car.accentColor }}
                className="text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5"
              >
                {car.brand}
              </p>
              <div>
                <h3 className="text-white font-black text-base tracking-tight">{car.name}</h3>
                <p className="text-white/35 text-xs mt-0.5">{car.hp} HP · {car.topSpeed}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <a
        href={youtubeSearch}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-2 text-white/20 hover:text-white/60 text-[10px] font-medium tracking-wider uppercase transition-colors group/link"
      >
        <ExternalLink size={10} className="group-hover/link:text-[#E63946] transition-colors" />
        Search "{car.brand} {car.name}" on YouTube
      </a>
    </motion.div>
  );
}

export default function VideoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="videos" className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-[#E63946] text-[10px] font-bold tracking-[0.4em] uppercase mb-5"
            >
              In Motion
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter"
            >
              Watch Them
              <br />
              <span className="text-white/15">Come Alive.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="text-white/30 text-sm max-w-xs md:text-right leading-relaxed"
          >
            Click the play button to watch in-page. Use the link below each video to search YouTube directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <VideoCard
              key={car.id}
              car={car}
              index={i}
              playing={playingId === car.id}
              onPlay={() => setPlayingId(car.id)}
              onStop={() => setPlayingId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
