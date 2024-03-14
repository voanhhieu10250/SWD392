import React from 'react';
import ReactApexCharts from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';


class MyChart extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            type: 'line'
          },
          legend: {
            show: true,
            position: 'top' // Change position as needed
          },
          series: [{
            name: 'Asia',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
          {
            name: 'America',
            data: [35, 45, 45, 55, 49, 65, 75, 91]
          }],
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'Asia',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: 'America',
          data: [35, 45, 45, 55, 49, 65, 75, 91]
        }]
      };
    }
  
    render() {
      return (
        <div id="chart">
          <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
      );
    }
  }
  
  export default MyChart;
  