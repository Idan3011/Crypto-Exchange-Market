import React, { useEffect } from "react";
import homeStore from "../../assets/components/HomeStore/HomeStore";
import { Link } from "react-router-dom";
import AppSlider from "../../assets/components/Slider/AppSlider";
import "./Home.scss";
import ListItems from "../../assets/components/ListItems/ListItems";
const Home = () => {
  const store = homeStore();

  useEffect(() => {
    store.fetchCoins();
  }, []);
  return (
    <>
      <AppSlider />
      <div id="home-search">
        <header className="home-search">
          <div className="width">
            <h2>Search for a coin</h2>
            <div className="home-search-input">
              <input
                type="text"
                placeholder="Search"
                value={store.query}
                onChange={store.setQuery}
              />
            </div>
          </div>
        </header>
        <h2 className="home-cryptos-header">
          {" "}
          {!store.searched ? "Trending Coins" : "Searched Results"}
        </h2>
        <div className="home-cryptos">
          
            <ListItems />
          
        </div>
      </div>
    </>
  );
};

export default Home;
