import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className, strength = 0.35, ...props }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <button ref={btnRef} className={`magnetic ${className}`} {...props}>
      {children}
    </button>
  );
};

export default MagneticButton;
