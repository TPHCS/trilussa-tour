const FACE_MAP = {
  left: 'l',
  front: 'f',
  right: 'r',
  back: 'b',
  top: 'u',
  bottom: 'd',
};

export function buildTileUrl(sceneId, col, row, level, face) {
  const faceDir = FACE_MAP[face] || face;
  return `${import.meta.env.BASE_URL}tiles/${sceneId}/${level}/${faceDir}/${row}/${col}.jpg`;
}
