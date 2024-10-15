const RegistroPWA = "RegistroEIMP@v3-cache";
const assets = [
  "/",
  "/registro/index.html",
  "/registro/styles/style_calibracion2023.css",
  "/registro/styles/leaflet.css",
  "/registro/styles/leaflet-easy-button.css",
  "/registro/styles/leaflet-tag-filter-button.css",
  "/registro/styles/marca-con-numero.css",
  "/registro/styles/ripple.min.css",
  "/registro/styles/imagenes/Layout_010221_01.png",
  "/registro/styles/imagenes/mark3.png",
  "/registro/styles/imagenes/registro.png",
  "/registro/scripts/Captura.js",
  "/registro/scripts/leaflet.js",
  "/registro/scripts/leaflet.js.map",	
  "/registro/scripts/leaflet-easy-button.js",
  "/registro/scripts/leaflet-tag-filter-button.js",
  "/registro/scripts/mapa.js",
  "/registro/scripts/ubicacion.js",
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
