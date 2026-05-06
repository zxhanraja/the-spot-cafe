import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Tag line fade
      gsap.from(tagRef.current, {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: tagRef.current, start: 'top 88%' },
      });

      // Title reveal
      gsap.from(titleRef.current.querySelectorAll('span'), {
        yPercent: 110, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      // Divider expand
      gsap.from(dividerRef.current, {
        scaleX: 0, duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: dividerRef.current, start: 'top 90%' },
      });

      // Body text
      gsap.from(bodyRef.current, {
        opacity: 0, y: 24, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 88%' },
      });

      // Stats count-up
      const statNums = statsRef.current.querySelectorAll('[data-count]');
      statNums.forEach(el => {
        const target = +el.getAttribute('data-count');
        gsap.from({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out', snap: { val: 1 },
          onUpdate() { el.textContent = Math.round(this.targets()[0].val) + (el.getAttribute('data-suffix') || ''); },
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.imageCol}>
        <div ref={imageRef} className={styles.imagewrap}>
          <img src="/about_cafe.png" alt="The Spot Cafe interior" className={styles.photo} />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.imageLabel}>EST. 2026 · KOLKATA</div>
      </div>

      <div className={styles.contentCol}>
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          OUR STORY
        </div>

        <h2 ref={titleRef} className={styles.title}>
          <span>WE KNOW</span><br />
          <span className={styles.accent}>A SPOT</span><br />
          <span>FOR YOU.</span>
        </h2>

        <div ref={dividerRef} className={styles.divider} style={{ transformOrigin: 'left' }} />

        <p ref={bodyRef} className={styles.body}>
          Located in the heart of Salt Lake, The Spot Cafe &amp; Lounge is where premium flavors meet a bold, cinematic aesthetic. From handcrafted brews to curated bites, we've designed every detail for those who appreciate the finer things in life.
        </p>

        <div ref={statsRef} className={styles.stats}>
          <div className={styles.stat}>
            <a
              href="https://instagram.com/thespotcafe.kol"
              target="_blank"
              rel="noreferrer"
              className={styles.instaBtn}
            >
              <span className={styles.instaBtnIcon}>📸</span>
              @thespotcafe.kol
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
