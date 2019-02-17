self.addEventListener('message', (event) => {
  // Receive the data from the client
  const { data } = event;

  // The unique ID of the tab
  const clientId = event.source.id;

  self.clients.matchAll()
    .then((clients) => {
      clients.forEach((client) => {
        if (client.id !== clientId) {
          client.postMessage({
            client: clientId,
            message: data,
          });
        }
      });
    });
});

// Immediately claim any new clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
