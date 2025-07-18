export const ScheduleSection = () => {
  return <section id="cronograma" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-4">
          Cronograma do <span className="gradient-text">Grande Dia</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Programe-se para não perder nenhum momento deste dia especial. A largada será às 6h da manhã!
        </p>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-md mx-auto relative pl-8">
            <div className="timeline-line"></div>
            <div className="space-y-12">
              <div className="relative timeline-item">
                <div className="custom-card p-6 ml-4">
                  <h3 className="font-bold text-xl text-blue-600">5h00 - Concentração</h3>
                  <p className="text-gray-600">Local: Praça da Catedral. Chegue cedo para se preparar!</p>
                </div>
              </div>
              <div className="relative timeline-item">
                <div className="custom-card p-6 ml-4">
                  <h3 className="font-bold text-xl text-blue-600">5h30 - Aquecimento</h3>
                  <p className="text-gray-600">Vamos aquecer juntos com muita energia e música.</p>
                </div>
              </div>
              <div className="relative timeline-item">
                <div className="custom-card p-6 ml-4 border-l-4 border-yellow-500">
                  <h3 className="font-bold text-xl text-yellow-600">6h00 - Largada!</h3>
                  <p className="text-gray-600">Início da corrida de 5km. Boa prova a todos!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-700 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Informações da Inscrição</h3>
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600">Valor da Inscrição</p>
              <p className="text-5xl font-bold text-blue-600">R$ 55,00</p>
            </div>
            <p className="mb-6 text-lg leading-relaxed">
              O valor da inscrição garante sua participação e todos os benefícios oferecidos pelo evento.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Número de Peito</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Café da manhã e Hidratação durante o percurso</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Medalha de Participação</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Direito a concorrer às premiações</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};