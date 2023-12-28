import React from 'react';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import Icon from "../Navbar/assets/img/stock.png";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function HeaderNavbar() {
  const [activeKey, setActiveKey] = React.useState(null);
  return (
    <>
       <Navbar >
      <Navbar.Brand href="#"><img src={Icon} className='logo'/></Navbar.Brand>
      <Nav onSelect={setActiveKey} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<HomeIcon />}>
        Live trade
        </Nav.Item>
        <Nav.Item eventKey="2">Forward test</Nav.Item>
        <Nav.Item eventKey="3">Portfolios</Nav.Item>
        <Nav.Item eventKey="4">Signals</Nav.Item>
        <Nav.Item eventKey="5">Charts</Nav.Item>
        <Nav.Item eventKey="6">Simulator</Nav.Item>
        <Nav.Item eventKey="7">Analyser</Nav.Item>
        <Nav.Item eventKey="8">Pricing</Nav.Item>
        
        {/* <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu> */}
      </Nav>
      <Nav pullRight>
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
