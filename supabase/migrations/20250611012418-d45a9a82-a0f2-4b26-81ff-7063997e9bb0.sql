
-- Create the master_transactions table
CREATE TABLE public.master_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(user_id),
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  account_type TEXT NOT NULL,
  last_five VARCHAR(10) NOT NULL,
  category TEXT,
  point_multiple DECIMAL(4,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_master_transactions_user_id ON public.master_transactions(user_id);
CREATE INDEX idx_master_transactions_date ON public.master_transactions(date);
CREATE INDEX idx_master_transactions_account ON public.master_transactions(account_type, last_five);

-- Enable RLS
ALTER TABLE public.master_transactions ENABLE ROW LEVEL SECURITY;

-- RLS policies to ensure users only see their own transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.master_transactions 
  FOR SELECT 
  USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can insert their own transactions" 
  ON public.master_transactions 
  FOR INSERT 
  WITH CHECK (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update their own transactions" 
  ON public.master_transactions 
  FOR UPDATE 
  USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can delete their own transactions" 
  ON public.master_transactions 
  FOR DELETE 
  USING (user_id = current_setting('app.current_user_id', true));
