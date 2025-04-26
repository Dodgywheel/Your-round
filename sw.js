
const CACHE_NAME = 'pin-lock-cache-v1';
const urlsToCache = [
  './index.html',
  './offline.html'
];

// Install event - cache files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached files if offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => response || caches.match('./offline.html')))
  );
});
