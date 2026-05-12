'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, FileText, Loader2, CheckCircle, AlertCircle, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'
import { Question } from '@/types/game'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

type ImportStatus = 'idle' | 'uploading' | 'generating' | 'success' | 'error'

export function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [status, setStatus] = useState<ImportStatus>('idle')
  const [generatedCount, setGeneratedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const { addQuestions } = useGameStore()

  const chapters = [
    "Introduction au Droit Objectif et Subjectif",
    "La Physionomie et les Caractères de la Règle de Droit",
    "Les Méthodes du Droit (Syllogisme, Présomptions)",
    "Les Sources du Droit (Loi, Règlement, Jurisprudence)",
    "Loi Constitutionnelle de 2016 (Quinquennat, HCCT)",
    "Les Droits Patrimoniaux et Extra-patrimoniaux",
    "Le Droit de la Preuve (Actes, Aveu, Serment)"
  ]

  const handleGenerate = useCallback(async () => {
    setStatus('generating')
    setError(null)

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération')
      }

      const data = await response.json()
      const questions: Question[] = data.questions

      addQuestions(questions)
      setGeneratedCount(questions.length)
      setStatus('success')

      // Auto close after success
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setGeneratedCount(0)
      }, 2000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  }, [addQuestions, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg bg-white border border-border rounded-3xl p-8 shadow-2xl overflow-hidden relative pointer-events-auto max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Générateur de Quiz IA
                  </h2>
                  <p className="text-sm text-muted-foreground">Source: Introduction Générale au Droit SN</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="space-y-4 mb-8">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">Chapitres inclus :</p>
                      <div className="grid gap-2">
                        {chapters.map((chapter, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-foreground bg-secondary/30 p-2 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            {chapter}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerate}
                      className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-lg shadow-primary/20"
                    >
                      <Loader2 className={`w-5 h-5 mr-2 ${status === 'generating' ? 'animate-spin' : 'hidden'}`} />
                      Générer les questions
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4 italic">
                      L'IA va composer 15 questions basées sur le cours officiel.
                    </p>
                  </motion.div>
                )}

                {status === 'generating' && (
                  <motion.div
                    key="loading"
                    className="py-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <Loader2 className="w-20 h-20 text-primary animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Scale className="w-8 h-8 text-primary/50" />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      Analyse du cours en cours...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      L'IA structure vos questions juridiques
                    </p>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    key="success"
                    className="py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-success" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {generatedCount} questions prêtes !
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Bonne chance pour votre révision.
                    </p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    className="py-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <p className="text-xl font-bold text-foreground">Erreur</p>
                    <p className="text-muted-foreground mt-2">{error}</p>
                    <Button
                      onClick={() => setStatus('idle')}
                      variant="outline"
                      className="mt-6"
                    >
                      Réessayer
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

