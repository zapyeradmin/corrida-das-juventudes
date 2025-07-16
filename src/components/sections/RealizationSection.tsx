// Usando as imagens do diretório public (posições invertidas conforme solicitado)
const logoSetor = "/lovable-uploads/42e47954-a6bf-433d-98be-ba1bee1bb198.png";
const brasaoDiocese = "/lovable-uploads/9d41fb2b-5b99-47af-94b5-9926ad5c1db2.png";
export const RealizationSection = () => {
  return <section className="py-16 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Realização e Apoio
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Realização */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-800">
                  Realização
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Setor Diocesano de Juventudes
                </p>
              </div>
              <div className="flex justify-center">
                <img src={logoSetor} alt="Logo Setor Diocesano de Juventudes" className="h-32 w-auto object-contain transition-transform hover:scale-105" />
              </div>
            </div>

            {/* Apoio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Apoio
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Diocese de Afogados da Ingazeira
                </p>
              </div>
              <div className="flex justify-center">
                <img src={brasaoDiocese} alt="Brasão Diocese de Afogados da Ingazeira" className="h-32 w-auto object-contain transition-transform hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};