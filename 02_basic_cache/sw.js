const CACHE_NAME = '00-basic-cache';

// This files are cached on load
const urlsToCache = [
  '/02_basic_cache/basic_cache.html',
  '/02_basic_cache/script.js',
];

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and added initial files');
        return cache.addAll(urlsToCache);
      }),
  );
});

/*
Every request is processed by this function
If file is cached it will be server from cached
otherwise it will be cached for future
*/
self.addEventListener('fetch', (event) => {
  const file = event.request.url.split('/').pop();
  event.respondWith(
    caches.match(event.request)
      .then((r) => {
        if (r) {
          console.log('Loaded file from cache: ', file);
          return r;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
                console.log('Add file to cache: ', file);
              });

            return response;
          },
        );
      }),
  );
});

self.addEventListener('message', () => {
  caches.delete(CACHE_NAME)
    .then(() => console.log('Cache was cleaned'))
    .catch(e => console.log(e));
});
