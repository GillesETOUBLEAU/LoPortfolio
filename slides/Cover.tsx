import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const Cover: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center max-w-5xl px-grid-4">
        <div className="flex justify-center items-center mb-grid-4">
             <h1 className="text-[120px] md:text-[200px] font-bold text-white/5 leading-none select-none absolute z-0">BOOK</h1>
             <div className="relative z-10 backdrop-blur-sm bg-white/5 p-8 rounded-xl-custom border border-white/10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Creative Marketing Book</h2>
                <p className="text-xl md:text-2xl text-white/70 font-light">From storytelling to storysharing</p>
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