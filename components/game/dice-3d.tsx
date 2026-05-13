'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DICE_FACES, DiceResult } from '@/types/game'

interface Dice3DProps {
  isRolling: boolean
  onRollComplete: (result: DiceResult) => void
  playerNames?: string[]
  targetFace?: number
}

// We reuse the Dice3D interface so GameScreen.tsx needs zero changes
export function Dice3D({ isRolling, onRollComplete, playerNames = [], targetFace = 1 }: Dice3DProps) {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
  const hasCalledComplete = useRef(false)

  const count = playerNames.length || 1
  const sliceAngle = 360 / count

  // The target player index is targetFace - 1 (1-indexed → 0-indexed)
  const targetIndex = Math.max(0, (targetFace || 1) - 1) % count

  useEffect(() => {
    if (isRolling) {
      hasCalledComplete.current = false
      setShowResult(false)
      setWinnerIndex(null)
      setIsSpinning(true)

      // Spin many full rotations then stop exactly on the target slice
      // The wheel pointer is at the top (270° in SVG space)
      // Slice 0 center is at angle: -90 + sliceAngle * 0.5
      // To land slice `targetIndex` at top: rotate by -(targetIndex * sliceAngle + sliceAngle/2) then normalize
      const targetAngle = -(targetIndex * sliceAngle + sliceAngle / 2)
      const fullSpins = 1440 + 360 * 3 // 4+ full rotations for drama
      const finalRotation = rotation + fullSpins + ((targetAngle - rotation) % 360)

      setRotation(finalRotation)

      // After spin completes
      const timer = setTimeout(() => {
        setIsSpinning(false)
        setShowResult(true)
        setWinnerIndex(targetIndex)

        const completeTimer = setTimeout(() => {
          if (!hasCalledComplete.current) {
            hasCalledComplete.current = true
            const randomFace = ((targetFace || 1) <= 6 ? (targetFace || 1) : ((targetIndex % 6) + 1))
            onRollComplete(DICE_FACES[randomFace] || DICE_FACES[1])
          }
        }, 800)
        return () => clearTimeout(completeTimer)
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [isRolling])

  // Generate colors for each slice
  const SLICE_COLORS = [
    '#4f46e5', '#7c3aed', '#2563eb', '#9333ea',
    '#1d4ed8', '#6d28d9', '#3730a3', '#5b21b6',
    '#1e40af', '#4c1d95', '#1e3a8a', '#3b0764',
    '#312e81', '#4a044e', '#1e1b4b', '#581c87',
    '#0f172a', '#27272a', '#1c1917', '#292524',
  ]

  const radius = 110
  const cx = 140
  const cy = 140

  const getSlicePath = (index: number) => {
    const startAngle = ((index * sliceAngle - 90) * Math.PI) / 180
    const endAngle = (((index + 1) * sliceAngle - 90) * Math.PI) / 180
    const x1 = cx + radius * Math.cos(startAngle)
    const y1 = cy + radius * Math.sin(startAngle)
    const x2 = cx + radius * Math.cos(endAngle)
    const y2 = cy + radius * Math.sin(endAngle)
    const largeArc = sliceAngle > 180 ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  const getTextPosition = (index: number) => {
    const angle = ((index + 0.5) * sliceAngle - 90) * (Math.PI / 180)
    const r = radius * 0.6
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      rotation: (index + 0.5) * sliceAngle - 90,
    }
  }

  const truncate = (name: string) => name.length > 8 ? name.substring(0, 7) + '…' : name

  return (
    <div className="w-full aspect-square max-w-md mx-auto rounded-[3rem] overflow-hidden bg-gradient-to-b from-indigo-950/30 to-purple-950/30 border-4 border-white/10 shadow-inner relative flex flex-col items-center justify-center gap-4">

      {/* Pointer arrow at top */}
      <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ marginTop: -2 }}>
          <div
            style={{
              width: 0, height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '28px solid #facc15',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* The wheel */}
        <motion.div
          style={{ originX: '50%', originY: '50%' }}
          animate={{ rotate: rotation }}
          transition={
            isSpinning
              ? { duration: 3.5, ease: [0.1, 0, 0.1, 1] }
              : { duration: 0 }
          }
        >
          <svg width={280} height={280} viewBox="0 0 280 280">
            {/* Slices */}
            {playerNames.map((name, i) => (
              <g key={i}>
                <path
                  d={getSlicePath(i)}
                  fill={SLICE_COLORS[i % SLICE_COLORS.length]}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1.5}
                />
                {count <= 20 && (
                  <text
                    x={getTextPosition(i).x}
                    y={getTextPosition(i).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={count > 15 ? 7 : count > 10 ? 8 : 12}
                    fontWeight="800"
                    fill="white"
                    style={{
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                      fontFamily: 'sans-serif',
                      transform: `rotate(${getTextPosition(i).rotation}deg)`,
                      transformOrigin: `${getTextPosition(i).x}px ${getTextPosition(i).y}px`,
                    }}
                  >
                    {count >= 12 
                      ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                      : truncate(name.toUpperCase())}
                  </text>
                )}
              </g>
            ))}

            {/* Center circle */}
            <circle cx={cx} cy={cy} r={22} fill="#1e1b4b" stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
            <circle cx={cx} cy={cy} r={14} fill="#4f46e5" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="white" fontWeight="900">⚖️</text>
          </svg>
        </motion.div>

        {/* Outer ring glow */}
        <div className="absolute inset-0 rounded-full border-4 border-white/5 pointer-events-none" />
      </div>

      {/* Result banner */}
      <AnimatePresence>
        {showResult && winnerIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400/80">Sélectionné !</p>
            <p className="text-3xl font-black text-white drop-shadow-lg">
              {playerNames[winnerIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle hint */}
      {!isRolling && !showResult && (
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Prêt à tourner</p>
      )}
    </div>
  )
}
