if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/07_background_task/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        // Registration was successful
        console.log('ServiceWorker registered');

        const startButton = document.querySelector('#start');
        const stopButton = document.querySelector('#stop');

        startButton.addEventListener('click', () => {
          navigator.serviceWorker.controller.postMessage('start');
        });

        stopButton.addEventListener('click', () => {
          navigator.serviceWorker.controller.postMessage('stop');
        });

      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
