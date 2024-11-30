import styles from "./ReviewSlider.module.css";

export default function ReviewSlider(props: {
  subject: string;
  value: number;
}) {
  return (
    <div className={styles.slider}>
      {props.subject}: {props.value}
    </div>
  );
}
