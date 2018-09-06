import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyByFw7AEsFKarDrYdDOOoGeq2gfycJIGw0",
  authDomain: "catch-of-the-day-wes-bos-23.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-wes-bos-23.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
