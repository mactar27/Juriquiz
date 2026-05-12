'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Upload, History, Settings, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/game-store'

interface HomeScreenProps {
  onImportClick: () => void
  onSettingsClick: () => void
}

export function HomeScreen({ onImportClick, onSettingsClick }: HomeScreenProps) {
  const { soundEnabled, setGamePhase } = useGameStore()
  const [logoError, setLogoError] = useState(false)

  const menuItems = [
    {
      icon: Play,
      label: 'Jouer',
      onClick: () => setGamePhase('setup'),
      primary: true,
    },
    {
      icon: Upload,
      label: 'Nouveau Quiz IA',
      onClick: onImportClick,
      primary: false,
    },
    {
      icon: History,
      label: 'Statistiques',
      onClick: () => {},
      primary: false,
    },
    {
      icon: Settings,
      label: 'Paramètres',
      onClick: onSettingsClick,
      primary: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 relative overflow-x-hidden bg-[radial-gradient(circle_at_center,var(--secondary),var(--background))]">
      {/* Background decorations - Sticker bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-40 h-40 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* Logo and title */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
          className="w-48 h-48 rounded-[3rem] bg-white flex items-center justify-center mb-6 shadow-sticker relative border-[6px] border-primary/20 p-2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* High-quality SVG Logo Fallback - Matches the provided theme */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-md">
              <path d="M20 40 Q50 30 80 40" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"></path>
              <rect x="47" y="25" width="6" height="50" rx="3" fill="var(--warning)"></rect>
              <circle cx="50" cy="25" r="5" fill="var(--warning)"></circle>
              <path d="M20 40 L15 60 Q20 65 25 60 Z" fill="var(--accent)"></path>
              <path d="M80 40 L75 60 Q80 65 85 60 Z" fill="var(--accent)"></path>
              <circle cx="85" cy="20" r="10" fill="var(--warning)" stroke="white" stroke-width="2"></circle>
              <text x="85" y="23" text-anchor="middle" font-size="8" font-weight="bold" fill="var(--warning-foreground)">SN</text>
            </svg>
          </div>
        </motion.div>

          <h1 className="text-6xl font-black text-primary mb-2 tracking-tighter drop-shadow-sm">JuriQuiz</h1>
          <p className="text-muted-foreground text-xl font-bold bg-secondary/50 px-4 py-1 rounded-full border border-border/50">Droit & Constitution</p>
        </motion.div>

        {/* Menu buttons */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Button
                onClick={item.onClick}
                className={`w-full h-16 text-xl font-black gap-4 transition-all duration-300 rounded-[1.5rem] border-b-8 active:border-b-0 active:translate-y-1 ${
                  item.primary
                    ? 'bg-primary text-primary-foreground border-primary/40 hover:bg-primary/90 shadow-sticker'
                    : 'bg-white border-border/40 hover:bg-secondary/50 text-foreground shadow-sticker'
                }`}
                size="lg"
              >
                <item.icon className={`w-7 h-7 ${item.primary ? 'text-white' : 'text-primary'}`} />
                {item.label}
                {item.label === 'Paramètres' && (
                  <span className="ml-auto text-base">
                    {soundEnabled ? '🔈' : '🔇'}
                  </span>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-12 flex flex-col items-center gap-2 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Contenu Officiel Sénégalais</p>
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground font-medium">Multijoueurs • Tour par tour</p>
          <a 
            href="https://www.wockytech.xyz/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary/70 hover:text-primary font-bold mt-2 transition-colors flex items-center gap-1 group"
          >
            Réalisé par <span className="underline decoration-primary/30 group-hover:decoration-primary">Wockytech</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
