import React from 'react';
import { X, CheckCircle2, TrendingUp, TrendingDown, ArrowRight, Target, BrainCircuit } from 'lucide-react';
import { Simulation } from '../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulation: Simulation | null;
}

const REPORT_DATA = [
  { day: 'Day 1', baseline: 100, projected: 100 },
  { day: 'Day 15', baseline: 105, projected: 112 },
  { day: 'Day 30', baseline: 110, projected: 125 },
  { day: 'Day 45', baseline: 112, projected: 138 },
  { day: 'Day 60', baseline: 115, projected: 145 },
  { day: 'Day 90', baseline: 118, projected: 156 },
];

const SimulationReportModal: React.FC<SimulationReportModalProps> = ({ isOpen, onClose, simulation }) => {
  if (!isOpen || !simulation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start bg-[#18181b]">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 size={12} /> Completed
               </span>
               <span className="text-zinc-500 text-xs font-mono">ID: {simulation.id}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{simulation.hypothesis}</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors bg-zinc-900 p-2 rounded-full hover:bg-zinc-800">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#09090b]">
           
           {/* Executive Summary */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="col-span-2">
                 <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 h-full relative overflow-hidden">
                    <div className="flex items-start gap-4 z-10 relative">
                        <BrainCircuit className="text-blue-500 mt-1" size={24} />
                        <div>
                            <h3 className="text-sm font-bold text-white mb-2">AI Impact Analysis</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Implementing this strategy shows a <strong className="text-green-400">high probability</strong> of positive outcome. 
                                Our models predict a direct correlation with increased pipeline velocity within 45 days. 
                                However, expect a short-term dip in engagement during the transition period (Week 1-2).
                            </p>
                            <div className="mt-4 flex gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{simulation.predictedImpact}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Primary Outcome</div>
                                </div>
                                <div className="w-px h-10 bg-zinc-800"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-500">{simulation.confidenceScore}%</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Confidence</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                 </div>
              </div>

              <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white mb-4">Risk Assessment</h3>
                 <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-400">Implementation Complexity</span>
                            <span className="text-yellow-500 font-medium">Medium</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full">
                            <div className="h-full w-[60%] bg-yellow-500 rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-400">Resource Drain</span>
                            <span className="text-green-500 font-medium">Low</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full">
                            <div className="h-full w-[25%] bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-400">Customer Friction</span>
                            <span className="text-blue-500 font-medium">Low</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full">
                            <div className="h-full w-[15%] bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Projection Chart */}
           <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-white text-sm">Projected Metric Trajectory</h3>
                 <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                        <span className="text-zinc-400">Baseline (No Change)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-white">With Strategy</span>
                    </div>
                 </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REPORT_DATA}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 12 }} 
                        dy={10}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="projected" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorProjected)" 
                        name="Projected"
                    />
                    <Area 
                        type="monotone" 
                        dataKey="baseline" 
                        stroke="#52525b" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        fillOpacity={0} 
                        name="Baseline"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs mb-1">Projected Revenue</div>
                  <div className="text-xl font-bold text-green-500 flex items-center gap-2">
                      +12.5% <TrendingUp size={16} />
                  </div>
              </div>
              <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs mb-1">CAC Impact</div>
                  <div className="text-xl font-bold text-green-500 flex items-center gap-2">
                      -4.2% <TrendingDown size={16} />
                  </div>
              </div>
              <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs mb-1">Time to Impact</div>
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                      14 Days <Target size={16} className="text-zinc-500" />
                  </div>
              </div>
              <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs mb-1">Team Load</div>
                  <div className="text-xl font-bold text-yellow-500 flex items-center gap-2">
                      +5% <TrendingUp size={16} />
                  </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-[#18181b] flex justify-between items-center">
            <div className="text-xs text-zinc-500">
                Simulation generated on {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-3">
                <button onClick={onClose} className="px-4 py-2 bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-sm font-medium transition-colors">
                    Close
                </button>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20">
                    Execute Strategy <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationReportModal;