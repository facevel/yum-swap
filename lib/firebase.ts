import {FirebaseApp, getApps, initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyCAjYKYtHJdXKDbmCzmeE5XzeN_DV1kTpw",
  authDomain: "yum-swap.firebaseapp.com",
  projectId: "yum-swap",
  storageBucket: "yum-swap.appspot.com",
  messagingSenderId: "627144855261",
  appId: "1:627144855261:web:e23e3540d63b3b9f681534",
  measurementId: "G-YRX3BZC4FS"
};

let app: FirebaseApp | undefined;
if (getApps().length < 1) {
  app = initializeApp(clientCredentials);
}

export default app;
