import React from 'react';

interface DucatiMonsterProps {
  onBack: () => void;
}

export const DucatiMonster: React.FC<DucatiMonsterProps> = ({ onBack }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-grid-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763918540624-ju35cr.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Blue Filter Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 z-30 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl-custom text-white font-medium hover:bg-white/20 transition-colors duration-300 flex items-center gap-2"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back
      </button>

      {/* Video Container */}
      <div className="w-full max-w-5xl mx-auto relative z-10 flex items-center justify-center py-20">
        <div className="w-full aspect-video rounded-xl-custom overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/X7H3eQBNBEM?si=BrWP-ZDCrlg0uERf"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

