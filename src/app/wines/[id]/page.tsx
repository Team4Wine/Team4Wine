import WineProductPage from "@/components/local/wines/[id]/page";
import styles from "./page.module.css";

const WineProductItemPage = () => {
  return (
    <div className={styles.page}>
      <WineProductPage />
    </div>
  );
}

export default WineProductItemPage;
