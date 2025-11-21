'use client';

interface GovernanceArchitectureDiagramProps {
  className?: string;
}

export function GovernanceArchitectureDiagram({ className = '' }: GovernanceArchitectureDiagramProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 600 400"
        className="w-full h-auto"
        aria-label="Two-layer governance architecture: Guardian monitors the Governance Layer which governs the six operational agents"
      >
        <defs>
          {/* Gradient for Guardian layer */}
          <linearGradient id="guardianGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.2" />
          </linearGradient>

          {/* Gradient for Governance layer */}
          <linearGradient id="govGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
          </linearGradient>

          {/* Pulse animation for monitoring */}
          <style>
            {`
              .pulse-ring {
                animation: pulseRing 3s ease-in-out infinite;
              }
              @keyframes pulseRing {
                0%, 100% { opacity: 0.3; transform-origin: center; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.05); }
              }
              .flow-arrow {
                animation: flowArrow 2s ease-in-out infinite;
              }
              @keyframes flowArrow {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.8; }
              }
            `}
          </style>
        </defs>

        {/* Layer 1: Guardian (Meta-Agent) */}
        <g>
          {/* Guardian container */}
          <rect
            x="100"
            y="20"
            width="400"
            height="80"
            rx="12"
            fill="url(#guardianGradient)"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <rect
            x="100"
            y="20"
            width="400"
            height="80"
            rx="12"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeOpacity="0.5"
            className="pulse-ring"
          />

          {/* Shield icon */}
          <path
            d="M 160 50 L 160 70 C 160 78 170 85 180 85 C 190 85 200 78 200 70 L 200 50 L 180 42 Z"
            fill="#64748b"
            fillOpacity="0.3"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <path
            d="M 180 52 L 180 68 M 172 60 L 188 60"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <text x="230" y="52" className="text-sm font-bold" fill="#475569">Guardian</text>
          <text x="230" y="72" className="text-[10px]" fill="#64748b">Monitors governance health &amp; detects blind spots</text>
        </g>

        {/* Arrow from Guardian to Governance */}
        <g className="flow-arrow">
          <path
            d="M 300 100 L 300 130"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text x="310" y="118" className="text-[8px]" fill="#94a3b8">monitors</text>
        </g>

        {/* Layer 2: Governance Layer */}
        <g>
          <rect
            x="100"
            y="140"
            width="400"
            height="80"
            rx="12"
            fill="url(#govGradient)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Lock icon */}
          <rect x="160" y="168" width="24" height="18" rx="3" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M 165 168 L 165 162 C 165 156 169 152 172 152 C 175 152 179 156 179 162 L 179 168"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />

          <text x="200" y="172" className="text-sm font-bold" fill="#1d4ed8">Governance Layer</text>
          <text x="200" y="192" className="text-[10px]" fill="#3b82f6">State machines • Sequence validators • Boundary enforcers</text>
        </g>

        {/* Arrow from Governance to Agents */}
        <g className="flow-arrow">
          <path
            d="M 300 220 L 300 260"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <polygon points="300,270 295,258 305,258" fill="#3b82f6" />
          <text x="310" y="248" className="text-[8px]" fill="#3b82f6">governs</text>
        </g>

        {/* Layer 3: Operational Agents */}
        <g>
          {/* Agent boxes */}
          {[
            { name: 'Sage', color: '#3b82f6', x: 60 },
            { name: 'Forge', color: '#f97316', x: 150 },
            { name: 'Ledger', color: '#eab308', x: 240 },
            { name: 'Pulse', color: '#22c55e', x: 330 },
            { name: 'Compass', color: '#a855f7', x: 420 },
          ].map((agent) => (
            <g key={agent.name}>
              <rect
                x={agent.x}
                y="280"
                width="80"
                height="50"
                rx="8"
                fill={agent.color}
                fillOpacity="0.15"
                stroke={agent.color}
                strokeWidth="1.5"
              />
              <text
                x={agent.x + 40}
                y="300"
                textAnchor="middle"
                className="text-xs font-semibold"
                fill={agent.color}
              >
                {agent.name}
              </text>
              <text
                x={agent.x + 40}
                y="318"
                textAnchor="middle"
                className="text-[8px]"
                fill="#6b7280"
              >
                {agent.name === 'Sage' && 'Strategy'}
                {agent.name === 'Forge' && 'Engineering'}
                {agent.name === 'Ledger' && 'Finance'}
                {agent.name === 'Pulse' && 'Growth'}
                {agent.name === 'Compass' && 'Decision'}
              </text>
            </g>
          ))}
        </g>

        {/* Labels for layers */}
        <text x="30" y="65" className="text-[9px] font-medium" fill="#64748b" transform="rotate(-90, 30, 65)">
          LAYER 2
        </text>
        <text x="30" y="185" className="text-[9px] font-medium" fill="#3b82f6" transform="rotate(-90, 30, 185)">
          LAYER 1
        </text>
        <text x="30" y="310" className="text-[9px] font-medium" fill="#6b7280" transform="rotate(-90, 30, 310)">
          AGENTS
        </text>

        {/* Connecting lines from governance to each agent */}
        <g opacity="0.4">
          {[100, 190, 280, 370, 460].map((x) => (
            <path
              key={x}
              d={`M 300 260 Q ${x} 265 ${x} 280`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
