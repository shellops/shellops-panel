import "../styles/globals.scss";

import Head from "next/head";
import { useEffect, useState } from "react";

import LoadingSpinner from "../components/layout/loading";
import Logo from "../components/layout/logo";
import { AppProps } from "../lib/app-props.interface";
import currentUserEffect from "../lib/current-user.effect";
import initFirebase from "../lib/firebase";

const PanelApp = ({ Component, pageProps }) => {
  initFirebase();

  const [user, userChange] = useState(undefined);

  pageProps = Object.assign(pageProps, {
    user,
  } as AppProps);

  // * Handle authentication changes
  currentUserEffect(userChange);

  return (
    <>
      <Head>
        <title>Shellops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Logo></Logo>
      </header>
      {typeof user === undefined ? (
        <LoadingSpinner />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

export default PanelApp;
