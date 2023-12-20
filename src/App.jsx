import "./App.css";
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppNavBar from "../src/assets/components/appNavBar/appNavBar.";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../src/pages/Home/Home";
import Admin from "../src/pages/Admin/Admin";
import UserProfile from "./pages/UserProfile/UserProfile";
import Show from "../src/pages/Show/Show";
import Chart from "../src/pages/Show/Chart"

function App() {
  return (
    <>    
      <Router>
      <ChakraProvider>
        <AppNavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pages/Show/Chart" element={<Chart />}/>
          <Route path="/pages/UserProfile/UserProfile" element={<UserProfile />} />
          <Route path="/pages/Admin/Admin" element={<Admin />} />
          <Route path="/pages/Show/Show/:id" element={<Show />} />
        </Routes>
        </ChakraProvider>
      </Router>
    </>
  );
}

export default App;
