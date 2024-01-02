import { useState } from "react";

import { FaDownload, FaSave, FaPlay, FaPlus } from "react-icons/fa";
import { SelectPicker,Row, Col, Button, Input, Panel, Affix, ButtonToolbar, ButtonGroup, Toggle, Tooltip, Whisper, InputGroup } from "rsuite";

import html2pdf from 'html2pdf.js';


export default function BacktestSimple() {
  const [conditions, setConditions] = useState([]);
  const [activeButton, setActiveButton] = useState({});
  const [optionButton, setOptionButton] = useState({});
  const [trailStopLoss, settrailStopLoss] = useState(false);
  const [setIntervalB, setIntervalButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tradingConditions, setTradingConditions] = useState({
    targetProfit: true,
    stopLoss: true,
   
  });

  const currentDate = getFormattedDate(); // Current date
   const yesterdayDate = getFormattedDate(-1); // Yesterday's date

   function getFormattedDate(offset = 0) {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const exportToPDF = () => {
    const element = document.getElementById('divToExport');
    const options = {
        margin: 10,
        filename: 'Backtest_Strategy.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }, // Set orientation to 'landscape'
      };
    html2pdf(element, options);
  };


  const handleAddCondition = () => {
    const newCondition = {};
    setConditions([...conditions, newCondition]);
   
  };


  const setFormValue = (name, index, e, type) => { 
    setCurrentIndex(index);
    
    const updatedConditions = [...conditions];
    const currentCondition = updatedConditions[index] || {};
    currentCondition[name] = e;
    updatedConditions[index] = currentCondition;
   console.log(updatedConditions)
    setConditions(updatedConditions);
  } 
  return <>
  
<a href="#" className="float">
<FaPlus size="30" />
</a>
<ul className="floating">
  <li>
    <a onClick={exportToPDF} title="Download as PDF">
   
    <FaDownload size="30" />

    
    </a>
  </li>
  <li>
    <a  title="Save Strategy">
    <FaSave size="30"/>
    </a>
  </li>
  <li>
    <a href="#" title="Play Strategy">
    <FaPlay size="30" />
    </a>
  </li>
</ul> 
 {/* <Affix top={60}>
<Row style={{marginBottom: 40, background: "#e7e7e7"}}>
<Panel shaded style={{paddingBottom: "20px",background:"#10122b"}}>
    <Col md={12}>
        
    </Col>
    <Col md={4} sm={24}>
    <Button onClick={exportToPDF}><FaDownload /> &nbsp;Download PDF</Button>
    </Col>
    <Col md={4} sm={24}>
    <Button appearance="primary" ><FaSave /> &nbsp;Save Strategy</Button>
    </Col>
    <Col md={4} sm={24}>
    <Button appearance="primary" color="green"><FaPlay /> &nbsp;Start Backtest</Button>
    </Col>
    </Panel>
</Row>
</Affix> */}
  <Row>

    <Col md={4}><h4>New Strategy</h4></Col>
    <Col md={10}></Col>
    <Col md={5}><h6>Credits: 0</h6></Col>
    <Col md={5}><h6>Add Credits +</h6></Col>
  </Row>
  <hr />
  <div id="divToExport">
  <Row>
    <Col md={24}>
<p><b>Index and Timings (Intraday)</b></p>
<p>&nbsp;</p>
<div>
  <Row>
<Col md={8}>Index <br />
<select className="rs-input" style={{width: "50%"}}>
<option value="NIFTY">Nifty</option>
<option value="BANKNIFTY">Banknifty</option>
<option value="FINNIFTY">Finnifty</option>
<option value="MIDCPNIFTY">Midcpnifty</option>
<option value="SENSEX">Sensex</option>
<option value="BANKEX">Bankex</option>
</select>
</Col>
<Col md={8}>Entry Time <br />
<input type="time" className="rs-input" defaultValue="09:15" style={{width:120}}/></Col>
<Col md={8}>Exit Time <br />
<input type="time" className="rs-input" defaultValue="03:30" style={{width:120}}/></Col>
  </Row>
</div>
    </Col>
  </Row>


  <p style={{marginTop:50}}><b>Strategy Legs</b></p>
  {conditions.map((val, index) => 
    <div key={"index_" + index}>
    <Row style={{marginTop:20}} >
    <Col md={24}>

<p></p>
<p><b>Leg {index + 1}</b> <br />&nbsp;</p>
<div style={{padding: 10, background: "#e7e7e7"}}>
 
  <Row>
<Col md={6}>Lots <br />
<input type="number" className="rs-input" style={{width:100}} min="1"  onChange={(e) => {
                        setFormValue("lots", index, e.target.value);
                      }}/>
</Col>
<Col md={6}>Position <br />
<Button appearance="ghost"  className={activeButton["activeButton" + index] === 'Buy' ? 'active' : ''} onClick={() => {
   setFormValue("position", index, "Buy");
   setActiveButton({ ...activeButton, ["activeButton" + index]: "Buy" });
  }}>Buy</Button><Button appearance="ghost" className={activeButton["activeButton" + index] === 'Sell' ? 'active' : ''} onClick={() => {
    setFormValue("position", index, "Sell");
    setActiveButton({ ...activeButton, ["activeButton" + index]: "Sell" });
  }}>Sell</Button></Col>
<Col md={6}>Option Type <br />
<Button appearance="ghost" className={optionButton["optionButton" + index] === 'Call' ? 'active' : ''} onClick={() => {
  setFormValue("option", index, "Call");
    setOptionButton({ ...optionButton, ["optionButton" + index]: "Call" })
  }}
  >Call</Button><Button appearance="ghost" className={optionButton["optionButton" + index] === 'Put' ? 'active' : ''} onClick={() => {
    setFormValue("option", index, "Put");
    setOptionButton({ ...optionButton, ["optionButton" + index]: "Put" })
  }}>Put</Button></Col>
<Col md={6}>Strike Type <br />
<select className="rs-input" style={{width: "50%"}} defaultValue="StrikeType.ATM" onChange={(e) => {
                        setFormValue("striketype", index, e.target.value);
                      }}>
<option value="StrikeType.ITM20">ITM20</option>
<option value="StrikeType.ITM19">ITM19</option>
<option value="StrikeType.ITM18">ITM18</option>
<option value="StrikeType.ITM17">ITM17</option>
<option value="StrikeType.ITM16">ITM16</option>
<option value="StrikeType.ITM15">ITM15</option>
<option value="StrikeType.ITM14">ITM14</option>
<option value="StrikeType.ITM13">ITM13</option>
<option value="StrikeType.ITM12">ITM12</option>
<option value="StrikeType.ITM11">ITM11</option>
<option value="StrikeType.ITM10">ITM10</option>
<option value="StrikeType.ITM9">ITM9</option>
<option value="StrikeType.ITM8">ITM8</option>
<option value="StrikeType.ITM7">ITM7</option>
<option value="StrikeType.ITM6">ITM6</option>
<option value="StrikeType.ITM5">ITM5</option>
<option value="StrikeType.ITM4">ITM4</option>
<option value="StrikeType.ITM3">ITM3</option>
<option value="StrikeType.ITM2">ITM2</option>
<option value="StrikeType.ITM1">ITM1</option>
<option value="StrikeType.ATM">ATM</option>
<option value="StrikeType.OTM1">OTM1</option>
<option value="StrikeType.OTM2">OTM2</option>
<option value="StrikeType.OTM3">OTM3</option>
<option value="StrikeType.OTM4">OTM4</option>
<option value="StrikeType.OTM5">OTM5</option>
<option value="StrikeType.OTM6">OTM6</option>
<option value="StrikeType.OTM7">OTM7</option>
<option value="StrikeType.OTM8">OTM8</option>
<option value="StrikeType.OTM9">OTM9</option>
<option value="StrikeType.OTM10">OTM10</option>
<option value="StrikeType.OTM11">OTM11</option>
<option value="StrikeType.OTM12">OTM12</option>
<option value="StrikeType.OTM13">OTM13</option>
<option value="StrikeType.OTM14">OTM14</option>
<option value="StrikeType.OTM15">OTM15</option>
<option value="StrikeType.OTM16">OTM16</option>
<option value="StrikeType.OTM17">OTM17</option>
<option value="StrikeType.OTM18">OTM18</option>
<option value="StrikeType.OTM19">OTM19</option>
<option value="StrikeType.OTM20">OTM20</option>
</select></Col>
  </Row>

  <Row style={{marginTop:40}}>
  <Col md={6}>Target Profit &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions,["targetProfit"]: !e})
            }}/>
            <br/><br/>
          {!tradingConditions.targetProfit && <>  <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.targetProfit} onChange={(e) => {
                        setFormValue("targetprofit", index, e.target.value);
                      }}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0" onChange={(e) => {
                        setFormValue("targetprofitvalue", index, e.target.value);
                      }}/></Col>
            </Row></>}
           
                
                
                
                </Col>
            <Col md={6}>Stop Loss &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions, ["stopLoss"]: !e})
            }}/> <br/><br/>

            {!tradingConditions.stopLoss && <>  <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.stopLoss} onChange={(e) => {
                        setFormValue("stopLosstype", index, e.target.value);
                      }}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0"  disabled={tradingConditions.stopLoss} onChange={(e) => {
                        setFormValue("stopLossvalue", index, e.target.value);
                      }}/></Col>
            </Row></>}
          
           </Col>
           {!tradingConditions.stopLoss && <>   <Col md={6}>Trail SL &nbsp; <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.stopLoss} onChange={(e) => {
                        setFormValue("trailSLtype", index, e.target.value);
                      }}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={6}><input className="rs-input" style={{width: 60}} type="number" min="0"  disabled={tradingConditions.stopLoss} onChange={(e) => {
                        setFormValue("trailSLvalue_1", index, e.target.value);
                      }}/></Col>
                <Col md={6}><input className="rs-input" style={{width: 60}} type="number" min="0"  disabled={tradingConditions.stopLoss} onChange={(e) => {
                        setFormValue("trailSLvalue_2", index, e.target.value);
                      }}/></Col>
            </Row>
           </Col> </> }
        
         
  </Row>
