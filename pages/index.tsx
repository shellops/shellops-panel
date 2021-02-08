import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Machine from "../components/core/machine";
import { AppProps } from "../lib/interfaces/app-props.interface";
import useLiveMachinesEffect, {
  getUrlTokens,
} from "../lib/live-machines.effect";
import removeMachine from "../lib/remove-machine";
import styles from "./index.module.scss";

const Home: NextPage<any> = ({ machines }: AppProps) => {
  const [urlTokens, urlTokensChange] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const urls = getUrlTokens();
    if (!urls?.length) router.push("/add");
    else urlTokensChange(getUrlTokens());
  }, []);

  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.connect}>
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

            <Machine key="add" onAddMode={() => router.push("/add")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
