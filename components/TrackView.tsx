import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertCircle, 
  CheckCircle2, 
  Target,
  BarChart2,
  PieChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { KPI } from '../types';

const KPIS: KPI[] = [
  { id: '1', label: 'Annual Recurring Revenue', value: '$3.8M', target: '$4.2M', status: 'At Risk', trend: 'up', trendValue: '+12%', category: 'Finance' },
  { id: '2', label: 'Customer Acquisition Cost', value: '$420', target: '$400', status: 'Healthy', trend: 'down', trendValue: '-5%', category: 'Marketing' },
  { id: '3', label: 'Pipeline Velocity', value: '14 Days', target: '18 Days', status: 'Healthy', trend: 'up', trendValue: '+22%', category: 'Sales' },
  { id: '4', label: 'Churn Rate', value: '4.2%', target: '3.0%', status: 'Critical', trend: 'up', trendValue: '+0.8%', category: 'Finance' },
  { id: '5', label: 'MQL to SQL Conversion', value: '32%', target: '30%', status: 'Healthy', trend: 'up', trendValue: '+4%', category: 'Marketing' },
  { id: '6', label: 'Net Revenue Retention', value: '108%', target: '115%', status: 'At Risk', trend: 'flat', trendValue: '0%', category: 'Finance' },
];

const REVENUE_DATA = [
  { month: 'Jan', actual: 280, target: 300 },
  { month: 'Feb', actual: 310, target: 320 },
  { month: 'Mar', actual: 380, target: 350 },
  { month: 'Apr', actual: 390, target: 400 },
  { month: 'May', actual: 410, target: 440 },
  { month: 'Jun', actual: 440, target: 480 },
];

const FUNNEL_DATA = [
  { stage: 'Visitors', value: 12000, fill: '#3b82f6' }, // blue-500
  { stage: 'Leads', value: 4500, fill: '#6366f1' },    // indigo-500
  { stage: 'MQLs', value: 1800, fill: '#8b5cf6' },     // violet-500
  { stage: 'SQLs', value: 900, fill: '#a855f7' },      // purple-500
  { stage: 'Wins', value: 320, fill: '#d946ef' },      // fuchsia-500
];

const TrackView: React.FC = () => {
  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          Track (KPIs)
        </h1>
        <p className="text-zinc-400 text-sm">
          Continuous monitoring of key business drivers against Q3 Goals.
        </p>
      </div>

      {/* Top: Goal Tracking Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Q3 Revenue Target', current: '$3.8M', target: '$4.5M', percent: 84, color: 'bg-blue-500' },
          { label: 'New Enterprise Logos', current: '18', target: '25', percent: 72, color: 'bg-purple-500' },
          { label: 'Net Dollar Retention', current: '108%', target: '115%', percent: 93, color: 'bg-green-500' },
        ].map((goal, idx) => (
          <div key={idx} className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-zinc-300">{goal.label}</span>
              <Target size={16} className="text-zinc-500" />
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-2xl font-bold text-white">{goal.current}</span>
              <span className="text-xs text-zinc-500 mb-1">/ {goal.target}</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${goal.color}`} 
                style={{ width: `${goal.percent}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right text-xs text-zinc-400">{goal.percent}% Achieved</div>
          </div>
        ))}
      </div>

      {/* Middle: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue vs Target */}
        <div className="lg:col-span-2 bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <BarChart2 size={18} className="text-zinc-400" />
              Revenue vs Target
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Actual
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div> Target
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                  tickFormatter={(val) => `$${val}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="target" stroke="#3f3f46" strokeDasharray="5 5" strokeWidth={2} fillOpacity={0} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marketing Funnel */}
        <div className="lg:col-span-1 bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
           <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
              <PieChart size={18} className="text-zinc-400" />
              Marketing Funnel (Q3)
           </h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={FUNNEL_DATA} margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="stage" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                    width={60}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {FUNNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Bottom: Detailed KPI Grid */}
      <h3 className="text-lg font-bold text-white mb-4">Detailed Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {KPIS.map((kpi) => (
          <div key={kpi.id} className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
               <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{kpi.category}</span>
               <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                 kpi.status === 'Healthy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                 kpi.status === 'At Risk' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                 'bg-red-500/10 text-red-400 border-red-500/20'
               }`}>
                  {kpi.status === 'Healthy' && <CheckCircle2 size={10} />}
                  {kpi.status === 'At Risk' && <Minus size={10} />}
                  {kpi.status === 'Critical' && <AlertCircle size={10} />}
                  {kpi.status}
               </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                 <h4 className="text-zinc-300 font-medium text-sm mb-1">{kpi.label}</h4>
                 <div className="text-2xl font-bold text-white">{kpi.value}</div>
              </div>
              <div className="text-right">
                <div className={`flex items-center justify-end gap-1 font-bold text-sm ${
                  kpi.trend === 'up' && kpi.status === 'Critical' ? 'text-red-500' :
                  kpi.trend === 'up' ? 'text-green-500' : 
                  kpi.trend === 'down' && (kpi.label.includes('Cost') || kpi.label.includes('Churn')) ? 'text-green-500' :
                  kpi.trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                }`}>
                   {kpi.trend === 'up' && <TrendingUp size={14} />}
                   {kpi.trend === 'down' && <TrendingDown size={14} />}
                   {kpi.trend === 'flat' && <Minus size={14} />}
                   {kpi.trendValue}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">Target: {kpi.target}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TrackView;