//* Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

//* Add the Web App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJ0NmQcRoT1r9zuULQjXDG4FIFMZiPGM",
  authDomain: "marble-883a4.firebaseapp.com",
  projectId: "marble-883a4",
  storageBucket: "marble-883a4.appspot.com",
  messagingSenderId: "257433608827",
  appId: "1:257433608827:web:307cc5e99858a781c838de"
};

//* Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//* Initialize Firebase Auth and set persistence
const auth = getAuth(firebase_app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Failed to set session persistence:", error);
  });

export { auth };
export default firebase_app;
