import styles from "./SearchList.module.css";
import WineCard from "./WineCard";
import res from "./tempdata.js";
import type { WineData } from "./interfaces";

export default function SearchList() {
  let dataSet: WineData[] = res;

  return (
    <div className={styles.list}>
      {dataSet.map((data, index) => (
        <WineCard key={index} data={data} />
      ))}
    </div>
  );
}
