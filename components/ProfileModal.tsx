import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bell, Shield, Smartphone, Zap, LogOut, Settings } from 'lucide-react';
import Button from './Button';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    highQuality: true,
    parallax: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative"
          >
            {/* Header / Cover */}
            <div className="h-36 bg-gradient-to-r from-red-900/40 via-orange-900/40 to-red-900/40 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
               <motion.div 
                 animate={{ x: [0, 100, 0], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12" 
               />
               <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors border border-white/5 z-10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 pb-8 -mt-14 relative">
               {/* Avatar */}
               <div className="flex justify-between items-end">
                   <div className="w-28 h-28 rounded-[2rem] p-1 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                      <div className="w-full h-full rounded-[1.7rem] bg-gray-800 overflow-hidden relative group">
                        <img src="https://picsum.photos/seed/user/200" alt="User" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Settings size={20} className="text-white drop-shadow-md" />
                        </div>
                      </div>
                   </div>
                   <Button variant="secondary" className="!py-2 !px-4 text-xs">Edit Profile</Button>
               </div>

               <div className="mt-4">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Nayan's Fan
                    <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/20">PRO</span>
                 </h2>
                 <p className="text-white/40 text-sm">Joined March 2024 • New York, USA</p>
               </div>

               {/* Stats */}
               <div className="flex gap-4 mt-8">
                  <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl font-bold text-white">128</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Following</div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Saved</div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Created</div>
                  </div>
               </div>

               {/* Settings List */}
               <div className="mt-8 space-y-3">
                  <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 ml-1">Application Settings</h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => toggle('notifications')}>
                     <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform"><Bell size={20} /></div>
                        <div>
                            <span className="text-sm font-medium block text-white">Push Notifications</span>
                            <span className="text-xs text-white/40">Get updates on new drops</span>
                        </div>
                     </div>
                     <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.notifications ? 'bg-blue-600' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${settings.notifications ? 'left-6' : 'left-1'}`} />
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => toggle('highQuality')}>
                     <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform"><Zap size={20} /></div>
                        <div>
                            <span className="text-sm font-medium block text-white">High Fidelity</span>
                            <span className="text-xs text-white/40">Download uncompressed assets</span>
                        </div>
                     </div>
                     <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.highQuality ? 'bg-purple-600' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${settings.highQuality ? 'left-6' : 'left-1'}`} />
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => toggle('parallax')}>
                     <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform"><Smartphone size={20} /></div>
                        <div>
                             <span className="text-sm font-medium block text-white">Reduce Motion</span>
                             <span className="text-xs text-white/40">Disable complex animations</span>
                        </div>
                     </div>
                     <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${settings.parallax ? 'bg-green-600' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${settings.parallax ? 'left-6' : 'left-1'}`} />
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                 <button className="w-full py-4 rounded-2xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                    <LogOut size={18} />
                    Sign Out
                 </button>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;