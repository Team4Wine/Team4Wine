import styles from "./SearchList.module.css";
import WineCard from "./WineCard";
import useSearchStore from "./useSearchStore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function SearchList() {
  const [ref, inView] = useInView();
  let { limit, nextCursor, searchedWines, fetchSearchedWines } =
    useSearchStore();

  useEffect(() => {
    if (inView && nextCursor !== null) {
      // console.log("추가 데이터 패치. nextcursor: ", nextCursor);
      fetchSearchedWines(limit, nextCursor, searchedWines);
    }
  }, [inView]);

  return (
    <div className={styles.list}>
      {searchedWines.map((data, index) => (
        <WineCard key={index} data={data} />
      ))}
      <div className={styles.scrollObserver} ref={ref}></div>
    </div>
  );
}
