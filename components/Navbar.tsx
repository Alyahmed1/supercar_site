"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ReserveModal from "./ReserveModal";

const navLinks = ["Collection", "Gallery", "Videos"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ReserveModal open={reserveOpen} onClose={() => setReserveOpen(false)} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center">
            <span className="text-2xl font-black tracking-widest text-white uppercase">
              APEX<span className="text-[#E63946]">.</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-[0.25em] uppercase group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E63946] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => setReserveOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(230,57,70,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-7 py-2.5 bg-[#E63946] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#c62d3a] transition-colors"
          >
            Reserve Now
          </motion.button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-[0.25em] uppercase border-b border-white/5"
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); setReserveOpen(true); }}
                  className="mt-4 py-3 bg-[#E63946] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-sm"
                >
                  Reserve Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
