'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Target, Zap, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const { players } = useGameStore()

  // Sort players by score descending
  const sorted = [...players].sort((a, b) => b.score - a.score)

  const medals = ['🥇', '🥈', '🥉']

  const hasData = players.length > 0 && players.some(p => p.totalAnswers > 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-sticker"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary px-6 pt-8 pb-6 relative">
              <div className="absolute top-0 right-0 left-0 h-1 bg-white/10" />
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-2xl"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <BarChart2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-black uppercase tracking-widest">Dernière Partie</p>
                  <h2 className="text-2xl font-black text-white">Classement</h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              {!hasData ? (
                <div className="text-center py-10 space-y-3">
                  <p className="text-5xl">🏆</p>
                  <p className="text-lg font-black text-primary">Aucune partie jouée</p>
                  <p className="text-sm text-muted-foreground">Lancez une partie pour voir les statistiques !</p>
                </div>
              ) : (
                sorted.map((player, index) => {
                  const accuracy = player.totalAnswers > 0
                    ? Math.round((player.correctAnswers / player.totalAnswers) * 100)
                    : 0

                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className={`
                        flex items-center gap-4 p-4 rounded-2xl border-2
                        ${index === 0
                          ? 'bg-yellow-50 border-yellow-200'
                          : index === 1
                          ? 'bg-slate-50 border-slate-200'
                          : index === 2
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-white border-primary/10'}
                      `}
                    >
                      {/* Rank */}
                      <span className="text-2xl w-8 text-center">
                        {medals[index] || `#${index + 1}`}
                      </span>

                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-xl bg-white border-2 border-primary/10 flex items-center justify-center text-2xl shadow-sm">
                        {player.avatar}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-foreground truncate">{player.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {accuracy}%
                          </span>
                          {player.streak > 1 && (
                            <span className="flex items-center gap-1 text-warning">
                              <Zap className="w-3 h-3" />
                              ×{player.streak}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="text-xl font-black text-primary">{player.score}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">pts</p>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <Button
                onClick={onClose}
                className="w-full h-14 font-black bg-primary text-white border-b-4 border-primary/40 rounded-2xl shadow-sticker active:border-b-0 active:translate-y-1"
              >
                FERMER
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
