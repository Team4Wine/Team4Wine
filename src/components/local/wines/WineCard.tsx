import styles from "./WineCard.module.css";
import type { ReviewDataBrief, WineDataBrief } from "./interfaces";
import StarRating from "./StarRating";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function WineCard(props: { data: WineDataBrief }) {
  // console.log("wine card에서: ", props.data);

  const item: WineDataBrief = props.data;

  const reviewText = item.recentReview
    ? item.recentReview.content
    : "아직 리뷰가 없어요. 리뷰를 등록해 보세요!";

  return (
    <div className={styles.card}>
      <div className={styles.contents}>
        <div className={styles.itempart}>
          <img
            className={styles.itemimage}
            src={item.image}
            alt="상품 이미지"
          />
          <div className={styles.infos}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.region}>{item.region}</p>
            <p className={styles.price}>₩ {Number(item.price).toLocaleString()}</p>
          </div>
          <div className={styles.reviews}>
            <p className={styles.avgRating}>{item.avgRating}</p>
            <StarRating grade={Math.round(item.avgRating)} size="large" />
            <p className={styles.reviewCount}>{item.reviewCount}개의 후기</p>
            <div className={styles.arrowcontainer}>
              <Link href={`/wines/${item.id}`}>
                <HiArrowRight className={styles.arrow} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reviewpart}>
        <div className={styles.reviewdiv}>
          <p className={styles.reviewheader}>최신 후기</p>
          <p className={styles.recentReview}>{reviewText}</p>
        </div>
      </div>
    </div>
  );
}
