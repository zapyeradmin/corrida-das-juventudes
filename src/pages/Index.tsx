import { useEffect } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  useEffect(() => {
    // Inicializar AOS quando o componente montar
    const initAOS = async () => {
      const AOS = await import('aos');
      await import('aos/dist/aos.css');
      AOS.default.init({
        duration: 800,
        once: true
      });
    };
    initAOS();
  }, []);

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <HeroSection />
      <main>
        <AboutSection />
        <DetailsSection />
        <AwardsSection />
        <RegistrationSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;