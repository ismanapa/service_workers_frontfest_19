const CACHE_NAME = 'cache_update';
const cacheUrl = 'https://uinames.com/api/?ext&cache_update';

// This files are cached on load
const urlsToPrefetch = [
  cacheUrl,
];

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
    const updateRequest = new Request(request.url);
    return fetch(updateRequest).then(response => cache.put(request, response));
  });
}

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

self.addEventListener('fetch', (event) => {
  // Respond with cache when match
  event.respondWith(fromCache(event.request));

  // Update cache of cached request
  if (event.request.url === cacheUrl) {
    event.waitUntil(update(event.request));
  }
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
