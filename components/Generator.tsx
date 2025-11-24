import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, Image as ImageIcon } from 'lucide-react';
import Button from './Button';
import { GenerationConfig } from '../types';
import { generateWallpaper } from '../services/geminiService';

interface GeneratorProps {
  onGenerateSuccess: (url: string, prompt: string) => void;
}

const Generator: React.FC<GeneratorProps> = ({ onGenerateSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<GenerationConfig['aspectRatio']>('9:16');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const url = await generateWallpaper({ prompt, aspectRatio });
      onGenerateSuccess(url, prompt);
      setPrompt(''); // Clear prompt on success? Or keep it for iteration. Let's keep it.
    } catch (err: any) {
      setError(err.message || "Failed to generate wallpaper. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-lg shadow-purple-500/20">
          <Wand2 className="text-white w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          AI Liquid Studio
        </h2>
        <p className="text-center text-white/50 mb-8 text-sm">
          Describe your dream wallpaper and let Gemini 2.5 fluidly create it.
        </p>

        <div className="space-y-6">
          {/* Prompt Input */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur"></div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city made of translucent glass, neon lights, synthwave vibe, liquid fluid background..."
              className="relative w-full bg-black/50 text-white placeholder-white/30 rounded-xl px-5 py-4 focus:outline-none focus:bg-black/70 transition-colors resize-none h-32 border border-white/10"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Aspect Ratio Selector */}
            <div className="flex bg-black/30 p-1 rounded-xl border border-white/10">
              {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    aspectRatio === ratio 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <Button 
              onClick={handleGenerate} 
              isLoading={isGenerating} 
              disabled={!prompt.trim()}
              variant="glass"
              className="w-full md:w-auto min-w-[200px]"
            >
              <Sparkles size={18} />
              <span>Generate Wallpaper</span>
            </Button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>

       {/* Tips / Inspiration */}
       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2">
              <ImageIcon size={14} /> Abstract Fluids
            </h4>
            <p className="text-xs text-white/50">"Swirling liquid metal, iridescent colors, dark background, 8k render"</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2">
              <ImageIcon size={14} /> Glassmorphism
            </h4>
            <p className="text-xs text-white/50">"Translucent glass layers, geometric shapes, soft shadows, frosted texture"</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2">
              <ImageIcon size={14} /> Neon Cyber
            </h4>
            <p className="text-xs text-white/50">"Cyberpunk city street, wet floor reflections, neon pink and blue lights"</p>
          </div>
       </div>
    </div>
  );
};

export default Generator;