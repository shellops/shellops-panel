import styles from "./logo.module.scss";
export default function Logo() {
  return (
    <a className={styles.logo} href="/">
      {" "}
      <img src="/logo.svg" alt="" />
      <h1>Shellops</h1>
    </a>
  );
}
