import React, { useState } from 'react';

interface DucatiScramblerCustomFlatTrackProps {
  onBack: () => void;
}

export const DucatiScramblerCustomFlatTrack: React.FC<DucatiScramblerCustomFlatTrackProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    'https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763928274764-bq2jz.png',
    'https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763928229476-6sv91g.png',
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto relative z-10 overflow-y-auto py-20">
        {/* Images Section - 2 images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-2">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl-custom"
              onClick={() => handleImageClick(imageUrl)}
            >
              <img
                src={imageUrl}
                alt={`Ducati Scrambler Custom Flat Track ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white/0 group-hover:text-white/80 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors z-10"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Magnified view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

