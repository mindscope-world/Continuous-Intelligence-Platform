import React, { useState } from 'react';
import { Check, Shield, Zap, Star, Crown, Building2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  buttonText: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Essential tools for small teams just getting started with GTM tracking.',
    features: [
      '1 User Seat',
      'Basic Command Center',
      'Track up to 3 KPIs',
      '24hr Data Refresh Rate',
      'Community Support'
    ],
    icon: <Building2 className="text-zinc-500" size={24} />,
    color: 'border-zinc-200 dark:border-zinc-800',
    buttonText: 'Current Plan'
  },
  {
    id: 'silver',
    name: 'Silver',
    price: '$499',
    period: '/mo',
    description: 'Advanced analytics for growing startups needing deeper insights.',
    features: [
      'Up to 5 User Seats',
      'Unlimited KPI Tracking',
      'Analyze View (Basic)',
      '1 Hour Data Refresh Rate',
      'Email Support',
      '3 Data Source Integrations'
    ],
    icon: <Shield className="text-zinc-400" size={24} />,
    color: 'border-zinc-300 dark:border-zinc-700',
    buttonText: 'Upgrade to Silver'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '$1,499',
    period: '/mo',
    description: 'Full AI intelligence suite for data-driven GTM organizations.',
    features: [
      'Up to 20 User Seats',
      'Full Action Engine AI',
      'Experiment View (10 Sims/mo)',
      'Real-time Data Streaming',
      'Priority Support',
      'Unlimited Integrations',
      'Advanced Attribution Modeling'
    ],
    icon: <Star className="text-yellow-500" size={24} fill="currentColor" />,
    color: 'border-yellow-500/50 dark:border-yellow-500/50 shadow-xl shadow-yellow-500/10 ring-1 ring-yellow-500/50',
    buttonText: 'Upgrade to Gold',
    popular: true
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'Custom',
    period: '',
    description: 'Enterprise-grade scale, security, and dedicated strategic support.',
    features: [
      'Unlimited User Seats',
      'Unlimited Simulations',
      'Custom AI Model Fine-tuning',
      'Dedicated Success Manager',
      '24/7 Phone Support',
      'SLA Guarantees',
      'On-premise Deployment Option',
      'SSO & Advanced Security'
    ],
    icon: <Crown className="text-purple-500" size={24} />,
    color: 'border-purple-500/30 dark:border-purple-500/30 bg-gradient-to-b from-white to-purple-50 dark:from-[#18181b] dark:to-[#1a1025]',
    buttonText: 'Contact Sales'
  }
];

const EnterpriseView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex flex-col items-center mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Scale Your Intelligence
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Choose the plan that fits your growth stage. Unlock powerful AI simulations and real-time insights.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
           <button 
             onClick={() => setBillingCycle('monthly')}
             className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
           >
             Monthly Billing
           </button>
           <button 
             onClick={() => setBillingCycle('annual')}
             className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
           >
             Annual Billing
             <span className="text-[10px] bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Save 20%</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col bg-white dark:bg-[#18181b] rounded-2xl p-6 border transition-all duration-300 hover:translate-y-[-4px] ${plan.color}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
               <div className={`p-3 rounded-xl ${plan.id === 'platinum' ? 'bg-purple-100 dark:bg-purple-900/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                 {plan.icon}
               </div>
               <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
            </div>

            <div className="mb-6">
               <div className="flex items-end gap-1 mb-2">
                 <span className="text-3xl font-bold text-zinc-900 dark:text-white">{plan.price}</span>
                 <span className="text-zinc-500 mb-1">{plan.period}</span>
               </div>
               <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">
                 {plan.description}
               </p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
               {plan.features.map((feature, idx) => (
                 <div key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="shrink-0 text-blue-500 mt-0.5" size={16} />
                    <span className="text-zinc-600 dark:text-zinc-300">{feature}</span>
                 </div>
               ))}
            </div>

            <button 
              className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                plan.id === 'free' 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-default' 
                  : plan.id === 'gold'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : plan.id === 'platinum'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-12">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Trusted by GTM leaders at</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {['Acme Corp', 'Globex', 'Soylent Corp', 'Initech', 'Umbrella'].map((company) => (
             <span key={company} className="text-xl font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-default">{company}</span>
           ))}
        </div>
      </div>
    </main>
  );
};

export default EnterpriseView;