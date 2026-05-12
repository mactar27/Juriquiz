export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'qcm' | 'truefalse' | 'rapid'

export interface Player {
  id: string
  name: string
  avatar: string
  score: number
  streak: number
  correctAnswers: number
  totalAnswers: number
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  difficulty: Difficulty
  type: QuestionType
  category: string
  explanation?: string
}

export interface DiceResult {
  face: number
  difficulty: Difficulty
  type: QuestionType
  bonusMultiplier: number
  timeLimit: number
}

export type GamePhase = 
  | 'home'
  | 'setup'
  | 'rolling'
  | 'question'
  | 'feedback'
  | 'turnTransition'
  | 'finished'

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  questions: Question[]
  usedQuestionIds: string[]
  currentQuestion: Question | null
  diceResult: DiceResult | null
  gamePhase: GamePhase
  roundNumber: number
  totalRounds: number
  lastAnswerCorrect: boolean | null
  soundEnabled: boolean
}

// Avatar options
export const AVATARS = [
  '⚖️', '📚', '🎓', '👨‍⚖️', '👩‍⚖️', '🦁', '🦅', '🐘', '🌟', '🔥', '💎', '🏆',
  '🇸🇳', '🥘', '🌳', '🌍', '📖', '🖋️', '🗝️', '📜', '🛡️', '🏛️', '💡', '🧠',
  '⚡', '🚀', '🌈', '🍀', '🦋', '🦉', '🐢', '🐬', '🦾', '👑', '🎭', '🎨'
]

// Dice face mapping
export const DICE_FACES: Record<number, DiceResult> = {
  1: { face: 1, difficulty: 'easy', type: 'qcm', bonusMultiplier: 1, timeLimit: 15 },
  2: { face: 2, difficulty: 'medium', type: 'qcm', bonusMultiplier: 1, timeLimit: 15 },
  3: { face: 3, difficulty: 'hard', type: 'qcm', bonusMultiplier: 1, timeLimit: 15 },
  4: { face: 4, difficulty: 'medium', type: 'truefalse', bonusMultiplier: 1, timeLimit: 15 },
  5: { face: 5, difficulty: 'medium', type: 'rapid', bonusMultiplier: 1, timeLimit: 8 },
  6: { face: 6, difficulty: 'hard', type: 'qcm', bonusMultiplier: 2, timeLimit: 15 },
}

// Player titles based on score
export const PLAYER_TITLES = [
  { minScore: 0, title: 'Rookie du droit' },
  { minScore: 51, title: 'Juriste' },
  { minScore: 101, title: 'Avocat' },
  { minScore: 201, title: 'Magistrat' },
  { minScore: 351, title: 'Maître du droit' },
]

export function getPlayerTitle(score: number): string {
  const title = [...PLAYER_TITLES].reverse().find(t => score >= t.minScore)
  return title?.title || 'Rookie du droit'
}

export function calculateScore(
  correct: boolean,
  timeRemaining: number,
  multiplier: number
): number {
  if (!correct) return 0
  const baseScore = 10
  const speedBonus = timeRemaining > 10 ? 5 : 0
  return (baseScore + speedBonus) * multiplier
}
