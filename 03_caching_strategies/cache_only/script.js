const loadProfile = async (element) => {
  const profileUrl = element.dataset.src;
  const response = await fetch(profileUrl).then(resp => resp.json());

  const img = document.createElement('img');
  img.setAttribute('src', response.photo);
  element.appendChild(img);

  const info = document.createElement('p');
  info.innerHTML = `${response.name} (${response.email})`;
  element.appendChild(info);
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
      navigator.serviceWorker.register('/03_caching_strategies/cache_only/sw.js')
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
  });
}
