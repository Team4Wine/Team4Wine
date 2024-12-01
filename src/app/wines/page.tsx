"use client";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import styles from "./page.module.css";
import RecommendCarousel from "./RecommendCarousel";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import Filter from "./Filter";
import { HiPlusCircle } from "react-icons/hi2";
import { FilterState } from "./interfaces";

export default function WineListPage() {
  const [searchword, setSearchword] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({
    type: null,
    minPrice: 0,
    maxPrice: 100000,
    rating: [false, false, false, false, false],
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchword(e.target.value);
  };

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // searchword로 api get -> 리스트 업데이트
      // 공백이 들어온 경우: 쿼리 없이 get
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "type") {
      // handleFilterTChange(e);
    } else if (e.target.name === "maxPrice" || e.target.name === "minPrice") {
      handleFilterPChange(e);
    } else {
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
    const index = Number(e.target.name.slice(7, 8));
    const ratingArray = filter.rating;
    ratingArray[index] = e.target.checked;

    setFilter({
      ...filter,
      rating: ratingArray,
    });
  };

  const handleFilterSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    if (target.name == "apply") {
      handleFilterApply();
    } else if (target.name == "reset") {
      handleFilterReset();
    } else {
      // console.log("handleFilterSubmit에서: 분기 오류");
    }
  };

  const handleFilterReset = () => {
    setFilter({
      type: null,
      minPrice: 0,
      maxPrice: 100000,
      rating: [false, false, false, false, false],
    });
  };

  const handleFilterApply = () => {
    // 제출 동작
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p>헤더</p>
      </div>
      <div className={styles.recommand}>
        <div className={styles.recommandcontents}>
          <p className={styles.recommandtext}>이번 달 추천 와인</p>
          <RecommendCarousel />
        </div>
      </div>
      <div className={styles.addContainer}>
        <div className={styles.body}>
          <div className={styles.search}>
            <SearchBar
              value={searchword}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          </div>
          <div className={styles.filter}>
            <Filter
              value={filter}
              onChange={handleFilterChange}
              onSubmit={handleFilterSubmit}
            />
          </div>
          <div className={styles.list}>
            <SearchList />
          </div>
        </div>
        <div className={styles.addObject}>
          <HiPlusCircle className={styles.add} />
        </div>
      </div>
    </div>
  );
}
