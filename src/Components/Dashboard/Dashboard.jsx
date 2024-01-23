import ReactApexChart from "react-apexcharts";
import { Col, Row, Panel } from "rsuite"
import "./assets/css/dashboard.css";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
const data ={ series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  },


};

export default function Dashboard () {
    return <>
    
    <Row>

        <Col md={1}></Col>
        <Col md={13}>


        <Row >

            <Col md={14}><Panel bordered header="Balance Overview" className="cardSBasic">
    <h5>USD 10,000</h5>
    <div className="cardFlex">
<div ><p><FaArrowCircleUp />&nbsp;<b>
Profit
</b> </p>
<p>USD 30,000</p>
</div>
<div><div className="borderRight"></div></div>
<div ><p><FaArrowCircleDown />&nbsp;<b>Expenses</b> </p>
<p>USD 20,000</p></div>
  </div>
  </Panel>
 
  </Col>
            <Col md={10}><Panel bordered header="Total Savings" className="cardSBasic">
            <h5>USD 5,000</h5>
    </Panel></Col>
        </Row>
<Row style={{marginTop:50}}>
    <Col md={24}><ReactApexChart options={data.options} series={data.series} type="bar"  /></Col>
</Row>



<Row style={{marginTop:50}}>

            <Col md={14}><Panel bordered header="Trading" className="cardSBasic2">
    <h5>USD 10,000</h5>
    <div className="cardFlex">
<div ><p><FaArrowCircleUp />&nbsp;<b>
Profit
</b> </p>
<p>USD 30,000</p>
</div>
<div><div className="borderRight"></div></div>
<div ><p><FaArrowCircleDown />&nbsp;<b>Expenses</b> </p>
<p>USD 20,000</p></div>
  </div>
  </Panel>
 
  </Col>
            <Col md={10}><Panel bordered header="Investment Overview" className="cardSBasic2">
            <h5>USD 5,000</h5>
    </Panel></Col>
        </Row>
        </Col>
        <Col md={9}>Hellos</Col>
        <Col md={1}></Col>
    </Row>
    
    </>
}