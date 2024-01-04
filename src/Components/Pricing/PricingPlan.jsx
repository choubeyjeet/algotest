import { Container, Row, Col } from "rsuite";
import "./assets/css/pricing.css";
import Paper from "./assets/image/paper-plane.png";
import Plane from "./assets/image/plane.png";
import Space from "./assets/image/space-ship.png";
export default function PricingPlan (){

    return <>
    <Container>
        <Row>
            <Col md={24}>
            <div className="background">
  <div className="container">
    <div className="panel pricing-table">
      
      <div className="pricing-plan">
        <img src={Paper} alt="" className="pricing-img" />
        <h2 className="pricing-header">STARTER</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">300 credits</li>
          <li className="pricing-features-item">Pay ₹1 per credit</li>
        </ul>
        <span className="pricing-price">₹299</span>
        <a href="#/" className="pricing-button">Buy Plan</a>
      </div>
      
      <div className="pricing-plan">
        <img src={Plane} alt="" className="pricing-img" />
        <h2 className="pricing-header">EXPLORER</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">800 credits</li>
          <li className="pricing-features-item">Pay ₹0.94 per credit</li>
        </ul>
        <span className="pricing-price">₹749</span>
        <a href="#/" className="pricing-button is-featured">Buy Plan</a>
      </div>
      
      <div className="pricing-plan">
        <img src={Space} alt="" className="pricing-img" />
        <h2 className="pricing-header">ADVANCED</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">2500 credits</li>
          <li className="pricing-features-item">Pay ₹0.8 per credit</li>
        </ul>
        <span className="pricing-price">₹4999</span>
        <a href="#/" className="pricing-button">Buy Plan</a>
      </div>
      
    </div>
  </div>
</div>
            </Col>
        </Row>
    </Container>
    </>


}
