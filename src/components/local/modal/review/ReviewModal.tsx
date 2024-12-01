"use client";

import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/components/common/modal/useStore";
import styles from "./ReviewModal.module.css";
import { GiWineBottle } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "rc-slider";
import '@/assets/styles/rcSlider.css';

const ReviewModal = ({ isClick = false }) => {
  const { modals, openModal, closeModal } = useModalStore();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [aromaList, setAromaList] = useState<string[]>(['체리','베리','오크','바닐라', '후추', '제빵', '풀', '사과', '복숭아', '시트러스', '트로피컬', '미네랄', '꽃', '담뱃잎', '흙', '초콜릿', '스파이스', '카라멜', '가죽']);
  const [selectedAroma, setSelectedAroma] = useState<string[]>([]);
  const [lightBold, setLightBold] = useState<number>(0);
  const [smoothTannic, setSmoothTannic] = useState<number>(0);
  const [drySweet, setDrySweet] = useState<number>(0);
  const [softAcidic, setSoftAcidic] = useState<number>(0);
  const modalId = useRef('reviewModal');

  useEffect(() => {
    if (isClick) {
      openModal(modalId.current, <ReviewModal />);
    }
  }, [isClick, openModal]);

  const onClose = () => {
    closeModal(modalId.current);
  }

  const handleMouseEnter = (value: number) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleAromaClick = (aroma: string) => {
    if (selectedAroma.includes(aroma)) {
      setSelectedAroma(selectedAroma.filter((item) => item !== aroma));
    } else {
      setSelectedAroma([...selectedAroma, aroma]);
    }
  }

  return (
    <div>
      {modals[modalId.current]?.isVisible && (
        <Modal
          modalClose={false}
          modalName="리뷰 등록"
          onClose={onClose}
          isVisible={modals[modalId.current]?.isVisible}
        >
          <div className={styles.container}>
            <div className={styles.wineContent}>
              <div className={styles.wineImage}>
                <GiWineBottle size={54} color="#6a42db" />
              </div>
              <div className={styles.wineReview}>
                <h4>Wine Name API</h4>
                <div className={styles.starContainer}>
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return (
                      <span
                        key={value}
                        className={`${styles.star} ${value <= (hover || rating) ? styles.filled : ''}`}
                        onMouseEnter={() => handleMouseEnter(value)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(value)}
                      >
                        <FaStar size={22} color={`${value <= (hover || rating) ? '#6a42db' : '#cfdbea'}`} />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <textarea className={styles.reviewInput} placeholder="후기를 작성해 주세요" />
            <div className={styles.reviewContent}>
              <h3>와인의 맛은 어땠나요?</h3>
              <div className={styles.tasty}>
                <div className={styles.tastyItem}>
                  <div className={styles.reviewListType}>바디감</div>
                  <span>가벼워요</span>
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(value) => setLightBold(Number(value))}
                  />
                  <span>진해요</span>
                </div>
                <div className={styles.tastyItem}>
                  <div className={styles.reviewListType}>타닌</div>
                  <span>부드러워요</span>
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(value) => setSmoothTannic(Number(value))}
                  />
                  <span>떫어요</span>
                </div>
                <div className={styles.tastyItem}>
                  <div className={styles.reviewListType}>당도</div>
                  <span>드라이해요</span>
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(value) => setDrySweet(Number(value))}
                  />
                  <span>달아요</span>
                </div>
                <div className={styles.tastyItem}>
                  <div className={styles.reviewListType}>산미</div>
                  <span>안셔요</span>
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(value) => setSoftAcidic(Number(value))}
                  />
                  <span>많이셔요</span>
                </div>
              </div>
            </div>
            <div className={styles.aromaContent}>
              <h3>기억에 남는 향이 있나요?</h3>
              <section className={styles.aromaSection}>
                {aromaList.map((aroma, index) => (
                  <div
                    key={index}
                    className={`${styles.aroma} ${selectedAroma.includes(aroma) ? styles.selectedAroma : ''}`}
                    role="button"
                    onClick={() => handleAromaClick(aroma)}
                  >
                    {aroma}
                  </div>
                ))}
              </section>
            </div>
            <div>
              <button className={styles.reviewButton} onClick={() => onClose()}>리뷰 남기기</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ReviewModal;
