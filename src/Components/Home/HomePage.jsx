import { Button, Col, Container, Row } from "rsuite";
import "./assets/css/homepage.css";
import Icon from "../Navbar/assets/img/stock.png";
import { Link } from "react-router-dom";

export default function HomePage (){


    return <>
    <Container>
    <Row className="noSpace">
        <Col md={2}></Col>
       <Col md={20} className="spaceDiv">

        <Row >
        <Col md={12} sm={24} className="alignItemCenter">
            
        <div className="centerDiv">
            <div><p><img src={Icon} className="IconDiv"/> <span style={{fontSize:18}}>AlgoTrader</span></p>
<p><br/></p>
                <h3>Explore</h3>
            </div>
       

        <div>
        <p><br/></p>
            Discover and create custom algorithmic trading conditions, analyze data and visualize trends.
            </div>
            
            <Button className="startBtn" as={Link} to="/home">Start Trading</Button>
        </div>
            </Col>
        <Col md={12} sm={24} className="alignItemCenter2"><div><img src="https://www.volansys.com/wp-content/uploads/2022/12/Connected-Applications-Development.png" /></div></Col>
        </Row>
       </Col>
       <Col md={2}></Col>
    </Row>
    </Container>
    </>
}
