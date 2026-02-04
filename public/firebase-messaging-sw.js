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

// UNIQUE fonction de sauvegarde
async function saveNotificationToDB(notification) {
  const dbName = "NotificationDB";
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("notifications")) {
        db.createObjectStore("notifications", { autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("notifications", "readwrite");
      const store = transaction.objectStore("notifications");
      const addRequest = store.add(notification);
      addRequest.onsuccess = () => {
        console.log("Notif sauvegardée en DB (Site fermé)");
        resolve();
      };
    };
    
    request.onerror = (e) => reject(e);
  });
}

// UNIQUE écouteur de messages en arrière-plan
messaging.onBackgroundMessage(async (payload) => {
  console.log("Payload reçu en background:", payload);

  const notificationData = {
    path: payload?.data?.path || "/",
    adminSectionIndex: payload?.data?.adminSectionIndex || "0",
    adminPageIndex: payload?.data?.adminPageIndex || "0",
  };

  // Sauvegarde impérative
  await saveNotificationToDB(notificationData);

  // Affichage de la notif système
  return self.registration.showNotification(
    payload?.notification?.title || "Nouvelle notification", 
    {
      body: payload?.notification?.body || "",
      icon: "/images/logo/logo.png",
      data: notificationData
    }
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const path = event.notification.data.path;
  event.waitUntil(clients.openWindow(path));
});