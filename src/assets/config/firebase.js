import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDN_WpvVdAU4LT0pFzemv4ar6DPjtmsP84",
  authDomain: "crypto-exchange-market.firebaseapp.com",
  projectId: "crypto-exchange-market",
  storageBucket: "crypto-exchange-market.appspot.com",
  messagingSenderId: "1022961533603",
  appId: "1:1022961533603:web:b16f1ce881cd6749acb516",
  measurementId: "G-4W3VNDHGNW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
