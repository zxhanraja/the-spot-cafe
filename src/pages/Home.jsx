import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import MarqueeStrip from '../components/MarqueeStrip/MarqueeStrip';
import About from '../components/About/About';
import Menu from '../components/Menu/Menu';
import Gallery from '../components/Gallery/Gallery';
import Events from '../components/Events/Events';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import PageTransition from '../ui/PageTransition';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Hero />
      <MarqueeStrip />
      <div className="section-divider" />
      <About />
      <Menu isHomePage={true} />
      <Gallery title={<span>OUR <span className="text-primary">DISHES</span></span>} />
      <Events />
      <Contact />
      <Footer />
    </PageTransition>
  );
};

export default Home;
