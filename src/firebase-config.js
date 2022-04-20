import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyB2xEC3xlXWnlFNZDy2akIdKfW_Vp6vsLw",
    authDomain: "nett-e5517.firebaseapp.com",
    databaseURL: "https://nett-e5517-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "nett-e5517",
    storageBucket: "nett-e5517.appspot.com",
    messagingSenderId: "816324436323",
    appId: "1:816324436323:web:a60ee3029d01ae12e73356"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app); 