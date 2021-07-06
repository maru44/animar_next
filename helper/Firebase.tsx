import firebase from "firebase/app";
import "firebase/auth";
import { sendJwtCookie } from "./UserHelper";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const GoogleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const ret = firebase
    .auth()
    .signInWithPopup(provider)
    .then((result: any) => {
      (async () => {
        await sendJwtCookie(
          result["user"]["Aa"],
          result["user"]["refreshToken"]
        );
      })();
      return result["user"];
    })
    .catch((err) => {
      return null;
    });
  return ret;
};
