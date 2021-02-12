import firebase from 'firebase';


export default function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyA5VP9KATH8hq4dFNdHuva-wmsokiYfMuY",
        authDomain: "shellops-e27f2.firebaseapp.com",
        databaseURL: "https://shellops-e27f2-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "shellops-e27f2",
        storageBucket: "shellops-e27f2.appspot.com",
        messagingSenderId: "356484912378",
        appId: "1:356484912378:web:6b61d1695f73a0e764a543",
        measurementId: "G-V1ZYVZYFTZ"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);

        if (global.window)
            firebase.analytics();
    }
}