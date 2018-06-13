import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAIeAXjj6tlnwYNu1KnmXzKIUYimqlHDH0",
    authDomain: "catch-of-the-day-omri-haim.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-omri-haim.firebaseio.com"
  });

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
