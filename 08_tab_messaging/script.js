window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    const messageInput = document.querySelector('#message');

    navigator.serviceWorker.register('/08_tab_messaging/sw.js')
      .then(() => {
        console.log('ServiceWorker registered');

        // Here we add the event listener for receiving messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          messageInput.value = event.data.message;
        });

        messageInput.addEventListener('input', () => {
          /*
            There isn’t always a service worker to send a message to.
            This can happen when the page is force reloaded.
          */
          if (!navigator.serviceWorker.controller) {
            status.textContent = 'error: no controller';
            return;
          }

          navigator.serviceWorker.controller.postMessage(messageInput.value);
        });
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  }
});
