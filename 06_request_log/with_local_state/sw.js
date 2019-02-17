
const requestsLog = [];

function addToLocalState(fetchRequest) {
  try {
    const fetchRegistry = {
      timestamp: Date.now(),
      url: fetchRequest.url,
      method: fetchRequest.method,
    };
    requestsLog.push(fetchRegistry);
  } catch (error) {
    console.error('Could not add log for ', fetchRequest);
  }
}

function logLocalState() {
  console.table(requestsLog);
}

self.addEventListener('fetch', (e) => {
  addToLocalState(e.request);
});

self.addEventListener('message', (e) => {
  if (e.data === 'logAll') {
    logLocalState();
  }
});
