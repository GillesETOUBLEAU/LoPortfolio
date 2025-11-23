import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const Roadmap: React.FC = () => {
  const steps = [
    {
      title: "Clarify the positioning",
      desc: "Combine technological and emotional leadership.",
      icon: "🎯"
    },
    {
      title: "Boost visibility",
      desc: "Earned media, influencer marketing, viral storytelling.",
      icon: "🚀"
    },
    {
      title: "Create experiences",
      desc: "Test rides, lifestyle events, strategic partnerships.",
      icon: "⚡"
    },
    {
      title: "Drive performance",
      desc: "CRM, data-driven strategy, ROI marketing.",
      icon: "📈"
    }
  ];

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-grid-4">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">Roadmap for ZERO</h2>
        <p className="text-lg text-white/60 mb-8 md:mb-12">Accelerating ZERO's European growth.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Central Line for visual continuity */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block transform -translate-x-1/2"></div>

          {steps.map((step, idx) => (
            <div key={idx} className={`relative group ${idx % 2 !== 0 ? 'md:mt-12' : ''}`}>
               <GlassCard className="p-6 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/15">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shadow-inner border border-white/10">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>
                    </div>
                 </div>
               </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};