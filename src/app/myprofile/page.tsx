"use client";

import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Link from "next/link";

interface Review {
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Wine {
  id: string;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review | null;
}

const timeAgo = (date: string) => {
  const now = new Date();
  const createdDate = new Date(date);
  const diffInMs = now.getTime() - createdDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [nickname, setNickname] = useState("닉네임");
  const [inputNickname, setInputNickname] = useState("");

  const handleTabChange = (tab: "reviews" | "wines") => {
    setActiveTab(tab);
  };

  const handleNicknameChange = () => {
    if (inputNickname.trim() !== "") {
      setNickname(inputNickname);
      setInputNickname("");
    }
  };

  // 동적으로 와인 데이터 배열을 만들기
  const wineData: Wine[] = [
    {
      id: "424",
      name: "Castello di Ama L’Apparita 2020",
      region: "Tuscany, Italy",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/364/1732326602605/image8.png",
      price: 22000,
      type: "RED",
      avgRating: 4.5,
      reviewCount: 6,
      recentReview: {
        id: "1163",
        content: "모처럼 계모임에~ 와인 한잔으로~ 기분내기~",
        createdAt: "2024-11-22T07:22:51.604Z",
        updatedAt: "2024-11-22T07:22:51.604Z",
      },
      userId: 364,
    },
    {
      id: "425",
      name: "Force Majeure Cabernet Sauvignon 2011",
      region: "Washington, USA",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/364/1732326589740/image9.png",
      price: 68000,
      type: "RED",
      avgRating: 5,
      reviewCount: 1,
      recentReview: {
        id: "1165",
        content:
          "상당히 드라이하고 탄닌감이 강한 종입니다. 하지만 바디감이 중심을 잡아주고 미네랄과 과일향이 레이어를 쌓아 고급스럽고 완성도 높아 와인 매니아 분들이라면 시도해보실만 한 것 같네요.",
        createdAt: "2024-11-22T07:26:25.487Z",
        updatedAt: "2024-11-22T07:26:25.487Z",
      },
      userId: 364,
    },
    {
      id: "426",
      name: "Mount Peak Winery Cabernet Sauvignon Sentinel 2016",
      region: "California, USA",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/364/1732326577497/image10.png",
      price: 78000,
      type: "RED",
      avgRating: 2,
      reviewCount: 1,
      recentReview: {
        id: "1166",
        content: "미국 와인은 처음인데 별로. 싸지 않은 값이었는데 너무 거침.",
        createdAt: "2024-11-22T07:30:39.329Z",
        updatedAt: "2024-11-22T07:30:39.329Z",
      },
      userId: 364,
    },
  ];

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
            placeholder="변경할닉네임"
            value={inputNickname}
            onChange={(e) => setInputNickname(e.target.value)}
          />
          <button
            className={styles.changeButton}
            onClick={handleNicknameChange}
          >
            변경하기
          </button>
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
            <div className={styles.totalCount}>총 {wineData.length}개</div>{" "}
            {/* 동적 와인 개수 표시 */}
          </div>

          {activeTab === "reviews" &&
            wineData.map((wine) => (
              <div key={wine.id} className={styles.epilogueContainer}>
                <div className={styles.sorted}>
                  <div className={styles.starDate}>
                    <div className={styles.point}>
                      <img src="star.png" alt="별점" className={styles.star} />
                      <p>{wine.avgRating} 점</p>
                    </div>
                    <div className={styles.elapse}>
                      {timeAgo(wine.recentReview?.createdAt || "")}
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
                <div>
                  <div className={styles.wineName}>{wine.name}</div>
                  <div className={styles.epilogue}>
                    {wine.recentReview?.content || "후기가 없습니다."}
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "wines" &&
            wineData.map((wine) => (
              <div key={wine.id} className={styles.wineContainer}>
                <img
                  src={wine.image}
                  alt="와인사진"
                  className={styles.wineImage}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
