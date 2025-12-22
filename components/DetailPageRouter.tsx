import React, { Suspense, lazy } from 'react';
import { PAGE_IDS, PageId } from '../constants';

// Lazy load all detail pages
const PorschePanamera = lazy(() => import('../pages/PorschePanamera').then(m => ({ default: m.PorschePanamera })));
const DucatiMultistradaV4 = lazy(() => import('../pages/DucatiMultistradaV4').then(m => ({ default: m.DucatiMultistradaV4 })));
const DucatiXDiavel = lazy(() => import('../pages/DucatiXDiavel').then(m => ({ default: m.DucatiXDiavel })));
const DucatiMonster = lazy(() => import('../pages/DucatiMonster').then(m => ({ default: m.DucatiMonster })));
const DucatiScramblerAwareness = lazy(() => import('../pages/DucatiScramblerAwareness').then(m => ({ default: m.DucatiScramblerAwareness })));
const NewPorsche911 = lazy(() => import('../pages/NewPorsche911').then(m => ({ default: m.NewPorsche911 })));
const PorscheCarreraGT = lazy(() => import('../pages/PorscheCarreraGT').then(m => ({ default: m.PorscheCarreraGT })));
const DucatiXDiavelPress = lazy(() => import('../pages/DucatiXDiavelPress').then(m => ({ default: m.DucatiXDiavelPress })));
const PorscheClubs50Year = lazy(() => import('../pages/PorscheClubs50Year').then(m => ({ default: m.PorscheClubs50Year })));
const DucatiScramblerCustomFlatTrack = lazy(() => import('../pages/DucatiScramblerCustomFlatTrack').then(m => ({ default: m.DucatiScramblerCustomFlatTrack })));
const AlpesAventureMotoFestival = lazy(() => import('../pages/AlpesAventureMotoFestival').then(m => ({ default: m.AlpesAventureMotoFestival })));

interface DetailPageRouterProps {
  pageId: PageId;
  onBack: () => void;
}

// Map page IDs to their components
const PAGE_COMPONENTS: Record<PageId, React.LazyExoticComponent<React.FC<{ onBack: () => void }>>> = {
  [PAGE_IDS.PORSCHE_PANAMERA]: PorschePanamera,
  [PAGE_IDS.DUCATI_MULTISTRADA_V4]: DucatiMultistradaV4,
  [PAGE_IDS.DUCATI_DESERT_X]: DucatiXDiavel,
  [PAGE_IDS.DUCATI_DIAVEL]: DucatiXDiavelPress,
  [PAGE_IDS.DUCATI_PANIGALE_V4]: DucatiScramblerCustomFlatTrack,
  [PAGE_IDS.PORSCHE_CAYENNE]: DucatiMonster,
  [PAGE_IDS.PORSCHE_911]: NewPorsche911,
  [PAGE_IDS.PORSCHE_TAYCAN]: PorscheCarreraGT,
  [PAGE_IDS.PORSCHE_MACAN]: PorscheClubs50Year,
  [PAGE_IDS.DUCATI_MONSTER]: DucatiScramblerAwareness,
  [PAGE_IDS.DUCATI_STREETFIGHTER]: AlpesAventureMotoFestival,
};

const LoadingFallback: React.FC = () => (
  <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden flex items-center justify-center">
    <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>
    <div className="relative z-10 text-lg">Loading...</div>
  </div>
);

export const DetailPageRouter: React.FC<DetailPageRouterProps> = ({ pageId, onBack }) => {
  const PageComponent = PAGE_COMPONENTS[pageId];

  if (!PageComponent) {
    console.error(`Unknown page ID: ${pageId}`);
    return (
      <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-2xl mb-4">Page not found</h1>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white font-sans overflow-hidden">
      {/* Global Background Noise/Gradient Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>

      <Suspense fallback={<LoadingFallback />}>
        <PageComponent onBack={onBack} />
      </Suspense>
    </div>
  );
};
