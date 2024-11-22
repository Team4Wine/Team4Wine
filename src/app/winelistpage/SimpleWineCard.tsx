import styles from "./SimpleWineCard.module.css";
import type { SimpleWineData } from "./interfaces";

export default function SimpleWineCard(props: { data: SimpleWineData }) {
  // console.log("simple card에서: ", props.data);
  return <div className={styles.card}>심플 카드</div>;
}
