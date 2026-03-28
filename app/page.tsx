// app/page.tsx  –  exemple d'assemblage
import { Navbar } from "@/components/layouts/Navbar";
import { HeroSection } from "@/components/sections/Hero";
import { Footer } from "@/components/layouts/Footer";
import Layouts from "@/components/layouts/Layout";

export default function HomePage() {
  return (
    <Layouts>
      <Navbar />
        <HeroSection />
      <Footer />
    </Layouts>
  );
}