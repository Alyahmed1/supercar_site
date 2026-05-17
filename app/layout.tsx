import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "APEX — The World's Finest Supercars",
  description: "Six legendary machines. Limitless power. Zero compromise.",
  openGraph: {
    title: "APEX — The World's Finest Supercars",
    description: "Six legendary machines. Limitless power. Zero compromise.",
    type: "website",
    siteName: "APEX",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format",
        width: 1200,
        height: 630,
        alt: "APEX — The World's Finest Supercars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX — The World's Finest Supercars",
    description: "Six legendary machines. Limitless power. Zero compromise.",
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#080808]">{children}</body>
    </html>
  );
}
