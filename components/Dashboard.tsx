import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Filter, 
  Search, 
  ArrowRight,
  TestTube2,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import StatsCard from './StatsCard';
import PerformanceChart from './PerformanceChart';
import { Recommendation, Simulation } from '../types';
import LiveView from './LiveView';
import NewSimulationModal from './NewSimulationModal';

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  { id: '1', action: 'Shift 20% ad budget from LinkedIn to Google Ads', category: 'Marketing', categoryColor: 'bg-pink-500', impact: 'High', impactColor: 'text-green-500', status: 'Pending' },
  { id: '2', action: 'Increase SDR headcount for EMEA region', category: 'Sales', categoryColor: 'bg-blue-500', impact: 'Medium', impactColor: 'text-yellow-500', status: 'Pending' },
  { id: '3', action: 'Shorten Free Trial from 14 to 7 days', category: 'Product', categoryColor: 'bg-purple-500', impact: 'High', impactColor: 'text-green-500', status: 'Implemented' },
  { id: '4', action: 'Automate post-demo follow-up sequence', category: 'RevOps', categoryColor: 'bg-cyan-500', impact: 'Low', impactColor: 'text-zinc-500', status: 'Dismissed' },
];

const INITIAL_SIMULATIONS: Simulation[] = [
  { id: '1', hypothesis: 'Q3 Pricing Adjustment (+15%)', status: 'Running', confidenceScore: 85, predictedImpact: '+12% Rev', ownerName: 'Sarah J', ownerAvatar: 'https://picsum.photos/32/32?random=1' },
  { id: '2', hypothesis: 'Reduce CAC via Content Marketing', status: 'Completed', confidenceScore: 92, predictedImpact: '-5% CAC', ownerName: 'Mike R', ownerAvatar: 'https://picsum.photos/32/32?random=2' },
  { id: '3', hypothesis: 'Enterprise Tier Feature Gating', status: 'Draft', confidenceScore: 60, predictedImpact: 'Unknown', ownerName: 'Alex D', ownerAvatar: 'https://picsum.photos/32/32?random=3' },
];

