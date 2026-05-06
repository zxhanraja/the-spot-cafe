import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import styles from './Menu.module.css';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'beverages', label: 'Beverages', emoji: '☕' },
  { id: 'bites', label: 'Bites', emoji: '🍟' },
  { id: 'mains', label: 'Mains', emoji: '🍔' },
  { id: 'desserts', label: 'Desserts', emoji: '🍫' },
  { id: 'specials', label: 'Specials', emoji: '⭐' },
];

const menuItems = {
  beverages: [
    { id: 1, name: 'Cold Coffee', price: 189, desc: 'Classic creamy cold coffee with a rich froth.', tag: 'BESTSELLER', image: '/dishes/cold_coffee.webp', details: 'Our signature house blend coffee, chilled and blended with creamy milk and a touch of sweetness. Served ice-cold with a thick, frothy top.' },
    { id: 2, name: 'Iced Latte', price: 219, desc: 'Double shot of espresso over chilled milk and ice.', tag: 'STRONG', image: '/dishes/iced_latte.webp', details: 'A bold double shot of our premium espresso poured over chilled milk and ice cubes. Perfectly balanced for those who love their coffee cold but strong.' },
    { id: 3, name: 'KitKat Shake', price: 249, desc: 'Thick chocolate shake blended with KitKat pieces.', tag: 'INDULGENT', image: '/dishes/kitkat_shake.webp', details: 'A decadent milkshake made with premium chocolate ice cream, blended with crunchy KitKat bars and topped with even more chocolate shavings.' },
    { id: 4, name: 'Virgin Mojito', price: 159, desc: 'Refreshing blend of mint, lime, and soda.', tag: 'REFRESHING', image: '/dishes/virgin_mojito.webp', details: 'A classic thirst-quencher with muddled fresh mint leaves, zesty lime juice, and a splash of sparkling soda. The perfect companion for any meal.' },
    { id: 5, name: 'Blue Lagoon', price: 169, desc: 'Cool blue citrus mocktail with a tangy twist.', tag: 'VIBRANT', image: '/dishes/blue_lagoon.webp', details: 'A visually stunning mocktail with blue curacao syrup, lemon juice, and sprite. It’s sweet, tangy, and incredibly refreshing.' },
  ],
  bites: [
    { id: 6, name: 'French Fries', price: 149, desc: 'Crispy golden fries served with house-made dip.', tag: 'SPOT FAV', image: '/dishes/french_fries.webp', details: 'Hand-cut potatoes fried to a perfect golden crisp, lightly seasoned with sea salt and served with our signature garlic aioli.' },
    { id: 7, name: 'Veg Momos', price: 169, desc: 'Steamed dumplings packed with fresh garden veggies.', tag: 'LIGHT', image: '/dishes/veg_momos.webp', details: 'Delicate wrappers filled with finely chopped seasonal vegetables and herbs, steamed to perfection. Served with spicy tomato chutney.' },
    { id: 8, name: 'Paneer 65', price: 249, desc: 'Spicy, deep-fried paneer cubes with curry leaves.', tag: 'SPICY', image: '/dishes/paneer65.webp', details: 'Soft paneer cubes marinated in a secret blend of South Indian spices, deep-fried and tossed with crispy curry leaves and green chilies.' },
    { id: 9, name: 'Kathi Roll', price: 189, desc: 'Classic street-style roll with spicy paneer filling.', tag: 'STREET FOOD', image: '/dishes/kathi_roll.webp', details: 'A buttery paratha wrapped around a filling of marinated paneer, onions, peppers, and tangy sauces. The perfect grab-and-go snack.' },
  ],
  mains: [
    { id: 10, name: 'Red Sauce Pasta', price: 329, desc: 'Penne tossed in a rich, tangy tomato and herb sauce.', tag: 'VEG', image: '/dishes/red_sauce_pasta.webp', details: 'Al dente penne pasta smothered in our house-made marinara sauce, infused with garlic, basil, and a hint of chili flakes.' },
    { id: 11, name: 'Veg Burger', price: 289, desc: 'Crispy veg patty with fresh lettuce, cheese and sauce.', tag: 'FILLING', image: '/dishes/veg_burger.webp', details: 'A thick vegetable patty served on a toasted brioche bun with melt-in-your-mouth cheese, fresh tomato slices, and our secret burger sauce.' },
    { id: 12, name: 'Hakka Noodles', price: 269, desc: 'Stir-fried noodles with crunchy veggies and soy sauce.', tag: 'CHINESE', image: '/dishes/hakka_noodles.webp', details: 'Classic Indo-Chinese style noodles wok-tossed with cabbage, carrots, bell peppers, and a savory blend of soy and chili sauces.' },
    { id: 13, name: 'Dal Makhni Combo', price: 399, desc: 'Creamy dal served with butter naan and paneer.', tag: 'COMBO', image: '/dishes/butter_naan_paneer_lahori.webp', details: 'A hearty meal featuring our slow-cooked, buttery black dal, served with fluffy butter naan and a side of Paneer Lahori.' },
    { id: 14, name: 'Paneer Shikari Kebab', price: 349, desc: 'Grilled paneer marinated in hunter-style rustic spices.', tag: 'SIGNATURE', image: '/dishes/paneer_shikari_kebab.webp', details: 'Large chunks of paneer marinated in a bold, smoky spice rub and grilled to charred perfection. Served with mint chutney.' },
  ],
  desserts: [
    { id: 15, name: 'Belgian Waffle', price: 249, desc: 'Freshly baked waffle topped with chocolate and syrup.', tag: 'SWEET', image: '/dishes/belgain_waffle.webp', details: 'Crispy on the outside, fluffy on the inside. Drizzled with melted Belgian chocolate and served with a scoop of vanilla ice cream.' },
    { id: 16, name: 'Chocolate Brownie', price: 199, desc: 'Warm, fudgy brownie loaded with chocolate chips.', tag: 'CLASSIC', image: '/dishes/chocolate_brownie.webp', details: 'Our brownies are baked with premium cocoa and loaded with semi-sweet chocolate chunks. Best enjoyed warm with a side of coffee.' },
    { id: 17, name: 'NY Cheesecake', price: 289, desc: 'Creamy New York-style cheesecake on a graham crust.', tag: 'PREMIUM', image: '/dishes/cheese_cake.webp', details: 'Rich, smooth, and velvety cheesecake with a buttery crust. Topped with a fresh berry compote.' },
    { id: 18, name: 'Baked Rosogolla', price: 159, desc: 'Traditional Bengali sweet with a modern baked twist.', tag: 'FUSION', image: '/dishes/baked_rosogolla.webp', details: 'Soft, spongy rosogollas baked in a creamy, sweetened milk reduction. A fusion masterpiece that melts in your mouth.' },
    { id: 19, name: 'Red Velvet Cake', price: 229, desc: 'Classic red velvet layers with cream cheese frosting.', tag: 'ELEGANT', image: '/dishes/red_velvet.webp', details: 'Moist red velvet sponge layers filled and frosted with tangy, sweet cream cheese frosting. A visual and culinary delight.' },
  ],
  specials: [
    { id: 20, name: 'Mango Festival Special', price: 349, desc: 'Seasonal mango delights crafted for the festival.', tag: 'SEASONAL', image: '/dishes/mango_festival.webp', details: 'Celebrating the king of fruits with a special platter featuring mango mousse, fresh mango slices, and a mango-infused mocktail.' },
    { id: 21, name: 'IPL Platter', price: 599, desc: 'Large sharing platter for the perfect match night.', tag: 'LIMITED', image: '/dishes/french_fries.webp', details: 'Includes a mix of fries, momos, kathi rolls, and two cold coffees. Perfect for enjoying the game with a friend.' },
  ],
};

/* ── Menu Card ── */
const MenuCard = ({ item, index, onOpen }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const onEnter = () => gsap.to(card, { y: -6, scale: 1.02, duration: 0.35, ease: 'power2.out' });
    const onLeave = () => gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mouseenter', onEnter); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div ref={cardRef} className={styles.card} onClick={() => onOpen(item)}>
      <div className={styles.cardImageWrap}>
        <img src={item.image} alt={item.name} className={styles.cardImage} loading="lazy" />
        <div className={styles.cardImageOverlay} />
        <span className={styles.cardTag}>{item.tag}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardName}>{item.name}</h3>
          <span className={styles.cardPrice}>₹{item.price}</span>
        </div>
        <p className={styles.cardDesc}>{item.desc}</p>
        <button className={styles.viewBtn} aria-label={`View details for ${item.name}`}>
          VIEW DETAILS →
        </button>
      </div>
    </div>
  );
};

/* ── Detail Modal ── */
const ItemDetail = ({ item, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline();
    
    if (overlayRef.current && panelRef.current && contentRef.current) {
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.55, ease: 'power4.out' }, '-=0.2')
        .fromTo(contentRef.current.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.25');
    }

    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current.children, { opacity: 0, y: -16, stagger: 0.04, duration: 0.25, ease: 'power2.in' })
      .to(panelRef.current, { x: '100%', duration: 0.45, ease: 'power4.in' }, '-=0.1')
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, '-=0.2');
  };

  return (
    <div ref={overlayRef} className={styles.detailOverlay} onClick={handleClose}>
      <div ref={panelRef} className={styles.detailPanel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.detailClose} onClick={handleClose} aria-label="Close detail">
          <X size={22} />
        </button>

        <div ref={contentRef} className={styles.detailContent}>
          {/* Image */}
          <div className={styles.detailImageWrap}>
            <img src={item.image} alt={item.name} className={styles.detailImage} />
            <div className={styles.detailImageOverlay} />
            <span className={styles.detailTag}>{item.tag}</span>
          </div>

          {/* Info */}
          <div className={styles.detailInfo}>
            <div className={styles.detailMeta}>
              <span className={styles.detailCategory}>THE SPOT CAFE</span>
            </div>
            <h2 className={styles.detailName}>{item.name}</h2>
            <div className={styles.detailPriceLine}>
              <span className={styles.detailPrice}>₹{item.price}</span>
              <div className={styles.detailDivider} />
            </div>
            <p className={styles.detailDesc}>{item.desc}</p>
            <p className={styles.detailLong}>{item.details}</p>
          </div>

          {/* CTA */}
          <div className={styles.detailCta}>
            <a
              href="https://instagram.com/thespotcafe.kol"
              target="_blank"
              rel="noreferrer"
              className={styles.detailOrder}
            >
              ORDER VIA INSTAGRAM ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Menu Component ── */
const Menu = ({ isHomePage = false }) => {
  // Use 'bites' for Home Page, 'beverages' for full Menu page
  const [activeTab, setActiveTab] = useState(isHomePage ? 'bites' : 'beverages');
  const [selectedItem, setSelectedItem] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const tabsRef = useRef(null);

  // Filter categories: No beverages on Home Page
  const displayedCategories = categories
    .filter(cat => isHomePage ? cat.id !== 'beverages' : true)
    .map(cat => (isHomePage && cat.id === 'bites') ? { ...cat, label: 'Crunch Bites' } : cat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      });
      gsap.from(tabsRef.current?.children, {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6,
        scrollTrigger: { trigger: tabsRef.current, start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    gsap.to(gridRef.current?.children, {
      opacity: 0, y: -16, duration: 0.2, stagger: 0.03,
      onComplete: () => setActiveTab(id),
    });
  };

  return (
    <>
      <section ref={sectionRef} id="menu" className={styles.menu}>
        <div className={styles.container}>
          {/* Header */}
          <div ref={headingRef} className={styles.header}>
            <div className={styles.tag}>
              <span className={styles.tagLine} />
              EST. 2026
            </div>
            <h2 className={styles.title}>
              {isHomePage ? 'CRUNCH' : 'CRAFTED'} <span className={styles.accent}>BITES</span>
            </h2>
            <p className={styles.subtitle}>Premium global flavours, served fresh daily.</p>
          </div>

          {/* Tabs */}
          <div ref={tabsRef} className={styles.tabs}>
            {displayedCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`${styles.tab} ${activeTab === cat.id ? styles.activeTab : ''}`}
              >
                <span className={styles.tabEmoji}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className={styles.grid}>
            {(menuItems[activeTab] || []).map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} onOpen={setSelectedItem} />
            ))}
            {(!menuItems[activeTab] || menuItems[activeTab].length === 0) && (
              <div className={styles.empty}>COMING SOON</div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default Menu;
