import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Immediate movement for the dot
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Delayed movement for the ring
      gsap.to(followerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
        gsap.to(followerRef.current, {
          scale: 1.8,
          duration: 0.3,
        });
      }

      if (target.dataset.cursorText) {
        setHoverText(target.dataset.cursorText);
        gsap.to(followerRef.current, {
          scale: 2.2,
          duration: 0.3,
        });
      }
    };

    const onMouseLeave = () => {
      setIsHovering(false);
      setHoverText('');
      gsap.to(followerRef.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.dot} />
      <div ref={followerRef} className={styles.ring}>
        {hoverText && <span className={styles.text}>{hoverText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
