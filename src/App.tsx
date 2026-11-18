import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Compass,
  FileCheck2,
  FileCode,
  Flame,
  GraduationCap,
  Menu,
  Moon,
  Rocket,
  Sun,
  Timer,
  X,
} from 'lucide-react';
import { CheatSheetView } from './components/CheatSheetView';
import { CodeLabView } from './components/CodeLabView';
import { DeployApiView } from './components/DeployApiView';
import { JavaW3SchoolsView } from './components/JavaW3SchoolsView';
import { QuizView } from './components/QuizView';
import { RoadmapView } from './components/RoadmapView';
import { SlideReviewView } from './components/SlideReviewView';
import { ALGORITHMS } from './data/algorithms';
import { SPRINT_ROADMAP } from './data/cheatSheet';
import { MCQ_QUESTIONS } from './data/quizzes';
import { loadApiSettings, saveApiSettings } from './services/geminiGrader';
import { ApiSettings, TabId } from './types';

const STORAGE_PROGRESS = 'uet_dsa_progress_v1';
const STORAGE_THEME = 'uet_dsa_theme_v1';
const STORAGE_MIDTERM = 'uet_dsa_midterm_filter_v1';

interface SavedProgress {
  completedTaskIds: string[];
  algoScores: Record<string, number>;
  mcqAnswers: Record<string, number>;
  examTargetTimestamp?: number;
}

