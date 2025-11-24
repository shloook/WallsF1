import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Heart } from 'lucide-react';
import { Wallpaper } from '../types';

interface PreviewModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
  onDownload: (w: Wallpaper) => void;
  isSaved?: boolean;
  onToggleSave?: (w: Wallpaper) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ 
  wallpaper, 
  onClose, 
  onDownload,
  isSaved,
  onToggleSave
}) => {
  return (
    <AnimatePresence>
      {wallpaper && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col items-center"
          >
             {/* Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-gray-900 w-auto h-auto max-h-[80vh]">
              <img
                src={wallpaper.url}
                alt={wallpaper.title}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              
              {/* Overlay Actions */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                 <h3 className="text-xl font-bold text-white mb-1">{wallpaper.title}</h3>
                 <p className="text-sm text-white/60 line-clamp-1">{wallpaper.prompt || "Liquid Glass Collection"}</p>
              </div>
            </div>

            {/* Floating Action Bar */}
            <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl">
               <button 
                onClick={() => onToggleSave && onToggleSave(wallpaper)}
                className={`p-3 rounded-full transition-all ${isSaved ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-white'}`}
                title="Save to favorites"
              >
                <Heart fill={isSaved ? "currentColor" : "none"} size={24} />
              </button>
              
              <div className="w-px h-8 bg-white/10" />

              <button 
                onClick={() => onDownload(wallpaper)}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                <Download size={20} />
                Download
              </button>

              <button className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                <Share2 size={24} />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;