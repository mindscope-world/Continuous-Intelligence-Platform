import React from 'react';
import { Moon, Sun, User, Bell, Shield, Key, LogOut } from 'lucide-react';

interface SettingsViewProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ theme, onToggleTheme }) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Manage your account preferences and application appearance.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Interface Theme</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Select your preferred display mode.</p>
              </div>
            </div>
            
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => theme === 'dark' && onToggleTheme()}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  theme === 'light' 
                    ? 'bg-white shadow-sm text-zinc-900' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Sun size={14} /> Light
              </button>
              <button
                onClick={() => theme === 'light' && onToggleTheme()}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-zinc-700 shadow-sm text-white' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Moon size={14} /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* Profile Section (Placeholder) */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Profile Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
               <img src="https://picsum.photos/64/64?random=4" alt="Profile" className="w-16 h-16 rounded-full" />
               <div className="flex-1">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">Change Avatar</button>
                  <p className="text-xs text-zinc-500">JPG, GIF or PNG. 1MB max.</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Full Name</label>
                  <input type="text" defaultValue="John Cornor" className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Email Address</label>
                  <input type="email" defaultValue="john@mindverse.io" className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500" />
               </div>
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                 <Bell className="text-zinc-400" size={20} />
                 <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications</h3>
              </div>
              <div className="space-y-3">
                 {['Weekly KPI Digest', 'Simulation Completed', 'New Anomaly Detected'].map(item => (
                    <div key={item} className="flex items-center justify-between">
                       <span className="text-sm text-zinc-600 dark:text-zinc-400">{item}</span>
                       <div className="w-9 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                 <Shield className="text-zinc-400" size={20} />
                 <h3 className="font-semibold text-zinc-900 dark:text-white">Security</h3>
              </div>
              <div className="space-y-3">
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-2 transition-colors">
                    <Key size={14} /> Change Password
                 </button>
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-2 transition-colors">
                    <Shield size={14} /> 2FA Authentication
                 </button>
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-sm text-red-600 flex items-center gap-2 transition-colors">
                    <LogOut size={14} /> Sign Out
                 </button>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsView;