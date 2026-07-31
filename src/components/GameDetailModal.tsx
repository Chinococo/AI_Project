import React from 'react';
import { GameItem } from '../types';
import { X, Star, Clock, Trophy, Heart, Trash2, Calendar, Share2, Sparkles } from 'lucide-react';

interface GameDetailModalProps {
  game: GameItem;
  onClose: () => void;
  onDeleteGame: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onDeleteGame,
  onToggleFavorite
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Top Banner Cover */}
        <div className="h-64 sm:h-72 relative">
          <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close & Favorite buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onToggleFavorite(game.id)}
              className="p-2.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-700/80 rounded-xl text-amber-400 backdrop-blur-md cursor-pointer transition-all"
            >
              <Heart className={`w-5 h-5 ${game.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-700/80 rounded-xl text-white backdrop-blur-md cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <div className="flex gap-2 mb-2">
                {game.platform.map((p) => (
                  <span key={p} className="bg-slate-950/90 text-cyan-400 font-mono text-xs px-2.5 py-0.5 rounded-lg border border-slate-800">
                    {p}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{game.title}</h2>
            </div>

            <div className="bg-slate-950/90 border border-amber-500/40 px-3 py-1.5 rounded-xl text-amber-400 font-black text-sm flex items-center gap-1.5 shadow-lg">
              <Star className="w-4 h-4 fill-amber-400" /> {game.rating} / 10
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400" /> 累積遊玩：
              <span className="font-mono font-bold text-white text-sm">{game.playtimeHours} 小時</span>
            </div>

            {game.completedDate && (
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-emerald-400" /> 通關日期：
                <span className="font-mono font-bold text-white text-sm">{game.completedDate}</span>
              </div>
            )}

            <div className="flex gap-1.5">
              {game.tags.map((t) => (
                <span key={t} className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> 遊戲實測評分與心得 (Review & Impressions)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {game.reviewText}
            </p>
          </div>

          {game.favoriteMoments && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Trophy className="w-4 h-4" /> 名場面 / 難忘高光時刻 (Highlight Moments)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
                {game.favoriteMoments}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onDeleteGame(game.id);
                onClose();
              }}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl border border-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> 刪除此紀錄
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              關閉視窗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
