import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: '1', email, displayName: email.split('@')[0] });
    setIsLoading(false);
  };

  const signup = async (email: string, _password: string, displayName: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: '1', email, displayName });
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: '1', email: 'user@gmail.com', displayName: 'Google User', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' });
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
