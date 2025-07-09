import { Countdown } from "@/components/Countdown";
import heroRunners from "@/assets/hero-runners.jpg";

export const HeroSection = () => {
  // Data do evento: 30 de Agosto de 2025, 06:00 (horário de São Paulo)
  const eventDate = new Date(2025, 7, 30, 6, 0, 0);

  return (
    <section className="relative bg-cover bg-center min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url(${heroRunners})`
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/20 to-slate-900/85 z-0"></div>
      <div className="relative z-10 text-center text-white p-4 md:p-8" data-aos="fade-up">
        <div className="mb-6">
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wider">
            30 de Agosto de 2025
          </span>
          <span className="mx-2 text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-200 text-sm font-medium block sm:inline mt-2 sm:mt-0">
            <i className="fas fa-map-marker-alt mr-1"></i> Afogados da Ingazeira - PE
          </span>
        </div>
        <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          I CORRIDA DAS JUVENTUDES
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
          Fé e movimento se encontram para gerar vida. Uma celebração da vida, da saúde e da força que vem da juventude.
        </p>
        <a href="#inscricoes" className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:brightness-110 transform hover:-translate-y-1">
          <i className="fas fa-running mr-2"></i> Inscreva-se Agora!
        </a>
      </div>
      <div className="relative z-10 mt-12 w-full max-w-6xl px-6" data-aos="fade-up" data-aos-delay="200">
        <Countdown targetDate={eventDate} />
      </div>
    </section>
  );
};