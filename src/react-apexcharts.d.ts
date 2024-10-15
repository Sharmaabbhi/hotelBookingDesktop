declare module 'react-apexcharts' {
    import { Component } from 'react';
  
    interface ApexChartsProps {
      options: any;
      series: any[];
      type: string;
      height?: number | string;
      width?: number | string;
    }
  
    export default class ReactApexCharts extends Component<ApexChartsProps> {}
  }
  