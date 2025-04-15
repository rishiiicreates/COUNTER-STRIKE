import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GameInterface from '@/components/GameInterface';

// Add a scanline effect to simulate a retro CRT screen
const Scanline = () => {
  return <div className="scanline"></div>;
};

const HomePage = () => {
  return (
    <div className="tactical-grid min-h-screen">
      <Scanline />
      <GameInterface />
    </div>
  );
};

export default HomePage;
