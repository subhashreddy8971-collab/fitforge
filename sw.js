const CACHE = 'fitforge-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
// Cache-first for app shell/icons; always go to network for the Gemini API
self.addEventListener('fetch', e => {
  if (e.request.url.includes('generativelanguage.googleapis.com')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
