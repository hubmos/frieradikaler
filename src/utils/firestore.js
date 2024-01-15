import db from '../server/firebase.js';



async function getAllActivities() {
  const activities = [];
  const snapshot = await db.collection('activities').get();
  snapshot.forEach(doc => {
    if (doc.date=== "2023") {
          
    } else
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
  if (Object.keys(athleteActivities).length===3) {
    athleteActivities['Krish'] = {
    totalDistance: 0,
    count: 0,
    athleteName: 'Krish'}};
      return Object.values(athleteActivities);
}

function getCurrentMonthDateRange() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
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
        console.log(activityDay, dateString)
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

    const athleteName = activity.athleteName;
    const elapsed_time =((activity.elapsed_time/60)/60);
    const distance = activity.distance / 1000;
    activity.athleteName;
    if (!athleteStats[athleteName]) {
      athleteStats[athleteName] = { activitiesCount: 0, totalDistance: 0, totalDuration: 0 };
    }

    athleteStats[athleteName].activitiesCount += 1;
    athleteStats[athleteName].totalDistance += distance; // Assuming distance is a number
    athleteStats[athleteName].totalDuration += elapsed_time; // Assuming duration is a number
    if (Object.keys(athleteStats).length===3) {
      athleteStats['Krish'] = {
      totalDistance: 0,
      activitiesCount: 0,
      totalDuration: 0}};
        return Object.values(athleteStats);
  });
  console.log(athleteStats)
  return athleteStats;
}

async function prepareBarChartData(activities) {
  const datas= await processAthleteData(activities)
  console.log(datas)
  const athletes = Object.keys(datas);
  const activitiesSeries = { name: 'Treningsøkt', data: [] };
  const lengthSeries = { name: 'Avstand dekket', data: [] };
  const durationSeries = { name: 'Timer brukt', data: [] };

  athletes.forEach(athlete => {
    activitiesSeries.data.push(datas[athlete].activitiesCount);
    lengthSeries.data.push(datas[athlete].totalDistance.toFixed(2));
    durationSeries.data.push(datas[athlete].totalDuration.toFixed(2));
  });

  return [athletes, activitiesSeries, lengthSeries, durationSeries];
}


export { getAllActivities, getSumActivities, createChartDataset, prepareBarChartData };
