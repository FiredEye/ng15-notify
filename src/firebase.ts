import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
import { getFirestore,Firestore } from "firebase/firestore";

let config;
let db:Firestore;
fetch('config/config.json')
  .then(response => response.json())
  .then(data => {
    config = data;
    const firebaseConfig = {
      apiKey: config.firebaseConfig.apiKey,
      authDomain: config.firebaseConfig.authDomain,
      projectId: config.firebaseConfig.projectId,
      storageBucket: config.firebaseConfig.storageBucket,
      messagingSenderId: config.firebaseConfig.messagingSenderId,
      appId: config.firebaseConfig.appId
    };

    // Initialize Firebase app with the fetched config
    const app = initializeApp(firebaseConfig);
    // const messaging = getMessaging(app);
    db = getFirestore();
    
    // console.log("Firebase initialized with fetched config:", firebaseConfig);
  })
  .catch(error => {
    console.error('Error fetching Firebase config:', error);
  });

export {db};
