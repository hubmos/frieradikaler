import admin from 'firebase-admin';
//import creds from '/home/runner/work/frieradikaler/frieradikaler/google-services.json' assert { type: 'json' };
import creds from '../../google-services.json' assert { type: 'json' };

if (!admin.apps.length) {
// Initialize Firebase Admin SDK
//const keys = JSON.parse(jsonk);
admin.initializeApp({
 credential: admin.credential.cert(creds)});
};
// Initialize Firestore Database
const db = admin.firestore();

export default db;
