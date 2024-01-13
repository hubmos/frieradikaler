// Firebase Client-Side Initialization
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyD_D_vnwfmdGd370TkaHWxNsZQkMhyRo6E",
  authDomain: "frieradikaler-89f98.firebaseapp.com",
  projectId: "frieradikaler-89f98",
  storageBucket: "frieradikaler-89f98.appspot.com",
  messagingSenderId: "293984564324",
  appId: "1:293984564324:web:52b5dc32abd2205bd4db71",
  measurementId: "G-DS1MY9RRY8"
};



const app=initializeApp(firebaseConfig);


let permission = await Notification.requestPermission();
if (permission === "granted") {
// Register Service Worker
navigator.serviceWorker.register('/frieradikaler/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
    const messaging = getMessaging(app);
    return getToken(messaging, { vapidKey: 'BETQHChUvvFIizz6vL043qT1BXRpXwWOr1gqc6LyLgi4fnm1UMThR_Nvvu3OfE5prGOz85TavHU5vMZe-2q5ztw', serviceWorkerRegistration: registration}, );
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
  });} else {
    // Handle denied permission
  }
