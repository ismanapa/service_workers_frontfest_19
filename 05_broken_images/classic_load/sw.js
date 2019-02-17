const CACHE = 'broken-images-cache';

const brokenImage = '/05_broken_images/classic_load/broken.jpg';

function isImage(fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image';
}

/*
Precache broken image so we can use it in offline and online environment
*/
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        console.log('Added broken image to cache');
        return cache.add(brokenImage);
      }),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (!response.ok && isImage(e.request)) {
          return caches.match(brokenImage);
        }
        return response;
      })
      .catch((err) => {
        if (isImage(e.request)) {
          return caches.match(brokenImage);
        }
        throw (err);
      }),
  );
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
