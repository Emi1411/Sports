const cachePWA = 'cache-site-v1';

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/pages/prueba.html",
    "/manifest.json",
    "/img/main.png",
    "/img/sports.jpg",
    "/img/sportsicon.png",
    "/img/basquetbol.jpg",
    "/img/ciclismo.png",
    "/img/handball.jpg",
    "/img/icons/twitter_16_16.png",
    "/img/icons/twitter_32_32.png",
    "/img/icons/twitter_64_64.png",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(cachePWA)
            .then(cacheRes => {
                return cacheRes.addAll(assets);
            })
    )
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.open(cachePWA).then( cache => {
            return cache.match(fetchEvent.request).then( response => {
                return response || fetch(fetchEvent.request).then(response => {
                    cache.put(fetchEvent.request, response.clone());
                });
            });
        })
    );
});

/*self.addEventListener('push', function(e) {
    var options = {
      body: 'This notification was generated from a push!',
      icon: 'img/sportsicon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      actions: [
        {action: 'explore', title: 'Explore this new world'},
        {action: 'close', title: 'Close'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Hello world!', options)
    );
  });*/