import '../styles/globals.scss';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoadingSpinner from '../components/layout/loading';
import Logo from '../components/layout/logo';
import Nav from '../components/layout/nav';
import currentUserEffect from '../lib/current-user.effect';
import fetchMachine from '../lib/fetch-machine';
import initFirebase from '../lib/firebase';
import { AppProps } from '../lib/interfaces/app-props.interface';
import { getUrlTokens } from '../lib/get-url-tokens';

const PanelApp = ({ Component, pageProps }) => {
  initFirebase();

  const router = useRouter();
  const { host } = router.query;
  const [user, userChange] = useState(undefined);
  const [urlToken, urlTokenChange] = useState(null);
  const [loading, loadingChange] = useState(true);

  // * Handle authentication changes
  currentUserEffect((user) => {
    userChange(user);
    loadingChange(false);
  });

  const urlTokens = getUrlTokens();

  const [machines, machinesChange] = useState([]);

  useEffect(() => {
    if (!loading && !machines.length && urlTokens.length)
      Promise.all(
        urlTokens.map(async (urlToken) => {
          try {
            const apps = await fetchMachine(`/api/v1/machine/apps`, urlToken);

            const containers = (
              await fetchMachine(`/api/v1/docker/containers`, urlToken)
            ).map((container) => {
              container.app = apps.find(
                (p) => "/" + p.container === container.Names[0]
              );
              return container;
            });

            return {
              general: await fetchMachine("/api/v1/sysinfo/general", urlToken),
              // geoIp: await fetchMachine("/api/v1/sysinfo/geo-ip", urlToken),
              urlToken,
              apps,
              containers,
              hostname: urlToken?.split("@")[1].split(":")[0],
            };
          } catch (error) {
            return {
              error,
              urlToken,
            };
          }
        })
      )
        .then((updatedMachines) => {
          machinesChange(updatedMachines);
        })
        .catch((e) => console.error);
  }, [urlTokens, machines, loading]);

  // useEffect(() => {
  //   if (
  //     !user &&
  //     !loading &&
  //     ["/machines"].find((p) => window.location.pathname.startsWith(p))
  //   ) {
  //     router.replace("/account");
  //   }
  // });

  useEffect(() => {
    urlTokenChange(
      getUrlTokens().find((p) => {
        const urlToken = new URL(p);
        return host === urlToken.hostname;
      })
    );
  }, [host, urlToken]);

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

      {!loading ? <Nav {...pageProps}></Nav> : ""}

      {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
    </>
  );
};

export default PanelApp;
