console.logColor = (msg) => {
  console.log(`%c${msg}`, 'color:#843d7d;font-weight:bold');
};

const CACHE = 'broken-images-cache-v2';

const brokenImage = '/04_updating_sw_and_cache/broken_v2.jpg';

function isImage(fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image';
}


self.addEventListener('install', (e) => {
  console.logColor('Install event fired');
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        console.logColor('Added broken image to cache');
        return cache.add(brokenImage);
      }),
  );
});
self.addEventListener('activate', (event) => {
  console.logColor('Activate event fired');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map((key) => {
        if (key !== CACHE) {
          console.logColor(`Deleting old cache ${key}`);
          return caches.delete(key);
        }
        return undefined;
      }),
    )).then(() => {
      console.logColor('Activated!');
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
