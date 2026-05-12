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
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
