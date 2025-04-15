import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Mock player stats data
const playerStats = {
  overview: {
    kdRatio: '1.28',
    winRate: '64%',
    avgKills: '18.5',
    headshotPercentage: '37.2%'
  },
  weaponStats: [
    { name: 'AK-47 ACCURACY', value: '78%', percentage: 78 },
    { name: 'AWP SUCCESS RATE', value: '62%', percentage: 62 },
    { name: 'FLASH EFFECTIVENESS', value: '83%', percentage: 83 },
    { name: 'CLUTCH SITUATIONS', value: '41%', percentage: 41 }
  ],
  rank: {
    name: 'LEGENDARY EAGLE MASTER',
    image: 'https://static.wikia.nocookie.net/cswikia/images/4/4f/Skillgroup14.png',
    percentile: 'Top 7% of players',
    nextRankProgress: '86%',
    matchesWon: '427',
    totalMatches: '672',
    competitiveWins: '203',
    mvpStars: '1486'
  }
};

const StatBar = ({ name, value, percentage, delay = 0, isInView }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-rajdhani font-bold">{name}</span>
        <span className="text-primary font-rajdhani">{value}</span>
      </div>
      <div className="h-2 bg-black/50 overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, className = "" }) => {
  return (
    <div className={`bg-black/50 p-4 text-center ${className}`}>
      <div className="text-primary font-rajdhani text-3xl font-bold">{value}</div>
      <div className="text-muted-foreground text-sm uppercase mt-1">{title}</div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section id="stats" className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-card" ref={sectionRef}>
      <div className="diagonal-line absolute inset-0 z-10 opacity-20"></div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="font-stratum text-4xl md:text-5xl text-white mb-6 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary">PLAYER</span> STATISTICS
        </motion.h2>
        
        <motion.p 
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Track your performance, analyze your gameplay, and improve your skills with detailed statistics tracking.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="bg-card border border-muted-foreground p-6 lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-stratum text-2xl text-white mb-6">PERFORMANCE OVERVIEW</h3>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatCard title="K/D Ratio" value={playerStats.overview.kdRatio} />
              <StatCard title="Win Rate" value={playerStats.overview.winRate} />
              <StatCard title="Avg. Kills" value={playerStats.overview.avgKills} />
              <StatCard title="Headshot %" value={playerStats.overview.headshotPercentage} />
            </motion.div>
            
            <div className="space-y-6">
              {playerStats.weaponStats.map((stat, index) => (
                <motion.div 
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                >
                  <StatBar 
                    name={stat.name} 
                    value={stat.value} 
                    percentage={stat.percentage} 
                    delay={0.5 + (index * 0.1)}
                    isInView={isInView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-card border border-muted-foreground p-6"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-stratum text-2xl text-white mb-6">RANK PROGRESS</h3>
            
            <motion.div 
              className="flex flex-col items-center mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src={playerStats.rank.image} 
                alt={playerStats.rank.name} 
                className="w-32 h-32 mb-4"
              />
              <div className="text-center">
                <div className="text-white font-rajdhani text-xl font-bold">{playerStats.rank.name}</div>
                <div className="text-muted-foreground text-sm">{playerStats.rank.percentile}</div>
              </div>
            </motion.div>
            
            <div className="space-y-4">
              <motion.div 
                className="bg-black/50 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani font-bold">NEXT RANK</span>
                  <span className="text-primary font-rajdhani">{playerStats.rank.nextRankProgress}</span>
                </div>
                <div className="h-2 bg-card mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: playerStats.rank.nextRankProgress } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-black/50 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-rajdhani font-bold">MATCHES WON</div>
                    <div className="text-primary font-rajdhani text-2xl">{playerStats.rank.matchesWon}</div>
                  </div>
                  <div>
                    <div className="font-rajdhani font-bold text-right">TOTAL MATCHES</div>
                    <div className="text-primary font-rajdhani text-2xl text-right">{playerStats.rank.totalMatches}</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-black/50 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-rajdhani font-bold">COMPETITIVE WINS</div>
                    <div className="text-primary font-rajdhani text-2xl">{playerStats.rank.competitiveWins}</div>
                  </div>
                  <div>
                    <div className="font-rajdhani font-bold text-right">MVP STARS</div>
                    <div className="text-primary font-rajdhani text-2xl text-right">{playerStats.rank.mvpStars}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button 
            className="clip-diagonal bg-primary text-black font-stratum font-bold py-3 px-12 text-lg transform transition-transform duration-300 hover:translate-y-[-5px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW DETAILED STATS
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
