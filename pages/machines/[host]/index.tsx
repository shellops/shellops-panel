import prettyBytes from "pretty-bytes";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

import { useEffect, useState } from "react";
import useLiveMachinesEffect, {
  getUrlTokens,
} from "../../../lib/live-machines.effect";
import { pick } from "lodash";

export default function MachinePage(props) {
  const router = useRouter();
  const { host } = router.query;
  const [machines, machinesChange] = useState([]);
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

  const model = machines.find((p) => p.urlToken == urlToken);
  const appVersions = pick(
    model?.general?.versions || {},
    [
      "docker",
      "node",
      "npm",
      "mongodb",
      "redis",
      "mysql",
      "postgres",
      "nginx",
      "php",
      "apache",
      "java",
      "git",
      "virtualbox",
    ].filter((p) => model?.general?.versions[p])
  );

  useLiveMachinesEffect(machinesChange);

  console.log("render");

  return (
    <div className={styles.box}>
      <ul>
        <li>
          OS:
          <span>
            {model?.general?.os?.distro}
            {model?.general?.os?.release}
          </span>
        </li>

        <li>
          Hostname:
          <span>{model?.general?.os?.hostname}</span>
        </li>

        <li>
          Kernel:
          <span>{model?.general?.os?.kernel}</span>
        </li>

        <li>
          CPU:
          <span>
            {model?.general?.cpu?.brand}, {model?.general?.cpu.cores} Cores -{" "}
            {model?.general?.cpu.speedmax} GHZ
          </span>
        </li>

        <li>
          Memory:
          <span></span>
          <ul>
            {model?.general?.memories?.map((memory) => (
              <li>
                <span>
                  {memory?.type}
                  {prettyBytes(memory?.size)}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          Disk:
          <ul>
            {model?.general?.disks?.map((disk) => (
              <li>
                <span>
                  {disk?.type} {disk?.vendor} {prettyBytes(disk?.size)}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          Graphics:
          <ul>
            {model?.general?.graphics?.controllers?.map((c) => (
              <li>
                <span>
                  {c.vendor.replace("Corporation", "")}
                  {c.model.replace("Graphics Controller", "")}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          Public IP:
          <ul>
            <li>
              <span>
                <img
                  src={
                    "https://hatscripts.github.io/circle-flags/flags/" +
                    (model?.geoIp?.countryCode?.toLowerCase() || "xx") +
                    ".svg"
                  }
                />
                <span>
                  {model?.geoIp?.ip} {model?.geoIp?.isp}{" "}
                  {[model?.geoIp?.country, model?.geoIp?.city]
                    .filter((p) => p)
                    .join(", ") || 'N/A'}
                </span>
              </span>
            </li>
          </ul>
        </li>

        <li className={styles.versions}>
          {Object.keys(appVersions).map((app) => (
            <>
              <div className={styles.icon}>
                <img src={"/logos/" + app + "-original.svg"} alt="" />
                <span>{model?.general?.versions[app]}</span>
              </div>
            </>
          ))}
        </li>
        <li className={styles.actions}>
          <div className={styles.icon}>
            <img className={styles.trash} src="/icons/solid/trash.svg" alt="" />
            <span>Remove</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
