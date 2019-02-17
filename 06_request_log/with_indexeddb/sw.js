
const storageKey = 'FETCH_LOG';
const objectStoreKey = 'REQUESTS';
let db;

function createDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open(storageKey, 1);
    request.onsuccess = (e) => {
      console.log('DB created');
      db = e.target.result;
      resolve();
    };
    request.onerror = () => {
      console.error('Could not create DB');
      resolve();
    };
    request.onupgradeneeded = (e) => {
      if (!e.target.result.objectStoreNames.contains(objectStoreKey)) {
        const objectStore = e.target.result.createObjectStore(objectStoreKey, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('url', 'url');
        objectStore.createIndex('method', 'method');
      }
    };
  });
}
function addToIndexDB(fetchRequest) {
  const promise = !db ? createDB() : Promise.resolve();
  return promise.then(() => new Promise((resolve) => {
    const transaction = db.transaction(objectStoreKey, 'readwrite');
    const fetchRegistry = {
      timestamp: Date.now(),
      url: fetchRequest.url,
      method: fetchRequest.method,
    };
    const request = transaction.objectStore(objectStoreKey).add(fetchRegistry);
    request.onsuccess = () => {
      console.log('Log added');
    };
    request.onerror = () => {
      console.error('Could not add log for ', fetchRequest);
    };
    transaction.oncomplete = () => {
      // Always resolve so the fetch can go through
      resolve();
    };
  }));
}

function logFullDB() {
  const promise = !db ? createDB() : Promise.resolve();
  promise.then(() => {
    const transaction = db.transaction(objectStoreKey);
    const request = transaction.objectStore(objectStoreKey)
      .getAll();
    request.onsuccess = () => {
      console.table(request.result);
    };
    request.onerror = () => console.error('DB could not be read');
  });
}

self.addEventListener('activate', (event) => {
  event.waitUntil(createDB());
});

self.addEventListener('fetch', (e) => {
  e.waitUntil(addToIndexDB(e.request));
});

self.addEventListener('message', (e) => {
  if (e.data === 'logAll') {
    logFullDB();
  }
});
