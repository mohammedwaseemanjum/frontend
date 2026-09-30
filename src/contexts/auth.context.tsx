import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { useUserStore } from '@stores/user';
import { useShallow } from 'zustand/react/shallow';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUserStore(
    useShallow((state) => ({
      user: state.user,
    }))
  )
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(user));

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};