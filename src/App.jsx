import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import HomeBackTestMain from "./Components/Backtest/HomeBackTestMain";
import { Container, Content, Header, Affix } from "rsuite";
import HeaderNavbar from "./Components/Navbar/HeaderNavbar";
import SideNavbar from "./Components/Navbar/SideNavbar";
import PricingPlan from "./Components/Pricing/PricingPlan";
import ChartsView from "./Components/Charts/ChartsView";
import HomePage from "./Components/Home/HomePage";


export default function App() {

  const theme = localStorage.getItem("theme");

useEffect(() => {
  // Remove both classes to avoid accidentally toggling both
  document.body.classList.remove('dark-mode', 'light-mode');

  if (theme === "dark") {
    
    document.body.classList.add('dark-mode');
  }

  if (theme === "light") {
  
    document.body.classList.add('light-mode');
  }
}, [theme]);
  

const [showStocksWindow, setshowStocksWindow] =  useState("Stocks")

  return (
    <>
    <Container>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    

     <Route
          path="/charts"
          element={
            <><Affix style={{zIndex:9999}}>
             <Header><HeaderNavbar /></Header>
             </Affix>
              <Container>
             
        <Content style={{padding: "2%"}}>
       <ChartsView />
      </Content>
      </Container>
                
                
              
            </>
          }
        />


<Route
          path="/*"
          element={
            <><Affix style={{zIndex:9999}}>
             <Header><HeaderNavbar /></Header>
             </Affix>
              <Container>
              <SideNavbar setShow={setshowStocksWindow}/>
        <Content style={{padding: "2%"}}>
        <Routes>
        <Route path="/home" element={<HomeBackTestMain show={showStocksWindow} />} />
        <Route path="/pricing" element={<PricingPlan  />} />
        </Routes>
      </Content>
      </Container>
                
                
              
            </>
          }
        />

      
   
     
 
    </Routes>
    </Container>
   </>
  );

}
