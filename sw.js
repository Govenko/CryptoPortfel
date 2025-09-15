self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Можно кэшировать, но пока просто пропускаем
  event.respondWith(fetch(event.request));
});
