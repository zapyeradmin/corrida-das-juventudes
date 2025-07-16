import { useEffect } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { RouteSection } from "@/components/sections/RouteSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { RealizationSection } from "@/components/sections/RealizationSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  useEffect(() => {
    // Script para o ano atual no footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <div className="bg-gray-50 text-gray-700 antialiased">
      <Navigation />
      <HeroSection />
      <main>
        <AboutSection />
        <AwardsSection />
        <ScheduleSection />
        <RouteSection />
        <PartnersSection />
        <RegistrationSection />
        <FAQSection />
        <RealizationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;