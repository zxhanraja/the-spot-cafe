import React, { useEffect } from 'react';
import About from '../components/About/About';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar">
        <About />
        <section className="bg-bg2 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="display-small text-text mb-8">OUR STORY</h2>
            <p className="copy-large text-muted max-w-3xl mx-auto">
              Founded in the heart of Salt Lake, The Spot was born from a passion for craft coffee and urban street culture. We've created a space where the rhythm of the city meets the tranquility of a premium lounge. Every corner of our cafe is designed to inspire creativity and foster community.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
