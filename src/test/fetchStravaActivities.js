// This file is for manually testing the Strava API functionality.
/* import dotenv from 'dotenv'; */
/* async function testStravaAPICalls() {
    // Assuming the .env.local file has SECRET_CLUB_ID variable set correctly
    const clubId = import.meta.env.CLUB_ID;
    
    try {
    console.log('Testing Strava API Access Token refresh');
    const newAccessToken = await refreshToken();
    console.log('New Access Token:', newAccessToken);
    import.meta.env.SECRET_ACCESS_TOKEN=newAccessToken;
    
    console.log(`\nFetching activities for club ID: ${clubId}`);
    const activities = await fetchActivities(1202414, newAccessToken);
    console.log('Activities fetched:', activities);
    } catch (error) {
    console.error('Test failed:', error);
    }
    }
    
    testStravaAPICalls(); 
 */