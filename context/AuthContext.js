import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  checkUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error('Appwrite login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      return await login(email, password);
    } catch (error) {
      console.error('Appwrite register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Appwrite logout error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        login,
        register,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
