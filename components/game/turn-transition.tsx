'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gavel, Scale } from 'lucide-react'
import { Player, DiceResult, DICE_FACES } from '@/types/game'
import { Button } from '@/components/ui/button'

interface TurnTransitionProps {
  player: Player
  onComplete: (result: DiceResult) => void
  isTransitioning: boolean
}



export function TurnTransition({ player, onComplete }: TurnTransitionProps) {
  const [isStamping, setIsStamping] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Prevent accidental clicks immediately after mount (e.g. from Enter key on previous screen)
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleTrigger = () => {
    if (!isReady || isStamping) return
    setIsStamping(true)
    
    // Pick a random category/difficulty result
    const randomFace = (Math.floor(Math.random() * 6) + 1)
    const result = DICE_FACES[randomFace]
    
    // Wait for the stamp animation to finish before proceeding
    setTimeout(() => {
      onComplete(result)
    }, 1800)
  }

  return (
    <div className="w-full max-w-md mx-auto aspect-square flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {!isStamping ? (
          <motion.div
            key="pre-transition"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-8"
          >
            <div className="relative">
              <motion.div 
                className="w-36 h-36 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-4 border-primary/20 shadow-inner"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <span className="text-7xl">{player.avatar}</span>
              </motion.div>
              <motion.div 
                className="absolute -top-2 -right-2 bg-warning text-warning-foreground p-3 rounded-2xl shadow-sticker rotate-12"
                animate={{ rotate: [12, 20, 12] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Gavel className="w-8 h-8" />
              </motion.div>
            </div>
            
            <div className="space-y-3">
              <p className="text-primary font-black tracking-[0.2em] text-sm uppercase opacity-60">Appel à la barre</p>
              <h2 className="text-5xl font-black text-foreground tracking-tight drop-shadow-sm">{player.name}</h2>
            </div>

            <Button
              onClick={handleTrigger}
              disabled={!isReady || isStamping}
              className={`
                h-20 px-12 text-2xl font-black bg-primary text-white border-b-[10px] border-primary/40 
                rounded-[2.5rem] shadow-sticker transition-all active:border-b-0 active:translate-y-2 group
                ${!isReady ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-primary/90 hover:translate-y-1'}
              `}
            >
              <span className="group-hover:scale-110 transition-transform inline-block mr-3">⚖️</span>
              OUVRIR LE DOSSIER
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="transitioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center"
          >
            {/* The "Judge's Stamp" Animation */}
            <motion.div
              initial={{ scale: 8, opacity: 0, rotate: -30 }}
              animate={{ 
                scale: [8, 1, 1.1, 1], 
                opacity: 1, 
                rotate: [-30, 0, 0, 0] 
              }}
              transition={{ duration: 0.6, times: [0, 0.5, 0.8, 1], ease: "backOut" }}
              className="w-56 h-56 bg-white rounded-full border-[15px] border-primary flex flex-col items-center justify-center shadow-sticker relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-20" />
              <Scale className="w-24 h-24 text-primary mb-1" />
              <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">OFFICIEL</p>
              
              {/* Ink Splash Effect */}
              <motion.div 
                className="absolute inset-0 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ delay: 0.25, duration: 0.15 }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 text-center"
            >
              <p className="text-3xl font-black text-primary tracking-widest italic">L'AUDIENCE EST OUVERTE</p>
              <div className="flex gap-2 justify-center mt-4">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-primary/40"
                    animate={{ scale: [1, 1.8, 1], backgroundColor: ["rgba(79, 70, 229, 0.4)", "rgba(79, 70, 229, 1)", "rgba(79, 70, 229, 0.4)"] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
