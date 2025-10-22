interface TimerProps {
  timeRemaining: number
  timePerQuestion: number
}

export default function Timer({ timeRemaining, timePerQuestion }: TimerProps) {
  const percentage = (timeRemaining / timePerQuestion) * 100
  const isWarning = percentage < 25
  const isCritical = percentage < 10

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="2" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke={isCritical ? "#ef4444" : isWarning ? "#f59e0b" : "#3b82f6"}
            strokeWidth="2"
            strokeDasharray={`${(percentage / 100) * 125.6} 125.6`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-sm font-bold ${
              isCritical ? "text-red-600" : isWarning ? "text-amber-600" : "text-blue-600"
            }`}
          >
            {timeRemaining}s
          </span>
        </div>
      </div>
    </div>
  )
}
