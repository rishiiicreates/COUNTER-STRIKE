import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlaceholderImage from './ui/placeholder-image';

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
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  // Boot sequence texts
  const bootTexts = [
    'INITIALIZING SYSTEMS...',
    'LOADING TACTICAL DATABASE...',
    'ESTABLISHING SECURE CONNECTION...',
    'CALIBRATING WEAPON SYSTEMS...',
    'ACCESS GRANTED. WELCOME OPERATOR.'
  ];
  
  // Simulate typing animation
  useEffect(() => {
    if (showBootSequence) {
      const text = bootTexts[bootStep];
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(prev => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (bootStep < bootTexts.length - 1) {
              setBootStep(prev => prev + 1);
              setTypedText('');
            } else {
              // Boot sequence complete
              setTimeout(() => {
                setShowBootSequence(false);
              }, 1000);
            }
          }, 800);
        }
      }, 50);
      
      return () => clearInterval(typeInterval);
    }
  }, [bootStep, showBootSequence]);
  
  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  const handleMenuClick = (menuId: string) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };
  
  // Mock data for each section
  const arsenalData = [
    { id: 1, name: 'AK-47', type: 'RIFLE', damage: 85 },
    { id: 2, name: 'M4A4', type: 'RIFLE', damage: 75 },
    { id: 3, name: 'AWP', type: 'SNIPER', damage: 100 },
    { id: 4, name: 'DEAGLE', type: 'PISTOL', damage: 70 }
  ];
  
  const mapsData = [
    { id: 1, name: 'DUST II', status: 'ACTIVE' },
    { id: 2, name: 'MIRAGE', status: 'ACTIVE' },
    { id: 3, name: 'NUKE', status: 'ACTIVE' },
    { id: 4, name: 'INFERNO', status: 'ACTIVE' }
  ];
  
  const statsData = {
    rank: 'LEGENDARY EAGLE',
    kd: '1.28',
    wins: '427',
    accuracy: '68%',
    playtime: '1245h'
  };
  
  const intelData = [
    { id: 1, title: 'MAJOR UPDATE', level: 'URGENT', date: '15.10.23' },
    { id: 2, title: 'TOURNAMENT RESULTS', level: 'INFO', date: '10.10.23' },
    { id: 3, title: 'TEAM ROSTER CHANGES', level: 'NOTICE', date: '05.10.23' }
  ];
  
  if (showBootSequence) {
    return (
      <div className="boot-sequence h-screen bg-black flex items-center justify-center">
        <div className="max-w-3xl w-full p-8">
          <div className="boot-header flex items-center mb-8">
            <div className="w-8 h-8 border-2 border-primary animate-pulse mr-4"></div>
            <div className="text-primary font-mono text-xl">TACTICAL SYSTEM v2.5</div>
          </div>
          
          <div className="terminal-window border-2 border-primary p-4 bg-black/80">
            <div className="font-mono text-primary text-lg">
              {typedText}
              {showCursor && <span className="cursor inline-block w-2 h-5 bg-primary ml-1"></span>}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="h-2 bg-primary animate-pulse" style={{ width: `${(bootStep + 1) / bootTexts.length * 100}%` }}></div>
            <div className="text-primary font-mono">{Math.round((bootStep + 1) / bootTexts.length * 100)}%</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="tactical-ui min-h-screen bg-black text-primary font-mono">
      {/* Interface Header */}
      <header className="border-b border-primary/50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
              <div className="w-4 h-4 bg-primary"></div>
            </div>
            <h1 className="font-stratum text-xl">TACTICAL OPERATIONS</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
              <div className="text-xs p-2 border border-primary/50 flex items-center">
                <span className="w-2 h-2 bg-green-500 animate-pulse mr-2"></span>
                <span>ONLINE</span>
              </div>
              <div className="text-xs p-2 border border-primary/50">
                NAV: <span className="text-white">MAIN</span>
              </div>
            </div>
            <motion.button 
              className="border-2 border-primary px-4 py-2 hover:bg-primary hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              LOGIN
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Grid Layout */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2">
          {/* Sidebar Menu */}
          <div className="menu-sidebar border-2 border-primary/50 p-2 bg-black/80">
            <div className="menu-title border-b border-primary/50 p-2 mb-4">
              <div className="text-center font-stratum text-lg">COMMAND MENU</div>
            </div>
            
            <div className="menu-options space-y-2">
              {mainOptions.map(option => (
                <motion.button
                  key={option.id}
                  className={`w-full py-3 px-4 text-left border ${activeMenu === option.id ? 'border-primary bg-primary/10 text-white' : 'border-primary/30 hover:border-primary/60'}`}
                  onClick={() => handleMenuClick(option.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">[{option.id.charAt(0)}]</span>
                  {option.label}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8 p-2 border border-primary/30 text-xs">
              <div className="mb-2 border-b border-primary/30 pb-1">SYSTEM STATUS</div>
              <div className="flex justify-between mb-1">
                <span>CPU:</span>
                <span className="text-green-400">OPTIMAL</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>MEMORY:</span>
                <span className="text-green-400">86%</span>
              </div>
              <div className="flex justify-between">
                <span>CONNECTION:</span>
                <span className="text-green-400">SECURE</span>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="main-content lg:col-span-4 border-2 border-primary/50 bg-black/80 p-4 relative min-h-[600px]">
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
                        {arsenalData.map(weapon => (
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
                            
                            <div className="weapon-stats mt-4 pt-4 border-t border-primary/30">
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
                        ))}
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
                        {mapsData.map(map => (
                          <motion.div 
                            key={map.id}
                            className="map-card relative border border-primary/60 aspect-video p-4 hover:bg-primary/10 transition-colors overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                          >
                            <PlaceholderImage 
                              width="100%" 
                              height="100%" 
                              text={`MAP: ${map.name}`}
                              className="absolute inset-0"
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
                        ))}
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
                        <PlaceholderImage 
                          width="100%" 
                          height="100%" 
                          text="OPERATION HIGHLIGHTS"
                          className="absolute inset-0"
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
                        {[1, 2, 3, 4].map(id => (
                          <motion.div 
                            key={id}
                            className="media-thumb border border-primary/60 aspect-video relative cursor-pointer overflow-hidden"
                            whileHover={{ y: -5 }}
                          >
                            <PlaceholderImage 
                              width="100%" 
                              height="100%" 
                              text={`VIDEO ${id}`}
                              className="absolute inset-0"
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
            
            {/* Interface Elements Overlay */}
            <div className="interface-elements absolute top-2 right-2 flex space-x-2">
              <div className="w-3 h-3 border border-primary"></div>
              <div className="w-3 h-3 border border-primary bg-primary animate-ping"></div>
            </div>
            
            <div className="absolute bottom-2 left-2 text-xs text-primary/50">
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
    </div>
  );
};

export default GameInterface;