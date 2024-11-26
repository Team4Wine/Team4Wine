import styles from "./page.module.css";
import RecommandSlide from "./RecommandSlide";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

export default function WineListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>헤더</p>
      </div>
      <div className={styles.recommand}>
        <div className={styles.recommandcontents}>
          <p className={styles.recommandtext}>이번 달 추천 와인</p>
          <RecommandSlide />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <div className={styles.filter}>
          <p>필터</p>
        </div>
        <div className={styles.list}>
          <SearchList />
        </div>
      </div>
      <div className={styles.add}>
        <p>+</p>
      </div>
    </div>
  );
}
