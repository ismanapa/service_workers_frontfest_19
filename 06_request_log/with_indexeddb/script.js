const urlInput = document.getElementById('url');
const fetchBtn = document.getElementById('fetchBtn');
const printBtn = document.getElementById('printBtn');
const resultsDiv = document.getElementById('resultsDiv');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/06_request_log/with_indexeddb/sw.js').then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
  });
}

function setResultTemporal(text) {
  resultsDiv.innerHTML = `<pre>${text}</pre>`;
  window.setTimeout(() => {
    resultsDiv.innerHTML = '';
  }, 2000);
}
urlInput.oninput = () => {
  const emailRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
  if (emailRegex.test(urlInput.value)) {
    fetchBtn.disabled = false;
  } else {
    fetchBtn.disabled = true;
  }
};

fetchBtn.onclick = () => {
  fetch(urlInput.value)
    .then(r => r.text())
    .then(setResultTemporal)
    .catch((e) => {
      console.error(e);
      setResultTemporal('Unsuccessful request');
    });
};

printBtn.onclick = () => {
  const sw = navigator.serviceWorker.controller;
  if (sw) {
    navigator.serviceWorker.controller.postMessage('logAll');
  } else {
    console.log('No service worker active');
  }
};
