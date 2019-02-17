const CACHE_NAME = 'cache_only';

// This files are cached on load
const prefetchData = 'https://uinames.com/api/?ext&cache';

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and added initial files');
        return cache.add(prefetchData);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }),
  );
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
