import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  authType: 'ICP' | 'EVM' | 'SOLANA' | null;
  setAuthState: (authState: { isAuthenticated: boolean; authType: 'ICP' | 'EVM' | 'SOLANA' | null }) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authType, setAuthType] = useState<'ICP' | 'EVM' | 'SOLANA' | null>(null);

  const setAuthState = ({ isAuthenticated, authType }: { isAuthenticated: boolean; authType: 'ICP' | 'EVM' | 'SOLANA' | null }) => {
    
    setIsAuthenticated(isAuthenticated);
    setAuthType(authType);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authType, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useAuthType = (): 'ICP' | 'EVM' | 'SOLANA' | null => {
  const { authType } = useAuth();
  return authType;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
