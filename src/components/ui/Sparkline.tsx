interface SparklineProps {
  /** Data points (values between 0-100 work best) */
  data?: number[];
  /** Color of the line */
  color?: string;
  /** Width of the sparkline */
  width?: number;
  /** Height of the sparkline */
  height?: number;
  className?: string;
}

export function Sparkline({
  data = [30, 45, 35, 60, 55, 75, 70, 85, 80, 95],
  color = '#3b82f6',
  width = 80,
  height = 24,
  className = '',
}: SparklineProps) {
  // Normalize data to fit within the height
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Generate path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Generate area fill path
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {/* Gradient fill under the line */}
      <defs>
        <linearGradient id={`sparkline-gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path
        d={areaD}
        fill={`url(#sparkline-gradient-${color.replace('#', '')})`}
      />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End point dot */}
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="2"
        fill={color}
      />
    </svg>
  );
}
