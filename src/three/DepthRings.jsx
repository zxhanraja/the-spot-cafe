import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './DepthRings.module.css';

const DepthRings = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(containerRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.ring1} />
      <div className={styles.ring2} />
      <div className={styles.ring3} />
    </div>
  );
};

export default DepthRings;
