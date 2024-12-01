"use client";

import useModalStore from "@/components/common/modal/useStore";
import styles from "./WineModal.module.css";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/common/modal/Modal";
import Image from "next/image";
import { MdPhotoCamera } from "react-icons/md";

const WineModal = ({ isClick = true }) => {
  const { modals, openModal, closeModal } = useModalStore();
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const modalId = useRef('wine');

  useEffect(() => {
    if (isClick) {
      openModal(modalId.current, <WineModal />);
    }
  }, [isClick, openModal]);

  const onClose = () => {
    closeModal(modalId.current);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleClick = () => {
    fileRef.current?.click();
  }

  return (
    <div>
      {modals[modalId.current]?.isVisible && (
        <Modal
          modalName="와인 등록"
          modalClose={false}
          onClose={onClose}
          isVisible={modals[modalId.current]?.isVisible}
        >
          <div className={styles.container}>
            <div className={styles.wineContent}>
              <h3>와인 이름</h3>
              <input type="text" placeholder="와인 이름 입력"/>
            </div>
            <div className={styles.wineContent}>
              <h3>가격</h3>
              <input type="text" placeholder="가격 입력"/>
            </div>
            <div className={styles.wineContent}>
              <h3>원산지</h3>
              <input type="text" placeholder="원산지 입력"/>
            </div>
            <div className={styles.wineContent}>
              <h3>타입</h3>
              <select className={styles.dropdown}>
                <option className={styles.dropdownItem} value="red">Red</option>
                <option className={styles.dropdownItem} value="white">White</option>
                <option className={styles.dropdownItem}value="Sparkling">Sparkling</option>
              </select>
            </div>
            <div className={styles.wineImageContent}>
              <h3>와인 사진</h3>
              <input ref={fileRef} type="file" onChange={(e) => onChange(e)}/>
              <div className={styles.imagePreview} onClick={() => handleClick()}>
                {imageSrc ? <Image alt="미리보기 사진" src={imageSrc} width={140} height={140} /> : <MdPhotoCamera size={32} color="#9facbd"/>}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.cancelButton} onClick={() => onClose()}>취소</button>
              <button type="button" className={styles.confirmButton} onClick={() => onClose()}>와인 등록하기</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default WineModal;
