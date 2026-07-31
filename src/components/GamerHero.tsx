import React, { useState } from 'react';
import { GameItem, GamerProfile, TrophyItem } from '../types';
import { Trophy, Clock, Gamepad2, Cpu, Monitor, HardDrive, Sparkles, Flame, Star, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface GamerHeroProps {
  profile: GamerProfile;
  games: GameItem[];
  trophies: TrophyItem[];
  onOpenGameDetail: (game: GameItem) => void;
  onOpenEditProfile: () => void;
}

export const GamerHero: React.FC<GamerHeroProps> = ({
  profile,
  games,
  trophies,
  onOpenGameDetail,
  onOpenEditProfile
}) => {
  const [showSpecs, setShowSpecs] = useState(false);

  const totalPlaytime = games.reduce((sum, g) => sum + g.playtimeHours, 0);
  const platinumCount = games.filter((g) => g.status === 'platinum').length;
  const completedCount = games.filter((g) => g.status === 'completed' || g.status === 'platinum').length;
  const favoriteGames = games.filter((g) => g.isFavorite);

  return (
    <div className="space-y-6">
      {/* Hero Card with Custom Gamer Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Banner Image Overlay */}
        <div className="h-48 sm:h-64 relative overflow-hidden">
          <img
            src={profile.bannerUrl}
            alt="Gamer Banner"
            className="w-full h-full object-cover object-center filter brightness-75 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Setup Specs Floating Badge */}
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="absolute top-4 right-4 px-3.5 py-2 bg-slate-950/80 hover:bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-cyan-400" /> PC 電競配備清單
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <div className="relative group shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.gamerTag}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-slate-950 shadow-2xl bg-slate-900"
                />
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-950" />
              </div>

              <div className="mb-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {profile.gamerTag}
                  </h1>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-lg uppercase shadow-lg">
                    {profile.title}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1 flex items-center gap-3">
                  <span>{profile.realName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {profile.location}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex gap-3">
              <button
                onClick={onOpenEditProfile}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                編輯名片
              </button>
            </div>
          </div>

          {/* Bio & EXP Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">{profile.bio}</p>
              
              {/* Level & EXP Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> 等級經驗值 Level {profile.level}
                  </span>
                  <span className="text-cyan-400 font-mono">
                    {profile.exp} / {profile.maxExp} EXP ({Math.round((profile.exp / profile.maxExp) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (profile.exp / profile.maxExp) * 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Gaming Platforms Badges */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">常用遊戲平台</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['PC / Steam', 'PS5', 'Nintendo Switch', 'Xbox Series X', 'Steam Deck'].map((platform) => (
                  <span
                    key={platform}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PC Specs Modal */}
      {showSpecs && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl relative">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> 電競主機與週邊裝備規格 (Gaming Setup Specs)
            </h3>
            <button onClick={() => setShowSpecs(false)} className="text-slate-400 hover:text-white text-sm font-mono cursor-pointer">
              ✕ 關閉
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">中央處理器 CPU</span>
              <span className="text-slate-200 font-semibold text-sm">{profile.setupSpecs.cpu}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">顯示卡 GPU</span>
              <span className="text-cyan-400 font-semibold text-sm">{profile.setupSpecs.gpu}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">記憶體 RAM</span>
              <span className="text-slate-200 font-semibold text-sm">{profile.setupSpecs.ram}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">電競螢幕 Monitor</span>
              <span className="text-slate-200 font-semibold text-sm">{profile.setupSpecs.monitor}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">電競滑鼠 Mouse</span>
              <span className="text-slate-200 font-semibold text-sm">{profile.setupSpecs.mouse}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono block">機械鍵盤 Keyboard</span>
              <span className="text-slate-200 font-semibold text-sm">{profile.setupSpecs.keyboard}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>總遊玩時數</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono mt-1">{totalPlaytime} <span className="text-xs text-slate-500 font-sans">小時</span></div>
          <p className="text-[11px] text-slate-500 mt-1">紀錄涵蓋各平台冒險</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>白金極致成就</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono mt-1">{platinumCount} <span className="text-xs text-slate-500 font-sans">個白金</span></div>
          <p className="text-[11px] text-slate-500 mt-1">100% 全解完美獎盃</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>通關遊戲數量</span>
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-1">{completedCount} <span className="text-xs text-slate-500 font-sans">款遊戲</span></div>
          <p className="text-[11px] text-slate-500 mt-1">包含主線通關與 DLC</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-fuchsia-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>解鎖榮譽神殿</span>
            <Flame className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="text-3xl font-black text-fuchsia-400 font-mono mt-1">{trophies.length} <span className="text-xs text-slate-500 font-sans">特級成就</span></div>
          <p className="text-[11px] text-slate-500 mt-1">高難度 Boss 與隱藏勳章</p>
        </div>
      </div>

      {/* Featured Hall of Fame (Top Games) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> 最愛遊戲殿堂 (Hall of Fame)
          </h2>
          <span className="text-xs text-slate-400">精選個人評分 9.5+ 滿分殿堂級神作</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {favoriteGames.slice(0, 3).map((game) => (
            <div
              key={game.id}
              onClick={() => onOpenGameDetail(game)}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 font-black text-xs font-mono">
                  ★ {game.rating} / 10
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {game.platform.map((p) => (
                    <span key={p} className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono border border-slate-700">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-white font-bold text-base truncate group-hover:text-cyan-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {game.reviewText}
                </p>
                <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-900">
                  <span>遊玩時數：{game.playtimeHours} 小時</span>
                  <span className="text-cyan-400 font-medium">查看完整心得 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
