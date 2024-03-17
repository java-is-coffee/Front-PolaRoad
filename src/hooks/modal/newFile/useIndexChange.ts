import { useState } from "react";

export const useIndexChange = (initialIndex: number, maxIndex: number) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<String>("left");

  const increaseIndex = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    setDirection("right");
  };

  const decreaseIndex = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setDirection("right");
  };

  return { index, increaseIndex, decreaseIndex, direction };
};
