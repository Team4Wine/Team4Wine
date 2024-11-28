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
  id: number;
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
  const [wineData, setWineData] = useState<Wine[]>([]);
  const [profileImage, setProfileImage] = useState<string>("");

  const handleTabChange = (tab: "reviews" | "wines") => {
    setActiveTab(tab);
  };

  const handleNicknameChange = () => {
    if (inputNickname.trim() !== "") {
      setNickname(inputNickname);
      setInputNickname("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
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
        }));
        setWineData(wines);
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const filteredWineData = wineData.filter(
    (wine) => wine.recentReview !== null
  );

  return (
    <div>
      <div className={styles.navigateBar}>
        <Link href="/" passHref>
          <img src="logo.png" alt="와인로고" className={styles.logo} />
        </Link>
        <img
          src={profileImage || "/normalprofileimage.png"}
          alt="프로필"
          className={styles.navProfileImage}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.profileBox}>
          <label htmlFor="profile-image-upload">
            <img
              src={profileImage || "/normalprofileimage.png"}
              alt="프로필"
              className={styles.profileImage}
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
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
