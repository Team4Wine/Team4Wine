"use client";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from "react";
import styles from "./page.module.css";
import RecommandSlide from "./RecommandSlide";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import Filter from "./Filter";

export default function WineListPage() {
  const [searchword, setSearchword] = useState<string>("");

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchword(e.target.value);
    // console.log("onSearchChange 이벤트 발생");
  };

  const onSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // console.log("onSearchSubmit: ", searchword);
      // searchword로 api get -> 리스트 업데이트
      // 공백이 들어온 경우: 쿼리 없이 get
    }
  };

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
          <SearchBar
            value={searchword}
            onChange={onSearchChange}
            onKeyDown={onSearchSubmit}
          />
        </div>
        <div className={styles.filter}>
          <Filter />
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
