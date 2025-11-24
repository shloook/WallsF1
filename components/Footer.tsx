import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
             <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">WallsF1</h3>
             <p className="text-sm text-white/40 mt-2 text-center md:text-left">Premium Liquid Glass Aesthetics for your devices.</p>
          </div>
          
          <div className="flex gap-8 text-sm text-white/60 font-medium">
            <a href="#" className="hover:text-white hover:underline decoration-red-500/50 underline-offset-4 transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white hover:underline decoration-red-500/50 underline-offset-4 transition-all">Terms of Service</a>
            <a href="#" className="hover:text-white hover:underline decoration-red-500/50 underline-offset-4 transition-all">Licensing</a>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center justify-center gap-2 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} WallsF1. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 text-white/60 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm mt-2 hover:bg-white/10 transition-colors cursor-default">
            <span>MADE WITH</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            <span>BY NAYAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;