import styles from "./RecommandSlide.module.css";
import SimpleWineCard from "./SimpleWineCard";

export default function RecommandSlide(props: { props: number[] }) {
  const data: number[] = props.props;
  return (
    <div className={styles.slide}>
      {data.map((value, index) => (
        <SimpleWineCard key={index} />
      ))}
    </div>
  );
}
