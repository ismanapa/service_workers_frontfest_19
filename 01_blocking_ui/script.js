const buttonNoSW = document.querySelector('#startNoSW');
const buttonSW = document.querySelector('#startSW');

buttonNoSW.addEventListener('click', () => {
  getPrimes(100000000);
  console.log('Process finished!');
  alert('Process finished!');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/01_blocking_ui/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        // Registration was successful
        console.log('ServiceWorker registered');

        buttonSW.addEventListener('click', () => {
          navigator.serviceWorker.controller.postMessage('calculatePrimes');
        });

        // Here we add the event listener for receiving messages
        navigator.serviceWorker.addEventListener('message', () => {
          console.log('Process finished!');
          alert('Process finished!');
        });
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
