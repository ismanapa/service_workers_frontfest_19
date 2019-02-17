const enableButton = document.querySelector('#enablePushButton');
let applicationServerPublicKey = '';
let sw = null;
let isSubscribed = false;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function showSubscriptionInfo(subscription) {
  // In a real app we would send subscription to our backend server

  const subscriptioInfo = document.querySelector('#subscriptioInfo');
  const subscriptionContainer = document.querySelector('#subscriptionContainer');

  if (subscription) {
    subscriptioInfo.textContent = JSON.stringify(subscription);
    subscriptionContainer.classList.remove('is-invisible');
  } else {
    subscriptionContainer.classList.add('is-invisible');
  }
}

function subscribeUser() {
  if (applicationServerPublicKey === '') {
    alert('You have to set a valid public key');
  } else {
    // Usually we will get this key from server
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

    sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    })
      .then((subscription) => {
        console.log('User is subscribed.');
        isSubscribed = true;
        showSubscriptionInfo(subscription);
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
      });
  }
}

function getSubscription() {
  sw.pushManager.getSubscription()
    .then((subscription) => {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
        showSubscriptionInfo(subscription);
      } else {
        console.log('User is NOT subscribed.');
      }
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('/09_push_notifications/sw.js')
    .then((registration) => {
      console.log('Service Worker is registered');

      sw = registration;
      enableButton.removeAttribute('disabled');
      getSubscription();
    })
    .catch((error) => {
      console.error('Service Worker Error', error);
    });
}

window.addEventListener('load', () => {
  enableButton.addEventListener('click', subscribeUser);

  const keyInput = document.querySelector('#serverPublicKey');
  keyInput.addEventListener('input', () => {
    applicationServerPublicKey = keyInput.value;
  });
});
