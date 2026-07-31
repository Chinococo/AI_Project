import React, { useState } from 'react';
import { GameItem, GamePlatform, GameStatus } from '../types';
import { Gamepad2, X, Star, Clock, Image as ImageIcon } from 'lucide-react';

interface AddGameModalProps {
  onClose: () => void;
  onAddGame: (game: GameItem) => void;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({ onClose, onAddGame }) => {
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [rating, setRating] = useState(9.0);
  const [playtimeHours, setPlaytimeHours] = useState(25);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [platforms, setPlatforms] = useState<GamePlatform[]>(['PC']);
  const [genres, setGenres] = useState('Action RPG, Open World');
  const [reviewText, setReviewText] = useState('');
  const [tags, setTags] = useState('熱門神作, 推薦');

  const defaultCovers = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newGame: GameItem = {
      id: `game-${Date.now()}`,
      title,
      coverUrl: coverUrl || defaultCovers[Math.floor(Math.random() * defaultCovers.length)],
      genre: genres.split(',').map((g) => g.trim()),
      platform: platforms,
      rating: Number(rating),
      playtimeHours: Number(playtimeHours),
      status,
      reviewText: reviewText || '這是一款非常出色的遊戲作品！',
      tags: tags.split(',').map((t) => t.trim()),
      isFavorite: rating >= 9.5
    };

    onAddGame(newGame);
    onClose();
  };

  const togglePlatform = (p: GamePlatform) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) setPlatforms(platforms.filter((item) => item !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" /> 新增遊戲通關紀錄 / 心得
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-medium block mb-1">遊戲名稱 *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：Elden Ring / 黑神話：悟空 / 太鼓之達人"
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-medium block mb-1">個人評分 (1-10分)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">總累積遊玩時數</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={playtimeHours}
                  onChange={(e) => setPlaytimeHours(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">通關狀態</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'playing', label: '🔥 暢玩中' },
                { id: 'platinum', label: '🏆 白金完美' },
                { id: 'completed', label: '✅ 主線通關' },
                { id: 'backlog', label: '📌 待玩清單' }
              ].map((st) => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setStatus(st.id as GameStatus)}
                  className={`p-2 rounded-xl text-center font-bold border cursor-pointer ${
                    status === st.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">遊玩平台</label>
            <div className="flex flex-wrap gap-2">
              {(['PC', 'PS5', 'Switch', 'Xbox', 'Steam Deck'] as GamePlatform[]).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border ${
                    platforms.includes(p)
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">封面圖片 URL (可選)</label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="留空將自動使用預設極致遊戲圖片..."
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs"
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">遊玩心得與評論</label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="分享這款遊戲最吸引你的地方或難忘的戰鬥 لحظ..."
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg cursor-pointer"
            >
              確認儲存紀錄
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
