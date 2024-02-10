import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng15_pwa';

  constructor(){
    setInterval(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('firebase-messaging-sw.js').then(registration => {
          if (registration) {
            if (registration.active) {
              registration.active.postMessage('ping');
            }
            navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
              if (registration) {
                if (registration.active) {
                  registration.active.postMessage('ping');
                }
              }
            });
          }
        });
      }
    }, 20000);
  }

}
