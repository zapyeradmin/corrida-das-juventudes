-- Create the 3 super admin users
-- Note: In production, these should be created through the auth.users table properly
-- For now, we'll create profiles and assume the users will be created via Supabase Auth UI

-- Insert admin profiles (the actual auth users need to be created via Supabase Dashboard)
INSERT INTO public.profiles (user_id, email, role) VALUES
  -- These UUIDs will need to match the actual user IDs created in Supabase Auth
  -- For now, we'll create placeholder profiles that can be updated later
  (gen_random_uuid(), 'admin1@corridajuventudes.com', 'admin'),
  (gen_random_uuid(), 'admin2@corridajuventudes.com', 'admin'),
  (gen_random_uuid(), 'admin3@corridajuventudes.com', 'admin')
ON CONFLICT (user_id) DO NOTHING;

-- Update the inscricoes table to ensure it has the forma_pagamento column
-- This column might be missing from the original migration
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inscricoes' 
        AND column_name = 'forma_pagamento'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inscricoes 
        ADD COLUMN forma_pagamento TEXT;
    END IF;
END $$;

-- Update status_pagamento values to match dashboard expectations
UPDATE public.inscricoes 
SET status_pagamento = 'Pendente' 
WHERE status_pagamento = 'pendente';

-- Ensure we have some test data with different payment methods
-- Only update if forma_pagamento is null
UPDATE public.inscricoes 
SET forma_pagamento = CASE 
    WHEN id = (SELECT id FROM public.inscricoes ORDER BY created_at ASC LIMIT 1) THEN 'PIX'
    ELSE 'Cartão'
END
WHERE forma_pagamento IS NULL;