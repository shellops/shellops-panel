import { useRouter } from "next/router";
import styles from "./logo.module.scss";
export default function Logo() {
  const router = useRouter();

  return (
    <a className={styles.logo} onClick={() => router.replace("/")}>
      {" "}
      <img src="/logo.svg" alt="" />
      <h1>Shellops</h1>
    </a>
  );
}
