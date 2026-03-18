import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'createdAt'>, password: string) => Promise<void>;
  updateProfile: (user: Partial<User>) => Promise<void>;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== AUTH CONTEXT PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    // Load auth state from localStorage on mount
    const savedUser = localStorage.getItem('soukna_user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isLoggedIn: !!savedUser,
      isLoading: false,
      error: null,
    };
  });

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('soukna_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('soukna_user');
    }
  }, [state.user]);

  const login = useCallback(async (email: string, _password: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      // TODO: Replace with actual API call
      // For now, create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstname: 'User',
        lastname: 'Test',
        type: 'client',
        createdAt: new Date().toISOString(),
      };

      setState((prevState) => ({
        ...prevState,
        user: mockUser,
        isLoggedIn: true,
        isLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('soukna_user');
  }, []);

  const register = useCallback(async (user: Omit<User, 'id' | 'createdAt'>, _password: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      // TODO: Replace with actual API call
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };

      setState((prevState) => ({
        ...prevState,
        user: newUser,
        isLoggedIn: true,
        isLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      if (!state.user) {
        throw new Error('No user logged in');
      }

      // TODO: Replace with actual API call
      const updatedUser = { ...state.user, ...updates };

      setState((prevState) => ({
        ...prevState,
        user: updatedUser,
        isLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      }));
      throw error;
    }
  }, [state.user]);

  const isLoggedIn = useCallback(() => state.isLoggedIn, [state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        updateProfile,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===== USE AUTH HOOK =====
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
