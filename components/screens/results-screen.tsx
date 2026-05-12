'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, RotateCcw, Home, Share2, Crown, Target, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { Player, getPlayerTitle } from '@/types/game'

export function ResultsScreen() {
  const { players, resetGame, setGamePhase } = useGameStore()
  const [showStats, setShowStats] = useState(false)

  // Sort players by score
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = rankedPlayers[0]

  useEffect(() => {
    // Fire confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#6366f1', '#f5f5f5'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#6366f1', '#f5f5f5'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Show stats after podium animation
    setTimeout(() => setShowStats(true), 2000)
  }, [])

  const handlePlayAgain = () => {
    resetGame()
    setGamePhase('setup')
  }

  const handleGoHome = () => {
    resetGame()
    setGamePhase('home')
  }

  const handleShare = () => {
    const text = `JuriQuiz Senegal - Resultats\n\n${rankedPlayers
      .map((p, i) => `${i + 1}. ${p.name}: ${p.score} pts (${getPlayerTitle(p.score)})`)
      .join('\n')}`
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold gradient-text">Partie terminee!</h1>
      </motion.div>

      {/* Podium */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {players.length >= 2 ? (
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* Second place */}
            {rankedPlayers[1] && (
              <PodiumPlace
                player={rankedPlayers[1]}
                place={2}
                height={120}
                delay={0.4}
              />
            )}

            {/* First place */}
            <PodiumPlace
              player={rankedPlayers[0]}
              place={1}
              height={160}
              delay={0.2}
            />

            {/* Third place */}
            {rankedPlayers[2] && (
              <PodiumPlace
                player={rankedPlayers[2]}
                place={3}
                height={80}
                delay={0.6}
              />
            )}
          </div>
        ) : (
          // Single player result
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          >
            <div className="relative inline-block">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl"
                animate={{
                  boxShadow: [
                    '0 0 30px oklch(0.55 0.20 260 / 0.5)',
                    '0 0 60px oklch(0.55 0.20 260 / 0.8)',
                    '0 0 30px oklch(0.55 0.20 260 / 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {winner.avatar}
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <Crown className="w-10 h-10 text-primary fill-primary" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mt-4">
              {winner.name}
            </h2>
            <p className="text-4xl font-bold gradient-text mt-2">
              {winner.score} points
            </p>
            <p className="text-muted-foreground mt-1">
              {getPlayerTitle(winner.score)}
            </p>
          </motion.div>
        )}

        {/* Stats cards */}
        {showStats && (
          <motion.div
            className="w-full max-w-md space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {rankedPlayers.map((player, index) => (
              <StatsCard key={player.id} player={player} rank={index + 1} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <motion.div
        className="space-y-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full h-12 gap-2"
        >
          <Share2 className="w-5 h-5" />
          Partager les resultats
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={handleGoHome}
            variant="secondary"
            className="flex-1 h-12 gap-2"
          >
            <Home className="w-5 h-5" />
            Accueil
          </Button>
          <Button
            onClick={handlePlayAgain}
            className="flex-1 h-12 gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground"
          >
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

interface PodiumPlaceProps {
  player: Player
  place: number
  height: number
  delay: number
}

function PodiumPlace({ player, place, height, delay }: PodiumPlaceProps) {
  const colors = {
    1: 'from-primary to-accent',
    2: 'from-gray-400 to-gray-500',
    3: 'from-amber-700 to-amber-800',
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
    >
      {/* Avatar */}
      <motion.div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2
          ${place === 1 ? 'ring-4 ring-primary' : 'ring-2 ring-border'}
          bg-card
        `}
        animate={place === 1 ? {
          boxShadow: [
            '0 0 20px oklch(0.55 0.20 260 / 0.4)',
            '0 0 40px oklch(0.55 0.20 260 / 0.7)',
            '0 0 20px oklch(0.55 0.20 260 / 0.4)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {player.avatar}
        {place === 1 && (
          <motion.div
            className="absolute -top-3 -right-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.5, type: 'spring' }}
          >
            <Crown className="w-6 h-6 text-primary fill-primary" />
          </motion.div>
        )}
      </motion.div>

      {/* Name */}
      <p className="text-sm font-medium text-foreground mb-2 truncate max-w-20">
        {player.name}
      </p>

      {/* Podium block */}
      <motion.div
        className={`w-20 rounded-t-lg bg-gradient-to-b ${colors[place as 1 | 2 | 3]} flex flex-col items-center justify-start pt-3`}
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ delay: delay + 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-2xl font-bold text-white">{place}</span>
        <span className="text-lg font-bold text-white/90 mt-1">
          {player.score}
        </span>
      </motion.div>
    </motion.div>
  )
}

interface StatsCardProps {
  player: Player
  rank: number
}

function StatsCard({ player, rank }: StatsCardProps) {
  const accuracy = player.totalAnswers > 0
    ? Math.round((player.correctAnswers / player.totalAnswers) * 100)
    : 0

  return (
    <motion.div
      className="glass rounded-xl p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg">
            {player.avatar}
          </span>
          <div>
            <p className="font-medium text-foreground">{player.name}</p>
            <p className="text-xs text-muted-foreground">
              {getPlayerTitle(player.score)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>{accuracy}%</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Flame className="w-4 h-4" />
            <span>{player.streak}</span>
          </div>
          <div className="font-bold gradient-text">
            {player.score} pts
          </div>
        </div>
      </div>
    </motion.div>
  )
}
