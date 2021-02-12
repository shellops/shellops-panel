import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Machine from '../../components/core/machine';
import LoadingSpinner from '../../components/layout/loading';
import { AppProps } from '../../lib/interfaces/app-props.interface';
import { getUrlTokens } from '../../lib/live-machines.effect';
import removeMachine from '../../lib/remove-machine';
import styles from './index.module.scss';

export default function MachinesIndex({ machines }: AppProps) {
  const [urlTokens, urlTokensChange] = useState([]);
  const [loading, loadingChange] = useState(true);

  const router = useRouter();

  useEffect(() => {
    urlTokensChange(getUrlTokens())
    loadingChange(false);
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
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

            <Machine key="add" onAddMode={() => router.push("/machines/add")} />
          </div>
        </div>
      </div>
    </>
  );
}
