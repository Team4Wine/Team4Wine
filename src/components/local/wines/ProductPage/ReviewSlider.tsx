import styles from "./ReviewSlider.module.css";

type Subject = "lightBold" | "smoothTannic" | "drySweet" | "softAcidic";
const SUBJECT_MESSAGE = {
  lightBold: ["바디감", "가벼워요", "진해요"],
  smoothTannic: ["타닌", "부드러워요", "떫어요"],
  drySweet: ["당도", "드라이해요", "달아요"],
  softAcidic: ["산미", "안셔요", "많이셔요"],
};

export default function ReviewSlider(props: {
  subject: Subject;
  value: number;
}) {
  const subject = props.subject;

  return (
    <div className={styles.container}>
      <p className={styles.subject}>{SUBJECT_MESSAGE[subject][0]}</p>
      <p className={styles.leftTag}>{SUBJECT_MESSAGE[subject][1]}</p>
      <div className={styles.slider}>
        <div className={styles.bar} />
        <input
          className={styles.thumb}
          type="range"
          min={0}
          max={10}
          color="gray"
          step={1}
          value={props.value}
          readOnly
        />
      </div>
      <p className={styles.rightTag}>{SUBJECT_MESSAGE[subject][2]}</p>
    </div>
  );
}
