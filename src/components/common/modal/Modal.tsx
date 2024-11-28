import styles from "./modal.module.css";

const Modal = ({
  modalName,
  modalContent,
  modalContentCustomStyle,
  modalClose = true,
  modalConfirmButton,
  modalCancelButton,
  modalAPI
}) => {
  return (
    <div className={styles.modal}>
      <p>테스트</p>
    </div>
  );
}

export default Modal;
