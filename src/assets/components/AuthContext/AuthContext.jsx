import React, { useContext, useEffect, useState } from "react";
import { createContext } from 'react';
import {auth} from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
 
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []); 
 
 
  const login = async (email, password) => {
    try {
     
      return signInWithEmailAndPassword(auth,email, password)
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const signup  = async (email, password)=>{
    try {
      return createUserWithEmailAndPassword(auth, email, password)

    } catch (error) {
      console.log(error);
      
    }
  }

  const contextValue = {
    currentUser,
    userDetails,
    setCurrentUser,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;