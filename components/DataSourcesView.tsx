import React, { useState } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Link2, 
  Link2Off,
  Search,
  Settings2,
  ShieldCheck
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  category: 'CRM' | 'Marketing' | 'Advertising' | 'Finance' | 'Communication';
  status: 'Connected' | 'Disconnected' | 'Error';
  lastSync: string;
  iconColor: string;
  description: string;
}

const INITIAL_SOURCES: DataSource[] = [
  { id: '1', name: 'Salesforce', category: 'CRM', status: 'Connected', lastSync: '2 mins ago', iconColor: 'bg-blue-500', description: 'Pipeline, Opportunity, and Customer data.' },
  { id: '2', name: 'HubSpot', category: 'Marketing', status: 'Connected', lastSync: '5 mins ago', iconColor: 'bg-orange-500', description: 'Marketing automation, email campaigns, and leads.' },
  { id: '3', name: 'Google Ads', category: 'Advertising', status: 'Connected', lastSync: '1 hour ago', iconColor: 'bg-green-500', description: 'Ad spend, impressions, and conversion tracking.' },
  { id: '4', name: 'LinkedIn Ads', category: 'Advertising', status: 'Disconnected', lastSync: 'Never', iconColor: 'bg-blue-700', description: 'B2B audience targeting and campaign performance.' },
  { id: '5', name: 'Stripe', category: 'Finance', status: 'Connected', lastSync: '10 mins ago', iconColor: 'bg-indigo-500', description: 'Real-time revenue, subscription, and churn metrics.' },
  { id: '6', name: 'Slack', category: 'Communication', status: 'Connected', lastSync: 'Real-time', iconColor: 'bg-purple-500', description: 'Team notifications and alert distribution.' },
  { id: '7', name: 'Zendesk', category: 'CRM', status: 'Disconnected', lastSync: 'Never', iconColor: 'bg-emerald-500', description: 'Customer support tickets and satisfaction scores.' },
  { id: '8', name: 'Mixpanel', category: 'Marketing', status: 'Error', lastSync: '2 days ago', iconColor: 'bg-violet-500', description: 'Product usage analytics and user behavior.' },
];

const DataSourcesView: React.FC = () => {
  const [sources, setSources] = useState<DataSource[]>(INITIAL_SOURCES);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleConnection = (id: string) => {
    setSources(prev => prev.map(source => {
      if (source.id === id) {
        return {
          ...source,
          status: source.status === 'Connected' ? 'Disconnected' : 'Connected',
          lastSync: source.status === 'Connected' ? 'Never' : 'Just now'
        };
      }
      return source;
    }));
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSources(prev => prev.map(source => 
        source.status === 'Connected' ? { ...source, lastSync: 'Just now' } : source
      ));
      setIsSyncing(false);
    }, 2000);
  };

  const filteredSources = sources.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            Data Sources
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Manage integrations to power MindVerse intelligence engine.
          </p>
        </div>
        <div className="flex gap-3">
             <button className="px-4 py-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Plus size={16} /> Add Custom Source
             </button>
             <button 
                onClick={handleSyncAll}
                disabled={isSyncing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
             >
                <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} /> 
                {isSyncing ? 'Syncing...' : 'Sync All Data'}
             </button>
        </div>
      </div>

      {/* Security Banner */}
      <div className="bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
         <ShieldCheck className="text-green-600 dark:text-green-500 shrink-0 mt-0.5" size={20} />
         <div>
            <h4 className="text-sm font-bold text-green-700 dark:text-green-400">Enterprise Security Active</h4>
            <p className="text-xs text-green-600/70 dark:text-green-300/70 mt-1">
                All data connections are encrypted end-to-end (AES-256) and compliant with SOC2 Type II standards.
            </p>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white dark:bg-[#18181b] p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search integrations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-300 text-sm rounded-lg pl-9 pr-3 py-2 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
            />
         </div>
         <div className="flex gap-2">
            {['All', 'Connected', 'Disconnected'].map((filter) => (
               <button key={filter} className="px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  {filter}
               </button>
            ))}
         </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSources.map((source) => (
           <div key={source.id} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group flex flex-col h-full shadow-sm dark:shadow-none">
              
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-12 h-12 rounded-xl ${source.iconColor} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                    <span className="opacity-90">{source.name.substring(0,2).toUpperCase()}</span>
                 </div>
                 <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                    source.status === 'Connected' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                    source.status === 'Error' ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' :
                    'bg-zinc-100 dark:bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/20'
                 }`}>
                    {source.status}
                 </div>
              </div>

              <div className="mb-4 flex-1">
                 <h3 className="text-zinc-900 dark:text-white font-bold text-lg mb-1">{source.name}</h3>
                 <p className="text-xs text-zinc-500 mb-2">{source.category}</p>
                 <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">{source.description}</p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
                    {source.status === 'Connected' && <RefreshCw size={10} />}
                    {source.status === 'Connected' ? `Synced ${source.lastSync}` : 'Not syncing'}
                 </div>
                 
                 <button 
                    onClick={() => handleToggleConnection(source.id)}
                    className={`p-2 rounded-lg transition-colors ${
                        source.status === 'Connected' 
                        ? 'text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10' 
                        : 'text-blue-500 hover:text-white hover:bg-blue-600'
                    }`}
                    title={source.status === 'Connected' ? 'Disconnect' : 'Connect'}
                 >
                    {source.status === 'Connected' ? <Link2Off size={16} /> : <Link2 size={16} />}
                 </button>
              </div>

           </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all group min-h-[240px]">
           <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
           </div>
           <div className="text-center">
              <h3 className="text-zinc-600 dark:text-zinc-400 font-medium text-sm group-hover:text-zinc-900 dark:group-hover:text-white">Connect New Source</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-1">Browse 50+ integrations</p>
           </div>
        </button>
      </div>
    </main>
  );
};

export default DataSourcesView;