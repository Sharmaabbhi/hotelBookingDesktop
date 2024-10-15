import React from "react";
import Chart from "react-apexcharts";
import { BookingData } from "../data/BookingData";

type TimeSeriesChartProps = {
  data: BookingData[];
};

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  
  const series = [
    {
      name: "Visitors",
      data: data.map((item) => ({
        x: new Date(
          Number(item.arrival_date_year),
          Number(item.arrival_date_month) - 1, 
          Number(item.arrival_date_day_of_month)
        ),
        y: item.adults + item.children + item.babies, 
      })),
    },
  ];

  
  const options = {
    chart: { id: "visitors-timeseries" }, 
    xaxis: { type: "datetime" }, 
    yaxis: { title: { text: "Number of Visitors" } }, 
    title: { text: "Visitors per Day", align: "left" }, 
  };

  return <Chart options={options} series={series} type="line" />; 
};

export default TimeSeriesChart;
