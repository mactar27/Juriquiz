'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimerBarProps {
  duration: number
  isActive: boolean
  isPaused?: boolean
  onTimeUp: () => void
  onTick?: (remaining: number) => void
}

export function TimerBar({ duration, isActive, isPaused = false, onTimeUp, onTick }: TimerBarProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const progress = (timeRemaining / duration) * 100

  useEffect(() => {
    setTimeRemaining(duration)
  }, [duration, isActive])

  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 0.1
        if (newTime <= 0) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        onTick?.(newTime)
        return newTime
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive, isPaused, onTimeUp, onTick])

  // Color based on time remaining
  const getColor = () => {
    if (progress > 60) return 'bg-success'
    if (progress > 30) return 'bg-warning'
    return 'bg-destructive'
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Temps</span>
        <motion.span
          className={`text-lg font-bold ${
            timeRemaining <= 5 ? 'text-destructive' : 'text-foreground'
          }`}
          animate={timeRemaining <= 5 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeRemaining <= 5 ? Infinity : 0 }}
        >
          {Math.ceil(timeRemaining)}s
        </motion.span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor()}`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
