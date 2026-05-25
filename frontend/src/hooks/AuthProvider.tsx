import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth.service';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('auth_token')
  );
  const [user, setUser] = useState<AuthUser | null>(null);

  const isAuthenticated = !!token;

  // Token varsa kullanıcı bilgisini API'den çek
  useEffect(() => {
    if (token && !user) {
      authService.getUserInfo()
        .then(data => setUser(data))
        .catch(() => {
          // Token geçersizse temizle
          localStorage.removeItem('auth_token');
          setToken(null);
        });
    }
  }, [token]);

  const login = (newToken: string, newUser: AuthUser) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
