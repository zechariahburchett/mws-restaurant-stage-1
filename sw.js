self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('version1').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     if (response) {
       console.log('Found ', event.request, ' already in cache');
       return response;
     }
     else {
       console.log('Did not find ', event.request, ' in cache. Getting it now!');
       return fetch(event.request)
       //clone response so browser and cache comsume it
       .then(function(response){
         const responseClone = response.clone();
         caches.open('version1')
         .then(function(cache) {
           cache.put(event.request, responseClone);
       })
        return response;
       })
     }
   })
 );
});
