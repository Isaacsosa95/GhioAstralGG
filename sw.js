// Service Worker para GhioAstral
// Versión del cache - incrementar cuando cambien los recursos
const CACHE_NAME = 'ghioastral-v1.0.0';
const STATIC_CACHE = 'ghioastral-static-v1';
const DYNAMIC_CACHE = 'ghioastral-dynamic-v1';

// Recursos críticos para cachear durante la instalación
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/img/logo_1.png',
    '/img/logo_2.png', 
    '/img/logo_3.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
    'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
];

// Recursos que se pueden cachear dinámicamente
const DYNAMIC_ASSETS = [
    '/img/sodiacIcons/',
    'https://fonts.gstatic.com/',
    'https://wa.me/'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker: Installation complete');
                return self.skipWaiting(); // Activar inmediatamente
            })
            .catch(err => {
                console.error('❌ Service Worker: Installation failed', err);
            })
    );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Eliminar caches antiguos
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activation complete');
                return self.clients.claim(); // Tomar control de todas las páginas
            })
    );
});

// Interceptar requests
self.addEventListener('fetch', event => {
    const { request } = event;
    
    // Solo manejar requests GET
    if (request.method !== 'GET') return;
    
    // Ignorar requests de Chrome extensions y otros protocolos
    if (!request.url.startsWith('http')) return;
    
    event.respondWith(
        caches.match(request)
            .then(response => {
                // Si está en cache, devolverlo
                if (response) {
                    console.log('📋 Service Worker: Serving from cache', request.url);
                    return response;
                }
                
                // Si no está en cache, hacer request y cachear si es apropiado
                return fetch(request)
                    .then(response => {
                        // Solo cachear responses válidos
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Determinar si debe ser cacheado dinámicamente
                        if (shouldCacheDynamically(request.url)) {
                            const responseToCache = response.clone();
                            
                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    console.log('💾 Service Worker: Caching dynamically', request.url);
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return response;
                    })
                    .catch(err => {
                        console.log('🚨 Service Worker: Fetch failed', request.url, err);
                        
                        // Fallback para navegación offline
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Fallback para imágenes
                        if (request.destination === 'image') {
                            return new Response(
                                '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#fbbf24" fill-opacity="0.2"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="#fbbf24">⭐</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// Función para determinar si un recurso debe ser cacheado dinámicamente
function shouldCacheDynamically(url) {
    return DYNAMIC_ASSETS.some(pattern => url.includes(pattern)) ||
           url.includes('/img/') ||
           url.includes('fonts.googleapis.com') ||
           url.includes('fonts.gstatic.com');
}

// Limpiar cache cuando se alcanza el límite
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAN_CACHE') {
        cleanOldCache();
    }
});

function cleanOldCache() {
    caches.open(DYNAMIC_CACHE)
        .then(cache => {
            return cache.keys();
        })
        .then(requests => {
            // Mantener solo los últimos 50 recursos dinámicos
            if (requests.length > 50) {
                const toDelete = requests.slice(0, requests.length - 50);
                return Promise.all(
                    toDelete.map(request => {
                        console.log('🗑️ Service Worker: Cleaning old cache entry', request.url);
                        return caches.delete(request);
                    })
                );
            }
        });
}

// Notificar cuando hay una nueva versión disponible
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CHECK_UPDATE') {
        // Aquí podrías implementar lógica para notificar actualizaciones
        event.ports[0].postMessage({
            type: 'UPDATE_AVAILABLE',
            version: CACHE_NAME
        });
    }
});

console.log('✨ Service Worker: Loaded successfully');
