export interface Car {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  hp: number;
  torque: string;
  zeroToSixty: string;
  topSpeed: string;
  price: string;
  year: number;
  accentColor: string;
  image: string;
  description: string;
  videoId: string;
}

// Video IDs sourced via yt-dlp YouTube search — verified real
// Images = YouTube maxresdefault thumbnails of those exact videos (guaranteed to show the actual car)
export const cars: Car[] = [
  {
    id: "ferrari-sf90",
    name: "SF90 Stradale",
    brand: "Ferrari",
    tagline: "The Prancing Horse Redefined",
    hp: 986,
    torque: "590 lb-ft",
    zeroToSixty: "2.5s",
    topSpeed: "211 mph",
    price: "$507,000",
    year: 2024,
    accentColor: "#E63946",
    image: "https://img.youtube.com/vi/MvVXL-vBQs0/maxresdefault.jpg",
    description: "The most powerful Ferrari road car ever made — a hybrid masterpiece combining a twin-turbocharged V8 with three electric motors for 986 horsepower of pure emotion.",
    videoId: "MvVXL-vBQs0",
  },
  {
    id: "lamborghini-huracan",
    name: "Huracán STO",
    brand: "Lamborghini",
    tagline: "Super Trofeo Omologata",
    hp: 640,
    torque: "417 lb-ft",
    zeroToSixty: "3.0s",
    topSpeed: "193 mph",
    price: "$328,000",
    year: 2024,
    accentColor: "#FF6B00",
    image: "https://img.youtube.com/vi/YqlAVAM9XgE/maxresdefault.jpg",
    description: "Racing DNA, road legal. The Huracán STO is the most extreme naturally-aspirated V10 Lamborghini ever built for the road — born on the track, bred for the street.",
    videoId: "YqlAVAM9XgE",
  },
  {
    id: "mclaren-720s",
    name: "720S",
    brand: "McLaren",
    tagline: "The Pure Driver's Machine",
    hp: 710,
    torque: "568 lb-ft",
    zeroToSixty: "2.8s",
    topSpeed: "212 mph",
    price: "$299,000",
    year: 2024,
    accentColor: "#F0A500",
    image: "https://img.youtube.com/vi/qONckKNrkT8/maxresdefault.jpg",
    description: "Every element of the McLaren 720S exists for a single reason: performance. Carbon fiber MonoCell II chassis, twin-turbocharged V8, aerodynamics that defy physics.",
    videoId: "qONckKNrkT8",
  },
  {
    id: "bugatti-chiron",
    name: "Chiron",
    brand: "Bugatti",
    tagline: "Beyond the Limits of the Possible",
    hp: 1500,
    torque: "1180 lb-ft",
    zeroToSixty: "2.4s",
    topSpeed: "261 mph",
    price: "$3,200,000",
    year: 2024,
    accentColor: "#4F8EF7",
    image: "https://img.youtube.com/vi/JTtN6RGFU2o/maxresdefault.jpg",
    description: "The Bugatti Chiron is not just the fastest car in the world — it is the finest. 1,500 horsepower from a quad-turbocharged 8.0L W16 engine. An engineering masterpiece.",
    videoId: "JTtN6RGFU2o",
  },
  {
    id: "porsche-gt3rs",
    name: "911 GT3 RS",
    brand: "Porsche",
    tagline: "Race Car. Road Legal.",
    hp: 518,
    torque: "343 lb-ft",
    zeroToSixty: "3.2s",
    topSpeed: "184 mph",
    price: "$239,000",
    year: 2024,
    accentColor: "#00C896",
    image: "https://img.youtube.com/vi/KdLMA9nJStg/maxresdefault.jpg",
    description: "The 911 GT3 RS lives at the absolute limit. Aerodynamics taken straight from Le Mans racing, a naturally-aspirated flat-six screaming to 9,000 RPM. Pure, unfiltered driving.",
    videoId: "KdLMA9nJStg",
  },
  {
    id: "koenigsegg-agera",
    name: "Agera RS",
    brand: "Koenigsegg",
    tagline: "The World Record Holder",
    hp: 1360,
    torque: "1011 lb-ft",
    zeroToSixty: "2.8s",
    topSpeed: "277 mph",
    price: "$2,500,000",
    year: 2023,
    accentColor: "#B8B8B8",
    image: "https://img.youtube.com/vi/KD82XB7t8Xo/maxresdefault.jpg",
    description: "The Koenigsegg Agera RS shattered the world production car speed record at 277.87 mph. Swedish hypercar engineering at its most extreme and obsessive.",
    videoId: "KD82XB7t8Xo",
  },
];

// Gallery uses a mix of YouTube thumbnails (real cars) + quality Unsplash shots
export const galleryImages = [
  "https://img.youtube.com/vi/MvVXL-vBQs0/maxresdefault.jpg",
  "https://img.youtube.com/vi/YqlAVAM9XgE/maxresdefault.jpg",
  "https://img.youtube.com/vi/qONckKNrkT8/maxresdefault.jpg",
  "https://img.youtube.com/vi/JTtN6RGFU2o/maxresdefault.jpg",
  "https://img.youtube.com/vi/KdLMA9nJStg/maxresdefault.jpg",
  "https://img.youtube.com/vi/KD82XB7t8Xo/maxresdefault.jpg",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format",
];
