import styles from "./RecommandSlide.module.css";
import SimpleWineCard from "./SimpleWineCard";
import MOCK_RESPONSE from "./MOCK_RESPONSE.js";
import type { SimpleWineData } from "./interfaces";

export default function RecommandSlide() {
  // console.log(res);
  let dataSet: SimpleWineData[] = MOCK_RESPONSE.map((data, i) => {
    const { id, name, image, avgRating } = data;
    return { id: id, name: name, image: image, avgRating: avgRating };
  });

  return (
    <div className={styles.slide}>
      {dataSet.map((data, index) => (
        <SimpleWineCard key={index} data={data} />
      ))}
    </div>
  );
}
