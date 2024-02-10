import { Injectable } from '@angular/core';
import 'firebase/messaging';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

import { v4 as uuidv4 } from "uuid";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor( private router: Router,private afMessaging: AngularFireMessaging,private firestore: AngularFirestore) { }

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
      this.afMessaging.requestToken.subscribe(
       { next:(async (token) => {
          localStorage['token'] = token;
          console.log(token) 
             // Save this token to server (db)
             await this.saveTokenToFirestore(newUid, token);
        this.router.navigate(['/about']);
        console.log("Token stored successfully");       
        }),
       error:( (err) => {
          console.error('Unable to get permission to notify.', err);
        })})
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }else if (localStorage['token']) {
      alert("Token already exist");
    }
  }
  private async saveTokenToFirestore(uid: string, token: any) {
    try {
      await this.firestore.collection('devices').doc(uid).set({
        uid: uid,
        deviceToken: token
      });
    } catch (error) {
      console.error('Error saving token to Firestore', error);
    }
  }
}
