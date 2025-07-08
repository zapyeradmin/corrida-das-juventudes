export const Navigation = () => {
  return (
    <nav className="bg-background/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm transition-all duration-300 border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-black text-2xl text-foreground">
          Corrida<span className="text-primary">.Jovens</span>
        </a>
        <div className="hidden md:flex space-x-8 items-center font-medium text-muted-foreground">
          <a href="#sobre" className="hover:text-primary transition-colors">O Evento</a>
          <a href="#detalhes" className="hover:text-primary transition-colors">Detalhes</a>
          <a href="#premiacao" className="hover:text-primary transition-colors">Premiação</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </div>
        <a href="#inscricao" className="hidden md:inline-block btn-primary px-6 py-2 rounded-full font-bold">
          Inscreva-se
        </a>
        <div className="md:hidden">
          <a href="#inscricao" className="btn-primary px-4 py-2 rounded-full font-bold text-sm">Inscrição</a>
        </div>
      </div>
    </nav>
  );
};