import admin from 'firebase-admin';

if (!admin.apps.length) {
// Initialize Firebase Admin SDK
const jsonk= await import.meta.env.SECRET_ACCOUNT;
const keys = JSON.parse(jsonk);
admin.initializeApp({
 credential: admin.credential.cert(keys)});
};
// Initialize Firestore Database
const db = admin.firestore();

export default db;
