import styles from "./machine.module.scss";

export default function Machine({
  onAddMode,
  machine,
  urlToken,
  removeMachine,
}: {
  onAddMode?: any;
  urlToken?: string;
  machine?: any;
  removeMachine?;
  editMachine?;
}) {
  return (
    <>
      {urlToken ? (
        <div className={styles.machine}>
          <h2>
            {machine?.general ? (
              <img src="{'https://hatscripts.github.io/circle-flags/flags/'+ (machine?.geoIp?.countryCode?.toLowerCase() || 'xx') +'.svg'}" />
            ) : (
              ""
            )}
            {(urlToken?.split("@")[1] || urlToken)?.split(":")[0]}
          </h2>

          {machine?.general ? (
            <ul>
              <li>
                {machine?.general?.os?.distro}
                {machine?.general?.os?.release}
              </li>

              <li>
                {machine?.geoIp?.isp || "N/A"}{" "}
                {[machine?.geoIp?.city, machine?.geoIp?.country].join(", ") ||
                  "N/A"}
              </li>

              <li>
                CPU: {machine?.general?.cpu.cores} Cores -{" "}
                {machine?.general?.cpu.speedmax || machine?.general?.cpu.speed}
                GHZ
              </li>

              <li>Memory: {machine?.general?.memories[0]?.size}</li>
              <li>Disk: {machine?.general?.disks[0]?.size}</li>
            </ul>
          ) : (
            <>
              Trying to connect ...
              <br />
              {machine?.error ? (
                <>
                  Last error: <br /> ({machine.error.status}{" "}
                  {machine.error.statusText})
                </>
              ) : (
                ""
              )}
            </>
          )}

          <div className={styles.actions}>
            <img onClick={removeMachine} src="icons/solid/trash.svg" alt="" />
            <img src="icons/solid/edit.svg" alt="" />
          </div>
        </div>
      ) : (
        <div className={styles.add} onClick={onAddMode}>
          <img src="icons/solid/plus.svg" alt="" />
          <span>Add new machine</span>
        </div>
      )}
    </>
  );
}
