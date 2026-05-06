import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import MagneticButton from '../../ui/MagneticButton';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Menu', path: '/menu' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Events', path: '/events' },
    { title: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: 'power4.out' });
      gsap.fromTo(
        linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.25 }
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' });
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">THE <span className="text-primary">SPOT</span></Link>
        </div>

        <div className={styles.desktopNav}>
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} className={styles.navLink}>
              {link.title}
              <div className={styles.underline} />
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <MagneticButton className={styles.reserveBtn}>RESERVE NOW</MagneticButton>
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Full-screen mobile overlay */}
      <div ref={menuRef} className={styles.mobileMenu}>
        {/* Prominent close button */}
        <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
          <X size={28} />
          <span>CLOSE</span>
        </button>

        <div className={styles.ghostText}>SPOT</div>

        <div className={styles.mobileLinks}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={styles.mobileNavLink}
              onClick={closeMenu}
              ref={(el) => (linksRef.current[i] = el)}
            >
              <span className={styles.mobileNavNum}>0{i + 1}</span>
              {link.title}
            </Link>
          ))}
        </div>

        <div className={styles.mobileFooter}>
          <span>CE Block · Salt Lake · Kolkata</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
