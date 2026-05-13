'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Flame } from 'lucide-react'
import { Player, getPlayerTitle } from '@/types/game'

interface ScoreboardProps {
  players: Player[]
  currentPlayerIndex: number
}

export function Scoreboard({ players, currentPlayerIndex }: ScoreboardProps) {
  // Sort players by score for ranking
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)
  
  return (
    <div className="w-full space-y-3">
      <AnimatePresence mode="popLayout">
        {rankedPlayers.map((player, rank) => {
          const isCurrentPlayer = players.indexOf(player) === currentPlayerIndex
          const isLeader = rank === 0 && player.score > 0
          const hasHighStreak = player.streak >= 3
          
          return (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`
                flex items-center gap-3 p-3 rounded-[1.5rem] border-4
                transition-all duration-300 relative
                ${
                  isCurrentPlayer
                    ? 'bg-primary/10 border-primary shadow-lg'
                    : 'bg-white border-primary/5 shadow-sticker'
                }
                ${hasHighStreak ? 'ring-2 ring-destructive/40 ring-offset-2' : ''}
              `}
            >
              {/* Rank or avatar */}
              <div className="relative">
                <div
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                    ${isLeader ? 'bg-warning/20 border-2 border-warning' : 'bg-secondary'}
                  `}
                >
                  {player.avatar}
                </div>
                {isLeader && (
                  <motion.div
                    className="absolute -top-3 -right-3"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Crown className="w-6 h-6 text-warning fill-warning drop-shadow-sm" />
                  </motion.div>
                )}
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-black truncate ${isCurrentPlayer ? 'text-primary' : 'text-foreground'}`}>
                    {player.name}
                  </span>
                  {hasHighStreak && (
                    <motion.div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-destructive text-white"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Flame className="w-3 h-3 fill-white" />
                      <span className="text-[10px] font-black">
                        {player.streak}
                      </span>
                    </motion.div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {getPlayerTitle(player.score)}
                </span>
              </div>

              {/* Score */}
              <motion.div
                className="text-right"
                key={player.score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-xl font-black text-primary">
                  {player.score}
                </span>
                <span className="text-[10px] font-black text-muted-foreground block uppercase">pts</span>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
