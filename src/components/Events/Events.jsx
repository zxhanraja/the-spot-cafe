import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Events.module.css';

const Events = () => {
  const mainCardRef = useRef(null);

  useEffect(() => {
    const mainCard = mainCardRef.current;
    
    const onMouseEnter = () => {
      gsap.to(mainCard, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(mainCard.querySelector(`.${styles.ghostText}`), {
        scale: 1.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(mainCard, {
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(mainCard.querySelector(`.${styles.ghostText}`), {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    mainCard.addEventListener('mouseenter', onMouseEnter);
    mainCard.addEventListener('mouseleave', onMouseLeave);

    return () => {
      mainCard.removeEventListener('mouseenter', onMouseEnter);
      mainCard.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="events" className={styles.events}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            LIVE <span className="text-primary">EVENTS</span>
          </h1>
        </div>

        <div className={styles.grid}>
          <div ref={mainCardRef} className={styles.mainCard}>
            <div className={styles.cardBg}>
              <img src="/dishes/screening.webp" alt="IPL Screening" className={styles.bgImage} />
              <div className={styles.bgOverlay} />
            </div>
            <div className={styles.ghostText}>IPL</div>
            <div className={styles.badge}>● LIVE SCREENING</div>
            <h2 className={styles.eventTitle}>IPL LIVE SCREENING</h2>
            <div className={styles.details}>
              <p>Every day from 28th March · 3:30 PM</p>
              <p>Sector 1, Salt Lake, Kolkata</p>
            </div>
            <button className={styles.bookBtn}>BOOK A TABLE</button>
          </div>

          <div className={styles.sideCards}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>COMING NEXT</h3>
              <p className={styles.sideSub}>Stay tuned on Instagram for upcoming live music and special screenings.</p>
            </div>
            <div className={`${styles.sideCard} ${styles.accentBorder}`}>
              <h3 className={`${styles.sideTitle} text-gold`}>RESERVE EARLY</h3>
              <p className={styles.sideSub}>Book your preferred spot for screening nights in advance to avoid last-minute rushes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
