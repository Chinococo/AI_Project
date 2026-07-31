import React, { useState } from 'react';
import { GamerProfile } from '../types';
import { UserCheck, X, Cpu, Sparkles } from 'lucide-react';

interface EditProfileModalProps {
  profile: GamerProfile;
  onSaveProfile: (updated: GamerProfile) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onSaveProfile,
  onClose
}) => {
  const [gamerTag, setGamerTag] = useState(profile.gamerTag);
  const [realName, setRealName] = useState(profile.realName);
  const [title, setTitle] = useState(profile.title);
  const [status, setStatus] = useState(profile.status);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [bannerUrl, setBannerUrl] = useState(profile.bannerUrl);
  const [cpu, setCpu] = useState(profile.setupSpecs.cpu);
  const [gpu, setGpu] = useState(profile.setupSpecs.gpu);
  const [ram, setRam] = useState(profile.setupSpecs.ram);
  const [monitor, setMonitor] = useState(profile.setupSpecs.monitor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: GamerProfile = {
      ...profile,
      gamerTag,
      realName,
      title,
      status,
      bio,
      avatarUrl,
      bannerUrl,
      setupSpecs: {
        ...profile.setupSpecs,
        cpu,
        gpu,
        ram,
        monitor
      }
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" /> 編輯個人 Gamer 名片與裝備
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-medium block mb-1"> Gamer Tag ID *</label>
              <input
                type="text"
                required
                value={gamerTag}
                onChange={(e) => setGamerTag(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">真實姓名 / 暱稱</label>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">專屬稱號 / 頭銜</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">即時動態狀態 (例: 🎮 正在暢玩...)</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">簡介 (Bio)</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <h4 className="font-bold text-cyan-400 flex items-center gap-1.5 text-sm">
              <Cpu className="w-4 h-4" /> 電競裝備規格 (Setup Specs)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">CPU</label>
                <input
                  type="text"
                  value={cpu}
                  onChange={(e) => setCpu(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">GPU</label>
                <input
                  type="text"
                  value={gpu}
                  onChange={(e) => setGpu(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg cursor-pointer"
            >
              更新名片資料
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
