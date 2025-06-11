
-- Create a table to manually configure which accounts should be primary
CREATE TABLE public.account_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_type TEXT NOT NULL,
  last_five VARCHAR(10) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_employee BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique combinations of account_type and last_five
  UNIQUE(account_type, last_five)
);

-- Add indexes for better query performance
CREATE INDEX idx_account_configurations_type_five ON public.account_configurations(account_type, last_five);
CREATE INDEX idx_account_configurations_primary ON public.account_configurations(is_primary);

-- Insert some example configurations based on the current business rules
-- These can be modified or deleted as needed
INSERT INTO public.account_configurations (account_type, last_five, is_primary, is_employee, notes)
SELECT DISTINCT 
  account_type,
  last_five,
  CASE 
    WHEN LOWER(account_type) LIKE '%platinum%' OR 
         LOWER(account_type) LIKE '%gold%' OR 
         LOWER(account_type) LIKE '%business%' THEN true
    ELSE false
  END as is_primary,
  CASE 
    WHEN LOWER(account_type) LIKE '%green%' OR 
         LOWER(account_type) LIKE '%everyday%' OR 
         LOWER(account_type) LIKE '%basic%' THEN true
    ELSE false
  END as is_employee,
  'Auto-generated from existing data'
FROM public.master_transactions
ORDER BY account_type, last_five;
