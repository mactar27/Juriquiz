import { Question, Difficulty, QuestionType } from '@/types/game'

// Sample questions based on Senegalese law
export const sampleQuestions: Question[] = [
  // Easy questions
  {
    id: 'q1',
    text: 'Le droit objectif désigne:',
    options: [
      "L'ensemble des règles régissant la vie en société",
      'Les droits appartenant à une personne',
      'Les décisions de justice',
      'Les contrats entre particuliers'
    ],
    correctIndex: 0,
    difficulty: 'easy',
    type: 'qcm',
    category: 'Droit objectif',
    explanation: "Le droit objectif est l'ensemble des règles juridiques qui régissent la vie en société."
  },
  {
    id: 'q2',
    text: 'Le droit subjectif est:',
    options: [
      'Une règle imposée par le législateur',
      'Une prérogative reconnue à un individu',
      'Une sanction juridique',
      'Un texte de loi'
    ],
    correctIndex: 1,
    difficulty: 'easy',
    type: 'qcm',
    category: 'Droit subjectif',
    explanation: 'Le droit subjectif est une prérogative accordée à un individu dans son intérêt.'
  },
  {
    id: 'q3',
    text: 'La Constitution est la norme suprême au Sénégal.',
    options: ['Vrai', 'Faux'],
    correctIndex: 0,
    difficulty: 'easy',
    type: 'truefalse',
    category: 'Sources du droit',
    explanation: 'La Constitution du 22 janvier 2001 est la norme suprême de la hiérarchie des normes au Sénégal.'
  },
  // Medium questions
  {
    id: 'q4',
    text: 'Selon la pyramide de Kelsen, quelle norme est au sommet?',
    options: [
      'La loi ordinaire',
      'Le règlement',
      'La Constitution',
      'Le décret'
    ],
    correctIndex: 2,
    difficulty: 'medium',
    type: 'qcm',
    category: 'Sources du droit',
    explanation: 'Selon Hans Kelsen, la Constitution est au sommet de la hiérarchie des normes.'
  },
  {
    id: 'q5',
    text: "Qu'est-ce que la jurisprudence?",
    options: [
      'Les lois votées par le Parlement',
      "L'ensemble des décisions rendues par les juridictions",
      'Les règlements administratifs',
      'Les contrats entre particuliers'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    type: 'qcm',
    category: 'Jurisprudence',
    explanation: "La jurisprudence est l'ensemble des décisions de justice qui interprètent et appliquent le droit."
  },
  {
    id: 'q6',
    text: 'La coutume peut être une source de droit au Sénégal.',
    options: ['Vrai', 'Faux'],
    correctIndex: 0,
    difficulty: 'medium',
    type: 'truefalse',
    category: 'Sources du droit',
    explanation: 'La coutume est une source de droit subsidiaire au Sénégal, notamment en matière familiale.'
  },
  {
    id: 'q7',
    text: 'Le patrimoine est:',
    options: [
      'Uniquement les biens immobiliers',
      "L'ensemble des biens et obligations d'une personne",
      'Les revenus annuels',
      'Les objets de valeur'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    type: 'qcm',
    category: 'Patrimoine',
    explanation: "Le patrimoine est l'universalité juridique comprenant tous les droits et obligations à caractère pécuniaire."
  },
  // Hard questions
  {
    id: 'q8',
    text: "Quelle est la différence entre droits réels et droits personnels?",
    options: [
      'Il n\'y a pas de différence',
      'Les droits réels portent sur une chose, les droits personnels sur une personne',
      'Les droits réels sont temporaires',
      'Les droits personnels sont absolus'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    type: 'qcm',
    category: 'Droits réels',
    explanation: "Le droit réel est un pouvoir direct sur une chose (ex: propriété), le droit personnel est un lien entre deux personnes (ex: créance)."
  },
  {
    id: 'q9',
    text: "L'article 8 de la Constitution sénégalaise garantit:",
    options: [
      'Le droit de vote',
      "L'inviolabilité de la personne humaine",
      'La liberté d\'entreprendre',
      'Le droit au travail'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    type: 'qcm',
    category: 'Constitution',
    explanation: "L'article 8 de la Constitution dispose que la personne humaine est sacrée et inviolable."
  },
  {
    id: 'q10',
    text: "En matière de preuve, qui supporte la charge de la preuve?",
    options: [
      'Toujours le défendeur',
      'Toujours le demandeur',
      'Celui qui allègue un fait',
      'Le juge'
    ],
    correctIndex: 2,
    difficulty: 'hard',
    type: 'qcm',
    category: 'Preuve',
    explanation: "Actori incumbit probatio: la charge de la preuve incombe à celui qui allègue un fait."
  },
  {
    id: 'q11',
    text: "L'usufruit est un droit réel.",
    options: ['Vrai', 'Faux'],
    correctIndex: 0,
    difficulty: 'medium',
    type: 'truefalse',
    category: 'Droits réels',
    explanation: "L'usufruit est un droit réel qui confère à son titulaire le droit d'usage et de jouissance d'un bien appartenant à autrui."
  },
  {
    id: 'q12',
    text: 'Le Conseil constitutionnel sénégalais compte:',
    options: [
      '5 membres',
      '7 membres',
      '9 membres',
      '11 membres'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    type: 'qcm',
    category: 'Constitution',
    explanation: 'Le Conseil constitutionnel sénégalais est composé de 7 membres nommés pour 6 ans.'
  },
  // Rapid questions (same difficulty but need quick answers)
  {
    id: 'q13',
    text: 'La loi est votée par:',
    options: [
      'Le Président',
      "L'Assemblée nationale",
      'Le Gouvernement',
      'Le peuple'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    type: 'rapid',
    category: 'Sources du droit',
    explanation: "L'Assemblée nationale vote la loi au Sénégal."
  },
  {
    id: 'q14',
    text: 'Un décret est pris par:',
    options: [
      "L'Assemblée nationale",
      'Le Président de la République',
      'Le juge',
      'Le peuple'
    ],
    correctIndex: 1,
    difficulty: 'medium',
    type: 'rapid',
    category: 'Sources du droit',
    explanation: 'Le décret est un acte réglementaire pris par le Président de la République.'
  },
  {
    id: 'q15',
    text: "Le domaine de la loi est défini par l'article:",
    options: [
      'Article 56',
      'Article 67',
      'Article 78',
      'Article 89'
    ],
    correctIndex: 1,
    difficulty: 'hard',
    type: 'rapid',
    category: 'Constitution',
    explanation: "L'article 67 de la Constitution sénégalaise définit le domaine de la loi."
  },
]

export function getRandomQuestion(
  questions: Question[],
  difficulty: Difficulty,
  type: QuestionType,
  usedIds: string[]
): Question | null {
  // Filter questions by difficulty and type, excluding used ones
  let available = questions.filter(
    q => q.difficulty === difficulty && 
         q.type === type && 
         !usedIds.includes(q.id)
  )
  
  // If no exact match, relax the type constraint
  if (available.length === 0) {
    available = questions.filter(
      q => q.difficulty === difficulty && 
           !usedIds.includes(q.id)
    )
  }
  
  // If still no match, just get any unused question
  if (available.length === 0) {
    available = questions.filter(q => !usedIds.includes(q.id))
  }
  
  // If all questions used, reset and pick any
  if (available.length === 0) {
    available = questions
  }
  
  // Pick random question
  const index = Math.floor(Math.random() * available.length)
  return available[index] || null
}
