import { useRouter } from 'next/router';

import { AppProps } from '../../lib/interfaces/app-props.interface';
import Logout from '../../lib/logout';
import styles from './nav.module.scss';

export default function Nav({ machine, machines, user }: AppProps) {
  const router = useRouter();

  const distro = (
    <img
      src={`/logos/${machine?.general?.os?.distro?.toLowerCase()}-original.svg`}
      alt=""
    />
  );

  return (
    <nav className={styles.nav}>
      <ul>
        {machine ? (
          <>
            <li
            
              onClick={() => router.replace("/")}
            >
              <img src="/icons/solid/chevron-left.svg" alt="" />
              Machines
            </li>

            <li className={styles.host}>
              {distro}
              {machine?.general?.system?.version}
              {machine?.general?.system?.virtual ? "(VIRTUAL)" : ""} -{" "}
              {machine?.hostname}
            </li>
            <li
              className={
                window.location.pathname === `/machines/${machine.hostname}`
                  ? styles.active
                  : ""
              }
              onClick={() => router.replace(`/machines/${machine.hostname}`)}
            >
              <img src="/icons/solid/info-circle.svg" alt="" />
              Info
            </li>

            <li
              className={
                window.location.pathname ===
                `/machines/${machine.hostname}/store`
                  ? styles.active
                  : ""
              }
              onClick={() =>
                router.replace(`/machines/${machine.hostname}/store`)
              }
            >
              <img src="/icons/solid/shopping-cart.svg" alt="" />
              Store
            </li>

            <li
              className={
                window.location.pathname ===
                `/machines/${machine.hostname}/apps`
                  ? styles.active
                  : ""
              }
              onClick={() =>
                router.replace(`/machines/${machine.hostname}/apps`)
              }
            >
              <img src="/icons/solid/cubes.svg" alt="" />
              Apps
            </li>
          </>
        ) : (
          <>
            <li
              className={
                window.location.pathname === `/machines` ? styles.active : ""
              }
              onClick={() =>
                router.replace(machines.length ? "/" : "/machines/add")
              }
            >
              <img src="/icons/solid/server.svg" alt="" />
              Machines
            </li>
          </>
        )}

        {/* <li>
          <img src="/icons/solid/user-secret.svg" alt="" />
          {user?.displayName}{" "}
          <img
            className={styles.caret}
            src="/icons/solid/caret-down.svg"
            alt=""
          />
          <ul>
            <li onClick={() => Logout()}>
              <img src="/icons/solid/sign-out-alt.svg" alt="" />
              Logout
            </li>
          </ul>
        </li> */}
      </ul>
    </nav>
  );
}
