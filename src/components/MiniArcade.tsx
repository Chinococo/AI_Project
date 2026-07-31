import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Zap, Volume2, Shield, Heart, Sparkles, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Web Audio API Sound Synthesizer (No external assets needed!)
export const playSynthSound = (type: 'coin' | 'laser' | 'jump' | 'powerup' | 'gameover' | 'victory') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'coin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'laser') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'jump') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'powerup') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      });
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'gameover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.15, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    }
  } catch {
    // Ignore audio context errors if muted/blocked by browser
  }
};

export const MiniArcade: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dodge' | 'reflex' | 'soundboard'>('dodge');

  // --- Reflex Speed Test State ---
  const [reflexState, setReflexState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'too-early'>('idle');
  const [reflexTime, setReflexTime] = useState<number | null>(null);
  const [bestReflexTime, setBestReflexTime] = useState<number>(() => {
    const saved = localStorage.getItem('best_reflex_time');
    return saved ? parseInt(saved, 10) : 999;
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startReflexTest = () => {
    setReflexState('waiting');
    setReflexTime(null);
    const delay = Math.floor(Math.random() * 2500) + 1500;
    timerRef.current = setTimeout(() => {
      setReflexState('ready');
      startTimeRef.current = performance.now();
    }, delay);
  };

  const handleReflexClick = () => {
    if (reflexState === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setReflexState('too-early');
      playSynthSound('gameover');
    } else if (reflexState === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReflexTime(elapsed);
      setReflexState('result');
      playSynthSound('victory');

      if (elapsed < bestReflexTime) {
        setBestReflexTime(elapsed);
        localStorage.setItem('best_reflex_time', elapsed.toString());
      }
    }
  };

  const getReflexRank = (ms: number) => {
    if (ms < 180) return { rank: 'SSS 職業神級 (Gamer God)', color: 'text-amber-400 border-amber-400' };
    if (ms < 210) return { rank: 'SS 電競選手 (Esports Pro)', color: 'text-purple-400 border-purple-400' };
    if (ms < 240) return { rank: 'S 鑽石玩家 (Diamond Tier)', color: 'text-cyan-400 border-cyan-400' };
    if (ms < 280) return { rank: 'A 高手水平 (Gold Tier)', color: 'text-emerald-400 border-emerald-400' };
    return { rank: 'B 休閒玩家 (Casual Gamer)', color: 'text-slate-300 border-slate-500' };
  };

  // --- Boss Dodge Canvas Game ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dodgeGameState, setDodgeGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('boss_dodge_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lives, setLives] = useState(3);

  const gameRef = useRef({
    playerX: 200,
    playerY: 340,
    playerWidth: 32,
    playerHeight: 32,
    enemies: [] as { x: number; y: number; speed: number; radius: number; color: string; type: 'bullet' | 'laser' }[],
    gems: [] as { x: number; y: number; speed: number; radius: number }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
    keys: { left: false, right: false, up: false, down: false },
    score: 0,
    lives: 3,
    frame: 0
  });

  const startDodgeGame = () => {
    setDodgeGameState('playing');
    setScore(0);
    setLives(3);

    gameRef.current = {
      playerX: 200,
      playerY: 340,
      playerWidth: 32,
      playerHeight: 32,
      enemies: [],
      gems: [],
      particles: [],
      keys: { left: false, right: false, up: false, down: false },
      score: 0,
      lives: 3,
      frame: 0
    };

    playSynthSound('powerup');
  };

  useEffect(() => {
    if (activeSubTab !== 'dodge') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') gameRef.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') gameRef.current.keys.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') gameRef.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') gameRef.current.keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const g = gameRef.current;

      // Clear canvas with dark grid background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      if (dodgeGameState === 'playing') {
        g.frame++;
        g.score += 1;
        setScore(g.score);

        // Player Movement
        const speed = 6;
        if (g.keys.left && g.playerX > 16) g.playerX -= speed;
        if (g.keys.right && g.playerX < canvas.width - 16) g.playerX += speed;

        // Spawn Enemies
        if (g.frame % Math.max(15, 45 - Math.floor(g.score / 200)) === 0) {
          const radius = Math.random() * 8 + 8;
          const x = Math.random() * (canvas.width - radius * 2) + radius;
          const enemySpeed = Math.random() * 2 + 3 + (g.score / 500);
          g.enemies.push({
            x,
            y: -20,
            speed: enemySpeed,
            radius,
            color: Math.random() > 0.3 ? '#f43f5e' : '#a855f7',
            type: Math.random() > 0.8 ? 'laser' : 'bullet'
          });
        }

        // Spawn XP Gems
        if (g.frame % 80 === 0) {
          g.gems.push({
            x: Math.random() * (canvas.width - 20) + 10,
            y: -10,
            speed: 2.5,
            radius: 7
          });
        }

        // Update & Render Gems
        for (let i = g.gems.length - 1; i >= 0; i--) {
          const gem = g.gems[i];
          gem.y += gem.speed;

          // Draw Gem
          ctx.save();
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#38bdf8';
          ctx.beginPath();
          ctx.arc(gem.x, gem.y, gem.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Collision with Player
          const dx = gem.x - g.playerX;
          const dy = gem.y - g.playerY;
          if (Math.hypot(dx, dy) < gem.radius + 16) {
            g.score += 150;
            playSynthSound('coin');
            // Particles
            for (let p = 0; p < 8; p++) {
              g.particles.push({
                x: gem.x,
                y: gem.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 20,
                color: '#38bdf8'
              });
            }
            g.gems.splice(i, 1);
          } else if (gem.y > canvas.height + 20) {
            g.gems.splice(i, 1);
          }
        }

        // Update & Render Enemies
        for (let i = g.enemies.length - 1; i >= 0; i--) {
          const enemy = g.enemies[i];
          enemy.y += enemy.speed;

          ctx.save();
          ctx.fillStyle = enemy.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = enemy.color;
          ctx.beginPath();
          ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Collision Check
          const dx = enemy.x - g.playerX;
          const dy = enemy.y - g.playerY;
          const dist = Math.hypot(dx, dy);

          if (dist < enemy.radius + 14) {
            playSynthSound('laser');
            g.lives -= 1;
            setLives(g.lives);

            // Explosion particles
            for (let p = 0; p < 12; p++) {
              g.particles.push({
                x: g.playerX,
                y: g.playerY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 25,
                color: '#ef4444'
              });
            }

            g.enemies.splice(i, 1);

            if (g.lives <= 0) {
              playSynthSound('gameover');
              setDodgeGameState('gameover');
              if (g.score > highScore) {
                setHighScore(g.score);
                localStorage.setItem('boss_dodge_highscore', g.score.toString());
              }
              break;
            }
          } else if (enemy.y > canvas.height + 20) {
            g.enemies.splice(i, 1);
          }
        }

        // Update & Render Particles
        for (let i = g.particles.length - 1; i >= 0; i--) {
          const pt = g.particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life -= 1;

          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1, pt.life / 5), 0, Math.PI * 2);
          ctx.fill();

          if (pt.life <= 0) g.particles.splice(i, 1);
        }

        // Render Player (Cyan Pixel Ship)
        ctx.save();
        ctx.fillStyle = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4';
        ctx.beginPath();
        ctx.moveTo(g.playerX, g.playerY - 18);
        ctx.lineTo(g.playerX - 16, g.playerY + 14);
        ctx.lineTo(g.playerX + 16, g.playerY + 14);
        ctx.closePath();
        ctx.fill();

        // Engine flame
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(g.playerX - 6, g.playerY + 14);
        ctx.lineTo(g.playerX + 6, g.playerY + 14);
        ctx.lineTo(g.playerX, g.playerY + 22 + (g.frame % 4));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeSubTab, dodgeGameState, highScore]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" /> 🎮 迷你遊戲娛樂角 (Arcade Zone)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            專屬網頁遊戲角落！測試反應速度、體驗 Boss 閃避遊戲，或播放復古 8-bit 音效！
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('dodge')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'dodge'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> 像素 Boss 閃避大作戰
          </button>
          <button
            onClick={() => setActiveSubTab('reflex')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'reflex'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" /> 電競極限反應測試
          </button>
          <button
            onClick={() => setActiveSubTab('soundboard')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'soundboard'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" /> 8-Bit 遊戲音效台
          </button>
        </div>
      </div>

      {/* GAME 1: Boss Dodge Canvas */}
      {activeSubTab === 'dodge' && (
        <div className="mt-6 flex flex-col lg:flex-row items-center gap-8 justify-center">
          <div className="relative border-2 border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={420}
              height={400}
              className="touch-none cursor-crosshair block"
              onTouchStart={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect && e.touches[0]) {
                  const touchX = e.touches[0].clientX - rect.left;
                  gameRef.current.playerX = touchX;
                }
              }}
              onTouchMove={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect && e.touches[0]) {
                  const touchX = e.touches[0].clientX - rect.left;
                  gameRef.current.playerX = touchX;
                }
              }}
            />

            {/* Canvas Overlay for Start / GameOver */}
            {dodgeGameState !== 'playing' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                {dodgeGameState === 'idle' ? (
                  <>
                    <Shield className="w-16 h-16 text-cyan-400 mb-3 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-2">像素 Boss 閃避大作戰</h3>
                    <p className="text-slate-300 text-sm max-w-xs mb-6">
                      使用鍵盤 <span className="bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">←</span> <span className="bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">→</span> 或 <span className="bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">A / D</span> 鍵操控飛船，閃避 Boss 子彈並收集藍色能量晶體！
                    </p>
                    <button
                      onClick={startDodgeGame}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current" /> 開始遊戲
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
                      <Zap className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">GAME OVER</h3>
                    <p className="text-slate-400 text-sm mb-4">飛船能量耗盡，遭遇毀滅打擊！</p>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 w-full max-w-xs">
                      <div className="text-slate-400 text-xs">本次得分</div>
                      <div className="text-3xl font-black text-cyan-400 my-1">{score}</div>
                      {score >= highScore && score > 0 && (
                        <div className="text-amber-400 text-xs font-semibold flex items-center justify-center gap-1">
                          <Trophy className="w-3.5 h-3.5" /> 刷新最高紀錄！
                        </div>
                      )}
                    </div>
                    <button
                      onClick={startDodgeGame}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-5 h-5" /> 再次挑戰
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Controls & High Scores Side Panel */}
          <div className="flex-1 space-y-4 max-w-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="text-white font-semibold flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-amber-400" /> 遊戲狀態 & 紀錄
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">目前分數</span>
                  <span className="text-cyan-400 font-mono font-bold text-lg">{score}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">最高紀錄</span>
                  <span className="text-amber-400 font-mono font-bold text-lg">{highScore}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">剩餘護甲生命</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((idx) => (
                      <Heart
                        key={idx}
                        className={`w-5 h-5 ${
                          idx <= lives ? 'text-red-500 fill-red-500' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="text-white font-medium flex items-center gap-1.5 text-sm mb-1">
                <Crosshair className="w-4 h-4 text-cyan-400" /> 操作說明
              </div>
              <p>• 鍵盤 <strong>← / →</strong> 或 <strong>A / D</strong> 左右移動</p>
              <p>• 手機/平板玩家可直接在畫面上滑動移動</p>
              <p>• 閃避紅色/紫色雷射彈幕，收集藍色寶石增加 150 積分！</p>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: Reflex Speed Test */}
      {activeSubTab === 'reflex' && (
        <div className="mt-6 flex flex-col items-center">
          <div
            onClick={handleReflexClick}
            className={`w-full max-w-2xl h-80 rounded-2xl cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all border-2 select-none shadow-2xl relative overflow-hidden ${
              reflexState === 'idle'
                ? 'bg-slate-950 border-purple-500/40 hover:border-purple-400'
                : reflexState === 'waiting'
                ? 'bg-red-950/90 border-red-500 animate-pulse'
                : reflexState === 'ready'
                ? 'bg-emerald-600 border-emerald-400 text-white'
                : reflexState === 'too-early'
                ? 'bg-amber-950 border-amber-500'
                : 'bg-slate-950 border-cyan-500/50'
            }`}
          >
            {reflexState === 'idle' && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">電競極限神經反應測試</h3>
                <p className="text-slate-400 text-sm max-w-md">
                  點擊區域開始測試！當畫面從<span className="text-red-400 font-bold">紅色</span>變成<span className="text-emerald-400 font-bold">綠色</span>時，以最快速度點擊！
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startReflexTest();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-400 hover:to-pink-500 transition-all cursor-pointer"
                >
                  開始反應測試
                </button>
              </motion.div>
            )}

            {reflexState === 'waiting' && (
              <div className="space-y-2">
                <div className="text-3xl font-black text-red-200">準備... 屏息等待...</div>
                <div className="text-red-400 text-sm">（看到綠色出現時立刻點擊！切勿提前點擊）</div>
              </div>
            )}

            {reflexState === 'ready' && (
              <div className="space-y-2">
                <div className="text-5xl font-black text-white tracking-widest animate-bounce">按下去！！！</div>
                <div className="text-emerald-100 font-semibold">CLICK NOW!</div>
              </div>
            )}

            {reflexState === 'too-early' && (
              <div className="space-y-3">
                <div className="text-3xl font-black text-amber-300">太早按了！(Too Early)</div>
                <p className="text-slate-300 text-sm">請等待畫面變成綠色再按下。</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startReflexTest();
                  }}
                  className="px-5 py-2.5 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-500 cursor-pointer"
                >
                  重試一次
                </button>
              </div>
            )}

            {reflexState === 'result' && reflexTime !== null && (
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="text-slate-400 text-sm">本次反應速度</div>
                  <div className="text-6xl font-black text-cyan-400 font-mono tracking-tight">{reflexTime} <span className="text-2xl text-slate-400 font-sans">ms</span></div>
                  
                  <div className={`inline-block px-4 py-1.5 rounded-full border text-sm font-bold mt-2 ${getReflexRank(reflexTime).color}`}>
                    評級：{getReflexRank(reflexTime).rank}
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startReflexTest();
                      }}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      再測一次
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="mt-6 flex gap-6 text-sm">
            <div className="bg-slate-950 px-5 py-3 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-xs">個人最佳紀錄</div>
              <div className="text-amber-400 font-mono font-bold text-xl mt-0.5">
                {bestReflexTime === 999 ? '未測試' : `${bestReflexTime} ms`}
              </div>
            </div>
            <div className="bg-slate-950 px-5 py-3 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-xs">職業選手平均</div>
              <div className="text-purple-400 font-mono font-bold text-xl mt-0.5">180 - 200 ms</div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: Soundboard */}
      {activeSubTab === 'soundboard' && (
        <div className="mt-6 space-y-6">
          <p className="text-slate-300 text-sm">點擊下方按鈕觸發專屬 8-Bit 懷舊經典遊戲音效（採用瀏覽器 Web Audio API 動態合成）：</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { type: 'coin', label: '🪙 拾取金幣', color: 'from-amber-500 to-yellow-600' },
              { type: 'powerup', label: '⭐ 升級強化', color: 'from-cyan-500 to-blue-600' },
              { type: 'laser', label: '⚡ 激光發射', color: 'from-fuchsia-500 to-pink-600' },
              { type: 'jump', label: '🦘 經典跳躍', color: 'from-emerald-500 to-teal-600' },
              { type: 'victory', label: '🏆 勝利號角', color: 'from-purple-500 to-indigo-600' },
              { type: 'gameover', label: '💀 遊戲失敗', color: 'from-red-500 to-rose-700' },
            ].map((snd) => (
              <button
                key={snd.type}
                onClick={() => playSynthSound(snd.type as 'coin' | 'laser' | 'jump' | 'powerup' | 'gameover' | 'victory')}
                className={`p-4 rounded-xl bg-gradient-to-br ${snd.color} text-white font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer border border-white/10`}
              >
                <Volume2 className="w-6 h-6" />
                <span className="text-xs">{snd.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
