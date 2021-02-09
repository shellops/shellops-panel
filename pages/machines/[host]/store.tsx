import { useEffect, useState } from "react";

import styles from "./store.module.scss";

export default function Store() {
  const [templates, templatesChange] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/store/app-templates`).then(
      async (res) => {
        templatesChange(await res.json());
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
