const CACHE_NAME = 'cache-1';
const urlsToCache = [
    '/',
    '/notes',
]; 

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
            })
    )
})

self.addEventListener('fetch', e => {
    if (e.request.url.startsWith('chrome-extension://')) return;
    if (e.request.method !== 'GET') return;
    if (e.request.url.includes('/is-server-up')) return;

    e.respondWith(
        fetch(e.request)
            .then(function (response) {
                // If successful, clone the response and cache it
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(function (cache) {
                        cache.put(e.request, responseToCache);
                    });
                return response;
            })
            .catch(function () {
                // If network fetch fails, try to respond with cached resource
                return caches.match(e.request)
                    .then(function (cachedResponse) {
                        // If cache contains a match, return it
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // If no match found in cache, respond with a generic offline message
                        return new Response('You are offline.', {
                            headers: { 'Content-Type': 'text/plain' },
                            status: 503 // Service Unavailable
                        });
                    });
            })
    )
})