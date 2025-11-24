import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import Button from './Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, title: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
        handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
        handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        // Default title from filename
        setTitle(file.name.replace(/\.[^/.]+$/, "").split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    }
  };

  const handleSubmit = () => {
    if (selectedFile && title) {
        onUpload(selectedFile, title);
        // Reset
        setSelectedFile(null);
        setPreviewUrl(null);
        setTitle('');
        onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
          >
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold text-white">Upload Wallpaper</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                    <X size={20} />
                </button>
             </div>

             <div className="p-8 flex-grow">
                {!selectedFile ? (
                    <div 
                        className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer
                            ${isDragging ? 'border-red-500 bg-red-500/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
                        `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileInput}
                        />
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4">
                             <UploadCloud className="text-white/80" size={32} />
                        </div>
                        <p className="text-white font-medium mb-2">Click or drag image here</p>
                        <p className="text-white/40 text-xs">Supports JPG, PNG, WEBP</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                            {previewUrl && (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            <button 
                                onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-sm"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider ml-1">Wallpaper Title</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder-white/20"
                                placeholder="Enter a catchy title..."
                            />
                        </div>
                    </div>
                )}
             </div>

             <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-3">
                 <Button variant="secondary" onClick={onClose}>Cancel</Button>
                 <Button variant="primary" disabled={!selectedFile || !title} onClick={handleSubmit}>
                    {selectedFile ? 'Upload' : 'Select File'}
                 </Button>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;