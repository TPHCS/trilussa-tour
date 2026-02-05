export const locations = [
  {
    id: 'maya',
    label: 'MAYA',
    defaultScene: '9-maya',
    scenes: ['9-maya', '10-maya-colore-rosa', '11-maya-colore-ambra', '12-maya-colore-verde', '13-maya-dentro'],
    hasCTA: true,
  },
  {
    id: 'moon',
    label: 'MOON',
    defaultScene: '19-moon',
    scenes: ['19-moon', '20-moon', '21-moon-verde', '22-moon-colore-blu', '23-moon-dentro'],
    hasCTA: true,
  },
  {
    id: 'domus',
    label: 'DOMUS',
    defaultScene: '0-domus',
    scenes: ['0-domus', '1-domus', '2-domus', '3-domus'],
    hasCTA: true,
  },
  {
    id: '8th-floor',
    label: '8TH FLOOR',
    defaultScene: '17-roof',
    scenes: [
      '17-roof', '17-roof-083', '17-roof-084', '17-roof-085',
      '0-0fd06f54-9e1b-4c67-a2f6-a9c0e6644a2c',
      '1-3c999c68-e35e-4eea-8ec5-14082741ea77',
    ],
    hasCTA: false,
  },
  {
    id: 'orto',
    label: 'ORTO',
    defaultScene: '14-orto',
    scenes: ['14-orto', '15-orto', '16-orto'],
    hasCTA: false,
  },
  {
    id: 'gym',
    label: 'GYM',
    defaultScene: '4-gym',
    scenes: ['4-gym', '5-gym'],
    hasCTA: false,
  },
  {
    id: '416',
    label: '416',
    defaultScene: '0-416first',
    scenes: ['0-416first', '1-416second', '2-416coloroption', '3-416hotspot1', '4-416hotspot2'],
    hasCTA: false,
  },
  {
    id: 'lobby',
    label: 'LOBBY',
    defaultScene: '6-lobby',
    scenes: ['6-lobby', '7-lobby', '8-lobby'],
    hasCTA: false,
  },
  {
    id: 'ramo',
    label: 'RAMO',
    defaultScene: '24-ramo',
    scenes: ['24-ramo', '25-ramo-2'],
    hasCTA: false,
  },
];

export function getLocationForScene(sceneId) {
  return locations.find(loc => loc.scenes.includes(sceneId)) || null;
}
