import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrackView from './components/TrackView';
import AnalyzeView from './components/AnalyzeView';
import ExperimentView from './components/ExperimentView';
import DataSourcesView from './components/DataSourcesView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';
import GeminiChat from './components/GeminiChat';
import { Menu, Share2, Bell, Search } from 'lucide-react';
import { ViewState } from './types';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handle Theme Toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'track':
        return <TrackView />;
      case 'analyze':
        return <AnalyzeView />;
      case 'experiment':
        return <ExperimentView />;
      case 'data':
        return <DataSourcesView />;
      case 'settings':
        return <SettingsView theme={theme} onToggleTheme={toggleTheme} />;
      case 'help':
        return <HelpView />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Command Center';
      case 'track': return 'Track (KPIs)';
      case 'analyze': return 'Analyze';
      case 'experiment': return 'Experiment';
      case 'data': return 'Data Sources';
      case 'settings': return 'Settings';
      case 'help': return 'Help & Center';
      default: return 'Command Center';
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <Sidebar 
        onOpenAI={() => setIsAiOpen(true)} 
        activeView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/60 px-8 py-4 flex justify-between items-center transition-colors duration-300">
           <div className="flex items-center gap-4">
             <button className="md:hidden text-zinc-500 dark:text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
             </button>
             <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="hover:text-zinc-900 dark:hover:text-zinc-300 cursor-pointer transition-colors" onClick={() => setCurrentView('dashboard')}>Home</span> 
                <span>/</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">{getPageTitle()}</span>
             </div>
           </div>

           <div className="flex items-center gap-6">
              <span className="text-xs text-zinc-500 hidden sm:block">Last Updated 12 May 2025</span>
              <div className="flex -space-x-2">
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b]" src="https://picsum.photos/32/32?random=4" alt="User" />
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b]" src="https://picsum.photos/32/32?random=5" alt="User" />
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b]" src="https://picsum.photos/32/32?random=6" alt="User" />
              </div>
              <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative">
                 <Share2 size={18} />
              </button>
           </div>
        </header>

        {renderContent()}
      </div>

      <GeminiChat isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 p-4" onClick={e => e.stopPropagation()}>
              <Sidebar 
                onOpenAI={() => { setIsAiOpen(true); setIsMobileMenuOpen(false); }} 
                activeView={currentView}
                onNavigate={(view) => {
                  setCurrentView(view);
                  setIsMobileMenuOpen(false);
                }}
              />
           </div>
        </div>
      )}
    </div>
  );
}