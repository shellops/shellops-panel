import firebase from "firebase";

export default function Logout() {

    firebase.auth().signOut();
    localStorage.clear();
    location.href = '/';

}