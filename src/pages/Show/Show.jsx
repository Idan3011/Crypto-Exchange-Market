import { useEffect, useState } from "react";
import showStore from "../../assets/components/showStore/Showstore";
import { useParams } from "react-router-dom";
import '../../pages/Home/Home.scss'
import Header from "../../assets/components/Header/Header";
import BuySellCard from "../../assets/components/BuySellCard/BuySellCard";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Legend,
  Bar,
  Area,
} from "recharts";
import homeStore from "../../assets/components/HomeStore/HomeStore";

export default function Show() {
  const store = showStore();
const data = homeStore()
const { id } = useParams();
  const params = useParams();
 const [selectedCoin, setSelectedCoin]= useState(data.coins.find((coin) => coin.id === id))
 
  useEffect(() => {
    const storedCoin = JSON.parse(localStorage.getItem('selectedCoin'));
    if (storedCoin) {
      setSelectedCoin(storedCoin);
    } 
  }, []);
  
  useEffect(() => {
    localStorage.setItem('selectedCoin', JSON.stringify(selectedCoin));
  }, [selectedCoin]);
  useEffect(() => {
    store.fetchData(params.id);
    
  }, [params.id, id]);
  const CustomizedDot = () => null;

  if (!store.data) {
    return <>Loading....</>;
  }
  return (
    <div>
      <Header back />
      <header className="show-header">
        <img src={store.data.image.large} />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <div>
      {
  <BuySellCard
    coinId={selectedCoin.id}
    coinName={selectedCoin.id}
    currentPrice={selectedCoin.price}
  />
}
        <Tabs>
          <TabList display="flex" align-items="center" justifyContent="center">
            <Tab>Line Chart</Tab>
            <Tab>Bar Chart</Tab>
            <Tab>Area Chart</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="width">
                <div className="show-graph">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      width={500}
                      height={300}
                      data={store.graphData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Price"
                        stroke="#8884d8"
                        dot={<CustomizedDot />}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="width">
                <div className="show-graph">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      width={500}
                      height={300}
                      data={store.graphData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="Price"
                        fill="#8884d8"
                        stroke="#8884d8"
                        dot={<CustomizedDot />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="width">
                <div className="show-graph">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      width={500}
                      height={300}
                      data={store.graphData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="Price"
                        stroke="#8884d8"
                        fill="#8884d8"
                        dot={<CustomizedDot />}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div className="show-details">
        <div className="width">
          <h2>Details</h2>
          <div className="show-details-row">
            <h4>Coin Description</h4>
            <span className="description">{store.data.description.en}%</span>
          </div>
          <div className="show-details-row">
            <h4>Market Cap Rank</h4>
            <span>{store.data.market_cap_rank}</span>
          </div>
          <div className="show-details-row">
            <h4>24th High</h4>
            <span>${store.data.market_data.high_24h.usd}</span>
          </div>
          <div className="show-details-row">
            <h4>24th Low</h4>
            <span>${store.data.market_data.low_24h.usd}</span>
          </div>
          <div className="show-details-row">
            <h4>Circulating Supply</h4>
            <span>${store.data.market_data.circulating_supply}</span>
          </div>
          <div className="show-details-row">
            <h4>Curret Price</h4>
            <span>${store.data.market_data.current_price.usd}</span>
          </div>
          <div className="show-details-row">
            <h4>1y Change</h4>
            <span>
              {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
