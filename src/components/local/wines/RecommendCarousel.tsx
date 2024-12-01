"use client";
import styles from "./RecommendCarousel.module.css";
import SimpleWineCard from "./SimpleWineCard";
import type { SimpleWineData } from "./interfaces";
import useRecommendStore from "./useRecommendStore";
import {  useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function RecommendCarousel() {
  const [shift, setShift] = useState<number>(0);
  const [leftEnd, setLeftEnd] = useState<boolean>(true);
  const [rightEnd, setRightEnd] = useState<boolean>(false);

  let { recommendedWines, fetchRecommendedWines } = useRecommendStore();

  useEffect(() => {
    fetchRecommendedWines();
  }, []);

  let dataSet: SimpleWineData[] = recommendedWines.map(
    (data: SimpleWineData, i: number) => {
      const { id, name, image, avgRating } = data;
      return { id: id, name: name, image: image, avgRating: avgRating };
    }
  );


  const handleLeftClick = () => {
    setRightEnd(false);

    if(200+shift<0) {
      setShift(shift+200);
    }else{
      setShift(0);
      setLeftEnd(true);
    }
  };

  const handleRightClick = () => {
    setLeftEnd(false);

    if(400+shift> 0) {
      setShift(shift-200);
    }else{
      setShift(-620);
      setRightEnd(true);
    }
   
  };

  // console.log(shift, leftEnd, rightEnd);

  return (
    <div className={styles.container}>
    <div className={styles.contents} style={{marginLeft:`${shift}px`,}}>
      {dataSet.map((data, index) => (
        <SimpleWineCard key={index} data={data} />
      ))}
    </div>
    <button className={styles.leftButton} style={leftEnd?{display:"none"}:{}} onClick={handleLeftClick}><HiChevronLeft /></button>
    <button className={styles.rightButton} style={rightEnd?{display:"none"}:{}} onClick={handleRightClick}><HiChevronRight /></button>
    </div>
  );
}
