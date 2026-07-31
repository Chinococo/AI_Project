import React from 'react';
import { Brain, History, TrendingUp, Image as ImageIcon, Scan, Trees, Sparkles } from 'lucide-react';
import { SectionTab } from './AiLearningSection';

interface HeaderProps {
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: SectionTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'history', label: 'AI 發展歷史', icon: History },
    { id: 'linear', label: 'ML 線性回歸', icon: TrendingUp },
    { id: 'cnn', label: 'ML CNN 影像分類', icon: ImageIcon },
    { id: 'yolo', label: 'ML YOLO 即時偵測', icon: Scan },
    { id: 'forest', label: '隨機森林集成', icon: Trees },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 transition-all shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Platform Name */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('history')}
          >
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 via-cyan-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-slate-950 font-bold" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
                  AI & ML 探索與實作平台
                </span>
                <span className="bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Interactive Suite
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                涵蓋 AI 歷史演進、線性回歸預測、CNN、YOLO 物件與動漫辨識、隨機森林
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex overflow-x-auto gap-2 py-2 border-t border-slate-900 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
