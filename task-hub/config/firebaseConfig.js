
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD8vqbp0An0MScEUQw5o-DQZ5p99bEhtSk",
  authDomain: "agenda-bd260.firebaseapp.com",
  projectId: "agenda-bd260",
  storageBucket: "agenda-bd260.appspot.com",
  messagingSenderId: "57007030991",
  appId: "1:57007030991:web:abcd1234efgh5678"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };