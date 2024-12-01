"use client";

import styles from "./Filter.module.css";
import { useEffect, useRef, useState } from "react";
import Slider from 'rc-slider';
import '@/assets/styles/rcSlider.css';

const Filter = () => {
  const [range, setRange] = useState([0, 100000]);
  const [selected, setSelected] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState('');

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
                value="4.5 - 5.0"
                name="rating"
                onClick={onClick}
              />
              <span className={`${styles.inputLabel} ${selectedRating == '4.5 - 5.0' ? styles.selectedInputLabel : ''}`}>4.5 - 5.0</span>
              <div className={`${styles.check} ${selectedRating == '4.5 - 5.0' ? styles.radioSelected : ''}`}></div>
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
                value="3.5 - 4.0"
                name="rating"
                onClick={onClick}
              />
              <span className={`${styles.inputLabel} ${selectedRating == '3.5 - 4.0' ? styles.selectedInputLabel : ''}`}>3.5 - 4.0</span>
              <div className={`${styles.check} ${selectedRating == '3.5 - 4.0' ? styles.radioSelected : ''}`}></div>
            </label>
            <label>
              <input
                type="radio"
                value="3.0 - 3.5"
                name="rating"
                onClick={onClick}
              />
              <span className={`${styles.inputLabel} ${selectedRating == '3.0 - 3.5' ? styles.selectedInputLabel : ''}`}>3.0 - 3.5</span>
              <div className={`${styles.check} ${selectedRating == '3.0 - 3.5' ? styles.radioSelected : ''}`}></div>
            </label>
            <label>
              <input
                type="radio"
                value="0 - 3.0"
                name="rating"
                onClick={onClick}
              />
              <span className={`${styles.inputLabel} ${selectedRating == '0 - 3.0' ? styles.selectedInputLabel : ''}`}>0 - 3.0</span>
              <div className={`${selectedRating == '0 - 3.0' ? styles.radioSelected : styles.check}`}></div>
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Filter;
