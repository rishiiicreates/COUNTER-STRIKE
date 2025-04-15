import { motion } from 'framer-motion';

const Footer = () => {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      className="bg-black text-muted-foreground py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="https://static.wikia.nocookie.net/cswikia/images/9/9b/Csgo_logo.png" 
                alt="Counter-Strike Logo" 
                className="h-10"
              />
              <h3 className="font-stratum text-xl text-white">COUNTER-STRIKE</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              © 2023 Valve Corporation. All rights reserved. Counter-Strike and all related logos are trademarks of Valve Corporation.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-twitter text-xl"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-facebook text-xl"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-instagram text-xl"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-youtube text-xl"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-twitch text-xl"></i>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-stratum text-white mb-4">GAME</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Updates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Download</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">System Requirements</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-stratum text-white mb-4">COMMUNITY</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Workshop</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Forums</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tournaments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Leaderboards</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-stratum text-white mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Report a Bug</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-muted-foreground pt-6 text-center text-muted-foreground text-sm"
          variants={itemVariants}
        >
          <p>This website is a mockup design and is not affiliated with Valve Corporation or the Counter-Strike franchise.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
