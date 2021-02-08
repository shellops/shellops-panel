import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import Machine from "../components/core/machine";
import { AppProps } from "../lib/app-props.interface";
import useLiveMachinesEffect, {
  getUrlTokens,
} from "../lib/live-machines.effect";
import removeMachine from "../lib/remove-machine";
import saveMachine from "../lib/save-machine";
import styles from "./index.module.scss";

const Home: NextPage<any> = ({}: AppProps) => {
  
  let [addMode, toggleAddMode] = useState(false);
  const [urlToken, urlTokenChange] = useState("");
  const [machines, machinesChange] = useState([]);
  const [urlTokens, urlTokensChange] = useState([]);

  useEffect(() => {
    urlTokensChange(getUrlTokens());
    return () => {};
  }, []);

  if (!addMode && !urlTokens?.length) addMode = true;

  const handleSaveMachine = () => {
    if (!urlToken || urlTokens?.find((p) => p === urlToken)) return;
    saveMachine(urlToken, urlTokensChange);
  };
  // * Handle machine changes, refresh every 3 second
  useLiveMachinesEffect(  machinesChange);

  const add = (
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
    </section>
  );

  const list = (
    <div className="container">
      <div className={styles.list}>
        {urlTokens?.map((urlToken) => (
          <Machine
            key={urlToken}
            urlToken={urlToken}
            machine={machines?.find((p) => p.urlToken === urlToken)}
            removeMachine={() => removeMachine(urlToken, urlTokensChange)}
          />
        ))}

        <Machine key="add" onAddMode={() => toggleAddMode(true)} />
      </div>
    </div>
  );

  return <div className={styles.connect}>{addMode ? add : list}</div>;
};

export default Home;
