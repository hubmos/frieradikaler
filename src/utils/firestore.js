import db from '../server/firebase.js';

async function insertActivity({ id, name, athleteName, distance, date, moving_time, total_elevation_gain, elapsed_time, type, sport_type, workout_type }) {
  const activityRef = db.collection('activities');
  const activityQuery = activityRef.where('id', '==', id).limit(1);
  
  const querySnapshot = await activityQuery.get();

  // Check if activity already exists
  if (querySnapshot.empty) {
    // Activity does not exist, add new activity
    await activityRef.add({
      id,
      name,
      athleteName,
      distance,
      date: date,
      moving_time,
      total_elevation_gain,
      elapsed_time,
      type,
      sport_type,
      workout_type: workout_type
    });
    console.log(`Activity with ID ${id} added.`);
  } else {
    console.log(`Activity with ID ${id} already exists.`);
  }
}

async function getAllActivities() {
  const activities = [];
  const snapshot = await db.collection('activities').get();
  snapshot.forEach(doc => {
    activities.push({ id: doc.id, ...doc.data() });
  });
  return activities;
}


async function getSumActivities(activities) {
  let athleteActivities = {};

  activities.forEach(activity => {
    const athleteName = activity.athleteName; // assuming athleteName is a field in your Firestore document

    if (!athleteActivities[athleteName]) {
      athleteActivities[athleteName] = {
        totalDistance: 0,
        count: 0,
        athleteName
      };
    }
    if (activity.date === "2023") {
      return;
    }

    athleteActivities[athleteName].totalDistance += activity.distance / 1000;
    athleteActivities[athleteName].count += 1;
  });
      return Object.values(athleteActivities);
}

async function getSumMonthActivities(activities, prev) {
  let athleteActivities = {};
  let currMonth = new Date().getMonth();
  if(prev) {
    if (currMonth==0) return Object.values({'ingen': {'count':0}});
    else currMonth-=1}
  activities.forEach(activity => {
    const athleteName = activity.athleteName; // assuming athleteName is a field in your Firestore document

    if (!athleteActivities[athleteName]) {
      athleteActivities[athleteName] = {
        totalDistance: 0,
        count: 0,
        athleteName
      };
    }
    if (activity.date === "2023") {
      return;
    }
    const month=activity.date.split(' ')[1];
   if(month!=(currMonth+1)) {
    return;}
    

    athleteActivities[athleteName].totalDistance += activity.distance / 1000;
    athleteActivities[athleteName].count += 1;
  });
      return Object.values(athleteActivities);
}

function getCurrentMonthDateRange() {
  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1,5);
  return { start: firstDayOfMonth, end: today };
}

async function groupActivitiesByAthlete() {
  const activities = await getAllActivities();

  if (!Array.isArray(activities) || activities.length === 0) {
    console.error('No activities found or the data is not in array format');
    return {}; // Return an empty object or handle the error as needed
  }

  const activitiesByAthlete = {};
  activities.forEach(activity => {
    const { athleteName } = activity;
    if (!activitiesByAthlete[athleteName]) {
      activitiesByAthlete[athleteName] = [];
    }
    activitiesByAthlete[athleteName].push(activity);
  });

  return activitiesByAthlete;
}

function groupActivitiesByDate(activitiesByAthlete) {
  Object.keys(activitiesByAthlete).forEach(athlete => {
    const activities = activitiesByAthlete[athlete];
    const activitiesByDate = {};

    activities.forEach(activity => {
      const { date } = activity; // Assuming date is in 'YYYY-MM-DD' format
      if (!activitiesByDate[date]) {
        activitiesByDate[date] = 0;
      }
      activitiesByDate[date]++;
    });

    activitiesByAthlete[athlete] = activitiesByDate;
  });

  return activitiesByAthlete;
}

