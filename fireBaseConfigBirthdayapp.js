// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCskOVYdLWOwJHpcFnCu68qO8YBqpFmAlE",
  authDomain: "birthdaychkapp.firebaseapp.com",
  databaseURL: "https://birthdaychkapp-default-rtdb.firebaseio.com",
  projectId: "birthdaychkapp",
  storageBucket: "birthdaychkapp.firebasestorage.app",
  messagingSenderId: "164038843252",
  appId: "1:164038843252:web:39dcec002d6f48f91cea21"
};

/*
INITIALIZATION HAPPENS HERE
  This runs as soon as config.js is loaded
*/
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
