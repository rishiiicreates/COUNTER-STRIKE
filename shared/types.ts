// Custom types for the application

// Type for weapon categories
export type WeaponCategory = 'RIFLES' | 'PISTOLS' | 'SNIPERS' | 'SMGS' | 'HEAVY' | 'GRENADES' | 'GEAR';

// Type for weapon stats
export interface WeaponStat {
  value: number | string;
  percentage: number;
}

// Type for weapon details
export interface WeaponDetails {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  stats: {
    damage: WeaponStat;
    fireRate: WeaponStat;
    accuracy: WeaponStat;
    [key: string]: WeaponStat;
  };
  category?: WeaponCategory;
}

// Type for map details
export interface MapDetails {
  id: number;
  name: string;
  description?: string;
  image: string;
  sites?: string[];
  difficulty?: number;
  ctSided?: boolean;
  tSided?: boolean;
}

// Type for news categories
export type NewsCategory = 'UPDATE' | 'TOURNAMENT' | 'NEW CONTENT' | 'PATCH NOTES' | 'COMMUNITY';

// Type for news article
export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: {
    name: string;
    color: string;
  };
  content?: string;
}

// Type for player stats
export interface PlayerStats {
  overview: {
    kdRatio: string;
    winRate: string;
    avgKills: string;
    headshotPercentage: string;
  };
  weaponStats: Array<{
    name: string;
    value: string;
    percentage: number;
  }>;
  rank: {
    name: string;
    image: string;
    percentile: string;
    nextRankProgress: string;
    matchesWon: string;
    totalMatches: string;
    competitiveWins: string;
    mvpStars: string;
  };
}

// Type for video data
export interface VideoData {
  id: number;
  title?: string;
  thumbnail: string;
  duration?: string;
  views?: number;
}