</div>
    </Col>
  </Row>
    </div>
  )}
  
  
  <Row style={{marginTop:50}}>
    <Col md={24}>
<p><b>Leg Builder (Weekly Expiry)</b></p>
<p>&nbsp;</p>
<div>
  <Row>
<Col md={6}>Lots <br />
<input type="number" className="rs-input" style={{width:100}} min="1"/>
</Col>
<Col md={6}>Position <br />
<Button appearance="ghost" className={activeButton["activeButtondefault"]==="Buy" ? 'active' : ''} onClick={() => {
  setActiveButton({ ...activeButton, ["activeButtondefault"]: "Buy" })
    
  }}>Buy</Button><Button appearance="ghost" className={activeButton["activeButtondefault"] === "Sell" ? 'active' : ''} onClick={() => {
    setActiveButton({ ...activeButton, ["activeButtondefault"]: "Sell" });
    
  }}>Sell</Button></Col>
<Col md={6}>Option Type <br />
<Button appearance="ghost" className={optionButton["optionButtondefault"]==="Call" ? 'active' : ''} onClick={() => {
  
    setOptionButton({ ...optionButton, ["optionButtondefault"]: "Call" })
  }}>Call</Button><Button appearance="ghost" className={optionButton["optionButtondefault"]==="Put" ? 'active' : ''} onClick={() => {
    
    setOptionButton({ ...optionButton, ["optionButtondefault"]: "Put" })
  }}>Put</Button></Col>
