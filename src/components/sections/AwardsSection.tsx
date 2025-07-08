import { Award, Trophy } from "lucide-react";
import trophiesMedals from "@/assets/trophies-medals.jpg";

export const AwardsSection = () => {
  return (
    <section id="premiacao" className="py-20 lg:py-32 bg-foreground text-background aurora-bg">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div data-aos="fade-right">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Reconhecendo <br />
            <span className="text-primary">seu Esforço.</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Sua dedicação merece ser celebrada! Teremos premiações para as categorias Geral e Expressão Juvenil (Masculino e Feminino).
          </p>
          <ul className="mt-6 space-y-3 text-lg">
            <li className="flex items-center">
              <Award className="w-6 h-6 mr-3 text-warning" />
              <strong>1º Lugar:</strong> Troféu + R$ 300,00
            </li>
            <li className="flex items-center">
              <Award className="w-6 h-6 mr-3 text-muted" />
              <strong>2º Lugar:</strong> Troféu + R$ 200,00
            </li>
            <li className="flex items-center">
              <Award className="w-6 h-6 mr-3 text-primary" />
              <strong>3º Lugar:</strong> Troféu + R$ 100,00
            </li>
            <li className="flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-muted" />
              <strong>4º e 5º Lugar:</strong> Troféu
            </li>
          </ul>
          <p className="mt-8 text-secondary font-semibold text-xl">
            E medalha de participação para todos que cruzarem a linha de chegada!
          </p>
        </div>
        <div data-aos="fade-left" data-aos-delay="200">
          <img src={trophiesMedals} alt="Imagem de Troféus e Medalhas" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};