const Dashboard: React.FC = () => {
  const [showLiveView, setShowLiveView] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);
  const [simulations, setSimulations] = useState<Simulation[]>(INITIAL_SIMULATIONS);

  const handleAddSimulation = (newSim: Simulation) => {
    setSimulations(prev => [newSim, ...prev]);
  };

  if (showLiveView) {
    return <LiveView onClose={() => setShowLiveView(false)} />;
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <NewSimulationModal 
        isOpen={showSimModal} 
        onClose={() => setShowSimModal(false)}
        onRun={handleAddSimulation}
      />

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            MindVerse Command Center
          </h1>
          <p className="text-zinc-400 text-sm">
            AI-Driven Insights for <span className="text-white font-medium">Q3 2025 Strategy</span>. You have <span className="text-blue-400 font-medium">2 High Impact</span> recommendations pending.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowLiveView(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-zinc-800 text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors relative"
          >
            <Activity size={16} />
            <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live View
          </button>
           <button 
             onClick={() => setShowSimModal(true)}
             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 group"
           >
            <TestTube2 size={16} className="group-hover:rotate-12 transition-transform" />
            New Simulation
          </button>
        </div>
      </div>

      {/* Stats Grid - GTM Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Revenue" 
          value="$3.8M" 
          change="+12%" 
          subtext="vs last quarter" 
          icon={<DollarSign size={20} />} 
        />
        <StatsCard 
          title="Pipeline Velocity" 
          value="14 Days" 
          change="-2 days" 
          subtext="Efficiency up" 
          icon={<Activity size={20} />} 
        />
        <StatsCard 
          title="Cust. Acquisition Cost" 
          value="$420" 
          change="-5%" 
          subtext="vs last month" 
          icon={<Users size={20} />} 
        />
        <StatsCard 
          title="Active Experiments" 
          value={simulations.filter(s => s.status === 'Running').length} 
          change="Running" 
          subtext="Simulations active" 
          icon={<TestTube2 size={20} />} 
        />
      </div>

      {/* Middle Section: Action Engine + Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Recommended Actions (Action Engine) */}
        <div className="lg:col-span-2 bg-[#18181b] border border-zinc-800/60 rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <BrainCircuit size={18} className="text-blue-500" />
                    Action Engine
                </h3>
                <p className="text-xs text-zinc-500 mt-1">AI-generated recommendations to optimize GTM performance</p>
            </div>
            <button className="px-3 py-2 bg-[#09090b] border border-zinc-800 text-zinc-300 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-zinc-800">
                <Filter size={14} /> Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800/50">
                  <th className="font-medium py-3 pl-2">Recommendation</th>
                  <th className="font-medium py-3">Category</th>
                  <th className="font-medium py-3">Predicted Impact</th>
                  <th className="font-medium py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {MOCK_RECOMMENDATIONS.map(rec => (
                  <tr key={rec.id} className="group hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pl-2 max-w-xs">
                      <div className="flex items-start gap-3">
                         <div className={`mt-0.5 min-w-[6px] w-1.5 h-1.5 rounded-full ${rec.categoryColor}`} />
                         <span className={`text-zinc-200 font-medium ${rec.status === 'Dismissed' ? 'line-through text-zinc-600' : ''}`}>{rec.action}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-zinc-400 text-xs px-2 py-1 bg-zinc-800 rounded border border-zinc-700">{rec.category}</span>
                    </td>
                    <td className="py-3">
                         <span className={`text-xs font-bold ${rec.impactColor}`}>{rec.impact} Impact</span>
                    </td>
                    <td className="py-3 text-right">
                        {rec.status === 'Pending' && (
                            <button className="text-blue-400 hover:text-white text-xs font-medium flex items-center gap-1 justify-end w-full group-hover:underline">
                                Execute <ArrowRight size={12} />
                            </button>
                        )}
                        {rec.status === 'Implemented' && (
                            <span className="text-green-500 text-xs flex items-center justify-end gap-1"><CheckCircle2 size={12} /> Live</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart - Revenue Analysis */}
        <div className="lg:col-span-1 h-full">
          <PerformanceChart />
        </div>
      </div>

      {/* Active Simulations (Experiment) */}
      <div className="bg-[#18181b] border border-zinc-800/60 rounded-2xl p-6">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <TestTube2 size={18} className="text-purple-500" />
                    Active Simulations
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Hypothesis testing environment</p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                 <input 
                  type="text" 
                  placeholder="Search simulations..." 
                  className="w-full sm:w-48 bg-[#09090b] text-zinc-300 text-xs rounded-lg pl-9 pr-3 py-2 border border-zinc-800 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800/50">
                  <th className="font-medium py-3 pl-2">Hypothesis</th>
                  <th className="font-medium py-3">Status</th>
                  <th className="font-medium py-3">Confidence</th>
                  <th className="font-medium py-3">Predicted Outcome</th>
                  <th className="font-medium py-3">Owner</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {simulations.map(sim => (
                  <tr key={sim.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/30 transition-colors last:border-0">
                    <td className="py-4 pl-2">
                       <span className="font-medium text-zinc-200">{sim.hypothesis}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        sim.status === 'Running' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        sim.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      }`}>
                        {sim.status === 'Running' && <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                        {sim.status}
                      </span>
                    </td>
                    <td className="py-4 min-w-[140px] pr-6">
                      <div className="flex items-center gap-3">
                         <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 rounded-full" style={{ width: `${sim.confidenceScore}%` }}></div>
                         </div>
                         <span className="text-xs text-zinc-400 w-8">{sim.confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-zinc-300 font-mono text-xs">
                      {sim.predictedImpact}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <img src={sim.ownerAvatar} alt={sim.ownerName} className="w-6 h-6 rounded-full border border-zinc-700" />
                        <span className="text-zinc-400 text-xs">{sim.ownerName}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </main>
  );
};

export default Dashboard;
