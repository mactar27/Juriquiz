import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JuriQuiz Sénégal',
    short_name: 'JuriQuiz',
    description: 'Apprenez le droit sénégalais en vous amusant avec JuriQuiz.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.svg?v=2',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
