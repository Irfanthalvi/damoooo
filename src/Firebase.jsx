import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCm3qC1CXJ9XqE24HoXtaZdcBNu0YrMk4",
    authDomain: "damooo.firebaseapp.com",
    projectId: "damooo",
    storageBucket: "damooo.firebasestorage.app",
    messagingSenderId: "137478159291",
    appId: "1:137478159291:web:4f8863934352ab13e6a29e",
    measurementId: "G-JKVR2CVBD1",
    databaseURL: "https://damooo-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
