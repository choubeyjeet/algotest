import React, { useState } from "react";
import BacktestStocks from "./BacktestStocks";
import BacktestSimple from "./BacktestSimple";



export default function HomeBackTestMain({show}) { 

    return <>
    {show==="Stocks" && <BacktestStocks />}
    {show==="Simple" && <BacktestSimple />}
    {show==="Straddle" && <>Straddle</>}
    {show==="VWAP" && <>VWAP</>}
    </>


}