const RegistroPWA = "RegistroEIMP@v3-cache";
const assets = [
  "/",
  "/index.html",
  "/styles/style_calibracion2023.css",
  "/styles/leaflet.css",
  "/styles/leaflet-easy-button.css",
  "/styles/leaflet-tag-filter-button.css",
  "/styles/marca-con-numero.css",
  "/styles/ripple.min.css",
  "/styles/imagenes/Layout_010221_01.png",
  "/styles/imagenes/mark3.png",
  "/styles/imagenes/registro.png",
  "/scripts/Captura.js",
  "/scripts/leaflet.js",
  "/scripts/leaflet.js.map",	
  "/scripts/leaflet-easy-button.js",
  "/scripts/leaflet-tag-filter-button.js",
  "/scripts/mapa.js",
  "/scripts/ubicacion.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(RegistroPWA).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheList) => {
      return Promise.all(
        cacheList.map((cache) => {
          if (!RegistroPWA.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
