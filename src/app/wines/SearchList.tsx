import styles from "./SearchList.module.css";
import WineCard from "./WineCard";
import MOCK_RESPONSE from "./MOCK_RESPONSE.js";
import type { WineData } from "./interfaces";
import useSearchStore from "./useSearchStore";
import { useEffect } from "react";

export default function SearchList() {
  let { searchedWines, fetchSearchedWines } = useSearchStore();

  useEffect(() => {
    fetchSearchedWines();
  }, []);
  //키는 id/name/region/image/price/type/avgRating/reviewCount/recentReview(간단)/userId
  let dataSet: WineData[] = searchedWines;

  return (
    <div className={styles.list}>
      {dataSet.map((data, index) => (
        <WineCard key={index} data={data} />
      ))}
    </div>
  );
}
