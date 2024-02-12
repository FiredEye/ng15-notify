import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBu2emmod70NGOcDid_q81x3gP6FAW-Ro8",
  authDomain: "push-notify-b8795.firebaseapp.com",
  databaseURL: "https://push-notify-b8795-default-rtdb.firebaseio.com",
  projectId: "push-notify-b8795",
  storageBucket: "push-notify-b8795.appspot.com",
  messagingSenderId: "131374839398",
  appId: "1:131374839398:web:3fa637d133a5407c65dfa7"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore();