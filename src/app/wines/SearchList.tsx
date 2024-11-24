import styles from "./SearchList.module.css";
import WineCard from "./WineCard";
import MOCK_RESPONSE from "./MOCK_RESPONSE.js";
import type { WineData } from "./interfaces";

export default function SearchList() {
  let dataSet: WineData[] = MOCK_RESPONSE;

  return (
    <div className={styles.list}>
      {dataSet.map((data, index) => (
        <WineCard key={index} data={data} />
      ))}
    </div>
  );
}
