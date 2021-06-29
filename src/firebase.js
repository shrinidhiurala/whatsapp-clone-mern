import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBMfgWa1KlOvf1OgEhP4U-KL6boXzcl3u4",
    authDomain: "whatsapp-clone-mern-fad8e.firebaseapp.com",
    projectId: "whatsapp-clone-mern-fad8e",
    storageBucket: "whatsapp-clone-mern-fad8e.appspot.com",
    messagingSenderId: "784003181357",
    appId: "1:784003181357:web:d06b888c76f3c0b93741a4"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth , provider };
export default db;