import { GameItem, TrophyItem, GamerProfile } from '../types';

export const initialProfile: GamerProfile = {
  gamerTag: 'PixelVanguard',
  realName: 'Alex Liu',
  avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
  title: 'Hardcore Trophy Hunter & RPG Enthusiast',
  level: 48,
  exp: 3420,
  maxExp: 5000,
  status: '🎮 正在暢玩《Monster Hunter Wilds》中...',
  bio: '熱愛開放世界 RPG、魂系遊戲與高難度挑戰！遊戲是生活的一部分，記錄每一份通關與白金的感動。',
  location: 'Taiwan, Taipei',
  steamId: '76561198987654321',
  discordTag: 'PixelVanguard#8888',
  githubUser: 'garyliu',
  setupSpecs: {
    cpu: 'Intel Core i9-14900K',
    gpu: 'NVIDIA GeForce RTX 4090 24GB',
    ram: '64GB DDR5 6000MHz',
    monitor: 'ROG Swift OLED 34" 240Hz',
    mouse: 'Logitech G Pro X Superlight 2',
    keyboard: 'Custom Mechanical 75% HMX Switches'
  },
  favoriteGenres: ['Action RPG', 'Souls-like', 'Open World', 'Co-op Shooter', 'Retro Pixel']
};

export const initialGames: GameItem[] = [
  {
    id: 'game-1',
    title: 'Elden Ring: Shadow of the Erdtree',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    genre: ['Souls-like', 'Action RPG', 'Open World'],
    platform: ['PC', 'PS5'],
    rating: 10,
    playtimeHours: 245,
    status: 'platinum',
    reviewText: '神作無庸置疑！黃金樹幽影 DLC 再次拉高了開放世界與 Boss 設計的頂峰。約束之王拉塔恩挑戰了整整 8 小時才完美通關！',
    favoriteMoments: '單挑梅瑟莫最後一擊極限閃避完美斬殺！',
    completedDate: '2024-07-15',
    tags: ['難度極高', '年度最佳candidate', '神作', '全成就'],
    isFavorite: true
  },
  {
    id: 'game-2',
    title: 'Black Myth: Wukong (黑神話：悟空)',
    coverUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    genre: ['Action', 'Souls-like', 'Mythology'],
    platform: ['PC', 'PS5'],
    rating: 9.8,
    playtimeHours: 98,
    status: 'platinum',
    reviewText: '視覺效果震撼，西遊記神話氛圍營造滿分！打鬥打擊感極強，二郎神與大聖殘軀的戰鬥史詩感滿載！',
    favoriteMoments: '大聖殘軀戰背景音樂響起那一刻直接起雞皮疙瘩！',
    completedDate: '2024-09-02',
    tags: ['西遊記', '美術絕佳', '棒法連段', '白金達成'],
    isFavorite: true
  },
  {
    id: 'game-3',
    title: 'Monster Hunter Wilds (魔物獵人 荒野)',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    genre: ['Action', 'Co-op', 'Hunting'],
    platform: ['PC', 'PS5', 'Xbox'],
    rating: 9.5,
    playtimeHours: 120,
    status: 'playing',
    reviewText: '動態氣候系統與生態系表現極其優異，太刀無縫集中模式斬擊流暢無比，與獵友組隊打怪極度過癮！',
    favoriteMoments: '在沙暴中極限反擊闢獸，集中模式開刃斬殺！',
    completedDate: '',
    tags: ['多人組隊', '太刀一筋', '刷寶冒險'],
    isFavorite: true
  },
  {
    id: 'game-4',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    genre: ['Adventure', 'Open World', 'Puzzle'],
    platform: ['Switch'],
    rating: 10,
    playtimeHours: 185,
    status: 'completed',
    reviewText: '究極手與餘料建造將遊戲自由度提升到前所未有的層次。在地底與天空的探索樂趣無窮！',
    favoriteMoments: '自己打造了雙輪高達機器人清掃怪物營地！',
    completedDate: '2023-06-20',
    tags: ['物理引擎神作', '自由建造', 'Nintendo'],
    isFavorite: true
  },
  {
    id: 'game-5',
    title: 'Cyberpunk 2077: Phantom Liberty',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    genre: ['Cyberpunk', 'RPG', 'FPS'],
    platform: ['PC'],
    rating: 9.5,
    playtimeHours: 140,
    status: 'completed',
    reviewText: '2.0 更新加上狗鎮 DLC 讓賽博朋克徹底涅槃重生！伊德瑞斯·艾爾巴飾演的所羅門·里德極具魅力。',
    favoriteMoments: '螳螂刀配砂威斯坦閃電戰，整條街敵人在一秒內全滅！',
    completedDate: '2023-11-10',
    tags: ['賽博朋克', '光線追蹤', '精彩劇情'],
    isFavorite: false
  },
  {
    id: 'game-6',
    title: 'Hades II',
    coverUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    genre: ['Rogue-lite', 'Action', 'Indie'],
    platform: ['PC', 'Steam Deck'],
    rating: 9.2,
    playtimeHours: 65,
    status: 'playing',
    reviewText: '墨利諾厄的巫術風格戰鬥與前作扎格柔斯截然不同，音樂與美術依然保持超級高水準！',
    favoriteMoments: '搭配阿波羅與波塞頓流派，發動滿畫面魔法連爆！',
    completedDate: '',
    tags: ['Rogue-like', '打擊感極佳', '打折必買'],
    isFavorite: false
  }
];

export const initialTrophies: TrophyItem[] = [
  {
    id: 'tr-1',
    title: '艾爾登之王 (Elden Lord)',
    gameTitle: 'Elden Ring',
    description: '達成所有 Steam / PS5 隱藏成就，獲得艾爾登法環白金獎盃！',
    iconName: 'Crown',
    unlockedAt: '2024-07-15',
    rarity: 'Platinum',
    badgeColor: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'tr-2',
    title: '天命人·六根具足',
    gameTitle: '黑神話：悟空',
    description: '擊敗二郎神與大聖殘軀，收集全部六根與全影神圖成就！',
    iconName: 'Flame',
    unlockedAt: '2024-09-02',
    rarity: 'Legendary',
    badgeColor: 'from-orange-500 to-red-600'
  },
  {
    id: 'tr-3',
    title: '夜城傳奇 (Legend of Night City)',
    gameTitle: 'Cyberpunk 2077',
    description: '完成夜城所有副業與 NCPD 委託，獲得最高聲望！',
    iconName: 'Zap',
    unlockedAt: '2023-11-10',
    rarity: 'Epic',
    badgeColor: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'tr-4',
    title: '海拉魯大地救世主',
    gameTitle: 'Zelda: Tears of the Kingdom',
    description: '解開全 152 個神廟與四大神殿挑戰！',
    iconName: 'Shield',
    unlockedAt: '2023-06-20',
    rarity: 'Legendary',
    badgeColor: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'tr-5',
    title: '極速反應神者',
    gameTitle: 'Cyber Reflex Test',
    description: '在網頁反應測試中達到 175ms 以下的電競選手級反應速度！',
    iconName: 'Target',
    unlockedAt: '2026-07-31',
    rarity: 'Epic',
    badgeColor: 'from-purple-400 to-fuchsia-600'
  }
];
