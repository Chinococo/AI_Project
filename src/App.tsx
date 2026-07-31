import React, { useState } from 'react';
import { Header } from './components/Header';
import { AiLearningSection, SectionTab } from './components/AiLearningSection';
import { Brain, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionTab>('history');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Application Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AiLearningSection currentTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span>AI & Machine Learning Interactive Learning Platform</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>包含了 AI歷史 · 線性回歸 · CNN · YOLO · 隨機森林 互動視覺化教學組件</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
