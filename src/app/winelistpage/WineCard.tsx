import styles from "./WineCard.module.css";
import type { WineData } from "./interfaces";

export default function WineCard(props: { data: WineData }) {
  // console.log("wine card에서: ", props.data);
  return <div className={styles.card}>와인 카드</div>;
}
