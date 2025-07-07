-- Criar tabela para inscrições da Corrida das Juventudes
CREATE TABLE public.inscricoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  sexo TEXT NOT NULL CHECK (sexo IN ('Masculino', 'Feminino')),
  categoria TEXT NOT NULL CHECK (categoria IN ('Geral Masculino', 'Geral Feminino', 'Expressão Juvenil Masculino', 'Expressão Juvenil Feminino')),
  status_pagamento TEXT NOT NULL DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago', 'cancelado'))
);

-- Habilitar RLS
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (inscrições abertas)
CREATE POLICY "Permitir inscrições públicas" 
ON public.inscricoes 
FOR INSERT 
WITH CHECK (true);

-- Política para visualização apenas de administradores (por enquanto ninguém pode ver)
CREATE POLICY "Apenas administradores podem visualizar" 
ON public.inscricoes 
FOR SELECT 
USING (false);

-- Índices para melhor performance
CREATE INDEX idx_inscricoes_email ON public.inscricoes(email);
CREATE INDEX idx_inscricoes_cpf ON public.inscricoes(cpf);
CREATE INDEX idx_inscricoes_created_at ON public.inscricoes(created_at);

-- Trigger para atualizar updated_at (caso queira adicionar depois)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;