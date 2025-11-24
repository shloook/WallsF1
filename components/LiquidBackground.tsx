import React from 'react';
import { motion } from 'framer-motion';

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030303] pointer-events-none">
      {/* 
         Optimized for "Buttery Smoothness":
         - Increased duration to >40s for very slow, imperceptible loops.
         - Reduced scale variance to prevent "popping".
         - Added will-change-transform explicitly.
      */}

      {/* Orb 1 - Deep Red/Purple */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.4, 0.5, 0.4]
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-red-900/20 blur-[150px] mix-blend-screen will-change-transform"
      />

      {/* Orb 2 - Orange/Amber */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 60, -20, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[10%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-orange-900/10 blur-[140px] mix-blend-screen will-change-transform"
      />

      {/* Orb 3 - Subtle Cool Blue for contrast */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-20%] left-[20%] w-[90vw] h-[90vw] rounded-full bg-slate-900/30 blur-[160px] mix-blend-screen will-change-transform"
      />
      
      {/* Noise Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/90 pointer-events-none" />
    </div>
  );
};

export default LiquidBackground;