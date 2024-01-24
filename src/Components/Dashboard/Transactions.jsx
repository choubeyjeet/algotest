import { useState } from "react";
import { Col, Row } from "rsuite";
import { FaRegChartBar } from "react-icons/fa";
export default function Transactions () {
const [activeBtn, setActiveBtn] = useState(0)


return <>
    
    <Row>
        <Col md={1}></Col>
        <Col md={22} className="displayInlineFlex"><h5>Transactions</h5><p>View All</p></Col>
        <Col md={1}></Col>
    </Row>
    <Row style={{marginTop:20}}>
    <Col md={1}></Col>
        <Col md={22} className="onlyFlex"><p className={activeBtn===0 ? "activeBtn": ""} onClick={()=>{setActiveBtn(0)}} >All</p><p onClick={()=>{setActiveBtn(1)}} className={activeBtn===1 ? "activeBtn": ""}>Sells</p><p onClick={()=>{setActiveBtn(2)}} className={activeBtn===2 ? "activeBtn": ""}>Buy</p></Col>
        <Col md={1}></Col>
    </Row>
    <Row>
    <Col md={1}></Col>
        <Col md={22} style={{marginTop:20}}>
        <ul className="transactionL">

<li><p><span><FaRegChartBar />&nbsp;</span><span>Custom Algorithim</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Algorithim Trading</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Trading Algorithm</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Custom Algorithim 2</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Custom Algorithim 2</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Custom Algorithim 2</span></p><p>-$189</p></li>
<li><p><span><FaRegChartBar />&nbsp;</span><span>Custom Algorithim 2</span></p><p>-$189</p></li>


        </ul>
        </Col>
        <Col md={1}></Col>
    </Row>
    </>
}
