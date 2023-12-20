import React from "react";
import { Link, useParams } from "react-router-dom";
import homeStore from "../HomeStore/HomeStore";

import { useState, useEffect } from "react";
import { useFetch } from "../customHook/useFetch";
import { Spinner } from "@chakra-ui/react";
let btcPrice = 0;
export default function ListItems() {
  const store = homeStore();
  const { id } = useParams();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { data, error } = useFetch();

    useEffect(()=>{
      setTimeout(()=>{data},2000)
    })
  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };
  if (!data) return <Spinner />;
  return (
    <div className="cards-container">
      {data?.map((coin) => {
        if (coin.id === "bitcoin") btcPrice = coin.current_price;
        let priceBTC = coin.current_price / btcPrice;

        return (
          <React.Fragment key={coin.id}>
            <Link
              to={`/pages/Show/Show/${coin.id}`}
              onClick={() => handleCoinClick(coin)}
            >
              <img src={coin.image} alt={coin.symbol} className="image" />
              <p className="name">{coin.id}</p>
             
              <p className="btc">
                {coin.id === "bitcoin" ? priceBTC : priceBTC.toFixed(10)}{" "}
                <span>BTC</span>{" "}
              </p>
              <p className="price-change-24h">24H price change: </p>
              <p
                style={{
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h > 0
                  ? ` + ${coin.price_change_percentage_24h}%`
                  : `${coin.price_change_percentage_24h}%`}
              </p>
              <p className="usd">Current price: {coin.current_price}$</p>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
