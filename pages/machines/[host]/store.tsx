import { useEffect, useState } from "react";
import fetchMachine from "../../../lib/fetch-machine";
import { AppProps } from "../../../lib/interfaces/app-props.interface";

import styles from "./store.module.scss";

export default function Store({ machine }: AppProps) {
  const [templates, templatesChange] = useState([]);

  useEffect(() => {
    fetchMachine(`/api/v1/store/app-templates`, machine.urlToken).then(
      async (res) => {
        templatesChange(res);
      }
    );
  });

  return (
    <>
      <div className={styles.bg}></div>
      <div className="container">
        {templates.map((template) => (
          <div className={styles.box}>
            <div className={styles.title}>
              <img src="template.logo" alt="" />
              {template.name} {template.version}
            </div>

            <p className={styles.desc}>{template.description}</p>

            <div className={styles.buttons}>
              <button>Install</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
