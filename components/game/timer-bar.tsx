'use client'

import { useEffect, useState, useRef } from 'react'
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
  const onTimeUpRef = useRef(onTimeUp)
  const onTickRef = useRef(onTick)

  // Update refs to avoid dependency issues in useEffect
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
    onTickRef.current = onTick
  }, [onTimeUp, onTick])

  // Reset timer when duration or isActive changes
  useEffect(() => {
    setTimeRemaining(duration)
  }, [duration, isActive])

  // The timer logic
  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = Math.max(0, prev - 0.1)
        if (onTickRef.current) onTickRef.current(next)
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive, isPaused])

  // Handle time up in a separate effect to avoid "update during render" warning
  useEffect(() => {
    if (isActive && timeRemaining <= 0) {
      onTimeUpRef.current()
    }
  }, [isActive, timeRemaining])

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
