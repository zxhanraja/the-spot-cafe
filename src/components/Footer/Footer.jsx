import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navLinks = [
    { title: 'HOME', path: '/' },
    { title: 'MENU', path: '/menu' },
    { title: 'GALLERY', path: '/gallery' },
    { title: 'PRIVACY', path: '/privacy' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.goldLine} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.logo}>
              THE <span className="text-primary">SPOT</span>
            </div>
            <p className={styles.copy}>
              © 2026 The Spot Cafe. All Rights Reserved.
            </p>
          </div>

          <div className={styles.center}>
            <div className={styles.navLinks}>
              {navLinks.map((link, i) => (
                <Link key={i} to={link.path} className={styles.navLink}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <a
              href="https://instagram.com/thespotcafe.kol"
              target="_blank"
              rel="noreferrer"
              className={styles.insta}
            >
              @thespotcafe.kol ↗
            </a>
            <div className={styles.location}>
              Salt Lake, Sector 1, Kolkata
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
