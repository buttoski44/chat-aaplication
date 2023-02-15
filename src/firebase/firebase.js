import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCK8XUHZt7Qr-tEL6TE7G7q0-4EF_OqoXE",
  authDomain: "chat-5d4a9.firebaseapp.com",
  projectId: "chat-5d4a9",
  storageBucket: "chat-5d4a9.appspot.com",
  messagingSenderId: "1087496988133",
  appId: "1:1087496988133:web:b912d15662526aa7b0bb0c"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();









