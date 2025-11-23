import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const TableBridge: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-grid-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763918893149-xanne.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Blue Filter Overlay - same as other slides */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-grid-4 text-center relative z-10">Bridges from Experience to ZERO</h2>
      
      <GlassCard className="w-full max-w-5xl overflow-hidden p-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Header Mobile Only */}
          <div className="md:hidden bg-white/10 p-4 font-bold border-b border-white/10">Comparative Table</div>

          {/* Column 1 */}
          <div className="p-grid-4 border-b md:border-b-0 md:border-r border-white/10">
            <h3 className="text-xl font-bold mb-6 text-white/90 pb-2 border-b border-white/20">ZERO's Needs</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Visibility & Reputation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Premium Positioning & Desirability</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Conversion</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Authenticity & DNA</span>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="p-grid-4 relative overflow-hidden">
             {/* Subtle gradient background for this col */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
             
             <h3 className="text-xl font-bold mb-6 text-white/90 pb-2 border-b border-white/20">Relevant Experience</h3>
             <ul className="space-y-6">
               <li className="flex items-start gap-3 group">
                 <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                 <div>
                   <p className="font-semibold text-white/90">Award-winning earned media campaigns</p>
                   <p className="text-sm text-white/60">at Porsche / Record Monster on track</p>
                 </div>
               </li>
               <li className="flex items-start gap-3 group">
                 <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                 <div>
                   <p className="font-semibold text-white/90">Lifestyle storytelling & repositioning</p>
                   <p className="text-sm text-white/60">at Ducati</p>
                 </div>
               </li>
               <li className="flex items-start gap-3 group">
                 <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                 <div>
                   <p className="font-semibold text-white/90">Porsche Driving School</p>
                   <p className="text-sm text-white/60">Test ride strategy</p>
                 </div>
               </li>
               <li className="flex items-start gap-3 group">
                 <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                 <div>
                   <p className="font-semibold text-white/90">Story Sharing</p>
                   <p className="text-sm text-white/60">Community & phygital events</p>
                 </div>
               </li>
             </ul>
          </div>
        </div>
      </GlassCard>

      {/* Visual Flow Indicator */}
      <div className="mt-8 flex items-center gap-4 text-white/50 text-sm font-medium uppercase tracking-widest relative z-10">
        <span>Porsche</span>
        <span className="text-white">→</span>
        <span>Ducati</span>
        <span className="text-white">→</span>
        <span className="text-blue-400 font-bold">ZERO</span>
      </div>
    </div>
  );
};