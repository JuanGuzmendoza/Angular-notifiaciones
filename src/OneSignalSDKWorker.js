importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  event.waitUntil(
    fetch('https://api-medicina-abf75-default-rtdb.firebaseio.com/Data.json') // Reemplaza con la URL de tu API de Firebase
    .then(response => response.json())
    .then(data => {
      console.log("llego una respuesta")
        // Actualiza el índice con la nueva información de la API
        return fetch('index.html') // Fetchear el archivo index.html desde la URL de tu sitio web
         .then(response => {
          console.log("se cacheo")
            const cache = caches.open('my-cache');
            cache.put('/', response); // Cachear la respuesta
          });
      })
  );
});