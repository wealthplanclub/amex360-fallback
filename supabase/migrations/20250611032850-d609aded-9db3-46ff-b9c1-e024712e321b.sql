
-- Update all existing configurations to be employee cards (unchecked) by default
UPDATE public.account_configurations SET is_primary = false;

-- Also update the default value for future inserts
ALTER TABLE public.account_configurations ALTER COLUMN is_primary SET DEFAULT false;
