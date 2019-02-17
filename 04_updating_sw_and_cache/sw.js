/**
 * Same code as in broken images example
 */

const CACHE = 'broken-images-cache';

const brokenImage = '/04_updating_sw_and_cache/broken.jpg';

function isImage(fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image';
}


self.addEventListener('install', (e) => {
  console.log('Install event fired');
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        console.log('Added broken image to cache');
        return cache.add(brokenImage);
      }),
  );
});

self.addEventListener('activate', () => {
  console.log('Activate event fired');
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
