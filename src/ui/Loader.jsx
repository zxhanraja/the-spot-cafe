import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const doorRef = useRef(null);
  const wallRef = useRef(null);
  const skipRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current || !doorRef.current) {
      if (onComplete) onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Initial state
    gsap.set(doorRef.current, { rotationY: 0 });
    gsap.set(skipRef.current, { opacity: 0 });

    tl.to(skipRef.current, {
      opacity: 0.4,
      duration: 1,
      delay: 0.5
    })
    .to(doorRef.current, {
      rotationY: -110,
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.5
    })
    .to(loaderRef.current, {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in"
    }, "-=0.3")
    .to(loaderRef.current, {
      display: 'none',
      duration: 0
    });

    return () => tl.kill();
  }, [onComplete]);

  const handleSkip = () => {
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  };

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div ref={wallRef} className={styles.wall}>
        <div className={styles.doorFrame}>
          <div ref={doorRef} className={styles.door}>
            <div className={styles.doorPanel} />
            <div className={styles.doorHandle} />
          </div>
        </div>
      </div>
      
      <div className={styles.loadingText}>THE SPOT</div>

      <button 
        ref={skipRef} 
        className={styles.skip} 
        onClick={handleSkip}
      >
        SKIP INTRO
      </button>
    </div>
  );
};

export default Loader;
