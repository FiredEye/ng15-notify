
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePage {
 
  constructor(private notifyService:NotifyService){}
  requestNotification(){
    this.notifyService.requestnotifyPermission()
    }
    sendToken(){
      this.notifyService.requestAndSendToken()
    }

  
}
