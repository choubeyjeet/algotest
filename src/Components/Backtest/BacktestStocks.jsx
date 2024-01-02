import { useRef, useState } from "react";
import TrashIcon from '@rsuite/icons/Trash';
import { FaAngleDown, FaAngleUp, FaDownload, FaSave, FaPlay, FaInfoCircle, FaEdit,FaPlus } from "react-icons/fa";
import { SelectPicker,Row, Col, Button, Input, Panel, Affix, ButtonToolbar, ButtonGroup, Toggle, Tooltip, Whisper, InputGroup } from "rsuite";
import LogicBuilder from "../Logic/LogicBuilder";
import { useDispatch } from "react-redux";
import {formValue} from "../../features/Backtest/BackTestSlice";
import html2pdf from 'html2pdf.js';
import {ListedCompany} from "./ListedCompany";

const instrumentList =  ListedCompany.map(
    item => ({ label: item, value: item })
  );

  
export default function BacktestStocks() {
  const textInput = useRef(null)
    const dispatch = useDispatch()
    const [showEntry, setShowEntry] = useState(true);
    const [showExit, setShowExit] = useState(true);
    const [backtestName, setbacktestName] = useState("Backtest");
   const [logicValue, setLogicValue] = useState({"EntryIndicators": "", "ExitIndicators": ""});
  const [tradingConditions, setTradingConditions] = useState({
    targetProfit: true,
    stopLoss: true,
    trailSL: true,
    reEntryTgt: true,
    reEntrySL: true,
    simpleM: true
  });

const [formFields, setFormFileds] = useState({
    "PositionType": "",
    "Lots": 0,
    "timeframe":null,
    "Instrument": {
        "Type": "Stock",
        "Value":""
    },
   
    "LegTarget": {
        "Type": "LegTgtSLType.Percentage",
        "Value": null
    },
    "LegStopLoss": {
        "Type": "LegTgtSLType.Percentage",
        "Value": null
    },
    "LegTrailSL": {
        "Type": "TrailStopLossType.Percentage",
        "Value1": null,
        "Value2": null,
    },
    "LegReentryTP": {
        "Type": "ReentryType.Immediate",
        "Value": null
    },
    "LegReentrySL": {
        "Type": "ReentryType.Immediate",
        "Value": null
    },
    "LegMomentum": {
        "Type": "MomentumType.PointsUp",
        "Value": null
    },
    "StartDate":null,
    "EndDate":null
});
const [activeButton, setActiveButton] = useState(null);
const [activeCandle, setActiveCandle] = useState(null);
const [editable, setEditable] = useState(true);
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
   const setFormValueFinal = async (type, data) => {
    setLogicValue((prevLogicValue) => ({
      ...prevLogicValue,
      [type === "Entry" ? "EntryIndicators" : "ExitIndicators"]: data,
    }));
  
    
    const dispatchedData = await dispatch(formValue(logicValue));
  
    // console.log(logicValue); // This will log the previous state, not the updated state
  };
const saveStrategy = ()=>{
   
    
    var fjson  = {
        "name": backtestName, 
    
        "strategy": {
            "ListOfLegConfigs": [
                formFields
            ]
            ,
            logicValue
        },
        
    }
    const jsonString = JSON.stringify(fjson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download =  backtestName+'.json';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
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

  const editName = ()=>{
  
    setEditable(!editable);
    textInput.current.focus();
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
    <a onClick={saveStrategy} title="Save Strategy">
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
    <Button appearance="primary" onClick={saveStrategy}><FaSave /> &nbsp;Save Strategy</Button>
    </Col>
    <Col md={4} sm={24}>
    <Button appearance="primary" color="green"><FaPlay /> &nbsp;Start Backtest</Button>
    </Col>
    </Panel>
</Row>
</Affix> */}
  <Row>

    <Col md={12} style={{display: "flex", alignItems: "center", gap:"2em"}}><span><h4><input type="text" className="rs-input" style={{border: "none", borderBottom: "1px solid #000", borderRadius: "0px"}} defaultValue={backtestName} readOnly={editable} onChange={(e)=>{
      setbacktestName(e.target.value);
    }} ref={textInput} /></h4></span><span style={{cursor: "pointer"}} title="Edit Name">
     
      <FaEdit onClick={editName}/>
      
      </span></Col>
    <Col md={1}></Col>
    <Col md={5}><h6>Credits: 0</h6></Col>
    <Col md={5}><h6>Add Credits +</h6></Col>
  </Row>
  <hr />
  <div id="divToExport">
  <Row style={{marginTop: 30, marginBottom:30, padding: "3%", background: "#e7e7e7"}}>

    <Col md={6}><p>Search Instrument</p><SelectPicker data={instrumentList} style={{ width: 300 }}  onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      Instrument: {
        ...prevFormFields.Instrument,
        Value: e,
      },
    }));
  }}/></Col>
    <Col md={1}></Col>
    <Col md={3}><p>Position</p><Button appearance="ghost" className={activeButton === 'Buy' ? 'active' : ''} onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      PositionType: "Buy"
    }));
    setActiveButton("Buy")
  }}>Buy</Button><Button appearance="ghost" className={activeButton === 'Sell' ? 'active' : ''} onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      PositionType: "Sell"
    }));
    setActiveButton("Sell")
  }}>Sell</Button></Col>
    <Col md={1}></Col>
    <Col md={2}><p>Quantity</p><Input type="number" min="1" onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      "Lots": e
    }));
  }}/></Col>
    <Col md={1}></Col>
    <Col md={8}><p>Candle Intervals</p>
    <ButtonToolbar>
    <ButtonGroup>
    <Button appearance="ghost" className={activeCandle === '1m' ? 'active' : ''} onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      timeframe: "1m"
    }));
    setActiveCandle("1m")
  }}>1min</Button>
    <Button appearance="ghost" onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      timeframe: "3m"
    }));
    setActiveCandle("3m")
  }} className={activeCandle === '3m' ? 'active' : ''}>3min</Button>
    <Button appearance="ghost" onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      timeframe: "5m"
    }));
    setActiveCandle("5m")
  }} className={activeCandle === '5m' ? 'active' : ''}>5min</Button>
    <Button appearance="ghost" onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      timeframe: "15m"
    }));
    setActiveCandle("15m")
  }} className={activeCandle === '15m' ? 'active' : ''}>15min</Button>
    <Button appearance="ghost" onClick={() => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      timeframe: "1h"
    }));
    setActiveCandle("1h")
  }} className={activeCandle === '1h' ? 'active' : ''}>1hr</Button>
    </ButtonGroup>
  </ButtonToolbar>
    
    </Col>
  </Row>
   <div><h6 onClick={()=>{setShowEntry(!showEntry)}} style={{cursor: "pointer", display:"flex", alignItems:"center"}}>
      Entry When &nbsp; {showEntry ? <FaAngleDown />:<FaAngleUp />}</h6></div>
  <LogicBuilder display={showEntry} type="Entry" setFormValueFinal={setFormValueFinal}/>

  <div style={{marginTop:"5%"}}><h6 onClick={()=>{setShowExit(!showExit)}} style={{cursor: "pointer", display:"flex", alignItems:"center"}}>
      Exit When &nbsp; {showExit ? <FaAngleDown />:<FaAngleUp />}</h6></div>
  <LogicBuilder display={showExit} type="Exit" setFormValueFinal={setFormValueFinal}/>
 
  <Row style={{marginTop:50}}>
    <Col md={24}>
        <h5>
        Trading Conditions
        </h5>
        <Row style={{padding:30, background: "#e7e7e7"}}>
         
            <Col md={8}>Target Profit &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions,["targetProfit"]: !e})
            }}/>
            <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.targetProfit} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegTarget: {
        ...prevFormFields.LegTarget,
        Type: e.target.value,
      },
    }));
  }} >
                <option value="LegTgtSLType.Percentage">Percent(%)</option>
                <option value="LegTgtSLType.Points">Points(Pts)</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0" disabled={tradingConditions.targetProfit} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegTarget: {
        ...prevFormFields.LegTarget,
        Value: e.target.value,
      },
    }));
  }}/></Col>
            </Row>
           
                
                
                
                </Col>
            <Col md={8}>Stop Loss &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions, ["stopLoss"]: !e})
            }}/> <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}}  disabled={tradingConditions.stopLoss} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegStopLoss: {
        ...prevFormFields.LegStopLoss,
        Type: e.target.value,
      },
    }));
  }}>
                <option value="LegTgtSLType.Percentage">Percent(%)</option>
                <option value="LegTgtSLType.Points">Points(Pts)</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0" disabled={tradingConditions.stopLoss} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegStopLoss: {
        ...prevFormFields.LegStopLoss,
        Value: e.target.value,
      },
    }));
  }}/></Col>
            </Row>
           </Col>
            <Col md={8}>Trail SL  <Whisper followCursor speaker={<Tooltip>With trailing SL, you can move your actual stop loss, whenever the price moves in your favor. So every time the instrument moves in your favor by X amount, we will move the stop loss Y amount in the same direction. Amount can be in terms of points or percentage.</Tooltip>}>
   <span style={{cursor: "pointer", verticalAlign:"-2px"}}><FaInfoCircle /></span>
  </Whisper>&nbsp;&nbsp;<Toggle size="md"  onChange={(e)=>{

setTradingConditions({...tradingConditions, ["trailSL"]: !e})
            }}/> <br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}}  disabled={tradingConditions.trailSL} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegTrailSL: {
        ...prevFormFields.LegTrailSL,
        Type: e.target.value,
      },
    }));
  }}>
                <option value="TrailStopLossType.Percentage">Percent(%)</option>
                <option value="TrailStopLossType.Points">Points(Pts)</option>
                </select>
                </Col>
                <Col md={6}><input className="rs-input" style={{width: 80}} type="number" min="1"  disabled={tradingConditions.trailSL} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegTrailSL: {
        ...prevFormFields.LegTrailSL,
        Value1: e.target.value,
      },
    }));
  }}/></Col> <Col md={6}><input className="rs-input" style={{width: 80}} type="number" min="1"  disabled={tradingConditions.trailSL} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegTrailSL: {
        ...prevFormFields.LegTrailSL,
        Value2: e.target.value,
      },
    }));
  }}/></Col>
            </Row>
           </Col>
        </Row>
        <Row style={{padding:30, background: "#e7e7e7"}}>
         
            <Col md={8}>Re-entry on Tgt &nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions, ["reEntryTgt"]: !e})
            }}/><br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.reEntryTgt} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegReentryTP: {
        ...prevFormFields.LegReentryTP,
        Type: e.target.value,
      },
    }));
  }}>
                <option value="ReentryType.Immediate" >RE ASAP</option><option value="ReentryType.ImmediateReverse" >RE ASAP ↩</option><option value="ReentryType.LikeOriginal" >RE MOMENTUM</option><option value="ReentryType.LikeOriginalReverse">RE MOMENTUM ↩</option><option value="ReentryType.AtCost">RE COST</option><option value="ReentryType.AtCostReverse">RE COST ↩</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="1" disabled={tradingConditions.reEntryTgt} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegReentryTP: {
        ...prevFormFields.LegReentryTP,
        Value: e.target.value,
      },
    }));
  }}/></Col>
            </Row></Col>
            <Col md={8}>Re-entry on SL <Whisper followCursor speaker={<Tooltip>With trailing SL, you can move your actual stop loss, whenever the price moves in your favor. So every time the instrument moves in your favor by X amount, we will move the stop loss Y amount in the same direction. Amount can be in terms of points or percentage.</Tooltip>}>
   <span style={{cursor: "pointer", verticalAlign:"-2px"}}><FaInfoCircle /></span>
  </Whisper>&nbsp;&nbsp;<Toggle size="md" onChange={(e)=>{

setTradingConditions({...tradingConditions, ["reEntrySL"]: !e})
            }}/><br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.reEntrySL} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegReentrySL: {
        ...prevFormFields.LegReentrySL,
        Type: e.target.value,
      },
    }));
  }}>
                <option value="ReentryType.Immediate">RE ASAP</option><option value="ReentryType.ImmediateReverse">RE ASAP ↩</option><option value="ReentryType.LikeOriginal">RE MOMENTUM</option><option value="ReentryType.LikeOriginalReverse">RE MOMENTUM ↩</option><option value="ReentryType.AtCost">RE COST</option><option value="ReentryType.AtCostReverse">RE COST ↩</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="1" disabled={tradingConditions.reEntrySL} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegReentrySL: {
        ...prevFormFields.LegReentrySL,
        Value: e.target.value,
      },
    }));
  }}/></Col>
            </Row></Col>
            <Col md={8}>Simple Momentum <Whisper followCursor speaker={<Tooltip>With trailing SL, you can move your actual stop loss, whenever the price moves in your favor. So every time the instrument moves in your favor by X amount, we will move the stop loss Y amount in the same direction. Amount can be in terms of points or percentage.</Tooltip>}>
   <span style={{cursor: "pointer", verticalAlign:"-2px"}}><FaInfoCircle /></span>
  </Whisper>&nbsp;&nbsp;<Toggle size="md" onChange={(e)=>{
setTradingConditions({...tradingConditions, ["simpleM"]: !e})
            }}/><br/><br/>
            <Row>
                <Col md={9}> <select className="rs-input" style={{ background:"#10122b", color:"#ffffff"}} disabled={tradingConditions.simpleM} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegMomentum: {
        ...prevFormFields.LegMomentum,
        Value: e.target.value,
      },
    }));
  }}>
                <option value="MomentumType.PointsUp">Points (Pts) ↑</option><option value="MomentumType.PointsDown">Points (Pts) ↓</option><option value="MomentumType.PercentageUp">Percent (%) ↑</option><option value="MomentumType.PercentageDown">Percent (%) ↓</option>
                </select>
                </Col>
                <Col md={12}><input className="rs-input" style={{width: 100}} type="number" min="0" disabled={tradingConditions.simpleM} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
      LegMomentum: {
        ...prevFormFields.LegMomentum,
        Value: e.target.value,
      },
    }));
  }}/></Col>
            </Row></Col>
        </Row>
    </Col>
 </Row>
 <Row style={{marginTop:50}}>
    <Col md={24}>
        <h5>
        Date
        </h5>
        <Row style={{padding:30, background: "#e7e7e7"}}>
            <Col md={10} sm={24}>Enter the duration of your backtest</Col>
            <Col md={6} sm={24}>Start Date: <input type="date" defaultValue={currentDate} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
     StartDate: e.target.value
    }));
  }}/></Col>
            <Col md={6} sm={24}>End Date: <input type="date" defaultValue={yesterdayDate} onChange={(e) => {
    setFormFileds((prevFormFields) => ({
      ...prevFormFields,
     EndDate: e.target.value
    }));
  }}/></Col>
        </Row>
    </Col>
 </Row>
 </div>
  </>
}
