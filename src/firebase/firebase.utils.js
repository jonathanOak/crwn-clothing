import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBMLP9aZyvQeK83cI24sgaTDdJ8NP2Jz-k",
  authDomain: "crown-db-151c6.firebaseapp.com",
  databaseURL: "https://crown-db-151c6.firebaseio.com",
  projectId: "crown-db-151c6",
  storageBucket: "crown-db-151c6.appspot.com",
  messagingSenderId: "400948697618",
  appId: "1:400948697618:web:19347d311c3bfba28a56cb",
  measurementId: "G-EMCTX37L7Y"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
