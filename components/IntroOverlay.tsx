"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

async function playCarRev(): Promise<void> {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();

  let arrayBuffer: ArrayBuffer;
  try {
    const res = await fetch("/rev_full.m4a");
    arrayBuffer = await res.arrayBuffer();
  } catch {
    const res = await fetch("/rev_full.webm");
    arrayBuffer = await res.arrayBuffer();
  }

  let audioBuffer: AudioBuffer;
  try {
    audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch {
    const res = await fetch("/rev_full.webm");
    audioBuffer = await ctx.decodeAudioData(await res.arrayBuffer());
  }

  const t = ctx.currentTime;
  const DURATION = 7;

  const source = ctx.createBufferSource();
  source.buffer = audioBuffer;

  const highShelf = ctx.createBiquadFilter();
  highShelf.type = "highshelf";
  highShelf.frequency.value = 4000;
  highShelf.gain.value = 4;

  const lowShelf = ctx.createBiquadFilter();
  lowShelf.type = "lowshelf";
  lowShelf.frequency.value = 120;
  lowShelf.gain.value = 5;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -20;
  compressor.knee.value = 8;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.2;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(1.1, t + 0.04);
  master.gain.setValueAtTime(1.1, t + DURATION - 0.5);
  master.gain.linearRampToValueAtTime(0, t + DURATION);

  source.connect(lowShelf);
  lowShelf.connect(highShelf);
  highShelf.connect(compressor);
  compressor.connect(master);
  master.connect(ctx.destination);

  source.start(t, 0, DURATION);
  setTimeout(() => { ctx.close().catch(() => {}); }, (DURATION + 0.5) * 1000);
}

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const exitingRef = useRef(false);

  const handleEnter = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    playCarRev().catch(() => {});
    setExiting(true);
    setTimeout(() => setVisible(false), 900);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  if (!visible) return null;

  return (
    <motion.div
      onClick={handleEnter}
      tabIndex={0}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center cursor-pointer overflow-hidden select-none outline-none"
      style={{ background: "#080808" }}
      animate={exiting ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Speed lines that fire on exit */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${8 + i * 7.5}%`,
            background: i % 3 === 0
              ? "rgba(230,57,70,0.6)"
              : "rgba(255,255,255,0.06)",
          }}
          animate={
            exiting
              ? { scaleX: [0, 1], opacity: [0, 1, 0], originX: 0 }
              : { scaleX: 1, opacity: i % 3 === 0 ? 0 : 0.04 }
          }
          transition={
            exiting
              ? { duration: 0.5, delay: i * 0.025, ease: "easeOut" }
              : { duration: 1.2, delay: 0.3 + i * 0.03 }
          }
        />
      ))}

      {/* Flash burst on exit */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            key="burst"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 1] }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(230,57,70,0.5) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Ambient pulsing glow */}
      <motion.div
        animate={
          exiting
            ? { scale: 3, opacity: 0 }
            : { scale: [1, 1.18, 1], opacity: [0.1, 0.22, 0.1] }
        }
        transition={
          exiting
            ? { duration: 0.7, ease: "easeOut" }
            : { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }
        className="absolute w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #E63946 0%, transparent 68%)" }}
      />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-end gap-3 md:gap-5">
          {"APEX".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 70 }}
              animate={
                exiting
                  ? { y: -80, opacity: 0 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                exiting
                  ? { duration: 0.55, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }
              }
              className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black text-white leading-none tracking-tighter"
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={exiting ? { scale: 2, opacity: 0 } : { opacity: 1, scale: 1 }}
            transition={
              exiting
                ? { duration: 0.4, ease: "easeOut" }
                : { duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] }
            }
            className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black leading-none"
            style={{ color: "#E63946" }}
          >
            .
          </motion.span>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={exiting ? { scaleX: 0 } : { scaleX: 1 }}
          transition={
            exiting
              ? { duration: 0.3 }
              : { duration: 1, delay: 0.72, ease: [0.16, 1, 0.3, 1] }
          }
          className="h-0.5 w-full mt-2 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E63946 30%, #D4AF37 70%, transparent)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          animate={
            exiting
              ? { opacity: 0, letterSpacing: "1em" }
              : { opacity: 1, letterSpacing: "0.45em" }
          }
          transition={
            exiting
              ? { duration: 0.4 }
              : { duration: 1.2, delay: 0.95 }
          }
          className="mt-5 text-white/30 text-[10px] md:text-xs font-bold uppercase"
        >
          The World's Finest Supercars
        </motion.p>
      </div>

      {/* Click to enter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={exiting ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
        transition={exiting ? { duration: 0.3 } : { duration: 0.8, delay: 1.4 }}
        className="absolute bottom-16 flex flex-col items-center gap-4"
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border border-[#E63946]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.25 }}
            className="absolute w-10 h-10 rounded-full border border-[#E63946]"
          />
          <div className="w-8 h-8 rounded-full bg-[#E63946]/20 border border-[#E63946]/60 flex items-center justify-center">
            <span className="text-[#E63946] text-xs font-black ml-0.5">▶</span>
          </div>
        </div>
        <motion.p
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-white/40 text-[10px] font-bold tracking-[0.45em] uppercase"
        >
          Click or Press Enter
        </motion.p>
      </motion.div>

      {/* Corner brackets */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={exiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: exiting ? 0 : 1.05 + i * 0.05 }}
          className={`absolute w-8 h-8 border-[#E63946]/25 pointer-events-none ${cls}`}
        />
      ))}
    </motion.div>
  );
}
