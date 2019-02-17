const warningText = document.getElementById('warning-text');
function registerSW(path) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(path)
      .then((registration) => {
        // Registration was successful
        console.log(`Service worker from ${path} registered`);
        const currentSW = registration.active;
        if (currentSW && currentSW.scriptURL.indexOf(path) === -1) {
          warningText.removeAttribute('hidden');
          console.log(`Another service worker active from ${currentSW.scriptURL}`);
        }
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  }
}

document.getElementById('updatesw').onclick = () => {
  registerSW('/04_updating_sw_and_cache/sw-v2.js');
};

navigator.serviceWorker.oncontrollerchange = (e) => {
  console.log(`Controller changed to ${e.target.controller.scriptURL}`);
  warningText.setAttribute('hidden', true);
};

navigator.serviceWorker.ready.then((e) => {
  if (e.waiting) {
    warningText.removeAttribute('hidden');
    console.log('Another service worker active');
  }
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    // Register only if no SW is active
    registerSW('/04_updating_sw_and_cache/sw.js');
  }
});
