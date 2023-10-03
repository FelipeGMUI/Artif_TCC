
import { createContext, ReactNode } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



type User = {
  id: string ;
  name: string ;
  avatar: string ;
}

type AuthContextType = {
  user: User | undefined ;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;

  

  
  
  
}

type AuthContextProviderProps = {
  children: ReactNode;
  

}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const provider = new GoogleAuthProvider();

  const auth = getAuth();
 
  useEffect(() => {

      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
        
          const { displayName, photoURL, uid } = user

          if (!displayName || !photoURL) {
            throw new Error('Faltando informações de sua conta Google')
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL

          })
             
        }
        
      })

      return () => {
        unsubscribe();
      }
    }, [])
  

  async function signInWithGoogle() {

    const result = await signInWithPopup(auth, provider);

    if (result.user) {

      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Faltando informações de sua conta Google')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL

      })
     setIsLoggedIn(true);
   
    
    }
  };
  async function logout(){
    
    await signOut(auth);
    
    setUser(undefined);
    setIsLoggedIn(false);

    navigate('/');

  }




  return(
  <AuthContext.Provider value={{ user,isLoggedIn, signInWithGoogle, logout }}>
    {props.children}
  </AuthContext.Provider>

  );
  
  };