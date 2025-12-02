/* eslint-disable */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBB_fGNjfj2w8Y4lgG2nGw0vxrevVcaVb0",
  authDomain: "lrcsheetmobile.firebaseapp.com",
  databaseURL: "https://lrcsheetmobile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lrcsheetmobile",
  storageBucket: "lrcsheetmobile.firebasestorage.app",
  messagingSenderId: "239069891450",
  appId: "1:239069891450:web:533039010fc1189bb824c3",
  measurementId: "G-PNS4WDS2XK"
});

const messaging = firebase.messaging();

/* ------------------------------------------------------------------ */
/*        Réception en arrière-plan (app fermée / onglet fermé)     */
/* ------------------------------------------------------------------ */
messaging.onBackgroundMessage((payload) => {
  console.log("Notification background:", payload);

  const title = payload?.notification?.title || "Nouvelle notification";
  const body = payload?.notification?.body || "";
  const path = payload?.data?.path || "/"; 

  self.registration.showNotification(title, {
    body,
    icon: "/images/logo/logo.png", 
    requireInteraction: true,       
    data: { path }             
  });
});

/* ------------------------------------------------------------------ */
/*                      Clic sur la notification                    */
/* ------------------------------------------------------------------ */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const path = event?.notification?.data?.path;

  if (!path) {
    console.warn("Aucun chemin reçu pour la notification");
    return;
  }

  event.waitUntil(
    clients.openWindow(path) //
  );
});
