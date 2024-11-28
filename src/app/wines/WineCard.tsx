import styles from "./WineCard.module.css";
import type { ReviewData, WineData } from "./interfaces";
import StarRating from "./StarRating";
import { HiArrowRight } from "react-icons/hi";

export default function WineCard(props: { data: WineData }) {
  // console.log("wine card에서: ", props.data);

  const item: WineData = props.data;

  let reviewOneLine: string;

  if (item.recentReview) {
    reviewOneLine = "테스트용 리뷰";
    // console.log("---------");
    // api 응답에 recentReview가 간략한 폼으로 들어가있음(schema와 실제응답 다름)

    // reviewOneLine =
    //   item.recentReview.aroma.join(", ") + " - " + item.recentReview.content;
  } else {
    reviewOneLine = "아직 리뷰가 없어요. 리뷰를 등록해 보세요!";
  }

  return (
    <div className={styles.card}>
      <div className={styles.contents}>
        <div className={styles.itempart}>
          <img
            className={styles.itemimage}
            src={item.image}
            alt="상품 이미지"
          />
          <div className={styles.itemtext}>
            <div className={styles.upperdiv}>
              <div className={styles.infos}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.region}>{item.region}</p>
              </div>
              <div className={styles.reviews}>
                <p className={styles.avgRating}>{item.avgRating}</p>
                <StarRating grade={Math.round(item.avgRating)} />
                <p className={styles.reviewCount}>
                  {item.reviewCount}개의 후기
                </p>
              </div>
            </div>
            <div className={styles.lowerdiv}>
              <p className={styles.price}>₩ {item.price}</p>
              <HiArrowRight className={styles.arrow} />
            </div>
          </div>
        </div>
        <div className={styles.reviewpart}>
          <div className={styles.reviewdiv}>
            <p className={styles.reviewheader}>최신 후기</p>
            <p className={styles.recentReview}>{reviewOneLine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
