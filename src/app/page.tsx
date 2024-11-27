import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className={styles.navigateBar}>
        <Link href="/" passHref>
          <img src="logo.png" alt="와인로고" className={styles.logo} />
        </Link>
        <div className={styles.account}>
          <Link href="/signin">
            <p>로그인</p>
          </Link>
          <Link href="/signup">
            <p>회원가입</p>
          </Link>
        </div>
      </div>

      <div className={styles.container}></div>

      <div className={styles.listContainer}>
        <div className={styles.contentBox}>
          <div className={styles.textBox}>
            <p>매달 새롭게 만나는 와인 추천 콘텐츠</p>
            <p>매달 다양한 인기 와인을 만나보세요.</p>
          </div>
          <div className={styles.innerContentBox}>
            <p>이번 달 추천 와인</p>
            <div className={styles.innerContentWrapper}>
              <div className={styles.itemBox}></div>
              <div className={styles.itemBox}></div>
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.textBox}>
            <p>다양한 필터로 찾는 내 맞춤 와인</p>
            <p>
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해요.
            </p>
          </div>
          <div className={styles.innerContentBox}></div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.textBox}>
            <p>
              직관적인
              <br />
              리뷰 시스템
            </p>
            <p>
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
