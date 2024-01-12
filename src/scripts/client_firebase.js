// Firebase Client-Side Initialization
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);



const app=initializeApp(firebaseConfig);



// Register Service Worker
navigator.serviceWorker.register('/frieradikaler/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
    const messaging = getMessaging(app);
    return getToken(messaging, { vapidKey: process.env.VAPID_KEY, serviceWorkerRegistration: registration}, );
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('success', currentToken);
      // Send the token to your server and update the UI if necessary
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
