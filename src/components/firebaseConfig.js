import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCo-RTmFkaBbaqn53x4qjJC_Fpf82CoZ_c",
  authDomain: "mark-live.firebaseapp.com",
  databaseURL: "https://mark-live.firebaseio.com",
  projectId: "mark-live",
  storageBucket: "",
  messagingSenderId: "971111658697",
  appId: "1:971111658697:web:238f276bb7381f05"
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();
