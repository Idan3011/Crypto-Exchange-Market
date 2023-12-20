import React, { useContext, useEffect, useState } from "react";
import { createContext } from 'react';
import {auth} from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection} from "firebase/firestore";
import {db} from '../../config/firebase'

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
 const [adminUser, setAdminUser] = useState({})

 useEffect(()=>{
  const getAdmin = async () =>{
    try {
    const userColections = collection(db, 'users');
    const querySnapshot = await getDocs(userColections)
    const userAdminDocs = querySnapshot.docs.find((doc)=>doc.data().isAdmin)
    
    if (userAdminDocs) {
      setAdminUser(userAdminDocs.data());
    }

   
  } catch (error) {
    console.error(error)
  }}
  
  getAdmin()

 },[])
 useEffect(() => {

}, [adminUser]);
 
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
    adminUser,
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