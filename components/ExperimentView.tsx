import React, { useState } from 'react';
import { 
  TestTube2, 
  Play, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Simulation } from '../types';
import NewSimulationModal from './NewSimulationModal';
import SimulationReportModal from './SimulationReportModal';

const INITIAL_SIMULATIONS: Simulation[] = [
  { id: '1', hypothesis: 'Q3 Pricing Adjustment (+15%)', status: 'Running', confidenceScore: 85, predictedImpact: '+12% Rev', ownerName: 'Sarah J', ownerAvatar: 'https://picsum.photos/32/32?random=1' },
  { id: '2', hypothesis: 'Reduce CAC via Content Marketing', status: 'Completed', confidenceScore: 92, predictedImpact: '-5% CAC', ownerName: 'Mike R', ownerAvatar: 'https://picsum.photos/32/32?random=2' },
  { id: '3', hypothesis: 'Enterprise Tier Feature Gating', status: 'Draft', confidenceScore: 0, predictedImpact: 'Pending', ownerName: 'Alex D', ownerAvatar: 'https://picsum.photos/32/32?random=3' },
  { id: '4', hypothesis: 'Switch Ad Budget to TikTok', status: 'Completed', confidenceScore: 45, predictedImpact: '-10% Leads', ownerName: 'Sarah J', ownerAvatar: 'https://picsum.photos/32/32?random=1' },
];

const ExperimentView: React.FC = () => {
  const [simulations, setSimulations] = useState<Simulation[]>(INITIAL_SIMULATIONS);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedSim, setSelectedSim] = useState<Simulation | null>(null);

  const handleAddSimulation = (newSim: Simulation) => {
    setSimulations(prev => [newSim, ...prev]);
  };

  const handleRunDraft = (id: string) => {
    // 1. Set to Running
    setSimulations(prev => prev.map(sim => 
        sim.id === id ? { ...sim, status: 'Running' } : sim
    ));

    // 2. Simulate Delay -> Completed
    setTimeout(() => {
        setSimulations(prev => prev.map(sim => {
            if (sim.id === id) {
                // Generate random results
                const impactTypes = ['+15% Rev', '-8% Churn', '+22% Leads', '-5% CAC'];
                const randomImpact = impactTypes[Math.floor(Math.random() * impactTypes.length)];
                const randomScore = Math.floor(65 + Math.random() * 30); // 65-95

                return {
                    ...sim,
                    status: 'Completed',
                    predictedImpact: randomImpact,
                    confidenceScore: randomScore
                };
            }
            return sim;
        }));
    }, 3000); // 3 second simulation time
  };

  const handleViewReport = (sim: Simulation) => {
      setSelectedSim(sim);
      setIsReportModalOpen(true);
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <NewSimulationModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onRun={handleAddSimulation}
      />

      <SimulationReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        simulation={selectedSim}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            Experiment
          </h1>
          <p className="text-zinc-400 text-sm">
            Simulate "What-If" scenarios to forecast business impact before execution.
          </p>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={16} /> New Simulation
        </button>
      </div>

      {/* KPI Cards for Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4">
             <div className="text-zinc-500 text-xs font-medium uppercase mb-1">Active Simulations</div>
             <div className="text-2xl font-bold text-white">{simulations.filter(s => s.status === 'Running').length}</div>
         </div>
         <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4">
             <div className="text-zinc-500 text-xs font-medium uppercase mb-1">Success Rate</div>
             <div className="text-2xl font-bold text-green-500">76%</div>
         </div>
         <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4">
             <div className="text-zinc-500 text-xs font-medium uppercase mb-1">Avg. Confidence</div>
             <div className="text-2xl font-bold text-blue-500">82%</div>
         </div>
         <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4">
             <div className="text-zinc-500 text-xs font-medium uppercase mb-1">Total Experiments</div>
             <div className="text-2xl font-bold text-white">{simulations.length}</div>
         </div>
      </div>

      {/* Simulation List */}
      <div className="grid grid-cols-1 gap-4">
         {simulations.map((sim) => (
             <div key={sim.id} className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    {/* Left: Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${
                                 sim.status === 'Running' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                 sim.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                             }`}>
                                 {sim.status}
                             </span>
                             <span className="text-xs text-zinc-500">ID: SIM-{sim.id}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{sim.hypothesis}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <img src={sim.ownerAvatar} alt={sim.ownerName} className="w-5 h-5 rounded-full border border-zinc-700" />
                            <span className="text-xs text-zinc-400">Created by {sim.ownerName}</span>
                        </div>
                    </div>

                    {/* Middle: Metrics */}
                    {sim.status !== 'Draft' && (
                        <div className="flex items-center gap-8 px-4 border-l border-zinc-800">
                           <div className="text-center">
                                <div className="text-xs text-zinc-500 mb-1">Confidence</div>
                                <div className="text-lg font-bold text-white">{sim.confidenceScore}%</div>
                           </div>
                           <div className="text-center">
                                <div className="text-xs text-zinc-500 mb-1">Prediction</div>
                                <div className={`text-lg font-bold ${
                                    sim.predictedImpact.includes('-') && sim.predictedImpact.includes('Revenue') ? 'text-red-500' : 
                                    sim.predictedImpact.includes('+') ? 'text-green-500' : 'text-blue-500'
                                }`}>
                                    {sim.predictedImpact}
                                </div>
                           </div>
                        </div>
                    )}

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 pl-4 md:border-l border-zinc-800">
                        {sim.status === 'Running' ? (
                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                Simulating...
                            </div>
                        ) : sim.status === 'Completed' ? (
                            <button 
                                onClick={() => handleViewReport(sim)}
                                className="px-4 py-2 bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
                            >
                                View Report <ArrowRight size={14} />
                            </button>
                        ) : (
                             <button 
                                onClick={() => handleRunDraft(sim.id)}
                                className="px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-medium hover:bg-blue-600/20 transition-colors flex items-center gap-2"
                             >
                                <Play size={14} fill="currentColor" /> Run Now
                            </button>
                        )}
                    </div>

                 </div>
             </div>
         ))}
      </div>
    </main>
  );
};

export default ExperimentView;