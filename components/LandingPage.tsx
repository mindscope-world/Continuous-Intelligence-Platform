import React from 'react';
import { Sparkles, ArrowRight, BarChart2, Zap, Shield, Globe, CheckCircle2, Check, Layout, BrainCircuit, LineChart } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur border-b border-zinc-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={onEnterApp}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">MINDVERSE</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">Features</button>
                <button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">Solutions</button>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">Pricing</button>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={onEnterApp} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer">Log In</button>
                <button 
                    onClick={onEnterApp}
                    className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
         {/* Background Gradients */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700 hover:border-zinc-700 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: AI-Powered Simulation Engine 2.0
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                Strategic Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600">For GTM Teams</span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                MindVerse unifies your data, identifies revenue drivers, and simulates future outcomes so you can make decisions with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <button 
                    onClick={onEnterApp}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20 flex items-center gap-2 group"
                >
                    Launch Platform <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={onEnterApp}
                    className="px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 text-white rounded-xl font-bold text-lg transition-all"
                >
                    Book a Demo
                </button>
            </div>
         </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-zinc-900/30 border-y border-zinc-800 relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">The Complete Intelligence Suite</h2>
                <p className="text-zinc-400">Everything you need to go from data to action.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Unified Tracking', desc: 'Connect Salesforce, HubSpot, and Ad platforms in one real-time view.', icon: <Layout className="text-blue-500" size={24} /> },
                    { title: 'Predictive Analysis', desc: 'Identify root causes of revenue changes automatically with AI.', icon: <BrainCircuit className="text-purple-500" size={24} /> },
                    { title: 'Strategic Simulation', desc: 'Test "what-if" scenarios before spending a single dollar.', icon: <LineChart className="text-indigo-500" size={24} /> }
                ].map((feature, idx) => (
                    <div key={idx} className="p-8 bg-[#0c0c0e] border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group">
                        <div className="w-12 h-12 bg-zinc-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-zinc-800/50 group-hover:border-zinc-700">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-[#09090b] relative overflow-hidden">
         {/* Decoration */}
         <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold mb-4">Tailored Solutions</h2>
                 <p className="text-zinc-400">Intelligence adapted to your specific role.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Marketing Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-[#0c0c0e] border border-zinc-800 p-8 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    <div className="mb-6 p-3 bg-blue-500/10 w-fit rounded-lg">
                        <Zap className="text-blue-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Marketing</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Optimize ad spend across channels and prove ROI with multi-touch attribution models that actually work.</p>
                    <ul className="space-y-3">
                        {['CAC Analysis', 'Campaign Attribution', 'Funnel Optimization'].map(i => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="text-blue-500 w-3 h-3" />
                                </div>
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Sales Card */}
                 <div className="group relative overflow-hidden rounded-2xl bg-[#0c0c0e] border border-zinc-800 p-8 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    <div className="mb-6 p-3 bg-purple-500/10 w-fit rounded-lg">
                        <BarChart2 className="text-purple-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Sales</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Prioritize high-intent leads and forecast revenue with 94% accuracy using our predictive models.</p>
                    <ul className="space-y-3">
                        {['Pipeline Velocity', 'Deal Scoring', 'Forecast Simulation'].map(i => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Check className="text-purple-500 w-3 h-3" />
                                </div>
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* RevOps Card */}
                 <div className="group relative overflow-hidden rounded-2xl bg-[#0c0c0e] border border-zinc-800 p-8 hover:border-green-500/50 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    <div className="mb-6 p-3 bg-green-500/10 w-fit rounded-lg">
                        <Shield className="text-green-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">RevOps</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Maintain data hygiene and synchronize tools in real-time. Detect anomalies before they impact revenue.</p>
                    <ul className="space-y-3">
                        {['Data Sync', 'Anomaly Detection', 'Automated Workflows'].map(i => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Check className="text-green-500 w-3 h-3" />
                                </div>
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-zinc-800 bg-[#0c0c0e] relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                 <p className="text-zinc-400">Start free, scale as you grow. No hidden fees.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Free */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 flex flex-col hover:border-zinc-700 transition-colors">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-white">Free</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold text-white">$0</span>
                            <span className="text-zinc-500 text-sm">/mo</span>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mb-6">For individuals exploring data.</p>
                    <button onClick={onEnterApp} className="w-full py-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-white text-sm font-medium transition-colors mb-6">Get Started</button>
                    <ul className="space-y-3 flex-1">
                        {['1 User', 'Basic Dashboard', '24h Data Refresh'].map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm text-zinc-400"><Check size={14} /> {f}</li>
                        ))}
                    </ul>
                </div>

                 {/* Silver */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 flex flex-col hover:border-zinc-700 transition-colors">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-white">Silver</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold text-white">$499</span>
                            <span className="text-zinc-500 text-sm">/mo</span>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mb-6">For growing startups.</p>
                    <button onClick={onEnterApp} className="w-full py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-colors mb-6">Start Trial</button>
                    <ul className="space-y-3 flex-1">
                        {['5 Users', 'Unlimited KPIs', '1h Data Refresh', 'Email Support'].map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm text-zinc-400"><Check size={14} /> {f}</li>
                        ))}
                    </ul>
                </div>

                 {/* Gold (Popular) */}
                <div className="p-6 rounded-2xl border border-blue-500/50 bg-blue-900/10 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
                     <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-white">Gold</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold text-white">$1,499</span>
                            <span className="text-zinc-500 text-sm">/mo</span>
                        </div>
                    </div>
                    <p className="text-sm text-blue-200/70 mb-6">For data-driven teams.</p>
                    <button onClick={onEnterApp} className="w-full py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-sm font-bold transition-colors mb-6 shadow-lg shadow-blue-600/20">Upgrade Now</button>
                    <ul className="space-y-3 flex-1">
                        {['20 Users', 'AI Action Engine', 'Real-time Streaming', 'Priority Support', 'Experiment Suite'].map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm text-zinc-300"><Check size={14} className="text-blue-400" /> {f}</li>
                        ))}
                    </ul>
                </div>

                 {/* Enterprise */}
                <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-900/5 flex flex-col hover:border-purple-500/50 transition-colors">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-white">Enterprise</h3>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold text-white">Custom</span>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500 mb-6">For global scale.</p>
                    <button onClick={onEnterApp} className="w-full py-2.5 rounded-lg border border-purple-500/50 text-purple-400 hover:bg-purple-900/20 text-sm font-medium transition-colors mb-6">Contact Sales</button>
                    <ul className="space-y-3 flex-1">
                        {['Unlimited Users', 'Dedicated Success Manager', 'SSO & SLA', 'Custom AI Models'].map(f => (
                            <li key={f} className="flex items-center gap-2 text-sm text-zinc-400"><Check size={14} className="text-purple-500" /> {f}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 bg-[#09090b] text-center">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
                    <Sparkles className="text-zinc-400 w-3 h-3" />
                </div>
                <span className="font-bold tracking-tight text-zinc-400">MINDVERSE</span>
            </div>
            <div className="flex gap-6 mb-8 text-sm text-zinc-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <p className="text-zinc-600 text-xs">© 2025 MindVerse Intelligence Inc. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;