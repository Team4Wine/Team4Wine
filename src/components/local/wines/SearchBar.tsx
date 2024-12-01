import { SearchProps } from "./interfaces";
import styles from "./SearchBar.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar(props: SearchProps) {
  return (
    <div className={styles.bar}>
      <HiOutlineMagnifyingGlass className={styles.icon} />
      <input
        className={styles.inputfield}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder="와인을 검색해 보세요"
      />
    </div>
  );
}
