"use client";

import { useState } from "react";
import styles from "./Profile.module.css";
import Link from "next/link";

export default function ProfilePage() {
  const [nickname, setNickname] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleTabChange = (tab: "reviews" | "wines") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={styles.navigateBar}>
        <Link href="/" passHref>
          <img src="logo.png" alt="와인로고" className={styles.logo} />
        </Link>
        <img
          src="favicon.ico"
          alt="프로필"
          className={styles.navProfileImage}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.profileBox}>
          <img
            src="/favicon.ico"
            alt="프로필"
            className={styles.profileImage}
          />
          <p className={styles.nickname}>{nickname}</p>
          <p className={styles.email}>기존 이메일</p>
          <p className={styles.name}>닉네임</p>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="변경할닉네임"
          />
          <button className={styles.changeButton}>변경하기</button>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.sort}>
            <div className={styles.category}>
              <div
                className={styles.categoryButton}
                onClick={() => handleTabChange("reviews")}
                style={{
                  color: activeTab === "reviews" ? "#2d3034" : "#9facbd",
                }}
              >
                <p>내가 쓴 후기</p>
              </div>
              <div
                className={styles.categoryButton}
                onClick={() => handleTabChange("wines")}
                style={{
                  color: activeTab === "wines" ? "#2d3034" : "#9facbd",
                }}
              >
                <p>내가 등록한 와인</p>
              </div>
            </div>
            <div className={styles.totalCount}>총 ?개</div>
          </div>

          {activeTab === "reviews" && (
            <>
              <div className={styles.epilogue}>
                <div className={styles.sorted}>
                  <div className={styles.starDate}>
                    <div className={styles.point}>
                      <img src="star.png" alt="별점" className={styles.star} />
                      <p>별점</p>
                    </div>
                    <div>
                      <div className={styles.elapse}>경과시간</div>
                    </div>
                  </div>

                  <button>
                    <img
                      src="editicon.png"
                      alt="수정삭제버튼"
                      className={styles.editButton}
                    />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "wines" && (
            <>
              <div className={styles.epilogue}>
                <div className={styles.sorted}>
                  <div className={styles.starDate}>
                    <div className={styles.point}>
                      <img
                        src="wine-icon.png"
                        alt="와인 아이콘"
                        className={styles.star}
                      />
                    </div>
                    <div>
                      <div className={styles.elapse}>와인명</div>
                      <div className={styles.elapse}>원산지</div>
                      <div className={styles.elapse}>가격</div>
                    </div>
                  </div>

                  <button>
                    <img
                      src="editicon.png"
                      alt="수정삭제버튼"
                      className={styles.editButton}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
