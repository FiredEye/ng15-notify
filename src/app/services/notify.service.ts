import { Injectable } from '@angular/core';
import 'firebase/messaging';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { collection, setDoc, doc} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { messaging} from "../../firebase";
import { getToken} from "firebase/messaging";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  // private afMessaging: AngularFireMessaging
  constructor( private router: Router,) { }

  async requestnotifyPermission(){
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('notification permission granted.')
      console.log('Notification permission granted.');
      // alert("permission granted from global service")
      return true;
    } else {
      // alert("permission denied from global service")
      alert('notification permission denied.')
      return false;
    }
  }
  async requestAndSendToken(){
    const permission = await Notification.requestPermission();
    if (permission === 'granted'&&!localStorage['token']) {
      const newUid = uuidv4();
      // this.afMessaging.requestToken.subscribe(
      //  { next:(async (token) => {
      //     localStorage['token'] = token;
      //     console.log(token) 
      //        // Save this token to server (db)
      //        alert(token);
            
      //   // await setDoc(doc(collection(db, "devices"), newUid), {
      //   //   uid: newUid,
      //   //   deviceToken: token,
      //   // });
      //   this.router.navigate(['/about']);
      //   console.log("Token stored successfully");       
      //   }),
      //  error:( (err) => {
      //     console.error('Unable to get permission to notify.', err);
      //   })})
      try {
        
        const token = await getToken(messaging, {
          vapidKey:
          "BOEIwKmhzOtilrPFggR2PA2laWtE0Zjj2YH2XlBISv8KMCAoen9fP30j-6FGozJ5MqcKDg_CqBIEPN0C5sFmrT0",
        });
        localStorage.setItem("token", token);
        alert(token)
        this.router.navigate(['/about']);
        console.log("Token stored successfully"); 
      } catch (error) {
        console.log(error)
      }

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }else if (localStorage['token']) {
      alert("Token already exist");
    }
  }
 
  
}
