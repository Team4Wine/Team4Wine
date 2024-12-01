"use client";

import { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
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

export default function HomePage() {
  const [wineData, setWineData] = useState<Wine[]>([]);
  const [randomWines, setRandomWines] = useState<Wine[]>([]);

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

        const filteredWines = wines.filter((wine) => wine.avgRating > 0);
        const shuffled = filteredWines.sort(() => 0.5 - Math.random());
        setRandomWines(shuffled.slice(0, 5));
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchWineData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomWines((prev) => {
        const firstWine = prev[0];
        return [...prev.slice(1), firstWine];
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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

      <div className={styles.container}>
        <div className={styles.title}>
          <p>WINE</p>
        </div>
        <div className={styles.subTitle}>
          <p>
            한 곳에서 관리하는
            <br />
            나만의 와인창고
          </p>
        </div>
        <div className={styles.rotationBox}>
          {randomWines.map((wine, index) => (
            <div key={wine.id} className={styles[`mainItemBox${index + 1}`]}>
              <img
                src={wine.image}
                alt={wine.name}
                className={styles.wineImage}
              />
              <div className={styles.wineDetails}>
                <div className={styles.wineRating}>
                  {wine.avgRating.toFixed(1)}
                </div>
                <div>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src={
                        starIndex < Math.round(wine.avgRating)
                          ? "/star.png"
                          : "/blackstar.png"
                      }
                      className={styles.wineStarRating}
                      alt="별점"
                    />
                  ))}
                </div>
                <div className={styles.wineName}>{wine.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.contentBox}>
          <div className={styles.textBox}>
            <p>매달 새롭게 만나는 와인 추천 콘텐츠</p>
            <p>매달 다양한 인기 와인을 만나보세요.</p>
          </div>
          <div className={styles.innerContentBox}>
            <p>이번 달 추천 와인</p>
            <div className={styles.innerContentWrapper}>
              <div className={styles.itemBox}>
                <img src="/winecard1.png" className={styles.wineCard} />
              </div>
              <div className={styles.itemBox}>
                <img src="/winecard2.png" className={styles.wineCard} />
              </div>
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
          <div className={styles.innerContentBox}>
            <img src="filterwine.png" className={styles.filterWine} />
            <img
              src="filterwinedetail.png"
              className={styles.filterWineDetail}
            />
            <img
              src="filterwinerating.png"
              className={styles.filterWineRating}
            />
          </div>
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
          <img src="/review.png" className={styles.reviewImage} />
        </div>
        <Link href="/wines" className={styles.wineButton}>
          <button>
            <p>와인 보러가기</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
