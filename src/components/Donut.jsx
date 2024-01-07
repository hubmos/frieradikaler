import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ActivitiesChart = ({ activities }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        width: '10%',
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
        options: {
          chart: {
            width: '10%',
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

    setChartData({ ...chartData, series: [totalActivities, remaining] });
  }, [activities]);

  return (
    <div style={{ width: "100%" }} className="w-full"><Chart  options={chartData.options} series={chartData.series} type="donut" /></div>
  );
};

export default ActivitiesChart;