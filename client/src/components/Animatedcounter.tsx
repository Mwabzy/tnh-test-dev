import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  targetNumber: number;
  duration?: number; // in milliseconds
  suffix?: string; // e.g. "%" or "+"
};

const AnimatedCounter = ({
  targetNumber,
  duration = 2000,
  suffix = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 16); // 60fps approx

    const updateCounter = () => {
      start += increment;
      if (start < targetNumber) {
        setCount(Math.floor(start));
        requestAnimationFrame(updateCounter);
      } else {
        setCount(targetNumber);
      }
    };

    updateCounter();
  }, [targetNumber, duration]);

  return (
    <span className="text-[46px] font-bold text-red-900 font-serif">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
