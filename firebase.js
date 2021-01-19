import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDW4MI3cegnEEE5x-k7Q8g_Vy4uKTlmKpw",
    authDomain: "snapchat-3532b.firebaseapp.com",
    projectId: "snapchat-3532b",
    storageBucket: "snapchat-3532b.appspot.com",
    messagingSenderId: "508668797657",
    appId: "1:508668797657:web:4538580a355d371839d4c8",
    measurementId: "G-94F8BC6WT1"
})

const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };