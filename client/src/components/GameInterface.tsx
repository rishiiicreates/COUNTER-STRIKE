import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import SVG images
import dust2Svg from '../assets/images/dust2.svg';
import mirageSvg from '../assets/images/mirage.svg';
import nukeSvg from '../assets/images/nuke.svg';
import infernoSvg from '../assets/images/inferno.svg';

import ak47Svg from '../assets/images/ak47.svg';
import m4a4Svg from '../assets/images/m4a4.svg';
import awpSvg from '../assets/images/awp.svg';
import deagleSvg from '../assets/images/deagle.svg';

import highlightSvg from '../assets/images/highlight.svg';
import video1Svg from '../assets/images/video1.svg';
import video2Svg from '../assets/images/video2.svg';
import video3Svg from '../assets/images/video3.svg';
import video4Svg from '../assets/images/video4.svg';

interface MenuOption {
  id: string;
  label: string;
  icon?: string;
}

const mainOptions: MenuOption[] = [
  { id: 'arsenal', label: 'ARSENAL' },
  { id: 'maps', label: 'MAPS' },
  { id: 'stats', label: 'STATS' },
  { id: 'intel', label: 'INTEL' },
  { id: 'media', label: 'MEDIA' }
];

const GameInterface: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  // Handle mouse movements for custom cursor
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cursor-link') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A') {
        setCursorHover(true);
      }
    };

    const onMouseOut = () => {
      setCursorHover(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const handleButtonInteractions = () => {
      const buttons = document.querySelectorAll('button, a, .cursor-link');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', onMouseOver);
        button.addEventListener('mouseleave', onMouseOut);
      });
      
      return buttons;
    };
    
    const buttons = handleButtonInteractions();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', onMouseOver);
        button.removeEventListener('mouseleave', onMouseOut);
      });
    };
  }, []);

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  // Sample data
  const arsenalData = [
    { id: 1, name: 'AK-47', type: 'RIFLE', damage: 90 },
    { id: 2, name: 'M4A4', type: 'RIFLE', damage: 85 },
    { id: 3, name: 'AWP', type: 'SNIPER', damage: 100 },
    { id: 4, name: 'DEAGLE', type: 'PISTOL', damage: 75 }
  ];

  const mapsData = [
    { id: 1, name: 'DUST II', status: 'ACTIVE' },
    { id: 2, name: 'MIRAGE', status: 'ACTIVE' },
    { id: 3, name: 'NUKE', status: 'MAINTENANCE' },
    { id: 4, name: 'INFERNO', status: 'ACTIVE' }
  ];

  const statsData = {
    rank: 'GLOBAL',
    kd: '1.45',
    wins: '342',
    accuracy: '67%',
    playtime: '1,354h'
  };

  const intelData = [
    { id: 1, title: 'TOURNAMENT SCHEDULE UPDATE', level: 'STANDARD', date: '2023-06-15' },
    { id: 2, title: 'SECURITY BREACH DETECTED', level: 'URGENT', date: '2023-06-12' },
    { id: 3, title: 'NEW WEAPON SKINS RELEASED', level: 'NOTICE', date: '2023-06-10' },
    { id: 4, title: 'MAP ROTATION CHANGES', level: 'STANDARD', date: '2023-06-05' },
  ];

  // Custom cursor component
  const CustomCursor = () => {
    if (typeof window === 'undefined') return null;
    
    return (
      <>
        <div 
          className="cursor cursor-dot"
          style={{
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`
          }}
        ></div>
        <div 
          className={`cursor cursor-outline ${cursorHover ? 'cursor-hover' : ''}`}
          style={{
            left: `${cursorPosition.x - 12}px`, 
            top: `${cursorPosition.y - 12}px`
          }}
        ></div>
      </>
    );
  }

  return (
    <div className="tactical-ui min-h-screen bg-black text-primary font-mono relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 gap-0.5">
          {Array(12).fill(0).map((_, i) => (
            <div key={`col-${i}`} className="h-full border-r border-primary/30"></div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full grid grid-rows-12 gap-0.5">
          {Array(12).fill(0).map((_, i) => (
            <div key={`row-${i}`} className="w-full border-b border-primary/30"></div>
          ))}
        </div>
      </div>
      
      {/* Scanline effect */}
      <div className="scanlines absolute inset-0 z-0 pointer-events-none opacity-10 bg-scanline"></div>
      
      {/* Interface Header */}
      <motion.header 
        className="relative z-10 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-4 mb-4 md:mb-0"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center relative">
                <div className="w-5 h-5 bg-primary"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 border border-primary bg-black"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-primary bg-black"></div>
              </div>
              <div>
                <h1 className="font-stratum text-2xl tracking-wider">
                  <span className="text-primary">TACTICAL</span>
                  <span className="text-white">OPERATIONS</span>
                </h1>
                <div className="text-xs text-primary/70 tracking-widest">SYSTEM V2.5.4 // CLASSIFIED</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="hidden md:flex space-x-3">
                <div className="terminal-tag bg-black text-xs py-1 px-3 border border-primary/50 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                  <span>SECURE.CONNECTION</span>
                </div>
                <div className="terminal-tag bg-black text-xs py-1 px-3 border border-primary/50 relative overflow-hidden group">
                  <span className="relative z-10">NET.STATUS: ONLINE</span>
                  <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </div>
              </div>
              <motion.button 
                className="hexagon-button relative py-2 px-5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 font-bold tracking-wider">ACCESS</span>
                <div className="absolute inset-0 border-2 border-primary"></div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/90 transition-all duration-300"></div>
                <div className="absolute inset-0 group-hover:text-black transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="font-bold tracking-wider">ACCESS</span>
                </div>
                <div className="absolute -top-1 -left-1 w-2 h-2 border border-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-primary"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      {/* Advanced Terminal UI Layout */}
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="terminal-frame border-2 border-primary relative">
          <div className="terminal-header bg-primary/10 border-b border-primary px-4 py-2 flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <div className="terminal-id text-xs">TERMINAL://MAIN_INTERFACE</div>
            </div>
            <div className="flex space-x-2">
              <div className="terminal-controls w-4 h-4 border border-primary flex items-center justify-center">
                <div className="w-2 h-0.5 bg-primary"></div>
              </div>
              <div className="terminal-controls w-4 h-4 border border-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-primary"></div>
              </div>
              <div className="terminal-controls w-4 h-4 border border-primary text-xs flex items-center justify-center">x</div>
            </div>
          </div>
          
          <div className="terminal-body p-6 flex flex-col lg:flex-row">
            {/* Command Console */}
            <motion.div 
              className="command-console w-full lg:w-64 border border-primary bg-black/60 mb-6 lg:mb-0 lg:mr-6 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="console-header border-b border-primary/50 p-3">
                <div className="text-sm font-stratum">COMMAND INTERFACE</div>
              </div>
              
              <div className="command-list p-2 space-y-1">
                {mainOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    className={`w-full py-2 px-3 text-left text-sm bg-black/60 hover:bg-primary/20 relative overflow-hidden group ${activeMenu === option.id ? 'active-command' : ''}`}
                    onClick={() => handleMenuClick(option.id)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className={`command-indicator w-3 h-3 border ${activeMenu === option.id ? 'border-primary bg-primary/50' : 'border-primary/50'} mr-3 relative`}>
                        {activeMenu === option.id && (
                          <div className="absolute inset-0 bg-primary/50 animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <span className="text-xs text-primary/50">[{option.id.charAt(0).toUpperCase()}]</span>
                        </div>
                        <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300 mt-0.5"></div>
                      </div>
                    </div>
                    {activeMenu === option.id && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="console-stats p-3 border-t border-primary/50 text-xs space-y-2 mt-auto">
                <div className="stat-item">
                  <div className="flex justify-between mb-1">
                    <span>SYS INTEGRITY</span>
                    <span>97%</span>
                  </div>
                  <div className="h-1 bg-primary/20">
                    <div className="h-full bg-primary" style={{ width: '97%' }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="flex justify-between mb-1">
                    <span>MEMORY USAGE</span>
                    <span>64%</span>
                  </div>
                  <div className="h-1 bg-primary/20">
                    <div className="h-full bg-primary" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="flex justify-between mb-1">
                    <span>NETWORK</span>
                    <span>SECURE</span>
                  </div>
                  <div className="h-1 bg-primary/20">
                    <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-primary rounded-full opacity-10"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 border border-primary rounded-full opacity-10"></div>
            </motion.div>
            
            {/* Main Display */}
            <motion.div 
              className="main-display flex-1 border border-primary bg-black/60 min-h-[600px] relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <AnimatePresence mode="wait">
                {activeMenu ? (
                  <motion.div
                    key={activeMenu}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {/* Arsenal Section */}
                    {activeMenu === 'arsenal' && (
                      <div>
                        <div className="section-header flex justify-between items-center mb-6 border-b border-primary/50 pb-2">
                          <h2 className="font-stratum text-2xl">ARSENAL DATABASE</h2>
                          <div className="cursor-link text-xs border border-primary/50 px-2 py-1">SORT: DAMAGE</div>
                        </div>
                        
                        <div className="weapon-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                          {arsenalData.map(weapon => {
                            // Select the correct weapon SVG based on weapon name
                            let weaponImage;
                            switch (weapon.name) {
                              case 'AK-47':
                                weaponImage = ak47Svg;
                                break;
                              case 'M4A4':
                                weaponImage = m4a4Svg;
                                break;
                              case 'AWP':
                                weaponImage = awpSvg;
                                break;
                              case 'DEAGLE':
                                weaponImage = deagleSvg;
                                break;
                              default:
                                weaponImage = ak47Svg;
                            }
                            
                            return (
                              <motion.div 
                                key={weapon.id}
                                className="weapon-card border border-primary/60 p-4 hover:bg-primary/10 transition-colors"
                                whileHover={{ y: -5 }}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-stratum">{weapon.name}</h3>
                                    <div className="text-xs text-primary/70 mt-1">TYPE: {weapon.type}</div>
                                  </div>
                                  <div className="damage-indicator">
                                    <div className="text-xs text-primary/70">DMG</div>
                                    <div className="text-xl">{weapon.damage}</div>
                                  </div>
                                </div>
                                
                                <div className="weapon-image mt-4 mb-4 flex justify-center overflow-hidden bg-black/30 p-2 border border-primary/20">
                                  <img 
                                    src={weaponImage} 
                                    alt={weapon.name}
                                    className="w-full h-32 object-contain"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.onerror = null;
                                      console.log(`Failed to load image: ${target.src}`);
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                
                                <div className="weapon-stats pt-4 border-t border-primary/30">
                                  <div className="flex items-center">
                                    <div className="h-2 bg-primary/20 flex-grow mr-2">
                                      <div className="h-full bg-primary" style={{ width: `${weapon.damage}%` }}></div>
                                    </div>
                                    <div className="text-xs w-10 text-right">
                                      {weapon.damage}%
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="mt-4 text-center">
                                  <button className="border border-primary px-4 py-1 text-sm hover:bg-primary hover:text-black transition-colors">INSPECT</button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Maps Section */}
                    {activeMenu === 'maps' && (
                      <div>
                        <div className="section-header flex justify-between items-center mb-6 border-b border-primary/50 pb-2">
                          <h2 className="font-stratum text-2xl">TACTICAL ENVIRONMENTS</h2>
                          <div className="cursor-link text-xs border border-primary/50 px-2 py-1">VIEW: GRID</div>
                        </div>
                        
                        <div className="maps-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mapsData.map(map => {
                            // Select the correct map SVG based on map name
                            let mapImage;
                            switch (map.name) {
                              case 'DUST II':
                                mapImage = dust2Svg;
                                break;
                              case 'MIRAGE':
                                mapImage = mirageSvg;
                                break;
                              case 'NUKE':
                                mapImage = nukeSvg;
                                break;
                              case 'INFERNO':
                                mapImage = infernoSvg;
                                break;
                              default:
                                mapImage = dust2Svg;
                            }
                            
                            return (
                              <motion.div 
                                key={map.id}
                                className="map-card relative border border-primary/60 aspect-video hover:bg-primary/10 transition-colors overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                              >
                                <img 
                                  src={mapImage} 
                                  alt={`${map.name} map`}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    console.log(`Failed to load map image: ${target.src}`);
                                    target.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                  <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-stratum">{map.name}</h3>
                                    <div className={`status-tag px-2 py-1 text-xs ${map.status === 'ACTIVE' ? 'border border-green-500 text-green-500' : 'border border-yellow-500 text-yellow-500'}`}>
                                      {map.status}
                                    </div>
                                  </div>
                                  
                                  <button className="mt-4 border border-primary px-4 py-1 text-sm hover:bg-primary hover:text-black transition-colors">
                                    INTEL
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Stats Section */}
                    {activeMenu === 'stats' && (
                      <div>
                        <div className="section-header flex justify-between items-center mb-6 border-b border-primary/50 pb-2">
                          <h2 className="font-stratum text-2xl">OPERATIVE PERFORMANCE</h2>
                          <div className="cursor-link text-xs border border-primary/50 px-2 py-1">PERIOD: ALL TIME</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="operator-summary border border-primary/60 p-6">
                            <div className="text-center mb-6">
                              <div className="inline-block border-4 border-primary p-2 mb-2">
                                <div className="text-2xl font-stratum">{statsData.rank}</div>
                              </div>
                              <div className="text-xs text-primary/70">CURRENT RANK</div>
                            </div>
                            
                            <div className="stats-grid grid grid-cols-2 gap-4">
                              <div className="stat-card border border-primary/30 p-3 text-center">
                                <div className="text-xl">{statsData.kd}</div>
                                <div className="text-xs text-primary/70">K/D RATIO</div>
                              </div>
                              <div className="stat-card border border-primary/30 p-3 text-center">
                                <div className="text-xl">{statsData.wins}</div>
                                <div className="text-xs text-primary/70">TOTAL WINS</div>
                              </div>
                              <div className="stat-card border border-primary/30 p-3 text-center">
                                <div className="text-xl">{statsData.accuracy}</div>
                                <div className="text-xs text-primary/70">ACCURACY</div>
                              </div>
                              <div className="stat-card border border-primary/30 p-3 text-center">
                                <div className="text-xl">{statsData.playtime}</div>
                                <div className="text-xs text-primary/70">ACTIVE TIME</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="performance-metrics border border-primary/60 p-6">
                            <h3 className="text-xl font-stratum mb-4">COMBAT METRICS</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>ACCURACY</span>
                                  <span>68%</span>
                                </div>
                                <div className="h-2 bg-primary/20">
                                  <div className="h-full bg-primary" style={{ width: '68%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>HEADSHOT %</span>
                                  <span>43%</span>
                                </div>
                                <div className="h-2 bg-primary/20">
                                  <div className="h-full bg-primary" style={{ width: '43%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>WIN RATE</span>
                                  <span>61%</span>
                                </div>
                                <div className="h-2 bg-primary/20">
                                  <div className="h-full bg-primary" style={{ width: '61%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>CLUTCH RATE</span>
                                  <span>32%</span>
                                </div>
                                <div className="h-2 bg-primary/20">
                                  <div className="h-full bg-primary" style={{ width: '32%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Intel Section */}
                    {activeMenu === 'intel' && (
                      <div>
                        <div className="section-header flex justify-between items-center mb-6 border-b border-primary/50 pb-2">
                          <h2 className="font-stratum text-2xl">INTELLIGENCE CENTER</h2>
                          <div className="cursor-link text-xs border border-primary/50 px-2 py-1">FILTER: ALL</div>
                        </div>
                        
                        <div className="intel-feed space-y-4">
                          {intelData.map(item => (
                            <motion.div 
                              key={item.id}
                              className="intel-item border border-primary/60 p-4 hover:bg-primary/10 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-stratum">
                                    {item.title}
                                  </h3>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className={`level-indicator px-2 py-1 text-xs
                                      ${item.level === 'URGENT' ? 'border border-red-500 text-red-500' : 
                                        item.level === 'NOTICE' ? 'border border-yellow-500 text-yellow-500' : 
                                        'border border-blue-500 text-blue-500'}`}
                                    >
                                      {item.level}
                                    </div>
                                    <div className="text-xs text-primary/70">{item.date}</div>
                                  </div>
                                </div>
                                
                                <button className="border border-primary px-2 py-1 text-xs hover:bg-primary hover:text-black transition-colors">
                                  VIEW
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Media Section */}
                    {activeMenu === 'media' && (
                      <div>
                        <div className="section-header flex justify-between items-center mb-6 border-b border-primary/50 pb-2">
                          <h2 className="font-stratum text-2xl">MEDIA CENTER</h2>
                          <div className="cursor-link text-xs border border-primary/50 px-2 py-1">TYPE: VIDEO</div>
                        </div>
                        
                        <div className="featured-media mb-8 border border-primary/60 aspect-video relative overflow-hidden">
                          <img 
                            src={highlightSvg} 
                            alt="Operation Highlights"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              console.log(`Failed to load highlight image: ${target.src}`);
                              target.style.display = 'none';
                            }}
                          />
                          
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="play-button w-16 h-16 border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-primary ml-1"></div>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
                            <h3 className="font-stratum text-xl">OPERATION HIGHLIGHTS</h3>
                            <div className="text-xs text-primary/70 mt-1">DURATION: 12:47 • VIEWS: 124,578</div>
                          </div>
                        </div>
                        
                        <div className="media-thumbs grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { id: 1, image: video1Svg, title: "PRO STRATS: DUST II" },
                            { id: 2, image: video2Svg, title: "AIM TRAINING GUIDE" },
                            { id: 3, image: video3Svg, title: "PRO TEAM STRATEGIES" },
                            { id: 4, image: video4Svg, title: "TOURNAMENT HIGHLIGHTS" }
                          ].map(video => (
                            <motion.div 
                              key={video.id}
                              className="media-thumb border border-primary/60 aspect-video relative cursor-pointer overflow-hidden"
                              whileHover={{ y: -5 }}
                            >
                              <img 
                                src={video.image} 
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  console.log(`Failed to load video image: ${target.src}`);
                                  target.style.display = 'none';
                                }}
                              />
                              
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="play-icon w-8 h-8 border border-primary flex items-center justify-center opacity-80">
                                  <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-primary ml-0.5"></div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center"
                  >
                    <div className="text-center">
                      <h2 className="font-stratum text-3xl mb-6">TACTICAL INTERFACE v2.5</h2>
                      <div className="w-20 h-20 border-2 border-primary mx-auto mb-8 flex items-center justify-center">
                        <div className="w-10 h-10 bg-primary animate-pulse"></div>
                      </div>
                      <p className="max-w-xl mx-auto mb-8 text-primary/80">
                        Select a command from the menu to access tactical information and resources.
                        All systems are operational and secure.
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3xl mx-auto">
                        {mainOptions.map(option => (
                          <motion.button
                            key={option.id}
                            className="border-2 border-primary py-3 px-4 hover:bg-primary hover:text-black transition-colors"
                            onClick={() => handleMenuClick(option.id)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Interface Elements Overlay */}
            <div className="absolute top-2 right-4 flex space-x-2 z-50">
              <div className="terminal-control w-4 h-4 border border-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-primary animate-pulse"></div>
              </div>
              <div className="terminal-control w-4 h-4 border border-primary flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                <div className="w-2 h-0.5 bg-primary"></div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 text-xs text-primary/50 z-20">
              SECURED CHANNEL • ID: 7N38X92
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-primary/50 mt-8 py-6 text-center text-xs text-primary/70">
        <div className="container mx-auto px-4">
          <div>TACTICAL INTERFACE v2.5 • ALL SYSTEMS NOMINAL</div>
          <div className="mt-2">Made by <span className="text-primary font-medium">rishiicreates</span></div>
        </div>
      </footer>
      
      {/* Custom cursor */}
      <CustomCursor />
    </div>
  );
};

export default GameInterface;