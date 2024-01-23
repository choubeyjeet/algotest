import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import FunnelIcon from '@rsuite/icons/Funnel';
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics';
import React from 'react';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GrowthIcon from '@rsuite/icons/Growth';
import TrendIcon from '@rsuite/icons/Trend';
import { Link } from 'react-router-dom';

const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav>
          <Nav.Menu
            noCaret
            placement="topStart"
            trigger="click"
            title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
          >
            <Nav.Item>Help</Nav.Item>
            <Nav.Item>Settings</Nav.Item>
            <Nav.Item>Sign out</Nav.Item>
          </Nav.Menu>
        </Nav>
  
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };
  
export default function SideNavbar({setShow}) {
    const [expand, setExpand] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    return <>   <Sidebar
    style={{ display: 'flex', flexDirection: 'column'}}
    width={expand ? 220 : 56}
    collapsible
  >
   
    <Sidenav expanded={expand}  defaultOpenKeys={[]} appearance="subtle">
      <Sidenav.Body>
        <Nav activeKey={activeKey}  onSelect={setActiveKey}>
        
          <Nav.Menu
            
            eventKey="1"
            trigger="hover"
            title="#Stocks"
           icon={<AdvancedAnalyticsIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="1-1" onClick={()=>{setShow("Stocks")}} as={Link} to="/home">+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="2"
            trigger="hover"
            title="#920Simple"
            icon={<FunnelIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="2-1" onClick={()=>{setShow("Simple")}} as={Link} to="/home">+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="3"
            trigger="hover"
            title="#920Straddle"
            icon={<GrowthIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="3-1" onClick={()=>{setShow("Straddle")}}>+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="4"
            trigger="hover"
            title="VWAP"
             icon={<TrendIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="4-1" onClick={()=>{setShow("VWAP")}}>+ Add new</Nav.Item>
            
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
  </Sidebar></>
}
