import ActivitiesList from '../components/ActivitiesList.astro';
import { useState, useEffect } from 'react';
import Chart from '../components/Donut.jsx';
import Line from '../components/Line.jsx';
import image from '../images/img.png'
import { getAllActivities, getSumActivities, createChartDataset, prepareBarChartData } from '../utils/firestore.js';
import Bar from '../components/Bar';


const allActivities = await getAllActivities();
const  athleteActivities =await getSumActivities(allActivities);
const barData= await prepareBarChartData(allActivities) 
let totalActivities=0;
allActivities.forEach(activity => {
		if (activity.date=== "2023") {
          
        } else
		{totalActivities+=1;}
      });
type AthleteActivity = {
  totalDistance: number;
  count: number;
  athleteName: string;
}; 
const lineDatas=await createChartDataset(allActivities);
const athleteActivitiesArray: AthleteActivity[] = Object.values(athleteActivities);

// Find the highest count of activities
const highestCount = Math.max(...athleteActivitiesArray.map(athlete => athlete.count));
const lowCount = Math.min(...athleteActivitiesArray.map(athlete => athlete.count));
// Filter out all athletes with the highest count
const topAthletes = athleteActivitiesArray.filter(athlete => athlete.count === highestCount);

// Extract names of top athletes
const topAthletesNames = topAthletes.map(athlete => athlete.athleteName);

// Filter out all athletes with the highest count
const bottomAthletes = athleteActivitiesArray.filter(athlete => athlete.count === lowCount);

// Extract names of top athletes
const bottomAthletesNames = bottomAthletes.map(athlete => athlete.athleteName);

// Create a string of names
let topNamesString = '';
if (topAthletesNames.length > 1) {
  // Join all names with commas and 'and' before the last name for proper grammar
  topNamesString = topAthletesNames.slice(0, -1).join(', ') + ' og ' + topAthletesNames[topAthletesNames.length - 1];
} else if (topAthletesNames.length === 1) {
  // If there's only one top athlete
  topNamesString = topAthletesNames[0];
}

let bottomNamesString = '';
if (bottomAthletesNames.length > 1) {
  // Join all names with commas and 'and' before the last name for proper grammar
  bottomNamesString = bottomAthletesNames.slice(0, -1).join(', ') + ' og ' + bottomAthletesNames[bottomAthletesNames.length - 1];
} else if (bottomAthletesNames.length === 1) {
  // If there's only one top athlete
  bottomNamesString = bottomAthletesNames[0];
}