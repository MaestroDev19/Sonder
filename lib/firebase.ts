import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzW9SVgYAYKOz0SI1DQBmZXIUlEWNz9Zc",
  authDomain: "resturant-website-1789.firebaseapp.com",
  projectId: "resturant-website-1789",
  storageBucket: "resturant-website-1789.appspot.com",
  messagingSenderId: "288811136521",
  appId: "1:288811136521:web:ac8b295cd243f2c038ead8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)