import communityCelebration from "@/assets/community-celebration.jpg";

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-muted aurora-bg">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div data-aos="fade-right">
          <img src={communityCelebration} alt="Imagem de Jovens celebrando juntos" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
        </div>
        <div data-aos="fade-left" data-aos-delay="200">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Mais que uma corrida, <br />
            <span className="text-secondary">uma celebração.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A Corrida das Juventudes é um ato de celebração da vida, da saúde e da força que vem da fé. 
            Queremos caminhar e correr ao lado de todos que carregam no peito o desejo de viver com propósito.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Nascemos como um espaço de comunhão e protagonismo, onde fé e movimento se encontram para gerar vida. 
            Correr também é evangelizar, e aqui, todos são bem-vindos a testemunhar uma juventude que pulsa em cada coração.
          </p>
        </div>
      </div>
    </section>
  );
};