// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// REPLACE THIS WITH YOUR OWN CONFIG FROM FIREBASE CONSOLE
const firebaseConfig = {
    // apiKey: "YOUR_API_KEY_HERE",
    // authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_PROJECT_ID.appspot.com",
    // messagingSenderId: "YOUR_SENDER_ID",
    // appId: "YOUR_APP_ID"
    apiKey: "AIzaSyDqekat8DtU_lsZGy95IVhmDvohhceQ8wA",
    authDomain: "labuploads-edd6e.firebaseapp.com",
    projectId: "labuploads-edd6e",
    storageBucket: "labuploads-edd6e.firebasestorage.app",
    messagingSenderId: "851643144816",
    appId: "1:851643144816:web:228ff0407c5c48ac9632b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
