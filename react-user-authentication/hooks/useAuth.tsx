
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

import { storeLocalData, getLocalData } from '../utils/util.utils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string>('');

  const {
    token = '',
  } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    const data = getLocalData('user_token');
    if (data) {
      console.log("user_token:", data);
      setUserToken(data);
    }
    setLoading(false);
  }, [token]);


  const logout = useCallback(() => {
    console.log("Logging out...");
    setUserToken('');
    localStorage.clear();
  }, []);

  const value = {
    // login,
    // signup,
    logout,
    loading,
    isAuthenticated: !!userToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
