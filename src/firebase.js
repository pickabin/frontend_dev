import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAc_Pkw1PUqQRadyGr-exhNLk28z7bL3Lc",
  authDomain: "pick-a-bin-app.firebaseapp.com",
  databaseURL: "https://pick-a-bin-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pick-a-bin-app",
  storageBucket: "pick-a-bin-app.appspot.com",
  messagingSenderId: "320940399511",
  appId: "1:320940399511:web:11bec7854bdb3d263102d2",
  measurementId: "G-J00MSMVZPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);