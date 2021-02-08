import styles from "./loading.module.scss";
export default function LoadingSpinner() {
  return (
    <div className={styles.windows8}>
      <div className={styles.wBall} id={styles.wBall_1}>
        <div className={styles.wInnerBall}></div>
      </div>
      <div className={styles.wBall} id={styles.wBall_2}>
        <div className={styles.wInnerBall}></div>
      </div>
      <div className={styles.wBall} id={styles.wBall_3}>
        <div className={styles.wInnerBall}></div>
      </div>
      <div className={styles.wBall} id={styles.wBall_4}>
        <div className={styles.wInnerBall}></div>
      </div>
      <div className={styles.wBall} id={styles.wBall_5}>
        <div className={styles.wInnerBall}></div>
      </div>
    </div>
  );
}
