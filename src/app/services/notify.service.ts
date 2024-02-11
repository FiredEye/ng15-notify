import { Injectable } from '@angular/core';
// import 'firebase/messaging';
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
    if (localStorage.getItem('token')&&localStorage.getItem('token')!==null) {
      alert("Token already exist");
    }
    else if (permission === 'granted') {
      const newUid = uuidv4();
      alert('inside req tkn fxn_')
      // this.afMessaging.requestToken.subscribe(
      //   { next:(async (token) => {
      //     localStorage['token'] = token;
      //     console.log(token) 
      //        alert(token)
       
      //   this.router.navigate(['/about']);
      //   console.log("Token stored successfully");       
      //   }),
      //  error:( (err) => {
      //     console.error('Unable to get permission to notify.', err);
      //     alert(err)
      //   })})
      try {
        fetch("config/config.json")
          .then((response) => response.json())
          .then(async (data) => {
            const token = await getToken(messaging, {
              vapidKey:data.firebaseConfig.vapidKey,
            });
            localStorage.setItem("token", token);
            alert(token)
            this.router.navigate(['/about']);
            console.log("Token stored successfully"); 
          })
       
      } catch (error) {
        console.log(error)
      }

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }
 
  
}
