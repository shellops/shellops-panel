import firebase from "firebase";
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import styles from "./account.module.scss";

import initFirebase from "../lib/firebase";
import LoadingSpinner from "../components/layout/loading";

export default function Account(context) {
  initFirebase();

  const [user, userChange] = useState(null);
  const [loading, loadingChange] = useState(true);

  function logout() {
    loadingChange(true);
    firebase.auth().signOut();
  }

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        loadingChange(false);
        userChange(user?.toJSON());
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return user ? (
    <div className={styles.account}>
      <section>
        <div>You are already logged in as `{user.displayName}`</div>
        <button className={styles.logout} onClick={logout}>Logout</button>
      </section>
    </div>
  ) : (
    <>
      <div className={styles.account}>
        <section>
          {!loading ? (
            <>
              <h1>Login to continue to Shellops panel</h1>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </section>
      </div>
    </>
  );
}
