// Purpose: Authentication context provider.
// TODO: Implement actual authentication logic with JWT tokens.

import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '@/types/noctis';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // TODO: Implement actual login with API call
  const login = async (_email: string, _password: string) => {
    console.log('TODO: Implement login');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
