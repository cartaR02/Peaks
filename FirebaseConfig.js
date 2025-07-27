// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0lwnaSqu7yutrKYcWoXet1f3V7hhIQdA",
    authDomain: "peaks-30fa5.firebaseapp.com",
    databaseURL: "https://peaks-30fa5-default-rtdb.firebaseio.com",
    projectId: "peaks-30fa5",
    storageBucket: "peaks-30fa5.firebasestorage.app",
    messagingSenderId: "1091596182755",
    appId: "1:1091596182755:web:ba41b7a3dd452ec70091d6",
    measurementId: "G-9FCM0930W2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db};