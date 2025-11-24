import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallpaper } from '../types';
import { Download, Heart, Maximize2 } from 'lucide-react';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onPreview: (wallpaper: Wallpaper) => void;
  onDownload: (wallpaper: Wallpaper) => void;
  isSaved?: boolean;
  onToggleSave: (wallpaper: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ 
  wallpaper, 
  onPreview, 
  onDownload,
  isSaved,
  onToggleSave
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative aspect-[3/4] rounded-[1.5rem] overflow-hidden cursor-pointer bg-gray-900 border border-white/10 shadow-xl"
      onClick={() => onPreview(wallpaper)}
    >
      {/* Image with Fade In */}
      <img 
        src={wallpaper.url} 
        alt={wallpaper.title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      
      {/* Apple-style Liquid Light Reflection / Sheen on Hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[1.5rem]">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.2s_ease-in-out_infinite]" />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
        <h3 className="text-white font-semibold truncate mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 drop-shadow-lg">{wallpaper.title}</h3>
        
        <div className="flex items-center justify-between gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
           <button 
            onClick={(e) => { e.stopPropagation(); onToggleSave(wallpaper); }}
            className={`p-2.5 rounded-full backdrop-blur-xl border border-white/10 transition-all shadow-lg ${isSaved ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/30 text-white'}`}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onPreview(wallpaper); }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-xl text-white transition-colors border border-white/10 shadow-lg"
            >
              <Maximize2 size={18} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDownload(wallpaper); }}
              className="p-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg shadow-black/20"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Glass border overlay (Permanent) */}
      <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] pointer-events-none z-30 ring-1 ring-white/5" />
    </motion.div>
  );
};

export default WallpaperCard;