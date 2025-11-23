import React, { CSSProperties, ReactNode } from 'react';

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
  { id: 'vision', label: 'VISION', widthPercent: 100, background: '#f3f4f7', borderColor: '#d7dce8' },
  { id: 'image', label: 'IMAGE', widthPercent: 92, background: '#e7e9ef', borderColor: '#ccd2df' },
  {
    id: 'experiences',
    label: 'EXPERIENCES',
    widthPercent: 82,
    background: '#1d4c8d',
    textColor: '#f1f5fe',
    borderColor: '#12315f',
    description: (
      <>
        <p className="text-xs font-semibold uppercase tracking-wide">Enrich client lifes / Ride</p>
        <p className="text-xs italic">The test ride - drive as a conversion tool.</p>
      </>
    ),
  },
  { id: 'conversion', label: 'CONVERSION', widthPercent: 62, background: '#d7dbe5', borderColor: '#c2c8d6' },
] as const;

const FunnelLayer: React.FC<LayerConfig> = ({
  label,
  widthPercent,
  background,
  textColor = '#0c2244',
  borderColor = '#d0d5e1',
  description,
}) => {
  const layerStyle: CSSProperties = {
    width: `${widthPercent}%`,
    background,
    border: `1px solid ${borderColor}`,
    clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative px-6 py-6 text-center shadow-md shadow-black/10"
        style={layerStyle}
      >
        <div
          className="text-2xl font-bold tracking-[0.35em]"
          style={{ color: textColor }}
        >
          {label}
        </div>
        {description ? <div className="mt-2 text-[#dbe6ff]">{description}</div> : null}
      </div>
    </div>
  );
};

export const Funnel: React.FC = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white px-4 py-10 text-[#0c2244]">
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
          <div className="flex w-full max-w-4xl flex-wrap items-start justify-between gap-6">
            {topInputs.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-full bg-white/90 px-6 py-4 text-center text-[#122f5d] shadow-lg shadow-black/10 backdrop-blur"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d2042]">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#3f4a61]">{item.subtitle}</span>
                <div className="mt-4 h-10 w-px bg-[#0d2042]" />
                <div className="h-0 w-0 border-x-4 border-t-6 border-x-transparent border-t-[#0d2042]" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px,1fr,200px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6 text-right">
            {leftStages.map((stage) => (
              <div key={stage.id} className="relative pr-6">
                <div className="rounded-l-full rounded-r-[2rem] bg-gradient-to-r from-[#dfe6f5] to-white px-4 py-4 shadow">
                  {stage.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm font-bold uppercase tracking-wide text-[#1b3773] leading-tight"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
                  <div className="h-0 w-0 border-y-[18px] border-y-transparent border-l-[20px] border-l-[#dfe6f5]" />
                </div>
              </div>
            ))}
          </div>

          {/* Central Funnel */}
          <div className="flex flex-col gap-4">
            {funnelLayers.map((layer) => (
              <FunnelLayer key={layer.id} {...layer} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center gap-3">
            {awarenessSteps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="w-full max-w-[170px] rounded-lg bg-gradient-to-r from-[#7b848f] to-[#4e5258] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">
                  {step}
                </div>
                {index < awarenessSteps.length - 1 ? (
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-[2px] bg-[#7b848f]" />
                    <div className="h-0 w-0 border-x-3 border-y-0 border-t-4 border-x-transparent border-t-[#7b848f]" />
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};