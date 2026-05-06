import React, { useEffect } from 'react';
import Events from '../components/Events/Events';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar">
        <Events />
        <section className="bg-bg py-20 border-t border-border/10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="display-small mb-4 text-text">PRIVATE BOOKINGS</h3>
            <p className="copy-medium text-muted max-w-2xl mx-auto mb-8">
              Want to host a private party or a corporate event? We've got the perfect setting. Contact us for custom menus and venue availability.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default EventsPage;
