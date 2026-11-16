// Decorative robot "agent core": a robot head inside rotating orbits of agent nodes.
// Pure SVG + CSS (see globals.css), so it costs no JavaScript and stops under
// prefers-reduced-motion.
const ring = (r: number, count: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((360 / count) * i + offset) * (Math.PI / 180);
    return { x: 200 + r * Math.cos(a), y: 200 + r * Math.sin(a) };
  });

const AgentCore = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      {/* Orbits */}
      <g className="orbit">
        <circle cx="200" cy="200" r="118" fill="none" className="stroke-brand-border" strokeWidth="1" strokeDasharray="3 9" />
        {ring(118, 3).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" className="fill-brand-accent-start" />
        ))}
      </g>
      <g className="orbit-rev">
        <circle cx="200" cy="200" r="156" fill="none" className="stroke-brand-border" strokeWidth="1" />
        {ring(156, 4, 30).map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="9" className="fill-brand-surface stroke-brand-accent-end" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="3" className="fill-brand-accent-end" />
          </g>
        ))}
      </g>
      <g className="orbit">
        <circle cx="200" cy="200" r="190" fill="none" className="stroke-brand-border" strokeWidth="1" strokeDasharray="1 12" />
        {ring(190, 5, 12).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" className="fill-brand-muted" />
        ))}
      </g>

      {/* Robot */}
      <g className="bot-float">
        {/* Antenna */}
        <line x1="200" y1="148" x2="200" y2="124" className="stroke-brand-accent-start" strokeWidth="3" strokeLinecap="round" />
        <circle cx="200" cy="118" r="7" className="bot-pulse fill-brand-accent-end" />
        <circle cx="200" cy="118" r="6" className="fill-brand-accent-end" />
        {/* Ears */}
        <rect x="126" y="184" width="12" height="32" rx="5" className="fill-brand-accent-start" />
        <rect x="262" y="184" width="12" height="32" rx="5" className="fill-brand-accent-start" />
        {/* Head */}
        <rect x="140" y="148" width="120" height="104" rx="26" className="fill-brand-surface stroke-brand-accent-start" strokeWidth="2.5" />
        {/* Eyes */}
        <rect x="163" y="178" width="24" height="24" rx="8" className="bot-eye fill-brand-accent-end" />
        <rect x="213" y="178" width="24" height="24" rx="8" className="bot-eye fill-brand-accent-end" />
        {/* Voice bars */}
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
        {/* Scan line */}
        <line x1="146" y1="148" x2="254" y2="148" className="bot-scan stroke-brand-accent-end" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default AgentCore;
