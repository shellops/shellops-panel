import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { AppProps } from "../../lib/interfaces/app-props.interface";
import { getUrlTokens } from "../../lib/get-url-tokens";
import saveMachine from "../../lib/save-machine";
import styles from "./add.module.scss";

const Home: NextPage<any> = ({ machines }: AppProps) => {
  const [urlToken, urlTokenChange] = useState("");
  const [urlTokens, urlTokensChange] = useState([]);

  const router = useRouter();

  useEffect(() => {
    urlTokensChange(getUrlTokens());
    return () => {};
  }, []);

  const handleSaveMachine = () => {
    if (!urlToken || urlTokens?.find((p) => p === urlToken)) return;
    saveMachine(urlToken, urlTokensChange);
    router.replace("/machines");
  };

  useEffect(() => {
   
    if (location.href.includes("?local=")) {
      const encodedUrl = location.href.split("?local=")[1].split("&")[0];

      const urlToken = atob(decodeURIComponent(encodedUrl));

      if (!urlTokens.find((p) => p.includes("localhost"))) {
        saveMachine(urlToken, urlTokensChange);
      }

      router.replace("/machines");
    }
  }, [urlTokens]);

  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.connect}>
        <section>
          <p>Install Shellops agent on your machine</p>
          <pre>npm i -g shellops</pre>
          <p>Start agent</p>
          <pre>shellops start</pre>
          <p>Paste printed URL Token</p>
          <input
            type="text"
            value={urlToken}
            onChange={(e) => urlTokenChange(e.target.value)}
            placeholder="URL Token here, EX: http://client:secret@1.2.3.4"
          />
          <button onClick={handleSaveMachine}>Save and Connect</button>
          {machines.length ? (
            <>
              <br />
              <a onClick={() => router.replace("/")}>Back to list</a>
            </>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
