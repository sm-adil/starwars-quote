const cacheName = "quotes-v2";
const staticAssets = [
  "./",
  "./index.html",
  "./main.css",
  "./main.js",
  "./quotes.json",
  "./manifest.webmanifest",
  "./images/favicon.ico",
  "./images/favicon-16x16.png",
  "./images/favicon-32x32.png",
  "./images/apple-touch-icon.png",
  "./images/android-chrome-192x192.png",
  "./images/android-chrome-512x512.png",
];

self.addEventListener("install", async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const request = await caches.match(e.request);
      if (request) return request;

      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
