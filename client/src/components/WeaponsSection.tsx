import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Define weapon types and data structure
const weaponCategories = ['RIFLES', 'PISTOLS', 'SNIPERS'];

// Mock weapon data (based on the design reference)
const weaponsData = {
  RIFLES: [
    {
      id: 1,
      name: 'AK-47',
      price: '$2,700',
      description: 'Powerful and reliable assault rifle with high damage and challenging recoil pattern.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/3/3e/Ak47_csgoa.png',
      stats: {
        damage: { value: 36, percentage: 80 },
        fireRate: { value: '600 RPM', percentage: 65 },
        accuracy: { value: '7/10', percentage: 70 }
      }
    },
    {
      id: 2,
      name: 'M4A4',
      price: '$3,100',
      description: 'Versatile CT assault rifle with balanced damage and superior rate of fire.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/1/16/M4a4_hud_csgo.png',
      stats: {
        damage: { value: 33, percentage: 70 },
        fireRate: { value: '666 RPM', percentage: 75 },
        accuracy: { value: '8/10', percentage: 80 }
      }
    },
    {
      id: 3,
      name: 'AWP',
      price: '$4,750',
      description: 'Iconic bolt-action sniper rifle with one-shot kill potential. High-risk, high-reward.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/a/ae/Awp_hud_csgo.png',
      stats: {
        damage: { value: 115, percentage: 100 },
        fireRate: { value: '41 RPM', percentage: 25 },
        accuracy: { value: '10/10', percentage: 100 }
      }
    }
  ],
  PISTOLS: [
    {
      id: 4,
      name: 'Desert Eagle',
      price: '$700',
      description: 'Powerful semi-automatic pistol with high damage and accuracy at the cost of low rate of fire.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png',
      stats: {
        damage: { value: 53, percentage: 90 },
        fireRate: { value: '267 RPM', percentage: 40 },
        accuracy: { value: '8/10', percentage: 80 }
      }
    },
    {
      id: 5,
      name: 'USP-S',
      price: '$200',
      description: 'Standard-issue CT pistol with an integrated silencer for stealthy precision shots.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/7/73/Usps_hud_csgo.png',
      stats: {
        damage: { value: 35, percentage: 60 },
        fireRate: { value: '352 RPM', percentage: 55 },
        accuracy: { value: '9/10', percentage: 90 }
      }
    },
    {
      id: 6,
      name: 'Glock-18',
      price: '$200',
      description: 'Reliable T-side starter pistol with burst-fire capability and large magazine.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/1/15/Glock18_hud_csgo.png',
      stats: {
        damage: { value: 28, percentage: 50 },
        fireRate: { value: '400 RPM', percentage: 65 },
        accuracy: { value: '7/10', percentage: 70 }
      }
    }
  ],
  SNIPERS: [
    {
      id: 7,
      name: 'AWP',
      price: '$4,750',
      description: 'Iconic bolt-action sniper rifle with one-shot kill potential. High-risk, high-reward.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/a/ae/Awp_hud_csgo.png',
      stats: {
        damage: { value: 115, percentage: 100 },
        fireRate: { value: '41 RPM', percentage: 25 },
        accuracy: { value: '10/10', percentage: 100 }
      }
    },
    {
      id: 8,
      name: 'SSG 08',
      price: '$1,700',
      description: 'Bolt-action sniper rifle with high mobility. Deadly accurate while jumping.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/3/3c/Ssg08_hud_csgo.png',
      stats: {
        damage: { value: 88, percentage: 75 },
        fireRate: { value: '48 RPM', percentage: 30 },
        accuracy: { value: '9/10', percentage: 90 }
      }
    },
    {
      id: 9,
      name: 'G3SG1',
      price: '$5,000',
      description: 'Automatic sniper rifle with high damage and fire rate. Perfect for long-range control.',
      image: 'https://static.wikia.nocookie.net/cswikia/images/9/9c/G3sg1_hud_csgo.png',
      stats: {
        damage: { value: 80, percentage: 70 },
        fireRate: { value: '240 RPM', percentage: 60 },
        accuracy: { value: '7/10', percentage: 70 }
      }
    }
  ]
};

const WeaponCard = ({ weapon, inView }) => {
  return (
    <motion.div 
      className="weapon-card bg-gradient-to-br from-card to-black border border-muted-foreground overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: weapon.id * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img 
          src={weapon.image} 
          alt={weapon.name} 
          className="weapon-image absolute inset-0 object-contain p-8 z-0"
        />
      </div>
      
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 bg-primary text-black font-rajdhani font-bold px-4 py-1 clip-diagonal">
          {weapon.price}
        </div>
        
        <h3 className="font-stratum text-2xl text-white mb-2">{weapon.name}</h3>
        <p className="text-muted-foreground mb-4">{weapon.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between mb-1">
            <span className="font-rajdhani font-bold">DAMAGE</span>
            <span className="text-primary font-rajdhani">{weapon.stats.damage.value}</span>
          </div>
          <div className="h-2 bg-secondary overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={inView ? { width: `${weapon.stats.damage.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, delay: weapon.id * 0.1 + 0.3 }}
            ></motion.div>
          </div>
          
          <div className="flex justify-between mb-1">
            <span className="font-rajdhani font-bold">FIRE RATE</span>
            <span className="text-primary font-rajdhani">{weapon.stats.fireRate.value}</span>
          </div>
          <div className="h-2 bg-secondary overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={inView ? { width: `${weapon.stats.fireRate.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, delay: weapon.id * 0.1 + 0.4 }}
            ></motion.div>
          </div>
          
          <div className="flex justify-between mb-1">
            <span className="font-rajdhani font-bold">ACCURACY</span>
            <span className="text-primary font-rajdhani">{weapon.stats.accuracy.value}</span>
          </div>
          <div className="h-2 bg-secondary overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={inView ? { width: `${weapon.stats.accuracy.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, delay: weapon.id * 0.1 + 0.5 }}
            ></motion.div>
          </div>
        </div>
        
        <motion.button 
          className="mt-6 w-full py-3 bg-secondary border-l-2 border-primary text-primary font-rajdhani font-bold transform transition-all duration-300 group-hover:bg-primary group-hover:text-black"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          INSPECT WEAPON
        </motion.button>
      </div>
    </motion.div>
  );
};

const WeaponsSection = () => {
  const [activeCategory, setActiveCategory] = useState(weaponCategories[0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section id="weapons" className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-card" ref={sectionRef}>
      <div className="diagonal-line absolute inset-0 z-10 opacity-20"></div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <motion.h2 
            className="font-stratum text-4xl md:text-5xl text-white mb-6 md:mb-0"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary">ARSENAL</span> LOADOUT
          </motion.h2>
          
          <div className="flex space-x-4">
            {weaponCategories.map((category) => (
              <motion.button 
                key={category}
                className={`bg-secondary py-2 px-6 transition-all hover:bg-primary hover:text-black font-rajdhani font-bold ${activeCategory === category ? 'border-l-4 border-primary' : ''}`}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {weaponsData[activeCategory].map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} inView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button 
            className="clip-diagonal-reverse border-2 border-primary text-primary font-stratum font-bold py-3 px-12 text-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:bg-primary hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL WEAPONS
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WeaponsSection;
