import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-muted aurora-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-foreground">Perguntas Frequentes</h2>
          <p className="text-lg text-muted-foreground mt-2">Tirando todas as suas dúvidas.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          <AccordionItem value="item-1" className="bg-card p-6 rounded-lg border border-border">
            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
              O que está incluso na minha inscrição de R$55,00?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Sua inscrição garante o kit atleta com número de peito, acesso aos postos de hidratação durante todo o percurso, 
              uma linda medalha de participação ao concluir a prova e, claro, a chance de concorrer às premiações em dinheiro 
              e troféus da sua categoria.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-card p-6 rounded-lg border border-border">
            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
              Qual a idade mínima para participar?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              A idade mínima para participação na corrida de 5 km é de 14 anos completos até a data do evento. 
              Menores de 18 anos precisam de autorização dos pais ou responsáveis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-card p-6 rounded-lg border border-border">
            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
              Haverá guarda-volumes no local?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Sim, ofereceremos um serviço de guarda-volumes gratuito para os atletas inscritos. 
              Recomendamos que não deixe objetos de valor, pois a organização não se responsabiliza por perdas ou extravios.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-card p-6 rounded-lg border border-border">
            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
              Como funciona a categoria "Expressão Juvenil"?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Esta categoria é exclusiva para participantes que fazem parte de qualquer expressão, grupo, pastoral ou movimento 
              juvenil da Igreja Católica, de qualquer diocese. Ao se inscrever, basta selecionar a opção "Expressão Juvenil" 
              (Masculino ou Feminino) para competir nesta categoria.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};