import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Mock video thumbnails
const videoThumbnails = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2070&auto=format&fit=crop'
  }
];

const VideoThumbnail = ({ video, index, isInView }) => {
  return (
    <motion.div 
      className="relative aspect-video overflow-hidden cursor-pointer border border-muted-foreground hover:border-primary transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.img 
        src={video.image} 
        alt="Gameplay Thumbnail" 
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/20 transition-all">
        <motion.i 
          className="fas fa-play text-primary"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3, type: "spring" }}
        ></motion.i>
      </div>
    </motion.div>
  );
};

const VideoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section className="relative py-24 overflow-hidden bg-black" ref={sectionRef}>
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
          <span className="text-primary">GAMEPLAY</span> EXPERIENCE
        </motion.h2>
        
        <motion.div 
          className="relative aspect-video overflow-hidden border-2 border-muted-foreground hover:border-primary transition-all duration-300 group"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 group-hover:bg-black/30 transition-all duration-300">
            <motion.div 
              className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center group-hover:bg-primary transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-play text-2xl text-white"></i>
            </motion.div>
          </div>
          <motion.img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            alt="Counter-Strike Gameplay" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
        </motion.div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {videoThumbnails.map((video, index) => (
            <VideoThumbnail key={video.id} video={video} index={index} isInView={isInView} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
