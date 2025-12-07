import React from 'react';
import { X, Bell, Calendar, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationItem | null;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={24} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={24} className="text-yellow-500" />;
      case 'error': return <AlertCircle size={24} className="text-red-500" />;
      default: return <Info size={24} className="text-blue-500" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
      case 'error': return 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
      default: return 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity" 
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-[#18181b] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 animate-in slide-in-from-right">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
               <Bell size={20} />
             </div>
             <h3 className="font-bold text-zinc-900 dark:text-white">Notification</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
           <div className={`p-4 rounded-xl border mb-6 flex items-start gap-4 ${getColor(notification.type)}`}>
              <div className="shrink-0 mt-0.5">
                 {getIcon(notification.type)}
              </div>
              <div>
                 <h2 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{notification.title}</h2>
                 <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">{notification.message}</p>
              </div>
           </div>

           <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-6 px-1">
              <Calendar size={14} />
              <span>Received {notification.time}</span>
           </div>

           <div className="prose dark:prose-invert prose-sm max-w-none">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Details</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                 {notification.details || "No additional details available for this notification."}
              </p>
           </div>

           <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Related Actions</h4>
              <div className="flex flex-col gap-2">
                 <button className="w-full py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors text-left">
                    Mark as Unread
                 </button>
                 <button className="w-full py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors text-left">
                    Archive Notification
                 </button>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;