<Col md={6}>Strike Type <br />
<select className="rs-input" style={{width: "50%"}} defaultValue="StrikeType.ATM">
<option value="StrikeType.ITM20">ITM20</option>
<option value="StrikeType.ITM19">ITM19</option>
<option value="StrikeType.ITM18">ITM18</option>
<option value="StrikeType.ITM17">ITM17</option>
<option value="StrikeType.ITM16">ITM16</option>
<option value="StrikeType.ITM15">ITM15</option>
<option value="StrikeType.ITM14">ITM14</option>
<option value="StrikeType.ITM13">ITM13</option>
<option value="StrikeType.ITM12">ITM12</option>
<option value="StrikeType.ITM11">ITM11</option>
<option value="StrikeType.ITM10">ITM10</option>
<option value="StrikeType.ITM9">ITM9</option>
<option value="StrikeType.ITM8">ITM8</option>
<option value="StrikeType.ITM7">ITM7</option>
<option value="StrikeType.ITM6">ITM6</option>
<option value="StrikeType.ITM5">ITM5</option>
<option value="StrikeType.ITM4">ITM4</option>
<option value="StrikeType.ITM3">ITM3</option>
<option value="StrikeType.ITM2">ITM2</option>
<option value="StrikeType.ITM1">ITM1</option>
<option value="StrikeType.ATM">ATM</option>
<option value="StrikeType.OTM1">OTM1</option>
<option value="StrikeType.OTM2">OTM2</option>
<option value="StrikeType.OTM3">OTM3</option>
<option value="StrikeType.OTM4">OTM4</option>
<option value="StrikeType.OTM5">OTM5</option>
<option value="StrikeType.OTM6">OTM6</option>
<option value="StrikeType.OTM7">OTM7</option>
<option value="StrikeType.OTM8">OTM8</option>
<option value="StrikeType.OTM9">OTM9</option>
<option value="StrikeType.OTM10">OTM10</option>
<option value="StrikeType.OTM11">OTM11</option>
<option value="StrikeType.OTM12">OTM12</option>
<option value="StrikeType.OTM13">OTM13</option>
<option value="StrikeType.OTM14">OTM14</option>
<option value="StrikeType.OTM15">OTM15</option>
<option value="StrikeType.OTM16">OTM16</option>
<option value="StrikeType.OTM17">OTM17</option>
<option value="StrikeType.OTM18">OTM18</option>
<option value="StrikeType.OTM19">OTM19</option>
<option value="StrikeType.OTM20">OTM20</option>
</select></Col>
  </Row>

  <Row style={{marginTop:40}}>
  <Col md={6}>Target Profit &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions,["targetProfit"]: !e})
            }}/>
            <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.targetProfit}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0" /></Col>
            </Row>
           
                
                
                
                </Col>
            <Col md={6}>Stop Loss &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions, ["stopLoss"]: !e})
            }}/> <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.stopLoss}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0"  disabled={tradingConditions.stopLoss}/></Col>
            </Row>
           </Col>

           <Col md={6}>Trail SL &nbsp; <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.stopLoss}>
                <option value="LegTgtSLType.Percentage">%</option>
                <option value="LegTgtSLType.Points">Pts</option>
                </select>
                </Col>
                <Col md={6}><input className="rs-input" style={{width: 60}} type="number" min="0"  disabled={tradingConditions.stopLoss}/></Col>
                <Col md={6}><input className="rs-input" style={{width: 60}} type="number" min="0"  disabled={tradingConditions.stopLoss}/></Col>
            </Row>
           </Col>
           <Col md={6}>&nbsp;<br /><br /><Button style={{width:120}}appearance="primary" onClick={handleAddCondition}>Add Leg</Button></Col>
  </Row>
