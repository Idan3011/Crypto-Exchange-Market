import { create } from "zustand";
import axios from "../../../data/cryptoApi";
import debounce from "../../../data/debounce";
let btcPrice = 0;
let currentPrice = 0
const apiKey = '&x_cg_demo_api_key=CG-YdzrhhMtmAet6c595RYV7xSH';
const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, trending } = homeStore.getState();

    if (query.length > 2) {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?ids=${query}&vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h&api_key=${apiKey}`
      );
      const result = await res.json();

      const coins = result.map((coin) => {
        if (coin.id === "bitcoin") {
          btcPrice = coin.current_price;
        }
  
        const currentPrice = coin.current_price / btcPrice;
        return {
          id: coin.id,
          name: coin.name,
          image: coin.image,
          price: coin.current_price,
          priceBtc: (currentPrice),
        };
      });
      set({ coins });
    } else {
      set({ coins: homeStore.getState().trending });
    }
  }, 500),

  fetchCoins: async () => {
    const res = await axios.get(
      "&x_cg_demo_api_key=CG-YdzrhhMtmAet6c595RYV7xSH"
    );
    const coins = res.data.map((coin) => {
      if (coin.id === "bitcoin") {
        btcPrice = coin.current_price;
      }

      return {
        id: coin.id,
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        priceBtc: (coin.current_price / btcPrice),
      };
    });
    set({ coins, trending: coins });
  },
}));

export default homeStore;
