import React, { useRef, useState } from "react";
import "./ToggleForm.css";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const ToggleForm = ({ showForm,setUserLogIn, userLogIn }) => {
  const { login, signup, setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userNameRef = useRef(null);

 
  
  
  const handleSubmitLogin = async (action, e) => {
    e.preventDefault();
    setUserLogIn(true)
    if(userLogIn= true){
      setEmail(null)
      setPassword(null)

    }
    const userName = userNameRef.current?.value;
    try {
      const signupInfo = await action(email, password);
      if (action === signup) {
        const docRef = await addDoc(collection(db, "users"), {
          email: signupInfo.user.email,
          uid: signupInfo.user.uid,
          isAdmin: false,
          balanceUSD: 100000,
          cryptoHoldings: [],
          username: userName,
        });
        await getDocs(collection(db, "users")).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const myUser = newData.find((data) => data.uid === docRef.id);
          setCurrentUser(myUser);
          console.log(myUser);
          const stringifiedObj = JSON.stringify(myUser);
          window.localStorage.setItem("user", stringifiedObj);
        });
      }

      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const myUser = newData.find((data) => data.uid === signupInfo.user.uid);
        setCurrentUser(myUser);
        const stringifiedObj = JSON.stringify(myUser);
        window.localStorage.setItem("user", stringifiedObj);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      {showForm && (
        <form
          className="login-container"
          onSubmit={(e) =>
            handleSubmitLogin(showForm === "login" ? login : signup, e)
          }
        >
          {userLogIn ? null : (
            <>
              <input
                type="email"
                placeholder="Email..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          {showForm === "register" && (
            <>
              <input
                type="text"
                placeholder="insert User Name..."
                ref={userNameRef}
                className="user-name-input"
              />
            </>
          )}
          <button type="submit">{userLogIn? null : 'Submit'}</button>
        </form>
      )}
    </div>
  );
};

export default ToggleForm;
