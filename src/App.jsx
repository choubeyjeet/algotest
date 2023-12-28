import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import HomeBackTestMain from "./Components/Backtest/HomeBackTestMain";
import { Container, Content, Header, Affix } from "rsuite";
import HeaderNavbar from "./Components/Navbar/HeaderNavbar";
import SideNavbar from "./Components/Navbar/SideNavbar";


export default function App() {

const [showStocksWindow, setshowStocksWindow] =  useState("Stocks")

  return (
    <>
    <Container>
    <Routes>
    
     {/* <Route path="/" element={<Login />} /> */}
<Route
          path="/*"
          element={
            <><Affix>
             <Header><HeaderNavbar /></Header>
             </Affix>
              <Container>
              <SideNavbar setShow={setshowStocksWindow}/>
        <Content style={{padding: "2%"}}>
        <Routes>
        <Route path="/" element={<HomeBackTestMain show={showStocksWindow} />} />
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
