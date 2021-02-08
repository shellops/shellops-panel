import { NextPage } from "next";
import mitt from "next/dist/next-server/lib/mitt";
import React, { useState } from "react";

import Machine from "../components/core/machine";
import { AppProps } from "../lib/app-props.interface";
import liveMachinesEffect from "../lib/live-machines.effect";
import removeMachine from "../lib/remove-machine";
import saveMachine from "../lib/save-machine";
import styles from "./index.module.scss";

const Home: NextPage<any> = ({}: AppProps) => {
  const savedTokens: string[] = JSON.parse(
    global.localStorage?.getItem("urlTokens") || null
  );

  const [urlToken, urlTokenChange] = useState("");
  const [addMode, toggleAddMode] = useState(false);
  const [machines, machinesChange] = useState(null);
  const [urlTokens, urlTokensChange] = useState(savedTokens);

  if (!addMode && !urlTokens?.length) toggleAddMode(true);

  // * Handle machine changes, refresh every 3 second
  liveMachinesEffect(urlTokens, machines, machinesChange);

  const addNew = (
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
      <button onClick={() => saveMachine(urlToken, urlTokensChange)}>
        Save and Connect
      </button>
    </section>
  );

  const list = (
    <div className="container">
      {urlTokens?.map((urlToken) => (
        <Machine
          key={urlToken}
          urlToken={urlToken}
          machine={machines?.find((p) => p.urlToken === urlToken)}
          removeMachine={() => removeMachine(urlToken, urlTokensChange)}
        />
      ))}
      {/* Add Button */}
      <Machine />
    </div>
  );

  return (
    <>
      <div className={styles.connect}>{addMode ? addNew : list}</div>
    </>
  );
};

export default Home;
