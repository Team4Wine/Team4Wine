import WineModal from "@/components/local/modal/wine/WineModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <p>테스트</p>
      <WineModal />
    </div>
  );
}
