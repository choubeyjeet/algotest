import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import React from 'react';


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
  
export default function SideNavbar() {
    const [expand, setExpand] = React.useState(true);
  
    return <>   <Sidebar
    style={{ display: 'flex', flexDirection: 'column'}}
    width={expand ? 200 : 56}
    collapsible
  >
   
    <Sidenav expanded={expand} defaultOpenKeys={[]} appearance="subtle">
      <Sidenav.Body>
        <Nav>
          {/* <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<GroupIcon />}>
            User Group
          </Nav.Item> */}
          <Nav.Menu
            eventKey="1"
            trigger="hover"
            title="#Stocks"
            // icon={<MagicIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="1-1">+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="2"
            trigger="hover"
            title="#920Simple"
            // icon={<MagicIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="2-1">+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="3"
            trigger="hover"
            title="#920Straddle"
            // icon={<MagicIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="3-1">+ Add new</Nav.Item>
            
          </Nav.Menu>
          <Nav.Menu
            eventKey="4"
            trigger="hover"
            title="VWAP"
            // icon={<MagicIcon />}
            placement="rightStart"
          >
            <Nav.Item eventKey="4-1">+ Add new</Nav.Item>
            
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
  </Sidebar></>
}
