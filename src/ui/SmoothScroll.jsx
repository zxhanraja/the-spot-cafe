import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if device is desktop
    const isDesktop = !('ontouchstart' in window) && navigator.maxTouchPoints === 0;
    
    if (isDesktop) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        if (lenisRef.current) lenisRef.current.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      return () => {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          gsap.ticker.remove(lenisRef.current.raf);
        }
      };
    }
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};

export default SmoothScroll;
