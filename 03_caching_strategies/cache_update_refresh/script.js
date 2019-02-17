const cachedProfile = document.querySelector('#cached');

const setProfileData = (element, data) => {
  const img = document.createElement('img');
  img.setAttribute('src', data.photo);
  element.appendChild(img);

  const info = document.createElement('p');
  info.innerHTML = `${data.name} (${data.email})`;
  element.appendChild(info);
}

const loadProfile = async (element) => {
  const profileUrl = element.dataset.src;
  const response = await fetch(profileUrl).then(resp => resp.json());
  setProfileData(element, response);
};

const lazyLoadProfiles = async () => {
  const elements = document.querySelectorAll('[data-src]');
  elements.forEach((element) => {
    loadProfile(element);
  });
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (navigator.serviceWorker.controller) {
      lazyLoadProfiles();
    } else {
      navigator.serviceWorker.register('/03_caching_strategies/cache_update_refresh/sw.js')
        .then(() => {
          // Registration was successful
          console.log('ServiceWorker registered');

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            lazyLoadProfiles();
          });
        }).catch((err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
    }

    navigator.serviceWorker.addEventListener('message', ({ data }) => {
      caches.open(data.cacheName)
        .then((cache) => {
          return cache.match(data.cacheUrl);
        })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          cachedProfile.innerHTML = '';
          setProfileData(cachedProfile, json);
        });
    });
  });
}
