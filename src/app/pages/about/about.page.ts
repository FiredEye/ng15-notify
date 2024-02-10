
import { Subscription } from 'rxjs';
import { Component,  } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css'],
})
export class AboutPage{


  constructor(private notifyService:NotifyService){}
  requestNotification(){
    this.notifyService.requestnotifyPermission()
    }
}
