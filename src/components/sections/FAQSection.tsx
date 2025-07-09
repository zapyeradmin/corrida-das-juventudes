import { useState } from "react";

export const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqItems = [
    {
      id: "item-1",
      question: "O que está incluso na minha inscrição de R$55,00?",
      answer: "Sua inscrição garante o kit atleta com número de peito, acesso aos postos de hidratação durante todo o percurso, uma linda medalha de participação ao concluir a prova e, claro, a chance de concorrer às premiações em dinheiro e troféus da sua categoria."
    },
    {
      id: "item-2", 
      question: "Qual a idade mínima para participar?",
      answer: "A idade mínima para participação na corrida de 5 km é de 14 anos completos até a data do evento. Menores de 18 anos precisam de autorização dos pais ou responsáveis."
    },
    {
      id: "item-3",
      question: "Como funciona a categoria \"Expressão Juvenil\"?",
      answer: "Esta categoria é exclusiva para participantes que fazem parte de qualquer expressão, grupo, pastoral ou movimento juvenil da Igreja Católica, de qualquer diocese. Ao se inscrever, basta selecionar a opção \"Expressão Juvenil\" (Masculina ou Feminina) para competir nesta categoria."
    },
    {
      id: "item-4",
      question: "Como posso tirar mais dúvidas?",
      answer: "Você pode retirar suas dúvidas através do WhatsApp (87) 99921-1865 (Francileide Leite) ou pode enviar um E-mail para setordiocesanodajuventude@gmail.com. Estaremos a disposição para retirar qualquer dúvida sobre a Corrida das Juventudes."
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Perguntas <span className="bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent">Frequentes</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Tire suas principais dúvidas sobre a Corrida das Juventudes.
        </p>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id}
              className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 ${
                openItem === item.id ? 'border-blue-500' : ''
              }`}
            >
              <button
                className={`flex justify-between items-center w-full p-5 text-left font-semibold text-gray-800 focus:outline-none hover:bg-gray-50 ${
                  openItem === item.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <span className="text-lg">{item.question}</span>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${
                  openItem === item.id ? 'rotate-180' : ''
                }`}></i>
              </button>
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openItem === item.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};