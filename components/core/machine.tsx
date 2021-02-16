import { useRouter } from 'next/router';
import prettyBytes from 'pretty-bytes';

import { MachineInfo } from '../../lib/interfaces/machine-info.interface';
import styles from './machine.module.scss';

export default function Machine({
  onAddMode,
  machine,
  urlToken,
  removeMachine,
}: {
  onAddMode?: any;
  urlToken?: string;
  machine?: MachineInfo;
  removeMachine?;
  editMachine?;
}) {
  const router = useRouter();

  return urlToken ? (
    <div className={styles.machine}>
      <h2>
        {machine?.general ? (
          <img
            src={
              "https://hatscripts.github.io/circle-flags/flags/" +
              (machine?.geoIp?.countryCode?.toLowerCase() || "xx") +
              ".svg"
            }
          />
        ) : (
          ""
        )}
        {(urlToken?.split("@")[1] || urlToken)?.split(":")[0]}
      </h2>

      {machine?.general ? (
        <ul>
          <li>
            {machine?.general?.os?.distro} {machine?.general?.os?.release}
          </li>

          <li>
            {machine?.geoIp?.isp}{" "}
            {[machine?.geoIp?.city, machine?.geoIp?.country]
              .filter((p) => p)
              .join(", ")}
          </li>

          <li>
            CPU: {machine?.general?.cpu.cores} Core{" "}
            {machine?.general?.cpu.speedmax || machine?.general?.cpu.speed}
            GHZ
          </li>

          <li>Memory: {prettyBytes(machine?.general?.memories?.[0]?.size || 0)}</li>
          <li>Disk: {prettyBytes(machine?.general?.disks?.[0]?.size  || 0 )}</li>
        </ul>
      ) : (
        <div>
          Trying to connect ...
          <br />
          {machine?.error ? (
            <>
              Last error: <br /> ({machine.error.status}{" "}
              {machine.error.statusText})
            </>
          ) : (
            <></>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <img onClick={removeMachine} src="icons/solid/trash.svg" alt="" />
        <button onClick={() => router.push("/machines/" + machine.hostname)}>
          Manage
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.add} onClick={onAddMode}>
      <img src="icons/solid/plus.svg" alt="" />
      <span>Add new machine</span>
    </div>
  );
}
