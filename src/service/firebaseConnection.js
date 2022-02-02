import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAhRft-b2GChfDvwPN5O3fzMYw_Nb07mnk",
  authDomain: "ticket-app-f1676.firebaseapp.com",
  projectId: "ticket-app-f1676",
  storageBucket: "ticket-app-f1676.appspot.com",
  messagingSenderId: "1060679064312",
  appId: "1:1060679064312:web:ef617a250e3fd6e11ff90d",
  measurementId: "G-5MP2N4TZDN"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;