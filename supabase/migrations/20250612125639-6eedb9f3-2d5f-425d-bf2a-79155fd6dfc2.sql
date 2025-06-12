
-- Delete Ryan's session data
DELETE FROM public.user_sessions WHERE user_id = 'ryan';

-- Delete Ryan's role assignment
DELETE FROM public.user_roles WHERE user_id = 'ryan';

-- Delete Ryan's profile
DELETE FROM public.profiles WHERE user_id = 'ryan';

-- Delete Ryan's user account
DELETE FROM public.users WHERE user_id = 'ryan';
