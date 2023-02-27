import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRRfcqQcYS_XfZlNAdDNuZnAfdrOuBAOo",
  authDomain: "tiramid-fe62e.firebaseapp.com",
  databaseURL: "https://tiramid-fe62e.firebaseio.com",
  projectId: "tiramid-fe62e",
  storageBucket: "tiramid-fe62e.appspot.com",
  messagingSenderId: "532490031808",
  appId: "1:532490031808:web:483e9e01fb438b3e1b9325",
  measurementId: "G-G66J2QSBZP",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firedb = getFirestore(app);
// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);

// const firedb = firebase.firestore();

// export const firebaseInstance = firebase;
