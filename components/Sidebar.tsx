import React, { ReactElement } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  TestTube2, 
  Database, 
  Settings, 
  HelpCircle, 
  Search, 
  Sparkles,
  Zap,
  LineChart
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  onOpenAI: () => void;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenAI, activeView, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-900 flex flex-col p-4 z-40 hidden md:flex transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <Sparkles className="text-white w-5 h-5" />
        </div>
        <div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight block leading-none">MINDVERSE</span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wider block">INTELLIGENCE</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Ask MindVerse..." 
          className="w-full bg-zinc-50 dark:bg-[#18181b] text-zinc-900 dark:text-zinc-300 text-sm rounded-lg pl-9 pr-3 py-2.5 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
        />
      </div>

      {/* Primary Nav */}
      <nav className="space-y-1 mb-8">
        <button 
          onClick={onOpenAI}
          className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
        >
          <div className="p-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Conversational AI</span>
        </button>
      </nav>

      {/* Main Menu */}
      <div className="space-y-1 flex-1">
        <div className="px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-600 mb-2 uppercase tracking-wider">Platform</div>
        <NavItem 
          icon={<LayoutDashboard />} 
          label="Command Center" 
          active={activeView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem 
          icon={<BarChart2 />} 
          label="Track (KPIs)" 
          active={activeView === 'track'} 
          onClick={() => onNavigate('track')}
        />
        <NavItem 
          icon={<LineChart />} 
          label="Analyze" 
          active={activeView === 'analyze'} 
          onClick={() => onNavigate('analyze')}
        />
        <NavItem 
          icon={<TestTube2 />} 
          label="Experiment" 
          active={activeView === 'experiment'} 
          onClick={() => onNavigate('experiment')}
        />
        <NavItem 
          icon={<Database />} 
          label="Data Sources" 
          active={activeView === 'data'} 
          onClick={() => onNavigate('data')}
        />
        
        <div className="px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-600 mb-2 uppercase tracking-wider mt-6">System</div>
        <NavItem 
          icon={<Settings />} 
          label="Settings" 
          active={activeView === 'settings'} 
          onClick={() => onNavigate('settings')}
        />
        <NavItem 
          icon={<HelpCircle />} 
          label="Help & Center" 
          active={activeView === 'help'} 
          onClick={() => onNavigate('help')}
        />
      </div>

      {/* Upgrade Card */}
      <div className="mt-auto relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-4 transition-colors duration-300">
         <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
         
         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-yellow-600 dark:text-yellow-500">
               <Zap size={16} fill="currentColor" />
            </div>
            <h4 className="text-zinc-900 dark:text-white font-semibold text-sm">Enterprise</h4>
         </div>
         <p className="text-xs text-zinc-500 mb-3 leading-relaxed">Unlock advanced GTM simulations and unlimited data connectors.</p>
         <button 
            onClick={() => onNavigate('enterprise')}
            className="w-full py-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold rounded-lg transition-colors"
         >
            Upgrade Plan
         </button>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800/50 shadow-sm' 
        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
    }`}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as ReactElement<{ className?: string }>, { className: "w-4 h-4" }) : icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Sidebar;