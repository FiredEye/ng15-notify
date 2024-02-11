
import { Subscription } from 'rxjs';
import { Component, OnInit,  } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css'],
})
export class AboutPage implements OnInit{

showToken:any;
  constructor(public notifyService:NotifyService){}
  requestNotification(){
    this.notifyService.requestnotifyPermission()
    }
  ngOnInit(){
    if(localStorage.getItem('token')){
      this.showToken=localStorage['token']
    }
  }
}
