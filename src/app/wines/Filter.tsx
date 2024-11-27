import styles from "./Filter.module.css";
import { FilterProps } from "./interfaces";

export default function Filter(props: FilterProps) {
  const RATING_VALUE = [
    "4.5 - 5",
    "4.0-4.5",
    "3.5 - 4.0",
    "3.0 - 3.5",
    "0 - 3.0",
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <p className={styles.header}>WINES TYPES</p>
        <div className={styles.typeContent}>
          <button className={styles.typeElement}>Red</button>
          <button className={styles.typeElement}>White</button>
          <button className={styles.typeElement}>Sparkling</button>
        </div>
      </div>
      <div className={styles.filter}>
        <p className={styles.header}>PRICE</p>
        <div className={styles.priceContent}>
          <label className={styles.priceBar}>
            <p>￦</p>
            <input
              className={styles.priceInput}
              type="number"
              name="minPrice"
              value={props.value?.minPrice}
              onChange={props.onChange}
            />
            <p>이상</p>
          </label>
          <label className={styles.priceBar}>
            <p>￦</p>
            <input
              className={styles.priceInput}
              type="number"
              name="maxPrice"
              value={props.value?.maxPrice}
              onChange={props.onChange}
            />
            <p>이하</p>
          </label>
        </div>
      </div>
      <div className={styles.filter}>
        <p className={styles.header}>RATING</p>
        {/* checkbox 박스가 안보이는 이슈 있음 */}
        <div className={styles.ratingContent}>
          {RATING_VALUE.map((value, index) => {
            return (
              <label className={styles.ratingElement}>
                <div className={styles.box} />
                <input
                  className={styles.input}
                  type="checkbox"
                  name={`rating[${index}]`}
                  checked={props.value?.rating[index]}
                  onChange={props.onChange}
                />
                <p className={styles.text}>{value}</p>
              </label>
            );
          })}
        </div>
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
