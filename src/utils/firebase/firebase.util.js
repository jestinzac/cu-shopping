import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore"; // get data from firebase

/** Firebase - Project settings */
const firebaseConfig = {
  apiKey: "AIzaSyBtOv3ko-hlr6wRDwVXVu1Bx8bci51DVYs",
  authDomain: "crown-db-eb1a9.firebaseapp.com",
  projectId: "crown-db-eb1a9",
  storageBucket: "crown-db-eb1a9.appspot.com",
  messagingSenderId: "743550648436",
  appId: "1:743550648436:web:9539440aadd108e8129121",
  measurementId: "G-9SS5G8RXZ1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // 'Providers' are instantiated as classes so here is Google, we can have same for FB
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocument = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // categories, Hats, Women etc
    //console.log(docRef);
    batch.set(docRef, object); //Function WriteBatch.set()  Data must be an object
  });

  await batch.commit();
  console.log('Done')
}
 
export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  //await Promise.reject(new Error('new error!'))

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  //console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  //console.log(userSnapshot.exists());

  // if user data doesn't exists
  // create/ set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  // if user data exists, create
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

/**
 * always open state as it listens to any activities
 * {
 *  next: callback,
 *  error: errorCallback
 *  complete: completedCallback
 * }
 */
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); //observer pattern, its stream - onAuthStateChanged(auth, callback, errorCallback, completedCallback);

// convert from a observable listener(App.js), into promise based function call here
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth)
      },
      reject
    )
  })
}