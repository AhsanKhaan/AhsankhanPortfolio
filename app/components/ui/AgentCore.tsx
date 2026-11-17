// Decorative robot "agent core": a robot head inside rotating orbits of agent nodes.
// Each orbit ring is a separate SVG in its own HTML layer, so the rotation runs on the
// compositor instead of repainting SVG every frame. All motion is CSS (globals.css),
// starts after html.motion-ready, and stops under prefers-reduced-motion.
type Pt = { x: number; y: number };

const ring = (r: number, count: number, offset = 0): Pt[] =>
  Array.from({ length: count }, (_, i) => {
    const a = ((360 / count) * i + offset) * (Math.PI / 180);
    return { x: 200 + r * Math.cos(a), y: 200 + r * Math.sin(a) };
  });

const Layer = ({ children, reverse, slow }: { children: React.ReactNode; reverse?: boolean; slow?: boolean }) => (
  <div className="orbit-layer" data-reverse={reverse || undefined} data-slow={slow || undefined}>
    <svg viewBox="0 0 400 400" className="h-full w-full" focusable="false">
      {children}
    </svg>
  </div>
);

const AgentCore = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <Layer>
        <circle cx="200" cy="200" r="118" fill="none" className="stroke-brand-border" strokeWidth="1" strokeDasharray="3 9" />
        {ring(118, 3).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" className="fill-brand-accent-start" />
        ))}
      </Layer>
      <Layer reverse>
        <circle cx="200" cy="200" r="156" fill="none" className="stroke-brand-border" strokeWidth="1" />
        {ring(156, 4, 30).map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="9" className="fill-brand-surface stroke-brand-accent-end" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="3" className="fill-brand-accent-end" />
          </g>
        ))}
      </Layer>
      <Layer slow>
        <circle cx="200" cy="200" r="190" fill="none" className="stroke-brand-border" strokeWidth="1" strokeDasharray="1 12" />
        {ring(190, 5, 12).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" className="fill-brand-muted" />
        ))}
      </Layer>

      {/* Robot */}
      <div className="bot-float absolute inset-0">
        <svg viewBox="0 0 400 400" className="h-full w-full" focusable="false">
          <line x1="200" y1="148" x2="200" y2="124" className="stroke-brand-accent-start" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="118" r="7" className="bot-pulse fill-brand-accent-end" />
          <circle cx="200" cy="118" r="6" className="fill-brand-accent-end" />
          <rect x="126" y="184" width="12" height="32" rx="5" className="fill-brand-accent-start" />
          <rect x="262" y="184" width="12" height="32" rx="5" className="fill-brand-accent-start" />
          <rect x="140" y="148" width="120" height="104" rx="26" className="fill-brand-surface stroke-brand-accent-start" strokeWidth="2.5" />
          <rect x="163" y="178" width="24" height="24" rx="8" className="bot-eye fill-brand-accent-end" />
          <rect x="213" y="178" width="24" height="24" rx="8" className="bot-eye fill-brand-accent-end" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={175 + i * 11}
              y="218"
              width="6"
              height="16"
              rx="3"
              className="bot-eq fill-brand-accent-start"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
          <line x1="146" y1="148" x2="254" y2="148" className="bot-scan stroke-brand-accent-end" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default AgentCore;
