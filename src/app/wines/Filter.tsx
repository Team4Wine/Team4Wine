import styles from "./Filter.module.css";

export default function Filter() {
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <p className={styles.header}>WINES TYPES</p>
        <div className={styles.types}>
          <button className={styles.type}>Red</button>
          <button className={styles.type}>White</button>
          <button className={styles.type}>Sparkling</button>
        </div>
      </div>
      <div className={styles.filter}>
        <p className={styles.header}>PRICE</p>
        <p>0 ~ 100,000</p>
      </div>
      <div className={styles.filter}>
        <p className={styles.header}>RATING</p>
        <p>o 4.5~5.0</p>
        <p>o 4.0~4.5</p>
        <p>o 3.5~4.0</p>
        <p>o 3.0~3.5</p>
        <p>o 0~3.0</p>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.reset}`}>초기화</button>
        <button className={`${styles.button} ${styles.apply}`}>
          설정 적용하기
        </button>
      </div>
    </div>
  );
}
