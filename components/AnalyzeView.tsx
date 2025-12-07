import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { BrainCircuit, ArrowUpRight, ArrowDownRight, TrendingUp, HelpCircle } from 'lucide-react';
import { Insight } from '../types';

const INSIGHTS: Insight[] = [
  { id: '1', title: 'LinkedIn Ad Spend Efficiency', description: 'Correlation between LinkedIn spend and Enterprise SQLs has dropped by 15% in Q3.', type: 'negative', metric: 'ROI', impact: '-15%' },
  { id: '2', title: 'SDR Response Time', description: 'Leads contacted within 5 mins convert 3x higher. Currently at 42% compliance.', type: 'positive', metric: 'Conversion', impact: '3.0x' },
  { id: '3', title: 'Churn in Mid-Market', description: 'Pricing tier "Growth" seeing 2% higher churn. Root cause identified as onboarding friction.', type: 'negative', metric: 'Churn', impact: '+2%' },
];

const CORRELATION_DATA = [
  { x: 1000, y: 200, z: 200 },
  { x: 2000, y: 350, z: 260 },
  { x: 3000, y: 450, z: 400 },
  { x: 4000, y: 750, z: 280 },
  { x: 5000, y: 800, z: 500 },
  { x: 6000, y: 950, z: 200 },
  { x: 7000, y: 1100, z: 300 },
  { x: 8000, y: 1050, z: 100 },
];

const DRIVER_DATA = [
  { name: 'Enterprise Deals', value: 45, type: 'positive' },
  { name: 'Expansion Revenue', value: 20, type: 'positive' },
  { name: 'New Logos (SMB)', value: 10, type: 'positive' },
  { name: 'Churn (MM)', value: -15, type: 'negative' },
  { name: 'Discounting', value: -8, type: 'negative' },
];

const AnalyzeView: React.FC = () => {
  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          Analyze
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Root cause analysis and revenue drivers.
        </p>
      </div>

      {/* AI Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <BrainCircuit size={120} className="text-blue-500" />
        </div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20">
             <BrainCircuit size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Executive Summary (Q3)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed max-w-4xl">
              Revenue is tracking <span className="text-green-600 dark:text-green-400 font-bold">12% above forecast</span>, primarily driven by strong Enterprise expansion. 
              However, <span className="text-red-500 dark:text-red-400 font-bold">Mid-Market churn</span> has increased slightly due to onboarding delays. 
              Marketing ROI on LinkedIn has dipped, suggesting a need to reallocate budget to high-intent Search channels.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Revenue Drivers Chart */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-colors">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Revenue Drivers (Impact %)</h3>
              <HelpCircle size={16} className="text-zinc-400 dark:text-zinc-500" />
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={DRIVER_DATA} margin={{ left: 40, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'var(--tooltip-bg, #18181b)', borderColor: 'var(--tooltip-border, #27272a)', color: 'var(--tooltip-text, #fff)' }}
                  />
                  <Bar dataKey="value" barSize={24} radius={[4, 4, 4, 4]}>
                    {DRIVER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'positive' ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Correlation Scatter Plot */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-colors">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="font-semibold text-zinc-900 dark:text-white">Spend vs. Lead Volume</h3>
                 <p className="text-xs text-zinc-500">Correlation Analysis</p>
              </div>
              <div className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-300">R² = 0.84</div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} />
                  <XAxis type="number" dataKey="x" name="Ad Spend" unit="$" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="y" name="Leads" unit="" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'var(--tooltip-bg, #18181b)', borderColor: 'var(--tooltip-border, #27272a)', color: 'var(--tooltip-text, #fff)' }} />
                  <Scatter name="Campaigns" data={CORRELATION_DATA} fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Insights Grid */}
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Key Anomalies & Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INSIGHTS.map((insight) => (
           <div key={insight.id} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm dark:shadow-none">
              <div className="flex justify-between items-start mb-3">
                 <span className={`p-2 rounded-lg ${
                    insight.type === 'positive' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500'
                 }`}>
                    {insight.type === 'positive' ? <TrendingUp size={18} /> : <ArrowDownRight size={18} />}
                 </span>
                 <div className="text-right">
                    <div className={`text-lg font-bold ${
                        insight.type === 'positive' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                    }`}>{insight.impact}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Impact on {insight.metric}</div>
                 </div>
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-2">{insight.title}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{insight.description}</p>
           </div>
        ))}
      </div>
    </main>
  );
};

export default AnalyzeView;