//import HomePage from "./home/page";
import HomePage from "@/components/local/landingPage/LandingPage";
import styles from "./page.module.css";

const LandingPage = () => {
  return (
    <div className={styles.page}>
      <HomePage />
    </div>
  );
}

export default LandingPage;
