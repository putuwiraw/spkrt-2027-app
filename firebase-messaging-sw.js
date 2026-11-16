
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
  const title = payload.notification?.title || "SPKRT 2027";
  const options = {
    body: payload.notification?.body || "Ada pengingat kegiatan untuk Anda.",
    icon: "./icon-192.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://putuwiraw.github.io/spkrt-2027-app/")
  );
});
