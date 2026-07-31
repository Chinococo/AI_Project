import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  History,
  TrendingUp,
  Image as ImageIcon,
  Scan,
  Trees,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Eye,
  Car,
  Tv,
  Cpu,
  Layers,
  ArrowRight,
  BarChart3,
  Check,
  Search,
  Zap,
  HelpCircle,
  Lightbulb,
  Award
} from 'lucide-react';

export type SectionTab = 'history' | 'linear' | 'cnn' | 'yolo' | 'forest';

interface AiLearningSectionProps {
  currentTab?: SectionTab;
  onTabChange?: (tab: SectionTab) => void;
}

export const AiLearningSection: React.FC<AiLearningSectionProps> = ({
  currentTab,
  onTabChange
}) => {
  const [internalTab, setInternalTab] = useState<SectionTab>('history');
  const activeSubTab = currentTab || internalTab;

  const setActiveSubTab = (tab: SectionTab) => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  // --- 1. History State ---
  const [historySearch, setHistorySearch] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const historyEvents = [
    {
      era: '1950s - 1970s',
      eraCode: '1950s',
      title: 'AI 誕生與符號邏輯 (Symbolic AI)',
      subtitle: '圖靈測試與規則系統的開端',
      desc: '阿蘭·圖靈於 1950 年提出著名的「圖靈測試 (Turing Test)」。1956 年達特茅斯會議正式誕生「Artificial Intelligence」名稱。早期發展以邏輯推演與符號規則 (Rule-based Systems) 為核心。',
      highlight: '里程碑：ELIZA 對話軟體、深藍 Chess 早期理論',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      keyTech: ['圖靈測試', '符號邏輯', 'LISP 語言', 'ELIZA'],
    },
    {
      era: '1980s - 1990s',
      eraCode: '1980s',
      title: '專家系統與神經網路復甦',
      desc: '「專家系統 (Expert Systems)」進入商業化應用。BP 反向傳播演算法 (Backpropagation) 解決了多層感知機訓練難題，統計機器學習與決策樹 (Decision Tree) 開始萌芽。',
      highlight: '里程碑：1997 年 IBM Deep Blue 擊敗世界西洋棋冠軍 Kasparov',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      keyTech: ['BP 反向傳播', '專家系統', '決策樹', 'SVM 支援向量機'],
    },
    {
      era: '2000s - 2011',
      eraCode: '2000s',
      title: '大數據與統計機器學習 (Machine Learning)',
      desc: '網際網路普及帶來海量數據，統計機器學習 (Machine Learning) 大行其道。隨機森林 (Random Forest) 與 Boosting 演算法廣泛應用於垃圾郵件過濾、搜尋引擎與推薦系統。',
      highlight: '里程碑：Netflix Prize 演算法大賽、語音辨識顯著突破',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      keyTech: ['隨機森林', 'XGBoost', '推薦系統', '網頁爬蟲與大數據'],
    },
    {
      era: '2012 - 2016',
      eraCode: '2010s',
      title: '深度學習爆發 (Deep Learning & CNNs)',
      desc: '2012 年 AlexNet 在 ImageNet 大賽中以 CNN 卷積神經網路擊敗傳統演算法，錯誤率驟降 10%。GPU 並行計算與深度神經網路正式開啟 AI 革命。',
      highlight: '里程碑：2016 年 DeepMind AlphaGo 擊敗圍棋世界冠軍李世乭',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      keyTech: ['AlexNet', 'CNN 卷積網路', 'AlphaGo', 'ResNet', 'GPU CUDA'],
    },
    {
      era: '2017 - 2021',
      eraCode: '2017s',
      title: 'Transformer 架構與預訓練模型',
      desc: 'Google 發表歷史性論文《Attention Is All You Need》，提出了 Transformer 架構與 Self-Attention 自注意力機制，全面取代 RNN，引爆 BERT 與 GPT 系列模型。',
      highlight: '里程碑：Self-Attention 自注意力、自監督學習 (Self-Supervised)',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      keyTech: ['Transformer', 'BERT', 'GPT-2/3', 'Self-Attention'],
    },
    {
      era: '2022 - Present',
      eraCode: '2020s',
      title: '生成式 AI 與多模態大模型 (GenAI & Agent)',
      desc: 'ChatGPT 與 Diffusion 模型開啟生成式 AI (GenAI) 全球浪潮。多模態大模型能同時處理文字、影像、聲音與程式碼，自主 Agent 工作流 (Agentic Workflows) 成為新典範。',
      highlight: '里程碑：Gemini, GPT-4o, Claude 3.5, Sora, Autonomous Agents',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      keyTech: ['Multimodal LLM', 'Diffusion Models', 'AI Agent', 'Gemini'],
    },
  ];

  const filteredHistory = historyEvents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.keyTech.some((t) => t.toLowerCase().includes(historySearch.toLowerCase()));
    const matchesEra = selectedEra === 'all' || item.eraCode === selectedEra;
    return matchesSearch && matchesEra;
  });

  // --- 2. Linear Regression State ---
  const [slope, setSlope] = useState<number>(1.8);
  const [intercept, setIntercept] = useState<number>(15);
  const [inputX, setInputX] = useState<number>(10);

  const samplePoints = [
    { x: 2, y: 18 },
    { x: 4, y: 22 },
    { x: 6, y: 28 },
    { x: 8, y: 31 },
    { x: 10, y: 35 },
    { x: 12, y: 38 },
    { x: 15, y: 44 },
    { x: 18, y: 48 },
  ];

  const mse = Math.round(
    samplePoints.reduce((acc, p) => {
      const pred = slope * p.x + intercept;
      return acc + Math.pow(pred - p.y, 2);
    }, 0) / samplePoints.length
  );

  // --- 3. CNN Kernel State ---
  const [selectedKernel, setSelectedKernel] = useState<'edge' | 'blur' | 'sharpen'>('edge');
  const [cnnStep, setCnnStep] = useState<number>(1);

  // --- 4. YOLO State ---
  const [yoloMode, setYoloMode] = useState<'car' | 'anime'>('car');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(60);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  // --- 5. Random Forest State ---
  const [genre, setGenre] = useState<'RPG' | 'FPS' | 'Strategy'>('RPG');
  const [price, setPrice] = useState<number>(49);
  const [rating, setRating] = useState<number>(88);

  const getTreeVotes = () => {
    const t1 = genre === 'RPG' && rating > 70 ? 'Like' : 'Dislike';
    const t2 = price < 60 && rating > 80 ? 'Like' : 'Dislike';
    const t3 = rating >= 85 ? 'Like' : 'Dislike';
    const t4 = genre !== 'FPS' || price < 30 ? 'Like' : 'Dislike';
    const t5 = rating > 75 && price < 70 ? 'Like' : 'Dislike';

    const votes = [
      { treeId: 1, name: 'Tree #1 (類型&好評)', vote: t1, focus: '偏好 RPG & 好評>70%' },
      { treeId: 2, name: 'Tree #2 (價格&好評)', vote: t2, focus: '價格<$60 & 好評>80%' },
      { treeId: 3, name: 'Tree #3 (品質導向)', vote: t3, focus: '極致品質 好評>=85%' },
      { treeId: 4, name: 'Tree #4 (類型價格選配)', vote: t4, focus: '非FPS或平價<$30' },
      { treeId: 5, name: 'Tree #5 (CP值綜合考量)', vote: t5, focus: '好評>75% 且 售價<$70' },
    ];

    const likes = votes.filter((v) => v.vote === 'Like').length;
    const dislikes = votes.filter((v) => v.vote === 'Dislike').length;

    return {
      votes,
      likes,
      dislikes,
      result: likes >= 3 ? '推薦購入 (Recommended)' : '觀望不推薦 (Not Recommended)',
      percentage: Math.round((likes / 5) * 100),
    };
  };

  const forestResult = getTreeVotes();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI & ML 核心觀念互動探索庫</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              人工智慧發展史與 <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">機器學習核心演算法</span> 實作解析
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              涵蓋 AI 發展里程碑、線性回歸數據預測、CNN 影像特徵卷積分類、YOLO 即時物件與動漫偵測、隨機森林多樹集成決策模擬。
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shrink-0 shadow-lg">
            <div className="p-3 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 rounded-xl text-cyan-300 border border-indigo-500/40">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs text-slate-400">核心探索單元</div>
              <div className="text-lg font-bold text-white">5 大主題互動組件</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex overflow-x-auto gap-2.5 scrollbar-none">
          {[
            { id: 'history', label: '1. AI 發展歷史', icon: History, color: 'from-blue-500 to-cyan-500' },
            { id: 'linear', label: '2. ML 線性回歸 (未來預測)', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
            { id: 'cnn', label: '3. ML CNN 影像分類', icon: ImageIcon, color: 'from-purple-500 to-indigo-500' },
            { id: 'yolo', label: '4. ML YOLO 即時偵測', icon: Scan, color: 'from-amber-500 to-orange-500' },
            { id: 'forest', label: '5. 隨機森林集成決策', icon: Trees, color: 'from-green-500 to-emerald-600' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as SectionTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-indigo-500/25 scale-[1.03]`
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Tab Content */}
      <AnimatePresence mode="wait">
        {/* ==================== 1. AI HISTORY ==================== */}
        {activeSubTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">AI 發展歷史演進與時代里程碑 Timeline</h2>
                    <p className="text-xs text-slate-400">從 1950 年圖靈測試到生成式大模型 (GenAI) 的幾大革命性浪潮</p>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="搜尋演算法、里程碑..."
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-44"
                    />
                  </div>

                  <select
                    value={selectedEra}
                    onChange={(e) => setSelectedEra(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">全年代歷史 (1950 ~ 今)</option>
                    <option value="1950s">1950s - 1970s 符號邏輯</option>
                    <option value="1980s">1980s - 1990s 專家系統</option>
                    <option value="2000s">2000s - 2011 機器學習</option>
                    <option value="2010s">2012 - 2016 深度學習</option>
                    <option value="2017s">2017 - 2021 Transformer</option>
                    <option value="2020s">2022 - 今 生成式 AI</option>
                  </select>
                </div>
              </div>

              {/* Timeline Display */}
              <div className="relative border-l-2 border-indigo-500/30 ml-4 pl-6 space-y-8 my-4">
                {filteredHistory.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-400 group-hover:scale-125 transition-transform shadow-lg shadow-indigo-500/50" />

                    <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/60 transition-all shadow-md hover:shadow-indigo-500/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
                          {item.era}
                        </span>
                        <span className="text-xs text-indigo-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Key Landmark
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>

                      {/* Key Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keyTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-medium bg-slate-900 text-slate-300 px-2.5 py-0.5 rounded-lg border border-slate-800"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>

                      {/* Highlight Banner */}
                      <div className="inline-flex items-center gap-1.5 text-xs text-cyan-300 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredHistory.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    未找到符合條件的歷史事件，請嘗試重設搜尋或篩選條件。
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 2. LINEAR REGRESSION ==================== */}
        {activeSubTab === 'linear' && (
          <motion.div
            key="linear"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">ML 線性回歸 (Linear Regression) - 未來數據預測</h2>
                    <p className="text-xs text-slate-400">利用最佳擬合直線方程式 $y = w \cdot x + b$ 建模並預測連續數值未來走向</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono shadow-inner">
                  <span>模型公式: y = {slope.toFixed(1)}x + {intercept}</span>
                </div>
              </div>

              {/* Grid Layout: Visual SVG Chart + Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Scatter Plot & Regression Line */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 relative min-h-[340px] flex flex-col justify-between shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>y 軸: 預測表現 / 分數 (0 ~ 60)</span>
                    <span className="text-emerald-400 font-mono font-bold">MSE 均方誤差: {mse}</span>
                  </div>

                  {/* SVG Chart Area */}
                  <div className="relative w-full h-64 bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-20 border-slate-700">
                      {[...Array(25)].map((_, i) => (
                        <div key={i} className="border border-slate-600/40" />
                      ))}
                    </div>

                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                      {/* Fitted Line */}
                      <line
                        x1="0"
                        y1={100 - (slope * 0 + intercept)}
                        x2="20"
                        y2={100 - (slope * 20 + intercept)}
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />

                      {/* Scatter Sample Points */}
                      {samplePoints.map((p, idx) => {
                        const px = (p.x / 20) * 200;
                        const py = 100 - p.y;
                        const predY = 100 - (slope * p.x + intercept);
                        return (
                          <g key={idx} className="group cursor-pointer">
                            {/* Error Residual Line */}
                            <line
                              x1={px}
                              y1={py}
                              x2={px}
                              y2={predY}
                              stroke="#ef4444"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                              className="opacity-70 group-hover:opacity-100"
                            />
                            {/* Point */}
                            <circle
                              cx={px}
                              cy={py}
                              r="3.5"
                              fill="#06b6d4"
                              className="group-hover:r-5 transition-all shadow-md"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
                    <span>x 軸: 訓練時數/投入變數 (0 ~ 20 小時)</span>
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> 歷史樣本數據
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ml-2" /> 線性擬合回歸線
                    </span>
                  </div>
                </div>

                {/* Interactive Sliders & Future Predictor Tool */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" /> 調整權重與偏置 (Weights & Bias)
                    </h3>

                    {/* Slope Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">斜率 (Weight w):</span>
                        <span className="text-emerald-400 font-mono font-bold">{slope.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={slope}
                        onChange={(e) => setSlope(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">代表每增加一單位 x，預測值 y 的變動影響量。</p>
                    </div>

                    {/* Intercept Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">截距 (Bias b):</span>
                        <span className="text-emerald-400 font-mono font-bold">{intercept}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={intercept}
                        onChange={(e) => setIntercept(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">當輸入 x 為 0 時的基準起始值。</p>
                    </div>

                    <button
                      onClick={() => {
                        setSlope(1.8);
                        setIntercept(15);
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> 重設最佳最佳擬合參數
                    </button>
                  </div>

                  {/* Future Data Predictor Calculator */}
                  <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> 即時未夾未來資料預測器
                    </h3>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-300 block">輸入未夾未來輸入值 (x 小時/數量):</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={inputX}
                        onChange={(e) => setInputX(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between">
                      <span className="text-xs text-slate-300">模型推測結果 (y 預測值):</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {(slope * inputX + intercept).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 3. CNN IMAGE CLASSIFICATION ==================== */}
        {activeSubTab === 'cnn' && (
          <motion.div
            key="cnn"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">ML CNN 卷積神經網路 (Convolutional Neural Network)</h2>
                  <p className="text-xs text-slate-400">專為影像辨識設計，利用卷積層 (Convolution) 提取輪廓特徵、池化層 (Pooling) 降維壓縮並分類</p>
                </div>
              </div>

              {/* 4 Steps Interactive Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { step: 1, title: '1. 原始像素輸入', desc: '矩陣化 RGB 圖像像素矩陣' },
                  { step: 2, title: '2. 卷積層 (Conv Layer)', desc: 'Kernel 滑動提取特徵圖 (Feature Maps)' },
                  { step: 3, title: '3. 池化層 (Max Pooling)', desc: '保留關鍵特徵，降低神經元維度' },
                  { step: 4, title: '4. 全連接層 (FC Layer)', desc: 'Softmax 算出一各類別機率 (如: 車輛 94%)' },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setCnnStep(s.step)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      cnnStep === s.step
                        ? 'bg-indigo-950/90 border-indigo-500 text-white ring-2 ring-indigo-500/30 scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-indigo-400 mb-1">STAGE 0{s.step}</div>
                    <div className="text-sm font-bold text-white mb-1">{s.title}</div>
                    <div className="text-xs text-slate-400">{s.desc}</div>
                  </button>
                ))}
              </div>

              {/* Interactive Convolution Operator Simulator */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" /> 卷積核 (Convolution Kernel Matrix) 特徵提取範例
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">選擇濾鏡算子:</span>
                    {[
                      { id: 'edge', name: '邊緣檢測 (Edge Detect)' },
                      { id: 'sharpen', name: '細節銳化 (Sharpen)' },
                      { id: 'blur', name: '高斯模糊 (Blur)' },
                    ].map((k) => (
                      <button
                        key={k.id}
                        onClick={() => setSelectedKernel(k.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          selectedKernel === k.id
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {k.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Original Image */}
                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-3">
                    <div className="text-xs font-bold text-slate-300">1. 原始輸入圖片 (Input Image)</div>
                    <div className="w-40 h-40 mx-auto rounded-xl overflow-hidden border border-slate-700 relative bg-slate-950">
                      <img
                        src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80"
                        alt="Input Sample"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-slate-400">標準高解析 RGB 像素資料</p>
                  </div>

                  {/* Kernel Operator */}
                  <div className="bg-slate-900/90 border border-purple-500/40 p-4 rounded-2xl text-center space-y-3">
                    <div className="text-xs font-bold text-purple-300 flex items-center justify-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-400" /> 2. 3x3 卷積核 (Kernel Operator)
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 w-36 mx-auto font-mono text-xs">
                      {selectedKernel === 'edge' &&
                        [-1, -1, -1, -1, 8, -1, -1, -1, -1].map((val, idx) => (
                          <div key={idx} className="p-2 bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold rounded-lg">
                            {val}
                          </div>
                        ))}
                      {selectedKernel === 'sharpen' &&
                        [0, -1, 0, -1, 5, -1, 0, -1, 0].map((val, idx) => (
                          <div key={idx} className="p-2 bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 font-bold rounded-lg">
                            {val}
                          </div>
                        ))}
                      {selectedKernel === 'blur' &&
                        [1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, idx) => (
                          <div key={idx} className="p-2 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-lg">
                            {val}
                          </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-slate-400">卷積核於圖像畫面上逐點矩陣相乘點積</p>
                  </div>

                  {/* Output Feature Map */}
                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-3">
                    <div className="text-xs font-bold text-emerald-400">3. 輸出特徵圖 (Feature Map)</div>
                    <div className="w-40 h-40 mx-auto rounded-xl overflow-hidden border border-slate-700 relative bg-slate-950 p-2 flex items-center justify-center">
                      <div className={`w-full h-full rounded-lg transition-all overflow-hidden ${
                        selectedKernel === 'edge'
                          ? 'grayscale contrast-200 invert'
                          : selectedKernel === 'sharpen'
                          ? 'contrast-200 saturate-150'
                          : 'blur-xs opacity-75'
                      }`}>
                        <img
                          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80"
                          alt="Processed Sample"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-xs text-emerald-300 font-medium">
                      {selectedKernel === 'edge' && '凸顯車身、線條與物體邊界輪廓'}
                      {selectedKernel === 'sharpen' && '強化影像對比細節與關鍵邊緣'}
                      {selectedKernel === 'blur' && '平滑化雜訊，保留大範圍結構特徵'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 4. YOLO OBJECT DETECTION ==================== */}
        {activeSubTab === 'yolo' && (
          <motion.div
            key="yolo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">ML YOLO (You Only Look Once) 即時物件偵測</h2>
                    <p className="text-xs text-slate-400">單次前向傳播即可同時預測標記框 (Bounding Box) 座標與類別信心分度</p>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => setYoloMode('car')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      yoloMode === 'car'
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-4 h-4" /> 🚗 車子位置與交通偵測
                  </button>
                  <button
                    onClick={() => setYoloMode('anime')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      yoloMode === 'anime'
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tv className="w-4 h-4" /> 🎨 分類動漫圖片與角色
                  </button>
                </div>
              </div>

              {/* Confidence Slider Control */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-slate-300 font-semibold whitespace-nowrap">置信度過濾門檻 (Confidence Threshold):</span>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                    className="w-48 accent-amber-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                  <span className="text-amber-400 font-mono font-bold text-xs">{confidenceThreshold}%</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-mono border border-emerald-500/30">
                    Inference: 11.2ms
                  </span>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg font-mono border border-amber-500/30">
                    FPS: 89.2
                  </span>
                </div>
              </div>

              {/* YOLO Real-time Image Stage */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 aspect-video max-h-[440px] mx-auto shadow-2xl">
                <img
                  src={
                    yoloMode === 'car'
                      ? 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80'
                  }
                  alt="YOLO Target"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* YOLO Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20 border border-amber-500/40">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border border-amber-400/30" />
                  ))}
                </div>

                {/* CAR DETECTIONS */}
                {yoloMode === 'car' && (
                  <>
                    {88 >= confidenceThreshold && (
                      <div
                        onMouseEnter={() => setHoveredBox('car1')}
                        onMouseLeave={() => setHoveredBox(null)}
                        className={`absolute left-[15%] top-[25%] w-[68%] h-[58%] border-2 transition-all cursor-pointer ${
                          hoveredBox === 'car1' ? 'border-amber-400 bg-amber-500/25 scale-[1.01]' : 'border-amber-500 bg-amber-500/10'
                        }`}
                      >
                        <span className="absolute -top-6 left-0 bg-amber-500 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1">
                          🚗 Sports Car: 88% <span className="font-mono text-[9px] text-slate-900">[x:150, y:120, w:680]</span>
                        </span>
                      </div>
                    )}

                    {72 >= confidenceThreshold && (
                      <div className="absolute left-[20%] top-[50%] w-[18%] h-[32%] border-2 border-cyan-400 bg-cyan-500/15 transition-all cursor-pointer">
                        <span className="absolute -top-5 left-0 bg-cyan-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          ⚙️ Wheel: 72%
                        </span>
                      </div>
                    )}

                    {64 >= confidenceThreshold && (
                      <div className="absolute left-[70%] top-[40%] w-[12%] h-[20%] border-2 border-emerald-400 bg-emerald-500/15 transition-all cursor-pointer">
                        <span className="absolute -top-5 left-0 bg-emerald-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          💡 Headlight: 64%
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* ANIME DETECTIONS */}
                {yoloMode === 'anime' && (
                  <>
                    {94 >= confidenceThreshold && (
                      <div
                        onMouseEnter={() => setHoveredBox('anime1')}
                        onMouseLeave={() => setHoveredBox(null)}
                        className={`absolute left-[25%] top-[10%] w-[50%] h-[80%] border-2 transition-all cursor-pointer ${
                          hoveredBox === 'anime1' ? 'border-pink-400 bg-pink-500/25 scale-[1.01]' : 'border-pink-500 bg-pink-500/10'
                        }`}
                      >
                        <span className="absolute -top-6 left-0 bg-pink-500 text-white text-[11px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1">
                          🎨 Anime Character (動漫角色): 94%
                        </span>
                      </div>
                    )}

                    {82 >= confidenceThreshold && (
                      <div className="absolute left-[35%] top-[20%] w-[30%] h-[25%] border-2 border-amber-400 bg-amber-500/15 cursor-pointer">
                        <span className="absolute -top-5 left-0 bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          👀 Face & Expression: 82%
                        </span>
                      </div>
                    )}

                    {55 >= confidenceThreshold && (
                      <div className="absolute left-[10%] top-[40%] w-[20%] h-[40%] border-2 border-purple-400 bg-purple-500/15 cursor-pointer">
                        <span className="absolute -top-5 left-0 bg-purple-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          🗡️ Costume/Weapon: 55%
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 5. RANDOM FOREST ==================== */}
        {activeSubTab === 'forest' && (
          <motion.div
            key="forest"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Trees className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">隨機森林 (Random Forest) - 多樹集成決策 (Ensemble Learning)</h2>
                  <p className="text-xs text-slate-400">利用多棵獨立決策樹 (Decision Trees) 進行投票，透過隨機特徵採樣降低單一模型過擬合 (Overfitting) 風險</p>
                </div>
              </div>

              {/* Interactive Forest Simulator */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input Controls */}
                <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" /> 輸入測試項目屬性
                  </h3>

                  {/* Genre */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 block">遊戲/項目類型 (Genre):</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['RPG', 'FPS', 'Strategy'] as const).map((g) => (
                        <button
                          key={g}
                          onClick={() => setGenre(g)}
                          className={`py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                            genre === g
                              ? 'bg-emerald-500 text-slate-950 shadow-md'
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">定價 (USD $):</span>
                      <span className="text-emerald-400 font-mono font-bold">${price}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Rating Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">好評率 (%):</span>
                      <span className="text-emerald-400 font-mono font-bold">{rating}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="99"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Majority Vote Banner */}
                  <div className="pt-3 border-t border-slate-800 bg-slate-900 p-4 rounded-xl text-center space-y-1">
                    <div className="text-xs text-slate-400">森林多數決最終判定 (Majority Vote):</div>
                    <div className={`text-xl font-black ${forestResult.likes >= 3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {forestResult.result}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      讚成: {forestResult.likes} 樹 | 反對: {forestResult.dislikes} 樹 (贊同率 {forestResult.percentage}%)
                    </div>
                  </div>
                </div>

                {/* Individual Trees Voting Display */}
                <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                    <span>🌲 隨機森林中 5 棵決策樹之個別判斷狀態</span>
                    <span className="text-xs text-slate-400 font-normal">Bagging + Feature Subsampling</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {forestResult.votes.map((item) => {
                      const isLike = item.vote === 'Like';
                      return (
                        <div
                          key={item.treeId}
                          className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
                            isLike
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                          }`}
                        >
                          <div className="text-[11px] font-bold text-slate-400">Tree #{item.treeId}</div>
                          <Trees className={`w-8 h-8 mx-auto ${isLike ? 'text-emerald-400' : 'text-rose-400'}`} />
                          <div className="text-xs font-black uppercase tracking-wider">{item.vote}</div>
                          <div className="text-[10px] text-slate-400 leading-tight">{item.focus}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> 隨機森林原理優勢解析：
                    </div>
                    <p>
                      隨機森林利用「Bootstrap 集成採樣」與「特徵隨機子集」，讓每棵決策樹專注於不同維度的特徵。單一決策樹容易對特徵雜訊過度反應 (Overfitting)，但當百棵樹進行民主式多數決 (Majority Voting) 時，能降低模型變異數 (Variance)，顯著提升模型的泛化能力與準確度。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
