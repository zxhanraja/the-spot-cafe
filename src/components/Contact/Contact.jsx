import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: '', time: '', message: '' });

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slide in
      gsap.from(leftRef.current?.children, {
        opacity: 0, x: -40, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 82%' },
      });
      // Form card
      gsap.from(formRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      });
      // Individual form fields
      gsap.from(formRef.current?.querySelectorAll('[data-field]'), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector(`.${styles.submitBtn}`);
    gsap.timeline()
      .to(btn, { scale: 0.96, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.15 })
      .to(formRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          setIsSubmitted(true);
          gsap.fromTo(successRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
          );
        }
      });
  };

  const infoItems = [
    { icon: MapPin, label: 'LOCATION', value: 'CE-23, CE Block, Sector 1\nSalt Lake, Kolkata 700064' },
    { icon: Phone, label: 'PHONE', value: '+91 98765 43210' },
    { icon: Clock, label: 'HOURS', value: 'Mon–Sun: 10AM – 11PM' },
  ];

  return (
    <section ref={sectionRef} id="contact" className={styles.contact}>
      <div className={styles.container}>

        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div className={styles.tag}><span className={styles.tagLine} />REACH US</div>
          <h2 className={styles.sectionTitle}>FIND THE <span className={styles.accent}>SPOT</span></h2>
        </div>

        <div className={styles.grid}>
          {/* Left: Info */}
          <div ref={leftRef} className={styles.left}>
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoCard}>
                <div className={styles.infoIcon}><Icon size={18} /></div>
                <div>
                  <div className={styles.infoLabel}>{label}</div>
                  <div className={styles.infoValue} style={{ whiteSpace: 'pre-line' }}>{value}</div>
                </div>
              </div>
            ))}

            {/* Map embed placeholder (styled) */}
            <div className={styles.mapBox}>
              <iframe
                title="The Spot Cafe Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.6!2d88.4!3d22.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzE0LjAiTiA4OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={styles.socials}>
              <a href="https://www.instagram.com/thespotcafe.kol" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <span>@thespotcafe.kol</span>
                <span className={styles.socialArrow}>↗</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.right}>
            {!isSubmitted ? (
              <form ref={formRef} className={styles.formCard} onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>BOOK YOUR TABLE</h3>
                  <p className={styles.formSubtitle}>Reserve your spot — we'll confirm within the hour.</p>
                </div>

                <div className={styles.fields}>
                  <div className={styles.row} data-field>
                    <div className={`${styles.inputWrap} ${focused === 'name' ? styles.inputFocused : ''}`}>
                      <label htmlFor="name">YOUR NAME</label>
                      <input id="name" name="name" type="text" placeholder="John Doe" value={formData.name}
                        onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} required />
                    </div>
                    <div className={`${styles.inputWrap} ${focused === 'phone' ? styles.inputFocused : ''}`}>
                      <label htmlFor="phone">PHONE</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone}
                        onChange={handleChange} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} required />
                    </div>
                  </div>

                  <div className={styles.row} data-field>
                    <div className={`${styles.inputWrap} ${focused === 'date' ? styles.inputFocused : ''}`}>
                      <label htmlFor="date">DATE</label>
                      <input id="date" name="date" type="date" value={formData.date}
                        onChange={handleChange} onFocus={() => setFocused('date')} onBlur={() => setFocused('')} required />
                    </div>
                    <div className={`${styles.inputWrap} ${focused === 'time' ? styles.inputFocused : ''}`}>
                      <label htmlFor="time">TIME</label>
                      <input id="time" name="time" type="time" value={formData.time}
                        onChange={handleChange} onFocus={() => setFocused('time')} onBlur={() => setFocused('')} required />
                    </div>
                  </div>

                  <div data-field className={`${styles.inputWrap} ${focused === 'guests' ? styles.inputFocused : ''}`}>
                    <label htmlFor="guests">NUMBER OF GUESTS</label>
                    <input id="guests" name="guests" type="number" min="1" max="50" placeholder="2"
                      value={formData.guests} onChange={handleChange}
                      onFocus={() => setFocused('guests')} onBlur={() => setFocused('')} required />
                  </div>

                  <div data-field className={`${styles.inputWrap} ${focused === 'message' ? styles.inputFocused : ''}`}>
                    <label htmlFor="message">SPECIAL REQUESTS (OPTIONAL)</label>
                    <textarea id="message" name="message" rows="3" placeholder="Dietary needs, occasion, seating preference…"
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={16} />
                  CONFIRM RESERVATION
                </button>
              </form>
            ) : (
              <div ref={successRef} className={styles.successCard}>
                <CheckCircle size={56} className={styles.successIcon} />
                <h3 className={styles.successTitle}>YOU'RE CONFIRMED!</h3>
                <p className={styles.successText}>
                  Your table has been reserved. We'll send a confirmation to your phone shortly.
                  See you at <strong>The Spot</strong>!
                </p>
                <button className={styles.resetBtn} onClick={() => { setIsSubmitted(false); setFormData({ name: '', phone: '', date: '', guests: '', time: '', message: '' }); }}>
                  MAKE ANOTHER BOOKING
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
