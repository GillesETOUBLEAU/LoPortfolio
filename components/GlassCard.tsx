import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  border?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  intensity = 'medium',
  border = true,
  onClick
}) => {
  const bgOpacity = intensity === 'low' ? 'bg-white/5' : intensity === 'medium' ? 'bg-white/10' : 'bg-white/20';
  const blur = intensity === 'low' ? 'backdrop-blur-sm' : intensity === 'medium' ? 'backdrop-blur-md' : 'backdrop-blur-xl';
  const borderColor = border ? 'border border-glass-border' : '';
  
  return (
    <div 
      className={`${bgOpacity} ${blur} ${borderColor} rounded-xl-custom shadow-2xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};