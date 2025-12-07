import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, BrainCircuit } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello. I am MindVerse. I can help you Track KPIs, Analyze performance drivers, or Experiment with new strategies. What would you like to explore?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(input, history);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-[#18181b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <BrainCircuit size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white tracking-tight">MindVerse AI</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Strategic Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-zinc-50 dark:bg-[#09090b]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-[#27272a] text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-[#27272a] p-4 rounded-2xl rounded-bl-none border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#09090b] rounded-xl px-4 py-3 border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
            <Sparkles size={16} className="text-zinc-400 dark:text-zinc-500" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about revenue trends, simulations, or KPIs..."
              className="bg-transparent flex-1 text-sm text-zinc-900 dark:text-white focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 transition-colors p-1"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-center">
             <span className="text-[10px] text-zinc-500 dark:text-zinc-600">MindVerse can generate strategic recommendations. Check outcome probability before executing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;