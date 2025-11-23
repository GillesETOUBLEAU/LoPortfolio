import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const Cover: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/1KC3wAqi1j8?autoplay=1&loop=1&playlist=1KC3wAqi1j8&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ 
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh'
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        />
        {/* Blue Filter Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      <div className="z-10 text-center max-w-5xl px-grid-4">
        <div className="flex justify-center items-center mb-grid-4">
             <h1 className="text-[120px] md:text-[200px] font-bold text-white/5 leading-none select-none absolute z-0">BOOK</h1>
             <div className="relative z-10 backdrop-blur-sm bg-white/5 p-8 rounded-xl-custom border border-white/10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Creative Marketing Book</h2>
                <p className="text-xl md:text-2xl text-white/70 font-light">From storytelling to story sharing</p>
             </div>
        </div>

        <GlassCard className="mt-24 p-grid-4 md:p-grid-5 inline-block" intensity="low">
          <h3 className="text-lg md:text-xl font-semibold text-white">Laurence Etoubleau</h3>
          <div className="w-12 h-1 bg-white/30 my-3 mx-auto rounded-full"></div>
          <p className="text-sm md:text-base text-white/60 uppercase tracking-widest">
            for ZERO Motorcycles <br/>
            <span className="text-white font-medium">Global Marketing Director Candidate</span>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};