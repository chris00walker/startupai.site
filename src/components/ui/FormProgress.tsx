'use client';

interface FormProgressProps {
  steps: {
    label: string;
    completed: boolean;
  }[];
  className?: string;
}

export function FormProgress({ steps, className = '' }: FormProgressProps) {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                transition-all duration-300
                ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {step.completed ? (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 hidden sm:block">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
