import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current as HTMLElement);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible, revealClass: isVisible ? 'reveal-visible' : 'reveal-hidden' };
}
