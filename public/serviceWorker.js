importScripts("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js")

self.addEventListener('install', event => {
  console.log('Service worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  console.log(
    `Message received on sW inner: ${_.partition([1, 2, 3, 4], (n) => n % 2)}`
  );

  event.respondWith(
    caches.open('my-app-cache').then(cache =>
      cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          })
        );
      })
    )
  );
});
