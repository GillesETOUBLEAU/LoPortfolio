import React, { CSSProperties, ReactNode } from 'react';
import { GlassCard } from '../components/GlassCard';

interface InputDescriptor {
  title: string;
  subtitle: string;
}

interface StageDescriptor {
  id: string;
  lines: ReadonlyArray<string>;
}

interface LayerConfig {
  id: string;
  label: string;
  widthPercent: number;
  clipPath: string;
  background: string;
  textColor?: string;
  borderColor?: string;
  description?: ReactNode;
}

const topInputs: ReadonlyArray<InputDescriptor> = [
  { title: 'PRESS INFLUENCERS', subtitle: 'activations' },
  { title: 'DEALER', subtitle: 'Marketing' },
  { title: 'OFF / ON', subtitle: 'Eco system' },
  { title: 'PRODUCT', subtitle: 'Launch & lifecycle management' },
] as const;

const leftStages: ReadonlyArray<StageDescriptor> = [
  { id: 'targeting', lines: ['TARGETING', 'SEGMENTATION'] },
  { id: 'position', lines: ['POSITION', 'REPUTATION', 'VISIBILITY'] },
  { id: 'premium', lines: ['PREMIUM POSITION', 'DESIRABILITY', 'ENTERTAINMENT'] },
] as const;

const awarenessSteps: ReadonlyArray<string> = [
  'Aided brand awareness',
  'Familiarity',
  'Superiority',
  'Possible purchase',
] as const;

const funnelLayers: ReadonlyArray<LayerConfig> = [
  { 
    id: 'vision', 
    label: 'VISION', 
    widthPercent: 100, 
    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
    background: 'rgba(255, 255, 255, 0.1)', 
    borderColor: 'rgba(255, 255, 255, 0.2)' 
  },
  { 
    id: 'image', 
    label: 'IMAGE', 
    widthPercent: 80, 
    clipPath: 'polygon(0 0, 100% 0, 87.5% 100%, 12.5% 100%)',
    background: 'rgba(255, 255, 255, 0.12)', 
    borderColor: 'rgba(255, 255, 255, 0.25)' 
  },
  {
    id: 'experiences',
    label: 'EXPERIENCES',
    widthPercent: 60,
    clipPath: 'polygon(0 0, 100% 0, 83.33% 100%, 16.66% 100%)',
    background: 'rgba(239, 68, 68, 0.3)',
    textColor: '#ffffff',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    description: (
      <>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Enrich clients' lives</p>
        <p className="text-xs italic text-white/70">The test ride - drive as a conversion tool.</p>
      </>
    ),
  },
  { 
    id: 'conversion', 
    label: 'CONVERSION', 
    widthPercent: 40, 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    background: 'rgba(255, 255, 255, 0.15)', 
    borderColor: 'rgba(255, 255, 255, 0.3)' 
  },
] as const;

const FunnelLayer: React.FC<LayerConfig> = ({
  label,
  widthPercent,
  clipPath,
  background,
  textColor = '#ffffff',
  borderColor = 'rgba(255, 255, 255, 0.2)',
  description,
}) => {
  const layerStyle: CSSProperties = {
    width: `${widthPercent}%`,
    clipPath,
    marginBottom: '-2px', // Overlap slightly to close gaps
  };

  // Adjust text size and tracking for smaller width layers (specifically Conversion)
  const isSmall = widthPercent <= 50;
  const textClass = isSmall 
    ? "text-lg font-bold tracking-[0.15em] break-all sm:break-normal" 
    : "text-2xl font-bold tracking-[0.35em]";

  return (
    <div className="flex justify-center">
      <GlassCard
        intensity="medium"
        className="relative px-6 py-6 text-center rounded-none"
        style={layerStyle}
      >
        <div
          className={textClass}
          style={{ color: textColor }}
        >
          {label}
        </div>
        {description ? <div className="mt-2">{description}</div> : null}
      </GlassCard>
    </div>
  );
};

export const Funnel: React.FC = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://ndbqdwlncrtrjztuiwvv.supabase.co/storage/v1/object/public/Images/68075dd2-1d43-464e-a8b1-814f49244abf/1763918125246-ho5xik.jpg"
          alt="Funnel background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/50 to-blue-950/60" />
      </div>
      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-10">
        {/* Top Inputs */}
        <div className="flex justify-center">
          <div className="flex w-full max-w-3xl flex-wrap items-start justify-between gap-6">
            {topInputs.map((item) => (
              <div key={item.title} className="flex flex-1 min-w-[140px] flex-col items-center text-center">
                <GlassCard intensity="low" className="w-full px-2 py-2 mb-4 flex flex-col items-center">
                    <span className="text-sm font-black uppercase tracking-[0.35em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {item.title}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                    {item.subtitle}
                    </span>
                </GlassCard>
                <div className="h-10 w-px bg-white/80" />
                <div className="h-0 w-0 border-x-4 border-t-6 border-x-transparent border-t-white/80" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full">
          {funnelLayers.map((layer, index) => {
            const leftStage = leftStages[index];
            const rightStep = awarenessSteps[index];

            return (
              <div key={layer.id} className="grid lg:grid-cols-[220px,1fr,200px] gap-8 items-center relative z-10" style={{ zIndex: funnelLayers.length - index }}>
                {/* Left Column */}
                <div className="flex justify-end">
                  {leftStage ? (
                    <div className="relative pr-6">
                      <GlassCard intensity="medium" className="px-4 py-4 rounded-l-full rounded-r-2xl">
                        {leftStage.lines.map((line) => (
                          <p
                            key={line}
                            className="text-sm font-bold uppercase tracking-wide text-white leading-tight"
                          >
                            {line}
                          </p>
                        ))}
                      </GlassCard>
                      <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
                        <div className="h-0 w-0 border-y-[18px] border-y-transparent border-l-[20px] border-l-white/10" />
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Center Column (Funnel) */}
                <FunnelLayer {...layer} />

                {/* Right Column */}
                <div className="flex flex-col items-center h-full justify-center relative">
                  {rightStep ? (
                    <>
                      <GlassCard intensity="medium" className="w-full max-w-[170px] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide relative z-10">
                        {rightStep}
                      </GlassCard>
                      {/* Vertical connecting line logic could go here if needed, but absolute positioning in parent is easier for continuous line */}
                      {index < awarenessSteps.length - 1 && (
                         <div className="absolute top-full h-full w-[2px] bg-white/30 -z-0" style={{ height: '100%', transform: 'translateY(-50%)' }}></div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};