import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect values 
  const layer1Y = useTransform(scrollY, [0, 500], [0, 50]);
  const layer2Y = useTransform(scrollY, [0, 500], [0, 100]);
  const layer3Y = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 300], [0, 30]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="relative overflow-hidden h-screen">
      {/* Parallax Background Layers */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: layer1Y }}
      >
        <img 
          src="https://images.unsplash.com/photo-1614683920066-75c1bf22ce72?q=80&w=1974&auto=format&fit=crop" 
          alt="CS background" 
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background opacity-90"></div>
      
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10" 
        style={{ y: layer2Y }}
      >
        <img 
          src="https://static.wikia.nocookie.net/cswikia/images/9/9b/Csgo_logo.png" 
          alt="CS:GO Logo" 
          className="w-3/4 max-w-4xl animate-float"
        />
      </motion.div>
      
      {/* Navigation */}
      <nav className="relative z-30 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="https://static.wikia.nocookie.net/cswikia/images/9/9b/Csgo_logo.png" 
            alt="Counter-Strike Logo" 
            className="h-12" 
          />
          <h1 className="font-stratum text-2xl md:text-3xl text-white tracking-wider neon-flicker">
            COUNTER-STRIKE
          </h1>
        </div>
        
        <div className="hidden md:flex space-x-8 font-rajdhani font-semibold text-lg">
          <a href="#" className="text-glitch hover:text-primary transition-colors duration-300">HOME</a>
          <a href="#weapons" className="text-glitch hover:text-primary transition-colors duration-300">WEAPONS</a>
          <a href="#maps" className="text-glitch hover:text-primary transition-colors duration-300">MAPS</a>
          <a href="#stats" className="text-glitch hover:text-primary transition-colors duration-300">STATS</a>
          <a href="#news" className="text-glitch hover:text-primary transition-colors duration-300">NEWS</a>
        </div>
        
        <button 
          className="md:hidden text-primary"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-8 font-rajdhani font-semibold text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <a href="#" onClick={handleNavLinkClick} className="text-glitch hover:text-primary transition-colors duration-300">HOME</a>
          <a href="#weapons" onClick={handleNavLinkClick} className="text-glitch hover:text-primary transition-colors duration-300">WEAPONS</a>
          <a href="#maps" onClick={handleNavLinkClick} className="text-glitch hover:text-primary transition-colors duration-300">MAPS</a>
          <a href="#stats" onClick={handleNavLinkClick} className="text-glitch hover:text-primary transition-colors duration-300">STATS</a>
          <a href="#news" onClick={handleNavLinkClick} className="text-glitch hover:text-primary transition-colors duration-300">NEWS</a>
          
          <button 
            className="absolute top-6 right-6 text-primary text-3xl"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-times"></i>
          </button>
        </motion.div>
      )}
      
      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 h-4/5 flex flex-col justify-center">
        <motion.div style={{ y: textY, opacity }}>
          <div className="max-w-3xl">
            <motion.h1 
              className="font-stratum text-5xl md:text-7xl text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-primary">GLOBAL</span> OFFENSIVE
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-2xl font-rajdhani"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Experience the world's #1 tactical FPS with cutting-edge graphics, intense gameplay, and competitive ranking system.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button 
                className="clip-diagonal bg-primary text-black font-stratum font-bold py-3 px-8 text-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PLAY NOW
              </motion.button>
              
              <motion.button 
                className="clip-diagonal-reverse border-2 border-primary text-primary font-stratum font-bold py-3 px-8 text-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WATCH TRAILER
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-12 left-0 right-0 z-30 flex justify-center"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          <a href="#weapons" className="text-primary">
            <i className="fas fa-chevron-down text-3xl"></i>
          </a>
        </motion.div>
      </div>
      
      {/* Dynamic Elements */}
      <motion.div 
        className="absolute bottom-0 right-0 z-20 w-full md:w-1/2 h-1/2 opacity-30"
        style={{ y: layer3Y }}
      >
        <img 
          src="https://www.freeiconspng.com/uploads/counter-strike-icon-24.png" 
          alt="Counter-Strike Element" 
          className="object-contain w-full h-full animate-float"
        />
      </motion.div>
    </header>
  );
};

export default Header;
