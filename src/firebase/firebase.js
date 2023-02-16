import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore"; 


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

export const login = async (email, password) => {
  if(!email || !password) return;
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
}


export const storage = getStorage();

export const uploadFileOnStorage = async (displayName) => {

  const storageRef = ref(storage, displayName)
  return storageRef;
}


export const db = getFirestore();

export const createUserDocumentFromAuth = async ( collection, response, additionalInformaton) => {
  if(!response) return;
  const userDocRef = doc(db, collection, response.user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
      try{
          await setDoc(userDocRef,{...additionalInformaton})
      }catch(error){
          console.log("error creating user", error.message)
      }
  }

  return userDocRef;
}









