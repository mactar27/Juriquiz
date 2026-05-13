'use client'

import { useCallback, useRef } from 'react'
import { useGameStore } from '@/lib/game-store'

export const useAudio = () => {
  const { soundEnabled } = useGameStore()
  
  const playSound = useCallback((type: 'spin' | 'correct' | 'wrong' | 'success') => {
    if (!soundEnabled) return

    try {
      const audio = new Audio(`/audio/${type}.mp3`)
      audio.volume = 0.5
      audio.play().catch(e => console.warn("Audio play failed, likely file missing or browser restriction:", e))
    } catch (e) {
      console.error("Audio error:", e)
    }
  }, [soundEnabled])

  return { playSound }
}
