import React from "react";
import Chart from "react-apexcharts";
import { BookingData } from "../data/BookingData";


type SparklineChartProps = {
  data: BookingData[];
  metric: "adults" | "children" | "babies"; 
};

const SparklineChart: React.FC<SparklineChartProps> = ({ data, metric }) => {
 
  const series = [
    {
      name: metric, 
      data: data.map((item) => item[metric]), 
    },
  ];

  
  const options = {
    chart: { id: `${metric}-sparkline` },
    xaxis: { categories: data.map((_, index) => index + 1) }, 
    title: { text: `Total ${metric} Visitors`, align: "left" }, 
  };

  return <Chart options={options} series={series} type="line" />; 
};

export default SparklineChart;
