import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en&precision=1',    
    
})

export default instance