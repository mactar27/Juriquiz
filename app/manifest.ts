import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JuriQuiz Sénégal',
    short_name: 'JuriQuiz',
    description: 'Le premier jeu éducatif sur le droit et la constitution du Sénégal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC', // slate-50
    theme_color: '#4f46e5', // indigo-600 (Primary)
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
    orientation: 'portrait',
    categories: ['education', 'games'],
    lang: 'fr',
  }
}
