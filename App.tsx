import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Heart, Upload } from 'lucide-react';

// Components
import LiquidBackground from './components/LiquidBackground';
import WallpaperCard from './components/WallpaperCard';
import Generator from './components/Generator';
import PreviewModal from './components/PreviewModal';
import ProfileModal from './components/ProfileModal';
import UploadModal from './components/UploadModal';
import Footer from './components/Footer';
import Logo from './components/Logo';

// Types & Utils
import { Wallpaper, Tab } from './types';

// Mock Data
const MOCK_WALLPAPERS: Wallpaper[] = [
  { id: '1', url: 'https://picsum.photos/seed/liquid1/800/1200', title: 'Deep Ocean Flow', author: 'LiquidAI' },
  { id: '2', url: 'https://picsum.photos/seed/neon2/800/1200', title: 'Neon Glass Shards', author: 'Gemini' },
  { id: '3', url: 'https://picsum.photos/seed/abstract3/800/1200', title: 'Pastel Dreams', author: 'Studio' },
  { id: '4', url: 'https://picsum.photos/seed/dark4/800/1200', title: 'Obsidian Ripples', author: 'DarkMode' },
  { id: '5', url: 'https://picsum.photos/seed/glass5/800/1200', title: 'Frosted Aurora', author: 'Frost' },
  { id: '6', url: 'https://picsum.photos/seed/tech6/800/1200', title: 'Cyber Fluid', author: 'Net' },
  { id: '7', url: 'https://picsum.photos/seed/red7/800/1200', title: 'Crimson Tide', author: 'Flow' },
  { id: '8', url: 'https://picsum.photos/seed/blue8/800/1200', title: 'Azure Glitch', author: 'System' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(MOCK_WALLPAPERS);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [generatedWallpapers, setGeneratedWallpapers] = useState<Wallpaper[]>([]);
  
  // Modal States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Load saved from local storage
  useEffect(() => {
    const saved = localStorage.getItem('wallsf1_saved');
    if (saved) {
      setSavedIds(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save to local storage
  const toggleSave = (wallpaper: Wallpaper) => {
    const newSaved = new Set(savedIds);
    if (newSaved.has(wallpaper.id)) {
      newSaved.delete(wallpaper.id);
    } else {
      newSaved.add(wallpaper.id);
    }
    setSavedIds(newSaved);
    localStorage.setItem('wallsf1_saved', JSON.stringify(Array.from(newSaved)));
  };

  const handleGeneratedWallpaper = (url: string, prompt: string) => {
    const newWallpaper: Wallpaper = {
      id: `gen-${Date.now()}`,
      url,
      title: 'AI Masterpiece',
      prompt,
      isGenerated: true,
      author: 'You'
    };
    setGeneratedWallpapers([newWallpaper, ...generatedWallpapers]);
    setWallpapers([newWallpaper, ...wallpapers]);
    setActiveTab('explore');
    setSelectedWallpaper(newWallpaper);
  };

  const handleUpload = (file: File, title: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newWallpaper: Wallpaper = {
          id: `upload-${Date.now()}`,
          url: e.target.result as string,
          title: title,
          author: 'You (Uploaded)',
          isGenerated: false
        };
        setWallpapers([newWallpaper, ...wallpapers]);
        setActiveTab('explore');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async (wallpaper: Wallpaper) => {
    try {
      if (wallpaper.url.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = wallpaper.url;
        link.download = `WallsF1-${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const response = await fetch(wallpaper.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `WallsF1-${wallpaper.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Download failed", e);
      window.open(wallpaper.url, '_blank');
    }
  };

  const filteredWallpapers = activeTab === 'saved' 
    ? wallpapers.filter(w => savedIds.has(w.id))
    : wallpapers;

  return (
    <div className="min-h-screen text-white relative selection:bg-red-500/30 flex flex-col">
      <LiquidBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/5 backdrop-blur-xl border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('explore')}>
             <motion.div 
               whileHover={{ rotate: 10, scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               className="relative w-12 h-12"
             >
                <Logo className="w-full h-full" />
             </motion.div>
             <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 hidden sm:block font-sans">
               WallsF1
             </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl">
            {[
              { id: 'explore', icon: Layers, label: 'Explore' },
              { id: 'generate', icon: Sparkles, label: 'Studio' },
              { id: 'saved', icon: Heart, label: 'Saved' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                  activeTab === tab.id 
                    ? 'text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="pill-tab"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon size={18} />
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             {/* Upload Button */}
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUploadOpen(true)}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white hidden sm:block"
                title="Upload Wallpaper"
             >
                <Upload size={20} />
             </motion.button>

             {/* Profile Button */}
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsProfileOpen(true)}
               className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/20 flex items-center justify-center overflow-hidden hover:border-white/40 transition-colors shadow-xl hover:shadow-red-500/10"
             >
               <img src="https://picsum.photos/seed/user/100" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
             </motion.button>
          </div>
        </div>
        
        {/* Mobile Tab Bar (Bottom) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50">
             {[
              { id: 'explore', icon: Layers },
              { id: 'generate', icon: Sparkles },
              { id: 'saved', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`p-4 rounded-full transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-black' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                 {activeTab === tab.id && (
                  <motion.div
                    layoutId="pill-tab-mobile"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                </span>
              </button>
            ))}
            
            {/* Mobile Upload Button */}
            <button 
                onClick={() => setIsUploadOpen(true)}
                className="p-4 rounded-full text-white/60 hover:text-white transition-colors border-l border-white/10 ml-1"
            >
                <Upload size={22} />
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 px-4 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
             animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
             exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="w-full"
           >
            {activeTab === 'generate' ? (
              <Generator onGenerateSuccess={handleGeneratedWallpaper} />
            ) : (
              <div className="w-full pb-24 md:pb-0">
                 {/* Dynamic Header */}
                 <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                          {activeTab === 'saved' ? 'Personal Collection' : 'Discover Premium'}
                      </h2>
                      <p className="text-lg text-white/50 max-w-xl">
                          {activeTab === 'saved' 
                            ? 'Your curated list of favorite aesthetics.' 
                            : 'Explore the finest selection of liquid glass wallpapers, generated by AI.'}
                      </p>
                    </div>
                 </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {filteredWallpapers.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                        <div className="p-6 bg-white/5 rounded-full mb-6 animate-pulse">
                           {activeTab === 'saved' ? <Heart className="text-white/30" size={48} /> : <Layers className="text-white/30" size={48} />}
                        </div>
                        <p className="text-white/60 text-xl font-medium">No wallpapers found.</p>
                        {activeTab === 'saved' && (
                            <button 
                                onClick={() => setActiveTab('explore')}
                                className="mt-6 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/5"
                            >
                                Browse Gallery
                            </button>
                        )}
                    </div>
                  ) : (
                    filteredWallpapers.map((wallpaper, index) => (
                        <WallpaperCard
                          key={wallpaper.id}
                          wallpaper={wallpaper}
                          onPreview={setSelectedWallpaper}
                          onDownload={handleDownload}
                          isSaved={savedIds.has(wallpaper.id)}
                          onToggleSave={toggleSave}
                        />
                    ))
                  )}
                </div>
              </div>
            )}
           </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />

      {/* Modals */}
      <PreviewModal
        wallpaper={selectedWallpaper}
        onClose={() => setSelectedWallpaper(null)}
        onDownload={handleDownload}
        isSaved={selectedWallpaper ? savedIds.has(selectedWallpaper.id) : false}
        onToggleSave={toggleSave}
      />

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default App;