import styles from "./page.module.css";
import ReviewCard from "../ProductPage/ReviewCard";
import ReviewStatics from "../ProductPage/ReviewStatics";
//테스트페이지 424

// 목데이터인데 다이나믹 라우팅 때문에? import 문제가 있어서 임시로 이 파일에 추가합니다...
const WINE_DATA = {
  id: 424,
  name: "Castello di Ama L’Apparita 2020",
  region: "Tuscany, Italy",
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/364/1732326602605/image8.png",
  price: 22000,
  type: "RED",
  avgRating: 4.5,
  reviewCount: 6,
  recentReview: {
    id: 1163,
    rating: 4,
    lightBold: 8,
    smoothTannic: 3,
    drySweet: 1,
    softAcidic: 4,
    aroma: ["CHERRY", "BERRY", "OAK", "VANILLA", "FLOWER", "PEPPER"],
    content: "모처럼 계모임에~ 와인 한잔으로~ 기분내기~",
    createdAt: "2024-11-22T07:22:51.604Z",
    updatedAt: "2024-11-22T07:22:51.604Z",
    user: {
      id: 364,
      nickname: "team4",
      image: null,
    },
    likes: [],
  },
  userId: 364,
  reviews: [
    {
      id: 1163,
      rating: 4,
      aroma: ["CHERRY", "BERRY", "OAK", "VANILLA", "FLOWER", "PEPPER"],
      content: "모처럼 계모임에~ 와인 한잔으로~ 기분내기~",
      createdAt: "2024-11-22T07:22:51.604Z",
      updatedAt: "2024-11-22T07:22:51.604Z",
      lightBold: 8,
      smoothTannic: 3,
      drySweet: 1,
      softAcidic: 4,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
    {
      id: 1161,
      rating: 4,
      aroma: ["BERRY", "OAK", "VANILLA"],
      content: "잘마셨어용 굿굿",
      createdAt: "2024-11-22T07:18:07.281Z",
      updatedAt: "2024-11-22T07:18:07.281Z",
      lightBold: 8,
      smoothTannic: 3,
      drySweet: 3,
      softAcidic: 3,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
    {
      id: 1160,
      rating: 5,
      aroma: ["CHERRY", "BERRY", "OAK", "VANILLA", "MINERAL"],
      content:
        "처음 시향할때는 새콤한 베리 향이 톡 치고 들어오는데, 이후에는 드라이한 맛에 오크 베이스의 달콤하고 묵직한 아로마가 압도적입니다.. 이 가격대에서 찾아볼 수 있는 최고의 수작 아닐까 싶네요. 추천합니다.",
      createdAt: "2024-11-22T07:17:26.342Z",
      updatedAt: "2024-11-22T07:17:26.342Z",
      lightBold: 9,
      smoothTannic: 4,
      drySweet: 2,
      softAcidic: 2,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
    {
      id: 1159,
      rating: 4,
      aroma: ["CHERRY", "BERRY", "OAK", "VANILLA", "CARAMEL"],
      content: "호불호 안타고 저렴하니 입문용으로 좋습니다",
      createdAt: "2024-11-22T07:16:26.496Z",
      updatedAt: "2024-11-22T07:16:26.496Z",
      lightBold: 7,
      smoothTannic: 3,
      drySweet: 2,
      softAcidic: 1,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
    {
      id: 1158,
      rating: 5,
      aroma: ["BERRY", "OAK", "MINERAL", "VANILLA"],
      content: "ㅊㅊ",
      createdAt: "2024-11-22T07:14:49.586Z",
      updatedAt: "2024-11-22T07:14:49.586Z",
      lightBold: 7,
      smoothTannic: 3,
      drySweet: 2,
      softAcidic: 2,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
    {
      id: 1157,
      rating: 5,
      aroma: ["CHERRY", "BERRY", "OAK", "MINERAL"],
      content:
        "와인 산지로 유명한 토스카나 지방의 와인! 꽉찬 바디감에 드라이하면서도 떫은맛이 적고 향이 풍부해요",
      createdAt: "2024-11-22T07:07:14.271Z",
      updatedAt: "2024-11-22T07:07:14.271Z",
      lightBold: 8,
      smoothTannic: 3,
      drySweet: 3,
      softAcidic: 2,
      user: {
        id: 364,
        nickname: "team4",
        image: null,
      },
      isLiked: false,
    },
  ],
  avgRatings: {
    1: 0,
    2: 0,
    3: 0,
    4: 3,
    5: 3,
  },
};

export default async function WineProductPage({ params, searchParams }: any) {
  console.log("params :", await params);
  console.log("search params:", await searchParams);

  // id로 데이터패치 받기(Authorization 필요)
  const item = WINE_DATA;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>헤더</p>
      </div>
      <div className={styles.infoBanner}>
        <div className={styles.itempart}>
          <img
            className={styles.itemimage}
            src={item.image}
            alt="상품 이미지"
          />
          <div className={styles.infos}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.region}>{item.region}</p>
            <p className={styles.price}>₩ {item.price}</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.reviewList}>
          <h2 className={styles.listHeader}>리뷰목록</h2>
          {item.reviews.map((data, index) => (
            <ReviewCard data={data} key={index} />
          ))}
        </div>
        <div className={styles.statics}>
          <ReviewStatics
            avgValue={item.avgRating}
            everyValue={item.avgRatings}
            count={item.reviewCount}
          />
          <button className={styles.giveReview}>리뷰 남기기</button>
        </div>
      </div>
    </div>
  );
}
