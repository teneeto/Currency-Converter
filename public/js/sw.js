
const myCache = 'currency-conv-v1';

var filesToCache = [
     '.',
     'app.js',
     '../css/style.css'

     '../index.html',

  ];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(myCache).then( cache => {
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(()=> {
        return caches.match('../index.html');
      })
    );
  });
