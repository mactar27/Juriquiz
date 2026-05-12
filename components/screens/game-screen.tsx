'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Dices, ArrowRight, Pause, RotateCcw, Home, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { TimerBar } from '@/components/game/timer-bar'
import { QuestionCard } from '@/components/game/question-card'
import { AnswerOptions } from '@/components/game/answer-options'
import { Scoreboard } from '@/components/game/scoreboard'
import { FeedbackOverlay } from '@/components/game/feedback-overlay'
import { DiceResult, calculateScore } from '@/types/game'

// Dynamic import for 3D dice to avoid SSR issues
const Dice3D = dynamic(
  () => import('@/components/game/dice-3d').then((mod) => mod.Dice3D),
  { ssr: false, loading: () => <DicePlaceholder /> }
)

function DicePlaceholder() {
  return (
    <div className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-card/50 flex items-center justify-center">
      <Dices className="w-16 h-16 text-muted-foreground animate-pulse" />
    </div>
  )
}

export function GameScreen() {
  const {
    players,
    currentPlayerIndex,
    gamePhase,
    currentQuestion,
    diceResult,
    roundNumber,
    totalRounds,
    lastAnswerCorrect,
    rollDice,
    answerQuestion,
    nextTurn,
    setGamePhase,
  } = useGameStore()

  const [isRolling, setIsRolling] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timeRemainingRef = useRef(15)

  const currentPlayer = players[currentPlayerIndex]

  const handleRollDice = useCallback(async () => {
    setIsRolling(true)
    await rollDice()
    setIsRolling(false)
    setSelectedAnswer(null)
  }, [rollDice])

  const handleDiceComplete = useCallback((result: DiceResult) => {
    timeRemainingRef.current = result.timeLimit
  }, [])

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null || isPaused) return
      setSelectedAnswer(index)
      answerQuestion(index, timeRemainingRef.current)
      setShowFeedback(true)
    },
    [selectedAnswer, answerQuestion, isPaused]
  )

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null && !isPaused) {
      // Time ran out, treat as wrong answer
      answerQuestion(-1, 0)
      setShowFeedback(true)
    }
  }, [selectedAnswer, answerQuestion, isPaused])

  const handleTimeTick = useCallback((remaining: number) => {
    timeRemainingRef.current = remaining
  }, [])

  const handleFeedbackComplete = useCallback(() => {
    setShowFeedback(false)
    nextTurn()
  }, [nextTurn])

  // Calculate points for display
  const pointsEarned = lastAnswerCorrect
    ? calculateScore(
        true,
        timeRemainingRef.current,
        diceResult?.bonusMultiplier || 1
      ) + (currentPlayer?.streak > 1 ? 5 * (currentPlayer.streak - 1) : 0)
    : 0

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,var(--secondary),var(--background))] relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between p-6 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary/10 flex items-center justify-center text-2xl shadow-sticker">
            {currentPlayer?.avatar}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Tour {roundNumber}/{totalRounds}</span>
            <h2 className="text-xl font-black text-primary leading-tight">{currentPlayer?.name}</h2>
          </div>
        </div>
        <Button
          onClick={() => setIsPaused(true)}
          className="rounded-2xl w-12 h-12 bg-white border-b-4 border-primary/20 text-primary hover:bg-secondary/50 shadow-sticker active:border-b-0 active:translate-y-1"
          size="icon"
        >
          <Pause className="w-6 h-6 fill-current" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-4">
        <div className="w-full h-4 bg-white/50 border-2 border-white rounded-full overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-primary rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{
              width: `${((roundNumber - 1) * players.length + currentPlayerIndex + 1) / (totalRounds * players.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        <AnimatePresence mode="wait">
          {/* Rolling phase */}
          {gamePhase === 'rolling' && (
            <motion.div
              key="rolling"
              className="w-full flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Dice3D 
                isRolling={isRolling} 
                onRollComplete={handleDiceComplete} 
                playerNames={players.map(p => p.name)}
                targetFace={((currentPlayerIndex + 1) % players.length) + 1}
              />
              
              <div className="w-full max-w-sm">
                <Button
                  onClick={handleRollDice}
                  disabled={isRolling}
                  className="w-full h-20 text-2xl font-black gap-4 bg-primary text-white border-b-8 border-primary/40 hover:bg-primary/90 rounded-[2rem] shadow-sticker disabled:opacity-50 active:border-b-0 active:translate-y-1 transition-all"
                  size="lg"
                >
                  <Dices className="w-8 h-8" />
                  {isRolling ? 'LANCEMENT...' : 'LANCER LE DÉ'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Question phase */}
          {gamePhase === 'question' && currentQuestion && diceResult && (
            <motion.div
              key="question"
              className="w-full max-w-lg space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TimerBar
                duration={diceResult.timeLimit}
                isActive={selectedAnswer === null}
                isPaused={isPaused}
                onTimeUp={handleTimeUp}
                onTick={handleTimeTick}
              />

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <QuestionCard question={currentQuestion} diceResult={diceResult} />
              </div>

              <AnswerOptions
                question={currentQuestion}
                onAnswer={handleAnswer}
                disabled={selectedAnswer !== null}
                showResult={selectedAnswer !== null}
                selectedIndex={selectedAnswer ?? undefined}
              />
            </motion.div>
          )}

          {/* Turn transition */}
          {gamePhase === 'turnTransition' && (
            <motion.div
              key="transition"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="w-32 h-32 rounded-[2.5rem] bg-white border-8 border-primary/20 flex items-center justify-center text-6xl shadow-sticker"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {players[(currentPlayerIndex + 1) % players.length]?.avatar}
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-primary/60 text-xs font-black uppercase tracking-[0.3em]">C'est au tour de</p>
                <p className="text-4xl font-black text-primary drop-shadow-sm">
                  {players[(currentPlayerIndex + 1) % players.length]?.name}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scoreboard - Fixed at bottom */}
      <div className="p-6">
        <Scoreboard players={players} currentPlayerIndex={currentPlayerIndex} />
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {showFeedback && currentQuestion && (
          <FeedbackOverlay
            correct={lastAnswerCorrect || false}
            points={pointsEarned}
            streak={currentPlayer?.streak || 0}
            explanation={currentQuestion.explanation}
            onComplete={handleFeedbackComplete}
          />
        )}
      </AnimatePresence>

      {/* Pause Menu Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary-foreground/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm bg-white border-[6px] border-primary/10 rounded-[3rem] p-10 shadow-sticker overflow-hidden relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              
              <h2 className="text-4xl font-black text-primary text-center mb-10 tracking-tight">PAUSE</h2>
              
              <div className="space-y-6">
                <Button
                  onClick={() => setIsPaused(false)}
                  className="w-full h-16 text-xl font-black bg-primary text-white border-b-8 border-primary/40 rounded-2xl flex items-center justify-center gap-3 active:border-b-0 active:translate-y-1 shadow-sticker"
                >
                  <ArrowRight className="w-7 h-7" />
                  REPRENDRE
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Voulez-vous vraiment recommencer la partie ?')) {
                      setGamePhase('setup')
                    }
                  }}
                  className="w-full h-16 text-lg font-bold text-primary hover:bg-secondary/50 rounded-2xl flex items-center justify-center gap-3"
                >
                  <RotateCcw className="w-6 h-6" />
                  Recommencer
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Voulez-vous vraiment quitter ? Votre progression sera perdue.')) {
                      setGamePhase('home')
                    }
                  }}
                  className="w-full h-16 text-lg font-bold text-destructive hover:bg-destructive/10 rounded-2xl flex items-center justify-center gap-3"
                >
                  <Home className="w-6 h-6" />
                  Quitter
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
