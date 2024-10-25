const centralLocation = { lat: -23.5273, lng: -46.7325, intensity: 1.0 };

function getDistanceFromCenter(lat1, lng1, lat2, lng2) {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLng))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function generateRadialHeatPoints(center, numPoints, maxRadius) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2; 
    const distance = Math.random() * maxRadius; 
    const latOffset = (distance * Math.cos(angle)) / 111.32;
    const lngOffset =
      (distance * Math.sin(angle)) /
      (111.32 * Math.cos((center.lat * Math.PI) / 180));
    const lat = center.lat + latOffset;
    const lng = center.lng + lngOffset;
    
    const distFromCenter = getDistanceFromCenter(
      center.lat,
      center.lng,
      lat,
      lng
    );
    const intensity = Math.max(
      0.3,
      center.intensity - distFromCenter / maxRadius
    );
    points.push([lat, lng, intensity]);
  }
  return points;
}

const points = generateRadialHeatPoints(centralLocation, 2000, 15);
const map = L.map("map").setView([-23.5273, -46.7325], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const heat = L.heatLayer(points, {
  radius: 30,
  blur: 20,
  maxZoom: 17, 
  gradient: {
    0.3: "lightcoral", 
    0.5: "red",
    1.0: "darkred",
  },
}).addTo(map);
