'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, Trophy, ShieldCheck, Info, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { 
    soundEnabled, 
    toggleSound, 
    totalRounds, 
    setTotalRounds,
    resetGame 
  } = useGameStore()

  const handleReset = () => {
    if (confirm('Voulez-vous vraiment réinitialiser toutes les données ?')) {
      resetGame()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent" />

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  Paramètres
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Settings List */}
              <div className="space-y-8">
                {/* Audio */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${soundEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </div>
                    <div>
                      <Label className="text-base font-bold">Effets Sonores</Label>
                      <p className="text-xs text-muted-foreground">Activer ou désactiver les sons</p>
                    </div>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={toggleSound}
                  />
                </div>

                {/* Rounds */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <Label className="text-base font-bold">Nombre de tours: {totalRounds}</Label>
                      <p className="text-xs text-muted-foreground">Durée de la partie par défaut</p>
                    </div>
                  </div>
                  <Slider
                    value={[totalRounds]}
                    onValueChange={(vals) => setTotalRounds(vals[0])}
                    max={20}
                    min={5}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>

                {/* Info */}
                <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                  <div className="flex gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-success" />
                    <span className="font-bold text-sm">Version 2.0 SN</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    JuriQuiz est conçu pour les étudiants en droit sénégalais. 
                    Le contenu est basé sur l'Introduction Générale au Droit et la Constitution de 2016.
                  </p>
                </div>

                {/* Reset */}
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser la progression
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">Fait avec ❤️ pour le Droit Sénégalais</p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
