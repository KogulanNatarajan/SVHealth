import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyB_nmc8iKCtyfhg4m4WWNY9RHwWj-BPpP0",
  authDomain: "reactnative-87ab6.firebaseapp.com",
  projectId: "reactnative-87ab6",
  storageBucket: "reactnative-87ab6.appspot.com",
  messagingSenderId: "508207537817",
  appId: "1:508207537817:web:9ed3cd2f85003575e2e208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const authentication = getAuth(app);


//export default {firebase}