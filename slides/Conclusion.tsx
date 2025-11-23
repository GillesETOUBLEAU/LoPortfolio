import React from 'react';

export const Conclusion: React.FC = () => {
  return (
    <div className="h-full w-full relative flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image Placeholder using Picsum */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Open Road" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="z-10 max-w-4xl p-grid-4 text-center">
        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
          From <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Pioneer</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Icon</span>
        </h2>
        
        <div className="space-y-6 text-lg md:text-2xl font-light text-white/90 mb-12">
          <p>Connect the power of the dream with the promise of electrification.</p>
          <p>To make ZERO Motorcycles visible, credible, and desirable worldwide.</p>
        </div>

        <div className="inline-block border-t border-white/30 pt-8 mt-8">
          <p className="text-xl font-medium tracking-wide">Laurence Etoubleau</p>
          <p className="text-sm text-white/50 uppercase mt-1">Global Marketing Director Candidate</p>
        </div>
      </div>
    </div>
  );
};