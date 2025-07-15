import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
export const RegistrationSection = () => {
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
    categoria: "Geral Masculino",
    forma_pagamento: ""
  });
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
          description: "Redirecionando para o pagamento...",
          variant: "default"
        });
        setFormData({
          nome_completo: "",
          email: "",
          data_nascimento: "",
          cpf: "",
          sexo: "Masculino",
          categoria: "Geral Masculino",
          forma_pagamento: ""
        });
        
        // Abrir nova aba com o link do Mercado Pago
        window.open('https://mpago.la/1WyqTty', '_blank');
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
  return <section id="inscricoes" className="pt-12 md:pt-16 pb-16 md:pb-20 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-4">
          Inscreva-se e <span className="text-yellow-400">Participe!</span>
        </h2>
        <p className="text-center text-blue-100 mb-10 max-w-xl mx-auto my-[18px] px-0">Garanta já sua vaga na Corrida das Juventudes! As vagas são limitadas — não deixe para depois! Preencha o formulário abaixo e clique em Confirmar Inscrição para ser redirecionado ao pagamento via Mercado Pago. Em casos de dúvidas fale com a gente no WhatsApp: (87) 99921-1865.</p>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-gray-800 custom-card">
          <div className="mb-5">
            <Label htmlFor="nome" className="block text-sm font-semibold mb-1 text-gray-700">
              Nome Completo <span className="text-red-500">*</span>
            </Label>
            <Input id="nome" value={formData.nome_completo} onChange={e => handleInputChange('nome_completo', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow" required />
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div>
              <Label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input type="email" id="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow" placeholder="seuemail@dominio.com" required />
            </div>
            <div>
              <Label htmlFor="nascimento" className="block text-sm font-semibold mb-1 text-gray-700">
                Data de Nascimento <span className="text-red-500">*</span>
              </Label>
              <Input type="date" id="nascimento" value={formData.data_nascimento} onChange={e => handleInputChange('data_nascimento', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div>
              <Label htmlFor="cpf" className="block text-sm font-semibold mb-1 text-gray-700">
                CPF <span className="text-red-500">*</span>
              </Label>
              <Input id="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={e => handleInputChange('cpf', e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow" required />
            </div>
            <div>
              <Label htmlFor="sexo" className="block text-sm font-semibold mb-1 text-gray-700">
                Sexo <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.sexo} onValueChange={value => handleInputChange('sexo', value)}>
                <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-5">
            <Label htmlFor="categoria" className="block text-sm font-semibold mb-1 text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.categoria} onValueChange={value => handleInputChange('categoria', value)}>
              <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow bg-white">
                <SelectValue placeholder="Selecione sua categoria..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geral Masculino">Geral Masculino</SelectItem>
                <SelectItem value="Geral Feminino">Geral Feminino</SelectItem>
                <SelectItem value="Expressão Juvenil Masculino">Expressão Juvenil Masculino</SelectItem>
                <SelectItem value="Expressão Juvenil Feminino">Expressão Juvenil Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <Label htmlFor="forma_pagamento" className="block text-sm font-semibold mb-1 text-gray-700">
              Forma de Pagamento <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.forma_pagamento || ''} onValueChange={value => handleInputChange('forma_pagamento', value)}>
              <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow bg-white">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PIX">PIX</SelectItem>
                <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center">
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold py-3.5 px-12 rounded-lg text-lg cta-button w-full sm:w-auto shadow-xl transition-all duration-300 hover:shadow-2xl hover:brightness-110">
              {isSubmitting ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div> : <>
                  <i className="fas fa-check-circle mr-2"></i> Confirmar Inscrição
                </>}
            </Button>
          </div>
        </form>
      </div>
    </section>;
};