import React from 'react';

export const Quote: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center p-grid-4 md:p-grid-5 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763917542140-1d8hs.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Blue Filter Overlay - same as Cover slide */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      <div className="max-w-4xl relative z-10">
        <span className="absolute -top-12 -left-12 text-9xl text-white/10 font-serif">“</span>
        
        <blockquote className="text-xl md:text-3xl font-light leading-relaxed text-white/90">
          Some people think of opportunity the way it’s defined <span className="font-bold text-white">in the dictionary</span>—as a set of circumstances that make something possible—and they talk about it as if it just arrives organically. You “spot opportunity” or wait around for “opportunity to knock.” 
          <br /><br />
          <span className="font-semibold text-white bg-white/10 px-2 py-1 rounded-lg box-decoration-clone">
            I believe that you have to be the architect of the circumstances
          </span>
          —that opportunity is something you manufacture, not something you wait for.
        </blockquote>

        <div className="mt-grid-4 flex items-center gap-grid-2">
            <div className="h-px flex-1 bg-white/20"></div>
            <cite className="not-italic text-lg font-medium text-white/60">Biz Stone, Twitter founder</cite>
        </div>
      </div>
    </div>
  );
};