import styles from "./RecommandSlide.module.css";
import SimpleWineCard from "./SimpleWineCard";
import res from "./tempdata.js";
import type { SimpleWineData } from "./interfaces";

export default function RecommandSlide() {
  // console.log(res);
  let dataSet: SimpleWineData[] = [];
  res.map((data, i) => {
    const { id, name, image, avgRating } = data;
    dataSet[i] = { id: id, name: name, image: image, avgRating: avgRating };
  });

  return (
    <div className={styles.slide}>
      {dataSet.map((data, index) => (
        <SimpleWineCard key={index} data={data} />
      ))}
    </div>
  );
}
