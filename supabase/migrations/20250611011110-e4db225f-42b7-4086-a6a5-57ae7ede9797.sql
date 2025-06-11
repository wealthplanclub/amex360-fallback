
-- Create the Ryan user account
INSERT INTO public.users (user_id, password_hash, email) VALUES
('ryan', public.hash_password('wpcreditm@xguest-ryan'), 'ryan@creditmaxguest.com');

-- Create profile for Ryan
INSERT INTO public.profiles (user_id, display_name, first_name) VALUES
('ryan', 'Ryan', 'Ryan');

-- Assign Ryan the 'user' role (non-admin)
INSERT INTO public.user_roles (user_id, role) VALUES
('ryan', 'user');
