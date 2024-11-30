import styles from "./ReviewCard.module.css";
import { ReviewData } from "../interfaces";
import ReviewSlider from "./ReviewSlider";

export default function ReviewCard(props: { data: ReviewData }) {
  // console.log("review card에서: ", props.data);

  const review: ReviewData = props.data;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>●</div>
          <div className={styles.userText}>
            <p className={styles.nickname}>{review.user.nickname}</p>
            <p className={styles.createdAt}>10시간 전</p>
          </div>
        </div>
        <div className={styles.panels}>
          <p>♡</p>
          <p>:</p>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.aromas}>
          {review.aroma.map((aroma, index) => (
            <div className={styles.aroma} key={index}>
              {aroma}
            </div>
          ))}
        </div>
        <div className={styles.text}>{review.content}</div>
        <div className={styles.slider}>
          <ReviewSlider subject="lightBold" value={review.lightBold} />
          <ReviewSlider subject="smoothTannic" value={review.smoothTannic} />
          <ReviewSlider subject="drySweet" value={review.drySweet} />
          <ReviewSlider subject="softAcidic" value={review.softAcidic} />
        </div>
        <div className={styles.zip}>{">"}</div>
      </div>
    </div>
  );
}
