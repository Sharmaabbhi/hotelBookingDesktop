import React from "react";
import Chart from "react-apexcharts";
import { BookingData } from "../data/BookingData";

type CountryVisitorsChartProps = {
  data: BookingData[]; 
};

const CountryVisitorsChart: React.FC<CountryVisitorsChartProps> = ({ data }) => {
  
  const visitorCountByCountry = data.reduce((totals, booking) => {
    const totalVisitors = booking.adults + booking.children + booking.babies;
    totals[booking.country] = (totals[booking.country] || 0) + totalVisitors;
    return totals;
  }, {} as Record<string, number>);

  const countryNames = Object.keys(visitorCountByCountry);
  const series = [{ name: "Total Visitors", data: Object.values(visitorCountByCountry) }];

  const chartOptions = {
    chart: { id: "country-visitors-chart" }, 
    xaxis: { categories: countryNames }, 
    title: { text: "Number of Visitors by Country", align: "left" }, 
  };

  return <Chart options={chartOptions} series={series} type="bar" height={350} />;
};

export default CountryVisitorsChart;
