import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  subtext: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, subtext, icon }) => {
  return (
    <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#27272a] flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2">
         <span className="text-xs font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{change}</span>
         <span className="text-xs text-zinc-500">{subtext}</span>
      </div>
    </div>
  );
};

export default StatsCard;