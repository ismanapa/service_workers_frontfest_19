let hasToResolve = false;

const startNumberPromise = () => {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      if (hasToResolve) {
        clearInterval(interval);
        hasToResolve = false;
        resolve();
      } else {
        console.log(`Index: ${index}`);
        index++;
      }
    }, 1000);
  });
};

const stopNumberPromise = () => {
  console.log('Script stopped');
  hasToResolve = true;
};

self.addEventListener('message', (event) => {
  if (event.data === 'start') {
    event.waitUntil(startNumberPromise());
  } else {
    stopNumberPromise();
  }
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
