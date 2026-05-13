'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { HomeScreen } from '@/components/screens/home-screen'
import { SetupScreen } from '@/components/screens/setup-screen'
import { ResultsScreen } from '@/components/screens/results-screen'
import { ImportModal } from '@/components/import-modal'
import { SettingsModal } from '@/components/settings-modal'
import { SplashScreen } from '@/components/ui/splash-screen'
import { StatsModal } from '@/components/stats-modal'

// Dynamic import for GameScreen to avoid SSR issues with Three.js
const GameScreen = dynamic(
  () => import('@/components/screens/game-screen').then(mod => ({ default: mod.GameScreen })),
  { ssr: false, loading: () => <div className="min-h-screen flex items-center justify-center"><p className="text-foreground">Chargement...</p></div> }
)

export default function Home() {
  const { gamePhase } = useGameStore()
  const [showImportModal, setShowImportModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    setMounted(true)
    console.log('[v0] Component mounted, gamePhase:', gamePhase)
  }, [gamePhase])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground text-xl">Chargement de JuriQuiz...</p>
      </main>
    )
  }

  console.log('[v0] Rendering with gamePhase:', gamePhase)

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            {gamePhase === 'home' && (
              <HomeScreen 
                key="home" 
                onSettingsClick={() => setShowSettingsModal(true)}
                onStatsClick={() => setShowStatsModal(true)}
              />
            )}

            {gamePhase === 'setup' && (
              <SetupScreen key="setup" />
            )}

            {(gamePhase === 'rolling' || 
              gamePhase === 'question' || 
              gamePhase === 'feedback' || 
              gamePhase === 'turnTransition') && (
              <GameScreen key="game" />
            )}

            {gamePhase === 'finished' && (
              <ResultsScreen key="results" />
            )}
          </>
        )}
      </AnimatePresence>

      <ImportModal 
        isOpen={showImportModal} 
        onClose={() => setShowImportModal(false)} 
      />

      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </main>
  )
}
