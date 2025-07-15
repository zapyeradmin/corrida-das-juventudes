import { useState, useEffect } from "react";
export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const updateHeaderStyle = () => {
      const header = document.getElementById('mainHeader');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');
      if (window.scrollY > 50) {
        header?.classList.add('header-scrolled');
        mobileMenuButton?.classList.remove('text-gray-200');
        mobileMenuButton?.classList.add('text-gray-700');
      } else {
        header?.classList.remove('header-scrolled');
        mobileMenuButton?.classList.remove('text-gray-700');
        mobileMenuButton?.classList.add('text-gray-200');
      }
    };
    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle();
    return () => window.removeEventListener('scroll', updateHeaderStyle);
  }, []);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const header = document.getElementById('mainHeader');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (!isMobileMenuOpen) {
      header?.classList.add('header-scrolled');
      mobileMenuButton?.classList.remove('text-gray-200');
      mobileMenuButton?.classList.add('text-gray-700');
    } else {
      const updateHeaderStyle = () => {
        if (window.scrollY > 50) {
          header?.classList.add('header-scrolled');
          mobileMenuButton?.classList.remove('text-gray-200');
          mobileMenuButton?.classList.add('text-gray-700');
        } else {
          header?.classList.remove('header-scrolled');
          mobileMenuButton?.classList.remove('text-gray-700');
          mobileMenuButton?.classList.add('text-gray-200');
        }
      };
      updateHeaderStyle();
    }
  };
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    const header = document.getElementById('mainHeader');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const updateHeaderStyle = () => {
      if (window.scrollY > 50) {
        header?.classList.add('header-scrolled');
        mobileMenuButton?.classList.remove('text-gray-200');
        mobileMenuButton?.classList.add('text-gray-700');
      } else {
        header?.classList.remove('header-scrolled');
        mobileMenuButton?.classList.remove('text-gray-700');
        mobileMenuButton?.classList.add('text-gray-200');
      }
    };
    updateHeaderStyle();
  };
  return <>
      <header id="mainHeader" className="fixed w-full z-50 transition-all duration-300 ease-in-out py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold event-title-font brand-logo text-blue-600 ">
              CORRIDA DAS JUVENTUDES
            </a>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#sobre" className="nav-link text-gray-200 hover:text-white font-medium">Sobre</a>
              <a href="#premiacao" className="nav-link text-gray-200 hover:text-white font-medium">Premiação</a>
              <a href="#cronograma" className="nav-link text-gray-200 hover:text-white font-medium">Cronograma</a>
              <a href="#percurso" className="nav-link text-gray-200 hover:text-white font-medium">Percurso</a>
              <a href="#parceiros" className="nav-link text-gray-200 hover:text-white font-medium">Parceiros</a>
              <a href="#contato" className="nav-link text-gray-200 hover:text-white font-medium">Contato</a>
              <a href="#inscricoes" className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold py-2 px-5 rounded-lg cta-button text-sm transition-all duration-300 hover:shadow-lg hover:brightness-110">
                Inscreva-se
              </a>
            </div>
            
          </nav>
        </div>
        <div id="mobileMenu" className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-white shadow-lg absolute w-full`}>
          <a href="#sobre" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Sobre</a>
          <a href="#premiacao" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Premiação</a>
          <a href="#cronograma" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Cronograma</a>
          <a href="#percurso" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Percurso</a>
          <a href="#parceiros" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Parceiros</a>
          <a href="#contato" className="block py-3 px-6 text-gray-700 hover:bg-gray-100" onClick={handleMobileMenuClose}>Contato</a>
          <a href="#inscricoes" className="block py-3 px-6 bg-yellow-500 text-gray-900 text-center font-semibold hover:bg-yellow-600" onClick={handleMobileMenuClose}>Inscreva-se</a>
        </div>
      </header>
    </>;
};