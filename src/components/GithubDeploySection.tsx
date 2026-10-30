import React, { useState } from 'react';
import { Check, Copy, Download, Github, Terminal, ExternalLink, Sparkles, AlertCircle, FileCode } from 'lucide-react';
import { motion } from 'motion/react';

export const GithubDeploySection: React.FC = () => {
  const [repoName, setRepoName] = useState('personalWeb');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'yaml' | 'guide'>('guide');

  const generateYamlContent = (repo: string) => {
    return `# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install
      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
  };

  const yamlContent = generateYamlContent(repoName);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deploy.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 rounded-xl text-white shadow-lg">
            <Github className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              GitHub Pages 發布與 Deploy.yml 設定指南
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              一鍵導出修復格式的 GitHub Actions 自動部署腳本，輕鬆將個人遊戲網站上線至 GitHub Pages！
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            部署步驟教學
          </button>
          <button
            onClick={() => setActiveTab('yaml')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'yaml'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" /> 查看 deploy.yml 內容
          </button>
        </div>
      </div>

      {/* Repo Name input & Config Bar */}
      <div className="my-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <span className="text-slate-400 text-sm font-medium whitespace-nowrap">GitHub 儲存庫名稱：</span>
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">/</span>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value.trim() || 'personalWeb')}
              placeholder="personalWeb"
              className="w-full pl-7 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="text-slate-500">部署後網址為：</span>
          <code className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-cyan-300 font-mono">
            https://&lt;your-username&gt;.github.io/{repoName || 'personalWeb'}/
          </code>
        </div>
      </div>

      {activeTab === 'guide' ? (
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -3 }} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-sm border border-cyan-500/20">
                1
              </div>
              <h3 className="font-bold text-white text-base">建立 GitHub 儲存庫</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                在 GitHub 建立名為 <code className="text-cyan-400 font-mono">{repoName}</code> 的新 Repository（選擇 Public 公開）。
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div whileHover={{ y: -3 }} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center text-sm border border-purple-500/20">
                2
              </div>
              <h3 className="font-bold text-white text-base">放置 deploy.yml 檔案</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                將本專案代碼推送到 <code className="text-purple-300 font-mono">main</code> 分支，確保專案根目錄下有 <code className="text-purple-300 font-mono">.github/workflows/deploy.yml</code>。
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div whileHover={{ y: -3 }} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/20">
                3
              </div>
              <h3 className="font-bold text-white text-base">啟用 GitHub Pages 權限</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                進入 GitHub 專案 <span className="text-emerald-300 font-semibold">Settings → Pages → Source</span> 改為 <span className="text-emerald-300 font-semibold font-mono">GitHub Actions</span> 即可自動連線發布！
              </p>
            </motion.div>
          </div>

          {/* Terminal Command Snippet */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                <Terminal className="w-4 h-4 text-cyan-400" /> Git 推送指令參考 (Terminal Commands)
              </div>
            </div>
            <pre className="bg-slate-900/90 p-4 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`git init
git add .
git commit -m "feat: setup personal gaming hub with github pages deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/${repoName}.git
git push -u origin main`}
            </pre>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">自動修復 YAML 縮排格式說明：</span> 原本提供的 YAML 中，部分步驟與 permissions / jobs 的空格與縮排缺失導致 GitHub Actions 解析失敗。我們已幫您完整排版修正，縮排格式完全符合 YAML 標準語法。
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-slate-300 text-sm font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> .github/workflows/deploy.yml
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '已複製到剪貼簿！' : '複製 YAML 腳本'}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> 下載 deploy.yml 檔案
              </button>
            </div>
          </div>

          <div className="relative group">
            <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-[450px]">
              {yamlContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
