import React, { useEffect } from 'react';
import Contact from '../components/Contact/Contact';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar">
        <Contact />
        <section className="bg-bg py-20 border-t border-border/10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="display-small mb-4 text-text">VISIT US</h3>
            <p className="copy-medium text-muted mb-8">CE Block, Sector 1, Salt Lake, Kolkata, West Bengal 700064</p>
            <div className="w-full h-96 grayscale invert opacity-70 contrast-125 border border-border/20">
              <iframe
                title="The Spot Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.148154670498!2d88.406981!3d22.593175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275ccf6b2b5eb%3A0xe5a3c0e3a47926e8!2sSalt%20Lake%20Sector%201%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1711890000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
