import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ActivitiesChart = ({ activities }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        width: '100%',
      },
      
      yaxis: {labels: {show: false}},
      fill: {
        colors: ['#58508d', '#b6b1a5']
      },
      stroke: {show: true,
      colors: ['#ECE3CA']},
      legend: {
        show: false,},
      responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },

          legend: {
            show: false,
            position: 'bottom'
          }
        }
      }],
    }
  });

  useEffect(() => {
    const totalActivities = activities;
    const goal = 600;
    const remaining = goal - totalActivities;

    setChartData({ ...chartData, series: [totalActivities, remaining],chart: {
      type: 'line',
      width: '100%'
    } });
  }, [activities]);

  return (
    <div style={{ width: "100%" }} className="w-full"><Chart class="md:h-full" options={chartData.options} series={chartData.series} type="donut" /></div>
  );
};

export default ActivitiesChart;