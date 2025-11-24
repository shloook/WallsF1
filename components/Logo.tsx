import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative ${className} group`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="faceGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="faceGradientOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        
        {/* Abstract Low-Poly Face Construction */}
        <g transform="translate(5, 5) scale(0.9)">
            {/* Back Head / Darker */}
            <path d="M10 30 L40 10 L45 45 L15 55 Z" fill="#7f1d1d" />
            <path d="M15 55 L45 45 L40 80 L20 70 Z" fill="#450a0a" />
            
            {/* Forehead / Bright */}
            <path d="M40 10 L75 20 L60 45 L45 45 Z" fill="#f87171" />
            
            {/* Eye/Cheek Area / Main Red */}
            <path d="M60 45 L90 40 L80 60 L55 60 Z" fill="url(#faceGradientRed)" />
            <path d="M45 45 L60 45 L55 60 L40 80 Z" fill="#dc2626" />
            
            {/* Nose / Highlight */}
            <path d="M75 20 L90 40 L60 45 Z" fill="#fb923c" opacity="0.9" />
            
            {/* Jaw / Dark Red */}
            <path d="M40 80 L55 60 L80 60 L65 90 Z" fill="#991b1b" />
            
            {/* Chin / Accent */}
            <path d="M80 60 L85 70 L65 90 Z" fill="#ef4444" />
            
            {/* Shards floating (hair/brain) */}
            <path d="M20 10 L35 0 L40 10 Z" fill="#ef4444" opacity="0.8" />
            <path d="M50 0 L65 5 L60 15 Z" fill="#ea580c" opacity="0.8" />
            <path d="M0 40 L10 30 L15 50 Z" fill="#7f1d1d" opacity="0.6" />
        </g>
      </svg>
      
      {/* Light Reflection/Glint Animation */}
      <motion.div 
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '150%', opacity: [0, 0.8, 0] }}
        transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut", 
            repeatDelay: 3 
        }}
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none mix-blend-overlay rounded-full overflow-hidden"
      />
    </div>
  );
};

export default Logo;