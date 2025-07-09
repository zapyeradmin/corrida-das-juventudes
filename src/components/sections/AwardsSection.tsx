export const AwardsSection = () => {
  return (
    <section id="premiacao" className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-4">
          Categorias e <span className="gradient-text">Premiação</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Confira as categorias e as premiações para os melhores colocados. Todos os participantes recebem medalha!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Categoria Geral Masculino */}
          <div className="custom-card p-6 flex flex-col items-center text-center">
            <i className="fas fa-male text-5xl text-blue-500 mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Geral Masculino</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li><i className="fas fa-trophy text-yellow-500 w-5 text-center mr-2"></i> <strong>1º:</strong> Troféu + R$ 300,00</li>
              <li><i className="fas fa-trophy text-gray-400 w-5 text-center mr-2"></i> <strong>2º:</strong> Troféu + R$ 200,00</li>
              <li><i className="fas fa-trophy text-amber-600 w-5 text-center mr-2"></i> <strong>3º:</strong> Troféu + R$ 100,00</li>
              <li><i className="fas fa-award text-blue-400 w-5 text-center mr-2"></i> <strong>4º:</strong> Troféu</li>
              <li><i className="fas fa-award text-blue-400 w-5 text-center mr-2"></i> <strong>5º:</strong> Troféu</li>
            </ul>
          </div>
          {/* Categoria Geral Feminina */}
          <div className="custom-card p-6 flex flex-col items-center text-center">
            <i className="fas fa-female text-5xl text-pink-500 mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Geral Feminina</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li><i className="fas fa-trophy text-yellow-500 w-5 text-center mr-2"></i> <strong>1º:</strong> Troféu + R$ 300,00</li>
              <li><i className="fas fa-trophy text-gray-400 w-5 text-center mr-2"></i> <strong>2º:</strong> Troféu + R$ 200,00</li>
              <li><i className="fas fa-trophy text-amber-600 w-5 text-center mr-2"></i> <strong>3º:</strong> Troféu + R$ 100,00</li>
              <li><i className="fas fa-award text-pink-400 w-5 text-center mr-2"></i> <strong>4º:</strong> Troféu</li>
              <li><i className="fas fa-award text-pink-400 w-5 text-center mr-2"></i> <strong>5º:</strong> Troféu</li>
            </ul>
          </div>
          {/* Categoria Expressão Juvenil Masculina */}
          <div className="custom-card p-6 flex flex-col items-center text-center">
            <i className="fas fa-church text-5xl text-blue-500 mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Exp. Juvenil Masculina</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li><i className="fas fa-trophy text-yellow-500 w-5 text-center mr-2"></i> <strong>1º:</strong> Troféu + R$ 300,00</li>
              <li><i className="fas fa-trophy text-gray-400 w-5 text-center mr-2"></i> <strong>2º:</strong> Troféu + R$ 200,00</li>
              <li><i className="fas fa-trophy text-amber-600 w-5 text-center mr-2"></i> <strong>3º:</strong> Troféu + R$ 100,00</li>
              <li><i className="fas fa-award text-blue-400 w-5 text-center mr-2"></i> <strong>4º:</strong> Troféu</li>
              <li><i className="fas fa-award text-blue-400 w-5 text-center mr-2"></i> <strong>5º:</strong> Troféu</li>
            </ul>
          </div>
          {/* Categoria Expressão Juvenil Feminina */}
          <div className="custom-card p-6 flex flex-col items-center text-center">
            <i className="fas fa-church text-5xl text-pink-500 mb-4"></i>
            <h3 className="text-xl font-bold mb-3">Exp. Juvenil Feminina</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li><i className="fas fa-trophy text-yellow-500 w-5 text-center mr-2"></i> <strong>1º:</strong> Troféu + R$ 300,00</li>
              <li><i className="fas fa-trophy text-gray-400 w-5 text-center mr-2"></i> <strong>2º:</strong> Troféu + R$ 200,00</li>
              <li><i className="fas fa-trophy text-amber-600 w-5 text-center mr-2"></i> <strong>3º:</strong> Troféu + R$ 100,00</li>
              <li><i className="fas fa-award text-pink-400 w-5 text-center mr-2"></i> <strong>4º:</strong> Troféu</li>
              <li><i className="fas fa-award text-pink-400 w-5 text-center mr-2"></i> <strong>5º:</strong> Troféu</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto text-sm">
          A categoria "Expressão Juvenil" é voltada exclusivamente para participantes que fazem parte de expressões juvenis da Igreja Católica de qualquer Diocese.
        </p>
      </div>
    </section>
  );
};