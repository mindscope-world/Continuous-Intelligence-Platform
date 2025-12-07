import React, { useState, useRef, useEffect } from 'react';
import { Search, MessageCircle, FileText, ChevronRight, Send, HelpCircle, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const FAQS = [
  { q: "How do I create a new simulation?", a: "Navigate to the Experiment tab and click 'New Simulation'. You can define your hypothesis and run it immediately." },
  { q: "What data sources are supported?", a: "MindVerse currently supports Salesforce, HubSpot, Google Ads, Stripe, and Slack. More integrations are coming soon." },
  { q: "How is the confidence score calculated?", a: "We use a proprietary ensemble model that correlates your historical conversion data with proposed changes to estimate success probability." },
];

const HelpView: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi there! I am your MindVerse Support Agent. Ask me anything about using the platform, interpreting charts, or setting up integrations.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Contextual system instruction override for help
    const helpPrompt = `Context: User is asking for help using the MindVerse platform.
    User Query: ${chatInput}
    
    Provide a helpful, concise answer about the platform's features (Track, Analyze, Experiment). If you don't know, suggest checking the documentation.`;

    const history = chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    
    try {
        const response = await sendMessageToGemini(helpPrompt, history);
        setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
        setChatMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the knowledge base. Please try again." }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto animate-in fade-in duration-300">
       <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          Help & Center
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Documentation, FAQs, and AI Support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
         {/* Left Col: Search & FAQs */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="w-full bg-white dark:bg-[#18181b] text-zinc-900 dark:text-zinc-200 text-sm rounded-xl pl-9 pr-3 py-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 shadow-sm"
                />
            </div>

            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex-1 overflow-y-auto">
               <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText size={18} /> Common Questions
               </h3>
               <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                      <div key={idx} className="border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0">
                          <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-2">{faq.q}</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                      </div>
                  ))}
               </div>
               <button className="w-full mt-4 py-2 text-xs font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1">
                  View All Documentation <ChevronRight size={12} />
               </button>
            </div>
         </div>

         {/* Right Col: AI Support Chat */}
         <div className="lg:col-span-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-sm">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181b] flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Sparkles size={20} />
                   </div>
                   <div>
                       <h3 className="font-bold text-zinc-900 dark:text-white text-sm">MindVerse Support AI</h3>
                       <p className="text-xs text-zinc-500">Always online • Instant answers</p>
                   </div>
                </div>
                <HelpCircle className="text-zinc-400" size={18} />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/50 dark:bg-[#09090b]">
               {chatMessages.map((msg, idx) => (
                   <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                           msg.role === 'user' 
                           ? 'bg-blue-600 text-white rounded-br-none' 
                           : 'bg-white dark:bg-[#27272a] text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200 dark:border-zinc-800'
                       }`}>
                           {msg.text}
                       </div>
                   </div>
               ))}
               {isTyping && (
                   <div className="flex justify-start">
                       <div className="bg-white dark:bg-[#27272a] p-4 rounded-2xl rounded-bl-none border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></div>
                       </div>
                   </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800">
               <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#09090b] rounded-xl px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Ask how to use MindVerse..." 
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-600"
                  />
                  <button 
                    onClick={handleSendChat}
                    disabled={!chatInput.trim() || isTyping}
                    className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 disabled:opacity-50"
                  >
                     <Send size={18} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </main>
  );
};

export default HelpView;