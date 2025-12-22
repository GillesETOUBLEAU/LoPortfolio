import React from 'react';
import { NavItem } from '../types';

interface NavigationProps {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, activeId, onNavigate }) => {
  return (
    <nav className="fixed right-grid-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-grid-2" aria-label="Slide navigation">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${item.label} slide`}
          aria-current={activeId === item.id ? 'page' : undefined}
          title={item.label}
        >
          <span
            className={`mr-4 px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 absolute right-6 whitespace-nowrap`}
            aria-hidden="true"
          >
            {item.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
              activeId === item.id ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/50'
            }`}
            role="presentation"
          />
        </button>
      ))}
    </nav>
  );
};