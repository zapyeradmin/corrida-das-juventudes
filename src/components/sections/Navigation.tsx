import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out py-2 ${
        isScrolled ? 'bg-white shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <a href="#" className={`text-2xl font-bold font-poppins ${
              isScrolled ? 'text-blue-700' : 'text-white'
            }`}>
              JUVENTUDES<span className="text-yellow-400">RUN</span>
            </a>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#sobre" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Sobre</a>
              <a href="#premiacao" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Premiação</a>
              <a href="#cronograma" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Cronograma</a>
              <a href="#percurso" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Percurso</a>
              <a href="#parceiros" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Parceiros</a>
              <a href="#contato" className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
              }`}>Contato</a>
              <a href="#inscricoes" className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold py-2 px-5 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:brightness-110 transform hover:-translate-y-1">
                Inscreva-se
              </a>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none ${
                  isScrolled ? 'text-gray-700' : 'text-gray-200'
                }`}
              >
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </nav>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full">
            <a href="#sobre" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a>
            <a href="#premiacao" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Premiação</a>
            <a href="#cronograma" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Cronograma</a>
            <a href="#percurso" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Percurso</a>
            <a href="#parceiros" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Parceiros</a>
            <a href="#contato" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Contato</a>
            <a href="#inscricoes" className="block py-3 px-6 bg-yellow-500 text-gray-900 text-center font-semibold hover:bg-yellow-600" onClick={() => setIsMobileMenuOpen(false)}>Inscreva-se</a>
          </div>
        )}
      </header>
    </>
  );
};