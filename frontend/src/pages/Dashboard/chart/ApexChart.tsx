import React, { useState } from 'react';
import ReactApexCharts from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';

const MyChart: React.FC = () => {
  const [options, setOptions] = useState<any>({
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
  });
  const [series, setSeries] = useState<any>([{
    name: 'Asia',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    name: 'America',
    data: [35, 45, 45, 55, 49, 65, 75, 91]
  }]);
  return (
    <div id="chart">
      <ReactApexCharts options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default MyChart;


