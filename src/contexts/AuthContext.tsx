
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  user_id: string;
  email?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (userId: string, password: string) => Promise<{ error?: string }>;
  signUp: (userId: string, password: string, email?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
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

// Mock users for demo purposes
const mockUsers = {
  'ryan': {
    user_id: 'ryan',
    password: 'wpcreditm@xguest-ryan',
    email: 'ryan@creditmaxguest.com',
    display_name: 'Ryan',
    first_name: 'Ryan',
    role: 'user'
  },
  'w3althplan': {
    user_id: 'w3althplan',
    password: 'dmm2020$',
    email: 'admin@wealthplan.com',
    display_name: 'WealthPlan Admin',
    first_name: 'Admin',
    role: 'admin'
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const signIn = async (userId: string, password: string): Promise<{ error?: string }> => {
    const mockUser = mockUsers[userId as keyof typeof mockUsers];
    
    if (!mockUser || mockUser.password !== password) {
      return { error: 'Invalid user ID or password' };
    }

    const userData = {
      user_id: mockUser.user_id,
      email: mockUser.email,
      display_name: mockUser.display_name,
      first_name: mockUser.first_name,
      role: mockUser.role
    };

    setUser(userData);
    localStorage.setItem('mock_user', JSON.stringify(userData));
    
    return {};
  };

  const signUp = async (userId: string, password: string, email?: string): Promise<{ error?: string }> => {
    // For demo purposes, just simulate successful signup
    const userData = {
      user_id: userId,
      email: email,
      display_name: userId,
      first_name: userId,
      role: 'user'
    };

    setUser(userData);
    localStorage.setItem('mock_user', JSON.stringify(userData));
    
    return {};
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      hasRole, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
