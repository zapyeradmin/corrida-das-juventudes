export const AboutSection = () => {
  return <section id="sobre" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-4">
          Sobre o <span className="gradient-text">Evento</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Mais do que uma competição, esta corrida é um ato de celebração da vida, da saúde e da força que vem da fé.
        </p>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="custom-card overflow-hidden">
            <img alt="Imagem do Evento de Corrida" className="w-full h-auto object-cover" src="/lovable-uploads/fb3f7c4f-6b7a-4606-9c17-57ea2f9981bd.jpg" />
          </div>
          <div className="text-gray-700">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Comunhão, Protagonismo e Fé</h3>
            <p className="mb-4 text-lg leading-relaxed">
              A Corrida das Juventudes nasce como um espaço de comunhão e protagonismo, onde fé e movimento se encontram para gerar vida. Queremos reunir pessoas de todas as comunidades e paróquias, incentivando hábitos saudáveis, fortalecendo laços e mostrando que a juventude é um dom que atravessa gerações.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Independente da idade, queremos caminhar (ou correr) ao lado de todos que carregam no peito o desejo de viver com propósito, alegria e fé. Correr também é evangelizar e, nesta corrida, todos são bem-vindos!
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-users text-xl text-blue-500 mr-3 mt-1"></i>
                <span>Público em geral e jovens de expressões da Igreja Católica.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-road text-xl text-blue-500 mr-3 mt-1"></i>
                <span>Percurso de 5 km para todos os níveis.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-medal text-xl text-blue-500 mr-3 mt-1"></i>
                <span>Medalha de participação para todos os concluintes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};