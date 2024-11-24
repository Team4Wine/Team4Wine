import styles from "./SimpleWineCard.module.css";
import { HiStar } from "react-icons/hi2";

export default function StarRating(props: { grade: number }) {
  const isActive: number[] = [0];
  for (let i = 0; i < 5; i++) {
    isActive[i] = i < props.grade ? 1 : 0;
  }
  console.log("isActive: ", isActive);

  return (
    <div className={styles.stars}>
      {isActive.map((value, index) =>
        value ? (
          <HiStar className={styles.active} key={index} color="#6a42db" />
        ) : (
          <HiStar className={styles.inactive} key={index} color="#cfdbea" />
        )
      )}
    </div>
  );
}
