import { Countdown } from "@/components/Countdown";
import heroRunners from "@/assets/hero-runners.jpg";

export const HeroSection = () => {
  // Data do evento: 30 de Agosto de 2025, 06:00 (horário de São Paulo)
  const eventDate = new Date(2025, 7, 30, 6, 0, 0);

  return (
    <header className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-white bg-cover bg-center bg-fixed" style={{
      backgroundImage: `url(${heroRunners})`
    }}>
      <div className="absolute inset-0 bg-gradient-to-t from-green/70 via-green/20 to-green/70 z-0"></div>
      <div className="relative z-10 text-center px-6" data-aos="fade-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mt-2 uppercase hero-title">
          CORRIDA DAS JUVENTUDES
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
          A corrida que une fé, movimento e a força que atravessa gerações.
        </p>
      </div>
      <div className="relative z-10 mt-12 w-full max-w-6xl px-6" data-aos="fade-up" data-aos-delay="200">
        <Countdown targetDate={eventDate} />
      </div>
    </header>
  );
};