import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Globe, DollarSign, Users, X, ArrowUpRight, Zap } from 'lucide-react';
import { LiveEvent } from '../types';

interface LiveViewProps {
  onClose: () => void;
}

// Mock initial data for the chart
const INITIAL_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  traffic: 100 + Math.random() * 50,
  leads: 20 + Math.random() * 10
}));

const EVENT_TEMPLATES = [
  { type: 'Revenue', message: 'New Enterprise Deal Closed', value: '+$12,500' },
  { type: 'Lead', message: 'MQL Qualification Threshold Met', value: 'High Intent' },
  { type: 'Traffic', message: 'Spike in organic traffic (EMEA)', value: '+140 users' },
  { type: 'System', message: 'Data Sync: HubSpot <-> Salesforce', value: 'Success' },
  { type: 'Revenue', message: 'Subscription Upgrade', value: '+$450/mo' },
];

const LiveView: React.FC<LiveViewProps> = ({ onClose }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastTime = prev[prev.length - 1].time;
        const newPoint = {
          time: lastTime + 1,
          traffic: 100 + Math.random() * 100, // Random fluctuation
          leads: 20 + Math.random() * 20
        };
        return [...prev.slice(1), newPoint]; // Keep window size constant
      });

      // Randomly add events
      if (Math.random() > 0.6) {
        const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
        const newEvent: LiveEvent = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: template.type as any,
          message: template.message,
          value: template.value,
          delta: 'positive'
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
      }

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090b] relative animate-in fade-in duration-300">
      {/* Header overlay */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <div>
             <h2 className="text-xl font-bold text-white tracking-tight">Live GTM Monitor</h2>
             <p className="text-xs text-zinc-400 font-mono">Connection: STABLE • Latency: 24ms</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-sm text-zinc-300 transition-colors flex items-center gap-2"
        >
          <X size={16} /> Exit Live View
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Charts */}
        <div className="flex-1 p-6 border-r border-zinc-800 flex flex-col gap-6 overflow-y-auto">
          {/* Live Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800/60">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase mb-2">
                    <Users size={14} /> Active Users
                </div>
                <div className="text-2xl font-bold text-white font-mono">{Math.floor(data[data.length-1].traffic * 12)}</div>
             </div>
             <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800/60">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase mb-2">
                    <Activity size={14} /> Requests/Sec
                </div>
                <div className="text-2xl font-bold text-blue-400 font-mono">{Math.floor(data[data.length-1].traffic)}</div>
             </div>
             <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800/60">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase mb-2">
                    <DollarSign size={14} /> Est. Revenue (Hr)
                </div>
                <div className="text-2xl font-bold text-green-400 font-mono">$4,280</div>
             </div>
          </div>

          {/* Main Chart */}
          <div className="flex-1 bg-[#18181b] rounded-2xl border border-zinc-800/60 p-4 min-h-[300px] flex flex-col">
             <h3 className="text-sm font-medium text-zinc-400 mb-4">Real-time Traffic Ingestion</h3>
             <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis hide dataKey="time" />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="traffic" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorTraffic)" 
                        isAnimationActive={false}
                    />
                     <Area 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorLeads)" 
                        isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Right: Event Log */}
        <div className="w-full lg:w-96 bg-[#0c0c0e] flex flex-col border-l border-zinc-800">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
             <h3 className="text-sm font-semibold text-white">Event Stream</h3>
             <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">Auto-scrolling</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 relative" ref={scrollRef}>
             {events.map((event) => (
               <div key={event.id} className="flex gap-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-col items-center gap-1 min-w-[40px]">
                      <span className="text-[10px] text-zinc-500 font-mono">{event.timestamp}</span>
                      <div className="w-px h-full bg-zinc-800/50"></div>
                  </div>
                  <div className="flex-1 pb-4">
                     <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                            event.type === 'Revenue' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            event.type === 'Traffic' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            event.type === 'Lead' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                            'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                        }`}>
                            {event.type}
                        </span>
                        {event.value && <span className="text-xs font-semibold text-white">{event.value}</span>}
                     </div>
                     <p className="text-sm text-zinc-400 leading-tight">{event.message}</p>
                  </div>
               </div>
             ))}
             {events.length === 0 && (
                <div className="text-center py-10 text-zinc-600 italic text-sm">Waiting for live events...</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveView;
