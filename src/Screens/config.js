import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKDVsnnzPpVHs2myF26-0Bc-m1rkqKUlg",
    authDomain: "todo-df65d.firebaseapp.com",
    projectId: "todo-df65d",
    storageBucket: "todo-df65d.appspot.com",
    messagingSenderId: "53652459835",
    appId: "1:53652459835:web:95fa2f4e7667239e59271e",
    measurementId: "G-DTTLQWBT8T"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firebase, firestore };
