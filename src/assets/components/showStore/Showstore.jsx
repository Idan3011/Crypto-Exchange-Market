import { create } from "zustand";
import '../../../pages/Home/Home.scss'

const showStore = create((set) => ({
    graphData: [],
    fetchData: async (id) => {
      try {
        const [graphsRes, dataRes] = await Promise.all([
          fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
          ).then((res) => res.json()),
          fetch(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
          ).then((res) => res.json()),
        ]);
        
        
        const graphData = graphsRes.prices.map((price) => {
          const [timeStamp, priceValue] = price;
          const date = new Date(timeStamp).toLocaleDateString("en-us");
          return {
            Date: date,
            Price: priceValue,
          };
        });
  
        
  
        set({
          data: dataRes,
          graphData,
        });
      } catch (error) {
        console.error(error);
      }
    },
  }));
  
  export default showStore;