import "../styles/globals.scss";

import Head from "next/head";
import { useEffect, useState } from "react";

import LoadingSpinner from "../components/layout/loading";
import Logo from "../components/layout/logo";
import Nav from "../components/layout/nav";
import currentUserEffect from "../lib/current-user.effect";
import initFirebase from "../lib/firebase";
import { AppProps } from "../lib/interfaces/app-props.interface";
import useLiveMachinesEffect, {
  getUrlTokens,
} from "../lib/live-machines.effect";
import { useRouter } from "next/router";

const PanelApp = ({ Component, pageProps }) => {
  initFirebase();

  const [user, userChange] = useState(undefined);

  // * Handle authentication changes
  currentUserEffect(userChange);

  const [machines, machinesChange] = useState([]);

  // * Handle machine changes, refresh every 3 second
  useLiveMachinesEffect(machinesChange);

  const router = useRouter();
  const { host } = router.query;
  const [urlToken, urlTokenChange] = useState(null);


  useEffect(() => {
    if (!urlToken)
      urlTokenChange(
        getUrlTokens().find((p) => {
          const urlToken = new URL(p);
          return host === urlToken.hostname;
        })
      );
  });

  const machine = machines.find((p) => p.urlToken == urlToken);

  pageProps = Object.assign(pageProps, {
    user,
    machine,
    machines,
  } as AppProps);

  return (
    <>
      <Head>
        <title>Shellops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Logo></Logo>
      </header>
      {machine && host ? <Nav {...pageProps}></Nav> : ""}

      {typeof user === undefined ? (
        <LoadingSpinner />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

export default PanelApp;
