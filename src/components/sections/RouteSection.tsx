export const RouteSection = () => {
  return <section id="percurso" className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-4">
          Percurso <span className="gradient-text">Desafiador</span> (5Km)
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Explore um trajeto que celebra a beleza de Afogados da Ingazeira, passando por pontos importantes da cidade.
        </p>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="custom-card overflow-hidden">
              <img alt="Mapa do Percurso da Corrida de 5km" className="w-full h-auto object-cover" src="/lovable-uploads/d5971929-ff78-4a73-85a0-cf16dc7cbdb7.jpg" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              Mapa ilustrativo. O trajeto exato será sinalizado no dia.
            </p>
          </div>
          <div className="order-1 lg:order-2 text-gray-700">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Explore a Cidade Correndo com Fé
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              O percurso de 5km foi pensado para todos os níveis de corredores, desde os iniciantes até os mais experientes, proporcionando uma experiência de superação e alegria.
            </p>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                <i className="fas fa-road text-3xl text-blue-500 mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-lg">Trajeto Principal</h4>
                  <p className="text-gray-600">Largada na Praça da Catedral, passando pela Av. Rio Branco, Anel Viário Antônio Valadares de Souza, Av. Helvécio Lima, retornando pelo Anel Viário Antônio Valadares de Souza, Avenida Rio Branco, R. Dom Góes chegando ao final do percurso.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                <i className="fas fa-map-signs text-3xl text-blue-500 mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-lg">Sinalização e Apoio</h4>
                  <p className="text-gray-600">
                    Percurso totalmente sinalizado com cones e staff dedicado para garantir sua segurança e orientação.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                <i className="fas fa-tint text-3xl text-blue-500 mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-lg">Pontos de Hidratação</h4>
                  <p className="text-gray-600">
                    Haverá pontos de hidratação com água nos quilômetros 2 e 4 do percurso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};