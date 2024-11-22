import styles from "./page.module.css";
import WineCard from "./WineCard";
import RecommandSlide from "./RecommandSlide";

export default function WineListPage() {
  const testArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>헤더</p>
      </div>
      <div className={styles.recommand}>
        <p>이번 달 추천 와인</p>
        <RecommandSlide props={testArray} />
      </div>
      <div className={styles.body}>
        <div className={styles.search}>
          <p>검색바</p>
        </div>
        <div className={styles.filter}>
          <p>필터</p>
        </div>
        <div className={styles.list}>
          <p>와인 리스트</p>
          {testArray.map((value, index) => (
            <WineCard key={index} />
          ))}
        </div>
      </div>
      <div className={styles.add}>
        <p>+</p>
      </div>
    </div>
  );
}
