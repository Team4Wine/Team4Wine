"use client";

import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/components/common/modal/useStore";
import { useEffect, useRef } from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ isClick = true }) => {
  const { modals, openModal, closeModal } = useModalStore();
  const modalId = useRef('deleteModal');

  useEffect(() => {
    if (isClick) {
      openModal(modalId.current, <DeleteModal />);
    }
  }, [isClick, openModal]);

  const onCancelButtonClick = () => {
    closeModal(modalId.current);
  }

  const onDeleteButtonClick = () => {
    closeModal(modalId.current);
  }

  const onClose = () => {
    closeModal(modalId.current);
  }

  return (
    <div>
      {modals[modalId.current]?.isVisible && (
        <Modal
          modalClose={false}
          onClose={onClose}
          isVisible={modals[modalId.current]?.isVisible}
        >
          <h3 className={styles.deletePhrase}>정말 삭제하시겠습니까?</h3>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onCancelButtonClick}>취소</button>
            <button className={styles.deleteButton} onClick={onDeleteButtonClick}>삭제하기</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default DeleteModal;
