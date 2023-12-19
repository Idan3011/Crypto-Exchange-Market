import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../assets/config/firebase';
import { useAuth } from "../../assets/components/AuthContext/AuthContext";
import './UserProfile.css'
import Assets from "./AssetsTable";
const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userCryptoHoldings, setUserCryptoHoldings] = useState([])
  
  
  

const fetchUser = async ()=>{
  
  try {
    const userColections = collection(db, 'users');
    const querySnapshot = await getDocs(userColections)
    const userDoc = querySnapshot.docs.find((doc)=>doc.data().uid == currentUser?.uid)
    const currentCryptoHoldings = userDoc?.data().cryptoHoldings || [];
    
    setTimeout(() => {
      setUserCryptoHoldings(currentCryptoHoldings)
    }, 2000);
  
  } catch (error) {
    console.error(error)
  }
 
}
useEffect(()=>{
  fetchUser()
  },[currentUser])




  
  return (
    <div className="UserProfile">

  <div className="header">
    <h1>Hello, {currentUser?.username}!</h1>
    <p>here you can see all your assets!</p>
  </div>
  
    <Assets   userCryptoHoldings={userCryptoHoldings}/>
    </div>
  )
};

export default UserProfile;
