const CACHE_STATIC = "hsi-cache-static";
const CACHE_DYNAMIC = "hsi-cache-dynamic";
const CACHE_MIXED = "hsi-cache-mixed";

const urlsToCacheStatic = ['/', '/index.html', '/main.js', 'icons/icon-192x192.png', 'icons/icon-512x512.png', 'assets/images'];
const urlsToCacheDynamic = ['db.json'];
const urlsToCacheMixed = ['/login', '/patient-signup', '/staff', '/appointments', '/doctor', '/dashboard'];

const EVENT_INSTALL = "install"
const EVENT_FETCH = "fetch";
const EVENT_ACTIVATE = "activate";

self.addEventListener(EVENT_INSTALL, event => {
    console.log("Setting static cache...");
    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then(cache => cache.addAll(urlsToCacheStatic))
    )
});

self.addEventListener(EVENT_INSTALL, event => {
    console.log("Setting dynamic cache...");
    event.waitUntil(
        caches.open(CACHE_DYNAMIC)
            .then(cache => cache.addAll(urlsToCacheDynamic))
    )
});

self.addEventListener(EVENT_INSTALL, event => {
    console.log("Setting mixed cache...");
    event.waitUntil(
        caches.open(CACHE_MIXED)
            .then(cache => cache.addAll(urlsToCacheMixed))
    )
});

self.addEventListener(EVENT_ACTIVATE, event => {
    console.log("El Service Worker se activó exitosamente: ", event.request);
});

/* Estrategia Cache-first para contenido estático */

self.addEventListener(EVENT_FETCH, event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_STATIC).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

/* Estrategia Network-first para contenido dinámico */

self.addEventListener(EVENT_FETCH, event => {
    event.respondWith(
        fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_DYNAMIC).then(cache => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
        .catch(() => caches.match(event.request))
    );
});

/* Estrategia SWR para contenido mixto */

self.addEventListener(EVENT_FETCH, event => {
    event.respondWith(
        caches.open(CACHE_MIXED).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });
        })
    );
});