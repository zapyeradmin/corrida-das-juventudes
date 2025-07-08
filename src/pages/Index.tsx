import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarDays, MapPin, Clock, Footprints, MessageCircle, Mail, Award, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroRunners from "@/assets/hero-runners.jpg";
import communityCelebration from "@/assets/community-celebration.jpg";
import trophiesMedals from "@/assets/trophies-medals.jpg";
const Index = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    data_nascimento: "",
    cpf: "",
    sexo: "Masculino",
    categoria: "Geral Masculino"
  });
  useEffect(() => {
    // Inicializar AOS quando o componente montar
    const initAOS = async () => {
      const AOS = await import('aos');
      await import('aos/dist/aos.css');
      AOS.default.init({
        duration: 800,
        once: true
      });
    };
    initAOS();

    // Inicializar contador regressivo
    const initFlipDown = async () => {
      const FlipDown = (await import('flipdown')).default;
      await import('flipdown/dist/flipdown.css');

      // Data do evento: 30 de Agosto de 2025, 06:00 (horário de São Paulo)
      const eventDate = new Date(2025, 7, 30, 6, 0, 0).getTime() / 1000;
      new FlipDown(eventDate, 'countdown').start();
    };
    initFlipDown();
  }, []);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar CPF
    if (!validateCPF(formData.cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, verifique o CPF informado.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    const registrationData = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      status_pagamento: 'pendente'
    };
    try {
      const {
        data,
        error
      } = await supabase.from('inscricoes').insert([registrationData]).select();
      if (error) {
        console.error('Erro do Supabase:', error);
        let errorMessage = 'Ocorreu um erro ao realizar a inscrição. Tente novamente.';
        if (error.code === '23505') {
          errorMessage = 'Este CPF ou E-mail já foi cadastrado.';
        }
        toast({
          title: "Erro na inscrição",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        console.log('Inscrição realizada:', data);
        toast({
          title: "Inscrição realizada!",
          description: "Confira seu e-mail para os próximos passos.",
          variant: "default"
        });
        setFormData({
          nome_completo: "",
          email: "",
          data_nascimento: "",
          cpf: "",
          sexo: "Masculino",
          categoria: "Geral Masculino"
        });
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Verifique sua internet.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-background font-inter">
      {/* NAVEGAÇÃO */}
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

      {/* SEÇÃO PRINCIPAL (HERO) */}
      <header className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-white bg-cover bg-center bg-fixed" style={{
      backgroundImage: `url(${heroRunners})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-t from-green/70 via-green/20 to-green/70 z-0"></div>
        <div className="relative z-10 text-center px-6" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mt-2 uppercase hero-title">
            CORRIDA DAS JUVENTUDES
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
            A corrida que une fé, movimento e a força que atravessa gerações.
          </p>
        </div>
        <div className="relative z-10 mt-12 w-full max-w-3xl px-6" data-aos="fade-up" data-aos-delay="200">
          <div id="countdown" className="flipdown mx-auto"></div>
        </div>
      </header>

      <main>
        {/* SEÇÃO SOBRE O EVENTO */}
        <section id="sobre" className="py-20 lg:py-32 bg-muted aurora-bg">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div data-aos="fade-right">
              <img src={communityCelebration} alt="Imagem de Jovens celebrando juntos" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
            </div>
            <div data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Mais que uma corrida, <br />
                <span className="text-secondary">uma celebração.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A Corrida das Juventudes é um ato de celebração da vida, da saúde e da força que vem da fé. 
                Queremos caminhar e correr ao lado de todos que carregam no peito o desejo de viver com propósito.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Nascemos como um espaço de comunhão e protagonismo, onde fé e movimento se encontram para gerar vida. 
                Correr também é evangelizar, e aqui, todos são bem-vindos a testemunhar uma juventude que pulsa em cada coração.
              </p>
            </div>
          </div>
        </section>

        {/* DETALHES */}
        <section id="detalhes" className="py-20 lg:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl font-bold text-foreground">Informações Essenciais</h2>
              <p className="text-lg text-muted-foreground mt-2">Prepare-se para o grande dia!</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="0">
                <CalendarDays className="w-12 h-12 mx-auto text-secondary" />
                <h3 className="font-bold text-2xl mt-4">Data</h3>
                <p className="text-muted-foreground text-lg">31/08/2025</p>
              </div>
              <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="100">
                <MapPin className="w-12 h-12 mx-auto text-success" />
                <h3 className="font-bold text-2xl mt-4">Local</h3>
                <p className="text-muted-foreground text-lg">Afogados da Ingazeira</p>
              </div>
              <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="200">
                <Clock className="w-12 h-12 mx-auto text-warning" />
                <h3 className="font-bold text-2xl mt-4">Horários</h3>
                <p className="text-muted-foreground text-lg">Concentração 5h, Largada 6h</p>
              </div>
              <div className="border border-border p-8 rounded-2xl text-center card-hover" data-aos="fade-up" data-aos-delay="300">
                <Footprints className="w-12 h-12 mx-auto text-primary" />
                <h3 className="font-bold text-2xl mt-4">Percurso</h3>
                <p className="text-muted-foreground text-lg">5 km de superação</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREMIAÇÃO */}
        <section id="premiacao" className="py-20 lg:py-32 bg-foreground text-background aurora-bg">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Reconhecendo <br />
                <span className="text-primary">seu Esforço.</span>
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Sua dedicação merece ser celebrada! Teremos premiações para as categorias Geral e Expressão Juvenil (Masculino e Feminino).
              </p>
              <ul className="mt-6 space-y-3 text-lg">
                <li className="flex items-center">
                  <Award className="w-6 h-6 mr-3 text-warning" />
                  <strong>1º Lugar:</strong> Troféu + R$ 300,00
                </li>
                <li className="flex items-center">
                  <Award className="w-6 h-6 mr-3 text-muted" />
                  <strong>2º Lugar:</strong> Troféu + R$ 200,00
                </li>
                <li className="flex items-center">
                  <Award className="w-6 h-6 mr-3 text-primary" />
                  <strong>3º Lugar:</strong> Troféu + R$ 100,00
                </li>
                <li className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-muted" />
                  <strong>4º e 5º Lugar:</strong> Troféu
                </li>
              </ul>
              <p className="mt-8 text-secondary font-semibold text-xl">
                E medalha de participação para todos que cruzarem a linha de chegada!
              </p>
            </div>
            <div data-aos="fade-left" data-aos-delay="200">
              <img src={trophiesMedals} alt="Imagem de Troféus e Medalhas" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* INSCRIÇÃO */}
        <section id="inscricao" className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="bg-card p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl border border-border">
              <div className="grid lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-2" data-aos="fade-right">
                  <h2 className="text-4xl font-bold text-foreground">Garanta sua Vaga</h2>
                  <p className="text-7xl font-black text-primary mt-2">R$55</p>
                  <p className="text-muted-foreground mt-4 text-lg">
                    Sua inscrição inclui o kit atleta com número de peito, hidratação, medalha e a chance de ser premiado!
                  </p>
                </div>

                {/* FORMULÁRIO */}
                <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3" data-aos="fade-left">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" value={formData.nome_completo} onChange={e => handleInputChange('nome_completo', e.target.value)} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input type="email" id="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="mt-1" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nascimento">Data de Nascimento</Label>
                      <Input type="date" id="nascimento" value={formData.data_nascimento} onChange={e => handleInputChange('data_nascimento', e.target.value)} className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={e => handleInputChange('cpf', e.target.value)} className="mt-1" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sexo">Sexo</Label>
                      <Select value={formData.sexo} onValueChange={value => handleInputChange('sexo', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select value={formData.categoria} onValueChange={value => handleInputChange('categoria', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Geral Masculino">Geral Masculino</SelectItem>
                          <SelectItem value="Geral Feminino">Geral Feminino</SelectItem>
                          <SelectItem value="Expressão Juvenil Masculino">Expressão Juvenil Masculino</SelectItem>
                          <SelectItem value="Expressão Juvenil Feminino">Expressão Juvenil Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full btn-secondary py-4 text-xl font-bold">
                      {isSubmitting ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div> : "CONCLUIR MINHA INSCRIÇÃO"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEÇÃO FAQ */}
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
      </main>
      
      {/* FOOTER */}
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
    </div>;
};
export default Index;