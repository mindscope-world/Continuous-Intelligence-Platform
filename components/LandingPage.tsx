import React from 'react';
import { Sparkles, ArrowRight, BarChart2, Zap, Shield, Globe } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onEnterApp}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">MINDVERSE</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={onEnterApp} className="text-sm font-medium text-zinc-300 hover:text-white">Log In</button>
                <button 
                    onClick={onEnterApp}
                    className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Get Started
                </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
         {/* Background Gradients */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: AI-Powered Simulation Engine 2.0
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                Strategic Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">For GTM Teams</span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                MindVerse unifies your data, identifies revenue drivers, and simulates future outcomes so you can make decisions with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <button 
                    onClick={onEnterApp}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/20 flex items-center gap-2 group"
                >
                    Launch Platform <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={onEnterApp}
                    className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl font-bold text-lg transition-all"
                >
                    Book a Demo
                </button>
            </div>
         </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-zinc-900/50 border-y border-zinc-800">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">The Complete Intelligence Suite</h2>
                <p className="text-zinc-400">Everything you need to go from data to action.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Unified Tracking', desc: 'Connect Salesforce, HubSpot, and Ad platforms in one real-time view.', icon: <BarChart2 className="text-blue-500" /> },
                    { title: 'Predictive Analysis', desc: 'Identify root causes of revenue changes automatically with AI.', icon: <Zap className="text-yellow-500" /> },
                    { title: 'Strategic Simulation', desc: 'Test "what-if" scenarios before spending a single dollar.', icon: <Shield className="text-purple-500" /> }
                ].map((feature, idx) => (
                    <div key={idx} className="p-8 bg-[#09090b] border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
                        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 bg-[#09090b] text-center">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 opacity-50">
                <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
                    <Sparkles className="text-zinc-400 w-3 h-3" />
                </div>
                <span className="font-bold tracking-tight text-zinc-400">MINDVERSE</span>
            </div>
            <p className="text-zinc-600 text-sm">© 2025 MindVerse Intelligence Inc. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;