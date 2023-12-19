import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
const handleSell = async (usersCollectionRef, userDoc, amount, currentPrice, coinId, coinName) => {
  try {
    const currentBalance = userDoc.data().balanceUSD;
    let currentCryptoHoldings = userDoc.data().cryptoHoldings || [];

    const holdingIndex = currentCryptoHoldings.findIndex(
      (holding) => holding.coinId === coinId
    );

    if (holdingIndex !== -1) {
      const soldHolding = currentCryptoHoldings[holdingIndex];
      const soldAmount = amount;

      if (soldAmount > soldHolding.amount) {
        return {
          success: false,
          error: 'Cannot sell more than you own.',
        };
      }

      const soldCost = soldAmount * currentPrice;

      const updatedCryptoHoldings = [...currentCryptoHoldings];

      if (soldAmount < soldHolding.amount) {
        updatedCryptoHoldings[holdingIndex] = {
          ...soldHolding,
          amount: soldHolding.amount - soldAmount,
          cost: soldHolding.cost - soldCost, 
          timestamp: new Date(),
        };
      } else {
        updatedCryptoHoldings.splice(holdingIndex, 1);
      }

      await updateDoc(doc(usersCollectionRef, userDoc.id), {
        balanceUSD: currentBalance + soldCost,
        cryptoHoldings: updatedCryptoHoldings,
      });

    
      return {
        success: true,
        message: `You have successfully sold ${soldAmount} ${coinName} for $${soldCost}.`,
      };
    } else {
      
      return {
        success: false,
        error: `Could not find the specified crypto holding for selling. Please check your holdings and try again.`,
      };
    }
  } catch (error) {
    console.error('Error in handleSell:', error); 
    return {
      success: false,
      error: `Error selling. Please try again.`,
    };
  }
};

export default handleSell