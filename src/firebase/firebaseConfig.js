import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBB_fGNjfj2w8Y4lgG2nGw0vxrevVcaVb0",
    authDomain: "lrcsheetmobile.firebaseapp.com",
    databaseURL: "https://lrcsheetmobile-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lrcsheetmobile",
    storageBucket: "lrcsheetmobile.firebasestorage.app",
    messagingSenderId: "239069891450",
    appId: "1:239069891450:web:533039010fc1189bb824c3",
    measurementId: "G-PNS4WDS2XK"
};

const app = initializeApp(firebaseConfig);

export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
