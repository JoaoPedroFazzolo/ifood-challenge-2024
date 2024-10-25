// Localização central do restaurante
const restaurantLocation = { lat: -23.5273, lng: -46.7325 };

// Função para gerar pontos com maior densidade e intensidade nas áreas próximas do restaurante
function getSalesHeatmapWithHotspots(center, radiusKm, numPoints) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;

    // Distribuição de pontos, concentrando 70% mais próximos do centro
    const distanceFactor = i < numPoints * 0.7 ? 0.5 : 1;
    const distanceKm = Math.sqrt(Math.random()) * radiusKm * distanceFactor;

    const latOffset = (distanceKm / 111.32) * Math.cos(angle);
    const lngOffset = (distanceKm / (111.32 * Math.cos(center.lat * (Math.PI / 180)))) * Math.sin(angle);

    const lat = center.lat + latOffset;
    const lng = center.lng + lngOffset;

    // Intensidade mais alta para áreas muito próximas e menor para as mais distantes
    const intensity = i < numPoints * 0.3 ? 1.0 : Math.max(0.3, 1 - (distanceKm / radiusKm));

    points.push([lat, lng, intensity]);
  }

  return points;
}


// Gera 500 pontos simulando vendas, com "hotspots" em áreas próximas ao restaurante
const points = getSalesHeatmapWithHotspots(restaurantLocation, 5, 200);

// Configuração do mapa e camada de calor
const map = L.map("map").setView([restaurantLocation.lat, restaurantLocation.lng], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const heat = L.heatLayer(points, {
  radius: 45,
  blur: 15,
  maxZoom: 17,
  gradient: {
    0.2: "yellow",
    0.4: "lime",
    0.6: "orange",
    0.8: "red",
    1.0: "darkred",
  },
}).addTo(map);

var marker = L.marker(restaurantLocation).addTo(map);