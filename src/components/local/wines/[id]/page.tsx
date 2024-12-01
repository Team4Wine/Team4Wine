import styles from "./page.module.css";
import ReviewCard from "../ProductPage/ReviewCard";
import ReviewStatics from "../ProductPage/ReviewStatics";
import fetchData, { FetchDataOptions } from "@/utils/fetchData";
import { WineDataFull } from "../ProductPage/interfaces";
import { useEffect, useRef, useState } from "react";
import useModalStore from "@/components/common/modal/useStore";
import ReviewModal from "../../modal/review/ReviewModal";

const fetchProductData = async (
  id: number
): Promise<WineDataFull | undefined> => {
  let isLoading = true;

  // signin 연결 안되어서 인증토큰 하드코딩 후 기능확인함
  // 오류나면 새로 토큰 발급받아서 테스트 / 추후 교체 예정
  try {
    const data: FetchDataOptions = {
      url: `https://winereview-api.vercel.app/10-4/wines/${id}`,
      query: {},
      method: "GET",
      body: null,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc2LCJ0ZWFtSWQiOiIxMC00Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzMwOTEzMzcsImV4cCI6MTczMzA5MzEzNywiaXNzIjoic3AtZXBpZ3JhbSJ9.MBYX6iiieTTdhbhiUp2AAz7g0qt1VyTBU2bVGWXJn7s",
      },
    };
    const result = await fetchData(data);

    if (typeof result === undefined) {
      throw Error;
    } else return result;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading = false;
  }
};

export default async function WineProductPage({ params }: any) {
  // undefined일 확률이 제거되질 않아서(fetch 함수 내에서 확인중) 타입단언 이용함
  const item = (await fetchProductData(await params.id)) as WineDataFull;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { modals } = useModalStore();
  const modalId = useRef("reviewModal");

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
          <button className={styles.giveReview} onClick={() => setIsOpenModal(true)}>리뷰 남기기</button>
        </div>
      </div>
      {isOpenModal && <ReviewModal isClick={true} />}
    </div>
  );
}
