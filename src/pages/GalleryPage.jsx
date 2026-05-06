import React, { useEffect } from 'react';
import GalleryGrid from '../components/GalleryGrid/GalleryGrid';
import { interiorData } from '../data/interiorData';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar">
        <GalleryGrid data={interiorData} title={<span>OUR <span className="text-primary">GALLERY</span></span>} />
        <section className="bg-bg py-20 border-t border-border/10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="display-small mb-4 text-text">TAG US @THESPOTCAFE</h3>
            <p className="copy-medium text-muted mb-8">Share your moments with us on social media.</p>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
