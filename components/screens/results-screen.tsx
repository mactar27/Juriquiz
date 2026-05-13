'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, RotateCcw, Home, Share2, Crown, Target, Flame, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { Player, getPlayerTitle } from '@/types/game'

const SENEGAL_COLORS = ['#00853f', '#fdef42', '#e31b23'] // Vert, Jaune, Rouge

export function ResultsScreen() {
  const { players, resetGame, rematch, setGamePhase } = useGameStore()
  const [showDetails, setShowDetails] = useState(false)

  // Sort players by score
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = rankedPlayers[0]

  useEffect(() => {
    // Fire Senegal-themed confetti
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: SENEGAL_COLORS })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: SENEGAL_COLORS })
    }, 250)

    // Show details after podium animation
    setTimeout(() => setShowDetails(true), 2500)

    return () => clearInterval(interval)
  }, [])

  const handleRematch = () => {
    rematch()
  }

  const handleGoHome = () => {
    resetGame()
    setGamePhase('home')
  }

  const handleShare = () => {
    const text = `🏆 JuriQuiz Sénégal - Résultats\n\n${rankedPlayers
      .map((p, i) => `${i + 1}. ${p.name}: ${p.score} pts (${getPlayerTitle(p.score)})`)
      .join('\n')}\n\nApprends le droit en jouant ! 🇸🇳`
    navigator.clipboard.writeText(text)
    alert('Résultats copiés !')
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-[radial-gradient(circle_at_top,var(--secondary),var(--background))] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block p-4 bg-white rounded-[2rem] shadow-sticker mb-4 border-4 border-primary/10">
          <Trophy className="w-12 h-12 text-warning" />
        </div>
        <h1 className="text-4xl font-black text-primary tracking-tight uppercase">Partie terminée !</h1>
        <p className="text-sm font-bold text-primary/60 uppercase tracking-widest mt-2">Le verdict est tombé</p>
      </motion.div>

      {/* Podium Area */}
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <div className="flex items-end justify-center gap-2 md:gap-6 w-full max-w-sm h-64">
          {/* Second Place */}
          {rankedPlayers[1] && (
            <PodiumColumn player={rankedPlayers[1]} rank={2} height="50%" delay={0.4} />
          )}
          
          {/* First Place */}
          {winner && (
            <PodiumColumn player={winner} rank={1} height="75%" delay={0.2} isWinner />
          )}

          {/* Third Place */}
          {rankedPlayers[2] && (
            <PodiumColumn player={rankedPlayers[2]} rank={3} height="35%" delay={0.6} />
          )}
        </div>
      </div>

      {/* Ranking List */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="w-full max-w-md mx-auto space-y-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] text-center mb-2">Tableau des scores</p>
            {rankedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-3xl bg-white border-4 border-primary/5 shadow-sticker"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl shadow-inner">
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-black text-foreground">{player.name}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{getPlayerTitle(player.score)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-primary">{player.score}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">pts</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Actions */}
      <motion.div
        className="mt-auto grid grid-cols-1 gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleGoHome}
            variant="ghost"
            className="h-16 rounded-[1.5rem] font-black text-primary border-4 border-primary/10 bg-white shadow-sticker active:border-b-0 active:translate-y-1"
          >
            <Home className="w-6 h-6 mr-2" />
            ACCUEIL
          </Button>
          <Button
            onClick={handleRematch}
            className="h-16 rounded-[1.5rem] font-black bg-primary text-white border-b-8 border-primary/40 shadow-sticker active:border-b-0 active:translate-y-1"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            REVANCHE
          </Button>
        </div>
        <Button
          onClick={handleShare}
          variant="ghost"
          className="h-14 rounded-2xl font-bold text-primary/60 border-2 border-dashed border-primary/20"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Partager le verdict
        </Button>
      </motion.div>
    </div>
  )
}

function PodiumColumn({ player, rank, height, delay, isWinner = false }: { player: Player, rank: number, height: string, delay: number, isWinner?: boolean }) {
  const colors = {
    1: 'bg-gradient-to-b from-yellow-300 to-yellow-500 border-yellow-200',
    2: 'bg-gradient-to-b from-slate-300 to-slate-400 border-slate-200',
    3: 'bg-gradient-to-b from-orange-400 to-orange-500 border-orange-300',
  }

  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }

  return (
    <motion.div
      className="flex flex-col items-center flex-1 h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
    >
      {/* Avatar + Crown */}
      <div className="relative mb-4">
        {isWinner && (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1.2 }}
            transition={{ delay: delay + 0.5, type: 'spring' }}
          >
            <Crown className="w-10 h-10 text-yellow-500 fill-yellow-500 drop-shadow-md" />
          </motion.div>
        )}
        <div className={`w-16 h-16 rounded-3xl bg-white border-4 flex items-center justify-center text-4xl shadow-sticker ${isWinner ? 'border-yellow-400' : 'border-primary/10'}`}>
          {player.avatar}
        </div>
      </div>

      {/* Name */}
      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 truncate w-full text-center">{player.name}</p>

      {/* The Column */}
      <motion.div
        className={`w-full rounded-t-[2rem] border-x-4 border-t-4 relative ${colors[rank as 1|2|3]} shadow-sticker`}
        style={{ height }}
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ delay: delay + 0.3, duration: 1, ease: 'circOut' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 gap-1">
          <span className="text-3xl filter grayscale-[0.5]">{medals[rank as 1|2|3]}</span>
          <span className="text-white font-black text-lg drop-shadow-sm">{player.score}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
