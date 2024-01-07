import admin from 'firebase-admin';

if (!admin.apps.length) {
// Initialize Firebase Admin SDK
admin.initializeApp({
 credential: admin.credential.cert(JSON.parse(import.meta.env.SECRET_ACCOUNT))});
};
// Initialize Firestore Database
const db = admin.firestore();

export default db;