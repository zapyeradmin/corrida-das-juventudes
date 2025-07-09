export const Footer = () => {
  return (
    <footer id="contato" className="bg-slate-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 event-title-font">
              JUVENTUDES<span className="text-yellow-400">RUN</span>
            </h3>
            <p className="text-sm">1ª Corrida das Juventudes. Um evento do Setor Diocesano da Juventude.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Fale Conosco</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/5587999211865" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <i className="fab fa-whatsapp mr-2"></i>(87) 99921-1865 (Francileide)
                </a>
              </li>
              <li>
                <a href="mailto:setordiocesanodajuventude@gmail.com" className="hover:text-yellow-400 transition-colors">
                  <i className="fas fa-envelope mr-2"></i>setordiocesanodajuventude@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Acesso Administrativo</h4>
            <a href="/admin-login" className="text-sm hover:text-yellow-400 transition-colors">
              <i className="fas fa-user-shield mr-2"></i>Painel do Administrador
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; <span id="currentYear"></span> Corrida das Juventudes. Desenvolvido por Zapyer Tech Soluções Digitais.</p>
        </div>
      </div>
    </footer>
  );
};