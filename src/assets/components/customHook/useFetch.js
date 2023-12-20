import {useState, useEffect} from 'react'
const apiKey = '&x_cg_demo_api_key=CG-YdzrhhMtmAet6c595RYV7xSH';
const APIurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en&precision=1&api_key=${apiKey}`
export const useFetch = ()=>{
    const [data, setData] = useState(null)
    const [error, setError] = useState(null) 
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(APIurl)
                const result = await response.json();  
                setData(result)
            } catch(e){
                console.log(e);
            }
        }
        fetchData()
    },[])
    return {data, error}
}