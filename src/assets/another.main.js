function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const publicVapidKey = 'BBvqWYnn5IjyOcPpJ9a76frjS2DyWWrakEdgC_0jIuCMLW3qXvqR_jhLf27IbyROGvFlje8X5YRfcvmHPfCC6g4';

  const triggerPush = document.querySelector('.trigger-push');

  async function triggerPushNotification() {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('/assets/sw2.js', {
        scope: '/assets/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }

  /*triggerPush.addEventListener('click', () => {
    triggerPushNotification().catch(error => console.error(error));
  });*/

  triggerPushNotification().catch(error => console.error(error));