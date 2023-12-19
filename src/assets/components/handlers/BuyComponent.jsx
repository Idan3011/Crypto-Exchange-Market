import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import homeStore from '../HomeStore/HomeStore';
import { useEffect, useState } from 'react';
import { useFetch } from '../customHook/useFetch';
const handleConfirm = async (currentUser, coinId, coinName, amount, currentPrice, setPopupInfo, setBuyPopupVisible, setErrorPopupVisible) => {
  
  // const [coin, setCoin] = useState({})
  // const {id} = useParams()
  // const {data, error} =useFetch()
  // const store = homeStore();
  // useEffect(()=>{
  //   setCoin(data?.find((coins) => coins.id === id ))
  // },[data, id])
  // console.log(coin);
  
  try {
    const totalCost = amount * currentPrice;
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);
    const userDoc = querySnapshot.docs.find((doc) => doc.data().uid === currentUser.uid);

    if (!userDoc) throw new Error('User document not found. Please log in and try again.');

    const currentBalance = userDoc.data().balanceUSD;
    const currentCryptoHoldings = userDoc.data().cryptoHoldings || [];
    const previousHoldingIndex = currentCryptoHoldings.findIndex((holding) => holding.coinId === coinId);

    if (currentBalance < totalCost) throw new Error('Insufficient funds. You do not have enough funds to complete the purchase.');

    if (previousHoldingIndex !== -1) {
      const previousHolding = currentCryptoHoldings[previousHoldingIndex];
      const updatedHolding = {
        ...previousHolding,
        amount: previousHolding.amount + amount,
        cost: previousHolding.cost + totalCost,
        timestamp: new Date(),
      };
      currentCryptoHoldings[previousHoldingIndex] = updatedHolding;
    } else {
      const newHolding = {
        coinId,
        coinName,
        amount,
        cost: totalCost,
        timestamp: new Date(),
      };
      currentCryptoHoldings.push(newHolding);
    }

    await updateDoc(doc(usersCollectionRef, userDoc.id), {
      balanceUSD: currentBalance - totalCost,
      cryptoHoldings: currentCryptoHoldings,
    });

    setPopupInfo({
      title: 'Purchase successful!',
      content: `You have successfully purchased ${amount} ${coinName} for $${totalCost.toFixed(2)}.`,
    });
    setBuyPopupVisible(true);
  } catch (error) {
    handlePopupError(error, setErrorPopupVisible, setPopupInfo);
  }
};

const handlePopupError = (error, setErrorPopupVisible, setPopupInfo) => {
  let errorMessage = 'An error occurred.';
if (error.message) {
  errorMessage = error.message;
}

setPopupInfo({
  title: 'Error',
  content: errorMessage,
});

  setErrorPopupVisible(true);
};

export default handleConfirm;



'you need to singIn or register before making any pourches. please logIn and try again.'