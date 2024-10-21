import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
  apiKey: "AIzaSyDHMVm8FkTWn27Od6CJrVGHjHaB7ofSjrk",
  authDomain: "simplonbarbershop.firebaseapp.com",
  projectId: "simplonbarbershop",
  storageBucket: "simplonbarbershop.appspot.com",
  messagingSenderId: "724001305962",
  appId: "1:724001305962:web:5b93a20e9f9bd008c62113",
  measurementId: "G-B5B9DX8BYP"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
