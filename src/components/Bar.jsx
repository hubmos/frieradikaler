import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const getCurrentMonthDates = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    name: 'Veien te 600',
    data: [
      { x: startOfMonth.toISOString().split('T')[0], y: 0 }, // Start of month
      { x: endOfMonth.toISOString().split('T')[0], y: 12.5 } // End of month
    ],
    stroke: {
      color: '#808080', // Gray color
      dashArray: 5     // Dotted line (5 = dot pattern)
    }
  };
};

const ActivitiesCharts = ({ acts }) => {
  const [chartData, setChartData] = useState({
    series: [], // This will hold the data for each athlete
    options: {
      chart: {
        type: 'bar',
        width: '100%',
        toolbar: {
          show: true,}
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          }
        }
      }],
      xaxis: {
        categories: acts[0],
        labels: {

          style: {
            fontSize: '14',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
        },
        },
        
      },
      yaxis: {
        title: {
        },
        labels: {
          style: {
            fontSize: '14',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
        },},
      },
      colors: ['#58508d', '#bc5090', '#ff6361', '#ffa600','#003f5c'],
      stroke: {
        show: false    
      },
      grid: {show: false},
      fill: {
        type: ['solid', 'solid', 'solid', 'gradient']
      },
      tooltip: {
        x: {
          format: 'dd MM yyyy'
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  });

  useEffect(() => {
    if (acts && acts.length > 0) {
      console.log(acts[0])
      setChartData(chartData => ({
        ...chartData,
        series: acts.slice(1),
        chart: {
          type: 'bar',
          width: '100%'
        } // Combine acts and goal line data
      }));
    }
  }, acts);

  return (
    <div style={{ width: "90%" }} className="w-full"><Chart class="md:h-full" options={chartData.options} series={chartData.series} type="bar" /></div>
  );
};

export default ActivitiesCharts;