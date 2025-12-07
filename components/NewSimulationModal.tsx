import React, { useState } from 'react';
import { X, TestTube2, ArrowRight, BrainCircuit, Play } from 'lucide-react';
import { Simulation } from '../types';

interface NewSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRun: (sim: Simulation) => void;
}

const NewSimulationModal: React.FC<NewSimulationModalProps> = ({ isOpen, onClose, onRun }) => {
  const [hypothesis, setHypothesis] = useState('');
  const [category, setCategory] = useState('Pricing');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<Simulation | null>(null);

  const handleRunSimulation = () => {
    if (!hypothesis.trim()) return;

    setIsSimulating(true);

    // Mock API simulation delay
    setTimeout(() => {
      const mockResult: Simulation = {
        id: Date.now().toString(),
        hypothesis: hypothesis,
        status: 'Completed',
        confidenceScore: Math.floor(70 + Math.random() * 25), // Random 70-95%
        predictedImpact: Math.random() > 0.5 ? '+8.5% Revenue' : '-2% Churn',
        ownerName: 'You',
        ownerAvatar: 'https://picsum.photos/32/32?random=4'
      };
      
      setResult(mockResult);
      setIsSimulating(false);
    }, 2500);
  };

  const handleSave = () => {
    if (result) {
      onRun(result);
      // Reset and close
      setHypothesis('');
      setResult(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-[#18181b]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
               <TestTube2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">Strategic Simulation Engine</h3>
              <p className="text-xs text-zinc-500">Test hypotheses before executing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#09090b]">
            {!result ? (
                // Input State
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                        <div className="flex gap-2">
                           {['Pricing', 'Marketing Spend', 'Product Strategy', 'Headcount'].map((cat) => (
                               <button 
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                                    category === cat 
                                    ? 'bg-blue-600 text-white border-blue-500' 
                                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                                }`}
                               >
                                {cat}
                               </button>
                           ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Hypothesis / Change</label>
                        <textarea 
                            value={hypothesis}
                            onChange={(e) => setHypothesis(e.target.value)}
                            placeholder="e.g., What if we increase LinkedIn Ad budget by 20% and decrease Google Ads by 10%?"
                            className="w-full h-32 bg-[#18181b] border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-600 resize-none"
                        />
                    </div>
                </div>
            ) : (
                // Result State
                <div className="space-y-6">
                    <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <p className="text-sm text-zinc-400 mb-1">Hypothesis</p>
                        <p className="text-white font-medium">{result.hypothesis}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                            <span className="text-xs text-green-400 uppercase font-bold tracking-wider mb-1">Predicted Impact</span>
                            <span className="text-2xl font-bold text-white">{result.predictedImpact}</span>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                            <span className="text-xs text-blue-400 uppercase font-bold tracking-wider mb-1">Confidence Score</span>
                            <span className="text-2xl font-bold text-white">{result.confidenceScore}%</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-[#18181b] rounded-xl">
                         <BrainCircuit className="text-purple-500 shrink-0 mt-0.5" size={18} />
                         <div>
                             <h4 className="text-sm font-bold text-white mb-1">MindVerse Analysis</h4>
                             <p className="text-xs text-zinc-400 leading-relaxed">
                                Based on historical data from Q1-Q3, this change correlates positively with pipeline velocity but may slightly increase CAC in the short term (2-3 weeks).
                             </p>
                         </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-zinc-800 bg-[#18181b] flex justify-end gap-3">
          {!result ? (
              <>
                 <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                 <button 
                    onClick={handleRunSimulation}
                    disabled={!hypothesis.trim() || isSimulating}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20"
                 >
                    {isSimulating ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           Simulating...
                        </>
                    ) : (
                        <>
                           <Play size={16} fill="currentColor" /> Run Simulation
                        </>
                    )}
                 </button>
              </>
          ) : (
              <>
                <button 
                    onClick={() => { setResult(null); setIsSimulating(false); }} 
                    className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                    Back to Edit
                </button>
                <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-900/20"
                >
                    Save & Monitor <ArrowRight size={16} />
                </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSimulationModal;
