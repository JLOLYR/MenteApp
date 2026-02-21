const CACHE_NAME = 'mindfulness-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './ojo-de-ra.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalar Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia: Cache First, luego Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve lo del caché si existe, si no, lo pide a internet
        return response || fetch(event.request);
      })
  );
});