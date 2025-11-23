import React from 'react';
import { OrbitCenterData, OrbitNodeData } from '../types';
import { GlassCard } from './GlassCard';

interface OrbitDiagramProps {
  center: OrbitCenterData;
  nodes: OrbitNodeData[];
  title?: string;
}

const positionClasses = {
  'top': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'left': 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2',
  'right': 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
  'top-left': 'top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-[15%] left-[15%] -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-[15%] right-[15%] translate-x-1/2 translate-y-1/2',
};

export const OrbitDiagram: React.FC<OrbitDiagramProps> = ({ center, nodes, title }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-grid-4">
      {title && <h3 className="text-xl font-bold mb-grid-4 text-center uppercase tracking-widest text-white/90">{title}</h3>}
      
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
        {/* Main Orbit Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/10 border-dashed animate-spin-slow" style={{ animationDuration: '60s' }}></div>
        
        {/* Center Node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GlassCard intensity="high" className="w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-4 z-10 border-white/30">
            <h4 className="font-bold text-lg text-white">{center.label}</h4>
            {center.subLabel && <p className="text-xs text-white/60 mt-2 uppercase tracking-wide">{center.subLabel}</p>}
          </GlassCard>
        </div>

        {/* Satellite Nodes */}
        {nodes.map((node) => (
          <div 
            key={node.id} 
            className={`absolute ${positionClasses[node.position]} w-40 z-20`}
          >
             <GlassCard intensity="medium" className="p-4 text-center hover:bg-white/20 transition-colors duration-300">
                <span className="block font-semibold text-sm">{node.label}</span>
                {node.subLabel && <span className="block text-xs text-white/60 mt-1">{node.subLabel}</span>}
             </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
};