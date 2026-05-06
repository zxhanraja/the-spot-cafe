import React from 'react';
import styles from './Menu.module.css';

const MenuCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardTag}>{item.tag || "SPOT"}</span>
        <div className={styles.accentLine} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardName}>{item.name}</h4>
          <span className={styles.cardPrice}>₹{item.price}</span>
        </div>
        <p className={styles.cardDesc}>{item.desc}</p>
      </div>
    </div>
  );
};

export default MenuCard;
