import { useRouter } from "next/router";
import { AppProps } from "../../lib/interfaces/app-props.interface";
import styles from "./nav.module.scss";

export default function Nav({ machine, user }: AppProps) {
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
        <li className={styles.back} onClick={() => router.back()}>
          <img src="/icons/solid/chevron-left.svg" alt="" />
        </li>

        <li className={styles.host}>
          {distro}
          {machine?.general?.system?.version}
          {machine?.general?.system?.virtual ? "(VIRTUAL)" : ""} -{" "}
          {machine?.urlToken?.split("@")[1].split(":")[0]}
        </li>

        <li>
          <img src="/icons/solid/info-circle.svg" alt="" />
          Info
        </li>

        <li>
          <img src="/icons/solid/cubes.svg" alt="" />
          Apps
        </li>

        <li>
          <img src="/icons/solid/shopping-cart.svg" alt="" />
          Store
        </li>
        <li>
          Logged in as <b>{user?.displayName || 'N/A'}</b>
        </li>
      </ul>
    </nav>
  );
}
