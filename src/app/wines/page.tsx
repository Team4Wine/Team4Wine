import WineListPage from "@/components/local/wines/page";
import styles from "./page.module.css";

const WinesPage = () => {
  return (
    <div className={styles.page}>
      <WineListPage />
    </div>
  );
}

export default WinesPage;
