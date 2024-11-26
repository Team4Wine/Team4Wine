"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./page.module.css";
import RecommandSlide from "./RecommandSlide";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import Filter from "./Filter";
import { FilterState, WineType } from "./interfaces";

export default function WineListPage() {
  const [searchword, setSearchword] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({
    type: [],
    minPrice: 1,
    maxPrice: 100000,
    rating: [false, false, false, false, false],
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchword(e.target.value);
    // console.log("onSearchChange 이벤트 발생");
  };

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // console.log("onSearchSubmit: ", searchword);
      // searchword로 api get -> 리스트 업데이트
      // 공백이 들어온 경우: 쿼리 없이 get
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handleFilter에서 name: ", e.target.name);
    console.log("handleFilter에서 value: ", e.target.value);
    console.log("handleFilter에서 checked: ", e.target.checked);
    if (e.target.name === "type") {
      console.log("분기1");
      // handleFilterTChange(e);
    } else if (e.target.name === "maxPrice" || e.target.name === "minPrice") {
      console.log("분기2-1");
      // handleFilterPChange(e);
    } else if (e.target.name === "minPrice") {
      console.log("분기2-2");
      // handleFilterPChange(e);
    } else {
      console.log("분기3");
      handleFilterRChange(e);
    }
  };

  const handleFilterTChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterRChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = "rating";
    const index = Number(e.target.name.slice(7, 8));
    const ratingArray = filter.rating;
    ratingArray[index] = e.target.checked;
    // console.log("handleFilterRChange에서, index: ", index);
    setFilter({
      ...filter,
      [e.target.name]: ratingArray,
    });
    console.log("handleFilterRChange에서: ", filter.rating);
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
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </div>
        <div className={styles.filter}>
          <Filter value={filter} onChange={handleFilterChange} />
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
