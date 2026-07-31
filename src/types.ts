export type GameStatus = 'playing' | 'completed' | 'platinum' | 'backlog' | 'wishlist';

export type GamePlatform = 'PC' | 'PS5' | 'Switch' | 'Xbox' | 'Steam Deck';

export interface GameItem {
  id: string;
  title: string;
  coverUrl: string;
  genre: string[];
  platform: GamePlatform[];
  rating: number; // 1-10
  playtimeHours: number;
  status: GameStatus;
  reviewText: string;
  favoriteMoments?: string;
  completedDate?: string;
  tags: string[];
  isFavorite?: boolean;
}

export interface TrophyItem {
  id: string;
  title: string;
  gameTitle: string;
  description: string;
  iconName: string;
  unlockedAt: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Platinum';
  badgeColor: string;
}

export interface GamerProfile {
  gamerTag: string;
  realName: string;
  avatarUrl: string;
  bannerUrl: string;
  title: string;
  level: number;
  exp: number;
  maxExp: number;
  status: string;
  bio: string;
  location: string;
  steamId: string;
  discordTag: string;
  githubUser: string;
  setupSpecs: {
    cpu: string;
    gpu: string;
    ram: string;
    monitor: string;
    mouse: string;
    keyboard: string;
  };
  favoriteGenres: string[];
}

export interface HighScoreRecord {
  playerName: string;
  score: number;
  date: string;
  gameType: 'boss-dodge' | 'reflex';
}
