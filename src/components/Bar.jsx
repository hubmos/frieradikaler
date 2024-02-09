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
  const [selectedActivity, setSelectedActivity] = useState('Totalt');
  const [chartData, setChartData] = useState({
    series: [], // This will hold the data for each athlete
    options: {
      chart: {
        type: 'bar',
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
          formatter: function (val) {
                return val.toFixed(0);
          },
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
    const filteredSeries = acts.find(serie => serie.name === selectedActivity);
    setChartData(chartData => ({
      ...chartData,
      series: [
        { name: 'Antall', data: filteredSeries.data },
        { name: 'Mil dekket', data: filteredSeries.distance },
        { name: 'Timer brukt', data: filteredSeries.duration }
      ]
    }));
  }, [selectedActivity, acts]);

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <div>
      <div class="flex flex-col w-full"><div class="justify-self-center content-center"><select className="select select-bordered select-sm w-full max-w-xs" onChange={handleActivityChange}>
        <option value="Totalt">Totalt</option>
        <option value="Sykkel">Sykkel</option>
        <option value="Løping">Løping</option>
        <option value="Styrke">Styrke</option>
        <option value="Ski">Ski</option>
      </select></div></div>
      <div style={{ width: "90%" }} className="w-full">
        <Chart options={chartData.options} series={chartData.series} type="bar" />
      </div>
    </div>
  );
};

export default ActivitiesCharts;
