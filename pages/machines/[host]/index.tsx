import { pick } from "lodash";
import { useRouter } from "next/router";
import prettyBytes from "pretty-bytes";

import { AppProps } from "../../../lib/interfaces/app-props.interface";
import removeMachine from "../../../lib/remove-machine";
import styles from "./index.module.scss";

export default function MachinePage({ machine }: AppProps) {
  const router = useRouter();

  const appVersions = pick(
    machine?.general?.versions || {},
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
    ].filter((p) => machine?.general?.versions[p])
  );

  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles.box}>
        <ul>
          <li>
            OS:
            <span>
              {machine?.general?.os?.distro}
              {machine?.general?.os?.release}
            </span>
          </li>

          <li>
            Hostname:
            <span>{machine?.general?.os?.hostname}</span>
          </li>

          <li>
            Kernel:
            <span>{machine?.general?.os?.kernel}</span>
          </li>

          <li>
            CPU:
            <span>
              {machine?.general?.cpu?.brand}, {machine?.general?.cpu.cores}{" "}
              Cores - {machine?.general?.cpu.speedmax} GHZ
            </span>
          </li>

          <li>
            Memory:
            <span></span>
            <ul>
              {machine?.general?.memories?.map((memory) => (
                <li key={memory.partNum}>
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
              {machine?.general?.disks?.map((disk) => (
                <li key={disk.device}>
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
              {machine?.general?.graphics?.controllers?.map((c) => (
                <li key={c.vendor}>
                  <span>
                    {c.vendor?.replace("Corporation", "")}
                    {c.model?.replace("Graphics Controller", "")}
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
                      (machine?.geoIp?.countryCode?.toLowerCase() || "xx") +
                      ".svg"
                    }
                  />
                  <span>
                    {machine?.geoIp?.ip} {machine?.geoIp?.isp}{" "}
                    {[machine?.geoIp?.country, machine?.geoIp?.city]
                      .filter((p) => p)
                      .join(", ") || "N/A"}
                  </span>
                </span>
              </li>
            </ul>
          </li>

          <li className={styles.versions}>
            {Object.keys(appVersions).map((app) => (
              <div key={app} className={styles.icon}>
                <img src={"/logos/" + app + "-original.svg"} alt="" />
                <span>{machine?.general?.versions[app]}</span>
              </div>
            ))}
          </li>
          <li className={styles.actions}>
            <button
              onClick={() =>
                removeMachine(machine.urlToken, () => router.push("/machines"))
              }
            >
              Remove Machine
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
