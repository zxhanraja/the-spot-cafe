import React, { useEffect } from 'react';
import PageTransition from '../ui/PageTransition';
import Footer from '../components/Footer/Footer';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="pt-navbar min-h-screen bg-bg">
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-4xl">
            <h1 className="font-display text-5xl md:text-7xl text-text mb-12">
              PRIVACY <span className="text-primary">POLICY</span>
            </h1>
            
            <div className="space-y-12 text-muted font-copy leading-relaxed">
              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">01 / Introduction</h2>
                <p>
                  At The Spot Cafe & Lounge, we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or our physical location in Salt Lake, Kolkata.
                </p>
              </div>

              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">02 / Information Collection</h2>
                <p>
                  We may collect personal information such as your name, phone number, and email address when you make a reservation, sign up for our newsletter, or contact us through our website. We also collect anonymous usage data to improve our website's performance.
                </p>
              </div>

              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">03 / Use of Information</h2>
                <p>
                  The information we collect is used to:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                  <li>Confirm and manage your table reservations.</li>
                  <li>Send you updates about special events and seasonal menus.</li>
                  <li>Improve our customer service and dining experience.</li>
                  <li>Ensure the security of our website and lounge.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">04 / Data Protection</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is only accessible by authorized personnel who are required to keep the information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">05 / Cookies</h2>
                <p>
                  Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser that enables the site's systems to recognize your browser and capture certain information.
                </p>
              </div>

              <div>
                <h2 className="text-text font-body text-xl mb-4 tracking-widest uppercase">06 / Contact Us</h2>
                <p>
                  If you have any questions regarding this privacy policy, you may contact us at:
                </p>
                <p className="mt-4 text-text font-medium">
                  The Spot Cafe & Lounge<br />
                  Salt Lake Sector 1, Kolkata<br />
                  Email: hello@thespotcafe.kol
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PrivacyPage;
