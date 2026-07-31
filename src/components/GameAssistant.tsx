import React, { useState } from 'react';
import { Bot, Send, Sparkles, Gamepad2, Zap, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { GameItem } from '../types';

interface GameAssistantProps {
  games: GameItem[];
}

export const GameAssistant: React.FC<GameAssistantProps> = ({ games }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: '你好！我是你的 AI 遊戲戰術與推薦參謀 🤖 🎮！\n我可以為你提供：《法環/黑神話/荒野》Boss 逃課打法、裝備流派配裝、或者根據你目前的遊戲庫推薦下一款必玩的獨立神作！請問今天想聊些什麼？',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || prompt;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setPrompt('');
    setLoading(true);

    try {
      // Send to server or simulate intelligent gaming response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend, userGames: games.map((g) => g.title) })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        // Standalone smart reply fallback
        setTimeout(() => {
          let reply = `關於【${textToSend}】：\n`;
          if (textToSend.includes('推薦') || textToSend.includes('下款')) {
            reply += `根據你喜歡《法环》、《黑神話：悟空》這類高難度動作 RPG，強烈推薦你嘗試：\n1. 《Lies of P (匹諾曹的謊言)》- 優秀的魂系戰鬥與完美格擋系統！\n2. 《Sekiro: Shadows Die Twice (隻狼) stroke》- 拼刀天花板！\n3. 《Armored Core VI (裝甲核心6)》- 爽快高速機甲組裝戰鬥！`;
          } else if (textToSend.includes('逃課') || textToSend.includes('打法') || textToSend.includes('Boss')) {
            reply += `針對高難度 Boss 的通用逃課指南：\n• 善用遠程投擲物與召喚物拉住仇恨。\n• 魂系建議搭配盾牌反擊或信仰流派大雷槍遠程轟炸。\n• 記得升級武器等級，武器強化帶來的面板提升往往高於角色本體屬性！`;
          } else {
            reply += `已接收到你的遊戲諮詢！如果想深入交流配裝流派、成就攻略或下一款神作推薦，隨時告訴我！`;
          }

          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: reply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 1000);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `推薦熱門遊戲品項：如果喜歡《法環》或《黑神話》，強烈建議嘗試《隻狼》、《匹諾曹的謊言》以及《Hades II》！`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              AI 遊戲戰術與攻略參謀
            </h2>
            <p className="text-slate-400 text-xs">
              即時查詢 Boss 逃課秘籍、流派裝備推薦與獨立神作推薦！
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          '🎮 根據我的遊戲庫推薦下一款必玩神作',
          '⚔️ 《法環》黃金樹幽影近戰流派配裝指南',
          '🐵 《黑神話：悟空》二郎神怎麼打最省力？',
          '👾 推薦 3 款 Steam 折扣極佳的獨立 Rogue-like 遊戲'
        ].map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-purple-500/50 rounded-xl transition-all cursor-pointer text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-96 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-slate-500 mb-1">{m.sender === 'user' ? '你' : 'AI 參謀'} • {m.time}</div>
            <div
              className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-lg ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse font-mono">
            <Sparkles className="w-4 h-4" /> AI 參謀正在推演戰術與檢索攻略庫中...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="詢問任何遊戲問題 (例: 推薦類似黑神話的動作遊戲)..."
          className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-purple-500 placeholder-slate-500"
        />
        <button
          onClick={() => handleSend()}
          className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" /> 發送
        </button>
      </div>
    </div>
  );
};
