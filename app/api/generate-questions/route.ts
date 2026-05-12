import { generateText, Output } from 'ai'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const questionSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string().describe('Le texte de la question'),
      options: z.array(z.string()).describe('Options de réponse (4 pour QCM, 2 pour vrai/faux)'),
      correctIndex: z.number().describe('Index de la réponse correcte (0-based)'),
      difficulty: z.enum(['easy', 'medium', 'hard']),
      type: z.enum(['qcm', 'truefalse', 'rapid']),
      category: z.string().describe('Catégorie juridique de la question'),
      explanation: z.string().describe('Explication pédagogique brève'),
    })
  ),
})

export async function POST(req: Request) {
  try {
    // Read the reference legal context
    const contextPath = path.join(process.cwd(), 'lib/legal-context.txt')
    const legalContext = fs.readFileSync(contextPath, 'utf8')

    // Check if API key is present (optional check for better error)
    if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.warn('No API key found, using fallback questions.')
      return Response.json({ questions: getFallbackQuestions() })
    }

    try {
      // Generate questions using AI
      const { output } = await generateText({
        model: 'anthropic/claude-sonnet-4.6',
        output: Output.object({
          schema: questionSchema,
        }),
        system: `Tu es un expert en droit sénégalais, spécialisé dans l'Introduction Générale au Droit et la Constitution.
Ta mission est de générer des questions de quiz basées EXCLUSIVEMENT sur le texte de référence fourni.

TEXTE DE RÉFÉRENCE:
${legalContext}

Règles de génération:
- NE GÉNÈRE DES QUESTIONS QUE SUR LE TEXTE CI-DESSUS.
- Varie les types de questions (QCM, Vrai/Faux, Rapide).
- Pour les QCM: 4 options, une seule correcte.
- Pour Vrai/Faux: 2 options ["Vrai", "Faux"].
- Difficultés: "easy" (notions de base), "medium" (compréhension), "hard" (détails techniques/délais).
- Catégories autorisées: "Droit Objectif", "Droit Subjectif", "Constitution 2016", "Sources du Droit", "Preuve", "Application dans le temps".
- Les IDs doivent être au format "gen-{n}".
- L'explication doit citer ou reformuler précisément le texte de référence.`,
        messages: [
          {
            role: 'user',
            content: 'Génère 15 questions de quiz variées et de haute qualité basées sur le texte de référence.'
          },
        ],
      })

      if (!output) {
        throw new Error('AI generation failed')
      }

      return Response.json({ questions: output.questions })
    } catch (aiError) {
      console.error('AI Service Error:', aiError)
      // Fallback to pre-defined questions
      return Response.json({ questions: getFallbackQuestions() })
    }
  } catch (error) {
    console.error('Error in API route:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function getFallbackQuestions() {
  return [
    {
      id: "fb-1",
      text: "Quelle est la durée du mandat présidentiel au Sénégal selon la révision de 2016 ?",
      options: ["7 ans", "5 ans", "4 ans", "6 ans"],
      correctIndex: 1,
      difficulty: "easy",
      type: "qcm",
      category: "Constitution 2016",
      explanation: "L'article 27 de la Constitution, tel que révisé en 2016, fixe la durée du mandat à 5 ans (Quinquennat)."
    },
    {
      id: "fb-2",
      text: "Le droit objectif est l'ensemble des règles de droit applicables dans une société déterminée.",
      options: ["Vrai", "Faux"],
      correctIndex: 0,
      difficulty: "easy",
      type: "truefalse",
      category: "Droit Objectif",
      explanation: "Le texte définit le droit objectif comme l'ensemble des règles de droit applicables dans une société donnée."
    },
    {
      id: "fb-3",
      text: "Quel organe a la compétence exclusive d'adopter les lois au Sénégal ?",
      options: ["Le Gouvernement", "Le Président de la République", "L'Assemblée nationale", "Le Conseil Constitutionnel"],
      correctIndex: 2,
      difficulty: "medium",
      type: "qcm",
      category: "Sources du Droit",
      explanation: "L'adoption de la loi relève de la compétence exclusive de l'Assemblée nationale."
    },
    {
      id: "fb-4",
      text: "Une règle supplétive est une règle à laquelle on ne peut jamais déroger.",
      options: ["Vrai", "Faux"],
      correctIndex: 1,
      difficulty: "medium",
      type: "truefalse",
      category: "Droit Objectif",
      explanation: "Faux. Les règles supplétives sont celles dont on peut écarter l'application en manifestant une volonté contraire."
    },
    {
      id: "fb-5",
      text: "Quel est l'âge minimum pour être candidat à la présidence de la République au Sénégal ?",
      options: ["25 ans", "30 ans", "35 ans", "40 ans"],
      correctIndex: 2,
      difficulty: "medium",
      type: "qcm",
      category: "Constitution 2016",
      explanation: "L'article 28 stipule qu'un candidat doit être âgé de 35 ans au moins le jour du scrutin."
    }
  ]
}


