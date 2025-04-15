import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Mock news data
const newsArticles = [
  {
    id: 1,
    title: 'MAJOR WEAPON BALANCING UPDATE',
    date: 'OCTOBER 15, 2023',
    description: 'The latest update focuses on weapon balancing, with adjustments to the AK-47, M4A4, and AWP to create a more competitive environment.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1974&auto=format&fit=crop',
    category: {
      name: 'UPDATE',
      color: 'primary'
    }
  },
  {
    id: 2,
    title: 'WORLD CHAMPIONSHIP ANNOUNCED',
    date: 'OCTOBER 10, 2023',
    description: 'The Counter-Strike World Championship will take place in Stockholm this December with a $2,000,000 prize pool for competing teams.',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2070&auto=format&fit=crop',
    category: {
      name: 'TOURNAMENT',
      color: 'accent'
    }
  },
  {
    id: 3,
    title: 'SHADOW SYNDICATE CASE REVEALED',
    date: 'OCTOBER 5, 2023',
    description: 'The new Shadow Syndicate Case brings 17 community-created weapon skins with the ultra-rare Shadow Knife collection.',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
    category: {
      name: 'NEW CONTENT',
      color: 'destructive'
    }
  }
];

const NewsCard = ({ article, index, isInView }) => {
  return (
    <motion.div 
      className="bg-card overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 relative overflow-hidden">
        <motion.img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        
        <div className={`absolute top-0 right-0 bg-${article.category.color} text-black font-rajdhani font-bold px-3 py-1`}>
          {article.category.name}
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-muted-foreground text-sm mb-2 font-rajdhani">{article.date}</div>
        <h3 className="font-stratum text-xl text-white mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
        <a href="#" className="text-primary font-rajdhani font-bold flex items-center group-hover:translate-x-2 transition-transform">
          READ MORE
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </motion.div>
  );
};

const NewsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section id="news" className="relative py-24 overflow-hidden bg-gradient-to-t from-background to-card" ref={sectionRef}>
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
          <span className="text-primary">LATEST</span> UPDATES
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} isInView={isInView} />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button 
            className="clip-diagonal-reverse border-2 border-primary text-primary font-stratum font-bold py-3 px-12 text-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:bg-primary hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL NEWS
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewsSection;
