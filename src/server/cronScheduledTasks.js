/* import cron from 'node-cron';
import { fetchActivities } from '../utils/strava.js';
import { insertActivity } from '../utils/firestore.js';

const clubId = import.meta.env.SECRET_CLUB_ID; 

cron.schedule('* * * * *', async () => {
  try {
    console.log('Updating Strava activities...');
    const activities = await fetchActivities(clubId, import.meta.env.SECRET_ACCESS_TOKEN);
    for (const activity of activities) {
      await insertActivity({
        name: activity.name,
        distance: activity.distance,
        athleteName: activity.athleteName,
        moving_time: activity.moving_time,
        total_elevation_gain: activity.total_elevation_gain,
        elapsed_time: activity.elapsed_time,
        date: activity.date,
        id: activity.id,
        type: activity.type,
        sport_type: activity.sport_type,
        workout_type: activity.workout_type
      });
    }
    console.log('Strava activities updated successfully.');
  } catch (error) {
    console.error('Failed to update Strava activities:', error);
  }
}, {
  scheduled: true,
  timezone: "UTC"
});
 */