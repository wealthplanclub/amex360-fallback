
-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id TEXT, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a security definer function to get current user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = current_setting('app.current_user_id', true)
  LIMIT 1
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view all roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert roles" 
  ON public.user_roles 
  FOR INSERT 
  WITH CHECK (public.has_role(current_setting('app.current_user_id', true), 'admin') OR NOT EXISTS (SELECT 1 FROM public.user_roles));

CREATE POLICY "Only admins can update roles" 
  ON public.user_roles 
  FOR UPDATE 
  USING (public.has_role(current_setting('app.current_user_id', true), 'admin'));

CREATE POLICY "Only admins can delete roles" 
  ON public.user_roles 
  FOR DELETE 
  USING (public.has_role(current_setting('app.current_user_id', true), 'admin'));

-- Assign admin role to w3althplan user (if exists)
INSERT INTO public.user_roles (user_id, role)
SELECT 'w3althplan', 'admin'
WHERE EXISTS (SELECT 1 FROM public.users WHERE user_id = 'w3althplan')
ON CONFLICT (user_id, role) DO NOTHING;
