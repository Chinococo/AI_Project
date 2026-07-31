import React, { useState } from 'react';
import { TrophyItem } from '../types';
import { Trophy, Crown, Flame, Zap, Shield, Target, Award, Plus, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TrophyWallProps {
  trophies: TrophyItem[];
  onAddTrophy: (trophy: TrophyItem) => void;
}

export const TrophyWall: React.FC<TrophyWallProps> = ({ trophies, onAddTrophy }) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rarity, setRarity] = useState<'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Platinum'>('Platinum');

  const filteredTrophies = trophies.filter(
    (t) => selectedRarity === 'all' || t.rarity.toLowerCase() === selectedRarity.toLowerCase()
  );

  const getTrophyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-7 h-7 text-amber-300" />;
      case 'Flame':
        return <Flame className="w-7 h-7 text-orange-400" />;
      case 'Zap':
        return <Zap className="w-7 h-7 text-cyan-400" />;
      case 'Shield':
        return <Shield className="w-7 h-7 text-emerald-400" />;
      case 'Target':
        return <Target className="w-7 h-7 text-purple-400" />;
      default:
        return <Trophy className="w-7 h-7 text-yellow-400" />;
    }
  };

  const handleCreateTrophy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !gameTitle) return;

    let badgeColor = 'from-amber-400 to-yellow-600';
    if (rarity === 'Legendary') badgeColor = 'from-orange-500 to-red-600';
    if (rarity === 'Epic') badgeColor = 'from-purple-500 to-fuchsia-600';
    if (rarity === 'Rare') badgeColor = 'from-cyan-400 to-blue-600';

    const newTrophy: TrophyItem = {
      id: `tr-${Date.now()}`,
      title,
      gameTitle,
      description,
      iconName: 'Crown',
      unlockedAt: new Date().toISOString().split('T')[0],
      rarity,
      badgeColor
    };

    onAddTrophy(newTrophy);
    setShowAddModal(false);
    setTitle('');
    setGameTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" /> 榮譽白金成就神殿 (Hall of Trophies)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            記錄高難度 Boss 斬殺、全成就白金獎盃與極限挑戰里程碑！
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> 新增專屬榮譽成就
        </button>
      </div>

      {/* Rarity Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {['all', 'Platinum', 'Legendary', 'Epic', 'Rare', 'Common'].map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRarity(r)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedRarity === r
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {r === 'all' ? '全部獎盃' : `${r} 階級`}
          </button>
        ))}
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrophies.map((tr) => (
          <motion.div
            key={tr.id}
            whileHover={{ y: -4 }}
            className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl shadow-xl relative overflow-hidden group transition-all"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tr.badgeColor} p-0.5 shadow-lg shrink-0 flex items-center justify-center`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  {getTrophyIcon(tr.iconName)}
                </div>
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                    {tr.rarity}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{tr.unlockedAt}</span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug">{tr.title}</h3>
                <div className="text-cyan-400 text-xs font-medium">{tr.gameTitle}</div>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{tr.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Trophy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> 新增榮譽白金成就
            </h3>

            <form onSubmit={handleCreateTrophy} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">成就名稱 *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例：艾爾登之王 (Elden Lord)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">對應遊戲名稱 *</label>
                <input
                  type="text"
                  required
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  placeholder="例：Elden Ring"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">稀有度評級</label>
                <select
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value as 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Platinum')}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Platinum">Platinum (白金神級)</option>
                  <option value="Legendary">Legendary (傳奇)</option>
                  <option value="Epic">Epic (史詩)</option>
                  <option value="Rare">Rare (稀有)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">成就解鎖說明 / 冒險回憶</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="紀錄當時挑戰的心情或達成條件..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 cursor-pointer"
                >
                  確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
