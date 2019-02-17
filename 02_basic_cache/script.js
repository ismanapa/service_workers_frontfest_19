let worker;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/02_basic_cache/sw.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      if (registration.active) {
        console.log('ServiceWorker is active');
        worker = registration.active;
      }
    }).catch((err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function cleanCache() {
  if (worker) {
    worker.postMessage('cleanCache');
  }
}

document.getElementById('cleanCache').onclick = cleanCache;
