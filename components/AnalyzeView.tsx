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
  Cell,
  ReferenceLine
} from 'recharts';
import { BrainCircuit, ArrowUpRight, ArrowDownRight, TrendingUp, HelpCircle, RefreshCw, Sparkles } from 'lucide-react';
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
  
  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18181b] border border-zinc-800 p-3 rounded-lg shadow-xl z-50">
          <p className="text-zinc-400 text-xs mb-1">Campaign Metric</p>
          <div className="flex flex-col gap-1">
             <div className="flex justify-between gap-4">
                <span className="text-zinc-300 text-xs">Ad Spend:</span>
                <span className="text-blue-400 font-mono text-xs font-bold">${payload[0].value}</span>
             </div>
             <div className="flex justify-between gap-4">
                <span className="text-zinc-300 text-xs">Leads Generated:</span>
                <span className="text-green-400 font-mono text-xs font-bold">{payload[1].value}</span>
             </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18181b] border border-zinc-800 p-3 rounded-lg shadow-xl z-50">
          <p className="text-white font-medium text-xs mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs">Impact:</span>
            <span className={`font-mono text-xs font-bold ${payload[0].payload.type === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
               {payload[0].value > 0 ? '+' : ''}{payload[0].value}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-6 mb-8 relative overflow-hidden transition-colors group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <BrainCircuit size={140} className="text-blue-500" />
        </div>
        <div className="absolute top-4 right-4">
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded-full text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 transition-all backdrop-blur-sm">
                 <RefreshCw size={12} /> Regenerate
             </button>
        </div>
        <div className="flex items-start gap-5 relative z-10">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-900/20 shrink-0">
             <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                Executive Summary
                <span className="text-[10px] font-normal text-zinc-500 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800">Q3 Analysis</span>
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed max-w-4xl">
              Revenue is tracking <span className="text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-500/10 px-1 rounded">12% above forecast</span>, primarily driven by strong Enterprise expansion. 
              However, <span className="text-red-500 dark:text-red-400 font-bold bg-red-100 dark:bg-red-500/10 px-1 rounded">Mid-Market churn</span> has increased slightly due to onboarding delays. 
              Marketing ROI on LinkedIn has dipped, suggesting a need to reallocate budget to high-intent Search channels.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Revenue Drivers Chart */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-colors shadow-sm dark:shadow-none">
           <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">Revenue Drivers</h3>
                <p className="text-xs text-zinc-500 mt-1">Factors impacting monthly growth (Attribution %)</p>
              </div>
              <HelpCircle size={16} className="text-zinc-400 dark:text-zinc-500 cursor-help" />
           </div>
           <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={DRIVER_DATA} margin={{ left: 40, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                    width={110}
                  />
                  <ReferenceLine x={0} stroke="#52525b" />
                  <Tooltip cursor={{fill: 'transparent'}} content={<CustomBarTooltip />} />
                  <Bar dataKey="value" barSize={28} radius={[4, 4, 4, 4]}>
                    {DRIVER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'positive' ? '#10b981' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Correlation Scatter Plot */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-colors shadow-sm dark:shadow-none">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="font-semibold text-zinc-900 dark:text-white">Spend vs. Lead Volume</h3>
                 <p className="text-xs text-zinc-500 mt-1">Campaign Correlation Analysis</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="text-[10px] text-zinc-400 uppercase tracking-wide">Correlation</div>
                 <div className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-900 dark:text-zinc-200 font-mono font-bold">R² = 0.84</div>
              </div>
           </div>
           <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.1} />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Ad Spend" 
                    unit="$" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Leads" 
                    unit="" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                  <Scatter name="Campaigns" data={CORRELATION_DATA} fill="#3b82f6">
                    {CORRELATION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.6} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Insights Grid */}
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
         <Sparkles size={18} className="text-yellow-500" />
         Key Anomalies & Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INSIGHTS.map((insight) => (
           <div key={insight.id} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm dark:shadow-none group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                 <span className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
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
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{insight.title}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{insight.description}</p>
           </div>
        ))}
      </div>
    </main>
  );
};

export default AnalyzeView;