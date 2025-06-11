
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  user_id: string;
  email?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (userId: string, password: string) => Promise<{ error?: string }>;
  signUp: (userId: string, password: string, email?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        setLoading(false);
        return;
      }

      // Check if session is valid
      const { data: session, error } = await supabase
        .from('user_sessions')
        .select('user_id, expires_at')
        .eq('session_token', sessionToken)
        .single();

      if (error || !session) {
        localStorage.removeItem('session_token');
        setLoading(false);
        return;
      }

      // Check if session is expired
      if (new Date(session.expires_at) < new Date()) {
        localStorage.removeItem('session_token');
        await supabase
          .from('user_sessions')
          .delete()
          .eq('session_token', sessionToken);
        setLoading(false);
        return;
      }

      // Set user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: session.user_id
      });

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user_id)
        .single();

      setUser({
        user_id: session.user_id,
        ...profile
      });
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (userId: string, password: string): Promise<{ error?: string }> => {
    try {
      // Verify user credentials
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_id, password_hash')
        .eq('user_id', userId)
        .single();

      if (userError || !user) {
        return { error: 'Invalid user ID or password' };
      }

      // Verify password
      const { data: isValid, error: verifyError } = await supabase
        .rpc('verify_password', {
          password: password,
          hash: user.password_hash
        });

      if (verifyError || !isValid) {
        return { error: 'Invalid user ID or password' };
      }

      // Create session
      const sessionToken = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

      const { error: sessionError } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString()
        });

      if (sessionError) {
        return { error: 'Failed to create session' };
      }

      // Update last login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('user_id', userId);

      // Store session token
      localStorage.setItem('session_token', sessionToken);

      // Set user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: userId
      });

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      setUser({
        user_id: userId,
        ...profile
      });

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (userId: string, password: string, email?: string): Promise<{ error?: string }> => {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (existingUser) {
        return { error: 'User ID already exists' };
      }

      // Hash password
      const { data: hashedPassword, error: hashError } = await supabase
        .rpc('hash_password', { password });

      if (hashError || !hashedPassword) {
        return { error: 'Failed to process password' };
      }

      // Create user
      const { error: userError } = await supabase
        .from('users')
        .insert({
          user_id: userId,
          password_hash: hashedPassword,
          email: email
        });

      if (userError) {
        if (userError.code === '23505') {
          return { error: 'Email already registered' };
        }
        return { error: 'Failed to create user' };
      }

      // Create profile
      await supabase
        .from('profiles')
        .insert({
          user_id: userId
        });

      // Auto sign in after registration
      return await signIn(userId, password);
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      if (sessionToken) {
        // Delete session from database
        await supabase
          .from('user_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }

      localStorage.removeItem('session_token');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
