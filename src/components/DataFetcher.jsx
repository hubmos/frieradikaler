import {ActivitiesList} from '../components/ActivitiesList.astro';
import { useState, useEffect } from 'react';
import {Chart} from '../components/Donut.jsx';
import {Line} from '../components/Line.jsx';
import { getAllActivities, getSumActivities, createChartDataset, prepareBarChartData } from '../utils/firestore.js';
import {Bar} from '../components/Bar';

function formatNames(names) {
  if (names.length > 1) {
      return `${names.slice(0, -1).join(', ')} og ${names[names.length - 1]}`;
  }
  return names[0] || '';
}

const DataFetcher = () => {
  const [allActivities, setAllActivities] = useState([]);
  const [processedData, setProcessedData] = useState({}); // Store processed data here

  
  useEffect(() => {
    const fetchData = async () => {
      const activities = await getAllActivities();
      setAllActivities(activities);
      
      // Process data here
      const athleteActivities = await getSumActivities(activities);
      const lineDatas = await createChartDataset(activities);
      const barData = await prepareBarChartData(activities);
      
      let totalActivities=0;
      allActivities.forEach(activity => {
          if (activity.date=== "2023") {
                
              } else
          {totalActivities+=1;}
            });
        const athleteActivitiesArray = Object.values(athleteActivities);
        let highestCount = -Infinity, lowCount = Infinity;
        const nameCounts = athleteActivitiesArray.reduce((acc, athlete) => {
          highestCount = Math.max(highestCount, athlete.count);
          lowCount = Math.min(lowCount, athlete.count);
          if (!acc[athlete.count]) acc[athlete.count] = [];
          acc[athlete.count].push(athlete.athleteName);
          return acc;
        }, {});

        const topAthletesNames = nameCounts[highestCount] || [];
        const bottomAthletesNames = nameCounts[lowCount] || [];

        const topNamesString = formatNames(topAthletesNames);
        const bottomNamesString = formatNames(bottomAthletesNames);
      // Set the processed data
      setProcessedData({ athleteActivities, chartData, barData, topNamesString, bottomNamesString, lineDatas });
    };

    fetchData();
  }, []);
  if (!processedData.athleteActivities || !processedData.lineDatas || !processedData.barData) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div><h1 class="text-5xl font-bold md:text-center object-center justify-center">Denna måneden</h1>
		<div class="h-20"></div> 
		<div class="text-3xl font-bold  md:text-center">Antall aktiviteta per pers</div>
		<div class="object-center justify-center"><Chart activities={processedData.totalActivities} /></div>
		<div class="h-10"></div> 
    <div class="flex flex-col w-full "><ActivitiesList athleteActivities={processedData.athleteActivities}/></div>
		<div class="h-20"></div> 
		<div class="h-20"></div> 
    <div class="object-center justify-center text-3xl font-bold text-center mx-4">{processedData.topNamesString}</div>
    <div class="object-center justify-center text-2xl text-center mx-4">ligg jævlig bra ann.</div>
		<div class="h-20"></div> 
		<div class="h-20"></div> 
    <div class=" text-3xl font-bold text-center object-center justify-center mx-4">{processedData.bottomNamesString}</div>
    <div class="text-2xl text-center object-center justify-center mx-4">ligg jævlig dårlig ann.</div>
		<div class="h-20"></div> 
		<div class="h-20"></div> 
		<div class="mx-4 text-3xl font-bold text-center object-center justify-center">Månedens straff:</div>
    <div class="text-2xl text-center object-center justify-center">TBA</div>
		<div class="h-20"></div> 
		<div class="divider mx-20"></div> 
    <section id="year" class="mx-4text-4xl font-bold text-center"></section>
		<div class=" h-20"></div>
		<h1 class="text-5xl font-bold text-center object-center justify-center">Året</h1>
		<div class=" h-20"></div>
		<div class="text-3xl font-bold text-center object-center justify-center ">Fremgangen</div>
    <div class="object-center justify-center"><Line activities={processedData.lineDatas}  /></div>
		<div class="h-20"></div> 
		<div class="h-20"></div> 
		<div class="mx-4 text-3xl font-bold text-center object-center justify-center">Samla tall</div>
		<div class="object-center justify-center"><Bar acts={processedData.barData}  /></div>
		<div class="h-20"></div> 
		<div class="flex justify-center items-center">
		<div class="object-center justify-center"><RoadMapComp totaleAkts={processedData.totalActivities}/></div></div></div>
  );
};

export default DataFetcher;