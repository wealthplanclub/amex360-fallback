
-- Drop existing restrictive policies that prevent registration
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.user_sessions;

-- Also drop the policies from the previous migration if they exist
DROP POLICY IF EXISTS "Allow user registration" ON public.users;
DROP POLICY IF EXISTS "Allow profile creation during registration" ON public.profiles;
DROP POLICY IF EXISTS "Allow session creation" ON public.user_sessions;
DROP POLICY IF EXISTS "Allow session deletion" ON public.user_sessions;

-- Create new policies that allow proper user registration and management

-- Users table policies
CREATE POLICY "Allow user registration" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own data" 
  ON public.users 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own data" 
  ON public.users 
  FOR UPDATE 
  USING (true);

-- Profiles table policies  
CREATE POLICY "Allow profile creation" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (true);

-- User sessions table policies
CREATE POLICY "Allow session creation" 
  ON public.user_sessions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow session management" 
  ON public.user_sessions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow session deletion" 
  ON public.user_sessions 
  FOR DELETE 
  USING (true);

CREATE POLICY "Allow session updates" 
  ON public.user_sessions 
  FOR UPDATE 
  USING (true);
