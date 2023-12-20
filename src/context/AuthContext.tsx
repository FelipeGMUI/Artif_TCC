import { createContext, ReactNode, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean | undefined;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(() => {
    const storedUser = localStorage.getItem('user');
    return !!storedUser; 
  });

  const updateUserInLocalStorage = (userData: User | null) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Faltando informações de sua conta Google');
        }

        const userData: User = {
          id: uid,
          name: displayName,
          avatar: photoURL
        };

        setUser(userData);
        setIsLoggedIn(true);
        updateUserInLocalStorage(userData);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        updateUserInLocalStorage(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Faltando informações de sua conta Google');
      }

      const userData: User = {
        id: uid,
        name: displayName,
        avatar: photoURL
      };

      setUser(userData);
      setIsLoggedIn(true);
      updateUserInLocalStorage(userData);
    }
  }

  async function logout() {
    await signOut(auth);

    setUser(null);
    setIsLoggedIn(false);
    updateUserInLocalStorage(null);

    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signInWithGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
