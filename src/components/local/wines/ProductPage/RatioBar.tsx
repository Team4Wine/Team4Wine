import styles from "./RatioBar.module.css";

export default function RatioBar(props: { total: number; count: number }) {
  const ratio = (props.count / props.total) * 100;

  return (
    <div className={styles.gray}>
      <div className={styles.purple} style={{ width: `${ratio}%` }}></div>
    </div>
  );
}
