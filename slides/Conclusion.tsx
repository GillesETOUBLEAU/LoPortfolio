import React from 'react';

export const Conclusion: React.FC = () => {
  return (
    <div className="h-full w-full relative flex flex-col justify-center items-center overflow-hidden bg-slate-950">
      {/* Logo in Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763919400415-zz2k8.jpeg" 
          alt="Logo" 
          className="h-16 md:h-20 w-auto object-contain"
        />
      </div>

      <div className="z-10 max-w-4xl p-grid-4 text-center">
        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
          From <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Pioneer</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Icon</span>
        </h2>

        <div className="inline-block border-t border-white/30 pt-8 mt-8">
          <p className="text-xl font-medium tracking-wide">Laurence Etoubleau</p>
          <p className="text-sm text-white/50 uppercase mt-1">Global Marketing Director Candidate</p>
        </div>
      </div>
    </div>
  );
};