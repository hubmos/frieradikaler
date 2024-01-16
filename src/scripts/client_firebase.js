// Firebase Client-Side Initialization
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

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

const db=getFirestore(app);

async function saveTokenToFirestore(token) {
    try {
      const docRef = await addDoc(collection(db, 'fcmTokens'), {
        token: token,
        createdAt: serverTimestamp()
      });
      console.log('Token stored with ID:', docRef.id);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }
  document.addEventListener('click', function handleNotificationRequest() {
    Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
            navigator.serviceWorker.register('/frieradikaler/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                    const messaging = getMessaging(app);
                    return getToken(messaging, { 
                        vapidKey: 'BETQHChUvvFIizz6vL043qT1BXRpXwWOr1gqc6LyLgi4fnm1UMThR_Nvvu3OfE5prGOz85TavHU5vMZe-2q5ztw', 
                        serviceWorkerRegistration: registration
                    });
                })
                .then((currentToken) => {
                    if (currentToken) {
                        if (currentToken) {
                            const storedToken = localStorage.getItem('fcmToken');
                            if (currentToken !== storedToken) {
                                console.log('New token found, storing in Firestore.');
                                saveTokenToFirestore(currentToken);
                                localStorage.setItem('fcmToken', currentToken);
                            } else {
                                console.log('Existing token found, no need to store in Firestore.');
                            }}
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        } else {
            // Handle denied permission
        }
    });

    // Remove the event listener after handling the request
    document.removeEventListener('click', handleNotificationRequest);
});