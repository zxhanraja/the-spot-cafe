import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from './GalleryGrid.module.css';

const GalleryGrid = ({ data, title }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        
        <div className={styles.grid}>
          {data.map((item) => (
            <div 
              key={item.id} 
              className={styles.card} 
              onClick={() => setSelectedImage(item)}
            >
              <div className={styles.imageWrap}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.label}>{item.label}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
            <X size={32} />
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className={styles.lightboxInfo}>
              <span>{selectedImage.label} / {selectedImage.category}</span>
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
