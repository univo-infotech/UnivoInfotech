import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Home = React.lazy(() => import('./pages/Home'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const Navbar = React.lazy(() => import('./components/common/Navbar'));
const Footer = React.lazy(() => import('./components/common/Footer'));
const ScrollToTop = React.lazy(() => import('./components/common/ScrollToTop'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#0066FF]/20 border-t-[#0066FF] rounded-full animate-spin"></div>
      <p className="text-[#64748B] font-medium">Loading...</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF]">
    <div className="text-center">
      <h1 className="text-8xl font-bold text-[#0066FF] font-['Space_Grotesk']">404</h1>
      <p className="text-2xl text-[#1A2B4A] mt-4 mb-8">Page Not Found</p>
      <a href="/" className="px-8 py-3 bg-gradient-to-r from-[#0066FF] to-[#00B4D8] text-white rounded-full font-semibold hover:shadow-lg transition-all">Go Home</a>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="relative z-10">
      <Suspense fallback={<LoadingSpinner />}>
        {!isAdmin && <Navbar />}
        {!isAdmin && <ScrollToTop />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
            <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        {!isAdmin && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;
