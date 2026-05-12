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
    <div className="w-full space-y-2">
      <AnimatePresence mode="popLayout">
        {rankedPlayers.map((player, rank) => {
          const isCurrentPlayer = players.indexOf(player) === currentPlayerIndex
          const isLeader = rank === 0 && player.score > 0
          
          return (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`
                flex items-center gap-3 p-3 rounded-xl
                transition-all duration-300
                ${
                  isCurrentPlayer
                    ? 'bg-primary/20 border-2 border-primary glow-pulse'
                    : 'bg-card/50 border border-border'
                }
              `}
            >
              {/* Rank or avatar */}
              <div className="relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-xl
                    ${isLeader ? 'bg-primary' : 'bg-secondary'}
                  `}
                >
                  {player.avatar}
                </div>
                {isLeader && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Crown className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                )}
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground truncate">
                    {player.name}
                  </span>
                  {player.streak >= 3 && (
                    <motion.div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <Flame className="w-3 h-3 text-destructive" />
                      <span className="text-xs font-bold text-destructive">
                        {player.streak}
                      </span>
                    </motion.div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
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
                <span className="text-xl font-bold gradient-text">
                  {player.score}
                </span>
                <span className="text-xs text-muted-foreground block">pts</span>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
