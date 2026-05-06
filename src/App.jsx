import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './styles/global.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Loader from './ui/Loader';
import CustomCursor from './ui/CustomCursor';
import SmoothScroll from './ui/SmoothScroll';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>The Spot Cafe & Lounge | Premium Coffee & Dining in Salt Lake, Kolkata</title>
        <meta name="description" content="Experience the finest craft coffee, global bites, and live IPL screenings at The Spot Cafe & Lounge, Salt Lake Sector 1, Kolkata. Streetwear style meets premium lounge vibes." />
        <meta property="og:title" content="The Spot Cafe & Lounge | Kolkata" />
        <meta property="og:description" content="Premium Cafe & Lounge in Salt Lake Sector 1, Kolkata." />
        <meta name="keywords" content="Cafe, Lounge, Kolkata, Salt Lake, Coffee, IPL Screening, Restaurant" />
      </Helmet>
      
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Content is always mounted so Hero animates in while door is closing */}
      <div className="app-content" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </AnimatePresence>
        </SmoothScroll>
      </div>

    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;
