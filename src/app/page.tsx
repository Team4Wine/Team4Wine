import styles from "./page.module.css";
import SignUp from "./SignupPage/SignUp";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <p>테스트</p> */}
      <SignUp />
    </div>
  );
}
