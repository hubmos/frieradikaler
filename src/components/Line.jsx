import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1,5);
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

/* const getCurrentMonthDates = () => {
  
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
}; */

const ActivitiesChart = ({ activities }) => {
  const [chartData, setChartData] = useState({
    series: [], // This will hold the data for each athlete
    options: {
      chart: {
        type: 'line',
        width: '100%',
        toolbar: {
          show: false,}
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
        type: 'datetime',
        labels: {
          format: 'dd-MM',
          style: {
            fontSize: '14',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
        },
        },
        title: {
          text: 'Date'
        },
        min: startOfMonth,
        max: now,
        
      },
      yaxis: {
        title: {
        },
        labels: {
          formatter: function (val) {
                return val.toFixed(0);
                    },
          style: {
            fontSize: '14',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
        },}
      },
      colors: ['#58508d', '#bc5090', '#ff6361', '#003f5c', '#ffa600',],
      stroke: {
        width: [3, 3, 3, 3, 2],
        curve: ['smooth','smooth','smooth','smooth','smooth'],
        dashArray: [0, 0, 0, 0, 5]      
      },
      grid: {show: false},
      fill: {
        type: ['solid', 'solid', 'solid', 'solid', 'gradient']
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
    if (activities && activities.length > 0) {
      // Optional: Filter activities to include only those within the current month

      
      /* const goalLineData = getCurrentMonthDates(); */
      setChartData(chartData => ({
        ...chartData,
        series: [...activities],
        chart: {
          type: 'line',
          width: '100%'
        } // Combine activities and goal line data
      }));
    }
  }, [activities]);

  return (
    <div style={{ width: "90%" }} className="w-full"><Chart class="md:h-full" options={chartData.options} series={chartData.series} type="line" /></div>
  );
};

export default ActivitiesChart;
