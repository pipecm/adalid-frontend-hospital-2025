const CACHE_NAME = "hsi-cache-v1";
const urlsToCache = ['/', '/index.html', '/main.js', 'icons/icon-192x192.png', 'icons/icon-512x512.png', 'assets/images'];
const EVENT_INSTALL = "install"
const EVENT_FETCH = "fetch";

self.addEventListener(EVENT_INSTALL, event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    )
});

self.addEventListener(EVENT_FETCH, event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cacheResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return cacheResponse || fetchPromise;
            });
        })
    );
});