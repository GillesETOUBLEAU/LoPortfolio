import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const Experience: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-grid-2 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1764531070705-dajxaq.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Blue Filter Overlay - same as Cover and Quote slides */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-grid-2 mb-grid-4 text-center relative z-10">
        {['Dual Sector Expertise', 'International Groups', 'Iconic Brands', '20 Years Experience'].map((item) => (
            <GlassCard key={item} intensity="low" className="py-3 px-2">
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">{item}</span>
            </GlassCard>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-grid-4 md:gap-grid-5 w-full max-w-5xl relative z-10">
        
        {/* Ducati Side */}
        <div className="flex-1 text-right space-y-4 order-2 md:order-1">
           <div className="text-2xl font-bold tracking-tight text-red-500">DUCATI</div>
           <ul className="text-white/70 text-sm space-y-1 text-right">
             <li>› Enrich people's lives</li>
             <li>› Be an entertainment brand</li>
           </ul>
        </div>

        {/* Center Gauge */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 order-1 md:order-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                {/* Ducati Segment (Red) - 1/3 starting from 6 o'clock, mirrored to left side */}
                <path
                    d="M 50 90 A 40 40 0 0 1 15.36 30"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                />
                {/* Porsche Segment (White) - 2/3 finishing the circle */}
                <path
                    d="M 15.36 30 A 40 40 0 1 1 50 90"
                    fill="transparent"
                    stroke="#ffffff"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-full w-48 h-48 flex flex-col items-center justify-center border border-white/20">
                    <h3 className="text-sm font-bold text-white/90">SALES GROWTH</h3>
                    <div className="w-8 h-px bg-white/30 my-1"></div>
                    <h3 className="text-sm font-bold text-white/90">PREMIUM POSITIONING</h3>
                </div>
            </div>
        </div>

        {/* Porsche Side */}
        <div className="flex-1 text-left space-y-4 order-3">
           <div className="text-2xl font-bold tracking-tight">PORSCHE</div>
           <p className="text-white/70 text-sm">Still the best sports car manufacturer</p>
        </div>
      </div>
    </div>
  );
};