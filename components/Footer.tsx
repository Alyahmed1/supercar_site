import { Globe, Mail, Video, Share2 } from "lucide-react";

const links = ["Collection", "Gallery", "Videos"];
const socials = [
  { Icon: Globe, label: "Website", href: "/" },
  { Icon: Mail, label: "Email", href: "mailto:alyismail2004@gmail.com" },
  { Icon: Video, label: "Videos", href: "#videos" },
  { Icon: Share2, label: "Share", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Logo + tagline */}
          <div>
            <span className="text-3xl font-black tracking-widest text-white uppercase">
              APEX<span className="text-[#E63946]">.</span>
            </span>
            <p className="text-white/25 text-[10px] mt-2 tracking-[0.3em] uppercase">
              The World's Finest Supercars
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/25 hover:text-white text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-white/25 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-[10px] tracking-wider">
            © {new Date().getFullYear()} APEX. All rights reserved.
          </p>
          <p className="text-white/15 text-[10px] tracking-wider">
            Crafted with precision. Driven by passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
