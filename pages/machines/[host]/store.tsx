import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/layout/loading";
import fetchMachine from "../../../lib/fetch-machine";
import { AppProps } from "../../../lib/interfaces/app-props.interface";

import styles from "./store.module.scss";

export default function Store({ machine, refreshMachines }: AppProps) {
  const [templates, templatesChange] = useState([]);
  const [loading, loadingChange] = useState(true);

  const router = useRouter();

  function installApp(template) {
    loadingChange(true);
    fetchMachine(
      `/api/v1/machine/apps`,
      machine.urlToken,
      "POST",
      template
    ).then(() => {
      refreshMachines().then(() => {
        router.replace(`/machines/${machine.hostname}/apps`);
      });
    });
  }

  useEffect(() => {
    if (machine?.urlToken)
      fetchMachine(`/api/v1/store/app-templates`, machine.urlToken).then(
        (res) => {
          templatesChange(res);
          loadingChange(false);
        }
      );
  }, [machine]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className={styles.bg}></div>
      <div className="container">
        {templates.map((template) => (
          <div key={template.name} className={styles.box}>
            <div className={styles.title}>
              <img src="template.logo" alt="" />
              {template.name} {template.version}
            </div>

            <p className={styles.desc}>{template.description}</p>

            <div className={styles.buttons}>
              <button onClick={() => installApp(template)}>Install</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
