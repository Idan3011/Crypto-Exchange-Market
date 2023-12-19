import axois from "../../../data/cryptoApi";
import React, { useEffect, useState } from "react";
import "./fetchCoin.css";
import Marquee from "react-fast-marquee";

const FetchCoin = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);
  useEffect(() => {
    fetchCoin();
  }, []);
  const topCurrency = data.slice(0, 25);

  const fetchCoin = async () => {
    try {
      const response = await axois.get(
        "&x_cg_demo_api_key=CG-YdzrhhMtmAet6c595RYV7xSH"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="marquee-container">
      <Marquee>
        <ul>
          {topCurrency.map((coin) => {
            return (
              <div className="coin-container" key={coin.symbol}>
                <li>
                  <img src={coin.image} alt={coin.symbol} />
                </li>
                <li>
                  {coin.name} <span>({coin.symbol.toUpperCase()})</span>{" "}
                </li>

                <li>{coin.current_price}$</li>
                <li
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h > 0
                    ? `+ ${coin.price_change_percentage_24h}%`
                    : ` ${coin.price_change_percentage_24h}%`}
                </li>
              </div>
            );
          })}
        </ul>
      </Marquee>
    </div>
  );
};

export default FetchCoin;
