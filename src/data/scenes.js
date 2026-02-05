export const scenes = [
  {
    id: '0-domus',
    name: 'DOMUS',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: -3.0945900699743465, pitch: 0.10867265346331578, target: '1-domus' },
      { yaw: 0.057088949994895444, pitch: 0.18, target: '2-domus' },
    ],
    infoHotspots: [
      { yaw: 0.1, pitch: -0.05, title: 'Vasca', text: "Vasca idromassaggio da 8 m² in mosaico a 34°C. Relax avvolti nello splendore dell'antica Roma." },
      { yaw: 3.0, pitch: -0.05, title: 'Bagno Turco', text: 'Hammam in marmo con vapore rigenerante. Purifica la pelle e rilassa i muscoli.' },
      { yaw: -2.8, pitch: -0.08, title: 'Docce Emozionali', text: 'Percorso sensoriale con getti a diverse temperature e fragranze. Stimola la circolazione.' },
    ],
    variantOf: null,
  },
  {
    id: '1-domus',
    name: 'DOMUS',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.3289510268687259, pitch: 0.1799426668892501, fov: 1.5707963267948966 },
    links: [
      { yaw: -1.2750751022459212, pitch: 0.14, target: '0-domus' },
    ],
    variantOf: null,
  },
  {
    id: '2-domus',
    name: 'DOMUS',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -1.644283881791619, pitch: 0.09448697281219509, fov: 1.5707963267948966 },
    links: [
      { yaw: 0.22675481602482606, pitch: 0.04401976035795485, target: '3-domus' },
      { yaw: -3.0131918783094545, pitch: 0.14, target: '0-domus' },
    ],
    variantOf: null,
  },
  {
    id: '3-domus',
    name: 'DOMUS',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 2.5619837441344826, pitch: 0.20075173105335153, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.9922077863506527, pitch: 0.14, target: '2-domus' },
    ],
    variantOf: null,
  },
  {
    id: '4-gym',
    name: 'GYM',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 2.9334604017317467, pitch: 0.06200286449675474, fov: 1.5707963267948966 },
    links: [
      { yaw: 2.6736032375054766, pitch: 0.23984731943193438, target: '5-gym' },
    ],
    variantOf: null,
  },
  {
    id: '5-gym',
    name: 'GYM',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 1.5391857239510633, pitch: 0.05362244575557895, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.7054220279552226, pitch: 0.14, target: '4-gym' },
    ],
    variantOf: null,
  },
  {
    id: '6-lobby',
    name: 'LOBBY',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.029739648556336817, pitch: -0.008197207248791472, fov: 1.5707963267948966 },
    links: [
      { yaw: 0.0013326904397299444, pitch: 0.06147232756597809, target: '7-lobby' },
    ],
    variantOf: null,
  },
  {
    id: '7-lobby',
    name: 'LOBBY',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 1.1509598341551364, pitch: 0.08720529166000368, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.003313441587046384, pitch: -0.029132544347170608, target: '8-lobby' },
      { yaw: 3.14, pitch: 0.14, target: '6-lobby' },
    ],
    variantOf: null,
  },
  {
    id: '8-lobby',
    name: 'LOBBY',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
    ],
    faceSize: 1472,
    initialView: { yaw: -1.6683468975530518, pitch: 0.07355426241093355, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.0204229830677543, pitch: 0.05599363284785497, target: '7-lobby' },
    ],
    variantOf: null,
  },
  {
    id: '9-maya',
    name: 'MAYA',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -3.1193227164964235, pitch: -0.04941956988983698, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.1304940677293356, pitch: -0.03370048228997646, target: '13-maya-dentro' },
    ],
    infoHotspots: [
      { yaw: 3.0, pitch: -0.15, title: 'Vasca 32 m²', text: "Grande vasca in mosaico verde, oro e nero a 34°C con cascate rigeneranti e giochi d'acqua. Il cuore della SPA Maya." },
      { yaw: -3.1, pitch: 0.05, title: 'Piramide Maya', text: "Struttura centrale con cromoterapia personalizzabile via tablet. Scenari dal rosso fuoco del Vulcano al blu profondo dell'Oceano." },
      { yaw: 0.7, pitch: -0.05, title: 'Sauna con Sale', text: "Sauna finlandese con esclusiva parete di sale dell'Himalaya. I minerali purificano le vie respiratorie." },
      { yaw: -0.5, pitch: -0.08, title: 'Bagno Turco', text: "Vapore avvolgente per un'azione detox completa. Completano il percorso la cascata di ghiaccio e le docce sensoriali." },
    ],
    variantOf: null,
  },
  {
    id: '10-maya-colore-rosa',
    name: 'MAYA COLORE ROSA',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -3.0958962198936284, pitch: 0.02266320036218694, fov: 1.5707963267948966 },
    links: [
      { yaw: 1.84, pitch: 0.14, target: '9-maya' },
    ],
    variantOf: 'MAYA',
  },
  {
    id: '11-maya-colore-ambra',
    name: 'MAYA COLORE AMBRA',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 3.1282240686256984, pitch: -0.05340223037260472, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.13, pitch: 0.14, target: '9-maya' },
    ],
    variantOf: 'MAYA',
  },
  {
    id: '12-maya-colore-verde',
    name: 'MAYA COLORE VERDE',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.14, pitch: 0.14, target: '9-maya' },
    ],
    variantOf: 'MAYA',
  },
  {
    id: '13-maya-dentro',
    name: 'MAYA DENTRO',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: 2.9908260466161742, pitch: 0.14, target: '9-maya' },
    ],
    variantOf: null,
  },
  {
    id: '14-orto',
    name: 'ORTO',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
    ],
    faceSize: 1472,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.13259316080864103, pitch: 0.09440807221238501, target: '15-orto' },
      { yaw: 1.7958206852939727, pitch: 0.28287407826364763, target: '16-orto' },
    ],
    variantOf: null,
  },
  {
    id: '15-orto',
    name: 'ORTO',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
    ],
    faceSize: 1472,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.12109255020675569, pitch: 0.0835832649893149, target: '14-orto' },
    ],
    variantOf: null,
  },
  {
    id: '16-orto',
    name: 'ORTO',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
    ],
    faceSize: 1472,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: 0.5336091172608555, pitch: 0.26090963604661255, target: '14-orto' },
    ],
    variantOf: null,
  },
  {
    id: '17-roof',
    name: '8TH FLOOR',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/8th-floor/IMG_20251001_192859_00_086.jpg',
    links: [
      { yaw: -1.2, pitch: 0.05, target: '17-roof-083' },
      { yaw: 0.0, pitch: 0.05, target: '17-roof-084' },
      { yaw: 1.2, pitch: 0.05, target: '17-roof-085' },
    ],
    variantOf: null,
  },
  {
    id: '17-roof-083',
    name: '8TH FLOOR A',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/8th-floor/IMG_20251001_192800_00_083.jpg',
    links: [
      { yaw: 0.0, pitch: 0.05, target: '17-roof' },
    ],
    variantOf: '8TH FLOOR',
  },
  {
    id: '17-roof-084',
    name: '8TH FLOOR B',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/8th-floor/IMG_20251001_192820_00_084.jpg',
    links: [
      { yaw: 0.0, pitch: 0.05, target: '17-roof' },
    ],
    variantOf: '8TH FLOOR',
  },
  {
    id: '17-roof-085',
    name: '8TH FLOOR C',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/8th-floor/IMG_20251001_192838_00_085.jpg',
    links: [
      { yaw: 0.0, pitch: 0.05, target: '17-roof' },
    ],
    variantOf: '8TH FLOOR',
  },
  {
    id: '0-0fd06f54-9e1b-4c67-a2f6-a9c0e6644a2c',
    name: 'NOTTE 1',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
    ],
    faceSize: 1024,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: -1.5, pitch: 0.14, target: '17-roof' },
      { yaw: 0.0, pitch: 0.18, target: '1-3c999c68-e35e-4eea-8ec5-14082741ea77' },
    ],
    variantOf: '8TH FLOOR',
  },
  {
    id: '1-3c999c68-e35e-4eea-8ec5-14082741ea77',
    name: 'NOTTE 2',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
    ],
    faceSize: 1024,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: 0, pitch: 0.14, target: '0-0fd06f54-9e1b-4c67-a2f6-a9c0e6644a2c' },
    ],
    variantOf: '8TH FLOOR',
  },
  {
    id: '19-moon',
    name: 'MOON',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.07602510188862333, pitch: 0.04359941938812817, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.10974481099348665, pitch: 0.18, target: '20-moon' },
    ],
    variantOf: null,
  },
  {
    id: '20-moon',
    name: 'MOON',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 2.931368850614734, pitch: 0.13029697443688093, fov: 1.5707963267948966 },
    links: [
      { yaw: -2.9812607849456576, pitch: 0.14, target: '19-moon' },
      { yaw: 0.13146475654491496, pitch: 0.18, target: '23-moon-dentro' },
    ],
    infoHotspots: [
      { yaw: 0.0, pitch: -0.1, title: 'Vasca 30 m²', text: "Jacuzzi a 34°C con idromassaggio. Proiezioni immersive di onde oceaniche, foreste tropicali e paesaggi vulcanici tutt'intorno." },
      { yaw: -2.5, pitch: 0.0, title: 'Scenari Multimediali', text: "Scegli scenario, colori e musica tramite il sistema di automazione. La prima SPA sulla luna: un'esperienza sensoriale unica." },
      { yaw: 2.9, pitch: -0.05, title: 'Sauna & Bagno Turco', text: 'Percorso termale completo con sauna finlandese e hammam a vapore. Cromoterapia personalizzabile.' },
    ],
    variantOf: null,
  },
  {
    id: '21-moon-verde',
    name: 'MOON VERDE',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.4673017656251801, pitch: 0.0743320402308214, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.65, pitch: 0.14, target: '20-moon' },
    ],
    variantOf: 'MOON',
  },
  {
    id: '22-moon-colore-blu',
    name: 'MOON COLORE BLU',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.26705456160871854, pitch: -0.00468242323009882, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.14, pitch: 0.14, target: '20-moon' },
    ],
    variantOf: 'MOON',
  },
  {
    id: '23-moon-dentro',
    name: 'MOON DENTRO',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    links: [
      { yaw: 3.27, pitch: 0.14, target: '20-moon' },
    ],
    variantOf: null,
  },
  {
    id: '0-416first',
    name: '416',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -2.9081503018782264, pitch: 0.07576846785810076, fov: 1.5707963267948966 },
    links: [
      { yaw: 0.07819327699066214, pitch: 0.12, target: '1-416second' },
    ],
    variantOf: null,
  },
  {
    id: '1-416second',
    name: '416',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.8621312079880674, pitch: 0.007632635212804217, fov: 1.5707963267948966 },
    links: [
      { yaw: 1.3409718120582674, pitch: 0.12, target: '3-416hotspot1' },
      { yaw: -1.0274022750796519, pitch: 0.1284950131879512, target: '4-416hotspot2' },
      { yaw: 3.22, pitch: 0.14, target: '0-416first' },
    ],
    infoHotspots: [
      { yaw: 0.0, pitch: -0.1, title: 'Vasca Idromassaggio', text: 'Vasca privata con idromassaggio e cromoterapia. Relax esclusivo nella tua suite.' },
      { yaw: -1.5, pitch: 0.0, title: 'Sauna Finlandese', text: 'Sauna privata con schermo integrato per un\'esperienza immersiva di benessere.' },
      { yaw: -2.0, pitch: 0.0, title: 'Doccia Emozionale', text: 'Doccia multisensoriale con getti e cromoterapia per rigenerare corpo e mente.' },
      { yaw: 1.5, pitch: 0.1, title: 'Proiettore', text: 'Schermo con accesso a Netflix, Prime Video e tutti i servizi streaming. Cinema privato nella tua suite.' },
    ],
    variantOf: null,
  },
  {
    id: '2-416coloroption',
    name: '416 LUCI OFF',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -1.3884332714665266, pitch: 0.04884886536194166, fov: 1.5707963267948966 },
    links: [
      { yaw: -2.28, pitch: 0.14, target: '1-416second' },
    ],
    variantOf: '416',
  },
  {
    id: '3-416hotspot1',
    name: '416',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: 0.2639859125234736, pitch: 0.03358359493633856, fov: 1.5707963267948966 },
    links: [
      { yaw: -0.795273968222121, pitch: 0.47741132107970685, target: '0-416first' },
      { yaw: 0.22843508867855, pitch: 0.11110645730724755, target: '4-416hotspot2' },
    ],
    variantOf: null,
  },
  {
    id: '4-416hotspot2',
    name: '416',
    levels: [
      { tileSize: 256, size: 256, fallbackOnly: true },
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 },
      { tileSize: 512, size: 2048 },
      { tileSize: 512, size: 4096 },
    ],
    faceSize: 2976,
    initialView: { yaw: -2.8855438010149577, pitch: 0.07022024395778459, fov: 1.5707963267948966 },
    links: [
      { yaw: -2.353044804448416, pitch: 0.250038837622359, target: '0-416first' },
      { yaw: 3.034090937219771, pitch: 0.11691952080163048, target: '3-416hotspot1' },
    ],
    variantOf: null,
  },
  {
    id: '24-ramo',
    name: 'RAMO',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/ramo/IMG_20251007_173729_00_089.jpg',
    links: [
      { yaw: 0.0, pitch: 0.05, target: '25-ramo-2' },
    ],
    variantOf: null,
  },
  {
    id: '25-ramo-2',
    name: 'RAMO 2',
    faceSize: 2976,
    initialView: { yaw: 0, pitch: 0, fov: 1.5707963267948966 },
    imageUrl: 'img/ramo/IMG_20251007_173749_00_090.jpg',
    links: [
      { yaw: 0.0, pitch: 0.05, target: '24-ramo' },
    ],
    variantOf: 'RAMO',
  },
];

export const scenesById = Object.fromEntries(scenes.map(s => [s.id, s]));

export function isEquirectangular(scene) {
  return !!scene.imageUrl;
}

export function getSlug(scene) {
  return scene.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const slugToId = Object.fromEntries(scenes.map(s => [getSlug(s), s.id]));
export const idToSlug = Object.fromEntries(scenes.map(s => [s.id, getSlug(s)]));
