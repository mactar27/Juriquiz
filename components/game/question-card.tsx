'use client'

import { motion } from 'framer-motion'
import { Question, DiceResult } from '@/types/game'

interface QuestionCardProps {
  question: Question
  diceResult: DiceResult
}

const difficultyLabels = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
}

const difficultyColors = {
  easy: 'text-success bg-success/20',
  medium: 'text-warning bg-warning/20',
  hard: 'text-destructive bg-destructive/20',
}

const typeLabels = {
  qcm: 'QCM',
  truefalse: 'Vrai/Faux',
  rapid: 'Rapide',
}

export function QuestionCard({ question, diceResult }: QuestionCardProps) {
  return (
    <motion.div
      className="w-full p-6 rounded-2xl glass"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
          {difficultyLabels[question.difficulty]}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          {typeLabels[question.type]}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
          {question.category}
        </span>
        {diceResult.bonusMultiplier > 1 && (
          <motion.span
            className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground glow-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            x{diceResult.bonusMultiplier} BONUS
          </motion.span>
        )}
      </div>

      {/* Question text */}
      <motion.h2
        className="text-xl font-semibold text-foreground leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question.text}
      </motion.h2>
    </motion.div>
  )
}
