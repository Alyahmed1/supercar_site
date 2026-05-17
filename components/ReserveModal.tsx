"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ReserveModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open || !modalRef.current) return;
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
  }, [open, onClose]);

  // Replace YOUR_FORM_ID: go to formspree.io → New Form → copy the ID (e.g. xpzvwkqr)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzyprpq";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError(false);

    const data = Object.fromEntries(new FormData(formRef.current));

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          formRef.current?.reset();
        }, 5000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={modalRef} className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="relative p-8 pb-6 border-b border-white/5">
                <div className="h-px w-16 bg-[#E63946] mb-4" />
                <h2 className="text-2xl font-black text-white tracking-tight">Reserve Your Machine</h2>
                <p className="text-white/40 text-xs mt-1 tracking-wide">Aly Ahmed will contact you within 24 hours</p>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E63946]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#E63946] text-xl font-black">✓</span>
                  </div>
                  <p className="text-white font-bold text-lg">Enquiry Received</p>
                  <p className="text-white/40 text-xs mt-1">We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5 block">First Name</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        className="w-full bg-white/5 border border-white/8 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#E63946]/50 transition-colors"
                        placeholder="Aly"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5 block">Last Name</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        className="w-full bg-white/5 border border-white/8 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#E63946]/50 transition-colors"
                        placeholder="Ahmed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5 block">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full bg-white/5 border border-white/8 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#E63946]/50 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5 block">Interested In</label>
                    <select
                      name="car"
                        className="w-full bg-[#1a1a1a] border border-white/8 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#E63946]/50 transition-colors"
                    >
                      <option>Ferrari SF90 Stradale</option>
                      <option>Lamborghini Huracán STO</option>
                      <option>McLaren 720S</option>
                      <option>Bugatti Chiron</option>
                      <option>Porsche 911 GT3 RS</option>
                      <option>Koenigsegg Agera RS</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5 block">Message</label>
                    <textarea
                      rows={3}
                      name="message"
                      className="w-full bg-white/5 border border-white/8 rounded-sm px-4 py-3 text-white text-sm outline-none focus:border-[#E63946]/50 transition-colors resize-none"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>
                  {error && (
                    <p className="text-[#E63946] text-[10px] tracking-wide text-center -mb-1">
                      Something went wrong. Please email us directly.
                    </p>
                  )}
                  <motion.button
                    whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 24px rgba(230,57,70,0.4)" } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={loading}
                    className="mt-2 py-4 bg-[#E63946] text-white text-xs font-bold tracking-[0.25em] uppercase rounded-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  >
                    {loading ? "Sending..." : "Submit Enquiry"}
                  </motion.button>

                  {/* Contact info */}
                  <div className="mt-2 pt-4 border-t border-white/5 flex flex-wrap gap-4 justify-center">
                    {[
                      { Icon: Phone, text: "01271118371" },
                      { Icon: Mail, text: "Alyahmed12@gmail.com" },
                      { Icon: MapPin, text: "Egypt · Cairo" },
                    ].map(({ Icon, text }) => (
                      <div key={text} className="flex items-center gap-1.5 text-white/25 text-[10px]">
                        <Icon size={11} />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
