import { useState } from "react";
import { Col, Row, Panel } from "rsuite";
import { FaPlusSquare } from "react-icons/fa";

export default function ConditionTile () {



return <>
    
   
   
    <Row>
        <Col md={24} style={{marginTop:20}}>
        <Panel bordered header="Conditions" className="cardSBasic23">
        <div className="onlyFlex2">
        <div><FaPlusSquare size={30}/><br />Add New</div>
         <div>Condition 1</div>
         <div>Condition 1</div>
         <div>Condition 1</div>
         <div>Condition 1</div>
        </div>
    </Panel>
        </Col>
    </Row>
    </>
}
