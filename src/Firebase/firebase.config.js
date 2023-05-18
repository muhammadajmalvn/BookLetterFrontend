// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIvcsP-DTveXWAUT9BFMxquIvC5eZbnGg",
    authDomain: "bookletter-9832f.firebaseapp.com",
    projectId: "bookletter-9832f",
    storageBucket: "bookletter-9832f.appspot.com",
    messagingSenderId: "684921333942",
    appId: "1:684921333942:web:6337209ca6fd9a61e85e17",
    measurementId: "G-N683Y13RHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
