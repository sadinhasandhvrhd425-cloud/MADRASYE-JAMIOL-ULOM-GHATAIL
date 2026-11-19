const CACHE_NAME = 'jamiul-ulum-pwa-v1';
const ASSETS_TO_CACHE = [
  '/MADRASYE-JAMIUL-ULOM-GHATAIL/',
  '/MADRASYE-JAMIUL-ULOM-GHATAIL/index.html',
  '/MADRASYE-JAMIUL-ULOM-GHATAIL/manifest.json',
  '/MADRASYE-JAMIUL-ULOM-GHATAIL/1.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
