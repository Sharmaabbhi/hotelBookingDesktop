import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ColumnChartProps {
  data: { country: string; visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const chartOptions = {
    chart: {
      type: 'bar', 
    },
    xaxis: {
      categories: data.map((entry) => entry.country), 
    },
    plotOptions: {
      bar: {
        horizontal: false, 
      },
    },
    title: {
      text: 'Country-wise Visitor Count', 
      align: 'center', 
    },
  };

  const chartSeries = [
    {
      name: 'Visitor Count',
      data: data.map((entry) => entry.visitors), 
    },
  ];

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
