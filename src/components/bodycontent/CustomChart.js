import { useEffect, useState } from "react";
import "./CustomChart.css";
import Chart from "react-apexcharts";



const CustomChart=(props)=>{
     const [chartconfig, setChartconfig]= useState();
     const [width,setWidth]=useState();
     const [height,setHeight]=useState();
     useEffect(()=>{
      const {innerWidth, innerHeight} = window;
      console.log(innerWidth,innerHeight);
      const width1=innerWidth*0.7;
      const height1=innerHeight*0.65;
      setWidth(width1);
      setHeight(height1);
        setChartconfig(
            {
                options: {
                  chart: {
                    id: "line",
                    
                  },
                  colors:[props.color],
                  xaxis: {
                    categories: props.xdata,
                    title: {
                      text: 'Output Power (W)',
                      style:{
                        fontSize: "20px",
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                    }
                  },
                  title:{
                    text: props.title,
                    align: 'center',
                    style:{
                        fontSize: "28px",
                        fontWeight: 'bold',
                        color: '#263238'
                    },
                  },
                  legend:{
                     position:'top',
                     horizontalAlign:'right',
                     floating:true,
                     offsetY: -25,
                     offsetX: -5
                  },
                  dataLabels:{
                    enabled:true
                  }
                },
                
                series: [
                  {
                    name: props.ylabel,
                    data:props.ydata,
                    
                  }
                ],
              }
        );
     },[]);
    return(
      <div className="chart_container">
        {chartconfig?<Chart
        options={chartconfig.options}
        series={chartconfig.series}
        type="line"
        width={width}
        height={height}
  />:null}
  </div>
    );
}

export default CustomChart;