function loadProgress(): SavedProgress {
  try {
    const raw = localStorage.getItem(STORAGE_PROGRESS);
    if (!raw) {
      return {
        completedTaskIds: [],
        algoScores: {},
        mcqAnswers: {},
        examTargetTimestamp: Date.now() + 6 * 3600 * 1000,
      };
    }
    return JSON.parse(raw) as SavedProgress;
  } catch {
    return {
      completedTaskIds: [],
      algoScores: {},
      mcqAnswers: {},
      examTargetTimestamp: Date.now() + 6 * 3600 * 1000,
    };
  }
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('roadmap');
  const [midtermOnly, setMidtermOnly] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem(STORAGE_MIDTERM);
      return val === null ? true : val === 'true';
    } catch {
      return true;
    }
  });
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(() => {
    const isMidtermStored = (() => {
      try {
        const val = localStorage.getItem(STORAGE_MIDTERM);
        return val === null ? true : val === 'true';
      } catch {
        return true;
      }
    })();
    if (isMidtermStored) {
      const firstMid = ALGORITHMS.find((a) => a.isMidterm !== false);
      if (firstMid) return firstMid.id;
    }
    return ALGORITHMS[0].id;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  );

  const [apiSettings, setApiSettings] = useState<ApiSettings>(() => loadApiSettings());
  const [progress, setProgress] = useState<SavedProgress>(() => loadProgress());
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    localStorage.setItem(STORAGE_MIDTERM, String(midtermOnly));
    if (midtermOnly) {
      const isCurrentMidterm = ALGORITHMS.some((a) => a.id === selectedAlgoId && a.isMidterm !== false);
      if (!isCurrentMidterm) {
        const firstMid = ALGORITHMS.find((a) => a.isMidterm !== false);
        if (firstMid) setSelectedAlgoId(firstMid.id);
      }
    }
  }, [midtermOnly, selectedAlgoId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const handleUpdateApiSettings = (next: ApiSettings) => {
    setApiSettings(next);
    saveApiSettings(next);
  };

  const handleToggleTask = (id: string) => {
    setProgress((prev) => {
      const exists = prev.completedTaskIds.includes(id);
      return {
        ...prev,
        completedTaskIds: exists
          ? prev.completedTaskIds.filter((x) => x !== id)
          : [...prev.completedTaskIds, id],
      };
    });
  };

  const handleSaveAlgoScore = (algoId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      algoScores: {
        ...prev.algoScores,
        [algoId]: Math.max(prev.algoScores[algoId] ?? 0, score),
      },
    }));
  };

  const handleAnswerMcq = (qId: string, idx: number) => {
    setProgress((prev) => ({
      ...prev,
      mcqAnswers: { ...prev.mcqAnswers, [qId]: idx },
    }));
  };

  const handleNavigate = (tab: TabId, algoId?: string) => {
    setActiveTab(tab);
    if (algoId) setSelectedAlgoId(algoId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const passedAlgoCount = Object.values(progress.algoScores).filter((s) => s >= 8).length;
  const mcqAnswered = Object.keys(progress.mcqAnswers).length;
  const mcqCorrect = MCQ_QUESTIONS.filter((q) => progress.mcqAnswers[q.id] === q.correctIndex).length;
  const quizAccuracy = mcqAnswered > 0 ? `${mcqCorrect}/${mcqAnswered}` : `0/${MCQ_QUESTIONS.length}`;

  const totalRoadmapTasks = SPRINT_ROADMAP.reduce((acc, p) => acc + p.tasks.length, 0);
  const roadmapPct = totalRoadmapTasks
    ? Math.round((progress.completedTaskIds.length / totalRoadmapTasks) * 100)
    : 0;

  const targetMs = progress.examTargetTimestamp || Date.now() + 6 * 3600 * 1000;
  const remSec = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
  const hrs = Math.floor(remSec / 3600);
  const mins = Math.floor((remSec % 3600) / 60);
  const secs = remSec % 60;

  const navItems: Array<{ id: TabId; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'roadmap', label: 'Lộ trình cấp tốc', icon: <Compass className="w-4 h-4" />, badge: `${roadmapPct}%` },
    { id: 'slides', label: 'Slide bài giảng', icon: <GraduationCap className="w-4 h-4" />, badge: midtermOnly ? '10 Tuần' : '11 Tuần' },
    {
      id: 'codelab',
      label: 'Phòng luyện Code',
      icon: <Code2 className="w-4 h-4" />,
      badge: `${passedAlgoCount}/${midtermOnly ? ALGORITHMS.filter((a) => a.isMidterm !== false).length : ALGORITHMS.length}`,
    },
    { id: 'quiz', label: 'Quiz & Tự luận AI', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'java', label: 'Cú pháp Java (W3Schools)', icon: <FileCode className="w-4 h-4" /> },
    { id: 'cheatsheet', label: 'Tổng kết & Mô phỏng', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'deploy', label: 'API & Deploy Web', icon: <Rocket className="w-4 h-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {/* Product Mark & Theme Toggle */}
        <div className="px-1.5 pt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-[#1d4ed8] dark:bg-blue-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-xs"
            >
              A4
            </motion.div>
            <div>
              <div className="text-sm font-semibold text-[#14171a] dark:text-[#eef1f6] leading-tight">
                INT2210 // UET
              </div>
              <div className="text-[11px] text-[#646970] dark:text-slate-400">
                algs4 Midterm Prep
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
            className="p-2 rounded-lg border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#171b24] text-[#475569] dark:text-slate-300 hover:text-[#14171a] dark:hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Midterm Filter Mode Toggle Button */}
        <div className="px-1.5">
          <button
            onClick={() => setMidtermOnly((m) => !m)}
            className={`w-full py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all border ${
              midtermOnly
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-sm shadow-amber-500/20'
                : 'bg-white dark:bg-[#171b24] text-[#4b4f56] dark:text-slate-300 border-[#dcdcd4] dark:border-[#242b38] hover:border-amber-400'
            }`}
            title="Lọc nội dung chỉ dành riêng cho kỳ thi giữa kỳ (Complexity, Sort, Stack/Queue, Heap, BST/AVL)"
          >
            <div className="flex items-center gap-1.5">
              <Flame className={`w-4 h-4 ${midtermOnly ? 'text-white' : 'text-amber-500'}`} />
              <span>{midtermOnly ? 'Ôn Giữa Kỳ: BẬT' : 'Ôn Giữa Kỳ: TẮT'}</span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                midtermOnly ? 'bg-black/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {midtermOnly ? '5 Chủ đề' : 'Tất cả'}
            </span>
          </button>
        </div>

        {/* Navigation with sliding active pill */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] transition-colors ${
                  active
                    ? 'text-[#14171a] dark:text-white font-semibold'
                    : 'text-[#4b4f56] dark:text-slate-400 hover:text-[#14171a] dark:hover:text-slate-200 hover:bg-[#ecece6]/60 dark:hover:bg-[#171b24]/70'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#191f2b] border border-[#e3e3dc] dark:border-[#283142] shadow-xs"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className={active ? 'text-[#1d4ed8] dark:text-blue-400' : ''}>{item.icon}</span>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="relative z-10 text-[11px] font-mono text-[#5c6168] dark:text-slate-400 tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sprint Timer & Theme Status */}
      <div className="bg-white dark:bg-[#13161d] border border-[#e3e3dc] dark:border-[#222834] rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-[#5c6168] dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Timer className="w-3.5 h-3.5 text-[#1d4ed8] dark:text-blue-400" /> Đếm ngược ôn thi
          </span>
          <button
            onClick={() =>
              setProgress((p) => ({ ...p, examTargetTimestamp: Date.now() + 6 * 3600 * 1000 }))
            }
            className="text-[10px] text-[#1d4ed8] dark:text-blue-400 hover:underline"
          >
            Đặt lại 6h
          </button>
        </div>

        <div className="font-mono text-xl font-semibold text-[#14171a] dark:text-white tabular-nums tracking-tight">
          {String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>

        <div className="w-full h-1.5 bg-[#ecece6] dark:bg-[#1f2533] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0f766e] dark:bg-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${roadmapPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#646970] dark:text-slate-400">
          <span>API Key bật: {apiSettings.keys.filter((k) => k.enabled).length}</span>
          <span className="font-mono">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f6f3] dark:bg-[#0b0d11] text-[#14171a] dark:text-[#eef1f6] flex transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[248px] shrink-0 border-r border-[#e3e3dc] dark:border-[#1c212c] bg-[#f2f2ee]/80 dark:bg-[#0e1117]/90 backdrop-blur sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Header + Drawer */}
      <div className="flex-1 flex flex-col min-w-0 bg-canvas-grid">
        <header className="lg:hidden sticky top-0 z-30 bg-[#f6f6f3]/90 dark:bg-[#0b0d11]/90 backdrop-blur border-b border-[#e3e3dc] dark:border-[#1c212c] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1d4ed8] flex items-center justify-center text-white font-mono text-[11px] font-bold">
              A4
            </div>
            <span className="text-sm font-semibold">INT2210 // UET DSA</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMidtermOnly((m) => !m)}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                midtermOnly
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#171b24] text-slate-600 dark:text-slate-300'
              }`}
              title="Bật/Tắt Ôn Giữa Kỳ"
            >
              <Flame className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#171b24]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="p-1.5 rounded-lg border border-[#dcdcd4] dark:border-[#242b38] bg-white dark:bg-[#171b24]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="w-[260px] bg-[#f6f6f3] dark:bg-[#0e1117] border-r border-[#e3e3dc] dark:border-[#1c212c] h-full shadow-xl"
              >
                {sidebarContent}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-black/40 backdrop-blur-xs"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Canvas with smooth tab transitions */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1260px] w-full mx-auto space-y-4">
          {/* Desktop Global Mode Ribbon */}
          <div className="hidden sm:flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#12161f] border border-[#dcdcd4] dark:border-[#242b38] shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${midtermOnly ? 'bg-amber-500 animate-ping' : 'bg-blue-500'}`} />
              <span className="text-xs font-semibold text-[#14171a] dark:text-white">
                {midtermOnly ? 'Chế độ Ôn Thi Giữa Kỳ đang BẬT' : 'Chế độ Toàn bộ Giáo trình (Bao gồm Cuối Kỳ)'}
              </span>
              <span className="text-xs text-[#646970] dark:text-slate-400">
                {midtermOnly
                  ? '— Đã lọc tập trung 5 chuyên đề: Complexity, Sort, Stack/Queue, Heap, BST + AVL'
                  : '— Đầy đủ 11 tuần học, đồ thị và bảng băm'}
              </span>
            </div>

            <button
              onClick={() => setMidtermOnly((m) => !m)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                midtermOnly
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-400 shadow-xs'
                  : 'bg-[#f4f4f0] dark:bg-[#181d28] hover:bg-slate-200 dark:hover:bg-[#202736] text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{midtermOnly ? 'Chuyển sang xem Tất cả' : 'Bật lọc Giữa Kỳ'}</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {activeTab === 'roadmap' && (
                <RoadmapView
                  completedTaskIds={progress.completedTaskIds}
                  onToggleTask={handleToggleTask}
                  onNavigate={handleNavigate}
                  passedAlgoCount={passedAlgoCount}
                  totalAlgoCount={midtermOnly ? ALGORITHMS.filter((a) => a.isMidterm !== false).length : ALGORITHMS.length}
                  quizAccuracy={quizAccuracy}
                  midtermOnly={midtermOnly}
                />
              )}
              {activeTab === 'slides' && (
                <SlideReviewView onNavigate={handleNavigate} midtermOnly={midtermOnly} />
              )}
              {activeTab === 'codelab' && (
                <CodeLabView
                  selectedAlgoId={selectedAlgoId}
                  onSelectAlgo={setSelectedAlgoId}
                  apiSettings={apiSettings}
                  onUpdateApiSettings={handleUpdateApiSettings}
                  algoScores={progress.algoScores}
                  onSaveAlgoScore={handleSaveAlgoScore}
                  midtermOnly={midtermOnly}
                />
              )}
              {activeTab === 'quiz' && (
                <QuizView
                  apiSettings={apiSettings}
                  onUpdateApiSettings={handleUpdateApiSettings}
                  mcqAnswers={progress.mcqAnswers}
                  onAnswerMcq={handleAnswerMcq}
                  midtermOnly={midtermOnly}
                />
              )}
              {activeTab === 'java' && <JavaW3SchoolsView midtermOnly={midtermOnly} />}
              {activeTab === 'cheatsheet' && <CheatSheetView midtermOnly={midtermOnly} />}
              {activeTab === 'deploy' && (
                <DeployApiView
                  apiSettings={apiSettings}
                  onUpdateApiSettings={handleUpdateApiSettings}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
