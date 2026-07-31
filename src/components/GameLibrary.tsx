import React, { useState } from 'react';
import { GameItem, GameStatus, GamePlatform } from '../types';
import { Search, Filter, Plus, Star, Clock, Trophy, CheckCircle2, Bookmark, Flame, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameLibraryProps {
  games: GameItem[];
  onOpenGameDetail: (game: GameItem) => void;
  onOpenAddGame: () => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({
  games,
  onOpenGameDetail,
  onOpenAddGame
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GameStatus | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<GamePlatform | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      game.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || game.status === selectedStatus;
    const matchesPlatform = selectedPlatform === 'all' || game.platform.includes(selectedPlatform as GamePlatform);

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getStatusBadge = (status: GameStatus) => {
    switch (status) {
      case 'platinum':
        return <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Trophy className="w-3 h-3" /> 白金完美全成就</span>;
      case 'completed':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 主線通關</span>;
      case 'playing':
        return <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Flame className="w-3 h-3 text-cyan-400 animate-pulse" /> 暢玩中</span>;
      case 'backlog':
        return <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Bookmark className="w-3 h-3" /> 待玩積壓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋遊戲名稱、標籤或類型 (例: Elden Ring, 武俠, 白金)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={onOpenAddGame}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> 新增遊戲紀錄
            </button>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
          {/* Status filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> 狀態：
            </span>
            {[
              { id: 'all', label: '全部' },
              { id: 'playing', label: '🔥 暢玩中' },
              { id: 'platinum', label: '🏆 白金完美' },
              { id: 'completed', label: '✅ 通關' },
              { id: 'backlog', label: '📌 待玩' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id as GameStatus | 'all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedStatus === st.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Platform filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold mr-1">平台：</span>
            {['all', 'PC', 'PS5', 'Switch', 'Xbox'].map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat as GamePlatform | 'all')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  selectedPlatform === plat
                    ? 'bg-purple-500 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {plat === 'all' ? '全部' : plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Cards Grid / List */}
      {filteredGames.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-base mb-3">沒有找到符合搜尋條件的遊戲紀錄。</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedPlatform('all');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-xs font-bold cursor-pointer"
          >
            清除篩選條件
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onOpenGameDetail(game)}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 relative overflow-hidden">
                    <img
                      src={game.coverUrl}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">{getStatusBadge(game.status)}</div>

                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 font-black text-xs font-mono flex items-center gap-1 shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div className="flex flex-wrap gap-1">
                        {game.platform.map((p) => (
                          <span key={p} className="bg-slate-950/90 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono border border-slate-800">
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="text-slate-300 text-xs font-mono bg-slate-950/80 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {game.playtimeHours}h
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                      {game.reviewText}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/60 mt-3">
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {game.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-300/80 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onOpenGameDetail(game)}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={game.coverUrl} alt={game.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">{game.title}</h3>
                    {getStatusBadge(game.status)}
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-1">{game.reviewText}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end text-xs font-mono">
                <div className="text-amber-400 font-bold flex items-center gap-1">★ {game.rating}</div>
                <div className="text-cyan-400">{game.playtimeHours} 小時</div>
                <div className="text-slate-400">{game.platform.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
