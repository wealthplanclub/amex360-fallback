
-- Remove the is_employee column and simplify to just is_primary
ALTER TABLE public.account_configurations DROP COLUMN is_employee;

-- Update the index to only focus on is_primary
DROP INDEX IF EXISTS idx_account_configurations_primary;
CREATE INDEX idx_account_configurations_primary ON public.account_configurations(is_primary);
