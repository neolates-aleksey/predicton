import React, { useEffect, useRef, useState } from "react";
import "./Range.scss";

const Range = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);

  const calculatePercent = () => {};

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!blockRef.current) {
      return;
    }

    // const touch = e.touches[0];
    // const touchX = touch.pageX;

    // const blockRect = blockRef.current.getBoundingClientRect()
    // const blockStartX = blockRect.left

    const touch = e.touches[0];
    const touchX = touch.pageX;

    const blockRect = blockRef.current.getBoundingClientRect();
    const blockStartX = blockRect.left;
    const blockWidth = blockRect.width;

    // Рассчитываем смещение от начала блока
    const offsetX = touchX - blockStartX;

    // Рассчитываем процент
    const newPercent = Math.min(Math.max(offsetX / blockWidth, 0), 1) * 100;

    // Обновляем состояние процента
    setPercent(Number(newPercent.toFixed(0)));
  };

  useEffect(() => {
    console.log(percent);
  }, [percent]);

  return (
    <div
      ref={blockRef}
      onTouchMove={handleTouchStart}
      onTouchStart={handleTouchStart}
      className="range"
    >
      <div className="range__bar">
        <div style={{ width: `${percent}%` }} className="range__filled"></div>
        <div style={{ left: `${percent}%` }} className="range__divider"></div>
      </div>
    </div>
  );
};

export default Range;
