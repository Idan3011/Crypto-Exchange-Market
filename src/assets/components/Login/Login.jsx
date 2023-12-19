import React from "react";
import './Login.css'
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { LuUserPlus2 } from "react-icons/lu";
import { MdPhoneAndroid } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import ToggleForm from "../ToggleForm/ToggleForm";
import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import Home from "../../../pages/Home/Home";
const Login = () => {
  const [userLogIn, setUserLogIn] = useState(false);
    const [showForm, setShowForm] = useState('');
    const {currentUser, setCurrentUser, logout} = useAuth()
    const toggleForm = (formKind) => {
      setShowForm(formKind);
    };

  
    const clearLocal = async()=>{
      try {
        await logout();
        setCurrentUser(null)
        setUserLogIn(false)
    
      localStorage.clear()
      } catch (error) {
        console.error(error)
      }
    }
  return (
      <>
  <div className="login-container">
  <div className="contact-container">
      
  <h5><MdOutlineEmail style={{left:'4.4rem'}} /> Contactus@coinVerse.com</h5>
    <h5> <MdPhoneAndroid /> +(972) 050 000000</h5>
  </div>
  <div className="member-login-container">
    {currentUser ? (<>{currentUser?.username} <Link to='/'><button onClick={clearLocal}>logout</button></Link></>):(<><button onClick={()=>toggleForm('login')}  ><h5> <IoPersonOutline /> Login </h5></button>
   
   <button onClick={()=>toggleForm('register')}><h5> <LuUserPlus2 style={{marginLeft:'5.4rem'}}/> Register</h5></button>
   </>)}
   
  </div>
</div>
 {userLogIn ? null : <ToggleForm showForm={showForm} setUserLogIn={setUserLogIn} userLogIn={userLogIn}/>}

</>
      )
};

export default Login;