function prepareDatasetForMonthChart(activitiesByAthlete) {
  const series = [];
  const { start, end } = getCurrentMonthDateRange();

  Object.keys(activitiesByAthlete).forEach(athlete => {
    let cumulativeCount = 0;
    const data = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
      let foundActivity = false;

      // Check if there's an activity on this date
      Object.keys(activitiesByAthlete[athlete]).forEach(activityDate => {
        const activityDay = activityDate.substring(0, 10).replace(/ /g, '-'); ; // Extract just the 'YYYY MM DD' part
        if (activityDay === dateString) {
          cumulativeCount += activitiesByAthlete[athlete][activityDate];
          foundActivity = true;
        }
      });

      if (!foundActivity) {
        // No activity on this day, but we still add the data point
        data.push({ x: dateString, y: cumulativeCount });
      } else {
        // Activity found, add the updated cumulative count
        data.push({ x: dateString, y: cumulativeCount });
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    series.push({ name: athlete, data });
  });
  let currentDate = new Date(start);
  let cumulativeCount = 0;
  const data = [];
  while (currentDate <= end) {
    const dateString = currentDate.toISOString().split('T')[0];
    cumulativeCount += 0.41
    data.push({ x: dateString, y: cumulativeCount });
    currentDate.setDate(currentDate.getDate() + 1);
    }
    series.push({ name: 'Veien te 600', data });
  return series;
}


async function createChartDataset(ac) {
  const activitiesByAthlete = await groupActivitiesByAthlete(ac);
  const activitiesGroupedByDate = groupActivitiesByDate(activitiesByAthlete);
  return prepareDatasetForMonthChart(activitiesGroupedByDate);
}

// Use this function to get your chart dataset
createChartDataset().then(dataset => {
  // Use `dataset` for your line chart
});

async function processAthleteData(activities) {
  const athleteStats = {};
  activities.forEach(activity => {
    if (activity.date === "2023") {
      return;
    }

    const athleteName = activity.athleteName.split(' ')[0];
    const elapsed_time =((activity.elapsed_time/60)/60);
    const distance = activity.distance / 10000;
    activity.athleteName;
    if (!athleteStats[athleteName]) {
      athleteStats[athleteName] = { activitiesCount: 0, totalDistance: 0, totalDuration: 0, runs: 0, runDist: 0, runDur: 0, bikes: 0, bikeDist: 0, bikeDur: 0, skis: 0, skiDist: 0, skiDur: 0, weights: 0, wDist: 0, wDur: 0 };
    }

    athleteStats[athleteName].activitiesCount += 1;
    athleteStats[athleteName].totalDistance += distance; // Assuming distance is a number
    athleteStats[athleteName].totalDuration += elapsed_time; // Assuming duration is a number
if (activity.type=="Run") {
  athleteStats[athleteName].runs += 1;
  athleteStats[athleteName].runDist += distance; // Assuming distance is a number
  athleteStats[athleteName].runDur += elapsed_time; // Assuming duration is a number
}
else if (activity.type=="VirtualRide") {
  athleteStats[athleteName].bikes += 1;
  athleteStats[athleteName].bikeDist += distance; // Assuming distance is a number
  athleteStats[athleteName].bikeDur += elapsed_time; // Assuming duration is a number
}
else if (activity.type=="NordicSki") {
  athleteStats[athleteName].skis += 1;
  athleteStats[athleteName].skiDist += distance; // Assuming distance is a number
  athleteStats[athleteName].skiDur += elapsed_time; // Assuming duration is a number
}
else if (activity.type=="WeightTraining" || activity.type=="Workout") {
  athleteStats[athleteName].weights += 1;
  athleteStats[athleteName].wDist += distance; // Assuming distance is a number
  athleteStats[athleteName].wDur += elapsed_time; // Assuming duration is a number
}
        return Object.values(athleteStats);
  });
  return athleteStats;
}

async function prepareBarChartData(activities) {
  const datas = await processAthleteData(activities);
  const athletes = Object.keys(datas);

  // Existing series
  const activitiesSeries = { name: 'Totalt',data: [], distance: [], duration: [] };

  // New series for activity types with additional details for duration and length
  const runsSeries = { name: 'Løping', data: [], distance: [], duration: [] };
  const bikesSeries = { name: 'Sykkel', data: [], distance: [], duration: [] };
  const skisSeries = { name: 'Ski', data: [], distance: [], duration: [] };
  const weightsSeries = { name: 'Styrke', data: [], distance: [], duration: [] };

  athletes.forEach(athlete => {
    activitiesSeries.data.push(datas[athlete].activitiesCount);
    activitiesSeries.distance.push(parseFloat(datas[athlete].totalDistance.toFixed(2)));
    activitiesSeries.duration.push(parseFloat(datas[athlete].totalDuration.toFixed(2)));

    // Populating the new series
    runsSeries.data.push(datas[athlete].runs);
    runsSeries.distance.push(parseFloat(datas[athlete].runDist.toFixed(2)));
    runsSeries.duration.push(parseFloat(datas[athlete].runDur.toFixed(2)));

    bikesSeries.data.push(datas[athlete].bikes);
    bikesSeries.distance.push(parseFloat(datas[athlete].bikeDist.toFixed(2)));
    bikesSeries.duration.push(parseFloat(datas[athlete].bikeDur.toFixed(2)));

    skisSeries.data.push(datas[athlete].skis);
    skisSeries.distance.push(parseFloat(datas[athlete].skiDist.toFixed(2)));
    skisSeries.duration.push(parseFloat(datas[athlete].skiDur.toFixed(2)));

    weightsSeries.data.push(datas[athlete].weights);
    weightsSeries.distance.push(parseFloat(datas[athlete].wDist.toFixed(2)));
    weightsSeries.duration.push(parseFloat(datas[athlete].wDur.toFixed(2)));
  });

  return [athletes, activitiesSeries, runsSeries, bikesSeries, skisSeries, weightsSeries];
}



export { insertActivity, getAllActivities, getSumActivities, createChartDataset, prepareBarChartData, getSumMonthActivities };
