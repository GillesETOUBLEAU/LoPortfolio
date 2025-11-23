import React from 'react';
import { OrbitCenterData, OrbitNodeData } from '../types';
import { GlassCard } from './GlassCard';

interface OrbitDiagramProps {
  center: OrbitCenterData;
  nodes: OrbitNodeData[];
  title?: string;
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

export const OrbitDiagram: React.FC<OrbitDiagramProps> = ({ center, nodes, title }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-grid-4">
      {title && <h3 className="text-xl font-bold mb-12 text-center uppercase tracking-widest text-white/90">{title}</h3>}
      
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
        {/* Main Orbit Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-white/60 border-dashed animate-spin-slow z-0" style={{ animationDuration: '60s' }}></div>
        
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
          const useInlineStyle = ['top-right-mid', 'bottom-right-mid', 'bottom-left-mid', 'top-left-mid', 'top', 'bottom'].includes(node.position);
          const style = useInlineStyle ? getPositionStyle(node.position) : undefined;
          const className = useInlineStyle ? 'absolute w-40 z-20' : `absolute ${positionClasses[node.position]} w-40 z-20`;
          
          return (
            <div 
              key={node.id} 
              className={className}
              style={style}
            >
               <GlassCard intensity="medium" className="p-4 text-center hover:bg-white/20 transition-colors duration-300">
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