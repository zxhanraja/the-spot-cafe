import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './MarqueeStrip.module.css';

const MarqueeStrip = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    
    // Duplicate content for seamless loop
    const clone = track.innerHTML;
    track.innerHTML += clone;

    const totalWidth = track.scrollWidth / 2;

    const anim = gsap.to(track, {
      x: -totalWidth,
      duration: 18,
      ease: 'none',
      repeat: -1,
    });

    track.addEventListener('mouseenter', () => anim.pause());
    track.addEventListener('mouseleave', () => anim.resume());

    return () => anim.kill();
  }, []);

  const items = [
    "PREMIUM CAFE",
    "SALT LAKE KOLKATA",
    "IPL LIVE SCREENING",
    "RESERVE YOUR SPOT",
    "LOUNGE & DINE"
  ];

  return (
    <div className={styles.marquee}>
      <div ref={trackRef} className={styles.track}>
        {items.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
