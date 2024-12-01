import styles from "./StarRating.module.css";
import { HiStar } from "react-icons/hi2";

export default function StarRating(props: { grade: number; size: string }) {
  const isActive: number[] = [0];
  for (let i = 0; i < 5; i++) {
    isActive[i] = i < props.grade ? 1 : 0;
  }
  // console.log("isActive: ", isActive);

  return (
    <div className={props.size == "small" ? styles.small : styles.large}>
      {isActive.map((value, index) =>
        value ? (
          <HiStar className={styles.active} key={index} />
        ) : (
          <HiStar className={styles.inactive} key={index} />
        )
      )}
    </div>
  );
}
