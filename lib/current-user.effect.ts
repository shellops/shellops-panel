import firebase from 'firebase';
import { useEffect } from 'react';

export default function currentUserEffect(userChange) {
    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {

                userChange(user?.toJSON());

            });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
}