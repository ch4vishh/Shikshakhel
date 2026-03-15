// ============================================
// SERVICE WORKER – Offline-first caching
// ============================================

const CACHE_NAME = 'shikshakhel-v6';
const ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/css/index.css',
    '/css/splash.css',
    '/css/login.css',
    '/css/home.css',
    '/css/game.css',
    '/css/result.css',
    '/css/parent.css',
    '/css/components.css',
    '/js/app.js',
    '/js/components/BottomNav.js',
    '/js/pages/SplashScreen.js',
    '/js/pages/LoginScreen.js',
    '/js/pages/ChildSelector.js',
    '/js/pages/HomeScreen.js',
    '/js/pages/GameScreen.js',
    '/js/pages/ResultScreen.js',
    '/js/pages/ParentDashboard.js',
    '/js/pages/SettingsPage.js',
    '/js/pages/BadgesGallery.js',
    '/js/pages/PaymentPage.js',
    '/js/components/InstallPrompt.js',
    '/js/data/questions.js',
    '/js/data/levels.js',
    '/js/utils/storage.js',
    '/js/utils/speech.js',
    '/icons/favicon.svg',
];

// Install – cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate – clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        })
    );
    self.clients.claim();
});

// Fetch – cache-first for app assets, network-first for CDN
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // For CDN requests (esm.sh), try network first, fall back to cache
    if (request.url.includes('esm.sh') || request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // For app assets, cache-first, with fallback to offline.html for navigation requests
    event.respondWith(
        caches.match(request).then(cached => {
            return cached || fetch(request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                return response;
            }).catch(() => {
                // If both cache and network fail, check if it's a navigation request
                if (request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});
