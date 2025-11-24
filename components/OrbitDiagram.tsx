import React from 'react';
import { OrbitCenterData, OrbitNodeData } from '../types';
import { GlassCard } from './GlassCard';

interface OrbitDiagramProps {
  center: OrbitCenterData;
  nodes: OrbitNodeData[];
  title?: string;
  onNavigateToDetail?: (pageId: string, fromSlide: string, fromTab: 'product' | 'crm' | 'press' | 'dealer') => void;
  currentSlideId?: string;
  activeTab?: 'product' | 'crm' | 'press' | 'dealer';
}

// Helper function to calculate position for evenly spaced cards around a circle
// For 6 cards, each card is 60° apart (360° / 6 = 60°)
const getPositionStyle = (position: string, radius: number = 42): React.CSSProperties => {
  const angleMap: Record<string, number> = {
    'top': 0,
    'top-right-mid': 60,
    'bottom-right-mid': 120,
    'bottom': 180,
    'bottom-left-mid': 240,
    'top-left-mid': 300,
    // 7-card evenly spaced positions (360/7 ≈ 51.43° intervals)
    'top-right-mid-7': 51.43,
    'bottom-right-mid-7': 102.86,
    'bottom-right-mid-7-2': 154.29,
    'bottom-left-mid-7': 205.71,
    'bottom-left-mid-7-2': 257.14,
    'top-left-mid-7': 308.57,
    // 5-card evenly spaced positions (360/5 = 72° intervals)
    'top-right-mid-5': 72,
    'bottom-right-mid-5': 144,
    'bottom-left-mid-5': 216,
    'top-left-mid-5': 288,
    // 3-card evenly spaced positions (360/3 = 120° intervals) - avoiding bottom
    'top-right-mid-3': 120,
    'top-left-mid-3': 240,
    // Fallback positions for other tabs
    'right': 90,
    'left': 270,
    'top-right': 45,
    'top-left': 315,
    'bottom-right': 135,
    'bottom-left': 225,
  };

  const angle = angleMap[position] ?? 0;
  const angleRad = (angle * Math.PI) / 180;
  
  // Calculate x and y offsets from center (50%, 50%)
  const x = 50 + radius * Math.sin(angleRad);
  const y = 50 - radius * Math.cos(angleRad);

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
  };
};

const positionClasses = {
  'top': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'left': 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2',
  'right': 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
  'top-left': 'top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-[15%] left-[15%] -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-[15%] right-[15%] translate-x-1/2 translate-y-1/2',
  // These will use inline styles for precise positioning
  'top-right-mid': '',
  'bottom-right-mid': '',
  'bottom-left-mid': '',
  'top-left-mid': '',
};

