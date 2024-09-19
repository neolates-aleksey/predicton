import React, { useRef, useState } from "react";
import "./Range.scss";

type Props = {
  onRangeChange: any;
  balance: number;
};

const Range = ({ onRangeChange, balance }: Props) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);

  const calculatePercent = () => {
    if (balance === 0) {
      onRangeChange(0);
    } else {
      onRangeChange((percent * balance) / 100);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!blockRef.current) {
      return;
    }

    const touch = e.touches[0];
    const touchX = touch.pageX;

    const blockRect = blockRef.current.getBoundingClientRect();
    const blockStartX = blockRect.left;
    const blockWidth = blockRect.width;

    // Рассчитываем смещение от начала блока
    const offsetX = touchX - blockStartX;

    // Рассчитываем процент
    const newPercent = Math.min(Math.max(offsetX / blockWidth, 0), 1) * 100;

    if (newPercent > 98) {
      setPercent(100);
      onRangeChange(balance);
    } else {
      if (newPercent < 2) {
        setPercent(1);
        onRangeChange(0);
      } else {
        setPercent(Number(newPercent.toFixed(0)));
        onRangeChange((Number(newPercent.toFixed(0)) * balance) / 100);
      }
    }

    // if (balance === 0) {
    //   onRangeChange(0);
    // } else {
    //   onRangeChange((Number(newPercent.toFixed(0)) * balance) / 100);
    // }

    // calculatePercent();
  };

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
