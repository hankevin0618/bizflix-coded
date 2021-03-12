import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDyUsYKUiHgXZ8-rtcHn6x4BR6sKEOcJAw",
    authDomain: "navig8biz-34b84.firebaseapp.com",
    projectId: "navig8biz-34b84",
    storageBucket: "navig8biz-34b84.appspot.com",
    messagingSenderId: "395744439282",
    appId: "1:395744439282:web:fb8db93825618a481b196b",
    measurementId: "G-PFRS25Q6S2"
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
