import styles from "./SimpleWineCard.module.css";
import type { SimpleWineData } from "./interfaces";
import StarRating from "./StarRating";

export default function SimpleWineCard(props: { data: SimpleWineData }) {
  // console.log("simple card에서: ", props.data);
  const { id, name, image, avgRating } = props.data;

  return (
    <div className={styles.card}>
      <div className={styles.contents}>
        <img className={styles.image} src={image} alt="상품 이미지" />
        <div className={styles.description}>
          <p className={styles.avgRating}>{avgRating}</p>
          <StarRating grade={Math.round(avgRating)} size="small" />
          <p className={styles.name}>{name}</p>
        </div>
      </div>
    </div>
  );
}
