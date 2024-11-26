"use client";
import { ChangeEvent, useState } from "react";
import styles from "./SearchBar.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

// (props: SearchProps) 로 전달
// interface SearchProps {
//   value?: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

export default function SearchBar() {
  const [searchword, setSearchword] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchword(e.target.value);
    console.log("onChange 이벤트 발생");
  };

  return (
    <div className={styles.bar}>
      <HiOutlineMagnifyingGlass className={styles.icon} />
      <input
        className={styles.inputfield}
        value={searchword}
        onChange={onChange}
        placeholder="와인을 검색해 보세요"
      />
    </div>
  );
}
