import { MessageCircle, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contato" className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">Corrida das Juventudes</h2>
        <p className="mt-2 text-muted max-w-xl mx-auto">
          Um evento do Setor Diocesano da Juventude de Afogados da Ingazeira.
        </p>
        <div className="mt-8 flex justify-center items-center space-x-6">
          <a href="https://wa.me/5587999211865" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors text-lg">
            <MessageCircle className="w-6 h-6 mr-2" />
            <span>WhatsApp</span>
          </a>
          <a href="mailto:setordiocesanodajuventude@gmail.com" className="flex items-center hover:text-primary transition-colors text-lg">
            <Mail className="w-6 h-6 mr-2" />
            <span>E-mail</span>
          </a>
        </div>
        <p className="mt-10 text-sm text-muted">
          &copy; 2024 Corrida das Juventudes. Desenvolvido com paixão.
        </p>
      </div>
    </footer>
  );
};