</div>
    </Col>
  </Row>

  <Row style={{marginTop:50}}>
    <Col md={24}>
<p><b>Overall Strategy Settings</b> </p>
<p>&nbsp;</p>
<div>
  <Row >

<Col md={8}>Overall SL<br />
<input type="number" className="rs-input" min="0" style={{width:120}}/></Col>
<Col md={8}>Overall Target<br />
<input type="number" className="rs-input" min="0" style={{width:120}}/></Col>
  </Row>
</div>
    </Col>
  </Row>
<Row style={{marginTop:50, marginBottom:50}}>
  <Col md={12}>
  Trail stop loss to entry price&nbsp;<Toggle size="md"  onChange={(e)=>{settrailStopLoss(e)}}/>
  <br />
  <span style={{fontSize:11, fontStyle: "italic"}}>Only for legs with ‘Stop Loss’ enabled</span>
  <br /> <br />
  {trailStopLoss && <> <p style={{fontSize:11, fontStyle: "italic", width:500, background: "#e7e7e7", padding:20}}>
  When enabled, this setting gets active when Stop Loss of any one leg is hit.<br />
- The Stop Loss will change for all remaining legs(with Stop Loss) to their entry price.
<br />- The 'Overall SL' settings will have NO affect. It works as is.
  </p></>}
 
  </Col>
  <Col md={12}>
  <Button appearance="ghost" className={setIntervalB === '6M' ? 'active' : ''} onClick={() => {
  
  setIntervalButton("6M")
}}>6M</Button><Button appearance="ghost" className={setIntervalB === '1Y' ? 'active' : ''} onClick={() => {
  
  setIntervalButton("1Y")
}}>1Y</Button><Button appearance="ghost" className={setIntervalB === '2Y' ? 'active' : ''} onClick={() => {
  
  setIntervalButton("2Y")
}}>2Y</Button>
<Button appearance="ghost" className={setIntervalB === 'Custom' ? 'active' : ''} onClick={() => {
  
  setIntervalButton("Custom")
}}>Custom</Button><br />&nbsp;
{setIntervalB === 'Custom' && <p style={{display:"flex", alignItems:"center", gap:"3em", padding:10, background: "#e7e7e7"}}><span>From: <input type="date" className="rs-input" style={{width:130, display:"inline"}} defaultValue={currentDate} /></span> <span>to: <input type="date" className="rs-input" style={{width:130, display:"inline"}} defaultValue={yesterdayDate} /></span></p>}

  </Col>
</Row>
 </div>
  </>
}
