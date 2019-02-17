self.importScripts('getPrimes.js');

self.addEventListener('message', (event) => {
  const primes = getPrimes(100000000);
  event.source.postMessage(primes);
});
