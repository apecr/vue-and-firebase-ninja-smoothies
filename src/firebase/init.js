import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyApEDCPxRwSiymMfGuzscqzBcJPWKyKu6g',
  authDomain: 'vue-firebase-ninja-smoot-52715.firebaseapp.com',
  databaseURL: 'https://vue-firebase-ninja-smoot-52715.firebaseio.com',
  projectId: 'vue-firebase-ninja-smoot-52715',
  storageBucket: 'vue-firebase-ninja-smoot-52715.appspot.com',
  messagingSenderId: '225292068413'
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore();