'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [loadingText, setLoadingText] = useState('Initialisation...')

  useEffect(() => {
    const texts = [
      'Préparation des dossiers...',
      'Vérification de la jurisprudence...',
      'Convocation du jury...',
      'Prêt à plaider !'
    ]
    
    let i = 0
    const interval = setInterval(() => {
      setLoadingText(texts[i])
      i = (i + 1) % texts.length
    }, 800)

    const timer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f172a] text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
          className="relative mb-12"
        >
          {/* Outer Ring Animation */}
          <motion.div
            className="absolute -inset-8 border-2 border-primary/30 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-4 border-2 border-accent/20 rounded-full"
            animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo Fallback (SVG Icon for reliable loading) */}
          <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 overflow-hidden border-4 border-white/10">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-primary">
              <path fill="currentColor" d="M50 15L20 30L50 45L80 30L50 15Z" />
              <path fill="currentColor" d="M20 40V70L50 85V55L20 40Z" opacity="0.8" />
              <path fill="currentColor" d="M80 40V70L50 85V55L80 40Z" opacity="0.6" />
              <circle cx="50" cy="50" r="10" fill="#facc15" />
            </svg>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        >
          JURIQUIZ
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-primary/60 font-black uppercase tracking-[0.4em] text-[10px] mb-8"
        >
          L'EXCELLENCE JURIDIQUE
        </motion.p>

        {/* Loading Indicator */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
        
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/40 text-xs font-medium"
        >
          {loadingText}
        </motion.p>
      </div>

      {/* Powered by Wockytech */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Powered by</span>
        <span className="text-sm font-black tracking-tight text-white/40">Wockytech</span>
      </motion.div>
    </motion.div>
  )
}
