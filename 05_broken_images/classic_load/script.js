function loadImage(img) {
  const imgUrl = img.dataset.src;
  img.setAttribute('src', imgUrl);
}

function lazyLoadImages() {
  const imgs = document.querySelectorAll('[data-src]');
  imgs.forEach((img) => {
    loadImage(img);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (navigator.serviceWorker.controller) {
      lazyLoadImages();
    } else {
      navigator.serviceWorker.register('/05_broken_images/classic_load/sw.js')
        .then(() => {
          // Registration was successful
          console.log('ServiceWorker registered');

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            lazyLoadImages();
          });
        }).catch((err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
    }
  });
}
