const CACHE_NAME = 'juriquiz-sn-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg',
  '/placeholder-logo.svg',
  // On ne met pas les fichiers .js spécifiques ici car Next.js les hash, 
  // le cache dynamique (fetch) s'en occupera automatiquement.
];

// Installation : Mise en cache des assets de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : Nettoyage des vieux caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie : Stale-While-Revalidate
// On affiche le cache immédiatement, mais on vérifie en arrière-plan s'il y a une mise à jour.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          // On met à jour le cache avec la nouvelle version du réseau
          if (networkResponse.status === 200 && event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Si le réseau échoue (offline), on a déjà la réponse du cache
          return cachedResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    })
  );
});
