import { create } from 'zustand'
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
  rollDice: () => Promise<DiceResult>
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

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setPlayers: (players) => set({ players }),

  addPlayer: (player) => set((state) => ({ 
    players: [...state.players, player] 
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),

  startGame: () => {
    const { players, questions } = get()
    if (players.length < 1) return
    
    // Reset player scores
    const resetPlayers = players.map(p => ({
      ...p,
      score: 0,
      streak: 0,
      correctAnswers: 0,
      totalAnswers: 0,
    }))
    
    set({
      players: resetPlayers,
      currentPlayerIndex: 0,
      usedQuestionIds: [],
      currentQuestion: null,
      diceResult: null,
      gamePhase: 'rolling',
      roundNumber: 1,
      lastAnswerCorrect: null,
    })
  },

  rollDice: async () => {
    return new Promise((resolve) => {
      // Simulate dice rolling animation time
      setTimeout(() => {
        const face = Math.floor(Math.random() * 6) + 1
        const result = DICE_FACES[face]
        
        // NEW LOGIC: The dice selects the player
        const { players, questions, usedQuestionIds } = get()
        const selectedPlayerIndex = (face - 1) % players.length
        
        // Get a question matching the result difficulty
        const question = getRandomQuestion(
          questions, 
          result.difficulty, 
          result.type,
          usedQuestionIds
        )
        
        set({ 
          currentPlayerIndex: selectedPlayerIndex,
          diceResult: result,
          currentQuestion: question,
          usedQuestionIds: question 
            ? [...usedQuestionIds, question.id] 
            : usedQuestionIds,
          gamePhase: 'question',
        })
        
        resolve(result)
      }, 2000) // 2 seconds for dice animation
    })
  },

  answerQuestion: (answerIndex, timeRemaining) => {
    const { currentQuestion, diceResult, players, currentPlayerIndex } = get()
    if (!currentQuestion || !diceResult) return

    const correct = answerIndex === currentQuestion.correctIndex
    const multiplier = diceResult.bonusMultiplier
    const points = calculateScore(correct, timeRemaining, multiplier)
    
    // Update current player
    const updatedPlayers = [...players]
    const currentPlayer = updatedPlayers[currentPlayerIndex]
    
    currentPlayer.score += points
    currentPlayer.totalAnswers += 1
    
    if (correct) {
      currentPlayer.correctAnswers += 1
      currentPlayer.streak += 1
      // Streak bonus: +5 for each consecutive correct answer after first
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
    const { players, currentPlayerIndex, roundNumber, totalRounds } = get()
    
    // In this mode, the round increments when everyone has played roughly, 
    // or we just count total turns. Let's count turns.
    const isNewRound = (get().usedQuestionIds.length % players.length) === 0
    const newRoundNumber = isNewRound ? roundNumber + 1 : roundNumber
    
    // Check if game is finished
    if (newRoundNumber > totalRounds) {
      set({ gamePhase: 'finished' })
      return
    }
    
    set({
      roundNumber: newRoundNumber,
      currentQuestion: null,
      diceResult: null,
      lastAnswerCorrect: null,
      gamePhase: 'rolling', // Go directly to rolling so the next player can be chosen
    })
  },

  resetGame: () => set(initialState),

  setGamePhase: (phase) => set({ gamePhase: phase }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  setQuestions: (questions) => set({ questions }),

  addQuestions: (questions) => set((state) => ({
    questions: [...state.questions, ...questions]
  })),
  setTotalRounds: (rounds) => set({ totalRounds: rounds }),
}))
