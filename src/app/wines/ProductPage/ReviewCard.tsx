"use client";
import { useState } from "react";
import { ReviewDataFull } from "./interfaces";
import styles from "./ReviewCard.module.css";
import ReviewSlider from "./ReviewSlider";
import {
  HiUserCircle,
  HiOutlineHeart,
  HiHeart,
  HiOutlineDotsVertical,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { HiStar } from "react-icons/hi2";

export default function ReviewCard(props: { data: ReviewDataFull }) {
  const review: ReviewDataFull = props.data;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFolded, setIsFolded] = useState<boolean>(false);

  const handleIsLikedClick = () => {
    setIsLiked(!isLiked);
  };

  const handleIsFoldedClick = () => {
    setIsFolded(!isFolded);
  };

  const createdAt = props.data.createdAt;
  const present = new Date();

  const createdArray = createdAt.split(/-|T|:/);
  const presentArray = [
    present.getFullYear(),
    present.getMonth(),
    present.getDate(),
    present.getHours(),
    present.getMinutes(),
  ];

  let time: string = "";
  if (
    Number(createdArray[0]) == presentArray[0] &&
    Number(createdArray[1]) == presentArray[1] &&
    Number(createdArray[2]) == presentArray[2]
  ) {
    time = `${presentArray[3] - Number(createdArray[3])}시간 전`;
  } else {
    time = `${createdArray[0]}년 ${createdArray[1]}월 ${createdArray[2]}일`;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          {props.data.user.image == null ? (
            <HiUserCircle className={styles.avatarDefault} />
          ) : (
            <img className={styles.avatar} ref={props.data.user.image} />
          )}
          <div className={styles.userText}>
            <p className={styles.nickname}>{review.user.nickname}</p>
            <p className={styles.timeStamp}>{time}</p>
          </div>
        </div>
        <div className={styles.panels}>
          {isLiked ? (
            <HiHeart className={styles.liked} onClick={handleIsLikedClick} />
          ) : (
            <HiOutlineHeart
              className={styles.notLiked}
              onClick={handleIsLikedClick}
            />
          )}
          <HiOutlineDotsVertical className={styles.setting} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.briefReview}>
          <div className={styles.aromas}>
            {review.aroma.map((aroma, index) => (
              <div className={styles.aroma} key={index}>
                {aroma}
              </div>
            ))}
          </div>
          <div className={styles.ratingTag}>
            <HiStar className={styles.tagStar} />
            <p className={styles.tagText}>{review.rating}.0</p>
          </div>
        </div>
        <div className={styles.seeMore}>
          <div className={styles.content}>{review.content}</div>
          <div className={styles.slider}>
            <ReviewSlider subject="lightBold" value={review.lightBold} />
            <ReviewSlider subject="smoothTannic" value={review.smoothTannic} />
            <ReviewSlider subject="drySweet" value={review.drySweet} />
            <ReviewSlider subject="softAcidic" value={review.softAcidic} />
          </div>
        </div>
        <div className={styles.foldContainer}>
          {isFolded ? (
            <HiOutlineChevronDown
              className={styles.folded}
              onClick={handleIsFoldedClick}
            />
          ) : (
            <HiOutlineChevronUp
              className={styles.unFolded}
              onClick={handleIsFoldedClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
