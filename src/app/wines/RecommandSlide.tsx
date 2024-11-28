import styles from "./RecommandSlide.module.css";
import SimpleWineCard from "./SimpleWineCard";
import type { SimpleWineData } from "./interfaces";
import useRecommendStore from "./useRecommendStore";
import { useEffect } from "react";

export default function RecommandSlide() {
  let { recommendedWines, fetchRecommendedWines } = useRecommendStore();

  useEffect(() => {
    fetchRecommendedWines();
  }, []);

  let dataSet: SimpleWineData[] = recommendedWines.map(
    (data: SimpleWineData, i: number) => {
      const { id, name, image, avgRating } = data;
      return { id: id, name: name, image: image, avgRating: avgRating };
    }
  );

  return (
    <div className={styles.slide}>
      {dataSet.map((data, index) => (
        <SimpleWineCard key={index} data={data} />
      ))}
    </div>
  );
}
