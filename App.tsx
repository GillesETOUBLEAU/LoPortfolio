import React from 'react';
import { Cover } from './slides/Cover';
import { Quote } from './slides/Quote';
import { Experience } from './slides/Experience';
import { Funnel } from './slides/Funnel';
import { OrbitSystem } from './slides/OrbitSystem';
import { Roadmap } from './slides/Roadmap';
import { Conclusion } from './slides/Conclusion';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import { DetailPageRouter } from './components/DetailPageRouter';
import { useAuth } from './hooks/useAuth';
import { useNavigationState } from './hooks/useNavigationState';
import { PageId } from './constants';
import { SCROLL_DEBOUNCE_MS } from './constants';

const slides = [
  { id: 'cover', component: Cover, label: 'Cover' },
  { id: 'quote', component: Quote, label: 'Vision' },
  { id: 'expertise', component: Experience, label: 'Expertise' },
  { id: 'funnel', component: Funnel, label: 'Funnel' },
  { id: 'ecosystem', component: OrbitSystem, label: 'Ecosystem' },
  { id: 'roadmap', component: Roadmap, label: 'Roadmap' },
  { id: 'conclusion', component: Conclusion, label: 'Conclusion' },
];

const App: React.FC = () => {
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const { state, setActiveSlide, setActiveTab, navigateToDetailPage, navigateBackToSlides } = useNavigationState(slides[0].id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const slideHeight = container.clientHeight;

    // Calculate current slide index
    const index = Math.round(scrollPosition / slideHeight);
    if (slides[index] && slides[index].id !== state.activeSlide) {
      setActiveSlide(slides[index].id);
    }
  };

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToDetailPage = (pageId: string, fromSlide: string, fromTab: 'product' | 'crm' | 'press' | 'dealer') => {
    navigateToDetailPage(pageId as PageId, fromSlide, fromTab);
  };

  const handleNavigateBackToSlides = () => {
    navigateBackToSlides();
    // Scroll to the slide we came from after a brief delay to ensure DOM is ready
    setTimeout(() => {
      scrollToSlide(state.returnToSlide);
    }, SCROLL_DEBOUNCE_MS);
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

  // Render detail page if we're not on the slides view
  if (state.currentPage !== 'slides') {
    return <DetailPageRouter pageId={state.currentPage} onBack={handleNavigateBackToSlides} />;
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* Global Background Noise/Gradient Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>
      
      <Navigation
        items={slides.map(s => ({ id: s.id, label: s.label }))}
        activeId={state.activeSlide}
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
              {slide.id === 'ecosystem' ? (
                <slide.component
                  onNavigateToDetail={handleNavigateToDetailPage}
                  activeTab={state.activeTab}
                  onTabChange={setActiveTab}
                />
              ) : (
                <slide.component onNavigateToDetail={handleNavigateToDetailPage} />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default App;