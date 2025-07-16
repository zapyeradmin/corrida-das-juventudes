-- Adicionar colunas whatsapp e nome_expressao_juvenil na tabela inscricoes
ALTER TABLE public.inscricoes 
ADD COLUMN whatsapp text NOT NULL DEFAULT '',
ADD COLUMN nome_expressao_juvenil text;