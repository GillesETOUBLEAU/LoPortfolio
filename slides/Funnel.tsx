import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const Funnel: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-grid-4">
      
      {/* Top Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
        {[
          { title: "Targeting", sub: "Segmentation" },
          { title: "Press/Influencers", sub: "Activations" },
          { title: "Dealer", sub: "Marketing" },
          { title: "Product", sub: "Launch & Lifecycle" }
        ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase mb-2">{item.title}</span>
                <span className="text-[10px] text-white/60">{item.sub}</span>
                <div className="h-6 w-px bg-white/20 mt-2"></div>
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white/20"></div>
            </div>
        ))}
      </div>

      {/* The Funnel Stack */}
      <div className="w-full max-w-3xl flex flex-col gap-2 relative">
         
         {/* Layer 1: Vision */}
         <GlassCard className="w-full p-4 flex justify-between items-center bg-white/20">
             <div className="w-32 text-xs font-bold text-white/50 text-right pr-4 hidden md:block">POSITION / REPUTATION</div>
             <div className="flex-1 text-center font-bold text-xl tracking-[0.2em]">VISION</div>
             <div className="w-32 text-xs text-white/50 pl-4 hidden md:block">Aided Brand Awareness</div>
         </GlassCard>

         {/* Layer 2: Image */}
         <div className="w-[95%] mx-auto">
            <GlassCard className="p-4 flex justify-between items-center">
                <div className="w-32 hidden md:block"></div>
                <div className="flex-1 text-center font-bold text-xl tracking-[0.2em]">IMAGE</div>
                <div className="w-32 text-xs text-white/50 pl-4 hidden md:block">Familiarity</div>
            </GlassCard>
         </div>

         {/* Layer 3: Experiences */}
         <div className="w-[85%] mx-auto">
            <GlassCard className="p-6 flex justify-between items-center bg-blue-500/10 border-blue-400/20">
                <div className="w-32 text-xs font-bold text-white/50 text-right pr-4 hidden md:block">DESIRABILITY</div>
                <div className="flex-1 text-center">
                    <div className="font-bold text-xl text-blue-200 tracking-[0.2em] mb-1">EXPERIENCES</div>
                    <div className="text-xs italic text-blue-100/70">Enrich client lives / Ride <br/> The test ride as a conversion tool</div>
                </div>
                <div className="w-32 text-xs text-white/50 pl-4 hidden md:block">Superiority</div>
            </GlassCard>
         </div>

         {/* Layer 4: Conversion */}
         <div className="w-[60%] mx-auto">
            <GlassCard className="p-4 flex justify-between items-center bg-white/5">
                 <div className="w-32 hidden md:block"></div>
                 <div className="flex-1 text-center font-bold text-xl tracking-[0.2em]">CONVERSION</div>
                 <div className="w-32 text-xs text-white/50 pl-4 hidden md:block">Purchase</div>
            </GlassCard>
         </div>

      </div>
    </div>
  );
};