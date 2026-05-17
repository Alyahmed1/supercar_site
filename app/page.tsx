import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CarShowcase from "@/components/CarShowcase";
import StatsBar from "@/components/StatsBar";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <IntroOverlay />
      <Navbar />
      <Hero />
      <Marquee />
      <CarShowcase />
      <StatsBar />
      <VideoSection />
      <Gallery />
      <Footer />
    </main>
  );
}
