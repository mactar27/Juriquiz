import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { 
  GameState, 
  Player, 
  Question, 
  DiceResult, 
  GamePhase,
  DICE_FACES,
  calculateScore 
} from '@/types/game'
import { getRandomQuestion, sampleQuestions } from './questions'

interface GameStore extends GameState {
  // Actions
  setPlayers: (players: Player[]) => void
  addPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  startGame: () => void
  rematch: () => void
  rollDice: () => Promise<DiceResult>
  completeRoll: (result: DiceResult) => void
  answerQuestion: (answerIndex: number, timeRemaining: number) => void
  nextTurn: () => void
  resetGame: () => void
  setGamePhase: (phase: GamePhase) => void
  toggleSound: () => void
  setQuestions: (questions: Question[]) => void
  addQuestions: (questions: Question[]) => void
  setTotalRounds: (rounds: number) => void
}

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  questions: sampleQuestions,
  usedQuestionIds: [],
  currentQuestion: null,
  diceResult: null,
  gamePhase: 'home',
  roundNumber: 1,
  totalRounds: 10,
  lastAnswerCorrect: null,
  soundEnabled: true,
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayers: (players) => set({ players }),

      addPlayer: (player) => set((state) => ({ 
        players: [...state.players, player] 
      })),

      removePlayer: (playerId) => set((state) => ({
        players: state.players.filter(p => p.id !== playerId)
      })),

      startGame: () => {
        const { players } = get()
        if (players.length < 1) return
        
        const resetPlayers = players.map(p => ({
          ...p,
          score: 0,
          streak: 0,
          correctAnswers: 0,
          totalAnswers: 0,
        }))
        
        set({
          ...initialState,
          players: resetPlayers,
          gamePhase: 'rolling',
        })
      },

      rematch: () => {
        const { players } = get()
        const resetPlayers = players.map(p => ({
          ...p,
          score: 0,
          streak: 0,
          correctAnswers: 0,
          totalAnswers: 0,
        }))
        
        set({
          ...initialState,
          players: resetPlayers,
          gamePhase: 'rolling',
          roundNumber: 1,
        })
      },

      rollDice: async () => {
        const { players, currentPlayerIndex } = get()
        // The wheel will land on the NEXT player
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
        // For now, mapping players to 1-6 for the diceResult logic
        const targetFace = (nextPlayerIndex % 6) + 1
        return DICE_FACES[targetFace]
      },

      completeRoll: (result) => {
        const { players, currentPlayerIndex, questions, usedQuestionIds } = get()
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
        
        const question = getRandomQuestion(
          questions, 
          result.difficulty, 
          result.type,
          usedQuestionIds
        )
        
        set({ 
          currentPlayerIndex: nextPlayerIndex,
          diceResult: result,
          currentQuestion: question,
          usedQuestionIds: question ? [...usedQuestionIds, question.id] : usedQuestionIds,
          gamePhase: 'question',
        })
      },

      answerQuestion: (answerIndex, timeRemaining) => {
        const { currentQuestion, diceResult, players, currentPlayerIndex } = get()
        if (!currentQuestion || !diceResult) return

        const correct = answerIndex === currentQuestion.correctIndex
        const points = calculateScore(correct, timeRemaining, diceResult.bonusMultiplier)
        
        const updatedPlayers = [...players]
        const currentPlayer = updatedPlayers[currentPlayerIndex]
        
        currentPlayer.score += points
        currentPlayer.totalAnswers += 1
        
        if (correct) {
          currentPlayer.correctAnswers += 1
          currentPlayer.streak += 1
          // Streak bonus
          if (currentPlayer.streak > 1) {
            currentPlayer.score += 5 * (currentPlayer.streak - 1)
          }
        } else {
          currentPlayer.streak = 0
        }
        
        set({
          players: updatedPlayers,
          lastAnswerCorrect: correct,
          gamePhase: 'feedback',
        })
      },

      nextTurn: () => {
        const { roundNumber, totalRounds, players, currentPlayerIndex } = get()
        
        // If the current player was the last one, increment round
        const isEndOfRound = currentPlayerIndex === players.length - 1
        const nextRound = isEndOfRound ? roundNumber + 1 : roundNumber

        if (nextRound > totalRounds) {
          set({ gamePhase: 'finished' })
        } else {
          set({ 
            roundNumber: nextRound,
            gamePhase: 'rolling',
            diceResult: null,
            currentQuestion: null,
            lastAnswerCorrect: null,
          })
        }
      },

      resetGame: () => set(initialState),
      setGamePhase: (phase) => set({ gamePhase: phase }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setQuestions: (questions) => set({ questions }),
      addQuestions: (questions) => set((state) => ({
        questions: [...state.questions, ...questions]
      })),
      setTotalRounds: (rounds) => set({ totalRounds: rounds }),
    }),
    {
      name: 'juriquiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        players: state.players,
        soundEnabled: state.soundEnabled,
        totalRounds: state.totalRounds,
        // We don't persist questions if they are built-in, but we can if we want
      }),
    }
  )
)
