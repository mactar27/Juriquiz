'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FeedbackOverlayProps {
  correct: boolean
  points: number
  streak: number
  explanation?: string
  onComplete: () => void
}

export function FeedbackOverlay({
  correct,
  points,
  streak,
  explanation,
  onComplete,
}: FeedbackOverlayProps) {
  useEffect(() => {
    if (correct && streak >= 3) {
      // Fire confetti for streak
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#22c55e', '#f5f5f0'],
      })
    }

    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [correct, streak, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center text-center p-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Icon */}
        <motion.div
          className={`
            w-24 h-24 rounded-full flex items-center justify-center mb-6
            ${correct ? 'bg-success' : 'bg-destructive'}
          `}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4 }}
        >
          {correct ? (
            <Check className="w-12 h-12 text-success-foreground" />
          ) : (
            <X className="w-12 h-12 text-white" />
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          className={`text-3xl font-bold mb-4 ${
            correct ? 'text-success' : 'text-destructive'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {correct ? 'Correct!' : 'Faux!'}
        </motion.h2>

        {/* Points */}
        {correct && points > 0 && (
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-4xl font-bold gradient-text">+{points}</span>
            <span className="text-muted-foreground">points</span>
          </motion.div>
        )}

        {/* Streak */}
        {correct && streak >= 2 && (
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <Zap className="w-5 h-5 text-destructive fill-destructive" />
            <span className="font-bold text-destructive">
              Combo x{streak}
            </span>
          </motion.div>
        )}

        {/* Explanation */}
        {explanation && (
          <motion.p
            className="mt-6 text-muted-foreground max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {explanation}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
