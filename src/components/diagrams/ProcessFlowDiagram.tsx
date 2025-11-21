'use client';

interface ProcessFlowDiagramProps {
  className?: string;
}

export function ProcessFlowDiagram({ className = '' }: ProcessFlowDiagramProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 800 200"
        className="w-full h-auto"
        aria-label="AI Founders workflow: Sage analyzes, Forge builds, Ledger validates, Pulse tests, Compass recommends"
      >
        {/* Connecting lines with animation */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Animated dash pattern */}
          <style>
            {`
              .flow-line {
                stroke-dasharray: 8 4;
                animation: flowAnimation 20s linear infinite;
              }
              @keyframes flowAnimation {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: -120; }
              }
            `}
          </style>
        </defs>

        {/* Background flow line */}
        <path
          d="M 80 100 L 720 100"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeOpacity="0.3"
        />

        {/* Animated flow line */}
        <path
          d="M 80 100 L 720 100"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          className="flow-line"
        />

        {/* Arrow heads between nodes */}
        {[180, 308, 436, 564].map((x, i) => (
          <polygon
            key={i}
            points={`${x},95 ${x + 12},100 ${x},105`}
            fill={['#3b82f6', '#f97316', '#eab308', '#22c55e'][i]}
            opacity="0.8"
          />
        ))}

        {/* Sage - Blue */}
        <g>
          <circle cx="80" cy="100" r="35" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="80" cy="100" r="28" fill="white" />
          {/* Lightbulb icon */}
          <path
            d="M 80 85 C 72 85 66 91 66 99 C 66 104 69 108 73 110 L 73 116 L 87 116 L 87 110 C 91 108 94 104 94 99 C 94 91 88 85 80 85 Z M 76 119 L 84 119 L 84 122 L 76 122 Z"
            fill="#3b82f6"
          />
          <text x="80" y="155" textAnchor="middle" className="text-xs font-semibold" fill="#3b82f6">Sage</text>
          <text x="80" y="170" textAnchor="middle" className="text-[10px]" fill="#6b7280">Analyze</text>
        </g>

        {/* Forge - Orange */}
        <g>
          <circle cx="240" cy="100" r="35" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="2" />
          <circle cx="240" cy="100" r="28" fill="white" />
          {/* Hammer icon */}
          <path
            d="M 232 88 L 248 104 L 244 108 L 228 92 Z M 248 104 L 252 100 L 256 104 L 252 108 Z M 234 106 L 226 114 L 230 118 L 238 110 Z"
            fill="#f97316"
          />
          <text x="240" y="155" textAnchor="middle" className="text-xs font-semibold" fill="#f97316">Forge</text>
          <text x="240" y="170" textAnchor="middle" className="text-[10px]" fill="#6b7280">Build</text>
        </g>

        {/* Ledger - Gold */}
        <g>
          <circle cx="400" cy="100" r="35" fill="#eab308" fillOpacity="0.15" stroke="#eab308" strokeWidth="2" />
          <circle cx="400" cy="100" r="28" fill="white" />
          {/* Scale/balance icon */}
          <path
            d="M 400 86 L 400 114 M 388 90 L 412 90 M 388 90 L 384 102 L 392 102 Z M 412 90 L 408 102 L 416 102 Z M 394 114 L 406 114"
            fill="none"
            stroke="#eab308"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x="400" y="155" textAnchor="middle" className="text-xs font-semibold" fill="#eab308">Ledger</text>
          <text x="400" y="170" textAnchor="middle" className="text-[10px]" fill="#6b7280">Validate</text>
        </g>

        {/* Pulse - Green */}
        <g>
          <circle cx="560" cy="100" r="35" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
          <circle cx="560" cy="100" r="28" fill="white" />
          {/* Heartbeat/pulse icon */}
          <path
            d="M 544 100 L 550 100 L 554 88 L 560 112 L 566 92 L 570 100 L 576 100"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="560" y="155" textAnchor="middle" className="text-xs font-semibold" fill="#22c55e">Pulse</text>
          <text x="560" y="170" textAnchor="middle" className="text-[10px]" fill="#6b7280">Test</text>
        </g>

        {/* Compass - Purple */}
        <g>
          <circle cx="720" cy="100" r="35" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
          <circle cx="720" cy="100" r="28" fill="white" />
          {/* Compass icon */}
          <circle cx="720" cy="100" r="12" fill="none" stroke="#a855f7" strokeWidth="2" />
          <path
            d="M 720 88 L 723 97 L 720 94 L 717 97 Z M 720 112 L 717 103 L 720 106 L 723 103 Z"
            fill="#a855f7"
          />
          <path
            d="M 708 100 L 717 97 L 714 100 L 717 103 Z M 732 100 L 723 103 L 726 100 L 723 97 Z"
            fill="#a855f7"
            fillOpacity="0.5"
          />
          <text x="720" y="155" textAnchor="middle" className="text-xs font-semibold" fill="#a855f7">Compass</text>
          <text x="720" y="170" textAnchor="middle" className="text-[10px]" fill="#6b7280">Recommend</text>
        </g>

        {/* Guardian oversight indicator */}
        <g opacity="0.6">
          <path
            d="M 80 50 Q 400 30 720 50"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="400" y="28" textAnchor="middle" className="text-[9px]" fill="#64748b">
            Guardian Oversight
          </text>
          {/* Shield icon */}
          <path
            d="M 400 38 L 400 48 C 400 52 396 56 392 56 L 408 56 C 404 56 400 52 400 48 Z"
            fill="#94a3b8"
            transform="translate(0, -4) scale(0.8)"
          />
        </g>
      </svg>
    </div>
  );
}
