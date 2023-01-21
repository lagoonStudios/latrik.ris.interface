import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDaJUPAulBLv_nhEw-4QNj10up8JnZzL4c",
    authDomain: "latrik-bd.firebaseapp.com",
    projectId: "latrik-bd",
    storageBucket: "latrik-bd.appspot.com",
    messagingSenderId: "417235277664",
    appId: "1:417235277664:web:0d0cf68462a698f0b87005",
    measurementId: "G-1CR7V7H1HH"
  };

  export default firebaseConfig

  export const firebaseApp = initializeApp(firebaseConfig);
  export const firestore = getFirestore(firebaseApp);
  export const analytics = getAnalytics(firebaseApp);