---
layout: null
---
const version = "{{ site.time | date:'%Y%m%d%H%M%S'}}";
const cacheName = `cache-${version}`;

// A list of local resources we always want to be cached.
const cacheURLs = [
  'index.html',
  './', // Alias for index.html
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheURLs))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
