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
            <div class="background">
  <div class="container">
    <div class="panel pricing-table">
      
      <div class="pricing-plan">
        <img src={Paper} alt="" class="pricing-img" />
        <h2 class="pricing-header">STARTER</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">300 credits</li>
          <li class="pricing-features-item">Pay ₹1 per credit</li>
        </ul>
        <span class="pricing-price">₹299</span>
        <a href="#/" class="pricing-button">Buy Plan</a>
      </div>
      
      <div class="pricing-plan">
        <img src={Plane} alt="" class="pricing-img" />
        <h2 class="pricing-header">EXPLORER</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">800 credits</li>
          <li class="pricing-features-item">Pay ₹0.94 per credit</li>
        </ul>
        <span class="pricing-price">₹749</span>
        <a href="#/" class="pricing-button is-featured">Buy Plan</a>
      </div>
      
      <div class="pricing-plan">
        <img src={Space} alt="" class="pricing-img" />
        <h2 class="pricing-header">ADVANCED</h2>
        <ul class="pricing-features">
          <li class="pricing-features-item">2500 credits</li>
          <li class="pricing-features-item">Pay ₹0.8 per credit</li>
        </ul>
        <span class="pricing-price">₹4999</span>
        <a href="#/" class="pricing-button">Buy Plan</a>
      </div>
      
    </div>
  </div>
</div>
            </Col>
        </Row>
    </Container>
    </>


}