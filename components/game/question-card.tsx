'use client'

import { motion } from 'framer-motion'
import { Question, DiceResult } from '@/types/game'

interface QuestionCardProps {
  question: Question
  diceResult: DiceResult
}

const difficultyLabels = {
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile',
}

const difficultyColors = {
  facile: 'text-success bg-success/20',
  moyen: 'text-warning bg-warning/20',
  difficile: 'text-destructive bg-destructive/20',
}

const typeLabels = {
  qcm: 'QCM',
  'vrai-faux': 'Vrai/Faux',
  rapide: 'Rapide',
}

export function QuestionCard({ question, diceResult }: QuestionCardProps) {
  return (
    <motion.div
      className="w-full p-8 rounded-3xl bg-white border-[6px] border-primary/10 shadow-sticker relative overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-primary/20" />
      
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${difficultyColors[question.difficulty]}`}>
          {difficultyLabels[question.difficulty]}
        </span>
        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-secondary text-secondary-foreground">
          {typeLabels[question.type]}
        </span>
        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary">
          {question.category}
        </span>
        
        {diceResult.bonusMultiplier > 1 && (
          <motion.span
            className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-primary text-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            x{diceResult.bonusMultiplier} BONUS
          </motion.span>
        )}
      </div>

      {/* Question label */}
      <motion.h2
        className="text-2xl md:text-3xl font-black text-primary leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question.label}
      </motion.h2>
    </motion.div>
  )
}
