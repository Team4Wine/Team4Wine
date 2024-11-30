"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

export interface ModalProps {
  modalName?: string;
  children?: React.ReactNode;
  modalClose?: boolean;
  onClose?: () => void;
  buttonClick?: () => void;
  isVisible?: boolean;
}

const Modal = ({
  modalName = '',
  children = null,
  modalClose = true,
  onClose = () => {},
  buttonClick = () => {},
  isVisible = false,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      buttonClick();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOutsideClick}
      onKeyUp={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className={`${styles.modal} ${isVisible ? styles.visible : styles.hidden}`} ref={modalRef}>
        <div className={styles.modalContent}>
          <header>
            <div className={styles.header}>
              <p>{modalName}</p>
              {modalClose && <button className={styles.closeButton}><IoClose size="24" color="#9facbd" /></button>}
            </div>
          </header>
          <section className={styles.contentSection}>
            <div className={`${styles.content} ${styles.modalContentCustomStyle}`}>
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Modal;
