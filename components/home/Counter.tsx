'use client';

import { useEffect, useState, useRef } from 'react';

export const Counter = ({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated || !counterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTime: number | null = null;
            const animate = (currentTime: number) => {
              if (startTime === null) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
              const currentCount = Math.floor(progress * end);
              setCount(currentCount);
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
};

export const RatioCounter = ({ first, second, duration = 2 }: { first: number; second: number; duration?: number }) => {
  const [countFirst, setCountFirst] = useState(0);
  const [countSecond, setCountSecond] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated || !counterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTime: number | null = null;
            const animate = (currentTime: number) => {
              if (startTime === null) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
              const currentFirst = Math.floor(progress * first);
              const currentSecond = Math.floor(progress * second);
              setCountFirst(currentFirst);
              setCountSecond(currentSecond);
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCountFirst(first);
                setCountSecond(second);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [first, second, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {countFirst}/{countSecond}
    </span>
  );
};

