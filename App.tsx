import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrackView from './components/TrackView';
import AnalyzeView from './components/AnalyzeView';
import ExperimentView from './components/ExperimentView';
import DataSourcesView from './components/DataSourcesView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';
import EnterpriseView from './components/EnterpriseView';
import GeminiChat from './components/GeminiChat';
import NotificationPanel from './components/NotificationPanel';
import ShareModal from './components/ShareModal';
import { Menu, Share2, Bell, Search, Copy, Check } from 'lucide-react';
import { ViewState, NotificationItem } from './types';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Analysis Complete',
    message: 'Q3 Revenue Drivers report is ready for review.',
    time: 'Just now',
    read: false,
    type: 'info',
    details: 'The comprehensive analysis for Q3 Revenue Drivers has been finalized. Key findings include a 12% increase in Enterprise expansion and a slight dip in Mid-Market retention. Click to view the full report in the Analyze tab.'
  },
  {
    id: '2',
    title: 'Goal Reached',
    message: 'You hit the daily MQL target (45/45).',
    time: '2 hours ago',
    read: true,
    type: 'success',
    details: 'Congratulations! The marketing team has successfully hit the daily Marketing Qualified Leads (MQL) target of 45. This puts us on track to exceed the weekly goal by Friday. Top performing channel: Organic Search.'
  },
  {
    id: '3',
    title: 'Anomaly Detected',
    message: 'Unusual spike in churn rate detected in EMEA region.',
    time: '5 hours ago',
    read: false,
    type: 'warning',
    details: 'Our AI monitoring systems have flagged a statistical anomaly in the EMEA region churn rate. It has risen by 2.4% over the last 24 hours. Recommended action: Investigate recent support tickets and product outages in that region.'
  }
];

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showShareToast, setShowShareToast] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Notification States
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

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

  const handleNotificationClick = (notification: NotificationItem) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    
    // Open panel
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
    setSelectedNotification(null);
  };

  const handleArchiveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotification(null);
  };

  const formattedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const unreadCount = notifications.filter(n => !n.read).length;

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
      case 'enterprise':
        return <EnterpriseView />;
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
      case 'enterprise': return 'Plans & Billing';
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
              <span className="text-xs text-zinc-500 hidden sm:block">Last Updated {formattedDate}</span>
              
              {/* Team Avatars */}
              <div className="flex -space-x-2 cursor-pointer hover:space-x-1 transition-all duration-300 group" title="Active Team Members">
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] ring-2 ring-transparent group-hover:ring-zinc-200 dark:group-hover:ring-zinc-700 transition-all object-cover" src="https://picsum.photos/32/32?random=4" alt="User" />
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] ring-2 ring-transparent group-hover:ring-zinc-200 dark:group-hover:ring-zinc-700 transition-all object-cover" src="https://picsum.photos/32/32?random=5" alt="User" />
                 <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] ring-2 ring-transparent group-hover:ring-zinc-200 dark:group-hover:ring-zinc-700 transition-all object-cover" src="https://picsum.photos/32/32?random=6" alt="User" />
                 <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                    +3
                 </div>
              </div>

              {/* Notifications Button */}
              <div className="relative">
                 <button 
                   onClick={() => setShowNotifications(!showNotifications)}
                   className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full flex items-center justify-center relative"
                 >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#09090b]"></span>
                    )}
                 </button>

                 {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-[#18181b]">
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-xs">Notifications</h4>
                            {unreadCount > 0 && (
                              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">{unreadCount} New</span>
                            )}
                        </div>
                        <div className="max-h-64 overflow-y-auto bg-white dark:bg-[#18181b]">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-xs text-zinc-500">No new notifications</div>
                            ) : (
                                notifications.map(notification => (
                                    <div 
                                      key={notification.id}
                                      onClick={() => handleNotificationClick(notification)}
                                      className="p-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer last:border-0"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                           {!notification.read && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>}
                                           <p className={`text-xs font-medium ${notification.read ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-900 dark:text-white'}`}>
                                             {notification.title}
                                           </p>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{notification.message}</p>
                                        <p className="text-[10px] text-zinc-400 mt-1.5">{notification.time}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                 )}
              </div>

              {/* Share Button */}
              <div className="relative">
                  <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full flex items-center justify-center"
                    title="Share Dashboard"
                  >
                     <Share2 size={18} />
                  </button>
              </div>
           </div>
        </header>

        {renderContent()}
      </div>

      <GeminiChat isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      <NotificationPanel 
        isOpen={!!selectedNotification} 
        onClose={() => setSelectedNotification(null)}
        notification={selectedNotification}
        onMarkUnread={handleMarkAsUnread}
        onArchive={handleArchiveNotification}
      />

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        pageTitle={getPageTitle()}
      />
      
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
