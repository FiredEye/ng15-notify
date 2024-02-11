importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
let config;
let messaging;
fetch('config/config.json')
  .then(response => response.json())
  .then(data => {
      config = data;
      firebase.initializeApp({       
        messagingSenderId: config.firebaseConfig.messagingSenderId,       
      });
      if(firebase.messaging.isSupported()) {
        messaging = firebase.messaging();
        messaging.setBackgroundMessageHandler(async function (payload) {
          //console.log('[firebase-messaging-sw.js] Received background message ', payload);
          // Customize notification here
          let notification = payload;
         
              let title = notification.data.title || '';
              let message = notification.data.message || '';
              const notificationTitle = title;
              const notificationOptions = {
                  body: message,
                  icon: 'assets/icon.png',
                  data: payload.data,
              };
      
              return self.registration.showNotification(notificationTitle,
                  notificationOptions);
        
      
        });
      }
    });

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Android needs explicit close.
    if(event.notification.data) {
        event.notification.data.isFirebaseMessaging = false;
    }
    event.waitUntil(
        clients.matchAll({includeUncontrolled: true,type: 'window'}).then( windowClients => {
        
        let rootUrl = new URL('/', location).href;
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                var url = client.url;
                // If so, just focus it.
                if (url.indexOf(rootUrl) == 0  && 'focus' in client) {
                    client.postMessage(event.notification.data);
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

self.addEventListener('message', function(event){
});

self.addEventListener('install', function(event) {
    self.skipWaiting();
});