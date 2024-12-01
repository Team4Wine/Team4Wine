"use client";

import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/components/common/modal/useStore";
import styles from "./FilterModal.module.css";
import { useEffect, useRef, useState } from "react";
import useFilterStore from "./useStore";
import Slider from 'rc-slider';
import '@/assets/styles/rcSlider.css';

const FilterModal = ({ isClick = false }) => {
  const { modals, openModal, closeModal } = useModalStore();
  const { setWineTypes, setPrice, setRating } = useFilterStore();
  const [range, setRange] = useState([0, 100000]);
  const [selected, setSelected] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState('4.5 - 4.8');
  const modalId = useRef('filterModal');

  useEffect(() => {
    if (isClick) {
      openModal(modalId.current, <FilterModal />);
    }
  }, [isClick, openModal]);

  const onClose = () => {
    closeModal(modalId.current);
  };

  const handleClick = (color: string) => {
    if (selected === color) {
      setSelected('');
      return;
    }
    setSelected(color);
  };

  const onClick = (event: any) => {
    console.log(selectedRating);
    setSelectedRating(event.target.value);
  };

  return (
    <div>
      {modals[modalId.current]?.isVisible && (
        <Modal
          modalName="필터"
          modalClose={true}
          onClose={onClose}
          isVisible={modals[modalId.current]?.isVisible}
        >
          <div className={styles.container}>
            <section className={styles.wineTypes}>
              <h3>WINE TYPES</h3>
              <div className={styles.buttonGroup}>
                <button
                  className={selected === 'Red' ? styles.selected : ''}
                  onClick={() => handleClick('Red')}
                >
                  Red
                </button>
                <button
                  className={selected === 'White' ? styles.selected : ''}
                  onClick={() => handleClick('White')}
                >
                  White
                </button>
                <button
                  className={selected === 'Sparkling' ? styles.selected : ''}
                  onClick={() => handleClick('Sparkling')}
                >
                  Sparkling
                </button>
              </div>
            </section>
            <section className={styles.price}>
              <h3>PRICE</h3>
              <div className={styles.range}>
                <span>₩ {Number(range[0]).toLocaleString()}</span>
                <span>₩ {Number(range[1]).toLocaleString()}</span>
              </div>
              <div className={styles.slider}>
                <Slider
                  range
                  min={0}
                  max={100000}
                  step={500}
                  onChange={(value) => setRange(Array.isArray(value) ? value : [value, value])}
                  defaultValue={[0, 100000]}
                />
              </div>
            </section>
            <section className={styles.rating}>
              <h3>RATING</h3>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    value="전체"
                    name="rating"
                    onClick={onClick}
                  />
                  <span className={`${styles.inputLabel} ${selectedRating == '전체' ? styles.selectedInputLabel : ''}`}>전체</span>
                  <div className={`${styles.check} ${selectedRating == '전체' ? styles.radioSelected : ''}`}></div>
                </label>
                <label>
                  <input
                    type="radio"
                    value="4.8 - 5.0"
                    name="rating"
                    onClick={onClick}
                  />
                  <span className={`${styles.inputLabel} ${selectedRating == '4.8 - 5.0' ? styles.selectedInputLabel : ''}`}>4.8 - 5.0</span>
                  <div className={`${styles.check} ${selectedRating == '4.8 - 5.0' ? styles.radioSelected : ''}`}></div>
                </label>
                <label>
                  <input
                    type="radio"
                    value="4.5 - 4.8"
                    name="rating"
                    onClick={onClick}
                  />
                  <span className={`${styles.inputLabel} ${selectedRating == '4.5 - 4.8' ? styles.selectedInputLabel : ''}`}>4.5 - 4.8</span>
                  <div className={`${styles.check} ${selectedRating == '4.5 - 4.8' ? styles.radioSelected : ''}`}></div>
                </label>
                <label>
                  <input
                    type="radio"
                    value="4.0 - 4.5"
                    name="rating"
                    onClick={onClick}
                  />
                  <span className={`${styles.inputLabel} ${selectedRating == '4.0 - 4.5' ? styles.selectedInputLabel : ''}`}>4.0 - 4.5</span>
                  <div className={`${styles.check} ${selectedRating == '4.0 - 4.5' ? styles.radioSelected : ''}`}></div>
                </label>
                <label>
                  <input
                    type="radio"
                    value="3.0 - 4.0"
                    name="rating"
                    onClick={onClick}
                  />
                  <span className={`${styles.inputLabel} ${selectedRating == '3.0 - 4.0' ? styles.selectedInputLabel : ''}`}>3.0 - 4.0</span>
                  <div className={`${selectedRating == '3.0 - 4.0' ? styles.radioSelected : styles.check}`}></div>
                </label>
              </div>
            </section>
          </div>
          <section className={styles.buttonSection}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
            >
              닫기
            </button>
            <button
              className={styles.filterButton}
              onClick={() => {
                setWineTypes(selected);
                setPrice(range[1]);
                setRating(Number(selectedRating.split(' - ')[0]));
                onClose();
              }}
            >
              필터 적용하기
            </button>
          </section>
        </Modal>
      )}
    </div>
  )
}

export default FilterModal;
