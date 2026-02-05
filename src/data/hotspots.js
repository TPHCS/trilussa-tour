export const bookingHotspots = [
  {
    sceneId: '9-maya',
    id: 'cta-maya',
    yaw: 1.5,
    pitch: 0.1,
    label: 'Prenota questa SPA',
    url: 'https://spa.trilussapalace.com/',
  },
  {
    sceneId: '19-moon',
    id: 'cta-moon',
    yaw: 1.8,
    pitch: 0.05,
    label: 'Prenota questa SPA',
    url: 'https://spa.trilussapalace.com/',
  },
  {
    sceneId: '0-domus',
    id: 'cta-domus',
    yaw: 1.5,
    pitch: 0.15,
    label: 'Prenota questa SPA',
    url: 'https://spa.trilussapalace.com/',
  },
];

export function getHotspotsForScene(sceneId) {
  return bookingHotspots.filter(h => h.sceneId === sceneId);
}
