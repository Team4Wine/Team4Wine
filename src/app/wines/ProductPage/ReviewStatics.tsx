import StarRating from "../StarRating";
import RatioBar from "./RatioBar";
import styles from "./ReviewStatics.module.css";

export default function ReviewStatics(props: {
  avgValue: number;
  everyValue: { [key: number]: number };
  count: number;
}) {
  const grade = [5, 4, 3, 2, 1];

  return (
    <div className={styles.container}>
      <div className={styles.upperdiv}>
        <p className={styles.bigText}>{props.avgValue}</p>
        <div className={styles.smallText}>
          <StarRating grade={Math.round(props.avgValue)} size="large" />
          <p>{props.count}개의 후기</p>
        </div>
      </div>
      <div className={styles.lowerdiv}>
        {grade.map((grade, index) => (
          <div className={styles.gradeBar} key={index}>
            <p className={styles.gradeText}>{grade}점</p>
            <RatioBar total={props.count} count={props.everyValue[grade]} />
          </div>
        ))}
      </div>
    </div>
  );
}
