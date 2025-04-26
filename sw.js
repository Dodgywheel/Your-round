const CACHE_NAME = 'pin-lock-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Install the Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch the resources
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() => 
      caches.match(event.request).then(response => response || caches.match('/offline.html'))
    )
  );
});
