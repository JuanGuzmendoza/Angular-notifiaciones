importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});