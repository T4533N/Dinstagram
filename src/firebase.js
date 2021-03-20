import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIHRzODyn9wMi2Q1dE9394IU3C7rVNjoE",
  authDomain: "insta-clone-3d1dd.firebaseapp.com",
  projectId: "insta-clone-3d1dd",
  storageBucket: "insta-clone-3d1dd.appspot.com",
  messagingSenderId: "423531049233",
  appId: "1:423531049233:web:2d74cd42b009b23b48dcb0",
  measurementId: "G-J58G061NW7",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
