import React, { useState, useEffect } from 'react';
import { Cover } from './slides/Cover';
import { Quote } from './slides/Quote';
import { Experience } from './slides/Experience';
import { Funnel } from './slides/Funnel';
import { OrbitSystem } from './slides/OrbitSystem';
import { TableBridge } from './slides/TableBridge';
import { Roadmap } from './slides/Roadmap';
import { Conclusion } from './slides/Conclusion';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import { useAuth } from './hooks/useAuth';

const slides = [
  { id: 'cover', component: Cover, label: 'Cover' },
  { id: 'quote', component: Quote, label: 'Vision' },
  { id: 'expertise', component: Experience, label: 'Expertise' },
  { id: 'funnel', component: Funnel, label: 'Funnel' },
  { id: 'ecosystem', component: OrbitSystem, label: 'Ecosystem' },
  { id: 'bridge', component: TableBridge, label: 'Bridge' },
  { id: 'roadmap', component: Roadmap, label: 'Roadmap' },
  { id: 'conclusion', component: Conclusion, label: 'Conclusion' },
];

const App: React.FC = () => {
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const [activeSlide, setActiveSlide] = useState(slides[0].id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const slideHeight = container.clientHeight;
    
    // Calculate current slide index
    const index = Math.round(scrollPosition / slideHeight);
    if (slides[index] && slides[index].id !== activeSlide) {
      setActiveSlide(slides[index].id);
    }
  };

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>
        <div className="relative z-10">Loading...</div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} isLoading={isLoading} error={error} />;
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* Global Background Noise/Gradient Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>
      
      <Navigation 
        items={slides.map(s => ({ id: s.id, label: s.label }))}
        activeId={activeSlide}
        onNavigate={scrollToSlide}
      />

      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
        onScroll={handleScroll}
      >
        {slides.map((slide) => (
          <section 
            key={slide.id} 
            id={slide.id}
            className="w-full h-screen snap-start relative flex items-center justify-center"
          >
            <div className="w-full h-full relative z-10">
              <slide.component />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default App;