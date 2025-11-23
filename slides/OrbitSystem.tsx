import React, { useState } from 'react';
import { OrbitDiagram } from '../components/OrbitDiagram';
import { NavItem, OrbitCenterData, OrbitNodeData } from '../types';

const ecosystemData = {
  product: {
    center: { label: 'PRODUCT', subLabel: 'Range extension, New Targets' },
    nodes: [
      { id: '1', label: 'Porsche Panamera', position: 'top' },
      { id: '2', label: 'Ducati Multistrada V4', position: 'top-right-mid' },
      { id: '3', label: 'Ducati X Diavel', position: 'bottom-right-mid' },
      { id: '4', label: 'Ducati Monster', position: 'bottom' },
      { id: '5', label: 'Ducati Scrambler', subLabel: 'Awareness', position: 'bottom-left-mid' },
      { id: '6', label: 'New Porsche 911', subLabel: '997 Type', position: 'top-left-mid' },
    ] as OrbitNodeData[]
  },
  crm: {
    center: { label: 'WEB UX', subLabel: 'Ducati France international benchmark' },
    nodes: [
      { id: '1', label: 'SALESFORCE', subLabel: 'WW CRM', position: 'top' },
      { id: '2', label: 'LEAD MANAGEMENT', subLabel: 'Web', position: 'top-right-mid' },
      { id: '3', label: 'CALL CENTER', position: 'bottom-right-mid' },
      { id: '4', label: 'CONVERSION', subLabel: 'Leads Test Ride', position: 'bottom' },
      { id: '5', label: 'TEST RIDES', subLabel: 'Dealer Shop / Events', position: 'bottom-left-mid' },
      { id: '6', label: 'CONVERSION', subLabel: 'Test Ride Sales', position: 'top-left-mid' },
    ] as OrbitNodeData[]
  },
  press: {
    center: { label: 'PRESS / MEDIA', subLabel: '& Influencers Activations' },
    nodes: [
      { id: '1', label: 'Porsche Carrera GT', subLabel: 'World Premiere Le Louvre', position: 'top' },
      { id: '2', label: 'Ducati X DIAVEL', subLabel: '2nd Year - Paris at Dawn movie', position: 'top-right-mid-5' },
      { id: '3', label: 'Porsche Clubs 50 year', subLabel: 'Le Mans Pit Lane Diner', position: 'bottom-right-mid-5' },
      { id: '4', label: 'Ducati Scrambler', subLabel: 'Custom Flat Track', position: 'bottom-left-mid-5' },
      { id: '5', label: 'Alpes Aventure Moto Festival', subLabel: 'Ride with Antoine MEO', position: 'top-left-mid-5' }, 
    ] as OrbitNodeData[]
  },
  dealer: {
    center: { label: 'DEALER MARKETING MANAGEMENT' },
    nodes: [
      { id: '1', label: 'CRM Salesforce', position: 'top' },
      { id: '2', label: 'Local Marketing Plan', subLabel: 'west europe', position: 'top-right-mid-3' },
      { id: '3', label: 'Dealer Marketing', subLabel: 'Ducati Desert X - Worldwide launch in the dealerships', position: 'top-left-mid-3' },
    ] as OrbitNodeData[]
  }
};

export const OrbitSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'crm' | 'press' | 'dealer'>('product');

  const tabs = [
    { id: 'product', label: 'Product Lifecycle' },
    { id: 'crm', label: 'Web / UX' },
    { id: 'press', label: 'Press and Influencers' },
    { id: 'dealer', label: 'Dealer Marketing' },
  ];

  const currentData = ecosystemData[activeTab];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-grid-5 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763918540624-ju35cr.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Blue Filter Overlay - same as other slides */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>

      {/* Sub-navigation for the orbit system */}
      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-full mb-[27px] z-30 flex-wrap justify-center relative z-10">
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
      <div className="flex-1 w-full relative pt-4 z-10">
         <OrbitDiagram 
            key={activeTab} // Force re-render on tab change for animation
            center={currentData.center} 
            nodes={currentData.nodes} 
        />
      </div>
    </div>
  );
};