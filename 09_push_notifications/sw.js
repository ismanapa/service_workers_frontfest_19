self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const payload = event.data ? event.data.text() : 'no payload';

  const title = 'Duendecillos en tu navegador';
  const options = {
    body: payload,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://duendecillosentunavegador.azurewebsites.net/'),
  );
});
