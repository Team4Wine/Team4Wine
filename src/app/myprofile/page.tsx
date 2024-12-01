"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

interface Review {
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review | null;
  userId: number;
}

interface User {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string;
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
  const [inputNickname, setInputNickname] = useState("");
  const [nickname, setNickname] = useState(""); // 초기 닉네임을 빈 문자열로 설정
  const [userData, setUserData] = useState<User | null>(null);
  const [wineData, setWineData] = useState<Wine[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(""); // 프로필 이미지 상태 추가

  const handleTabChange = (tab: "reviews" | "wines") => {
    setActiveTab(tab);
  };

  const handleNicknameChange = () => {
    if (inputNickname.trim() !== "") {
      setNickname(inputNickname); // 닉네임을 입력한 값으로 업데이트
      setInputNickname("");
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // 새로운 프로필 이미지 URL 설정
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc2LCJ0ZWFtSWQiOiIxMC00Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MzMwNDIzNjAsImV4cCI6MTczMzA0NDE2MCwiaXNzIjoic3AtZXBpZ3JhbSJ9.lVa1D9zi2SNVlecrLTuleA9bt4JNLpb_0lWfDvBad4U"; // 여기에 액세스 토큰을 입력하세요
        const response = await fetch(
          "https://winereview-api.vercel.app/10-4/users/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("유저 데이터를 가져오는 데 실패했습니다.");
        }

        const data: User = await response.json();
        setUserData(data);
        setProfileImage(data.image);
        setNickname(data.nickname); // 유저 데이터를 통해 프로필 이미지 설정
      } catch (error) {
        console.error("유저 데이터 가져오기 오류:", error);
        setUserData(null);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchWineData = async () => {
      try {
        const response = await fetch(
          "https://winereview-api.vercel.app/10-4/wines?limit=50"
        );
        const data = await response.json();

        const wines: Wine[] = data.list.map((item: any) => ({
          id: item.id,
          name: item.name,
          region: item.region,
          image: item.image,
          price: item.price,
          type: item.type,
          avgRating: item.avgRating,
          reviewCount: item.reviewCount,
          recentReview: item.recentReview
            ? {
                content: item.recentReview.content,
                createdAt: item.recentReview.createdAt,
                updatedAt: item.recentReview.updatedAt,
              }
            : null,
          userId: item.userId, // userId 추가
        }));
        setWineData(wines);
      } catch (error) {
        console.error("와인 데이터 가져오기 오류:", error);
      }
    };

    fetchUserData();
    fetchWineData();
  }, []);

  // userId가 376인 데이터만 필터링
  const filteredWineData = wineData.filter((wine) => wine.userId === 376);

  if (loadingUser) {
    return <p>프로필 정보를 불러오는 중...</p>;
  }

  return (
    <div>
      <div className={styles.navigateBar}>
        <Link href="/" passHref>
          <img src="logo.png" alt="와인로고" className={styles.logo} />
        </Link>
        <img
          src={profileImage || userData?.image || "/normalprofileimage.png"} // 프로필 이미지 업데이트
          alt="프로필"
          className={styles.navProfileImage}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.profileBox}>
          <img
            src={profileImage || userData?.image || "/normalprofileimage.png"} // 프로필 이미지 업데이트
            alt="프로필"
            className={styles.profileImage}
            onClick={() =>
              document.getElementById("profileImageInput")?.click()
            } // 프로필 이미지 클릭 시 파일 선택
          />
          <p className={styles.nickname}>
            {nickname || "닉네임 없음"} {/* 기존 닉네임 표시 */}
          </p>
          <p className={styles.email}>dudcks6813@naver.com</p>
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
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleProfileImageChange} // 프로필 이미지 변경 핸들러
            style={{ display: "none" }} // 파일 입력 요소 숨기기
          />
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
            <div className={styles.totalCount}>
              총 {filteredWineData.length}개
            </div>{" "}
          </div>

          {activeTab === "reviews" &&
            filteredWineData.map((wine) => (
              <div key={wine.id} className={styles.epilogueContainer}>
                <div className={styles.sorted}>
                  <div className={styles.starDate}>
                    <div className={styles.point}>
                      <img src="star.png" alt="별점" className={styles.star} />
                      <p>{wine.avgRating.toFixed(1)} 점</p>
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
            filteredWineData.map((wine) => (
              <div key={wine.id} className={styles.wineContainer}>
                <div className={styles.wineBox}>
                  <img
                    src={wine.image}
                    alt="와인사진"
                    className={styles.wineImage}
                  />
                  <div className={styles.wineDetails}>
                    <div className={styles.registeredWineName}>{wine.name}</div>
                    <div className={styles.wineRegion}>{wine.region}</div>
                    <div className={styles.winePrice}>
                      <p>₩{wine.price.toLocaleString()} </p>
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
            ))}
        </div>
      </div>
    </div>
  );
}
