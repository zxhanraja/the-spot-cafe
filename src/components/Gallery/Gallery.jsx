import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import styles from './Gallery.module.css';
import { galleryData as defaultData } from '../../data/galleryData';

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ data = defaultData, title = "OUR DISHES" }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        const { isMobile } = context.conditions;
        
        // Dynamic calculation that works on resize/refresh
        const getScrollAmount = () => {
          return track.scrollWidth - window.innerWidth;
        };

        const amount = getScrollAmount();

        if (amount > 0) {
          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: true, // Immediate response on mobile
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]); // Re-run if data changes

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <section ref={sectionRef} id="gallery" className={styles.gallery}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <a href="https://instagram.com/thespotcafe.kol" target="_blank" rel="noreferrer" className={styles.instaLink}>
              @thespotcafe.kol &nearr;
            </a>
          </div>
          {isMobile && (
            <p className={styles.swipeHint}>← Swipe to explore →</p>
          )}
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {data.map((item) => (
          <div key={item.id} className={styles.item} onClick={() => openLightbox(item)}>
            <div className={styles.imagePlaceholder}>
              <img src={item.image} alt={item.title || item.name} className={styles.itemImage} />
              <div className={styles.itemOverlay} />
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemTitle}>{item.title || item.name}</span>
            </div>
            <div className={styles.itemCategory}>{item.category}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>
            <X size={32} />
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImage}>
              <img src={selectedImage.image} alt={selectedImage.title || selectedImage.name} />
            </div>
            <div className={styles.lightboxInfo}>
              <h3>{selectedImage.label} / {selectedImage.category}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
