'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, X, Trophy, Hash, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { Slider } from '@/components/ui/slider'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { soundEnabled, toggleSound, totalRounds, setTotalRounds } = useGameStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm bg-white border-[6px] border-primary/10 rounded-[3rem] p-8 shadow-sticker relative overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-primary tracking-tight">PARAMÈTRES</h2>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/5 text-primary"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-8">
              {/* Sound Toggle */}
              <div className="space-y-4">
                <p className="text-xs font-black text-primary/40 uppercase tracking-widest flex items-center gap-2">
                  <Volume2 className="w-3 h-3" />
                  Environnement Sonore
                </p>
                <Button
                  onClick={toggleSound}
                  className={`w-full h-16 rounded-2xl flex items-center justify-between px-6 transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                    soundEnabled
                      ? 'bg-primary text-white border-primary/40'
                      : 'bg-white text-muted-foreground border-border/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    <span className="font-black text-lg">{soundEnabled ? 'ACTIF' : 'MUET'}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${soundEnabled ? 'bg-white/30' : 'bg-muted'}`}>
                    <motion.div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                      animate={{ left: soundEnabled ? 28 : 4 }}
                    />
                  </div>
                </Button>
              </div>

              {/* Rounds count */}
              <div className="space-y-4">
                <p className="text-xs font-black text-primary/40 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="w-3 h-3" />
                  Nombre de tours
                </p>
                <div className="p-6 bg-secondary/30 rounded-3xl border-2 border-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black text-primary">{totalRounds}</span>
                    <Trophy className="w-8 h-8 text-warning" />
                  </div>
                  <Slider
                    value={[totalRounds]}
                    min={5}
                    max={30}
                    step={5}
                    onValueChange={(val) => setTotalRounds(val[0])}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-primary/40 uppercase">
                    <span>Rapide</span>
                    <span>Standard</span>
                    <span>Marathon</span>
                  </div>
                </div>
              </div>

              {/* Version Info */}
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] font-black text-primary uppercase">Version 2026 PWA</p>
                  <p className="text-[10px] font-bold text-primary/60 uppercase">Contenu Juridique SN</p>
                </div>
              </div>
            </div>

            <Button
              onClick={onClose}
              className="w-full h-16 mt-10 text-lg font-black bg-primary text-white border-b-8 border-primary/40 rounded-2xl shadow-sticker active:border-b-0 active:translate-y-1"
            >
              VALIDER
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
