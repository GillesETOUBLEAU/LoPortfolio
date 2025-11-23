import React, { useState } from 'react';
import { OrbitDiagram } from '../components/OrbitDiagram';
import { NavItem, OrbitCenterData, OrbitNodeData } from '../types';

const ecosystemData = {
  product: {
    center: { label: 'PRODUCT', subLabel: 'Lifecycle Management / Extend Target' },
    nodes: [
      { id: '1', label: 'Porsche Panamera', position: 'top' },
      { id: '2', label: 'MTS V4', position: 'right' },
      { id: '3', label: 'Monster', position: 'bottom' },
      { id: '4', label: 'Scrambler', subLabel: 'Awareness', position: 'left' },
      { id: '5', label: 'New 911', subLabel: '997 Type', position: 'top-left' },
      { id: '6', label: 'Phygital', position: 'top-right' },
      { id: '7', label: 'X Diavel', position: 'bottom-right' },
    ] as OrbitNodeData[]
  },
  crm: {
    center: { label: 'WEB UX', subLabel: 'Ducati France / Benchmark' },
    nodes: [
      { id: '1', label: 'Salesforce', subLabel: 'WW CRM', position: 'top' },
      { id: '2', label: 'Lead Management', subLabel: 'Web', position: 'right' },
      { id: '3', label: 'Call Center', position: 'bottom' },
      { id: '4', label: 'Test Rides', subLabel: 'Dealer Shop / Events', position: 'left' },
      { id: '5', label: 'Conversion', subLabel: 'Test Ride Sales', position: 'top-left' },
      { id: '6', label: 'Conversion', subLabel: 'Leads Test Ride', position: 'bottom-left' },
    ] as OrbitNodeData[]
  },
  press: {
    center: { label: 'PRESS / MEDIA', subLabel: '& Influencers Activations' },
    nodes: [
      { id: '1', label: 'Carrera GT', position: 'top' },
      { id: '2', label: 'X Diavel', position: 'right' },
      { id: '3', label: 'Unforgettable Invitation', position: 'bottom' },
      { id: '4', label: 'Scrambler', subLabel: 'Flat Track', position: 'left' },
      { id: '5', label: 'Intern. Premiere', subLabel: 'Louvre', position: 'top-right' },
      { id: '6', label: 'Crossing Paris at Dawn', position: 'right' }, 
      { id: '7', label: 'Alpes Moto Aventure', position: 'left' }, 
    ] as OrbitNodeData[]
  },
  dealer: {
    center: { label: 'DEALER MARKETING', subLabel: 'Guidelines' },
    nodes: [
      { id: '1', label: 'CRM Salesforce', position: 'top' },
      { id: '2', label: 'Local Marketing Plan', position: 'right' },
      { id: '3', label: 'Desert X', position: 'bottom-right' },
      { id: '4', label: 'Lead Management', position: 'bottom-left' },
      { id: '5', label: 'Guidelines', position: 'left' },
      { id: '6', label: 'Dealer MKG', subLabel: 'Worldwide Guidelines', position: 'bottom-right' }, // Adjusted position for visual balance
    ] as OrbitNodeData[]
  }
};

export const OrbitSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'crm' | 'press' | 'dealer'>('product');

  const tabs = [
    { id: 'product', label: 'Product Lifecycle' },
    { id: 'crm', label: 'Web / CRM' },
    { id: 'press', label: 'Press & Activation' },
    { id: 'dealer', label: 'Dealer Marketing' },
  ];

  const currentData = ecosystemData[activeTab];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-grid-5">
      {/* Sub-navigation for the orbit system */}
      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-full mb-20 z-30 flex-wrap justify-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orbit Visualization */}
      <div className="flex-1 w-full relative pt-8">
         <OrbitDiagram 
            key={activeTab} // Force re-render on tab change for animation
            center={currentData.center} 
            nodes={currentData.nodes} 
            title={tabs.find(t => t.id === activeTab)?.label}
        />
      </div>
    </div>
  );
};