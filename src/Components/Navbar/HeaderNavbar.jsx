import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Toggle } from 'rsuite';
import Icon from "../Navbar/assets/img/stock.png";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function HeaderNavbar() {
  const [activeKey, setActiveKey] = React.useState(null);
 
  const [theme, setThemeValue] = useState(true)

  const setTheme = (e)=>{
    if(e===false) {
      localStorage.setItem("theme", "dark");
      setThemeValue(false)
    }
    else {
      localStorage.setItem("theme", "light");
      setThemeValue(true)
    }
  }

useEffect(()=>{
  const theme = localStorage.getItem("theme");
  document.body.classList.remove('dark-mode', 'light-mode');

  if (theme === "dark") {
    setThemeValue(false)
    document.body.classList.add('dark-mode');
  }

  if (theme === "light") {
    setThemeValue(true)
    document.body.classList.add('light-mode');
  }
 
}, [theme])
  return (
    <>
       <Navbar >
      <Navbar.Brand as={Link} to="/home"><img src={Icon} className='logo'/></Navbar.Brand>
      <Nav onSelect={setActiveKey} activeKey={activeKey}>
        <Nav.Item eventKey="1" >
        Live trade
        </Nav.Item>
        <Nav.Item eventKey="2">Forward test</Nav.Item>
        <Nav.Item eventKey="3">Portfolios</Nav.Item>
        <Nav.Item eventKey="4">Signals</Nav.Item>
        <Nav.Item eventKey="5" as={Link} to="/charts">Charts</Nav.Item>
        <Nav.Item eventKey="6">Simulator</Nav.Item>
        <Nav.Item eventKey="7">Analyser</Nav.Item>
        <Nav.Item eventKey="8" as={Link} to="/pricing">Pricing</Nav.Item>
        
        {/* <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu> */}
      </Nav>
      <Nav pullRight>
     <Toggle checkedChildren={<FaSun />} unCheckedChildren={<FaMoon />} size="lg" onChange={(e)=>{setTheme(e)}} checked={theme}/>

      <Nav.Menu  icon={<FaRegUserCircle />} className='alignLeft'>
          <Nav.Item eventKey="9">Profile</Nav.Item>
          <Nav.Item eventKey="10">Margin Calculator</Nav.Item>
          <Nav.Item eventKey="11">Explore AlgoTest</Nav.Item>
          <Nav.Item eventKey="12">Broker Setup</Nav.Item>
          <Nav.Item eventKey="13">Pricing</Nav.Item>
          <Nav.Item eventKey="14">Blog</Nav.Item>
          <Nav.Item eventKey="15">Community</Nav.Item>
          <Nav.Item  icon={<FaSignOutAlt />} eventKey="16">Logout</Nav.Item>
        </Nav.Menu>
        
      </Nav>
    </Navbar>
    </>
  );
}
