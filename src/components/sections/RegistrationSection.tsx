import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const RegistrationSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    data_nascimento: "",
    cpf: "",
    sexo: "Masculino",
    categoria: "Geral Masculino"
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
      const { data, error } = await supabase
        .from('inscricoes')
        .insert([registrationData])
        .select();

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

  return (
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

            <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3" data-aos="fade-left">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input 
                  id="nome" 
                  value={formData.nome_completo} 
                  onChange={e => handleInputChange('nome_completo', e.target.value)} 
                  className="mt-1" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={e => handleInputChange('email', e.target.value)} 
                  className="mt-1" 
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nascimento">Data de Nascimento</Label>
                  <Input 
                    type="date" 
                    id="nascimento" 
                    value={formData.data_nascimento} 
                    onChange={e => handleInputChange('data_nascimento', e.target.value)} 
                    className="mt-1" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input 
                    id="cpf" 
                    placeholder="000.000.000-00" 
                    value={formData.cpf} 
                    onChange={e => handleInputChange('cpf', e.target.value)} 
                    className="mt-1" 
                    required 
                  />
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
                  {isSubmitting ? 
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div> : 
                    "CONCLUIR MINHA INSCRIÇÃO"
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};