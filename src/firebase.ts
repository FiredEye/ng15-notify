import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCmW6Isd1XfaBOpxsp0or-mTIx0pLEijMA",
  authDomain: "push-notify-b651d.firebaseapp.com",
  projectId: "push-notify-b651d",
  storageBucket: "push-notify-b651d.appspot.com",
  messagingSenderId: "867556559896",
  appId: "1:867556559896:web:6c58b0f6335f929377c76d"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore();