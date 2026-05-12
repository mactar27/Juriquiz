'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowLeft, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameStore } from '@/lib/game-store'
import { AVATARS, Player } from '@/types/game'

export function SetupScreen() {
  const { players, addPlayer, removePlayer, setGamePhase, startGame } = useGameStore()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0])

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < 20) {
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        avatar: selectedAvatar,
        score: 0,
        streak: 0,
        correctAnswers: 0,
        totalAnswers: 0,
      }
      addPlayer(newPlayer)
      setNewPlayerName('')
      // Select next available avatar
      const usedAvatars = [...players.map(p => p.avatar), selectedAvatar]
      const nextAvatar = AVATARS.find(a => !usedAvatars.includes(a)) || AVATARS[0]
      setSelectedAvatar(nextAvatar)
    }
  }

  const handleStartGame = () => {
    if (players.length >= 2) {
      startGame()
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-[radial-gradient(circle_at_top,var(--secondary),var(--background))]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setGamePhase('home')}
          className="text-primary hover:bg-primary/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-black text-primary tracking-tight">Configuration</h1>
      </motion.div>

      {/* Player list */}
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 p-4 rounded-3xl bg-white border-4 border-primary/10 shadow-sticker"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-3xl shadow-inner">
                {player.avatar}
              </div>
              <div className="flex-1">
                <p className="font-black text-foreground text-lg">{player.name}</p>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Joueur {index + 1}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePlayer(player.id)}
                className="text-destructive hover:bg-destructive/10 rounded-xl"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add player form */}
        {players.length < 20 && (
          <motion.div
            className="p-6 rounded-3xl bg-white/50 border-4 border-dashed border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-4">
              Nouveau Joueur ({players.length}/20)
            </p>

            {/* Avatar selector */}
            <div className="flex flex-wrap gap-3 mb-6">
              {AVATARS.slice(0, 15).map((avatar) => {
                const isUsed = players.some(p => p.avatar === avatar)
                return (
                  <button
                    key={avatar}
                    onClick={() => !isUsed && setSelectedAvatar(avatar)}
                    disabled={isUsed}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-sm ${
                      selectedAvatar === avatar
                        ? 'bg-primary text-white scale-110 ring-4 ring-primary/20'
                        : isUsed
                        ? 'bg-muted opacity-30 cursor-not-allowed'
                        : 'bg-white hover:scale-105 border-2 border-transparent hover:border-primary/20'
                    }`}
                  >
                    {avatar}
                  </button>
                )
              })}
            </div>

            {/* Name input */}
            <div className="flex gap-3">
              <Input
                placeholder="Ton prénom..."
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                className="flex-1 h-14 bg-white border-2 border-primary/10 rounded-2xl text-lg font-bold px-4 focus:border-primary transition-all shadow-sm"
                maxLength={15}
              />
              <Button
                onClick={handleAddPlayer}
                disabled={!newPlayerName.trim()}
                className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 text-white border-b-4 border-primary/40 active:border-b-0 active:translate-y-1 shadow-sticker"
              >
                <Plus className="w-7 h-7" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-auto pt-6"
      >
        {players.length === 1 && (
          <p className="text-center text-xs font-black text-destructive uppercase tracking-widest mb-4 animate-pulse">
            Ajoute encore un joueur pour commencer !
          </p>
        )}
        <Button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className="w-full h-16 text-xl font-black gap-4 bg-primary text-white border-b-8 border-primary/40 hover:bg-primary/90 rounded-3xl shadow-sticker disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed active:border-b-0 active:translate-y-1 transition-all"
          size="lg"
        >
          <Gamepad2 className="w-7 h-7" />
          COMMENCER ({players.length}/2)
        </Button>
      </motion.div>
    </div>

  )
}
