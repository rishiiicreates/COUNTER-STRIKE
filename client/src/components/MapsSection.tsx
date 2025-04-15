import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Map data
const maps = [
  {
    id: 1,
    name: 'MIRAGE',
    image: 'https://images.unsplash.com/photo-1605806616949-59450419c3a3?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'INFERNO',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'NUKE',
    image: 'https://images.unsplash.com/photo-1546942113-a6c43b63104a?q=80&w=2070&auto=format&fit=crop'
  }
];

// Featured map details
const featuredMap = {
  name: 'DUST II',
  image: 'https://images.unsplash.com/photo-1624138125599-751531219264?q=80&w=2071&auto=format&fit=crop',
  description: 'The most iconic map in Counter-Strike history. Set in a Middle Eastern town, this classic bomb defusal map features long sightlines, crucial chokepoints, and endless strategic possibilities.',
  sites: ['A', 'B', 'MID']
};

const MapsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section id="maps" className="relative py-24 overflow-hidden bg-gradient-to-t from-background to-card" ref={sectionRef}>
      <div className="diagonal-line absolute inset-0 z-10 opacity-20"></div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="font-stratum text-4xl md:text-5xl text-white mb-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary">BATTLEGROUND</span> LOCATIONS
        </motion.h2>
        
        <motion.div 
          className="relative h-[500px] overflow-hidden mb-16"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 z-0">
            <motion.img 
              src={featuredMap.image} 
              alt="Dust II Map" 
              className="w-full h-full object-cover opacity-70"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 5 }}
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          
          <motion.div 
            className="absolute bottom-0 left-0 z-20 p-8 md:p-12 max-w-xl"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-black/80 p-6 border-l-4 border-primary">
              <h3 className="font-stratum text-3xl text-white mb-3">{featuredMap.name}</h3>
              <p className="text-muted-foreground mb-4">{featuredMap.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {featuredMap.sites.map((site, index) => (
                  <motion.div 
                    key={site} 
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="text-primary font-rajdhani font-bold text-2xl">{site}</div>
                    <div className="text-sm">
                      {index === 2 ? 'Control' : 'Site'}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="w-full py-3 bg-primary text-black font-rajdhani font-bold transform transition-all duration-300 hover:bg-primary/80"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                EXPLORE MAP
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {maps.map((map, index) => (
            <motion.div 
              key={map.id}
              className="group relative overflow-hidden h-60 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img 
                src={map.image} 
                alt={`${map.name} Map`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h4 className="font-stratum text-2xl text-white">{map.name}</h4>
                <motion.div 
                  className="h-1 w-16 bg-primary mt-2"
                  whileHover={{ width: '6rem' }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapsSection;
