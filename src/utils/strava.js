

const tokenEndpoint = 'https://www.strava.com/oauth/token';

async function refreshToken() {
  console.log(import.meta.env.SECRET_REFRESH_TOKEN);
  try {
    const response = await fetch(tokenEndpoint, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      client_id: import.meta.env.SECRET_CLIENT_ID,
      client_secret: import.meta.env.SECRET_CLIENT_SECRET,
      refresh_token: import.meta.env.SECRET_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    })});
    const data = await response.json();
    console.log('got response', data)
    if (data && data.access_token) {
      // Here you would call the method to store the new access token in the database for persistence
      return data.access_token;
    }
    throw new Error("Failed to refresh access token.");
  } catch (error) {
    console.error('Error refreshing token:',  error );
    throw 'error';
  }
}

function createUniqueId(activity) {
  const athleteName = `${activity.athlete.firstname} ${activity.athlete.lastname}`;
  return `${athleteName}-${activity.name}-${activity.distance}-${activity.moving_time}-${activity.elapsed_time}-${activity.total_elevation_gain}-${activity.type}-${activity.sport_type}-${activity.workout_type}`;
}

async function fetchActivities(clubId, access_token) {
  try {
    if(!access_token) {
      throw new Error('Access token is not defined. Please refresh token.');
    }

    const endpoint = `https://www.strava.com/api/v3/clubs/${clubId}/activities`;
    const response = await fetch(endpoint, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });

    var d = new Date();

    var datestring = d.getFullYear()  + " " + String((d.getMonth()+1)).padStart(2, '0') + " " + String(d.getDate()).padStart(2, '0')  + " " +
    d.getHours() + ":" + d.getMinutes();
    const data = await response.json();
    return data.map(activity => ({
      
      name: activity.name,
      distance: activity.distance,
      athleteName: `${activity.athlete.firstname} ${activity.athlete.lastname}`,
      moving_time: activity.moving_time,
      total_elevation_gain: activity.total_elevation_gain,
      elapsed_time: activity.elapsed_time,
      date: datestring,
      id: createUniqueId(activity),
      type: activity.type,
      sport_type: activity.sport_type,
      workout_type: activity.workout_type
    }));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token might be expired
      var accesstoken=await refreshToken();
      // Retry fetching activities after refreshing token
      return fetchActivities(clubId, accesstoken);
    } else {
      // Handle other possible API errors appropriately.
      console.error('Error fetching activities:', error);
      throw error;
    }
  }
}

export { refreshToken, fetchActivities };
