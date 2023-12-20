import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const handleSell = async (
  usersCollectionRef,
  userDoc,
  amount,
  currentPrice,
  coinId,
  coinName
) => {
  const userColections = collection(db, "users");
  const querySnapshot = await getDocs(userColections);
  const adminUserDoc = querySnapshot.docs.find((doc) => doc.data().isAdmin);

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
          error: "Cannot sell more than you own.",
        };
      }

      const soldCost = soldAmount * currentPrice;
      let commission = 0;
      let netSoldCost = 0;
      if (userDoc.id != adminUserDoc.id) {
        commission = 0.02 * soldCost;
        netSoldCost = soldCost - commission;
      } else {
        commission = 0;
        netSoldCost = soldCost;
      }

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

      try {
      } catch (error) {
        console.error(error);
      }

      if (adminUserDoc) {
        const currentCommission = adminUserDoc.data().commission || 0;

        await updateDoc(adminUserDoc.ref, {
          commission: commission + currentCommission,
        });
      }
      return {
        success: true,
        message: `You have successfully sold ${soldAmount} ${coinName} for $${netSoldCost.toFixed(
          2
        )}$. you paid a ${commission.toFixed(
          2
        )}$ as a commission for the trade.`,
      };
    } else {
      return {
        success: false,
        error: `Could not find the specified crypto holding for selling. Please check your holdings and try again.`,
      };
    }
  } catch (error) {
    console.error("Error in handleSell:", error);
    return {
      success: false,
      error: `Error selling. Please try again.`,
    };
  }
};

export default handleSell;
