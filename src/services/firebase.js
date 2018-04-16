import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBuqvQWCbYvQw-hyaT_dCpfsR5LufIyDdk',
  authDomain: 'doctor-reminders.firebaseapp.com',
  databaseURL: 'https://doctor-reminders.firebaseio.com',
  projectId: 'doctor-reminders',
  storageBucket: 'doctor-reminders.appspot.com',
  messagingSenderId: '339401773395'
};

export default firebase.initializeApp(config);

export function createUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
