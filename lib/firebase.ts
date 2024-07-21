import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBpGkXLKsnk0P__ivGtkC99-Tv6YGbmsm8",
  authDomain: "sonder-63ac2.firebaseapp.com",
  projectId: "sonder-63ac2",
  storageBucket: "sonder-63ac2.appspot.com",
  messagingSenderId: "644209681871",
  appId: "1:644209681871:web:e59476b70b96647eb3deba",
  measurementId: "G-EV76811WKJ",
  databaseURL: "https://sonder-63ac2-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const realtimeDb = getDatabase(app);