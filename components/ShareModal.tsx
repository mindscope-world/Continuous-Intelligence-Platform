import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  UserPlus, 
  Globe, 
  ChevronDown, 
  Users, 
  Link as LinkIcon,
  Shield
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, pageTitle }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copied, setCopied] = useState(false);
  const [workspaceAccess, setWorkspaceAccess] = useState('view');

  const handleInvite = () => {
    if (!email.trim()) return;
    setInviteStatus('sending');
    setTimeout(() => {
      setInviteStatus('sent');
      setTimeout(() => {
        setInviteStatus('idle');
        setEmail('');
      }, 2000);
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-[#18181b]">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              Share "{pageTitle}"
            </h3>
            <p className="text-xs text-zinc-500">Manage access and permissions</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          
          {/* Invite Section */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Invite People, Groups, or Emails
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <UserPlus size={16} className="text-zinc-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none placeholder-zinc-400"
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                />
                <div className="relative group">
                  <button className="flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800">
                    {permission === 'view' ? 'Can view' : 'Can edit'} <ChevronDown size={12} />
                  </button>
                  {/* Dropdown would go here in full implementation */}
                </div>
              </div>
              <button 
                onClick={handleInvite}
                disabled={!email.trim() || inviteStatus !== 'idle'}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-w-[80px] flex items-center justify-center ${
                  inviteStatus === 'sent' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {inviteStatus === 'sending' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : inviteStatus === 'sent' ? (
                  <Check size={16} />
                ) : (
                  'Invite'
                )}
              </button>
            </div>
            {inviteStatus === 'sent' && (
               <p className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <Check size={12} /> Invitation sent to {email}
               </p>
            )}
          </div>

          {/* General Access / Team Section */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Share with your Team / Workspace
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Everyone at MindVerse</h4>
                  <p className="text-xs text-zinc-500">Anyone in the workspace can access</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <select 
                    value={workspaceAccess}
                    onChange={(e) => setWorkspaceAccess(e.target.value)}
                    className="bg-transparent text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:outline-none cursor-pointer text-right appearance-none pr-4 relative z-10"
                 >
                    <option value="view">Can view</option>
                    <option value="edit">Can edit</option>
                    <option value="none">No access</option>
                 </select>
                 <ChevronDown size={14} className="text-zinc-400 absolute right-[34px] pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Mock Member List */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <img src="https://picsum.photos/32/32?random=1" className="w-8 h-8 rounded-full" alt="User" />
                   <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Sarah Jenkins (You)</p>
                      <p className="text-xs text-zinc-500">sarah@mindverse.io</p>
                   </div>
                </div>
                <span className="text-xs text-zinc-400">Owner</span>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <img src="https://picsum.photos/32/32?random=2" className="w-8 h-8 rounded-full" alt="User" />
                   <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Mike Ross</p>
                      <p className="text-xs text-zinc-500">mike@mindverse.io</p>
                   </div>
                </div>
                <span className="text-xs text-zinc-400">Can edit</span>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#09090b] flex justify-between items-center">
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
          
          <div className="flex gap-2">
             <div className="flex items-center gap-1 text-[10px] text-zinc-400 mr-2">
                <Shield size={12} /> Public Access: Disabled
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
