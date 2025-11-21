interface IconProps {
  className?: string;
  size?: number;
}

// Sage - Strategy AI (Lightbulb)
export function SageIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Sage - Strategy AI"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
        fill="#3b82f6"
        fillOpacity="0.2"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      <path
        d="M9 21h6M10 17v4M14 17v4"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Forge - Engineering AI (Hammer/Code)
export function ForgeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Forge - Engineering AI"
    >
      <path
        d="M6 15l-2 2 4 4 2-2"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 5.5L18 9l-7.5 7.5L7 13l7.5-7.5z"
        fill="#f97316"
        fillOpacity="0.2"
        stroke="#f97316"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 5.5l2-2 4 4-2 2"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ledger - Finance AI (Scale/Balance)
export function LedgerIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Ledger - Finance AI"
    >
      <path
        d="M12 3v18M8 7l8 0"
        stroke="#eab308"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 7l-1 6h4l-1-6"
        fill="#eab308"
        fillOpacity="0.2"
        stroke="#eab308"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M19 7l1 6h-4l1-6"
        fill="#eab308"
        fillOpacity="0.2"
        stroke="#eab308"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 21h8"
        stroke="#eab308"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Pulse - Growth AI (Heartbeat/Chart)
export function PulseIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Pulse - Growth AI"
    >
      <path
        d="M3 12h4l2-8 4 16 2-8h6"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Compass - Decision AI (Compass)
export function CompassIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Compass - Decision AI"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#a855f7"
        strokeWidth="1.5"
      />
      <path
        d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
        fill="#a855f7"
        fillOpacity="0.2"
        stroke="#a855f7"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Guardian - Governance AI (Shield)
export function GuardianIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Guardian - Governance AI"
    >
      <path
        d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z"
        fill="#64748b"
        fillOpacity="0.2"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v4M12 16h.01"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Helper component to get icon by agent name
export function AgentIcon({
  agent,
  className = '',
  size = 24
}: {
  agent: 'Sage' | 'Forge' | 'Ledger' | 'Pulse' | 'Compass' | 'Guardian';
  className?: string;
  size?: number;
}) {
  const icons = {
    Sage: SageIcon,
    Forge: ForgeIcon,
    Ledger: LedgerIcon,
    Pulse: PulseIcon,
    Compass: CompassIcon,
    Guardian: GuardianIcon,
  };

  const IconComponent = icons[agent];
  return <IconComponent className={className} size={size} />;
}
