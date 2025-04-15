import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// CS website sections data
const weaponData = [
  {
    id: 1,
    name: 'AK-47',
    type: 'rifle',
    price: 2700,
    description: 'Powerful and reliable assault rifle with high damage and challenging recoil pattern.',
    damage: 36,
    fireRate: 600,
    accuracy: 7,
    imageUrl: 'https://static.wikia.nocookie.net/cswikia/images/3/3e/Ak47_csgoa.png'
  },
  {
    id: 2,
    name: 'M4A4',
    type: 'rifle',
    price: 3100,
    description: 'Versatile CT assault rifle with balanced damage and superior rate of fire.',
    damage: 33,
    fireRate: 666,
    accuracy: 8,
    imageUrl: 'https://static.wikia.nocookie.net/cswikia/images/1/16/M4a4_hud_csgo.png'
  },
  // Add more weapons as needed
];

const mapData = [
  {
    id: 1,
    name: 'Dust II',
    description: 'The most iconic map in Counter-Strike history. Set in a Middle Eastern town, this classic bomb defusal map features long sightlines, crucial chokepoints, and endless strategic possibilities.',
    imageUrl: 'https://images.unsplash.com/photo-1624138125599-751531219264',
    sites: ['A', 'B', 'Mid']
  },
  {
    id: 2,
    name: 'Mirage',
    description: 'Set in Morocco, this classic map features a balanced layout with open mid area and multiple entry points to each bombsite.',
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-59450419c3a3'
  },
  // Add more maps as needed
];

const newsData = [
  {
    id: 1,
    title: 'Major Weapon Balancing Update',
    date: '2023-10-15',
    category: 'update',
    description: 'The latest update focuses on weapon balancing, with adjustments to the AK-47, M4A4, and AWP to create a more competitive environment.',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575'
  },
  {
    id: 2,
    title: 'World Championship Announced',
    date: '2023-10-10',
    category: 'tournament',
    description: 'The Counter-Strike World Championship will take place in Stockholm this December with a $2,000,000 prize pool for competing teams.',
    imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f'
  },
  // Add more news items as needed
];

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/weapons', (req, res) => {
    const category = req.query.category as string | undefined;
    
    if (category) {
      const filtered = weaponData.filter(weapon => weapon.type === category.toLowerCase());
      return res.json(filtered);
    }
    
    return res.json(weaponData);
  });
  
  app.get('/api/weapons/:id', (req, res) => {
    const weapon = weaponData.find(w => w.id === parseInt(req.params.id));
    
    if (!weapon) {
      return res.status(404).json({ message: 'Weapon not found' });
    }
    
    return res.json(weapon);
  });
  
  app.get('/api/maps', (req, res) => {
    return res.json(mapData);
  });
  
  app.get('/api/maps/:id', (req, res) => {
    const map = mapData.find(m => m.id === parseInt(req.params.id));
    
    if (!map) {
      return res.status(404).json({ message: 'Map not found' });
    }
    
    return res.json(map);
  });
  
  app.get('/api/news', (req, res) => {
    const category = req.query.category as string | undefined;
    
    if (category) {
      const filtered = newsData.filter(news => news.category === category.toLowerCase());
      return res.json(filtered);
    }
    
    return res.json(newsData);
  });
  
  app.get('/api/news/:id', (req, res) => {
    const newsItem = newsData.find(n => n.id === parseInt(req.params.id));
    
    if (!newsItem) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    return res.json(newsItem);
  });

  const httpServer = createServer(app);

  return httpServer;
}
