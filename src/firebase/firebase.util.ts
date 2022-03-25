import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

interface FirebaseConfigType {
  [key: string]: string;
}

const firebaseConfig: FirebaseConfigType = {
  apiKey: process.env.REACT_APP_API_KEY as string,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_APP_ID as string,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
