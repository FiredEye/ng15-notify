import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

// initialize app with empty config
const angularFireImport = AngularFireModule.initializeApp({});

// Filter the config from the providers:
if (angularFireImport.providers) {
  angularFireImport.providers = angularFireImport.providers.filter(
    (provider: any) => provider.provide !== FIREBASE_OPTIONS
  );
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
    ServiceWorkerModule.register('/firebase-messaging-sw.js', {
      enabled: true
    }),
    angularFireImport,
    AngularFireMessagingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
  
  }
 }
