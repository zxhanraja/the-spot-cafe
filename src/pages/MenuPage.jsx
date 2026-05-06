import React, { useEffect } from 'react';
import Menu from '../components/Menu/Menu';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const MenuPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar">
        <Menu />
        <section className="bg-bg py-20 border-t border-border/10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted italic max-w-2xl mx-auto">
              Our ingredients are ethically sourced and served fresh daily. For allergy information or special dietary requirements, please speak with our staff.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MenuPage;
