-- Primeiro, vamos garantir que temos o trigger para criar perfis automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, role)
  VALUES (NEW.id, NEW.email, 'admin')
  ON CONFLICT (user_id) DO UPDATE SET
    email = NEW.email,
    role = 'admin';
  RETURN NEW;
END;
$$;

-- Criar trigger se não existir
DROP TRIGGER IF EXISTS on_admin_user_created ON auth.users;
CREATE TRIGGER on_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Atualizar a coluna forma_pagamento se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscricoes' 
        AND column_name = 'forma_pagamento'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inscricoes 
        ADD COLUMN forma_pagamento TEXT DEFAULT 'PIX';
    END IF;
END $$;

-- Garantir que temos dados de exemplo com diferentes métodos de pagamento
UPDATE public.inscricoes 
SET 
  forma_pagamento = CASE 
    WHEN MOD(EXTRACT(second FROM created_at)::integer, 2) = 0 THEN 'PIX'
    ELSE 'Cartão'
  END,
  status_pagamento = CASE 
    WHEN status_pagamento = 'pendente' THEN 'Pendente'
    WHEN status_pagamento = 'pago' THEN 'Aprovado'
    ELSE status_pagamento
  END
WHERE forma_pagamento IS NULL OR status_pagamento = 'pendente' OR status_pagamento = 'pago';