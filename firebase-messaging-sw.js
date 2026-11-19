
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC2BsmTiZDtU-8nHzTsohGKO1RfYuGcWoU",
  authDomain: "spkrt-2027.firebaseapp.com",
  projectId: "spkrt-2027",
  storageBucket: "spkrt-2027.firebasestorage.app",
  messagingSenderId: "409422737651",
  appId: "1:409422737651:web:23092e77de8f04e5500786"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Pesan diterima:", payload);

  const title = payload.notification?.title || "SPKRT 2027";

  const options = {
    body: payload.notification?.body || "Ada pengingat kegiatan untuk Anda.",
    icon: "https://putuwiraw.github.io/spkrt-2027-app/icon-192.png",
    badge: "https://putuwiraw.github.io/spkrt-2027-app/icon-192.png",
    data: payload.data || {},
    tag: "spkrt-2027-notification",
    renotify: true
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(
          "https://putuwiraw.github.io/spkrt-2027-app/"
        )) {
          return client.focus();
        }
      }

      return clients.openWindow(
        "https://putuwiraw.github.io/spkrt-2027-app/"
      );
    })
  );
});
