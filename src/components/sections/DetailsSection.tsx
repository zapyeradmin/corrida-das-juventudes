import { CalendarDays, MapPin, Clock, Footprints } from "lucide-react";

export const DetailsSection = () => {
  return (
    <section id="detalhes" className="py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-foreground">Informações Essenciais</h2>
          <p className="text-lg text-muted-foreground mt-2">Prepare-se para o grande dia!</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="0">
            <CalendarDays className="w-12 h-12 mx-auto text-secondary" />
            <h3 className="font-bold text-2xl mt-4">Data</h3>
            <p className="text-muted-foreground text-lg">30/08/2025</p>
          </div>
          <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="100">
            <MapPin className="w-12 h-12 mx-auto text-success" />
            <h3 className="font-bold text-2xl mt-4">Local</h3>
            <p className="text-muted-foreground text-lg">Afogados da Ingazeira</p>
          </div>
          <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="200">
            <Clock className="w-12 h-12 mx-auto text-warning" />
            <h3 className="font-bold text-2xl mt-4">Horários</h3>
            <p className="text-muted-foreground text-lg">Concentração 5h, Largada 6h</p>
          </div>
          <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="300">
            <Footprints className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-bold text-2xl mt-4">Percurso</h3>
            <p className="text-muted-foreground text-lg">5 km de superação</p>
          </div>
        </div>
      </div>
    </section>
  );
};