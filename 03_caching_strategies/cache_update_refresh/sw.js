const CACHE_NAME = 'cache_update_refresh';
const cacheUrl = 'https://uinames.com/api/?ext&cache_update_refresh';

// This files are cached on load
const urlsToPrefetch = [
  cacheUrl,
];

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and added initial files');
        return cache.addAll(urlsToPrefetch);
      }),
  );
});

function fromCache(request) {
  return caches.match(request)
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(request);
    });
}

function update(request) {
  return caches.open(CACHE_NAME).then((cache) => {
    const updateRequest = request.clone();
    return fetch(updateRequest)
      .then((response) => {
        return cache.put(request, response.clone())
          .then(() => {
            return response;
          });
      });
  });
}

function refresh() {
  return self.clients.matchAll()
    .then((clients) => {
      clients.forEach((client) => {
        const message = {
          cacheName: CACHE_NAME,
          cacheUrl,
        };
        client.postMessage(message);
      });
    });
}

self.addEventListener('fetch', (event) => {
  // Respond with cache when match
  event.respondWith(fromCache(event.request));

  // Update cache of cached request
  if (event.request.url === cacheUrl) {
    event.waitUntil(
      update(event.request)
        .then(refresh),
    );
  }
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
