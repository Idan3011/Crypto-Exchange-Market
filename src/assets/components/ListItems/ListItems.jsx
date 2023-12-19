import React from "react";
import { Link, useParams } from "react-router-dom";
import homeStore from "../HomeStore/HomeStore";

import { useState, useEffect } from "react";
import { useFetch } from "../customHook/useFetch";
import { Spinner } from "@chakra-ui/react";
let btcPrice = 0
export default function ListItems() {
  const store = homeStore();
  const { id } = useParams();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { data, error } = useFetch();
  console.log(data);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };
  if (!data) return <Spinner />;
  return (
    <div className="cards-container">
      {data?.map((coin) => {
        if(coin.id === 'bitcoin')
       btcPrice = coin.current_price;
      let priceBTC = coin.current_price/btcPrice

        return (
          <React.Fragment key={coin.id}>
            <Link
              to={`/pages/Show/Show/${coin.id}`}
              onClick={() => handleCoinClick(coin)}
            >
              <img src={coin.image} alt={coin.symbol} className="image" />
              <p className="name">{coin.id}</p>
              <p className="btc">
                {priceBTC.toFixed(5)} <span>BTC</span>{" "}
              </p>
              <p className="usd">Current price: {coin.current_price}$</p>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