export const OrbitDiagram: React.FC<OrbitDiagramProps> = ({ center, nodes, title, onNavigateToDetail, currentSlideId, activeTab }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-grid-4">
      {title && <h3 className="text-xl font-bold mb-12 text-center uppercase tracking-widest text-white/90">{title}</h3>}
      
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
        {/* Rotating container for orbit ring and arrows */}
        <div className="absolute inset-0 animate-spin-slow z-0" style={{ animationDuration: '60s' }}>
          {/* Main Orbit Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-white/60 border-dashed"></div>
          
          {/* Arrow elements positioned along the circle */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180); // Start at top, 30° intervals
            const radius = 50; // Percentage from center
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const rotation = (i * 30) % 360;
            
            return (
              <div
                key={`arrow-${i}`}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M 0 6 L 10 2 L 10 10 Z"
                    fill="rgba(255, 255, 255, 0.6)"
                  />
                </svg>
              </div>
            );
          })}
        </div>
        
        {/* Center Node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GlassCard intensity="high" className="w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-3 z-10 border-white/30">
            <h4 className="font-bold text-base text-white">{center.label}</h4>
            {center.subLabel && <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wide leading-tight">{center.subLabel}</p>}
          </GlassCard>
        </div>

        {/* Satellite Nodes */}
        {nodes.map((node) => {
          // Use inline styles for intermediate positions and standard positions when part of even distribution
          const useInlineStyle = [
            'top-right-mid', 'bottom-right-mid', 'bottom-left-mid', 'top-left-mid', 
            'top', 'bottom',
            'top-right-mid-7', 'bottom-right-mid-7', 'bottom-right-mid-7-2',
            'bottom-left-mid-7', 'bottom-left-mid-7-2', 'top-left-mid-7',
            'top-right-mid-5', 'bottom-right-mid-5', 'bottom-left-mid-5', 'top-left-mid-5',
            'top-right-mid-3', 'top-left-mid-3'
          ].includes(node.position);
          const style = useInlineStyle ? getPositionStyle(node.position) : undefined;
          const className = useInlineStyle ? 'absolute w-40 z-20' : `absolute ${positionClasses[node.position]} w-40 z-20`;
          
          // Check if this card should be clickable
          const isPorschePanamera = node.label === 'Porsche Panamera';
          const isDucatiMultistradaV4 = node.label === 'Ducati Multistrada V4';
          const isDucatiXDiavel = node.label === 'Ducati Diavel';
          const isDucatiMonster = node.label === 'Ducati Monster';
          const isDucatiScramblerAwareness = node.label === 'Ducati Scrambler' && node.subLabel === 'Awareness';
          const isDucatiScramblerCustomFlatTrack = node.label === 'Ducati Scrambler' && node.subLabel === 'Custom Flat Track';
          const isNewPorsche911 = node.label === 'New Porsche 911' && node.subLabel === '997 Type';
          const isPorscheCarreraGT = node.label === 'Porsche Carrera GT' && node.subLabel === 'World Premiere Le Louvre';
          const isDucatiXDiavelPress = node.label === 'Ducati DIAVEL' && node.subLabel === '2nd Year - Paris at Dawn movie';
          const isPorscheClubs50Year = node.label === 'Porsche Clubs 50 year' && node.subLabel === 'Le Mans Pit Lane Diner';
          const isAlpesAventureMotoFestival = node.label === 'Alpes Aventure Moto Festival' && node.subLabel === 'Ride with Antoine MEO';
          const isClickable = isPorschePanamera || isDucatiMultistradaV4 || isDucatiXDiavel || isDucatiMonster || isDucatiScramblerAwareness || isDucatiScramblerCustomFlatTrack || isNewPorsche911 || isPorscheCarreraGT || isDucatiXDiavelPress || isPorscheClubs50Year || isAlpesAventureMotoFestival;
          
          const handleClick = () => {
            if (!onNavigateToDetail || !currentSlideId) return;
            
            const tab = activeTab ?? 'product';
            
            if (isPorschePanamera) {
              onNavigateToDetail('porsche-panamera', currentSlideId, tab);
            } else if (isDucatiMultistradaV4) {
              onNavigateToDetail('ducati-multistrada-v4', currentSlideId, tab);
            } else if (isDucatiXDiavel) {
              onNavigateToDetail('ducati-x-diavel', currentSlideId, tab);
            } else if (isDucatiMonster) {
              onNavigateToDetail('ducati-monster', currentSlideId, tab);
            } else if (isDucatiScramblerAwareness) {
              onNavigateToDetail('ducati-scrambler-awareness', currentSlideId, tab);
            } else if (isDucatiScramblerCustomFlatTrack) {
              onNavigateToDetail('ducati-scrambler-custom-flat-track', currentSlideId, tab);
            } else if (isNewPorsche911) {
              onNavigateToDetail('new-porsche-911', currentSlideId, tab);
            } else if (isPorscheCarreraGT) {
              onNavigateToDetail('porsche-carrera-gt', currentSlideId, tab);
            } else if (isDucatiXDiavelPress) {
              onNavigateToDetail('ducati-x-diavel-press', currentSlideId, tab);
            } else if (isPorscheClubs50Year) {
              onNavigateToDetail('porsche-clubs-50-year', currentSlideId, tab);
            } else if (isAlpesAventureMotoFestival) {
              onNavigateToDetail('alpes-aventure-moto-festival', currentSlideId, tab);
            }
          };
          
          return (
            <div 
              key={node.id} 
              className={className}
              style={style}
            >
               <GlassCard 
                 intensity="medium" 
                 className={`p-4 text-center hover:bg-white/20 transition-colors duration-300 ${isClickable ? 'cursor-pointer' : ''}`}
                 onClick={isClickable ? handleClick : undefined}
               >
                  <span className="block font-semibold text-sm">{node.label}</span>
                  {node.subLabel && <span className="block text-xs text-white/60 mt-1">{node.subLabel}</span>}
               </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};