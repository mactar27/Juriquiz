'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Question } from '@/types/game'

interface AnswerOptionsProps {
  question: Question
  onAnswer: (index: number) => void
  disabled: boolean
  showResult?: boolean
  selectedIndex?: number
}

const optionColors = [
  'from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border-red-500/30',
  'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border-blue-500/30',
  'from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 border-yellow-500/30',
  'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border-green-500/30',
]

const optionLabels = ['A', 'B', 'C', 'D']

export function AnswerOptions({
  question,
  onAnswer,
  disabled,
  showResult = false,
  selectedIndex,
}: AnswerOptionsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-3">
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctIndex
        const isSelected = index === selectedIndex
        const showCorrect = showResult && isCorrect
        const showWrong = showResult && isSelected && !isCorrect

        return (
          <motion.button
            key={index}
            onClick={() => !disabled && onAnswer(index)}
            disabled={disabled}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`
              relative w-full p-4 rounded-xl border-2 text-left
              transition-all duration-200
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              ${
                showCorrect
                  ? 'bg-success/30 border-success'
                  : showWrong
                  ? 'bg-destructive/30 border-destructive shake'
                  : `bg-gradient-to-r ${optionColors[index]}`
              }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-4">
              {/* Option label */}
              <span
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  font-bold text-lg
                  ${
                    showCorrect
                      ? 'bg-success text-success-foreground'
                      : showWrong
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-card text-card-foreground'
                  }
                `}
              >
                {showCorrect ? (
                  <Check className="w-5 h-5" />
                ) : showWrong ? (
                  <X className="w-5 h-5" />
                ) : (
                  optionLabels[index]
                )}
              </span>

              {/* Option text */}
              <span className="flex-1 text-foreground font-medium">{option}</span>
            </div>

            {/* Hover effect */}
            {hoveredIndex === index && !disabled && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId="option-highlight"
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
