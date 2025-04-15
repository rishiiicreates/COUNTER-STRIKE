import { useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Header from '@/components/Header';
import WeaponsSection from '@/components/WeaponsSection';
import MapsSection from '@/components/MapsSection';
import StatsSection from '@/components/StatsSection';
import NewsSection from '@/components/NewsSection';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';

const ScrollToTopButton = () => {
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    const button = document.getElementById('scrollToTop');
    if (button) {
      button.addEventListener('click', handleScrollToTop);
    }
    
    return () => {
      if (button) {
        button.removeEventListener('click', handleScrollToTop);
      }
    };
  }, []);
  
  return (
    <motion.button
      id="scrollToTop"
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center z-50 shadow-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={scrollY && scrollY > 300 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <i className="fas fa-chevron-up"></i>
    </motion.button>
  );
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    // Add scroll reveal for elements when they come into viewport
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });
    
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => observer.observe(el));
    
    return () => {
      elementsToReveal.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <ParallaxProvider>
      <div className="home-page">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        <Header />
        <WeaponsSection />
        <MapsSection />
        <StatsSection />
        <NewsSection />
        <VideoSection />
        <Footer />
        
        <ScrollToTopButton />
      </div>
    </ParallaxProvider>
  );
};

export default HomePage;
