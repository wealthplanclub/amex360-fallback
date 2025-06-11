
-- Add policies to allow user registration
CREATE POLICY "Allow user registration" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (true);

-- Add policy to allow profile creation during registration
CREATE POLICY "Allow profile creation during registration" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (true);

-- Add policy to allow session creation
CREATE POLICY "Allow session creation" 
  ON public.user_sessions 
  FOR INSERT 
  WITH CHECK (true);

-- Add policy to allow session deletion for cleanup
CREATE POLICY "Allow session deletion" 
  ON public.user_sessions 
  FOR DELETE 
  USING (true);
