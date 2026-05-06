import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';
import MagneticButton from '../../ui/MagneticButton';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const btnsRef = useRef(null);

  useLayoutEffect(() => {
    // Initial Reveal Timeline
    const tl = gsap.timeline();

    // Initial state setup
    gsap.set([eyebrowRef.current, btnsRef.current], { opacity: 0, y: 20 });
    gsap.set(titleRef.current, { scale: 0.8, opacity: 0 });

    tl.to(titleRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 1.2, 
      ease: 'power4.out'
    })
    .to(eyebrowRef.current, { 
      opacity: 0.8, 
      y: 0, 
      duration: 0.8 
    }, "-=0.6")
    .to(btnsRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8 
    }, "-=0.4");

    return () => tl.kill();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background/Ambient elements can be added here if needed */}
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={eyebrowRef} className={styles.eyebrow}>
            THE DOOR OPENS
          </div>

          <div className={styles.titleContainer}>
            <h1 ref={titleRef} className={styles.title}>
              TODAY
            </h1>
          </div>

          <div ref={btnsRef} className={styles.btns}>
            <MagneticButton className={styles.filledBtn} onClick={() => navigate('/menu')}>
              EXPLORE MENU
            </MagneticButton>
            <MagneticButton className={styles.ghostBtn} onClick={() => navigate('/contact')}>
              BOOK NOW
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>SCROLL TO DISCOVER</span>
        <ChevronDown size={14} className={styles.arrow} />
      </div>
    </section>
  );
};

export default Hero;
