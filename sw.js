/* ============================================================
   Event Center Finder â Service Worker
   Strategy: Cache-first for assets, network-first for HTML
   ============================================================ */

const CACHE_NAME = 'ecf-v3';
const OFFLINE_URL = '/';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ââ Install: pre-cache shell ââââââââââââââââââââââââââââââââââ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[SW] Pre-cache partial failure (ok on first install):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ââ Activate: clean old caches ââââââââââââââââââââââââââââââââ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ââ Fetch: network-first with cache fallback ââââââââââââââââââ
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin requests (AdSense, analytics etc.)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed â serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Ultimate fallback: serve the main page
          return caches.match(OFFLINE_URL);
        });
      })
  );
});

// ââ Background sync: notify clients on update âââââââââââââââââ
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
