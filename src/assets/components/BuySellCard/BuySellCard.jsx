import React, { useState, useContext, useEffect } from 'react';
import handleConfirm from '../handlers/BuyComponent';
import handleSell from '../handlers/SellComponent';
import { AuthContext } from '../AuthContext/AuthContext';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebase';
import './BuySellCard.css';
import homeStore from '../HomeStore/HomeStore';
import { useParams } from 'react-router-dom';
import { useFetch } from '../customHook/useFetch';
const BuySellCard = ({ coinId, coinName, currentPrice }) => {
  // const store = homeStore();
  const {data, error} = useFetch()
  const { currentUser } = useContext(AuthContext);
  const [coin, setCoin]= useState({})
  const {id} = useParams()
  const [amount, setAmount] = useState(1);
  const [action, setAction] = useState('buy');
  const [buyPopupVisible, setBuyPopupVisible] = useState(false);
  const [sellPopupVisible, setSellPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    title: '',
    content: '',
  });
  useEffect(()=>{
    const myCoin = data?.find(coin=> coin.id ===id)
    console.log(myCoin)
    setCoin(myCoin)
  },[data, id])
  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleToggleAction = () => {
    setAction((prevAction) => (prevAction === 'buy' ? 'sell' : 'buy'));
    setAmount(1);
    setPopupInfo({
      title: '',
      content: '',
    });
    setBuyPopupVisible(false);
    setSellPopupVisible(false);
    setErrorPopupVisible(false);
  };

  const handleConfirmWrapper = async () => {
    await handleConfirm(currentUser, id, coin.name, amount, coin.current_price, setPopupInfo, setBuyPopupVisible, setErrorPopupVisible);
  };

  const handleSellWrapper = async () => {
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);
    const userDoc = querySnapshot.docs.find(
      (doc) => doc.data().uid === currentUser.uid
    );
      
    console.log(userDoc)

    if (userDoc) {
      const sellResult = await handleSell(usersCollectionRef, userDoc, amount, 
        coin.current_price, id, coin.name);
  
      if (sellResult.success) {
       
        setPopupInfo({
          title: 'Sell successful!',
          content: sellResult.message,
        });
        setSellPopupVisible(true);
      } else {
        
        setPopupInfo({
          title: 'Error',
          content: sellResult.error,
        });
        setErrorPopupVisible(true);
      }
    } else {
   
      setPopupInfo({
        title: 'Error',
        content: 'User document not found. Please log in and try again.',
      });
      setErrorPopupVisible(true);
    }
  };
  return (
    <div className="buy-sell-card">
    <h2>{coin?.name}</h2>
    <p>Current Price: ${coin?.current_price}</p>
    <div className="quantity-controls">
      <button onClick={handleDecrement}>-</button>
      <span>{amount}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
    <p>Total Cost: ${(amount * coin?.current_price).toFixed(2)}</p>
    <div className="btn-container">
      <button
        className="btn"
        onClick={action === 'buy' ? handleConfirmWrapper : handleSellWrapper}
        style={{ background: action === 'buy' ? 'green' : 'red' }}
      >
        {action === 'buy' ? 'Buy' : 'Sell'}
      </button>
      <button className="btn" onClick={handleToggleAction}>
        Switch to {action === 'buy' ? 'Sell' : 'Buy'}
      </button>
    </div>
    {buyPopupVisible && (
      <div className="popup" style={{ background: 'green' }}>
        <h3>{popupInfo.title}</h3>
        <p>{popupInfo.content}</p>
        <button onClick={() => setBuyPopupVisible(false)}>Close</button>
      </div>
    )}
    {sellPopupVisible && (
      <div className="popup" style={{ background: 'green' }}>
        <h3>{popupInfo.title}</h3>
        <p>{popupInfo.content}</p>
        <button onClick={() => setSellPopupVisible(false)}>Close</button>
      </div>
    )}
    {errorPopupVisible && (
      <div className="popup" style={{ background: 'red', color: 'white' }}>
        <h3>{popupInfo.title}</h3>
        <p>{popupInfo.content}</p>
        <button onClick={() => setErrorPopupVisible(false)}>Close</button>
      </div>
    )}
  </div>
  );
};

export default BuySellCard;