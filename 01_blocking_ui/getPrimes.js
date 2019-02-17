/* eslint-disable */

function getPrimes(max) {
  const sieve = [];
  let i;
  let j;
  const primes = [];
  for (i = 2; i <= max; i += 1) {
    if (!sieve[i]) {
      primes.push(i);
      for (j = i << 1; j <= max; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}
