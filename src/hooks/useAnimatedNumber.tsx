
import { useState, useEffect } from 'react';

interface UseAnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
}

export const useAnimatedNumber = ({ value, duration = 400, delay = 0 }: UseAnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue === value) return;

    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      const startValue = displayValue;
      const difference = value - startValue;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = startValue + (difference * easeOut);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, duration, delay, displayValue]);

  return { displayValue, isAnimating };
};
