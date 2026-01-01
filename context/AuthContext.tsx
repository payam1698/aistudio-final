
import React, { createContext, useContext, useState, useEffect } from 'react';
/* Fix: Import UserData from types.ts instead of defining it locally to maintain a single source of truth */
import { UserData } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserData | null;
  login: (mobile: string, code: string) => Promise<boolean>;
  register: (data: UserData) => Promise<{ success: boolean; message?: string }>;
  updateUser: (data: Partial<UserData>) => Promise<void>;
  logout: () => void;
  /* Fix: Added getAllUsers to context type for admin panel access */
  getAllUsers: () => UserData[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUser = async (data: Partial<UserData>) => {
    if (!user) return;
    const updatedUser = await api.auth.updateProfile(user.mobile, data);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const login = async (mobile: string, code: string): Promise<boolean> => {
    const result = await api.auth.login(mobile, code);
    if (result.success && result.user) {
      setUser(result.user);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      return true;
    }
    return false;
  };

  const registerUser = async (data: UserData) => {
    return await api.auth.register(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  /* Fix: Implementation of getAllUsers using simulated api.auth.getAllUsers */
  const getAllUsers = () => {
    return api.auth.getAllUsers();
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register: registerUser, updateUser, logout, getAllUsers,
      isAuthenticated: !!user, isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
