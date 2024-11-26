import styles from "./Filter.module.css";
import { FilterProps } from "./interfaces";

export default function Filter(props: FilterProps) {
  // props.value 가 필터상태 객체
  // props.onChange가 필터상태 핸들러

  // rating: 상태는 boolean[] 타입, 각 체크박스의 체크여부를 가지는 5칸짜리 배열.

  return (
    <form action="#" className={styles.filters}>
      <input
        name="maxPrice"
        value={props.value?.maxPrice}
        onChange={props.onChange}
      />

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
        {/* checkbox 박스가 안보이는 이슈 있음 */}
        <label>
          <input
            type="checkbox"
            name="rating[0]"
            checked={props.value?.rating[0]}
            onChange={props.onChange}
          />
          4.5~5.0
        </label>
        <label>
          <input
            type="checkbox"
            name="rating[1]"
            checked={props.value?.rating[1]}
            onChange={props.onChange}
          />
          4.0~4.5
        </label>
        <label>
          <input
            type="checkbox"
            name="rating[2]"
            checked={props.value?.rating[2]}
            onChange={props.onChange}
          />
          3.5~4.0
        </label>
        <label>
          <input
            type="checkbox"
            name="rating[3]"
            checked={props.value?.rating[3]}
            onChange={props.onChange}
          />
          3.0~3.5
        </label>
        <label>
          <input
            type="checkbox"
            name="rating[4]"
            checked={props.value?.rating[4]}
            onChange={props.onChange}
          />
          0.0~3.0
        </label>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.reset}`}>초기화</button>
        <button className={`${styles.button} ${styles.apply}`}>
          설정 적용하기
        </button>
      </div>
    </form>
  );
}
